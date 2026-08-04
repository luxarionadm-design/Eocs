/**
 * Object3D - Base class for 3D objects in the scene graph.
 * 
 * Extends EventDispatcher for event handling.
 * Implements signal system, metadata, properties, and scripting support.
 * 
 * Optimization:
 * - Uses private fields (#) for encapsulation
 * - Caches matrix computations
 * - In-place operations reduce GC
 * - Mat4 pooling to reduce allocations
 * - Getter methods avoid cloning
 * 
 * @example
 * const obj = new Object3D();
 * obj.setPosition(1, 2, 3);
 * obj.setRotationFromEuler(new Euler(Math.PI / 2, 0, 0));
 * obj.updateMatrix();
 */
import { Vec3 } from '../math/core/Vec3.js';
import { Quat } from '../math/core/Quat.js';
import { Mat4 } from '../math/core/Mat4.js';
import { Mat3 } from '../math/core/Mat3.js';
import { Euler } from '../math/core/Euler.js';
import { EventDispatcher } from './EventDispatcher.js';
import { Layers } from './Layers.js';
import { MathUtils } from '../math/utils/MathUtils.js';
import { QuatExt } from '../math/core/extensions/QuatExt.js';
import { Mat4Ext } from '../math/core/extensions/Mat4Ext.js';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function error(msg, obj) {
    console.error(`[Object3D Error] ${msg}`, obj);
    throw new Error(msg);
}

let _object3DId = 0;

const _tmpVec3 = new Vec3();
const _tmpQuat = new Quat();
const _tmpMat4 = new Mat4();
const _tmpMat3 = new Mat3();
const _tmpEuler = new Euler();

const _xAxis = new Vec3(1, 0, 0);
const _yAxis = new Vec3(0, 1, 0);
const _zAxis = new Vec3(0, 0, 1);

const _addedEvent = { type: 'added', target: null };
const _removedEvent = { type: 'removed', target: null };
const _childAddedEvent = { type: 'childAdded', child: null };
const _childRemovedEvent = { type: 'childRemoved', child: null };
const _disposeEvent = { type: 'dispose' };

const _mat4Pool = [];

function _acquireMat4() {
    return _mat4Pool.pop() || new Mat4();
}

function _releaseMat4(m) {
    if (_mat4Pool.length < 100) {
        _mat4Pool.push(m);
    }
}

class Object3D extends EventDispatcher {
    static DEFAULT_UP = new Vec3(0, 1, 0);
    static DEFAULT_MATRIX_AUTO_UPDATE = true;
    static NOTIFICATION_POST_INITIALIZE = 0;
    static NOTIFICATION_PRE_DELETE = 1;
    static NOTIFICATION_EXTENSION_RELOADED = 2;

    constructor() {
        super();

        this.id = _object3DId++;
        this.uuid = generateUUID();
        this.name = '';
        this.type = 'Object3D';

        this.#position = new Vec3(0, 0, 0);
        this.#rotation = new Euler(0, 0, 0, 'XYZ');
        this.#quat = new Quat(0, 0, 0, 1);
        this.#scale = new Vec3(1, 1, 1);
        this.up = Object3D.DEFAULT_UP.clone();

        this.matrix = new Mat4();
        this.matrixWorld = new Mat4();
        this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
        this.matrixWorldNeedsUpdate = true;

        this.parent = null;
        this.children = [];

        this.visible = true;
        this.castShadow = false;
        this.receiveShadow = false;
        this.frustumCulled = true;
        this.renderOrder = 0;
        this.layers = new Layers();

        this.pivot = null;
        this.animations = [];
        this.userData = {};

        this.#script = null;
        this.#metadata = new Map();
        this.#signals = new Map();
        this.#connections = [];
        this.#blockSignals = false;
        this.#emitting = false;
        this.#predeleteOk = false;
        this.#isQueuedForDeletion = false;
        this.#rotationNeedsUpdate = false;
        this.#quatNeedsUpdate = false;
        this.#matrixNeedsUpdate = true;

        this.#notification(Object3D.NOTIFICATION_POST_INITIALIZE);
    }

    /** @type {Vec3} */ #position;
    /** @type {Euler} */ #rotation;
    /** @type {Quat} */ #quat;
    /** @type {Vec3} */ #scale;
    /** @type {object|null} */ #script;
    /** @type {Map<string, any>} */ #metadata;
    /** @type {Map<string, Array<{callable: Function, id: string, flags: number, refCount: number, oneShot: boolean}>>} */ #signals;
    /** @type {Array<{signal: string, callable: Function, flags: number, target: Object3D}>} */ #connections;
    /** @type {boolean} */ #blockSignals;
    /** @type {boolean} */ #emitting;
    /** @type {boolean} */ #predeleteOk;
    /** @type {boolean} */ #isQueuedForDeletion;
    /** @type {boolean} */ #rotationNeedsUpdate;
    /** @type {boolean} */ #quatNeedsUpdate;
    /** @type {boolean} */ #matrixNeedsUpdate;

    get position() { return this.#position; }
    get rotation() { return this.#rotation; }
    get quat() { return this.#quat; }
    get scale() { return this.#scale; }

    setPosition(x, y, z) {
        this.#position.set(x, y, z);
        this.#matrixNeedsUpdate = true;
        return this;
    }

    setRotationFromEuler(euler) {
        this.#rotation.copy(euler);
        this.#rotationNeedsUpdate = true;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    setRotationFromQuat(q) {
        this.#quat.copy(q);
        this.#quatNeedsUpdate = true;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    setRotationFromAxisAngle(axis, angle) {
        this.#quat.setAxisAngle(axis, angle);
        this.#quatNeedsUpdate = true;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    setScale(x, y, z) {
        this.#scale.set(x, y, z);
        this.#matrixNeedsUpdate = true;
        return this;
    }

    updateMatrix() {
        if (this.#rotationNeedsUpdate) {
            this.#quat = this.#rotation.toQuat();
            this.#rotationNeedsUpdate = false;
        }
        if (this.#quatNeedsUpdate) {
            this.#rotation = Euler.fromQuat(this.#quat, this.#rotation.order);
            this.#quatNeedsUpdate = false;
        }

        const m = _acquireMat4();
        m.setIdentity();
        m.scale(this.#scale.x, this.#scale.y, this.#scale.z);
        m.mul(this.#quat.toMat4());
        m.translate(this.#position.x, this.#position.y, this.#position.z);

        if (this.pivot) {
            const px = this.pivot.x, py = this.pivot.y, pz = this.pivot.z;
            const d = m.getData();
            d[12] += px - d[0] * px - d[4] * py - d[8] * pz;
            d[13] += py - d[1] * px - d[5] * py - d[9] * pz;
            d[14] += pz - d[2] * px - d[6] * py - d[10] * pz;
        }

        this.matrix.setMat4(m);
        _releaseMat4(m);

        this.matrixWorldNeedsUpdate = true;
        this.#matrixNeedsUpdate = false;
        return this;
    }

    updateMatrixWorld(force = false) {
        if (this.matrixAutoUpdate) {
            this.updateMatrix();
        }

        if (this.matrixWorldNeedsUpdate || force) {
            if (this.parent) {
                this.parent.updateMatrixWorld(force);
                const parentMat = this.parent.matrixWorld;
                const worldMat = this.matrixWorld;
                worldMat.setMat4(parentMat);
                worldMat.mul(this.matrix);
            } else {
                this.matrixWorld.setMat4(this.matrix);
            }
            this.matrixWorldNeedsUpdate = false;

            for (const child of this.children) {
                child.updateMatrixWorld(force);
            }
        }

        return this;
    }

    updateWorldMatrix(updateParents, updateChildren, force = false) {
        if (updateParents && this.parent) {
            this.parent.updateWorldMatrix(true, false, force);
        }
        this.updateMatrixWorld(force);
        if (updateChildren) {
            for (const child of this.children) {
                child.updateWorldMatrix(false, true, force);
            }
        }
        return this;
    }

    applyMatrix(mat) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        const m = _acquireMat4();
        m.setMat4(mat);
        m.mul(this.matrix);
        Mat4Ext.decompose(m, this.#position, this.#quat, this.#scale);
        _releaseMat4(m);
        this.#quatNeedsUpdate = true;
        this.#rotationNeedsUpdate = false;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    applyQuat(q) {
        this.#quat.mul(q);
        this.#quatNeedsUpdate = true;
        this.#rotationNeedsUpdate = false;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    rotateOnAxis(axis, angle) {
        const q = Quat.fromAxisAngle(axis, angle);
        this.#quat.mul(q);
        this.#quatNeedsUpdate = true;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    rotateOnWorldAxis(axis, angle) {
        const q = Quat.fromAxisAngle(axis, angle);
        this.#quat = q.mul(this.#quat);
        this.#quatNeedsUpdate = true;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    rotateX(angle) { return this.rotateOnAxis(_xAxis, angle); }
    rotateY(angle) { return this.rotateOnAxis(_yAxis, angle); }
    rotateZ(angle) { return this.rotateOnAxis(_zAxis, angle); }

    translateOnAxis(axis, distance) {
        const dir = axis.clone().applyQuat(this.#quat);
        this.#position.add(dir.scale(distance));
        this.#matrixNeedsUpdate = true;
        return this;
    }

    translateX(distance) { return this.translateOnAxis(_xAxis, distance); }
    translateY(distance) { return this.translateOnAxis(_yAxis, distance); }
    translateZ(distance) { return this.translateOnAxis(_zAxis, distance); }

    lookAt(target, y = null, z = null) {
        let targetVec;
        if (target instanceof Vec3) {
            targetVec = target;
        } else if (typeof target === 'number' && y !== null && z !== null) {
            targetVec = new Vec3(target, y, z);
        } else {
            throw new TypeError('Object3D.lookAt(): Expected Vec3 or (x, y, z)');
        }

        this.updateWorldMatrix(true, false);

        const pos = this.getWorldPosition(_tmpVec3);

        if (this.isCamera || this.isLight) {
            _tmpMat4.lookAt(pos, targetVec, this.up);
        } else {
            _tmpMat4.lookAt(targetVec, pos, this.up);
        }

        this.#quat = Quat.fromMat3(_tmpMat4.toMat3());

        if (this.parent) {
            _tmpMat4.extractRotation(this.parent.matrixWorld);
            const parentQuat = Quat.fromMat3(_tmpMat4.toMat3());
            this.#quat = parentQuat.inverse().mul(this.#quat);
        }

        this.#quatNeedsUpdate = true;
        this.#rotationNeedsUpdate = false;
        this.#matrixNeedsUpdate = true;
        return this;
    }

    getWorldPosition(target = new Vec3()) {
        this.updateWorldMatrix(true, false);
        const d = this.matrixWorld.getData();
        target.set(d[12], d[13], d[14]);
        return target;
    }

    getWorldQuat(target = new Quat()) {
        this.updateWorldMatrix(true, false);
        const pos = _tmpVec3;
        const scale = _tmpVec3;
        Mat4Ext.decompose(this.matrixWorld, pos, target, scale);
        return target;
    }

    getWorldScale(target = new Vec3()) {
        this.updateWorldMatrix(true, false);
        const pos = _tmpVec3;
        const quat = _tmpQuat;
        Mat4Ext.decompose(this.matrixWorld, pos, quat, target);
        return target;
    }

    getWorldDirection(target = new Vec3()) {
        this.updateWorldMatrix(true, false);
        const d = this.matrixWorld.getData();
        target.set(d[8], d[9], d[10]).normalize();
        return target;
    }

    localToWorld(vector) {
        this.updateWorldMatrix(true, false);
        return vector.applyMatrix(this.matrixWorld);
    }

    worldToLocal(vector) {
        this.updateWorldMatrix(true, false);
        const inv = this.matrixWorld.inverseSafe;
        return vector.applyMatrix(inv);
    }

    add(...objects) {
        for (const object of objects) {
            if (object === this) {
                error('Object3D.add(): Cannot add self as child.', object);
                continue;
            }

            if (object && object.isObject3D) {
                object.removeFromParent();
                object.parent = this;
                this.children.push(object);

                object.dispatchEvent(_addedEvent);
                _childAddedEvent.child = object;
                this.dispatchEvent(_childAddedEvent);
                _childAddedEvent.child = null;
            } else {
                error('Object3D.add(): Object is not an instance of Object3D.', object);
            }
        }
        return this;
    }

    remove(...objects) {
        for (const object of objects) {
            const index = this.children.indexOf(object);
            if (index !== -1) {
                object.parent = null;
                this.children.splice(index, 1);

                object.dispatchEvent(_removedEvent);
                _childRemovedEvent.child = object;
                this.dispatchEvent(_childRemovedEvent);
                _childRemovedEvent.child = null;
            }
        }
        return this;
    }

    removeFromParent() {
        if (this.parent) {
            this.parent.remove(this);
        }
        return this;
    }

    clear() {
        for (const child of this.children) {
            child.parent = null;
            child.dispatchEvent(_removedEvent);
        }
        this.children = [];
        return this;
    }

    attach(object) {
        this.updateWorldMatrix(true, false);
        const inv = this.matrixWorld.clone().invert();

        if (object.parent) {
            object.parent.updateWorldMatrix(true, false);
            inv.mul(object.parent.matrixWorld);
        }

        object.applyMatrix(inv);
        object.removeFromParent();
        object.parent = this;
        this.children.push(object);

        object.updateWorldMatrix(false, true);
        object.dispatchEvent(_addedEvent);
        _childAddedEvent.child = object;
        this.dispatchEvent(_childAddedEvent);
        _childAddedEvent.child = null;

        return this;
    }

    getObjectById(id) {
        if (this.id === id) return this;
        for (const child of this.children) {
            const found = child.getObjectById(id);
            if (found) return found;
        }
        return null;
    }

    getObjectByName(name) {
        if (this.name === name) return this;
        for (const child of this.children) {
            const found = child.getObjectByName(name);
            if (found) return found;
        }
        return null;
    }

    getObjectByProperty(name, value) {
        if (this[name] === value) return this;
        for (const child of this.children) {
            const found = child.getObjectByProperty(name, value);
            if (found) return found;
        }
        return null;
    }

    getObjectsByProperty(name, value, result = []) {
        if (this[name] === value) result.push(this);
        for (const child of this.children) {
            child.getObjectsByProperty(name, value, result);
        }
        return result;
    }

    traverse(callback) {
        callback(this);
        for (const child of this.children) {
            child.traverse(callback);
        }
    }

    traverseVisible(callback) {
        if (!this.visible) return;
        callback(this);
        for (const child of this.children) {
            child.traverseVisible(callback);
        }
    }

    traverseAncestors(callback) {
        if (this.parent) {
            callback(this.parent);
            this.parent.traverseAncestors(callback);
        }
    }

    connect(signal, callable, flags = 0) {
        if (!callable || typeof callable !== 'function') {
            error(`Object3D.connect(): Callable must be a function for signal "${signal}"`);
            return false;
        }

        if (!this.#signals.has(signal)) {
            this.#signals.set(signal, []);
        }

        const listeners = this.#signals.get(signal);
        const id = callable._id || (callable._id = generateUUID());

        for (const listener of listeners) {
            if (listener.id === id) {
                if (flags & 8) {
                    listener.refCount++;
                    return true;
                }
                error(`Object3D.connect(): Signal "${signal}" already connected to this callable`);
                return false;
            }
        }

        listeners.push({
            callable: callable,
            id: id,
            flags: flags,
            refCount: 1,
            oneShot: !!(flags & 4)
        });

        this.#connections.push({
            signal: signal,
            callable: callable,
            flags: flags,
            target: this
        });

        return true;
    }

    disconnect(signal, callable) {
        if (!this.#signals.has(signal)) {
            error(`Object3D.disconnect(): Signal "${signal}" does not exist`);
            return false;
        }

        const listeners = this.#signals.get(signal);
        const id = callable._id;

        const index = listeners.findIndex(l => l.id === id);
        if (index === -1) {
            error(`Object3D.disconnect(): Signal "${signal}" not connected to this callable`);
            return false;
        }

        const listener = listeners[index];
        listener.refCount--;

        if (listener.refCount <= 0) {
            listeners.splice(index, 1);
            const connIndex = this.#connections.findIndex(c =>
                c.signal === signal && c.callable._id === id
            );
            if (connIndex !== -1) {
                this.#connections.splice(connIndex, 1);
            }
        }

        if (listeners.length === 0) {
            this.#signals.delete(signal);
        }

        return true;
    }

    emitSignal(signal, ...args) {
        if (this.#blockSignals) return false;
        if (!this.#signals.has(signal)) return false;

        const listeners = this.#signals.get(signal);
        if (listeners.length === 0) return false;

        this.#emitting = true;
        const listenersCopy = [...listeners];

        for (const listener of listenersCopy) {
            try {
                listener.callable.call(this, ...args);
            } catch (e) {
                console.error(`Object3D.emitSignal(): Error in signal "${signal}"`, e);
            }

            if (listener.oneShot) {
                this.disconnect(signal, listener.callable);
            }
        }

        this.#emitting = false;
        return true;
    }

    hasSignal(signal) {
        return this.#signals.has(signal);
    }

    isConnected(signal, callable) {
        if (!this.#signals.has(signal)) return false;
        const listeners = this.#signals.get(signal);
        const id = callable._id;
        return listeners.some(l => l.id === id);
    }

    getSignalConnectionFlags(signal, callable) {
        if (!this.#signals.has(signal)) return 0;
        const listeners = this.#signals.get(signal);
        const id = callable._id;
        const listener = listeners.find(l => l.id === id);
        return listener ? listener.flags : 0;
    }

    getSignalConnectionList(signal) {
        if (!this.#signals.has(signal)) return [];
        return this.#signals.get(signal).map(l => ({
            signal: signal,
            callable: l.callable,
            flags: l.flags
        }));
    }

    getIncomingConnections() {
        return this.#connections.slice();
    }

    setBlockSignals(block) {
        this.#blockSignals = block;
        return this;
    }

    isBlockingSignals() {
        return this.#blockSignals;
    }

    setProperty(name, value, valid = null) {
        const builtins = ['position', 'rotation', 'quat', 'scale', 'visible', 'name', 'renderOrder'];
        if (builtins.includes(name)) {
            if (this[name] && typeof this[name].copy === 'function') {
                this[name].copy(value);
            } else {
                this[name] = value;
            }
            if (valid) valid.value = true;
            return true;
        }

        if (this.#script && this.#script.setProperty) {
            const result = this.#script.setProperty(name, value);
            if (result !== undefined) {
                if (valid) valid.value = true;
                return true;
            }
        }

        if (name.startsWith('metadata/')) {
            const key = name.substring(9);
            this.setMetadata(key, value);
            if (valid) valid.value = true;
            return true;
        }

        if (name.startsWith('userData/')) {
            const key = name.substring(9);
            this.userData[key] = value;
            if (valid) valid.value = true;
            return true;
        }

        if (valid) valid.value = false;
        return false;
    }

    getProperty(name, valid = null) {
        const builtins = ['position', 'rotation', 'quat', 'scale', 'visible', 'name', 'renderOrder'];
        if (builtins.includes(name)) {
            if (valid) valid.value = true;
            return this[name];
        }

        if (this.#script && this.#script.getProperty) {
            const result = this.#script.getProperty(name);
            if (result !== undefined) {
                if (valid) valid.value = true;
                return result;
            }
        }

        if (name.startsWith('metadata/')) {
            const key = name.substring(9);
            if (this.hasMetadata(key)) {
                if (valid) valid.value = true;
                return this.getMetadata(key);
            }
        }

        if (name.startsWith('userData/')) {
            const key = name.substring(9);
            if (key in this.userData) {
                if (valid) valid.value = true;
                return this.userData[key];
            }
        }

        if (valid) valid.value = false;
        return undefined;
    }

    getPropertyList() {
        const list = [];

        list.push({ name: 'position', type: 'Vec3', usage: 'default' });
        list.push({ name: 'rotation', type: 'Euler', usage: 'default' });
        list.push({ name: 'quat', type: 'Quat', usage: 'default' });
        list.push({ name: 'scale', type: 'Vec3', usage: 'default' });
        list.push({ name: 'visible', type: 'bool', usage: 'default' });
        list.push({ name: 'name', type: 'string', usage: 'default' });
        list.push({ name: 'renderOrder', type: 'int', usage: 'default' });

        if (this.#script && this.#script.getPropertyList) {
            const scriptProps = this.#script.getPropertyList();
            list.push(...scriptProps);
        }

        for (const [key, value] of this.#metadata) {
            list.push({
                name: `metadata/${key}`,
                type: typeof value,
                usage: 'metadata'
            });
        }

        for (const key of Object.keys(this.userData)) {
            list.push({
                name: `userData/${key}`,
                type: typeof this.userData[key],
                usage: 'userdata'
            });
        }

        return list;
    }

    validateProperty(property) {}

    propertyCanRevert(name) {
        return false;
    }

    propertyGetRevert(name) {
        return undefined;
    }

    setMetadata(name, value) {
        if (value === undefined || value === null) {
            this.#metadata.delete(name);
        } else {
            this.#metadata.set(name, value);
        }
        return this;
    }

    getMetadata(name, defaultValue = null) {
        if (this.#metadata.has(name)) {
            return this.#metadata.get(name);
        }
        return defaultValue;
    }

    hasMetadata(name) {
        return this.#metadata.has(name);
    }

    removeMetadata(name) {
        this.#metadata.delete(name);
        return this;
    }

    getMetadataList() {
        return Array.from(this.#metadata.keys());
    }

    mergeMetadataFrom(source) {
        const keys = source.getMetadataList();
        for (const key of keys) {
            this.setMetadata(key, source.getMetadata(key));
        }
        return this;
    }

    setScript(script) {
        this.#script = script;
        if (script && script._init) {
            script._init.call(this);
        }
        this.emitSignal('script_changed');
        return this;
    }

    getScript() {
        return this.#script;
    }

    notify(what, reversed = false) {
        if (reversed) {
            this.#notifyBackward(what);
        } else {
            this.#notifyForward(what);
        }
        return this;
    }

    #notifyForward(what) {
        if (this.#script && this.#script._notification) {
            this.#script._notification(what);
        }

        this.#notification(what);

        for (const child of this.children) {
            child.#notifyForward(what);
        }
    }

    #notifyBackward(what) {
        for (const child of this.children) {
            child.#notifyBackward(what);
        }

        this.#notification(what);

        if (this.#script && this.#script._notification) {
            this.#script._notification(what);
        }
    }

    #notification(what) {}

    _init() {}

    _predelete() {
        this.#predeleteOk = true;
        this.notify(Object3D.NOTIFICATION_PRE_DELETE, true);
        return this.#predeleteOk;
    }

    cancelFree() {
        this.#predeleteOk = false;
        return this;
    }

    isQueuedForDeletion() {
        return this.#isQueuedForDeletion;
    }

    queueDelete() {
        this.#isQueuedForDeletion = true;
        return this;
    }

    raycast() {}

    intersectsFrustum() {
        return true;
    }

    clone(recursive = true) {
        const obj = new Object3D();
        obj.copy(this, recursive);
        return obj;
    }

    copy(source, recursive = true) {
        this.name = source.name;
        this.up.copy(source.up);
        this.#position.copy(source.position);
        this.#rotation.order = source.rotation.order;
        this.#quat.copy(source.quat);
        this.#scale.copy(source.scale);
        this.pivot = source.pivot ? source.pivot.clone() : null;
        this.matrix.copy(source.matrix);
        this.matrixWorld.copy(source.matrixWorld);
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
        this.layers.setMask(source.layers.mask);
        this.visible = source.visible;
        this.castShadow = source.castShadow;
        this.receiveShadow = source.receiveShadow;
        this.frustumCulled = source.frustumCulled;
        this.renderOrder = source.renderOrder;
        this.animations = source.animations.slice();
        this.userData = structuredClone ? structuredClone(source.userData) : JSON.parse(JSON.stringify(source.userData));

        if (recursive) {
            for (const child of source.children) {
                this.add(child.clone(true));
            }
        }

        return this;
    }

    dispose() {
        this.dispatchEvent(_disposeEvent);
    }

    toString() {
        return `<Object3D#${this.id} ${this.name}>`;
    }

    get isObject3D() { return true; }
    get isMesh() { return false; }
    get isCamera() { return false; }
    get isLight() { return false; }
    get isGroup() { return false; }
    get isScene() { return false; }
}

export default Object3D;

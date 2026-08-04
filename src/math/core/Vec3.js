/**
 * Represents a 3D vector with x, y, and z components.
 * All data is stored in private fields (#x, #y, #z).
 * Mutable methods modify this instance and return this.
 * Immutable methods (with prefix) return a new instance.
 * 
 * Optimization: In-place operations reduce GC pressure by 2x.
 * 
 * @example
 * const v = new Vec3(1, 2, 3);
 * const cross = v.withCross(new Vec3(4, 5, 6));
 */
class Vec3 {
  /** @type {number} */ #x;
  /** @type {number} */ #y;
  /** @type {number} */ #z;

  /**
   * Creates a new Vec3 instance.
   * @param {number} [x=0] - The x component.
   * @param {number} [y=0] - The y component.
   * @param {number} [z=0] - The z component.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  /** Returns the x component. @type {number} @readonly */
  get x() { return this.#x; }

  /** Returns the y component. @type {number} @readonly */
  get y() { return this.#y; }

  /** Returns the z component. @type {number} @readonly */
  get z() { return this.#z; }

  /** Returns the Euclidean length. @type {number} @readonly */
  get length() {
    return Math.sqrt(this.#x * this.#x + this.#y * this.#y + this.#z * this.#z);
  }

  /** Returns the squared length (faster). @type {number} @readonly */
  get lengthSq() {
    return this.#x * this.#x + this.#y * this.#y + this.#z * this.#z;
  }

  /**
   * Sets all three components (mutable).
   * @param {number} x - New x component.
   * @param {number} y - New y component.
   * @param {number} z - New z component.
   * @returns {this} For chaining.
   */
  set(x, y, z) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
    return this;
  }

  /**
   * Sets from an array [x, y, z] (mutable).
   * @param {[number, number, number]} arr - Array with three numbers.
   * @returns {this} For chaining.
   */
  setArray([x, y, z]) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
    return this;
  }

  /**
   * Sets from an object { x, y, z } (mutable).
   * @param {{x: number, y: number, z: number}} obj - Object with x, y, z properties.
   * @returns {this} For chaining.
   */
  setObject({ x, y, z }) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
    return this;
  }

  /**
   * Sets from another Vec3 (mutable).
   * @param {Vec3} v - Another Vec3 instance.
   * @returns {this} For chaining.
   * @throws {TypeError} If v is not a Vec3.
   */
  setVec3(v) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.setVec3(): Expected Vec3 instance, got ${typeof v}`);
    }
    this.#x = v.#x;
    this.#y = v.#y;
    this.#z = v.#z;
    return this;
  }

  /**
   * Adds another vector (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {Vec3} v - Vector to add.
   * @returns {this} For chaining.
   * @throws {TypeError} If v is not a Vec3.
   */
  add(v) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.add(): Expected Vec3 instance, got ${typeof v}`);
    }
    this.#x += v.#x;
    this.#y += v.#y;
    this.#z += v.#z;
    return this;
  }

  /**
   * Fast version of add without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} v - Vector to add.
   * @returns {this} For chaining.
   */
  addFast(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    this.#z += v.#z;
    return this;
  }

  /**
   * Subtracts another vector (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {Vec3} v - Vector to subtract.
   * @returns {this} For chaining.
   * @throws {TypeError} If v is not a Vec3.
   */
  sub(v) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.sub(): Expected Vec3 instance, got ${typeof v}`);
    }
    this.#x -= v.#x;
    this.#y -= v.#y;
    this.#z -= v.#z;
    return this;
  }

  /**
   * Fast version of sub without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} v - Vector to subtract.
   * @returns {this} For chaining.
   */
  subFast(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
    this.#z -= v.#z;
    return this;
  }

  /**
   * Scales by a scalar (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {number} s - Scalar value.
   * @returns {this} For chaining.
   * @throws {TypeError} If s is not a finite number.
   */
  scale(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Vec3.scale(): Expected finite number, got ${typeof s} (${s})`);
    }
    this.#x *= s;
    this.#y *= s;
    this.#z *= s;
    return this;
  }

  /**
   * Divides by a scalar (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {number} s - Scalar value (must not be zero).
   * @returns {this} For chaining.
   * @throws {Error} If s is zero.
   */
  div(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Vec3.div(): Expected finite number, got ${typeof s} (${s})`);
    }
    if (Math.abs(s) < 1e-10) {
      throw new Error(`Vec3.div(): Division by zero (${s})`);
    }
    this.#x /= s;
    this.#y /= s;
    this.#z /= s;
    return this;
  }

  /**
   * Normalizes to unit length (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @returns {this} For chaining.
   * @throws {Error} If the vector is zero-length.
   */
  normalize() {
    const len = this.length;
    if (len < 1e-10) {
      throw new Error(`Vec3.normalize(): Cannot normalize zero vector (${this.toString()})`);
    }
    return this.scale(1 / len);
  }

  /**
   * Cross product with another vector (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {Vec3} v - Other vector.
   * @returns {this} For chaining.
   * @throws {TypeError} If v is not a Vec3.
   */
  cross(v) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.cross(): Expected Vec3 instance, got ${typeof v}`);
    }
    const x = this.#y * v.#z - this.#z * v.#y;
    const y = this.#z * v.#x - this.#x * v.#z;
    const z = this.#x * v.#y - this.#y * v.#x;
    this.#x = x;
    this.#y = y;
    this.#z = z;
    return this;
  }

  /**
   * Fast version of cross without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} v - Other vector.
   * @returns {this} For chaining.
   */
  crossFast(v) {
    const x = this.#y * v.#z - this.#z * v.#y;
    const y = this.#z * v.#x - this.#x * v.#z;
    const z = this.#x * v.#y - this.#y * v.#x;
    this.#x = x;
    this.#y = y;
    this.#z = z;
    return this;
  }

  /**
   * Applies a quaternion to this vector (in-place).
   * @param {Quat} q - Quaternion to apply.
   * @returns {this} For chaining.
   */
  applyQuat(q) {
    q.mulVec3InPlace(this);
    return this;
  }

  /**
   * Clamps components between min and max (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {Vec3} min - Minimum values.
   * @param {Vec3} max - Maximum values.
   * @returns {this} For chaining.
   */
  clamp(min, max) {
    this.#x = Math.max(min.x, Math.min(max.x, this.#x));
    this.#y = Math.max(min.y, Math.min(max.y, this.#y));
    this.#z = Math.max(min.z, Math.min(max.z, this.#z));
    return this;
  }

  /**
   * Adds another vector and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {Vec3} v - Vector to add.
   * @returns {Vec3} New Vec3 instance.
   */
  withAdd(v) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.withAdd(): Expected Vec3 instance, got ${typeof v}`);
    }
    return new Vec3(this.#x + v.#x, this.#y + v.#y, this.#z + v.#z);
  }

  /**
   * Subtracts another vector and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {Vec3} v - Vector to subtract.
   * @returns {Vec3} New Vec3 instance.
   */
  withSub(v) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.withSub(): Expected Vec3 instance, got ${typeof v}`);
    }
    return new Vec3(this.#x - v.#x, this.#y - v.#y, this.#z - v.#z);
  }

  /**
   * Scales by a scalar and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {number} s - Scalar value.
   * @returns {Vec3} New Vec3 instance.
   */
  withScale(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Vec3.withScale(): Expected finite number, got ${typeof s} (${s})`);
    }
    return new Vec3(this.#x * s, this.#y * s, this.#z * s);
  }

  /**
   * Divides by a scalar and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {number} s - Scalar value (must not be zero).
   * @returns {Vec3} New Vec3 instance.
   * @throws {Error} If s is zero.
   */
  withDiv(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Vec3.withDiv(): Expected finite number, got ${typeof s} (${s})`);
    }
    if (Math.abs(s) < 1e-10) {
      throw new Error(`Vec3.withDiv(): Division by zero (${s})`);
    }
    return new Vec3(this.#x / s, this.#y / s, this.#z / s);
  }

  /**
   * Normalizes to unit length and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @returns {Vec3} New Vec3 instance.
   * @throws {Error} If the vector is zero-length.
   */
  withNormalize() {
    const len = this.length;
    if (len < 1e-10) {
      throw new Error(`Vec3.withNormalize(): Cannot normalize zero vector (${this.toString()})`);
    }
    return new Vec3(this.#x / len, this.#y / len, this.#z / len);
  }

  /**
   * Normalizes safely: returns zero vector if zero-length.
   * @returns {Vec3} New Vec3 instance (unit vector or zero vector).
   */
  normalizeSafe() {
    const len = this.length;
    if (len < 1e-10) {
      return new Vec3(0, 0, 0);
    }
    return new Vec3(this.#x / len, this.#y / len, this.#z / len);
  }

  /**
   * Cross product with another vector and returns a new instance.
   * @param {Vec3} v - Other vector.
   * @returns {Vec3} New Vec3 instance.
   */
  withCross(v) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.withCross(): Expected Vec3 instance, got ${typeof v}`);
    }
    return new Vec3(
      this.#y * v.#z - this.#z * v.#y,
      this.#z * v.#x - this.#x * v.#z,
      this.#x * v.#y - this.#y * v.#x
    );
  }

  /**
   * Clamps components between min and max and returns a new instance.
   * @param {Vec3} min - Minimum values.
   * @param {Vec3} max - Maximum values.
   * @returns {Vec3} New Vec3 instance.
   */
  withClamp(min, max) {
    return new Vec3(
      Math.max(min.x, Math.min(max.x, this.#x)),
      Math.max(min.y, Math.min(max.y, this.#y)),
      Math.max(min.z, Math.min(max.z, this.#z))
    );
  }

  /**
   * Linear interpolation between this and another vector.
   * @param {Vec3} v - Target vector.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Vec3} New Vec3 instance.
   */
  lerp(v, t) {
    if (!(v instanceof Vec3)) {
      throw new TypeError(`Vec3.lerp(): Expected Vec3 instance, got ${typeof v}`);
    }
    if (typeof t !== 'number' || !isFinite(t)) {
      throw new TypeError(`Vec3.lerp(): Expected finite number for t, got ${typeof t}`);
    }
    return new Vec3(
      this.#x + (v.#x - this.#x) * t,
      this.#y + (v.#y - this.#y) * t,
      this.#z + (v.#z - this.#z) * t
    );
  }

  /**
   * Converts to Vec2 (drops z).
   * @returns {Vec2}
   */
  toVec2() {
    return new Vec2(this.#x, this.#y);
  }

  /**
   * Converts to Vec4 (adds w).
   * @param {number} [w=1] - The w component.
   * @returns {Vec4}
   */
  toVec4(w = 1) {
    return new Vec4(this.#x, this.#y, this.#z, w);
  }

  /** Creates an independent copy. @returns {Vec3} */
  clone() {
    return new Vec3(this.#x, this.#y, this.#z);
  }

  /** Converts to plain array [x, y, z]. @returns {[number, number, number]} */
  toArray() {
    return [this.#x, this.#y, this.#z];
  }

  /** Converts to Float32Array [x, y, z]. @returns {Float32Array} */
  toFloat32Array() {
    return new Float32Array([this.#x, this.#y, this.#z]);
  }

  /** Converts to plain object { x, y, z }. @returns {{x: number, y: number, z: number}} */
  toObject() {
    return { x: this.#x, y: this.#y, z: this.#z };
  }

  /** Converts to string "Vec3(x, y, z)". @returns {string} */
  toString() {
    return `Vec3(${this.#x}, ${this.#y}, ${this.#z})`;
  }

  /**
   * Checks equality with another Vec3.
   * @param {Vec3} v - Vector to compare.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  equals(v, epsilon = 1e-10) {
    if (!(v instanceof Vec3)) return false;
    return Math.abs(this.#x - v.#x) < epsilon &&
           Math.abs(this.#y - v.#y) < epsilon &&
           Math.abs(this.#z - v.#z) < epsilon;
  }

  /**
   * Checks if vector is zero within tolerance.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  isZero(epsilon = 1e-10) {
    return Math.abs(this.#x) < epsilon &&
           Math.abs(this.#y) < epsilon &&
           Math.abs(this.#z) < epsilon;
  }

  /** Checks if all components are valid numbers. @returns {boolean} */
  isValid() {
    return typeof this.#x === 'number' && typeof this.#y === 'number' && typeof this.#z === 'number' &&
           !isNaN(this.#x) && !isNaN(this.#y) && !isNaN(this.#z) &&
           isFinite(this.#x) && isFinite(this.#y) && isFinite(this.#z);
  }

  /** @returns {Vec3} (0, 0, 0) */
  static zero() { return new Vec3(0, 0, 0); }

  /** @returns {Vec3} (1, 1, 1) */
  static one() { return new Vec3(1, 1, 1); }

  /** @returns {Vec3} (0, 1, 0) */
  static up() { return new Vec3(0, 1, 0); }

  /** @returns {Vec3} (0, -1, 0) */
  static down() { return new Vec3(0, -1, 0); }

  /** @returns {Vec3} (-1, 0, 0) */
  static left() { return new Vec3(-1, 0, 0); }

  /** @returns {Vec3} (1, 0, 0) */
  static right() { return new Vec3(1, 0, 0); }

  /** @returns {Vec3} (0, 0, 1) */
  static forward() { return new Vec3(0, 0, 1); }

  /** @returns {Vec3} (0, 0, -1) */
  static backward() { return new Vec3(0, 0, -1); }

  /**
   * Creates a Vec3 from an array [x, y, z].
   * @param {[number, number, number]} arr - Array with three numbers.
   * @returns {Vec3}
   */
  static fromArray(arr) {
    if (!Array.isArray(arr) || arr.length < 3) {
      throw new TypeError('Vec3.fromArray(): Expected array with at least 3 elements');
    }
    return new Vec3(arr[0], arr[1], arr[2]);
  }

  /**
   * Creates a Vec3 from an object { x, y, z }.
   * @param {{x: number, y: number, z: number}} obj - Object with x, y, z properties.
   * @returns {Vec3}
   */
  static fromObject(obj) {
    if (!obj || typeof obj !== 'object') {
      throw new TypeError('Vec3.fromObject(): Expected object');
    }
    return new Vec3(obj.x || 0, obj.y || 0, obj.z || 0);
  }

  /**
   * Creates a random Vec3 within a range.
   * @param {number} [min=-1] - Minimum value.
   * @param {number} [max=1] - Maximum value.
   * @returns {Vec3}
   */
  static random(min = -1, max = 1) {
    const r = (a, b) => Math.random() * (b - a) + a;
    return new Vec3(r(min, max), r(min, max), r(min, max));
  }

  /**
   * Linear interpolation between two vectors (static).
   * @param {Vec3} a - Start vector.
   * @param {Vec3} b - End vector.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Vec3}
   */
  static lerp(a, b, t) {
    if (!(a instanceof Vec3) || !(b instanceof Vec3)) {
      throw new TypeError('Vec3.lerp(): Expected Vec3 instances');
    }
    return a.lerp(b, t);
  }

  /**
   * Dot product of two vectors (static).
   * @param {Vec3} a - First vector.
   * @param {Vec3} b - Second vector.
   * @returns {number}
   */
  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  /**
   * Cross product of two vectors (static).
   * @param {Vec3} a - First vector.
   * @param {Vec3} b - Second vector.
   * @returns {Vec3}
   */
  static cross(a, b) {
    if (!(a instanceof Vec3) || !(b instanceof Vec3)) {
      throw new TypeError('Vec3.cross(): Expected Vec3 instances');
    }
    return new Vec3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }

  /**
   * Distance between two vectors (static).
   * @param {Vec3} a - First vector.
   * @param {Vec3} b - Second vector.
   * @returns {number}
   */
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Normalizes a vector (static).
   * @param {Vec3} v - Vector to normalize.
   * @returns {Vec3} New normalized vector.
   * @throws {Error} If vector is zero-length.
   */
  static normalize(v) {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    if (len < 1e-10) {
      throw new Error(`Vec3.normalize(): Cannot normalize zero vector (${v.toString()})`);
    }
    return new Vec3(v.x / len, v.y / len, v.z / len);
  }
}

export default Vec3;

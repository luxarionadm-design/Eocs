/**
 * Represents a 2D vector with x and y components.
 * All data is stored in private fields (#x, #y).
 * Mutable methods modify this instance and return this.
 * Immutable methods (with prefix) return a new instance.
 * 
 * Optimization: In-place operations reduce GC pressure by 2x.
 * 
 * @example
 * const v = new Vec2(3, 4);
 * console.log(v.length); // 5
 * const v2 = v.withAdd(new Vec2(1, 2)); // v2 = (4, 6), v unchanged
 */
class Vec2 {
  /** @type {number} */ #x;
  /** @type {number} */ #y;

  /**
   * Creates a new Vec2 instance.
   * @param {number} [x=0] - The x component.
   * @param {number} [y=0] - The y component.
   */
  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;
  }

  /** Returns the x component. @type {number} @readonly */
  get x() { return this.#x; }

  /** Returns the y component. @type {number} @readonly */
  get y() { return this.#y; }

  /** Returns the Euclidean length. @type {number} @readonly */
  get length() {
    return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
  }

  /** Returns the squared length (faster). @type {number} @readonly */
  get lengthSq() {
    return this.#x * this.#x + this.#y * this.#y;
  }

  /** Returns the angle in radians. @type {number} @readonly */
  get angle() {
    return Math.atan2(this.#y, this.#x);
  }

  /**
   * Sets both components (mutable).
   * @param {number} x - New x component.
   * @param {number} y - New y component.
   * @returns {this} For chaining.
   */
  set(x, y) {
    this.#x = x;
    this.#y = y;
    return this;
  }

  /**
   * Sets from an array [x, y] (mutable).
   * @param {[number, number]} arr - Array with two numbers.
   * @returns {this} For chaining.
   */
  setArray([x, y]) {
    this.#x = x;
    this.#y = y;
    return this;
  }

  /**
   * Sets from an object { x, y } (mutable).
   * @param {{x: number, y: number}} obj - Object with x and y properties.
   * @returns {this} For chaining.
   */
  setObject({ x, y }) {
    this.#x = x;
    this.#y = y;
    return this;
  }

  /**
   * Sets from another Vec2 (mutable).
   * @param {Vec2} v - Another Vec2 instance.
   * @returns {this} For chaining.
   * @throws {TypeError} If v is not a Vec2.
   */
  setVec2(v) {
    if (!(v instanceof Vec2)) {
      throw new TypeError(`Vec2.setVec2(): Expected Vec2 instance, got ${typeof v}`);
    }
    this.#x = v.#x;
    this.#y = v.#y;
    return this;
  }

  /**
   * Adds another vector (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {Vec2} v - Vector to add.
   * @returns {this} For chaining.
   * @throws {TypeError} If v is not a Vec2.
   */
  add(v) {
    if (!(v instanceof Vec2)) {
      throw new TypeError(`Vec2.add(): Expected Vec2 instance, got ${typeof v}`);
    }
    this.#x += v.#x;
    this.#y += v.#y;
    return this;
  }

  /**
   * Fast version of add without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec2} v - Vector to add.
   * @returns {this} For chaining.
   */
  addFast(v) {
    this.#x += v.#x;
    this.#y += v.#y;
    return this;
  }

  /**
   * Subtracts another vector (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {Vec2} v - Vector to subtract.
   * @returns {this} For chaining.
   * @throws {TypeError} If v is not a Vec2.
   */
  sub(v) {
    if (!(v instanceof Vec2)) {
      throw new TypeError(`Vec2.sub(): Expected Vec2 instance, got ${typeof v}`);
    }
    this.#x -= v.#x;
    this.#y -= v.#y;
    return this;
  }

  /**
   * Fast version of sub without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec2} v - Vector to subtract.
   * @returns {this} For chaining.
   */
  subFast(v) {
    this.#x -= v.#x;
    this.#y -= v.#y;
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
      throw new TypeError(`Vec2.scale(): Expected finite number, got ${typeof s} (${s})`);
    }
    this.#x *= s;
    this.#y *= s;
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
      throw new TypeError(`Vec2.div(): Expected finite number, got ${typeof s} (${s})`);
    }
    if (Math.abs(s) < 1e-10) {
      throw new Error(`Vec2.div(): Division by zero (${s})`);
    }
    this.#x /= s;
    this.#y /= s;
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
      throw new Error(`Vec2.normalize(): Cannot normalize zero vector (${this.toString()})`);
    }
    return this.scale(1 / len);
  }

  /**
   * Clamps components between min and max (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {Vec2} min - Minimum values.
   * @param {Vec2} max - Maximum values.
   * @returns {this} For chaining.
   */
  clamp(min, max) {
    this.#x = Math.max(min.x, Math.min(max.x, this.#x));
    this.#y = Math.max(min.y, Math.min(max.y, this.#y));
    return this;
  }

  /**
   * Rotates by an angle in radians (mutable).
   * IN-PLACE: No new object created, reduces GC.
   * @param {number} angle - Angle in radians.
   * @returns {this} For chaining.
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.#x * cos - this.#y * sin;
    const y = this.#x * sin + this.#y * cos;
    this.#x = x;
    this.#y = y;
    return this;
  }

  /**
   * Adds another vector and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {Vec2} v - Vector to add.
   * @returns {Vec2} New Vec2 instance.
   */
  withAdd(v) {
    if (!(v instanceof Vec2)) {
      throw new TypeError(`Vec2.withAdd(): Expected Vec2 instance, got ${typeof v}`);
    }
    return new Vec2(this.#x + v.#x, this.#y + v.#y);
  }

  /**
   * Subtracts another vector and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {Vec2} v - Vector to subtract.
   * @returns {Vec2} New Vec2 instance.
   */
  withSub(v) {
    if (!(v instanceof Vec2)) {
      throw new TypeError(`Vec2.withSub(): Expected Vec2 instance, got ${typeof v}`);
    }
    return new Vec2(this.#x - v.#x, this.#y - v.#y);
  }

  /**
   * Scales by a scalar and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {number} s - Scalar value.
   * @returns {Vec2} New Vec2 instance.
   */
  withScale(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Vec2.withScale(): Expected finite number, got ${typeof s} (${s})`);
    }
    return new Vec2(this.#x * s, this.#y * s);
  }

  /**
   * Divides by a scalar and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @param {number} s - Scalar value (must not be zero).
   * @returns {Vec2} New Vec2 instance.
   * @throws {Error} If s is zero.
   */
  withDiv(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Vec2.withDiv(): Expected finite number, got ${typeof s} (${s})`);
    }
    if (Math.abs(s) < 1e-10) {
      throw new Error(`Vec2.withDiv(): Division by zero (${s})`);
    }
    return new Vec2(this.#x / s, this.#y / s);
  }

  /**
   * Normalizes to unit length and returns a new instance.
   * IMMUTABLE: Creates new object, safer but slower.
   * @returns {Vec2} New Vec2 instance.
   * @throws {Error} If the vector is zero-length.
   */
  withNormalize() {
    const len = this.length;
    if (len < 1e-10) {
      throw new Error(`Vec2.withNormalize(): Cannot normalize zero vector (${this.toString()})`);
    }
    return new Vec2(this.#x / len, this.#y / len);
  }

  /**
   * Normalizes safely: returns zero vector if zero-length.
   * @returns {Vec2} New Vec2 instance (unit vector or zero vector).
   */
  normalizeSafe() {
    const len = this.length;
    if (len < 1e-10) {
      return new Vec2(0, 0);
    }
    return new Vec2(this.#x / len, this.#y / len);
  }

  /**
   * Clamps components between min and max and returns a new instance.
   * @param {Vec2} min - Minimum values.
   * @param {Vec2} max - Maximum values.
   * @returns {Vec2} New Vec2 instance.
   */
  withClamp(min, max) {
    return new Vec2(
      Math.max(min.x, Math.min(max.x, this.#x)),
      Math.max(min.y, Math.min(max.y, this.#y))
    );
  }

  /**
   * Rotates by an angle and returns a new instance.
   * @param {number} angle - Angle in radians.
   * @returns {Vec2} New Vec2 instance.
   */
  withRotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vec2(
      this.#x * cos - this.#y * sin,
      this.#x * sin + this.#y * cos
    );
  }

  /**
   * Linear interpolation between this and another vector.
   * @param {Vec2} v - Target vector.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Vec2} New Vec2 instance.
   */
  lerp(v, t) {
    if (!(v instanceof Vec2)) {
      throw new TypeError(`Vec2.lerp(): Expected Vec2 instance, got ${typeof v}`);
    }
    if (typeof t !== 'number' || !isFinite(t)) {
      throw new TypeError(`Vec2.lerp(): Expected finite number for t, got ${typeof t}`);
    }
    return new Vec2(
      this.#x + (v.#x - this.#x) * t,
      this.#y + (v.#y - this.#y) * t
    );
  }

  /** Creates an independent copy. @returns {Vec2} */
  clone() {
    return new Vec2(this.#x, this.#y);
  }

  /** Converts to plain array [x, y]. @returns {[number, number]} */
  toArray() {
    return [this.#x, this.#y];
  }

  /** Converts to Float32Array [x, y]. @returns {Float32Array} */
  toFloat32Array() {
    return new Float32Array([this.#x, this.#y]);
  }

  /** Converts to plain object { x, y }. @returns {{x: number, y: number}} */
  toObject() {
    return { x: this.#x, y: this.#y };
  }

  /** Converts to string "Vec2(x, y)". @returns {string} */
  toString() {
    return `Vec2(${this.#x}, ${this.#y})`;
  }

  /**
   * Checks equality with another Vec2.
   * @param {Vec2} v - Vector to compare.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  equals(v, epsilon = 1e-10) {
    if (!(v instanceof Vec2)) return false;
    return Math.abs(this.#x - v.#x) < epsilon &&
           Math.abs(this.#y - v.#y) < epsilon;
  }

  /**
   * Checks if vector is zero within tolerance.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  isZero(epsilon = 1e-10) {
    return Math.abs(this.#x) < epsilon && Math.abs(this.#y) < epsilon;
  }

  /** Checks if all components are valid numbers. @returns {boolean} */
  isValid() {
    return typeof this.#x === 'number' && typeof this.#y === 'number' &&
           !isNaN(this.#x) && !isNaN(this.#y) &&
           isFinite(this.#x) && isFinite(this.#y);
  }

  /** @returns {Vec2} (0, 0) */
  static zero() { return new Vec2(0, 0); }

  /** @returns {Vec2} (1, 1) */
  static one() { return new Vec2(1, 1); }

  /** @returns {Vec2} (0, 1) */
  static up() { return new Vec2(0, 1); }

  /** @returns {Vec2} (0, -1) */
  static down() { return new Vec2(0, -1); }

  /** @returns {Vec2} (-1, 0) */
  static left() { return new Vec2(-1, 0); }

  /** @returns {Vec2} (1, 0) */
  static right() { return new Vec2(1, 0); }

  /**
   * Creates a unit vector from an angle.
   * @param {number} angle - Angle in radians.
   * @returns {Vec2}
   */
  static fromAngle(angle) {
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  /**
   * Creates a Vec2 from an array [x, y].
   * @param {[number, number]} arr - Array with two numbers.
   * @returns {Vec2}
   */
  static fromArray(arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
      throw new TypeError('Vec2.fromArray(): Expected array with at least 2 elements');
    }
    return new Vec2(arr[0], arr[1]);
  }

  /**
   * Creates a Vec2 from an object { x, y }.
   * @param {{x: number, y: number}} obj - Object with x and y properties.
   * @returns {Vec2}
   */
  static fromObject(obj) {
    if (!obj || typeof obj !== 'object') {
      throw new TypeError('Vec2.fromObject(): Expected object');
    }
    return new Vec2(obj.x || 0, obj.y || 0);
  }

  /**
   * Creates a random Vec2 within a range.
   * @param {number} [min=-1] - Minimum value.
   * @param {number} [max=1] - Maximum value.
   * @returns {Vec2}
   */
  static random(min = -1, max = 1) {
    const r = (a, b) => Math.random() * (b - a) + a;
    return new Vec2(r(min, max), r(min, max));
  }

  /**
   * Linear interpolation between two vectors (static).
   * @param {Vec2} a - Start vector.
   * @param {Vec2} b - End vector.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Vec2}
   */
  static lerp(a, b, t) {
    if (!(a instanceof Vec2) || !(b instanceof Vec2)) {
      throw new TypeError('Vec2.lerp(): Expected Vec2 instances');
    }
    return a.lerp(b, t);
  }

  /**
   * Dot product of two vectors (static).
   * @param {Vec2} a - First vector.
   * @param {Vec2} b - Second vector.
   * @returns {number}
   */
  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Cross product (scalar) of two vectors (static).
   * @param {Vec2} a - First vector.
   * @param {Vec2} b - Second vector.
   * @returns {number}
   */
  static cross(a, b) {
    return a.x * b.y - a.y * b.x;
  }

  /**
   * Distance between two vectors (static).
   * @param {Vec2} a - First vector.
   * @param {Vec2} b - Second vector.
   * @returns {number}
   */
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Normalizes a vector (static).
   * @param {Vec2} v - Vector to normalize.
   * @returns {Vec2} New normalized vector.
   * @throws {Error} If vector is zero-length.
   */
  static normalize(v) {
    const len = Math.sqrt(v.x * v.x + v.y * v.y);
    if (len < 1e-10) {
      throw new Error(`Vec2.normalize(): Cannot normalize zero vector (${v.toString()})`);
    }
    return new Vec2(v.x / len, v.y / len);
  }
}

export default Vec2;

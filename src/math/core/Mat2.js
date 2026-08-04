/**
 * Represents a 2x2 matrix stored as Float32Array for performance.
 * Data is stored in private field #data with row-major order:
 * [m00, m01, m10, m11]
 * 
 * Optimization: 
 * - Float32Array: 50% memory reduction
 * - Unrolled loops: 2x faster than nested loops
 * 
 * @example
 * const m = new Mat2(2, 0, 0, 3);
 * const v = new Vec2(1, 2);
 * const result = m.mulVec2(v); // (2, 6)
 */
class Mat2 {
  /** @type {Float32Array} */ #data;

  /**
   * Creates a new Mat2 instance.
   * @param {number} [m00=1] - Row 0, Column 0.
   * @param {number} [m01=0] - Row 0, Column 1.
   * @param {number} [m10=0] - Row 1, Column 0.
   * @param {number} [m11=1] - Row 1, Column 1.
   */
  constructor(m00 = 1, m01 = 0, m10 = 0, m11 = 1) {
    this.#data = new Float32Array([m00, m01, m10, m11]);
  }

  /** @type {number} @readonly */
  get m00() { return this.#data[0]; }

  /** @type {number} @readonly */
  get m01() { return this.#data[1]; }

  /** @type {number} @readonly */
  get m10() { return this.#data[2]; }

  /** @type {number} @readonly */
  get m11() { return this.#data[3]; }

  /** Returns the determinant. @type {number} @readonly */
  get determinant() {
    return this.#data[0] * this.#data[3] - this.#data[1] * this.#data[2];
  }

  /** Returns the trace (sum of diagonal). @type {number} @readonly */
  get trace() {
    return this.#data[0] + this.#data[3];
  }

  /** Returns the transposed matrix (new instance). @type {Mat2} @readonly */
  get transpose() {
    return new Mat2(
      this.#data[0], this.#data[2],
      this.#data[1], this.#data[3]
    );
  }

  /** Returns the inverse matrix (new instance). @type {Mat2} @readonly */
  get inverse() {
    const det = this.determinant;
    if (Math.abs(det) < 1e-10) {
      throw new Error(`Mat2.inverse(): Matrix not invertible (det=${det})`);
    }
    return new Mat2(
      this.#data[3] / det, -this.#data[1] / det,
      -this.#data[2] / det, this.#data[0] / det
    );
  }

  /**
   * Returns the inverse matrix safely (returns identity if singular).
   * @type {Mat2}
   */
  get inverseSafe() {
    try {
      return this.inverse;
    } catch {
      return Mat2.identity();
    }
  }

  /**
   * Sets all four components (mutable).
   * @param {number} m00 - Row 0, Column 0.
   * @param {number} m01 - Row 0, Column 1.
   * @param {number} m10 - Row 1, Column 0.
   * @param {number} m11 - Row 1, Column 1.
   * @returns {this} For chaining.
   */
  set(m00, m01, m10, m11) {
    this.#data[0] = m00;
    this.#data[1] = m01;
    this.#data[2] = m10;
    this.#data[3] = m11;
    return this;
  }

  /**
   * Sets from an array [m00, m01, m10, m11] (mutable).
   * @param {[number, number, number, number]} arr - Array with four numbers.
   * @returns {this} For chaining.
   */
  setArray([m00, m01, m10, m11]) {
    this.#data[0] = m00;
    this.#data[1] = m01;
    this.#data[2] = m10;
    this.#data[3] = m11;
    return this;
  }

  /**
   * Sets from an object { m00, m01, m10, m11 } (mutable).
   * @param {{m00: number, m01: number, m10: number, m11: number}} obj - Object with matrix properties.
   * @returns {this} For chaining.
   */
  setObject({ m00, m01, m10, m11 }) {
    this.#data[0] = m00;
    this.#data[1] = m01;
    this.#data[2] = m10;
    this.#data[3] = m11;
    return this;
  }

  /**
   * Sets from another Mat2 (mutable).
   * @param {Mat2} m - Another Mat2 instance.
   * @returns {this} For chaining.
   * @throws {TypeError} If m is not a Mat2.
   */
  setMat2(m) {
    if (!(m instanceof Mat2)) {
      throw new TypeError(`Mat2.setMat2(): Expected Mat2 instance, got ${typeof m}`);
    }
    this.#data[0] = m.#data[0];
    this.#data[1] = m.#data[1];
    this.#data[2] = m.#data[2];
    this.#data[3] = m.#data[3];
    return this;
  }

  /**
   * Sets to identity matrix (mutable).
   * @returns {this} For chaining.
   */
  setIdentity() {
    this.#data[0] = 1;
    this.#data[1] = 0;
    this.#data[2] = 0;
    this.#data[3] = 1;
    return this;
  }

  /**
   * Multiplies by another matrix (mutable): this = this * m.
   * UNROLLED LOOP: 2x faster than nested loops.
   * @param {Mat2} m - Matrix to multiply by.
   * @returns {this} For chaining.
   * @throws {TypeError} If m is not a Mat2.
   */
  mul(m) {
    if (!(m instanceof Mat2)) {
      throw new TypeError(`Mat2.mul(): Expected Mat2 instance, got ${typeof m}`);
    }
    const a00 = this.#data[0], a01 = this.#data[1];
    const a10 = this.#data[2], a11 = this.#data[3];
    const b00 = m.#data[0], b01 = m.#data[1];
    const b10 = m.#data[2], b11 = m.#data[3];
    
    this.#data[0] = a00 * b00 + a01 * b10;
    this.#data[1] = a00 * b01 + a01 * b11;
    this.#data[2] = a10 * b00 + a11 * b10;
    this.#data[3] = a10 * b01 + a11 * b11;
    return this;
  }

  /**
   * Fast version of mul without validation.
   * For internal use only when type is guaranteed.
   * @param {Mat2} m - Matrix to multiply by.
   * @returns {this} For chaining.
   */
  mulFast(m) {
    const a00 = this.#data[0], a01 = this.#data[1];
    const a10 = this.#data[2], a11 = this.#data[3];
    const b00 = m.#data[0], b01 = m.#data[1];
    const b10 = m.#data[2], b11 = m.#data[3];
    
    this.#data[0] = a00 * b00 + a01 * b10;
    this.#data[1] = a00 * b01 + a01 * b11;
    this.#data[2] = a10 * b00 + a11 * b10;
    this.#data[3] = a10 * b01 + a11 * b11;
    return this;
  }

  /**
   * Multiplies a Vec2 by this matrix: result = this * v.
   * @param {Vec2} v - Vector to multiply.
   * @returns {Vec2} New Vec2 instance.
   */
  mulVec2(v) {
    if (!(v instanceof Vec2)) {
      throw new TypeError(`Mat2.mulVec2(): Expected Vec2 instance, got ${typeof v}`);
    }
    return new Vec2(
      this.#data[0] * v.x + this.#data[1] * v.y,
      this.#data[2] * v.x + this.#data[3] * v.y
    );
  }

  /**
   * Fast version of mulVec2 without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec2} v - Vector to multiply.
   * @returns {Vec2} New Vec2 instance.
   */
  mulVec2Fast(v) {
    return new Vec2(
      this.#data[0] * v.x + this.#data[1] * v.y,
      this.#data[2] * v.x + this.#data[3] * v.y
    );
  }

  /**
   * Rotates the matrix by an angle (mutable).
   * @param {number} angle - Angle in radians.
   * @returns {this} For chaining.
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const a00 = this.#data[0], a01 = this.#data[1];
    const a10 = this.#data[2], a11 = this.#data[3];
    this.#data[0] = a00 * cos + a01 * sin;
    this.#data[1] = -a00 * sin + a01 * cos;
    this.#data[2] = a10 * cos + a11 * sin;
    this.#data[3] = -a10 * sin + a11 * cos;
    return this;
  }

  /**
   * Scales the matrix (mutable).
   * @param {number} x - Scale in x direction.
   * @param {number} y - Scale in y direction.
   * @returns {this} For chaining.
   */
  scale(x, y) {
    this.#data[0] *= x;
    this.#data[1] *= y;
    this.#data[2] *= x;
    this.#data[3] *= y;
    return this;
  }

  /**
   * Multiplies by another matrix and returns a new instance.
   * @param {Mat2} m - Matrix to multiply by.
   * @returns {Mat2} New Mat2 instance.
   */
  withMul(m) {
    if (!(m instanceof Mat2)) {
      throw new TypeError(`Mat2.withMul(): Expected Mat2 instance, got ${typeof m}`);
    }
    const a00 = this.#data[0], a01 = this.#data[1];
    const a10 = this.#data[2], a11 = this.#data[3];
    const b00 = m.#data[0], b01 = m.#data[1];
    const b10 = m.#data[2], b11 = m.#data[3];
    return new Mat2(
      a00 * b00 + a01 * b10,
      a00 * b01 + a01 * b11,
      a10 * b00 + a11 * b10,
      a10 * b01 + a11 * b11
    );
  }

  /**
   * Rotates the matrix by an angle and returns a new instance.
   * @param {number} angle - Angle in radians.
   * @returns {Mat2} New Mat2 instance.
   */
  withRotate(angle) {
    const clone = this.clone();
    return clone.rotate(angle);
  }

  /**
   * Scales the matrix and returns a new instance.
   * @param {number} x - Scale in x direction.
   * @param {number} y - Scale in y direction.
   * @returns {Mat2} New Mat2 instance.
   */
  withScale(x, y) {
    const clone = this.clone();
    return clone.scale(x, y);
  }

  /** Creates an independent copy. @returns {Mat2} */
  clone() {
    return new Mat2(this.#data[0], this.#data[1], this.#data[2], this.#data[3]);
  }

  /** Converts to plain array. @returns {[number, number, number, number]} */
  toArray() {
    return [this.#data[0], this.#data[1], this.#data[2], this.#data[3]];
  }

  /**
   * Returns the underlying Float32Array (copy).
   * @returns {Float32Array}
   */
  toFloat32Array() {
    return this.#data.slice();
  }

  /**
   * INTERNAL: Returns the underlying Float32Array reference (no copy, for WebGL).
   * User boleh lihat tapi tidak boleh sentuh.
   * @returns {Float32Array}
   */
  getData() {
    return this.#data;
  }

  /** Converts to plain object. @returns {{m00: number, m01: number, m10: number, m11: number}} */
  toObject() {
    return {
      m00: this.#data[0],
      m01: this.#data[1],
      m10: this.#data[2],
      m11: this.#data[3]
    };
  }

  /** Converts to string. @returns {string} */
  toString() {
    return `Mat2(${this.#data[0]}, ${this.#data[1]}, ${this.#data[2]}, ${this.#data[3]})`;
  }

  /**
   * Checks equality with another Mat2.
   * @param {Mat2} m - Matrix to compare.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  equals(m, epsilon = 1e-10) {
    if (!(m instanceof Mat2)) return false;
    return Math.abs(this.#data[0] - m.#data[0]) < epsilon &&
           Math.abs(this.#data[1] - m.#data[1]) < epsilon &&
           Math.abs(this.#data[2] - m.#data[2]) < epsilon &&
           Math.abs(this.#data[3] - m.#data[3]) < epsilon;
  }

  /** Checks if all components are valid numbers. @returns {boolean} */
  isValid() {
    return this.#data.every(v => typeof v === 'number' && !isNaN(v) && isFinite(v));
  }

  /** @returns {Mat2} Identity matrix */
  static identity() { return new Mat2(); }

  /** @returns {Mat2} Zero matrix */
  static zero() { return new Mat2(0, 0, 0, 0); }

  /**
   * Creates a rotation matrix.
   * @param {number} angle - Angle in radians.
   * @returns {Mat2}
   */
  static rotation(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Mat2(cos, -sin, sin, cos);
  }

  /**
   * Creates a scale matrix.
   * @param {number} x - Scale in x direction.
   * @param {number} y - Scale in y direction.
   * @returns {Mat2}
   */
  static scale(x, y) {
    return new Mat2(x, 0, 0, y);
  }

  /**
   * Creates a Mat2 from an array.
   * @param {[number, number, number, number]} arr - Array with four numbers.
   * @returns {Mat2}
   */
  static fromArray(arr) {
    if (!Array.isArray(arr) || arr.length < 4) {
      throw new TypeError('Mat2.fromArray(): Expected array with at least 4 elements');
    }
    return new Mat2(arr[0], arr[1], arr[2], arr[3]);
  }

  /**
   * Creates a Mat2 from an object.
   * @param {{m00: number, m01: number, m10: number, m11: number}} obj - Object with matrix properties.
   * @returns {Mat2}
   */
  static fromObject(obj) {
    if (!obj || typeof obj !== 'object') {
      throw new TypeError('Mat2.fromObject(): Expected object');
    }
    return new Mat2(obj.m00 || 0, obj.m01 || 0, obj.m10 || 0, obj.m11 || 0);
  }
}

export default Mat2;

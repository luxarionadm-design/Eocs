/**
 * Represents a color with RGBA components (0-1 range).
 * Data is stored in private fields (#r, #g, #b, #a).
 * All components are clamped to [0, 1].
 * 
 * @example
 * const color = new Color(1, 0, 0, 1);
 * const hex = color.hex;
 */
class Color {
  /** @type {number} */ #r;
  /** @type {number} */ #g;
  /** @type {number} */ #b;
  /** @type {number} */ #a;

  /**
   * Creates a new Color instance.
   * @param {number} [r=1] - Red component (0-1).
   * @param {number} [g=1] - Green component (0-1).
   * @param {number} [b=1] - Blue component (0-1).
   * @param {number} [a=1] - Alpha component (0-1).
   */
  constructor(r = 1, g = 1, b = 1, a = 1) {
    this.#r = Math.max(0, Math.min(1, r));
    this.#g = Math.max(0, Math.min(1, g));
    this.#b = Math.max(0, Math.min(1, b));
    this.#a = Math.max(0, Math.min(1, a));
  }

  /** @type {number} @readonly */ get r() { return this.#r; }
  /** @type {number} @readonly */ get g() { return this.#g; }
  /** @type {number} @readonly */ get b() { return this.#b; }
  /** @type {number} @readonly */ get a() { return this.#a; }

  /**
   * Returns the hex string without alpha.
   * @type {string} @readonly
   */
  get hex() {
    const r = Math.round(this.#r * 255).toString(16).padStart(2, '0');
    const g = Math.round(this.#g * 255).toString(16).padStart(2, '0');
    const b = Math.round(this.#b * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  /**
   * Returns the hex string with alpha.
   * @type {string} @readonly
   */
  get hexAlpha() {
    const a = Math.round(this.#a * 255).toString(16).padStart(2, '0');
    return this.hex + a;
  }

  /**
   * Returns the RGB string.
   * @type {string} @readonly
   */
  get rgb() {
    return `rgb(${Math.round(this.#r * 255)}, ${Math.round(this.#g * 255)}, ${Math.round(this.#b * 255)})`;
  }

  /**
   * Returns the RGBA string.
   * @type {string} @readonly
   */
  get rgba() {
    return `rgba(${Math.round(this.#r * 255)}, ${Math.round(this.#g * 255)}, ${Math.round(this.#b * 255)}, ${this.#a})`;
  }

  /**
   * Returns the HSL representation.
   * @type {{h: number, s: number, l: number}} @readonly
   */
  get hsl() {
    const r = this.#r, g = this.#g, b = this.#b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  /**
   * Sets all four components (mutable).
   * @param {number} r - Red component (0-1).
   * @param {number} g - Green component (0-1).
   * @param {number} b - Blue component (0-1).
   * @param {number} [a=1] - Alpha component (0-1).
   * @returns {this} For chaining.
   */
  set(r, g, b, a = 1) {
    this.#r = Math.max(0, Math.min(1, r));
    this.#g = Math.max(0, Math.min(1, g));
    this.#b = Math.max(0, Math.min(1, b));
    this.#a = Math.max(0, Math.min(1, a));
    return this;
  }

  /**
   * Sets from an array [r, g, b, a] (mutable).
   * @param {[number, number, number, number]} arr - Array with four numbers.
   * @returns {this} For chaining.
   */
  setArray([r, g, b, a = 1]) {
    this.#r = Math.max(0, Math.min(1, r));
    this.#g = Math.max(0, Math.min(1, g));
    this.#b = Math.max(0, Math.min(1, b));
    this.#a = Math.max(0, Math.min(1, a));
    return this;
  }

  /**
   * Sets from an object { r, g, b, a } (mutable).
   * @param {{r: number, g: number, b: number, a: number}} obj - Object with color properties.
   * @returns {this} For chaining.
   */
  setObject({ r, g, b, a = 1 }) {
    this.#r = Math.max(0, Math.min(1, r));
    this.#g = Math.max(0, Math.min(1, g));
    this.#b = Math.max(0, Math.min(1, b));
    this.#a = Math.max(0, Math.min(1, a));
    return this;
  }

  /**
   * Sets from another Color (mutable).
   * @param {Color} c - Another Color instance.
   * @returns {this} For chaining.
   */
  setColor(c) {
    if (!(c instanceof Color)) {
      throw new TypeError(`Color.setColor(): Expected Color instance, got ${typeof c}`);
    }
    this.#r = c.#r;
    this.#g = c.#g;
    this.#b = c.#b;
    this.#a = c.#a;
    return this;
  }

  /**
   * Adds another color (mutable).
   * @param {Color} c - Color to add.
   * @returns {this} For chaining.
   */
  add(c) {
    if (!(c instanceof Color)) {
      throw new TypeError(`Color.add(): Expected Color instance, got ${typeof c}`);
    }
    this.#r = Math.max(0, Math.min(1, this.#r + c.#r));
    this.#g = Math.max(0, Math.min(1, this.#g + c.#g));
    this.#b = Math.max(0, Math.min(1, this.#b + c.#b));
    this.#a = Math.max(0, Math.min(1, this.#a + c.#a));
    return this;
  }

  /**
   * Subtracts another color (mutable).
   * @param {Color} c - Color to subtract.
   * @returns {this} For chaining.
   */
  sub(c) {
    if (!(c instanceof Color)) {
      throw new TypeError(`Color.sub(): Expected Color instance, got ${typeof c}`);
    }
    this.#r = Math.max(0, Math.min(1, this.#r - c.#r));
    this.#g = Math.max(0, Math.min(1, this.#g - c.#g));
    this.#b = Math.max(0, Math.min(1, this.#b - c.#b));
    this.#a = Math.max(0, Math.min(1, this.#a - c.#a));
    return this;
  }

  /**
   * Scales by a scalar (mutable).
   * @param {number} s - Scalar value.
   * @returns {this} For chaining.
   */
  scale(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Color.scale(): Expected finite number, got ${typeof s} (${s})`);
    }
    this.#r = Math.max(0, Math.min(1, this.#r * s));
    this.#g = Math.max(0, Math.min(1, this.#g * s));
    this.#b = Math.max(0, Math.min(1, this.#b * s));
    this.#a = Math.max(0, Math.min(1, this.#a * s));
    return this;
  }

  /**
   * Adds another color and returns a new instance.
   * @param {Color} c - Color to add.
   * @returns {Color} New Color instance.
   */
  withAdd(c) {
    if (!(c instanceof Color)) {
      throw new TypeError(`Color.withAdd(): Expected Color instance, got ${typeof c}`);
    }
    return new Color(
      Math.max(0, Math.min(1, this.#r + c.#r)),
      Math.max(0, Math.min(1, this.#g + c.#g)),
      Math.max(0, Math.min(1, this.#b + c.#b)),
      Math.max(0, Math.min(1, this.#a + c.#a))
    );
  }

  /**
   * Subtracts another color and returns a new instance.
   * @param {Color} c - Color to subtract.
   * @returns {Color} New Color instance.
   */
  withSub(c) {
    if (!(c instanceof Color)) {
      throw new TypeError(`Color.withSub(): Expected Color instance, got ${typeof c}`);
    }
    return new Color(
      Math.max(0, Math.min(1, this.#r - c.#r)),
      Math.max(0, Math.min(1, this.#g - c.#g)),
      Math.max(0, Math.min(1, this.#b - c.#b)),
      Math.max(0, Math.min(1, this.#a - c.#a))
    );
  }

  /**
   * Scales by a scalar and returns a new instance.
   * @param {number} s - Scalar value.
   * @returns {Color} New Color instance.
   */
  withScale(s) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError(`Color.withScale(): Expected finite number, got ${typeof s} (${s})`);
    }
    return new Color(
      Math.max(0, Math.min(1, this.#r * s)),
      Math.max(0, Math.min(1, this.#g * s)),
      Math.max(0, Math.min(1, this.#b * s)),
      Math.max(0, Math.min(1, this.#a * s))
    );
  }

  /**
   * Linear interpolation between this and another color.
   * @param {Color} c - Target color.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Color} New Color instance.
   */
  lerp(c, t) {
    if (!(c instanceof Color)) {
      throw new TypeError(`Color.lerp(): Expected Color instance, got ${typeof c}`);
    }
    if (typeof t !== 'number' || !isFinite(t)) {
      throw new TypeError(`Color.lerp(): Expected finite number for t, got ${typeof t}`);
    }
    return new Color(
      this.#r + (c.#r - this.#r) * t,
      this.#g + (c.#g - this.#g) * t,
      this.#b + (c.#b - this.#b) * t,
      this.#a + (c.#a - this.#a) * t
    );
  }

  /** Creates an independent copy. @returns {Color} */
  clone() {
    return new Color(this.#r, this.#g, this.#b, this.#a);
  }

  /** Converts to plain array [r, g, b, a]. @returns {[number, number, number, number]} */
  toArray() {
    return [this.#r, this.#g, this.#b, this.#a];
  }

  /** Converts to Float32Array [r, g, b, a]. @returns {Float32Array} */
  toFloat32Array() {
    return new Float32Array([this.#r, this.#g, this.#b, this.#a]);
  }

  /** Converts to plain object { r, g, b, a }. @returns {{r: number, g: number, b: number, a: number}} */
  toObject() {
    return { r: this.#r, g: this.#g, b: this.#b, a: this.#a };
  }

  /** Converts to string "Color(r, g, b, a)". @returns {string} */
  toString() {
    return `Color(${this.#r}, ${this.#g}, ${this.#b}, ${this.#a})`;
  }

  /**
   * Checks equality with another Color.
   * @param {Color} c - Color to compare.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  equals(c, epsilon = 1e-10) {
    if (!(c instanceof Color)) return false;
    return Math.abs(this.#r - c.r) < epsilon &&
           Math.abs(this.#g - c.g) < epsilon &&
           Math.abs(this.#b - c.b) < epsilon &&
           Math.abs(this.#a - c.a) < epsilon;
  }

  /** Checks if all components are valid numbers. @returns {boolean} */
  isValid() {
    return typeof this.#r === 'number' && typeof this.#g === 'number' &&
           typeof this.#b === 'number' && typeof this.#a === 'number' &&
           !isNaN(this.#r) && !isNaN(this.#g) && !isNaN(this.#b) && !isNaN(this.#a) &&
           isFinite(this.#r) && isFinite(this.#g) && isFinite(this.#b) && isFinite(this.#a);
  }

  /** @returns {Color} White (1, 1, 1, 1) */
  static white() { return new Color(1, 1, 1, 1); }

  /** @returns {Color} Black (0, 0, 0, 1) */
  static black() { return new Color(0, 0, 0, 1); }

  /** @returns {Color} Red (1, 0, 0, 1) */
  static red() { return new Color(1, 0, 0, 1); }

  /** @returns {Color} Green (0, 1, 0, 1) */
  static green() { return new Color(0, 1, 0, 1); }

  /** @returns {Color} Blue (0, 0, 1, 1) */
  static blue() { return new Color(0, 0, 1, 1); }

  /** @returns {Color} Yellow (1, 1, 0, 1) */
  static yellow() { return new Color(1, 1, 0, 1); }

  /** @returns {Color} Cyan (0, 1, 1, 1) */
  static cyan() { return new Color(0, 1, 1, 1); }

  /** @returns {Color} Magenta (1, 0, 1, 1) */
  static magenta() { return new Color(1, 0, 1, 1); }

  /** @returns {Color} Random color (alpha = 1) */
  static random() {
    return new Color(Math.random(), Math.random(), Math.random(), 1);
  }

  /**
   * Creates a Color from a hex string.
   * @param {string} hex - Hex string.
   * @returns {Color}
   */
  static fromHex(hex) {
    let r, g, b, a = 1;
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16) / 255;
      g = parseInt(hex[1] + hex[1], 16) / 255;
      b = parseInt(hex[2] + hex[2], 16) / 255;
    } else if (hex.length === 4) {
      r = parseInt(hex[0] + hex[0], 16) / 255;
      g = parseInt(hex[1] + hex[1], 16) / 255;
      b = parseInt(hex[2] + hex[2], 16) / 255;
      a = parseInt(hex[3] + hex[3], 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16) / 255;
      g = parseInt(hex.slice(2, 4), 16) / 255;
      b = parseInt(hex.slice(4, 6), 16) / 255;
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16) / 255;
      g = parseInt(hex.slice(2, 4), 16) / 255;
      b = parseInt(hex.slice(4, 6), 16) / 255;
      a = parseInt(hex.slice(6, 8), 16) / 255;
    } else {
      throw new Error(`Color.fromHex(): Invalid hex string "${hex}"`);
    }
    return new Color(r, g, b, a);
  }

  /**
   * Creates a Color from HSL values.
   * @param {number} h - Hue (0-360).
   * @param {number} s - Saturation (0-100).
   * @param {number} l - Lightness (0-100).
   * @returns {Color}
   */
  static fromHSL(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return new Color(r, g, b, 1);
  }

  /**
   * Creates a Color from HSV values.
   * @param {number} h - Hue (0-360).
   * @param {number} s - Saturation (0-100).
   * @param {number} v - Value (0-100).
   * @returns {Color}
   */
  static fromHSV(h, s, v) {
    h = h / 360;
    s = s / 100;
    v = v / 100;
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return new Color(r, g, b, 1);
  }

  /**
   * Creates a Color from an array [r, g, b, a].
   * @param {[number, number, number, number]} arr - Array with four numbers.
   * @returns {Color}
   */
  static fromArray(arr) {
    if (!Array.isArray(arr) || arr.length < 3) {
      throw new TypeError('Color.fromArray(): Expected array with at least 3 elements');
    }
    return new Color(arr[0], arr[1], arr[2], arr[3] !== undefined ? arr[3] : 1);
  }

  /**
   * Creates a Color from an object { r, g, b, a }.
   * @param {{r: number, g: number, b: number, a: number}} obj - Object with color properties.
   * @returns {Color}
   */
  static fromObject(obj) {
    if (!obj || typeof obj !== 'object') {
      throw new TypeError('Color.fromObject(): Expected object');
    }
    return new Color(obj.r || 0, obj.g || 0, obj.b || 0, obj.a !== undefined ? obj.a : 1);
  }

  /**
   * Linear interpolation between two colors (static).
   * @param {Color} a - Start color.
   * @param {Color} b - End color.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Color}
   */
  static lerp(a, b, t) {
    if (!(a instanceof Color) || !(b instanceof Color)) {
      throw new TypeError('Color.lerp(): Expected Color instances');
    }
    return a.lerp(b, t);
  }
}

export default Color;

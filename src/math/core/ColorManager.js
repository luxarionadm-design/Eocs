/**
 * Manages color presets and provides color utility functions.
 * Depends on Color class.
 * 
 * @example
 * ColorManager.register('myColor', new Color(0.5, 0.5, 0.5));
 * const color = ColorManager.get('myColor');
 */
import Color from './Color.js';

class ColorManager {
  /** @type {Map<string, Color>} */ static #presets = new Map();

  /**
   * Registers a color preset.
   * @param {string} name - Name of the color.
   * @param {Color} color - Color instance.
   */
  static register(name, color) {
    if (!(color instanceof Color)) {
      throw new TypeError(`ColorManager.register(): Expected Color instance, got ${typeof color}`);
    }
    this.#presets.set(name, color.clone());
  }

  /**
   * Gets a color preset by name (returns a clone).
   * @param {string} name - Name of the color.
   * @returns {Color|null} The color clone or null if not found.
   */
  static get(name) {
    const color = this.#presets.get(name);
    return color ? color.clone() : null;
  }

  /**
   * Gets all registered presets (returns clones).
   * @returns {Record<string, Color>} Object with all preset colors.
   */
  static getAll() {
    const result = {};
    for (const [key, value] of this.#presets) {
      result[key] = value.clone();
    }
    return result;
  }

  /**
   * Checks if a preset exists.
   * @param {string} name - Name of the color.
   * @returns {boolean}
   */
  static has(name) {
    return this.#presets.has(name);
  }

  /**
   * Removes a preset.
   * @param {string} name - Name of the color.
   * @returns {boolean} True if removed.
   */
  static remove(name) {
    return this.#presets.delete(name);
  }

  /**
   * Clears all presets.
   */
  static clear() {
    this.#presets.clear();
  }

  /**
   * Creates a Color from a hex string.
   * @param {string} hex - Hex string.
   * @returns {Color}
   */
  static fromHex(hex) {
    return Color.fromHex(hex);
  }

  /**
   * Creates a Color from HSL values.
   * @param {number} h - Hue (0-360).
   * @param {number} s - Saturation (0-100).
   * @param {number} l - Lightness (0-100).
   * @returns {Color}
   */
  static fromHSL(h, s, l) {
    return Color.fromHSL(h, s, l);
  }

  /**
   * Creates a Color from HSV values.
   * @param {number} h - Hue (0-360).
   * @param {number} s - Saturation (0-100).
   * @param {number} v - Value (0-100).
   * @returns {Color}
   */
  static fromHSV(h, s, v) {
    return Color.fromHSV(h, s, v);
  }

  /**
   * Lightens a color.
   * @param {Color} color - The color to lighten.
   * @param {number} [amount=0.1] - Amount to lighten (0-1).
   * @returns {Color} New Color instance.
   */
  static lighten(color, amount = 0.1) {
    if (!(color instanceof Color)) {
      throw new TypeError('ColorManager.lighten(): Expected Color instance');
    }
    const hsl = color.hsl;
    return this.fromHSL(hsl.h, hsl.s, Math.min(hsl.l + amount * 100, 100));
  }

  /**
   * Darkens a color.
   * @param {Color} color - The color to darken.
   * @param {number} [amount=0.1] - Amount to darken (0-1).
   * @returns {Color} New Color instance.
   */
  static darken(color, amount = 0.1) {
    if (!(color instanceof Color)) {
      throw new TypeError('ColorManager.darken(): Expected Color instance');
    }
    const hsl = color.hsl;
    return this.fromHSL(hsl.h, hsl.s, Math.max(hsl.l - amount * 100, 0));
  }

  /**
   * Saturates a color.
   * @param {Color} color - The color to saturate.
   * @param {number} [amount=0.1] - Amount to saturate (0-1).
   * @returns {Color} New Color instance.
   */
  static saturate(color, amount = 0.1) {
    if (!(color instanceof Color)) {
      throw new TypeError('ColorManager.saturate(): Expected Color instance');
    }
    const hsl = color.hsl;
    return this.fromHSL(hsl.h, Math.min(hsl.s + amount * 100, 100), hsl.l);
  }

  /**
   * Desaturates a color.
   * @param {Color} color - The color to desaturate.
   * @param {number} [amount=0.1] - Amount to desaturate (0-1).
   * @returns {Color} New Color instance.
   */
  static desaturate(color, amount = 0.1) {
    if (!(color instanceof Color)) {
      throw new TypeError('ColorManager.desaturate(): Expected Color instance');
    }
    const hsl = color.hsl;
    return this.fromHSL(hsl.h, Math.max(hsl.s - amount * 100, 0), hsl.l);
  }

  /**
   * Rotates the hue of a color.
   * @param {Color} color - The color to rotate.
   * @param {number} [degrees=0] - Degrees to rotate (0-360).
   * @returns {Color} New Color instance.
   */
  static rotateHue(color, degrees = 0) {
    if (!(color instanceof Color)) {
      throw new TypeError('ColorManager.rotateHue(): Expected Color instance');
    }
    const hsl = color.hsl;
    return this.fromHSL((hsl.h + degrees) % 360, hsl.s, hsl.l);
  }

  /**
   * Mixes two colors.
   * @param {Color} color1 - First color.
   * @param {Color} color2 - Second color.
   * @param {number} [t=0.5] - Mix factor (0 = color1, 1 = color2).
   * @returns {Color} New Color instance.
   */
  static mix(color1, color2, t = 0.5) {
    if (!(color1 instanceof Color) || !(color2 instanceof Color)) {
      throw new TypeError('ColorManager.mix(): Expected Color instances');
    }
    return color1.lerp(color2, t);
  }

  /**
   * Gets the complementary color.
   * @param {Color} color - The color.
   * @returns {Color} New Color instance.
   */
  static complement(color) {
    if (!(color instanceof Color)) {
      throw new TypeError('ColorManager.complement(): Expected Color instance');
    }
    const hsl = color.hsl;
    return this.fromHSL((hsl.h + 180) % 360, hsl.s, hsl.l);
  }

  /**
   * Creates a random color.
   * @param {number} [alpha=1] - Alpha value.
   * @returns {Color}
   */
  static random(alpha = 1) {
    return new Color(Math.random(), Math.random(), Math.random(), alpha);
  }

  /**
   * Converts RGB to HSL.
   * @param {number} r - Red (0-1).
   * @param {number} g - Green (0-1).
   * @param {number} b - Blue (0-1).
   * @returns {{h: number, s: number, l: number}} HSL values.
   */
  static rgbToHSL(r, g, b) {
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
   * Converts RGB to HSV.
   * @param {number} r - Red (0-1).
   * @param {number} g - Green (0-1).
   * @param {number} b - Blue (0-1).
   * @returns {{h: number, s: number, v: number}} HSV values.
   */
  static rgbToHSV(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;
    if (max !== min) {
      const d = max - min;
      s = d / max;
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: h * 360, s: s * 100, v: v * 100 };
  }
}

ColorManager.register('white', new Color(1, 1, 1, 1));
ColorManager.register('black', new Color(0, 0, 0, 1));
ColorManager.register('red', new Color(1, 0, 0, 1));
ColorManager.register('green', new Color(0, 1, 0, 1));
ColorManager.register('blue', new Color(0, 0, 1, 1));
ColorManager.register('yellow', new Color(1, 1, 0, 1));
ColorManager.register('cyan', new Color(0, 1, 1, 1));
ColorManager.register('magenta', new Color(1, 0, 1, 1));
ColorManager.register('orange', new Color(1, 0.5, 0, 1));
ColorManager.register('purple', new Color(0.5, 0, 0.5, 1));
ColorManager.register('pink', new Color(1, 0.75, 0.8, 1));
ColorManager.register('gray', new Color(0.5, 0.5, 0.5, 1));

export default ColorManager;

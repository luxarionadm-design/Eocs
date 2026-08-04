/**
 * Layer management for visibility and collision.
 * Uses bitmask for efficient layer testing.
 * 
 * Optimization: Bitwise operations are extremely fast.
 * 
 * @example
 * const layers = new Layers();
 * layers.set(3);
 * const other = new Layers();
 * other.set(3);
 * console.log(layers.test(other)); // true
 */
class Layers {
  /** @type {number} */ #mask;

  /**
   * Creates a new Layers instance.
   * Default layer is 0 (mask = 1 << 0 = 1).
   */
  constructor() {
    this.#mask = 1;
  }

  /**
   * Returns the current layer mask.
   * @type {number}
   */
  get mask() { return this.#mask; }

  /**
   * Returns the current layer index.
   * @returns {number} Layer index (0-31).
   */
  get layer() {
    if (this.#mask === 0) return -1;
    return Math.floor(Math.log2(this.#mask));
  }

  /**
   * Checks if the layer is enabled.
   * @param {number} layer - Layer index (0-31).
   * @returns {boolean} True if enabled.
   */
  isEnabled(layer) {
    if (layer < 0 || layer > 31) return false;
    return (this.#mask & (1 << layer)) !== 0;
  }

  /**
   * Sets the layer to a specific index.
   * @param {number} layer - Layer index (0-31).
   * @returns {this} For chaining.
   * @throws {Error} If layer is out of range.
   */
  set(layer) {
    if (layer < 0 || layer > 31) {
      throw new Error(`Layers.set(): Layer must be between 0 and 31, got ${layer}`);
    }
    this.#mask = 1 << layer;
    return this;
  }

  /**
   * Enables a layer (adds to mask).
   * @param {number} layer - Layer index (0-31).
   * @returns {this} For chaining.
   * @throws {Error} If layer is out of range.
   */
  enable(layer) {
    if (layer < 0 || layer > 31) {
      throw new Error(`Layers.enable(): Layer must be between 0 and 31, got ${layer}`);
    }
    this.#mask |= (1 << layer);
    return this;
  }

  /**
   * Disables a layer (removes from mask).
   * @param {number} layer - Layer index (0-31).
   * @returns {this} For chaining.
   * @throws {Error} If layer is out of range.
   */
  disable(layer) {
    if (layer < 0 || layer > 31) {
      throw new Error(`Layers.disable(): Layer must be between 0 and 31, got ${layer}`);
    }
    this.#mask &= ~(1 << layer);
    return this;
  }

  /**
   * Toggles a layer.
   * @param {number} layer - Layer index (0-31).
   * @returns {this} For chaining.
   * @throws {Error} If layer is out of range.
   */
  toggle(layer) {
    if (layer < 0 || layer > 31) {
      throw new Error(`Layers.toggle(): Layer must be between 0 and 31, got ${layer}`);
    }
    this.#mask ^= (1 << layer);
    return this;
  }

  /**
   * Sets the mask directly.
   * @param {number} mask - Bitmask value.
   * @returns {this} For chaining.
   */
  setMask(mask) {
    this.#mask = mask & 0xFFFFFFFF;
    return this;
  }

  /**
   * Tests if this layers intersects with another.
   * @param {Layers} other - Other Layers instance.
   * @returns {boolean} True if any common layer.
   */
  test(other) {
    if (!(other instanceof Layers)) {
      throw new TypeError('Layers.test(): Expected Layers instance');
    }
    return (this.#mask & other.#mask) !== 0;
  }

  /**
   * Tests if this layers intersects with a mask.
   * @param {number} mask - Bitmask to test.
   * @returns {boolean} True if any common layer.
   */
  testMask(mask) {
    return (this.#mask & mask) !== 0;
  }

  /**
   * Tests if a specific layer is the only layer set.
   * @param {number} layer - Layer index (0-31).
   * @returns {boolean} True if only this layer is set.
   */
  isOnly(layer) {
    if (layer < 0 || layer > 31) return false;
    return this.#mask === (1 << layer);
  }

  /**
   * Tests if exactly these layers are set (no more, no less).
   * @param {...number} layers - Layer indices.
   * @returns {boolean} True if exactly these layers are set.
   */
  isExactly(...layers) {
    let mask = 0;
    for (const layer of layers) {
      if (layer < 0 || layer > 31) return false;
      mask |= (1 << layer);
    }
    return this.#mask === mask;
  }

  /**
   * Gets all enabled layer indices.
   * @returns {Array<number>} Array of layer indices.
   */
  getEnabledLayers() {
    const result = [];
    let mask = this.#mask;
    let index = 0;
    while (mask !== 0) {
      if (mask & 1) {
        result.push(index);
      }
      mask >>= 1;
      index++;
    }
    return result;
  }

  /**
   * Counts the number of enabled layers.
   * @returns {number} Number of enabled layers.
   */
  count() {
    let count = 0;
    let mask = this.#mask;
    while (mask !== 0) {
      count += mask & 1;
      mask >>= 1;
    }
    return count;
  }

  /**
   * Resets to default layer (0).
   * @returns {this} For chaining.
   */
  reset() {
    this.#mask = 1;
    return this;
  }

  /**
   * Creates a clone of this Layers instance.
   * @returns {Layers} Cloned instance.
   */
  clone() {
    const layers = new Layers();
    layers.setMask(this.#mask);
    return layers;
  }

  /**
   * Converts to string representation.
   * @returns {string} String representation.
   */
  toString() {
    const enabled = this.getEnabledLayers();
    if (enabled.length === 0) return 'Layers(empty)';
    return `Layers(${enabled.join(', ')})`;
  }

  /**
   * Creates Layers with a specific layer.
   * @param {number} layer - Layer index (0-31).
   * @returns {Layers} New Layers instance.
   */
  static fromLayer(layer) {
    const layers = new Layers();
    return layers.set(layer);
  }

  /**
   * Creates Layers from a mask.
   * @param {number} mask - Bitmask.
   * @returns {Layers} New Layers instance.
   */
  static fromMask(mask) {
    const layers = new Layers();
    return layers.setMask(mask);
  }

  /**
   * Creates Layers with multiple layers enabled.
   * @param {...number} layers - Layer indices.
   * @returns {Layers} New Layers instance.
   */
  static fromLayers(...layers) {
    const layersObj = new Layers();
    for (const layer of layers) {
      layersObj.enable(layer);
    }
    return layersObj;
  }

  /**
   * Creates Layers with all layers enabled.
   * @returns {Layers} New Layers instance.
   */
  static all() {
    const layers = new Layers();
    layers.setMask(0xFFFFFFFF);
    return layers;
  }

  /**
   * Creates Layers with no layers enabled.
   * @returns {Layers} New Layers instance.
   */
  static none() {
    const layers = new Layers();
    layers.setMask(0);
    return layers;
  }

  /**
   * Maximum number of layers (32 bits).
   * @type {number}
   */
  static get MAX_LAYERS() { return 32; }

  /**
   * Creates a mask from multiple layers.
   * @param {...number} layers - Layer indices.
   * @returns {number} Combined mask.
   */
  static maskFromLayers(...layers) {
    let mask = 0;
    for (const layer of layers) {
      if (layer >= 0 && layer <= 31) {
        mask |= (1 << layer);
      }
    }
    return mask;
  }

  /**
   * Checks if two layers instances intersect.
   * @param {Layers} a - First Layers instance.
   * @param {Layers} b - Second Layers instance.
   * @returns {boolean} True if they intersect.
   */
  static intersects(a, b) {
    if (!(a instanceof Layers) || !(b instanceof Layers)) {
      throw new TypeError('Layers.intersects(): Expected Layers instances');
    }
    return a.test(b);
  }

  /**
   * Checks if a layers instance contains a specific layer.
   * @param {Layers} layers - Layers instance.
   * @param {number} layer - Layer index.
   * @returns {boolean} True if contains layer.
   */
  static contains(layers, layer) {
    if (!(layers instanceof Layers)) {
      throw new TypeError('Layers.contains(): Expected Layers instance');
    }
    return layers.isEnabled(layer);
  }
}

export default Layers;

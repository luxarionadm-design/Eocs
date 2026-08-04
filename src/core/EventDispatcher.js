/**
 * Event dispatcher for pub/sub communication.
 * Provides event handling capabilities for objects.
 * 
 * Optimization: Uses Map for faster lookups and reduces GC.
 * 
 * @example
 * const dispatcher = new EventDispatcher();
 * dispatcher.addEventListener('update', (data) => console.log(data));
 * dispatcher.dispatchEvent({ type: 'update', data: 'Hello' });
 */
class EventDispatcher {
  /** @type {Map<string, Set<Function>>} */ #listeners;
  /** @type {Map<string, Map<Function, {once: boolean}>>} */ #listenerMeta;

  /**
   * Creates a new EventDispatcher.
   */
  constructor() {
    this.#listeners = new Map();
    this.#listenerMeta = new Map();
  }

  /**
   * Adds an event listener.
   * @param {string} type - Event type.
   * @param {Function} listener - Callback function.
   * @param {object} [options] - Listener options.
   * @param {boolean} [options.once=false] - Whether to call once.
   * @returns {this} For chaining.
   */
  addEventListener(type, listener, options = {}) {
    if (typeof listener !== 'function') {
      throw new TypeError('EventDispatcher.addEventListener(): Listener must be a function');
    }

    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set());
      this.#listenerMeta.set(type, new Map());
    }

    const listeners = this.#listeners.get(type);
    const meta = this.#listenerMeta.get(type);

    if (!listeners.has(listener)) {
      listeners.add(listener);
      meta.set(listener, { once: !!options.once });
    }

    return this;
  }

  /**
   * Removes an event listener.
   * @param {string} type - Event type.
   * @param {Function} listener - Callback function to remove.
   * @returns {this} For chaining.
   */
  removeEventListener(type, listener) {
    if (!this.#listeners.has(type)) return this;

    const listeners = this.#listeners.get(type);
    const meta = this.#listenerMeta.get(type);

    if (listeners.has(listener)) {
      listeners.delete(listener);
      meta.delete(listener);

      if (listeners.size === 0) {
        this.#listeners.delete(type);
        this.#listenerMeta.delete(type);
      }
    }

    return this;
  }

  /**
   * Removes all listeners for a specific type or all types.
   * @param {string} [type] - Event type to remove (all if omitted).
   * @returns {this} For chaining.
   */
  removeAllListeners(type = null) {
    if (type) {
      this.#listeners.delete(type);
      this.#listenerMeta.delete(type);
    } else {
      this.#listeners.clear();
      this.#listenerMeta.clear();
    }
    return this;
  }

  /**
   * Dispatches an event.
   * @param {object|string} event - Event object or event type string.
   * @param {any} [data] - Event data (if event is string).
   * @returns {boolean} True if event was handled.
   */
  dispatchEvent(event, data = null) {
    let eventObj;
    let type;

    if (typeof event === 'string') {
      type = event;
      eventObj = { type, data };
    } else if (event && typeof event === 'object') {
      type = event.type;
      eventObj = event;
      eventObj.target = eventObj.target || this;
    } else {
      throw new TypeError('EventDispatcher.dispatchEvent(): Event must be string or object');
    }

    if (!this.#listeners.has(type)) return false;

    const listeners = this.#listeners.get(type);
    const meta = this.#listenerMeta.get(type);

    const listenerArray = Array.from(listeners);

    let handled = false;

    for (const listener of listenerArray) {
      if (!listeners.has(listener)) continue;

      const listenerMeta = meta.get(listener);
      if (listenerMeta && listenerMeta.once) {
        listeners.delete(listener);
        meta.delete(listener);
      }

      try {
        listener.call(this, eventObj);
        handled = true;
      } catch (error) {
        console.error(`EventDispatcher: Error in listener for "${type}":`, error);
      }
    }

    if (listeners.size === 0) {
      this.#listeners.delete(type);
      this.#listenerMeta.delete(type);
    }

    return handled;
  }

  /**
   * Checks if there are listeners for an event type.
   * @param {string} type - Event type.
   * @param {Function} [listener] - Specific listener to check.
   * @returns {boolean} True if listener(s) exist.
   */
  hasEventListener(type, listener = null) {
    if (!this.#listeners.has(type)) return false;
    if (listener === null) return true;
    return this.#listeners.get(type).has(listener);
  }

  /**
   * Gets the number of listeners for a type.
   * @param {string} type - Event type.
   * @returns {number} Number of listeners.
   */
  listenerCount(type) {
    if (!this.#listeners.has(type)) return 0;
    return this.#listeners.get(type).size;
  }

  /**
   * Gets all event types with listeners.
   * @returns {Array<string>} Array of event types.
   */
  eventNames() {
    return Array.from(this.#listeners.keys());
  }

  /**
   * Adds a one-time event listener.
   * @param {string} type - Event type.
   * @param {Function} listener - Callback function.
   * @returns {this} For chaining.
   */
  once(type, listener) {
    return this.addEventListener(type, listener, { once: true });
  }

  /**
   * Waits for an event to be dispatched.
   * @param {string} type - Event type.
   * @param {number} [timeout=0] - Timeout in milliseconds (0 = no timeout).
   * @returns {Promise<object>} Promise that resolves with event data.
   */
  waitFor(type, timeout = 0) {
    return new Promise((resolve, reject) => {
      let timer = null;

      const listener = (event) => {
        this.removeEventListener(type, listener);
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        resolve(event);
      };

      this.addEventListener(type, listener, { once: true });

      if (timeout > 0) {
        timer = setTimeout(() => {
          this.removeEventListener(type, listener);
          reject(new Error(`EventDispatcher.waitFor(): Timeout waiting for "${type}" event`));
        }, timeout);
      }
    });
  }

  /**
   * Alias for addEventListener.
   * @param {string} type - Event type.
   * @param {Function} listener - Callback function.
   * @returns {this} For chaining.
   */
  on(type, listener) {
    return this.addEventListener(type, listener);
  }

  /**
   * Alias for removeEventListener.
   * @param {string} type - Event type.
   * @param {Function} listener - Callback function.
   * @returns {this} For chaining.
   */
  off(type, listener) {
    return this.removeEventListener(type, listener);
  }

  /**
   * Alias for dispatchEvent.
   * @param {string} type - Event type.
   * @param {any} [data] - Event data.
   * @returns {boolean} True if event was handled.
   */
  emit(type, data = null) {
    return this.dispatchEvent(type, data);
  }

  /**
   * Creates a new EventDispatcher.
   * @returns {EventDispatcher}
   */
  static create() {
    return new EventDispatcher();
  }

  /**
   * Mixes EventDispatcher functionality into a target object.
   * @param {object} target - Target object to mix into.
   * @returns {object} The target object with event methods.
   */
  static mixin(target) {
    const dispatcher = new EventDispatcher();

    target.addEventListener = dispatcher.addEventListener.bind(dispatcher);
    target.removeEventListener = dispatcher.removeEventListener.bind(dispatcher);
    target.removeAllListeners = dispatcher.removeAllListeners.bind(dispatcher);
    target.dispatchEvent = dispatcher.dispatchEvent.bind(dispatcher);
    target.hasEventListener = dispatcher.hasEventListener.bind(dispatcher);
    target.listenerCount = dispatcher.listenerCount.bind(dispatcher);
    target.eventNames = dispatcher.eventNames.bind(dispatcher);
    target.once = dispatcher.once.bind(dispatcher);
    target.waitFor = dispatcher.waitFor.bind(dispatcher);
    target.on = dispatcher.on.bind(dispatcher);
    target.off = dispatcher.off.bind(dispatcher);
    target.emit = dispatcher.emit.bind(dispatcher);

    target._dispatcher = dispatcher;

    return target;
  }
}

export default EventDispatcher;

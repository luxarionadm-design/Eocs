/**
 * @fileoverview Stream operations
 * @module Stream
 * @namespace LXRN.IO
 * @memberof LXRN
 * 
 * @description
 * Provides stream operations including readable and writable streams
 * with buffering and flow control.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { ReadableStream, WritableStream } from '@lxrn/core';
 * 
 * const reader = new ReadableStream('Hello World');
 * const writer = new WritableStream();
 * writer.pipe(reader);
 * console.log(writer.toString()); // 'Hello World'
 */

import { Optional, optional } from '../container/Optional.js';
import { isString, isNumber, isFunction } from '../core/Types.js';
import { StreamError, ValidationError } from '../core/Error.js';

/**
 * ReadableStream class - reading data from a source
 * @class
 */
export class ReadableStream {
  /**
   * Create a new ReadableStream
   * @param {string|Array|Function} source - Data source
   * @param {Object} [options] - Stream options
   */
  constructor(source, options = {}) {
    this._source = source;
    this._options = options;
    this._position = 0;
    this._buffer = [];
    this._ended = false;
    this._initializeSource();
  }

  /**
   * Initialize source (internal)
   * @private
   */
  _initializeSource() {
    if (isString(this._source)) {
      this._data = this._source.split('');
    } else if (Array.isArray(this._source)) {
      this._data = this._source;
    } else if (isFunction(this._source)) {
      this._generator = this._source;
      this._data = [];
    } else {
      throw new ValidationError('Source must be a string, array, or function');
    }
  }

  /**
   * Read a chunk of data
   * @param {number} [size=1024] - Chunk size
   * @returns {Optional} Chunk or empty optional
   */
  read(size = 1024) {
    if (this._ended) return optional();
    
    const chunk = [];
    let count = 0;
    while (count < size) {
      if (this._buffer.length > 0) {
        chunk.push(this._buffer.shift());
        count++;
      } else {
        const data = this._next();
        if (data === null) {
          this._ended = true;
          break;
        }
        this._buffer.push(data);
      }
    }
    return chunk.length > 0 ? optional(chunk) : optional();
  }

  /**
   * Read one character
   * @returns {Optional} Character or empty optional
   */
  readChar() {
    const chunk = this.read(1);
    if (chunk.hasValue()) {
      return optional(chunk.get()[0]);
    }
    return optional();
  }

  /**
   * Read line
   * @returns {Optional} Line or empty optional
   */
  readLine() {
    if (this._ended) return optional();
    let line = '';
    while (true) {
      const char = this.readChar();
      if (!char.hasValue()) break;
      const c = char.get();
      if (c === '\n') break;
      if (c !== '\r') line += c;
    }
    return line.length > 0 ? optional(line) : optional();
  }

  /**
   * Read all remaining data
   * @returns {string} All remaining data
   */
  readAll() {
    let result = '';
    while (true) {
      const chunk = this.read();
      if (!chunk.hasValue()) break;
      result += chunk.get().join('');
    }
    return result;
  }

  /**
   * Get next data from source (internal)
   * @returns {*} Next data or null
   * @private
   */
  _next() {
    if (this._generator) {
      const result = this._generator();
      return result !== undefined ? result : null;
    }
    if (this._position < this._data.length) {
      return this._data[this._position++];
    }
    return null;
  }

  /**
   * Check if stream has ended
   * @returns {boolean} True if ended
   */
  ended() {
    return this._ended;
  }

  /**
   * Get current position
   * @returns {number} Position
   */
  getPosition() {
    return this._position;
  }

  /**
   * Reset stream to beginning
   */
  reset() {
    this._position = 0;
    this._buffer = [];
    this._ended = false;
    if (isString(this._source) || Array.isArray(this._source)) {
      this._data = this._source;
    }
  }
}

/**
 * WritableStream class - writing data to a destination
 * @class
 */
export class WritableStream {
  /**
   * Create a new WritableStream
   * @param {Object} [options] - Stream options
   */
  constructor(options = {}) {
    this._options = options;
    this._buffer = [];
    this._closed = false;
  }

  /**
   * Write data to the stream
   * @param {string|Array} data - Data to write
   * @returns {WritableStream} This instance for chaining
   */
  write(data) {
    if (this._closed) {
      throw new StreamError('Stream is closed');
    }
    if (isString(data)) {
      this._buffer.push(...data.split(''));
    } else if (Array.isArray(data)) {
      this._buffer.push(...data);
    } else {
      throw new ValidationError('Data must be a string or array');
    }
    return this;
  }

  /**
   * Write a character
   * @param {string} char - Character to write
   * @returns {WritableStream} This instance for chaining
   */
  writeChar(char) {
    if (!isString(char) || char.length !== 1) {
      throw new ValidationError('Character must be a single character');
    }
    return this.write(char);
  }

  /**
   * Write a line (adds newline)
   * @param {string} line - Line to write
   * @returns {WritableStream} This instance for chaining
   */
  writeLine(line) {
    this.write(line + '\n');
    return this;
  }

  /**
   * Read data from a ReadableStream into this stream
   * @param {ReadableStream} source - Source stream
   * @param {number} [chunkSize=1024] - Chunk size
   * @returns {WritableStream} This instance for chaining
   */
  pipe(source, chunkSize = 1024) {
    if (!(source instanceof ReadableStream)) {
      throw new ValidationError('Source must be a ReadableStream');
    }
    while (true) {
      const chunk = source.read(chunkSize);
      if (!chunk.hasValue()) break;
      this.write(chunk.get());
    }
    return this;
  }

  /**
   * Get all written data as string
   * @returns {string} Data as string
   */
  toString() {
    return this._buffer.join('');
  }

  /**
   * Get all written data as array
   * @returns {Array} Data as array
   */
  toArray() {
    return [...this._buffer];
  }

  /**
   * Get the size of written data
   * @returns {number} Size
   */
  size() {
    return this._buffer.length;
  }

  /**
   * Check if the stream is empty
   * @returns {boolean} True if empty
   */
  isEmpty() {
    return this._buffer.length === 0;
  }

  /**
   * Clear the stream
   */
  clear() {
    this._buffer = [];
  }

  /**
   * Close the stream
   */
  close() {
    this._closed = true;
  }

  /**
   * Check if stream is closed
   * @returns {boolean} True if closed
   */
  isClosed() {
    return this._closed;
  }
}

/**
 * Create a pipe between readable and writable streams
 * @param {ReadableStream} readable - Readable stream
 * @param {WritableStream} writable - Writable stream
 * @param {number} [chunkSize=1024] - Chunk size
 * @returns {WritableStream} Writable stream
 */
export function pipe(readable, writable, chunkSize = 1024) {
  return writable.pipe(readable, chunkSize);
}

/**
 * Default export containing stream classes
 * @type {Object}
 */
export default {
  ReadableStream,
  WritableStream,
  pipe
};

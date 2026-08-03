import { NumericValues } from '../constants/values.js';
import { ErrorCodes } from '../constants/errors.js';
import { Messages } from '../constants/messages.js';

const __private = new WeakMap();

export class HybridTypedArray {
  constructor(lengthOrArray) {
    this._buffer = this.#createBuffer(lengthOrArray);
    this.length = this._buffer.length;
    this.BYTES_PER_ELEMENT = this._buffer.BYTES_PER_ELEMENT;

    __private.set(this, {
      type: 'HybridTypedArray',
      metadata: {}
    });
  }

  #createBuffer(input) {
    if (Array.isArray(input)) {
      return new Uint8Array(input);
    } else if (typeof input === 'number') {
      return new Uint8Array(input);
    } else if (input instanceof ArrayBuffer) {
      return new Uint8Array(input);
    } else if (input instanceof Uint8Array) {
      return new Uint8Array(input);
    } else {
      throw new Error(`${ErrorCodes.INVALID_INPUT}: ${Messages.INVALID}`);
    }
  }

  #clamp(value) {
    const num = Math.round(Number(value));
    if (num < 0) return 0;
    if (num > 255) return 255;
    return num;
  }

  #validateIndex(index) {
    if (index < 0 || index >= this.length) {
      throw new RangeError(`${ErrorCodes.OUT_OF_RANGE}`);
    }
    return true;
  }

  get(index) {
    this.#validateIndex(index);
    return this._buffer[index];
  }

  set(index, value) {
    this.#validateIndex(index);
    this._buffer[index] = this.#clamp(value);
    return this;
  }

  toArray() {
    return Array.from(this._buffer);
  }

  toNative() {
    return this._buffer;
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this._buffer[i], i, this);
    }
    return this;
  }

  map(callback) {
    const result = new HybridTypedArray(this.length);
    for (let i = 0; i < this.length; i++) {
      result._buffer[i] = this.#clamp(callback(this._buffer[i], i, this));
    }
    return result;
  }

  filter(callback) {
    const temp = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this._buffer[i], i, this)) {
        temp.push(this._buffer[i]);
      }
    }
    const result = new HybridTypedArray(temp.length);
    for (let i = 0; i < temp.length; i++) {
      result._buffer[i] = temp[i];
    }
    return result;
  }

  reduce(callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this._buffer[0];
    const start = initialValue !== undefined ? 0 : 1;
    for (let i = start; i < this.length; i++) {
      accumulator = callback(accumulator, this._buffer[i], i, this);
    }
    return accumulator;
  }

  slice(start = 0, end = this.length) {
    const sliced = this._buffer.slice(start, end);
    return new HybridTypedArray(sliced);
  }

  splice(start, deleteCount, ...items) {
    const arr = Array.from(this._buffer);
    const deleted = arr.splice(start, deleteCount, ...items.map(v => this.#clamp(v)));
    const result = new HybridTypedArray(deleted);
    this._buffer = new Uint8Array(arr);
    this.length = this._buffer.length;
    return result;
  }

  fill(value, start = 0, end = this.length) {
    this._buffer.fill(this.#clamp(value), start, end);
    return this;
  }

  includes(value) {
    return this._buffer.includes(value);
  }

  indexOf(value) {
    return this._buffer.indexOf(value);
  }

  lastIndexOf(value) {
    return this._buffer.lastIndexOf(value);
  }

  find(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this._buffer[i], i, this)) {
        return this._buffer[i];
      }
    }
    return undefined;
  }

  findIndex(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this._buffer[i], i, this)) {
        return i;
      }
    }
    return -1;
  }

  some(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this._buffer[i], i, this)) {
        return true;
      }
    }
    return false;
  }

  every(callback) {
    for (let i = 0; i < this.length; i++) {
      if (!callback(this._buffer[i], i, this)) {
        return false;
      }
    }
    return true;
  }

  sort(compareFn) {
    const arr = Array.from(this._buffer);
    arr.sort(compareFn);
    for (let i = 0; i < arr.length; i++) {
      this._buffer[i] = arr[i];
    }
    return this;
  }

  reverse() {
    this._buffer.reverse();
    return this;
  }

  subarray(start = 0, end = this.length) {
    const sub = this._buffer.subarray(start, end);
    const result = new HybridTypedArray(sub.length);
    result._buffer = sub;
    return result;
  }

  copyWithin(target, start = 0, end = this.length) {
    this._buffer.copyWithin(target, start, end);
    return this;
  }

  entries() {
    return this._buffer.entries();
  }

  keys() {
    return this._buffer.keys();
  }

  values() {
    return this._buffer.values();
  }

  toString() {
    return this._buffer.toString();
  }

  join(separator = ',') {
    return this._buffer.join(separator);
  }

  [Symbol.iterator]() {
    return this._buffer[Symbol.iterator]();
  }

  add(value) {
    const num = Number(value);
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp(this._buffer[i] + num);
    }
    return this;
  }

  subtract(value) {
    const num = Number(value);
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp(this._buffer[i] - num);
    }
    return this;
  }

  multiply(value) {
    const num = Number(value);
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp(this._buffer[i] * num);
    }
    return this;
  }

  divide(value) {
    const num = Number(value);
    if (num === 0) {
      throw new Error(ErrorCodes.DIVIDE_BY_ZERO);
    }
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp(this._buffer[i] / num);
    }
    return this;
  }

  power(exponent) {
    const exp = Number(exponent);
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp(Math.pow(this._buffer[i], exp));
    }
    return this;
  }

  sqrt() {
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp(Math.sqrt(this._buffer[i]));
    }
    return this;
  }

  abs() {
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp(Math.abs(this._buffer[i]));
    }
    return this;
  }

  min() {
    let min = this._buffer[0];
    for (let i = 1; i < this.length; i++) {
      if (this._buffer[i] < min) {
        min = this._buffer[i];
      }
    }
    return min;
  }

  max() {
    let max = this._buffer[0];
    for (let i = 1; i < this.length; i++) {
      if (this._buffer[i] > max) {
        max = this._buffer[i];
      }
    }
    return max;
  }

  sum() {
    let total = 0;
    for (let i = 0; i < this.length; i++) {
      total += this._buffer[i];
    }
    return total;
  }

  average() {
    if (this.length === 0) return 0;
    return this.sum() / this.length;
  }

  normalize() {
    const max = this.max();
    if (max === 0) return this;
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this.#clamp((this._buffer[i] / max) * 255);
    }
    return this;
  }

  clip(min, max) {
    const minVal = Number(min);
    const maxVal = Number(max);
    for (let i = 0; i < this.length; i++) {
      if (this._buffer[i] < minVal) {
        this._buffer[i] = minVal;
      } else if (this._buffer[i] > maxVal) {
        this._buffer[i] = maxVal;
      }
    }
    return this;
  }

  threshold(value) {
    const thresh = Number(value);
    for (let i = 0; i < this.length; i++) {
      this._buffer[i] = this._buffer[i] >= thresh ? 255 : 0;
    }
    return this;
  }

  convolve(kernel) {
    const kernelSize = kernel.length;
    const half = Math.floor(kernelSize / 2);
    const result = new Uint8Array(this.length);
    for (let i = 0; i < this.length; i++) {
      let sum = 0;
      for (let j = 0; j < kernelSize; j++) {
        const idx = i + j - half;
        if (idx >= 0 && idx < this.length) {
          sum += this._buffer[idx] * kernel[j];
        }
      }
      result[i] = this.#clamp(sum);
    }
    this._buffer = result;
    return this;
  }

  gaussianBlur(sigma = 1.0) {
    const size = Math.ceil(sigma * 3) * 2 + 1;
    const kernel = [];
    let sum = 0;
    const center = Math.floor(size / 2);
    for (let i = 0; i < size; i++) {
      const x = i - center;
      const value = Math.exp(-(x * x) / (2 * sigma * sigma));
      kernel.push(value);
      sum += value;
    }
    for (let i = 0; i < kernel.length; i++) {
      kernel[i] /= sum;
    }
    return this.convolve(kernel);
  }

  histogram() {
    const hist = new Array(256).fill(0);
    for (let i = 0; i < this.length; i++) {
      hist[this._buffer[i]]++;
    }
    return hist;
  }

  resize(newLength) {
    const newBuffer = new Uint8Array(newLength);
    const minLength = Math.min(this.length, newLength);
    for (let i = 0; i < minLength; i++) {
      newBuffer[i] = this._buffer[i];
    }
    this._buffer = newBuffer;
    this.length = this._buffer.length;
    return this;
  }

  static from(arrayLike) {
    if (arrayLike instanceof HybridTypedArray) {
      return new HybridTypedArray(arrayLike._buffer);
    }
    return new HybridTypedArray(Array.from(arrayLike));
  }

  static of(...items) {
    return new HybridTypedArray(items);
  }

  static fromNative(nativeArray) {
    if (!(nativeArray instanceof Uint8Array)) {
      throw new Error('Expected Uint8Array instance');
    }
    return new HybridTypedArray(nativeArray);
  }

  static concat(arrays) {
    if (!Array.isArray(arrays)) {
      throw new Error('Expected array of TypedArrays');
    }
    let totalLength = 0;
    for (const arr of arrays) {
      if (arr instanceof HybridTypedArray) {
        totalLength += arr.length;
      } else if (arr instanceof Uint8Array) {
        totalLength += arr.length;
      } else {
        throw new Error('Each element must be HybridTypedArray or Uint8Array');
      }
    }
    const result = new HybridTypedArray(totalLength);
    let offset = 0;
    for (const arr of arrays) {
      const buffer = arr instanceof HybridTypedArray ? arr._buffer : arr;
      for (let i = 0; i < buffer.length; i++) {
        result._buffer[offset + i] = buffer[i];
      }
      offset += buffer.length;
    }
    return result;
  }

  _getPrivate() {
    return __private.get(this);
  }

  __clearCache() {
    __private.get(this).cache.clear();
    return this;
  }
}

export default HybridTypedArray;

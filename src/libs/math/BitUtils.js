/**
 * @fileoverview Bit Manipulation Utilities - Bit-level operations for LXRN
 * @module BitUtils
 * @namespace LXRN.Math
 * @memberof LXRN
 * 
 * @description
 * This module provides comprehensive bit manipulation utilities including
 * byte swapping, endianness detection, bit rotation, population count,
 * power of two operations, alignment, and bit extraction/insertion.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { bswap16, isPowerOfTwo, alignUp, getBit } from '@lxrn/core';
 * 
 * console.log(bswap16(0x1234)); // 0x3412
 * console.log(isPowerOfTwo(16)); // true
 * console.log(alignUp(7, 4)); // 8
 * console.log(getBit(0b1010, 2)); // 0
 */

/**
 * Swap bytes in 16-bit value
 * @param {number} x - Input value
 * @returns {number} Byte-swapped value
 */
export function bswap16(x) {
  return ((x & 0xFF) << 8) | ((x & 0xFF00) >> 8);
}

/**
 * Swap bytes in 32-bit value
 * @param {number} x - Input value
 * @returns {number} Byte-swapped value
 */
export function bswap32(x) {
  return ((x & 0xFF) << 24) |
         ((x & 0xFF00) << 8) |
         ((x & 0xFF0000) >> 8) |
         ((x & 0xFF000000) >>> 24);
}

/**
 * Swap bytes in 64-bit value
 * @param {number} x - Input value
 * @returns {number} Byte-swapped value
 */
export function bswap64(x) {
  x = ((x & 0x00000000FFFFFFFF) << 32) | ((x & 0xFFFFFFFF00000000) >>> 32);
  x = ((x & 0x0000FFFF0000FFFF) << 16) | ((x & 0xFFFF0000FFFF0000) >>> 16);
  x = ((x & 0x00FF00FF00FF00FF) << 8) | ((x & 0xFF00FF00FF00FF00) >>> 8);
  return x;
}

/**
 * Check if system is big endian
 * @returns {boolean} True if big endian
 */
export function isBigEndian() {
  const buffer = new ArrayBuffer(2);
  const view = new DataView(buffer);
  view.setUint16(0, 0x1234, false);
  return view.getUint8(0) === 0x12;
}

/**
 * Check if system is little endian
 * @returns {boolean} True if little endian
 */
export function isLittleEndian() {
  return !isBigEndian();
}

/**
 * Swap endianness of 16-bit value
 * @param {number} value - Input value
 * @returns {number} Endian-swapped value
 */
export function swapEndian16(value) {
  return bswap16(value);
}

/**
 * Swap endianness of 32-bit value
 * @param {number} value - Input value
 * @returns {number} Endian-swapped value
 */
export function swapEndian32(value) {
  return bswap32(value);
}

/**
 * Swap endianness of 64-bit value
 * @param {number} value - Input value
 * @returns {number} Endian-swapped value
 */
export function swapEndian64(value) {
  return bswap64(value);
}

/**
 * Rotate left
 * @param {number} value - Input value
 * @param {number} shift - Shift amount
 * @param {number} [bits=32] - Number of bits
 * @returns {number} Rotated value
 */
export function rotateLeft(value, shift, bits = 32) {
  const mask = bits === 32 ? 0xFFFFFFFF : 0xFFFFFFFFFFFFFFFF;
  return ((value << shift) | (value >>> (bits - shift))) & mask;
}

/**
 * Rotate right
 * @param {number} value - Input value
 * @param {number} shift - Shift amount
 * @param {number} [bits=32] - Number of bits
 * @returns {number} Rotated value
 */
export function rotateRight(value, shift, bits = 32) {
  const mask = bits === 32 ? 0xFFFFFFFF : 0xFFFFFFFFFFFFFFFF;
  return ((value >>> shift) | (value << (bits - shift))) & mask;
}

/**
 * Count set bits (popcount)
 * @param {number} value - Input value
 * @returns {number} Number of set bits
 */
export function bitCount(value) {
  let count = 0;
  while (value) {
    count += value & 1;
    value >>>= 1;
  }
  return count;
}

/**
 * Popcount (alias for bitCount)
 * @param {number} value - Input value
 * @returns {number} Number of set bits
 */
export function popCount(value) {
  return bitCount(value);
}

/**
 * Get bit length
 * @param {number} value - Input value
 * @returns {number} Bit length
 */
export function bitLength(value) {
  return Math.floor(Math.log2(value)) + 1;
}

/**
 * Check if value is power of two
 * @param {number} value - Input value
 * @returns {boolean} True if power of two
 */
export function isPowerOfTwo(value) {
  return value > 0 && (value & (value - 1)) === 0;
}

/**
 * Get next power of two
 * @param {number} value - Input value
 * @returns {number} Next power of two
 */
export function nextPowerOfTwo(value) {
  if (value <= 0) return 1;
  let result = 1;
  while (result < value) {
    result <<= 1;
  }
  return result;
}

/**
 * Get previous power of two
 * @param {number} value - Input value
 * @returns {number} Previous power of two
 */
export function prevPowerOfTwo(value) {
  if (value <= 0) return 0;
  let result = 1;
  while ((result << 1) <= value) {
    result <<= 1;
  }
  return result;
}

/**
 * Align value up to alignment boundary
 * @param {number} value - Input value
 * @param {number} alignment - Alignment (power of two)
 * @returns {number} Aligned value
 */
export function alignUp(value, alignment) {
  return ((value + alignment - 1) & ~(alignment - 1));
}

/**
 * Align value down to alignment boundary
 * @param {number} value - Input value
 * @param {number} alignment - Alignment (power of two)
 * @returns {number} Aligned value
 */
export function alignDown(value, alignment) {
  return (value & ~(alignment - 1));
}

/**
 * Check if value is aligned
 * @param {number} value - Input value
 * @param {number} alignment - Alignment (power of two)
 * @returns {boolean} True if aligned
 */
export function isAligned(value, alignment) {
  return (value & (alignment - 1)) === 0;
}

/**
 * Get bit at position
 * @param {number} value - Input value
 * @param {number} position - Bit position
 * @returns {number} Bit value (0 or 1)
 */
export function getBit(value, position) {
  return (value >> position) & 1;
}

/**
 * Set bit at position
 * @param {number} value - Input value
 * @param {number} position - Bit position
 * @param {number} bit - Bit value (0 or 1)
 * @returns {number} Modified value
 */
export function setBit(value, position, bit) {
  if (bit) {
    return value | (1 << position);
  } else {
    return value & ~(1 << position);
  }
}

/**
 * Toggle bit at position
 * @param {number} value - Input value
 * @param {number} position - Bit position
 * @returns {number} Modified value
 */
export function toggleBit(value, position) {
  return value ^ (1 << position);
}

/**
 * Get bits from value
 * @param {number} value - Input value
 * @param {number} start - Start position
 * @param {number} count - Number of bits
 * @returns {number} Extracted bits
 */
export function getBits(value, start, count) {
  return (value >> start) & ((1 << count) - 1);
}

/**
 * Set bits in value
 * @param {number} value - Input value
 * @param {number} start - Start position
 * @param {number} count - Number of bits
 * @param {number} bits - Bits to set
 * @returns {number} Modified value
 */
export function setBits(value, start, count, bits) {
  const mask = ((1 << count) - 1) << start;
  return (value & ~mask) | ((bits << start) & mask);
}

/**
 * Extract bits (alias for getBits)
 * @param {number} value - Input value
 * @param {number} start - Start position
 * @param {number} count - Number of bits
 * @returns {number} Extracted bits
 */
export function extractBits(value, start, count) {
  return getBits(value, start, count);
}

/**
 * Insert bits (alias for setBits)
 * @param {number} value - Input value
 * @param {number} start - Start position
 * @param {number} count - Number of bits
 * @param {number} bits - Bits to insert
 * @returns {number} Modified value
 */
export function insertBits(value, start, count, bits) {
  return setBits(value, start, count, bits);
}

/**
 * Sign extend value
 * @param {number} value - Input value
 * @param {number} bits - Number of bits
 * @returns {number} Sign-extended value
 */
export function signExtend(value, bits) {
  const mask = 1 << (bits - 1);
  return (value & (mask - 1)) - (value & mask);
}

/**
 * Zero extend value
 * @param {number} value - Input value
 * @param {number} bits - Number of bits
 * @returns {number} Zero-extended value
 */
export function zeroExtend(value, bits) {
  return value & ((1 << bits) - 1);
}

/**
 * Hash bits (murmur-style hash)
 * @param {number} value - Input value
 * @returns {number} Hashed value
 */
export function hashBits(value) {
  value = ((value >>> 16) ^ value) * 0x45d9f3b;
  value = ((value >>> 16) ^ value) * 0x45d9f3b;
  value = (value >>> 16) ^ value;
  return value;
}

/**
 * Default export containing all bit utilities
 * @type {Object}
 */
export default {
  bswap16,
  bswap32,
  bswap64,
  isBigEndian,
  isLittleEndian,
  swapEndian16,
  swapEndian32,
  swapEndian64,
  rotateLeft,
  rotateRight,
  bitCount,
  popCount,
  bitLength,
  isPowerOfTwo,
  nextPowerOfTwo,
  prevPowerOfTwo,
  alignUp,
  alignDown,
  isAligned,
  getBit,
  setBit,
  toggleBit,
  getBits,
  setBits,
  extractBits,
  insertBits,
  signExtend,
  zeroExtend,
  hashBits
};

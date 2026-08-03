/**
 * @fileoverview Mathematical Utilities - Comprehensive math functions for LXRN
 * @module MathUtils
 * @namespace LXRN.Math
 * @memberof LXRN
 * 
 * @description
 * This module provides a comprehensive collection of mathematical functions
 * including basic arithmetic, trigonometry, statistics, number theory,
 * and utility functions like clamping, interpolation, and random generation.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { clamp, gcd, average, lerp, radians } from '@lxrn/core';
 * 
 * console.log(clamp(15, 0, 10)); // 10
 * console.log(gcd(48, 18)); // 6
 * console.log(average(1, 2, 3, 4, 5)); // 3
 * console.log(lerp(0, 10, 0.5)); // 5
 * console.log(radians(180)); // 3.141592653589793
 */

/**
 * Mathematical constant PI
 * @type {number}
 */
export const PI = Math.PI;

/**
 * Euler's number
 * @type {number}
 */
export const E = Math.E;

/**
 * Natural logarithm of 2
 * @type {number}
 */
export const LN2 = Math.LN2;

/**
 * Natural logarithm of 10
 * @type {number}
 */
export const LN10 = Math.LN10;

/**
 * Base-2 logarithm of E
 * @type {number}
 */
export const LOG2E = Math.LOG2E;

/**
 * Base-10 logarithm of E
 * @type {number}
 */
export const LOG10E = Math.LOG10E;

/**
 * Square root of 2
 * @type {number}
 */
export const SQRT2 = Math.SQRT2;

/**
 * Square root of 1/2
 * @type {number}
 */
export const SQRT1_2 = Math.SQRT1_2;

/**
 * Machine epsilon
 * @type {number}
 */
export const EPSILON = Number.EPSILON;

/**
 * Maximum safe integer
 * @type {number}
 */
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

/**
 * Minimum safe integer
 * @type {number}
 */
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

/**
 * Maximum value
 * @type {number}
 */
export const MAX_VALUE = Number.MAX_VALUE;

/**
 * Minimum value
 * @type {number}
 */
export const MIN_VALUE = Number.MIN_VALUE;

/**
 * Negative infinity
 * @type {number}
 */
export const NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;

/**
 * Positive infinity
 * @type {number}
 */
export const POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

/**
 * Not a number
 * @type {number}
 */
export const NaN = Number.NaN;

/**
 * Sign function - returns -1, 0, or 1
 * @param {number} value - Input value
 * @returns {number} Sign of the value
 */
export function sign(value) {
  return value > 0 ? 1.0 : (value < 0 ? -1.0 : 0.0);
}

/**
 * Minimum of two values
 * @param {number} left - First value
 * @param {number} right - Second value
 * @returns {number} Minimum value
 */
export function min(left, right) {
  return left < right ? left : right;
}

/**
 * Maximum of two values
 * @param {number} left - First value
 * @param {number} right - Second value
 * @returns {number} Maximum value
 */
export function max(left, right) {
  return left > right ? left : right;
}

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} minVal - Minimum value
 * @param {number} maxVal - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, minVal, maxVal) {
  return value < minVal ? minVal : (value > maxVal ? maxVal : value);
}

/**
 * Absolute value
 * @param {number} value - Input value
 * @returns {number} Absolute value
 */
export function abs(value) {
  return value < 0 ? -value : value;
}

/**
 * Ceiling function
 * @param {number} value - Input value
 * @returns {number} Ceiling value
 */
export function ceil(value) {
  return Math.ceil(value);
}

/**
 * Floor function
 * @param {number} value - Input value
 * @returns {number} Floor value
 */
export function floor(value) {
  return Math.floor(value);
}

/**
 * Round function
 * @param {number} value - Input value
 * @returns {number} Rounded value
 */
export function round(value) {
  return Math.round(value);
}

/**
 * Truncate function
 * @param {number} value - Input value
 * @returns {number} Truncated value
 */
export function trunc(value) {
  return Math.trunc(value);
}

/**
 * Square root
 * @param {number} value - Input value
 * @returns {number} Square root
 */
export function sqrt(value) {
  return Math.sqrt(value);
}

/**
 * Cube root
 * @param {number} value - Input value
 * @returns {number} Cube root
 */
export function cbrt(value) {
  return Math.cbrt(value);
}

/**
 * Power function
 * @param {number} base - Base value
 * @param {number} exponent - Exponent value
 * @returns {number} Base raised to exponent
 */
export function pow(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Exponential function
 * @param {number} value - Input value
 * @returns {number} e raised to value
 */
export function exp(value) {
  return Math.exp(value);
}

/**
 * Exponential minus 1
 * @param {number} value - Input value
 * @returns {number} e^value - 1
 */
export function expm1(value) {
  return Math.expm1(value);
}

/**
 * Natural logarithm
 * @param {number} value - Input value
 * @returns {number} Natural logarithm
 */
export function log(value) {
  return Math.log(value);
}

/**
 * Base-10 logarithm
 * @param {number} value - Input value
 * @returns {number} Base-10 logarithm
 */
export function log10(value) {
  return Math.log10(value);
}

/**
 * Base-2 logarithm
 * @param {number} value - Input value
 * @returns {number} Base-2 logarithm
 */
export function log2(value) {
  return Math.log2(value);
}

/**
 * Natural logarithm of 1 + value
 * @param {number} value - Input value
 * @returns {number} ln(1 + value)
 */
export function log1p(value) {
  return Math.log1p(value);
}

/**
 * Sine function
 * @param {number} value - Input value in radians
 * @returns {number} Sine of value
 */
export function sin(value) {
  return Math.sin(value);
}

/**
 * Cosine function
 * @param {number} value - Input value in radians
 * @returns {number} Cosine of value
 */
export function cos(value) {
  return Math.cos(value);
}

/**
 * Tangent function
 * @param {number} value - Input value in radians
 * @returns {number} Tangent of value
 */
export function tan(value) {
  return Math.tan(value);
}

/**
 * Arc sine function
 * @param {number} value - Input value
 * @returns {number} Arc sine in radians
 */
export function asin(value) {
  return Math.asin(value);
}

/**
 * Arc cosine function
 * @param {number} value - Input value
 * @returns {number} Arc cosine in radians
 */
export function acos(value) {
  return Math.acos(value);
}

/**
 * Arc tangent function
 * @param {number} value - Input value
 * @returns {number} Arc tangent in radians
 */
export function atan(value) {
  return Math.atan(value);
}

/**
 * Arc tangent of y/x
 * @param {number} y - Y coordinate
 * @param {number} x - X coordinate
 * @returns {number} Arc tangent in radians
 */
export function atan2(y, x) {
  return Math.atan2(y, x);
}

/**
 * Hyperbolic sine
 * @param {number} value - Input value
 * @returns {number} Hyperbolic sine
 */
export function sinh(value) {
  return Math.sinh(value);
}

/**
 * Hyperbolic cosine
 * @param {number} value - Input value
 * @returns {number} Hyperbolic cosine
 */
export function cosh(value) {
  return Math.cosh(value);
}

/**
 * Hyperbolic tangent
 * @param {number} value - Input value
 * @returns {number} Hyperbolic tangent
 */
export function tanh(value) {
  return Math.tanh(value);
}

/**
 * Hyperbolic arc sine
 * @param {number} value - Input value
 * @returns {number} Hyperbolic arc sine
 */
export function asinh(value) {
  return Math.asinh(value);
}

/**
 * Hyperbolic arc cosine
 * @param {number} value - Input value
 * @returns {number} Hyperbolic arc cosine
 */
export function acosh(value) {
  return Math.acosh(value);
}

/**
 * Hyperbolic arc tangent
 * @param {number} value - Input value
 * @returns {number} Hyperbolic arc tangent
 */
export function atanh(value) {
  return Math.atanh(value);
}

/**
 * Hypotenuse function
 * @param {...number} values - Values
 * @returns {number} Hypotenuse
 */
export function hypot(...values) {
  return Math.hypot(...values);
}

/**
 * Random number between 0 and 1
 * @returns {number} Random number
 */
export function random() {
  return Math.random();
}

/**
 * Seeded random number generator
 * @param {number} seed - Seed value
 * @returns {Function} Random number generator function
 */
export function seedRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Linear interpolation
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Smoothstep function
 * @param {number} edge0 - Lower edge
 * @param {number} edge1 - Upper edge
 * @param {number} x - Input value
 * @returns {number} Smoothstep result
 */
export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Smootherstep function
 * @param {number} edge0 - Lower edge
 * @param {number} edge1 - Upper edge
 * @param {number} x - Input value
 * @returns {number} Smootherstep result
 */
export function smootherstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Convert radians to degrees
 * @param {number} radians - Value in radians
 * @returns {number} Value in degrees
 */
export function degrees(radians) {
  return radians * 180 / PI;
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Value in degrees
 * @returns {number} Value in radians
 */
export function radians(degrees) {
  return degrees * PI / 180;
}

/**
 * Greatest common divisor
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD
 */
export function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Least common multiple
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} LCM
 */
export function lcm(a, b) {
  return abs(a * b) / gcd(a, b);
}

/**
 * Factorial function
 * @param {number} n - Input number
 * @returns {number} Factorial of n
 */
export function factorial(n) {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Check if number is prime
 * @param {number} n - Input number
 * @returns {boolean} True if prime
 */
export function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Check if number is even
 * @param {number} n - Input number
 * @returns {boolean} True if even
 */
export function isEven(n) {
  return n % 2 === 0;
}

/**
 * Check if number is odd
 * @param {number} n - Input number
 * @returns {boolean} True if odd
 */
export function isOdd(n) {
  return n % 2 !== 0;
}

/**
 * Check if number is positive
 * @param {number} n - Input number
 * @returns {boolean} True if positive
 */
export function isPositive(n) {
  return n > 0;
}

/**
 * Check if number is negative
 * @param {number} n - Input number
 * @returns {boolean} True if negative
 */
export function isNegative(n) {
  return n < 0;
}

/**
 * Check if number is zero
 * @param {number} n - Input number
 * @returns {boolean} True if zero
 */
export function isZero(n) {
  return n === 0;
}

/**
 * Check if number is finite
 * @param {number} n - Input number
 * @returns {boolean} True if finite
 */
export function isFinite(n) {
  return Number.isFinite(n);
}

/**
 * Check if number is NaN
 * @param {number} n - Input number
 * @returns {boolean} True if NaN
 */
export function isNaN(n) {
  return Number.isNaN(n);
}

/**
 * Check if number is integer
 * @param {number} n - Input number
 * @returns {boolean} True if integer
 */
export function isInteger(n) {
  return Number.isInteger(n);
}

/**
 * Check if number is safe integer
 * @param {number} n - Input number
 * @returns {boolean} True if safe integer
 */
export function isSafeInteger(n) {
  return Number.isSafeInteger(n);
}

/**
 * Sum of values
 * @param {...number} values - Values to sum
 * @returns {number} Sum
 */
export function sum(...values) {
  return values.reduce((acc, val) => acc + val, 0);
}

/**
 * Average of values
 * @param {...number} values - Values
 * @returns {number} Average
 */
export function average(...values) {
  return sum(...values) / values.length;
}

/**
 * Median of values
 * @param {...number} values - Values
 * @returns {number} Median
 */
export function median(...values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/**
 * Variance of values
 * @param {...number} values - Values
 * @returns {number} Variance
 */
export function variance(...values) {
  const avg = average(...values);
  return average(...values.map(v => (v - avg) ** 2));
}

/**
 * Standard deviation of values
 * @param {...number} values - Values
 * @returns {number} Standard deviation
 */
export function stddev(...values) {
  return sqrt(variance(...values));
}

/**
 * Default export containing all math utilities
 * @type {Object}
 */
export default {
  PI,
  E,
  LN2,
  LN10,
  LOG2E,
  LOG10E,
  SQRT2,
  SQRT1_2,
  EPSILON,
  MAX_SAFE_INTEGER,
  MIN_SAFE_INTEGER,
  MAX_VALUE,
  MIN_VALUE,
  NEGATIVE_INFINITY,
  POSITIVE_INFINITY,
  NaN,
  sign,
  min,
  max,
  clamp,
  abs,
  ceil,
  floor,
  round,
  trunc,
  sqrt,
  cbrt,
  pow,
  exp,
  expm1,
  log,
  log10,
  log2,
  log1p,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  atan2,
  sinh,
  cosh,
  tanh,
  asinh,
  acosh,
  atanh,
  hypot,
  random,
  seedRandom,
  lerp,
  smoothstep,
  smootherstep,
  degrees,
  radians,
  gcd,
  lcm,
  factorial,
  isPrime,
  isEven,
  isOdd,
  isPositive,
  isNegative,
  isZero,
  isFinite,
  isNaN,
  isInteger,
  isSafeInteger,
  sum,
  average,
  median,
  variance,
  stddev
};

/**
 * MathUtils.js
 * Centralized mathematical utilities for the event system.
 * All functions are re-exported from existing code logic without modifying original files.
 * Provides statistical, time, random, geometric, hash, and utility functions.
 * 
 * @module MathUtils
 * @author EventLuxarion Team
 * @version 1.0.0
 * 
 * @example
 * import { calculateAverage, generateRandomId, lerp, clamp } from '../utilities/MathUtils.js';
 * const avg = calculateAverage([1, 2, 3, 4, 5]);
 * const id = generateRandomId('node');
 * const value = lerp(0, 10, 0.5);
 */

/**
 * Naming conventions:
 * - Functions: camelCase
 * - Constants: SCREAMING_SNAKE_CASE
 * - Private variables: _camelCase
 * - All calculation functions use prefix 'calculate'
 * - All formatting functions use prefix 'format'
 * - All generation functions use prefix 'generate'
 */

import MetricsCollector from '../utilities/MetricsCollector.js';
import RetryHandler from '../handlers/RetryHandler.js';
import EventNode from '../core/EventNode.js';
import QueueManager from '../managers/QueueManager.js';
import EventVisualizer from '../visualization/EventVisualizer.js';
import ShaderManager from '../render/ShaderManager.js';
import RenderEngine from '../render/RenderEngine.js';
import PlatformManager from '../platform/PlatformManager.js';

/**
 * Degrees to radians conversion factor.
 * @constant {number}
 * @default Math.PI / 180
 */
export const DEG2RAD = Math.PI / 180;

/**
 * Radians to degrees conversion factor.
 * @constant {number}
 * @default 180 / Math.PI
 */
export const RAD2DEG = 180 / Math.PI;

/**
 * Euler's number constant.
 * @constant {number}
 * @default Math.E
 */
export const E = Math.E;

/**
 * Pi constant.
 * @constant {number}
 * @default Math.PI
 */
export const PI = Math.PI;

/**
 * Two Pi constant.
 * @constant {number}
 * @default Math.PI * 2
 */
export const TWO_PI = Math.PI * 2;

/**
 * Half Pi constant.
 * @constant {number}
 * @default Math.PI / 2
 */
export const HALF_PI = Math.PI / 2;

/**
 * Quarter Pi constant.
 * @constant {number}
 * @default Math.PI / 4
 */
export const QUARTER_PI = Math.PI / 4;

/**
 * Calculate weighted average of values.
 * @param {number} currentAvg - Current average value
 * @param {number} totalCount - Total number of items processed
 * @param {number} newValue - New value to incorporate
 * @returns {number} Updated weighted average
 * @example
 * const avg = calculateWeightedAverage(10, 5, 15); // Returns 10.833
 */
export function calculateWeightedAverage(currentAvg, totalCount, newValue) {
    if (totalCount === 0) return newValue;
    return (currentAvg * (totalCount - 1) + newValue) / totalCount;
}

/**
 * Calculate the percentile value from an array.
 * @param {number[]} arr - Array of numbers
 * @param {number} p - Percentile value between 0 and 1
 * @returns {number} Percentile value
 * @example
 * const p95 = calculatePercentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0.95);
 */
export function calculatePercentile(arr, p) {
    if (!arr || arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const index = Math.floor(sorted.length * p);
    return sorted[index] || 0;
}

/**
 * Calculate the arithmetic mean of an array.
 * @param {number[]} arr - Array of numbers
 * @returns {number} Average value
 * @example
 * const avg = calculateAverage([1, 2, 3, 4, 5]); // Returns 3
 */
export function calculateAverage(arr) {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

/**
 * Calculate the minimum value from an array.
 * @param {number[]} arr - Array of numbers
 * @returns {number} Minimum value
 * @example
 * const min = calculateMinimum([1, 2, 3, 4, 5]); // Returns 1
 */
export function calculateMinimum(arr) {
    if (!arr || arr.length === 0) return Infinity;
    return Math.min(...arr);
}

/**
 * Calculate the maximum value from an array.
 * @param {number[]} arr - Array of numbers
 * @returns {number} Maximum value
 * @example
 * const max = calculateMaximum([1, 2, 3, 4, 5]); // Returns 5
 */
export function calculateMaximum(arr) {
    if (!arr || arr.length === 0) return -Infinity;
    return Math.max(...arr);
}

/**
 * Calculate the sum of all values in an array.
 * @param {number[]} arr - Array of numbers
 * @returns {number} Sum of all values
 * @example
 * const sum = calculateSum([1, 2, 3, 4, 5]); // Returns 15
 */
export function calculateSum(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0);
}

/**
 * Calculate percentage of a value relative to a total.
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 * @example
 * const pct = calculatePercentage(25, 100); // Returns 25
 */
export function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return (value / total) * 100;
}

/**
 * Calculate exponential backoff delay.
 * @param {number} retryCount - Current retry count
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} [maxDelay=30000] - Maximum delay in milliseconds
 * @returns {number} Calculated delay in milliseconds
 * @example
 * const delay = calculateExponentialBackoff(3, 100, 10000); // Returns 800
 */
export function calculateExponentialBackoff(retryCount, baseDelay, maxDelay = 30000) {
    const delay = Math.pow(2, retryCount) * baseDelay;
    return Math.min(delay, maxDelay);
}

/**
 * Calculate exponential backoff with random jitter.
 * @param {number} retryCount - Current retry count
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} [jitterPercent=0.2] - Jitter percentage (0-1)
 * @returns {number} Calculated delay with jitter
 * @example
 * const delay = calculateJitterDelay(2, 100, 0.1);
 */
export function calculateJitterDelay(retryCount, baseDelay, jitterPercent = 0.2) {
    const delay = Math.pow(2, retryCount) * baseDelay;
    const jitter = 1 + (Math.random() * jitterPercent);
    return Math.min(delay * jitter, 30000);
}

/**
 * Calculate elapsed time between two timestamps.
 * @param {number} startTime - Start timestamp in milliseconds
 * @param {number} endTime - End timestamp in milliseconds
 * @returns {number} Elapsed time in milliseconds
 * @example
 * const elapsed = calculateElapsed(1000, 1500); // Returns 500
 */
export function calculateElapsed(startTime, endTime) {
    return endTime - startTime;
}

/**
 * Generate a unique random ID with optional prefix.
 * @param {string} [prefix=''] - Optional prefix for the ID
 * @returns {string} Generated ID string
 * @example
 * const id = generateRandomId('node'); // Returns 'node_1678900000_abc123'
 */
export function generateRandomId(prefix = '') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * Generate a random alphanumeric string.
 * @param {number} [length=8] - Length of the string
 * @returns {string} Random string
 * @example
 * const str = generateRandomString(10); // Returns 'abc123def4'
 */
export function generateRandomString(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Generate a UUID v4 compliant string.
 * @returns {string} UUID string
 * @example
 * const uuid = generateUUID(); // Returns '123e4567-e89b-12d3-a456-426614174000'
 */
export function generateUUID() {
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    const lut = [
        '00','01','02','03','04','05','06','07','08','09','0a','0b','0c','0d','0e','0f',
        '10','11','12','13','14','15','16','17','18','19','1a','1b','1c','1d','1e','1f',
        '20','21','22','23','24','25','26','27','28','29','2a','2b','2c','2d','2e','2f',
        '30','31','32','33','34','35','36','37','38','39','3a','3b','3c','3d','3e','3f',
        '40','41','42','43','44','45','46','47','48','49','4a','4b','4c','4d','4e','4f',
        '50','51','52','53','54','55','56','57','58','59','5a','5b','5c','5d','5e','5f',
        '60','61','62','63','64','65','66','67','68','69','6a','6b','6c','6d','6e','6f',
        '70','71','72','73','74','75','76','77','78','79','7a','7b','7c','7d','7e','7f',
        '80','81','82','83','84','85','86','87','88','89','8a','8b','8c','8d','8e','8f',
        '90','91','92','93','94','95','96','97','98','99','9a','9b','9c','9d','9e','9f',
        'a0','a1','a2','a3','a4','a5','a6','a7','a8','a9','aa','ab','ac','ad','ae','af',
        'b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','ba','bb','bc','bd','be','bf',
        'c0','c1','c2','c3','c4','c5','c6','c7','c8','c9','ca','cb','cc','cd','ce','cf',
        'd0','d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df',
        'e0','e1','e2','e3','e4','e5','e6','e7','e8','e9','ea','eb','ec','ed','ee','ef',
        'f0','f1','f2','f3','f4','f5','f6','f7','f8','f9','fa','fb','fc','fd','fe','ff'
    ];
    const uuid = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
        lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
        lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
        lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    return uuid.toLowerCase();
}

/**
 * Generate a random integer between min and max (inclusive).
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 * @example
 * const num = randomInt(1, 10); // Returns random integer between 1 and 10
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random float between min and max.
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random float
 * @example
 * const num = randomFloat(0, 1); // Returns random float between 0 and 1
 */
export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Generate a random boolean with given probability.
 * @param {number} [probability=0.5] - Probability of true (0-1)
 * @returns {boolean} Random boolean
 * @example
 * const bool = randomBoolean(0.7); // 70% chance of true
 */
export function randomBoolean(probability = 0.5) {
    return Math.random() < probability;
}

/**
 * Select a random element from an array.
 * @param {Array} arr - Array to select from
 * @returns {*} Random element from array
 * @example
 * const item = randomChoice(['a', 'b', 'c']); // Returns 'a', 'b', or 'c'
 */
export function randomChoice(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a random float spread around zero.
 * @param {number} range - Range of the spread
 * @returns {number} Random float between -range/2 and range/2
 * @example
 * const spread = randomFloatSpread(10); // Returns between -5 and 5
 */
export function randomFloatSpread(range) {
    return range * (0.5 - Math.random());
}

let _seed = 1234567;

/**
 * Generate a seeded random number.
 * @param {number} [s] - Seed value (optional)
 * @returns {number} Random number between 0 and 1
 * @example
 * const rand = seededRandom(42);
 */
export function seededRandom(s) {
    if (s !== undefined) _seed = s;
    let t = _seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

/**
 * Shuffle an array using Fisher-Yates algorithm.
 * @param {Array} arr - Array to shuffle
 * @returns {Array} New shuffled array
 * @example
 * const shuffled = shuffle([1, 2, 3, 4, 5]);
 */
export function shuffle(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Calculate next circular buffer index.
 * @param {number} currentIndex - Current index
 * @param {number} bufferSize - Size of the buffer
 * @returns {number} Next index
 * @example
 * const next = calculateCircularIndex(3, 10); // Returns 4
 */
export function calculateCircularIndex(currentIndex, bufferSize) {
    return (currentIndex + 1) % bufferSize;
}

/**
 * Calculate buffer shift with limits.
 * @param {number} length - Current length
 * @param {number} limit - Maximum limit
 * @param {number} [shiftAmount=1] - Amount to shift
 * @returns {number} New length
 * @example
 * const newLen = calculateBufferShift(5, 10, 2); // Returns 7
 */
export function calculateBufferShift(length, limit, shiftAmount = 1) {
    return Math.max(0, Math.min(length + shiftAmount, limit));
}

/**
 * Calculate GPU buffer size with alignment.
 * @param {number} vertexCount - Number of vertices
 * @param {number} stride - Stride in bytes
 * @param {number} [alignment=4] - Alignment in bytes
 * @returns {number} Aligned buffer size
 * @example
 * const size = calculateBufferSize(100, 12, 4); // Returns 1200
 */
export function calculateBufferSize(vertexCount, stride, alignment = 4) {
    const size = vertexCount * stride;
    return Math.ceil(size / alignment) * alignment;
}

/**
 * Calculate next power of two value.
 * @param {number} value - Input value
 * @returns {number} Next power of two
 * @example
 * const pow2 = calculateNextPowerOfTwo(5); // Returns 8
 */
export function calculateNextPowerOfTwo(value) {
    if (value <= 0) return 1;
    return Math.pow(2, Math.ceil(Math.log2(value)));
}

/**
 * Check if a number is a power of two.
 * @param {number} value - Value to check
 * @returns {boolean} True if power of two
 * @example
 * const isPow2 = isPowerOfTwo(16); // Returns true
 */
export function isPowerOfTwo(value) {
    return (value & (value - 1)) === 0 && value !== 0;
}

/**
 * Calculate ceiling power of two.
 * @param {number} value - Input value
 * @returns {number} Ceiling power of two
 */
export function calculateCeilPowerOfTwo(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

/**
 * Calculate floor power of two.
 * @param {number} value - Input value
 * @returns {number} Floor power of two
 */
export function calculateFloorPowerOfTwo(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}

/**
 * Calculate angle position on a circle.
 * @param {number} index - Index in the circle
 * @param {number} total - Total number of items
 * @param {number} [offset=0] - Angle offset in radians
 * @returns {number} Angle in radians
 * @example
 * const angle = calculateCircleAngle(3, 10); // Returns 1.884...
 */
export function calculateCircleAngle(index, total, offset = 0) {
    return (index / total) * Math.PI * 2 + offset;
}

/**
 * Calculate position on a circle.
 * @param {number} angle - Angle in radians
 * @param {number} radius - Circle radius
 * @param {number} centerX - Center X coordinate
 * @param {number} centerY - Center Y coordinate
 * @returns {{x: number, y: number}} Position coordinates
 * @example
 * const pos = calculateCirclePosition(1.57, 100, 400, 300);
 */
export function calculateCirclePosition(angle, radius, centerX, centerY) {
    return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
    };
}

/**
 * Calculate aspect ratio from width and height.
 * @param {number} width - Width value
 * @param {number} height - Height value
 * @returns {number} Aspect ratio
 * @example
 * const ratio = calculateAspectRatio(1920, 1080); // Returns 1.777...
 */
export function calculateAspectRatio(width, height) {
    if (height === 0) return 1;
    return width / height;
}

/**
 * Linear interpolation between two values.
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 * @example
 * const value = lerp(0, 10, 0.5); // Returns 5
 */
export function lerp(a, b, t) {
    return a + (b - a) * t;
}

/**
 * Inverse linear interpolation.
 * @param {number} x - Start value
 * @param {number} y - End value
 * @param {number} value - Value to interpolate
 * @returns {number} Interpolation factor
 * @example
 * const t = inverseLerp(0, 10, 5); // Returns 0.5
 */
export function inverseLerp(x, y, value) {
    if (x !== y) {
        return (value - x) / (y - x);
    }
    return 0;
}

/**
 * Map a value from one range to another.
 * @param {number} x - Value to map
 * @param {number} a1 - Source range start
 * @param {number} a2 - Source range end
 * @param {number} b1 - Target range start
 * @param {number} b2 - Target range end
 * @returns {number} Mapped value
 * @example
 * const mapped = mapLinear(50, 0, 100, 0, 1); // Returns 0.5
 */
export function mapLinear(x, a1, a2, b1, b2) {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
}

/**
 * Clamp a value between minimum and maximum.
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 * @example
 * const clamped = clamp(150, 0, 100); // Returns 100
 */
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Euclidean modulo calculation.
 * @param {number} n - Number to modulo
 * @param {number} m - Modulus
 * @returns {number} Euclidean modulo result
 * @example
 * const mod = euclideanModulo(-1, 10); // Returns 9
 */
export function euclideanModulo(n, m) {
    return ((n % m) + m) % m;
}

/**
 * Ping-pong value between 0 and length.
 * @param {number} x - Input value
 * @param {number} [length=1] - Length of ping-pong
 * @returns {number} Ping-pong value
 * @example
 * const pp = pingpong(1.5, 1); // Returns 0.5
 */
export function pingpong(x, length = 1) {
    return length - Math.abs(euclideanModulo(x, length * 2) - length);
}

/**
 * Smoothstep interpolation function.
 * @param {number} x - Input value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Smoothstep result
 * @example
 * const ss = smoothstep(0.5, 0, 1); // Returns 0.5
 */
export function smoothstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
}

/**
 * Smootherstep interpolation function.
 * @param {number} x - Input value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Smootherstep result
 * @example
 * const ss = smootherstep(0.5, 0, 1); // Returns 0.5
 */
export function smootherstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * Damped interpolation (spring-like).
 * @param {number} x - Current value
 * @param {number} y - Target value
 * @param {number} lambda - Damping factor
 * @param {number} dt - Delta time
 * @returns {number} Damped value
 * @example
 * const damped = damp(0, 10, 0.1, 0.016);
 */
export function damp(x, y, lambda, dt) {
    return lerp(x, y, 1 - Math.exp(-lambda * dt));
}

/**
 * Convert degrees to radians.
 * @param {number} degrees - Degrees value
 * @returns {number} Radians value
 * @example
 * const rad = degToRad(180); // Returns 3.14159...
 */
export function degToRad(degrees) {
    return degrees * DEG2RAD;
}

/**
 * Convert radians to degrees.
 * @param {number} radians - Radians value
 * @returns {number} Degrees value
 * @example
 * const deg = radToDeg(3.14159); // Returns 180
 */
export function radToDeg(radians) {
    return radians * RAD2DEG;
}

/**
 * Calculate hash code from string (Java-style).
 * @param {string} str - String to hash
 * @returns {number} Hash code
 * @example
 * const hash = hashCode('hello'); // Returns 99162322
 */
export function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

/**
 * Simple string hash for cache keys.
 * @param {string} str - String to hash
 * @returns {number} Hash value
 * @example
 * const hash = simpleHash('myKey'); // Returns numeric hash
 */
export function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
}

/**
 * Calculate FPS from frame time.
 * @param {number} frameTime - Frame time in milliseconds
 * @returns {number} Frames per second
 * @example
 * const fps = calculateFramesPerSecond(16.67); // Returns ~60
 */
export function calculateFramesPerSecond(frameTime) {
    if (frameTime === 0) return 0;
    return 1000 / frameTime;
}

/**
 * Calculate frame time from FPS.
 * @param {number} fps - Frames per second
 * @returns {number} Frame time in milliseconds
 * @example
 * const ft = calculateFrameTime(60); // Returns 16.67
 */
export function calculateFrameTime(fps) {
    if (fps === 0) return 0;
    return 1000 / fps;
}

/**
 * Calculate delta time between frames.
 * @param {number} previousTime - Previous timestamp in milliseconds
 * @param {number} currentTime - Current timestamp in milliseconds
 * @param {number} [maxDelta=0.1] - Maximum delta in seconds
 * @returns {number} Delta time in seconds
 * @example
 * const delta = calculateDelta(1000, 1016.67); // Returns 0.01667
 */
export function calculateDelta(previousTime, currentTime, maxDelta = 0.1) {
    let delta = (currentTime - previousTime) / 1000;
    return Math.min(delta, maxDelta);
}

/**
 * Format milliseconds to human-readable time string.
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time string
 * @example
 * const time = formatTime(3661000); // Returns '1h 1m 1s'
 */
export function formatTime(ms) {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
    return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

/**
 * Format bytes to human-readable memory string.
 * @param {number} bytes - Bytes
 * @returns {string} Formatted memory string
 * @example
 * const mem = formatMemory(1572864); // Returns '1.5MB'
 */
export function formatMemory(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)}MB`;
    return `${(bytes / 1073741824).toFixed(1)}GB`;
}

/**
 * Normalize a value to fit in a typed array.
 * @param {number} value - Value to normalize
 * @param {TypedArray} array - Typed array for bounds
 * @returns {number} Normalized value
 * @throws {Error} If component type is invalid
 * @example
 * const norm = normalize(0.5, new Uint8Array(1)); // Returns 128
 */
export function normalize(value, array) {
    switch (array.constructor) {
        case Float32Array: return value;
        case Uint32Array: return Math.round(value * 4294967295.0);
        case Uint16Array: return Math.round(value * 65535.0);
        case Uint8Array: return Math.round(value * 255.0);
        case Int32Array: return Math.round(value * 2147483647.0);
        case Int16Array: return Math.round(value * 32767.0);
        case Int8Array: return Math.round(value * 127.0);
        default: throw new Error('MathUtils: Invalid component type.');
    }
}

/**
 * Denormalize a value from a typed array.
 * @param {number} value - Value to denormalize
 * @param {TypedArray} array - Typed array for bounds
 * @returns {number} Denormalized value
 * @throws {Error} If component type is invalid
 * @example
 * const denorm = denormalize(128, new Uint8Array(1)); // Returns 0.5
 */
export function denormalize(value, array) {
    switch (array.constructor) {
        case Float32Array: return value;
        case Uint32Array: return value / 4294967295.0;
        case Uint16Array: return value / 65535.0;
        case Uint8Array: return value / 255.0;
        case Int32Array: return Math.max(value / 2147483647.0, -1.0);
        case Int16Array: return Math.max(value / 32767.0, -1.0);
        case Int8Array: return Math.max(value / 127.0, -1.0);
        default: throw new Error('MathUtils: Invalid component type.');
    }
}

/**
 * MathUtils object containing all functions for convenience.
 * @type {Object}
 * @property {number} DEG2RAD - Degrees to radians factor
 * @property {number} RAD2DEG - Radians to degrees factor
 * @property {number} E - Euler's number
 * @property {number} PI - Pi constant
 * @property {number} TWO_PI - Two Pi constant
 * @property {number} HALF_PI - Half Pi constant
 * @property {number} QUARTER_PI - Quarter Pi constant
 */
export const MathUtils = {
    DEG2RAD,
    RAD2DEG,
    E,
    PI,
    TWO_PI,
    HALF_PI,
    QUARTER_PI,
    calculateWeightedAverage,
    calculatePercentile,
    calculateAverage,
    calculateMinimum,
    calculateMaximum,
    calculateSum,
    calculatePercentage,
    calculateExponentialBackoff,
    calculateJitterDelay,
    calculateElapsed,
    generateRandomId,
    generateRandomString,
    generateUUID,
    randomInt,
    randomFloat,
    randomBoolean,
    randomChoice,
    randomFloatSpread,
    seededRandom,
    shuffle,
    calculateCircularIndex,
    calculateBufferShift,
    calculateBufferSize,
    calculateNextPowerOfTwo,
    isPowerOfTwo,
    calculateCeilPowerOfTwo,
    calculateFloorPowerOfTwo,
    calculateCircleAngle,
    calculateCirclePosition,
    calculateAspectRatio,
    lerp,
    inverseLerp,
    mapLinear,
    clamp,
    euclideanModulo,
    pingpong,
    smoothstep,
    smootherstep,
    damp,
    degToRad,
    radToDeg,
    hashCode,
    simpleHash,
    calculateFramesPerSecond,
    calculateFrameTime,
    calculateDelta,
    formatTime,
    formatMemory,
    normalize,
    denormalize
};

/**
 * Default export for convenient importing.
 * @type {Object}
 */
export default MathUtils;

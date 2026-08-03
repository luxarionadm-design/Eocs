/**
 * MathUtils.js
 * Centralized mathematical utilities for the event system.
 * All functions are re-exported from existing code logic without modifying original files.
 * Provides statistical, time, random, geometric, hash, and utility functions.
 * 
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

export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;

export function calculateWeightedAverage(currentAvg, totalCount, newValue) {
    if (totalCount === 0) return newValue;
    return (currentAvg * (totalCount - 1) + newValue) / totalCount;
}

export function calculatePercentile(arr, p) {
    if (!arr || arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const index = Math.floor(sorted.length * p);
    return sorted[index] || 0;
}

export function calculateAverage(arr) {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

export function calculateMinimum(arr) {
    if (!arr || arr.length === 0) return Infinity;
    return Math.min(...arr);
}

export function calculateMaximum(arr) {
    if (!arr || arr.length === 0) return -Infinity;
    return Math.max(...arr);
}

export function calculateSum(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0);
}

export function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return (value / total) * 100;
}

export function calculateExponentialBackoff(retryCount, baseDelay, maxDelay = 30000) {
    const delay = Math.pow(2, retryCount) * baseDelay;
    return Math.min(delay, maxDelay);
}

export function calculateJitterDelay(retryCount, baseDelay, jitterPercent = 0.2) {
    const delay = Math.pow(2, retryCount) * baseDelay;
    const jitter = 1 + (Math.random() * jitterPercent);
    return Math.min(delay * jitter, 30000);
}

export function calculateElapsed(startTime, endTime) {
    return endTime - startTime;
}

export function generateRandomId(prefix = '') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10);
    return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

export function generateRandomString(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}

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

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export function randomBoolean(probability = 0.5) {
    return Math.random() < probability;
}

export function randomChoice(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomFloatSpread(range) {
    return range * (0.5 - Math.random());
}

let _seed = 1234567;

export function seededRandom(s) {
    if (s !== undefined) _seed = s;
    let t = _seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

export function shuffle(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function calculateCircularIndex(currentIndex, bufferSize) {
    return (currentIndex + 1) % bufferSize;
}

export function calculateBufferShift(length, limit, shiftAmount = 1) {
    return Math.max(0, Math.min(length + shiftAmount, limit));
}

export function calculateBufferSize(vertexCount, stride, alignment = 4) {
    const size = vertexCount * stride;
    return Math.ceil(size / alignment) * alignment;
}

export function calculateNextPowerOfTwo(value) {
    if (value <= 0) return 1;
    return Math.pow(2, Math.ceil(Math.log2(value)));
}

export function isPowerOfTwo(value) {
    return (value & (value - 1)) === 0 && value !== 0;
}

export function calculateCeilPowerOfTwo(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

export function calculateFloorPowerOfTwo(value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}

export function calculateCircleAngle(index, total, offset = 0) {
    return (index / total) * Math.PI * 2 + offset;
}

export function calculateCirclePosition(angle, radius, centerX, centerY) {
    return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
    };
}

export function calculateAspectRatio(width, height) {
    if (height === 0) return 1;
    return width / height;
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function inverseLerp(x, y, value) {
    if (x !== y) {
        return (value - x) / (y - x);
    }
    return 0;
}

export function mapLinear(x, a1, a2, b1, b2) {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
}

export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function euclideanModulo(n, m) {
    return ((n % m) + m) % m;
}

export function pingpong(x, length = 1) {
    return length - Math.abs(euclideanModulo(x, length * 2) - length);
}

export function smoothstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
}

export function smootherstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * x * (x * (x * 6 - 15) + 10);
}

export function damp(x, y, lambda, dt) {
    return lerp(x, y, 1 - Math.exp(-lambda * dt));
}

export function degToRad(degrees) {
    return degrees * DEG2RAD;
}

export function radToDeg(radians) {
    return radians * RAD2DEG;
}

export function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

export function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
}

export function calculateFramesPerSecond(frameTime) {
    if (frameTime === 0) return 0;
    return 1000 / frameTime;
}

export function calculateFrameTime(fps) {
    if (fps === 0) return 0;
    return 1000 / fps;
}

export function calculateDelta(previousTime, currentTime, maxDelta = 0.1) {
    let delta = (currentTime - previousTime) / 1000;
    return Math.min(delta, maxDelta);
}

export function formatTime(ms) {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
    return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

export function formatMemory(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)}MB`;
    return `${(bytes / 1073741824).toFixed(1)}GB`;
}

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

export const MathUtils = {
    DEG2RAD,
    RAD2DEG,
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

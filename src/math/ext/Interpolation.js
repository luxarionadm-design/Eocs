/**
 * Advanced interpolation functions.
 * Provides various interpolation methods for numbers and vectors.
 * 
 * @example
 * const result = Interpolation.catmullRom(p0, p1, p2, p3, 0.5);
 */
import Vec2 from '../core/Vec2.js';
import Vec3 from '../core/Vec3.js';
import Vec4 from '../core/Vec4.js';
import MathUtils from '../utils/MathUtils.js';

class Interpolation {
  /**
   * Linear interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {number}
   */
  static linear(a, b, t) {
    return MathUtils.lerp(a, b, t);
  }

  /**
   * Step interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {number}
   */
  static step(a, b, t) {
    return t < 0.5 ? a : b;
  }

  /**
   * Smoothstep interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {number}
   */
  static smoothstep(a, b, t) {
    return MathUtils.smoothstep(0, 1, t) * (b - a) + a;
  }

  /**
   * Smootherstep interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {number}
   */
  static smootherstep(a, b, t) {
    return MathUtils.smootherstep(0, 1, t) * (b - a) + a;
  }

  /**
   * Ease-in interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} t - Interpolation factor (0-1).
   * @param {number} [power=2] - Power for ease.
   * @returns {number}
   */
  static easeIn(a, b, t, power = 2) {
    const t2 = Math.pow(t, power);
    return a + (b - a) * t2;
  }

  /**
   * Ease-out interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} t - Interpolation factor (0-1).
   * @param {number} [power=2] - Power for ease.
   * @returns {number}
   */
  static easeOut(a, b, t, power = 2) {
    const t2 = 1 - Math.pow(1 - t, power);
    return a + (b - a) * t2;
  }

  /**
   * Ease-in-out interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} t - Interpolation factor (0-1).
   * @param {number} [power=2] - Power for ease.
   * @returns {number}
   */
  static easeInOut(a, b, t, power = 2) {
    const t2 = t < 0.5
      ? 0.5 * Math.pow(2 * t, power)
      : 1 - 0.5 * Math.pow(2 * (1 - t), power);
    return a + (b - a) * t2;
  }

  /**
   * Cubic Bezier interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} c1 - First control point.
   * @param {number} c2 - Second control point.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {number}
   */
  static cubicBezier(a, b, c1, c2, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    const p0 = a;
    const p1 = c1;
    const p2 = c2;
    const p3 = b;

    return mt3 * p0 + 3 * mt2 * t * p1 + 3 * mt * t2 * p2 + t3 * p3;
  }

  /**
   * Catmull-Rom spline interpolation.
   * @param {number} p0 - Point 0.
   * @param {number} p1 - Point 1.
   * @param {number} p2 - Point 2.
   * @param {number} p3 - Point 3.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {number}
   */
  static catmullRom(p0, p1, p2, p3, t) {
    return MathUtils.catmullRom(p0, p1, p2, p3, t);
  }

  /**
   * Hermite interpolation.
   * @param {number} a - Start value.
   * @param {number} b - End value.
   * @param {number} ta - Tangent at start.
   * @param {number} tb - Tangent at end.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {number}
   */
  static hermite(a, b, ta, tb, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;

    return (2 * t3 - 3 * t2 + 1) * a +
           (t3 - 2 * t2 + t) * ta +
           (-2 * t3 + 3 * t2) * b +
           (t3 - t2) * tb;
  }

  /**
   * Linear interpolation for Vec2.
   * @param {Vec2} a - Start vector.
   * @param {Vec2} b - End vector.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec2}
   */
  static vec2Lerp(a, b, t) {
    return a.lerp(b, t);
  }

  /**
   * Linear interpolation for Vec3.
   * @param {Vec3} a - Start vector.
   * @param {Vec3} b - End vector.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec3}
   */
  static vec3Lerp(a, b, t) {
    return a.lerp(b, t);
  }

  /**
   * Linear interpolation for Vec4.
   * @param {Vec4} a - Start vector.
   * @param {Vec4} b - End vector.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec4}
   */
  static vec4Lerp(a, b, t) {
    return a.lerp(b, t);
  }

  /**
   * Smoothstep interpolation for Vec2.
   * @param {Vec2} a - Start vector.
   * @param {Vec2} b - End vector.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec2}
   */
  static vec2Smoothstep(a, b, t) {
    const s = MathUtils.smoothstep(0, 1, t);
    return a.lerp(b, s);
  }

  /**
   * Smoothstep interpolation for Vec3.
   * @param {Vec3} a - Start vector.
   * @param {Vec3} b - End vector.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec3}
   */
  static vec3Smoothstep(a, b, t) {
    const s = MathUtils.smoothstep(0, 1, t);
    return a.lerp(b, s);
  }

  /**
   * Smoothstep interpolation for Vec4.
   * @param {Vec4} a - Start vector.
   * @param {Vec4} b - End vector.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec4}
   */
  static vec4Smoothstep(a, b, t) {
    const s = MathUtils.smoothstep(0, 1, t);
    return a.lerp(b, s);
  }

  /**
   * Catmull-Rom spline interpolation for Vec2.
   * @param {Vec2} p0 - Point 0.
   * @param {Vec2} p1 - Point 1.
   * @param {Vec2} p2 - Point 2.
   * @param {Vec2} p3 - Point 3.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec2}
   */
  static vec2CatmullRom(p0, p1, p2, p3, t) {
    return new Vec2(
      MathUtils.catmullRom(p0.x, p1.x, p2.x, p3.x, t),
      MathUtils.catmullRom(p0.y, p1.y, p2.y, p3.y, t)
    );
  }

  /**
   * Catmull-Rom spline interpolation for Vec3.
   * @param {Vec3} p0 - Point 0.
   * @param {Vec3} p1 - Point 1.
   * @param {Vec3} p2 - Point 2.
   * @param {Vec3} p3 - Point 3.
   * @param {number} t - Interpolation factor (0-1).
   * @returns {Vec3}
   */
  static vec3CatmullRom(p0, p1, p2, p3, t) {
    return new Vec3(
      MathUtils.catmullRom(p0.x, p1.x, p2.x, p3.x, t),
      MathUtils.catmullRom(p0.y, p1.y, p2.y, p3.y, t),
      MathUtils.catmullRom(p0.z, p1.z, p2.z, p3.z, t)
    );
  }

  /**
   * Performs interpolation over an array of points.
   * @param {Array<number>} points - Array of points.
   * @param {number} t - Interpolation factor (0 to points.length-1).
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {number}
   */
  static interpolateArray(points, t, method = 'linear') {
    if (!points || points.length === 0) return 0;
    if (points.length === 1) return points[0];
    if (t <= 0) return points[0];
    if (t >= points.length - 1) return points[points.length - 1];

    const idx = Math.floor(t);
    const frac = t - idx;
    const p0 = points[Math.max(0, idx - 1)];
    const p1 = points[idx];
    const p2 = points[Math.min(points.length - 1, idx + 1)];
    const p3 = points[Math.min(points.length - 1, idx + 2)];

    switch (method) {
      case 'linear':
        return this.linear(p1, p2, frac);
      case 'smoothstep':
        return this.smoothstep(p1, p2, frac);
      case 'smootherstep':
        return this.smootherstep(p1, p2, frac);
      case 'catmullrom':
        return this.catmullRom(p0, p1, p2, p3, frac);
      default:
        return this.linear(p1, p2, frac);
    }
  }

  /**
   * Performs interpolation over an array of Vec2 points.
   * @param {Array<Vec2>} points - Array of points.
   * @param {number} t - Interpolation factor (0 to points.length-1).
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {Vec2}
   */
  static interpolateVec2Array(points, t, method = 'linear') {
    if (!points || points.length === 0) return new Vec2(0, 0);
    if (points.length === 1) return points[0].clone();
    if (t <= 0) return points[0].clone();
    if (t >= points.length - 1) return points[points.length - 1].clone();

    const idx = Math.floor(t);
    const frac = t - idx;
    const p0 = points[Math.max(0, idx - 1)];
    const p1 = points[idx];
    const p2 = points[Math.min(points.length - 1, idx + 1)];
    const p3 = points[Math.min(points.length - 1, idx + 2)];

    switch (method) {
      case 'linear':
        return p1.lerp(p2, frac);
      case 'smoothstep':
        return p1.lerp(p2, MathUtils.smoothstep(0, 1, frac));
      case 'smootherstep':
        return p1.lerp(p2, MathUtils.smootherstep(0, 1, frac));
      case 'catmullrom':
        return this.vec2CatmullRom(p0, p1, p2, p3, frac);
      default:
        return p1.lerp(p2, frac);
    }
  }

  /**
   * Performs interpolation over an array of Vec3 points.
   * @param {Array<Vec3>} points - Array of points.
   * @param {number} t - Interpolation factor (0 to points.length-1).
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {Vec3}
   */
  static interpolateVec3Array(points, t, method = 'linear') {
    if (!points || points.length === 0) return new Vec3(0, 0, 0);
    if (points.length === 1) return points[0].clone();
    if (t <= 0) return points[0].clone();
    if (t >= points.length - 1) return points[points.length - 1].clone();

    const idx = Math.floor(t);
    const frac = t - idx;
    const p0 = points[Math.max(0, idx - 1)];
    const p1 = points[idx];
    const p2 = points[Math.min(points.length - 1, idx + 1)];
    const p3 = points[Math.min(points.length - 1, idx + 2)];

    switch (method) {
      case 'linear':
        return p1.lerp(p2, frac);
      case 'smoothstep':
        return p1.lerp(p2, MathUtils.smoothstep(0, 1, frac));
      case 'smootherstep':
        return p1.lerp(p2, MathUtils.smootherstep(0, 1, frac));
      case 'catmullrom':
        return this.vec3CatmullRom(p0, p1, p2, p3, frac);
      default:
        return p1.lerp(p2, frac);
    }
  }

  /**
   * Generates a sequence of interpolated values.
   * @param {number} start - Start value.
   * @param {number} end - End value.
   * @param {number} count - Number of steps.
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {Array<number>}
   */
  static sequence(start, end, count, method = 'linear') {
    const result = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      let value;
      switch (method) {
        case 'linear':
          value = this.linear(start, end, t);
          break;
        case 'smoothstep':
          value = this.smoothstep(start, end, t);
          break;
        case 'smootherstep':
          value = this.smootherstep(start, end, t);
          break;
        case 'easeIn':
          value = this.easeIn(start, end, t);
          break;
        case 'easeOut':
          value = this.easeOut(start, end, t);
          break;
        case 'easeInOut':
          value = this.easeInOut(start, end, t);
          break;
        default:
          value = this.linear(start, end, t);
      }
      result.push(value);
    }
    return result;
  }

  /**
   * Generates a sequence of interpolated Vec2 values.
   * @param {Vec2} start - Start vector.
   * @param {Vec2} end - End vector.
   * @param {number} count - Number of steps.
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {Array<Vec2>}
   */
  static vec2Sequence(start, end, count, method = 'linear') {
    const result = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      let value;
      switch (method) {
        case 'linear':
          value = start.lerp(end, t);
          break;
        case 'smoothstep':
          value = start.lerp(end, MathUtils.smoothstep(0, 1, t));
          break;
        case 'smootherstep':
          value = start.lerp(end, MathUtils.smootherstep(0, 1, t));
          break;
        case 'easeIn':
          value = start.lerp(end, Math.pow(t, 2));
          break;
        case 'easeOut':
          value = start.lerp(end, 1 - Math.pow(1 - t, 2));
          break;
        case 'easeInOut':
          const t2 = t < 0.5 ? 0.5 * Math.pow(2 * t, 2) : 1 - 0.5 * Math.pow(2 * (1 - t), 2);
          value = start.lerp(end, t2);
          break;
        default:
          value = start.lerp(end, t);
      }
      result.push(value);
    }
    return result;
  }

  /**
   * Generates a sequence of interpolated Vec3 values.
   * @param {Vec3} start - Start vector.
   * @param {Vec3} end - End vector.
   * @param {number} count - Number of steps.
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {Array<Vec3>}
   */
  static vec3Sequence(start, end, count, method = 'linear') {
    const result = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      let value;
      switch (method) {
        case 'linear':
          value = start.lerp(end, t);
          break;
        case 'smoothstep':
          value = start.lerp(end, MathUtils.smoothstep(0, 1, t));
          break;
        case 'smootherstep':
          value = start.lerp(end, MathUtils.smootherstep(0, 1, t));
          break;
        case 'easeIn':
          value = start.lerp(end, Math.pow(t, 2));
          break;
        case 'easeOut':
          value = start.lerp(end, 1 - Math.pow(1 - t, 2));
          break;
        case 'easeInOut':
          const t2 = t < 0.5 ? 0.5 * Math.pow(2 * t, 2) : 1 - 0.5 * Math.pow(2 * (1 - t), 2);
          value = start.lerp(end, t2);
          break;
        default:
          value = start.lerp(end, t);
      }
      result.push(value);
    }
    return result;
  }
}

export default Interpolation;

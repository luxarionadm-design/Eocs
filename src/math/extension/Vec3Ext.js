/**
 * Vec3 extensions.
 * Additional vector operations: reflect, refract, projectOnPlane, angleTo, rotateAround.
 * 
 * @example
 * const reflected = Vec3Ext.reflect(v, normal);
 * const refracted = Vec3Ext.refract(v, normal, 1.5);
 */
import Vec3 from '../Vec3.js';
import Quat from '../Quat.js';

class Vec3Ext {
  /**
   * Reflects a vector across a normal.
   * @param {Vec3} v - Vector to reflect.
   * @param {Vec3} normal - Reflection normal.
   * @returns {Vec3} Reflected vector.
   */
  static reflect(v, normal) {
    if (!(v instanceof Vec3) || !(normal instanceof Vec3)) {
      throw new TypeError('Vec3Ext.reflect(): Expected Vec3 instances');
    }

    const n = normal.clone().normalize();
    const d = v.dot(n);
    return v.clone().sub(n.clone().scale(2 * d));
  }

  /**
   * Fast version of reflect without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} v - Vector to reflect.
   * @param {Vec3} normal - Reflection normal.
   * @returns {Vec3} Reflected vector.
   */
  static reflectFast(v, normal) {
    const n = normal.clone().normalize();
    const d = v.dot(n);
    return v.clone().sub(n.clone().scale(2 * d));
  }

  /**
   * Refracts a vector across a normal.
   * @param {Vec3} v - Vector to refract.
   * @param {Vec3} normal - Refraction normal.
   * @param {number} eta - Ratio of indices of refraction.
   * @returns {Vec3} Refracted vector.
   */
  static refract(v, normal, eta) {
    if (!(v instanceof Vec3) || !(normal instanceof Vec3)) {
      throw new TypeError('Vec3Ext.refract(): Expected Vec3 instances');
    }
    if (typeof eta !== 'number' || eta <= 0) {
      throw new TypeError('Vec3Ext.refract(): Expected positive number for eta');
    }

    const n = normal.clone().normalize();
    const d = v.dot(n);
    const cosI = Math.max(-1, Math.min(1, d));
    const sinI2 = 1 - cosI * cosI;
    const sinR2 = sinI2 / (eta * eta);

    if (sinR2 > 1) {
      return null;
    }

    const cosR = Math.sqrt(1 - sinR2);
    return v.clone().scale(1 / eta).sub(n.clone().scale(cosR - cosI / eta));
  }

  /**
   * Fast version of refract without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} v - Vector to refract.
   * @param {Vec3} normal - Refraction normal.
   * @param {number} eta - Ratio of indices of refraction.
   * @returns {Vec3} Refracted vector.
   */
  static refractFast(v, normal, eta) {
    const n = normal.clone().normalize();
    const d = v.dot(n);
    const cosI = Math.max(-1, Math.min(1, d));
    const sinI2 = 1 - cosI * cosI;
    const sinR2 = sinI2 / (eta * eta);

    if (sinR2 > 1) {
      return null;
    }

    const cosR = Math.sqrt(1 - sinR2);
    return v.clone().scale(1 / eta).sub(n.clone().scale(cosR - cosI / eta));
  }

  /**
   * Projects a vector onto a plane.
   * @param {Vec3} v - Vector to project.
   * @param {Vec3} normal - Plane normal.
   * @returns {Vec3} Projected vector.
   */
  static projectOnPlane(v, normal) {
    if (!(v instanceof Vec3) || !(normal instanceof Vec3)) {
      throw new TypeError('Vec3Ext.projectOnPlane(): Expected Vec3 instances');
    }

    const n = normal.clone().normalize();
    const d = v.dot(n);
    return v.clone().sub(n.clone().scale(d));
  }

  /**
   * Fast version of projectOnPlane without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} v - Vector to project.
   * @param {Vec3} normal - Plane normal.
   * @returns {Vec3} Projected vector.
   */
  static projectOnPlaneFast(v, normal) {
    const n = normal.clone().normalize();
    const d = v.dot(n);
    return v.clone().sub(n.clone().scale(d));
  }

  /**
   * Computes the angle between two vectors.
   * @param {Vec3} a - First vector.
   * @param {Vec3} b - Second vector.
   * @param {Vec3} [reference] - Reference axis for signed angle.
   * @returns {number} Angle in radians.
   */
  static angleTo(a, b, reference = null) {
    if (!(a instanceof Vec3) || !(b instanceof Vec3)) {
      throw new TypeError('Vec3Ext.angleTo(): Expected Vec3 instances');
    }

    const dot = a.dot(b);
    const cross = Vec3.cross(a, b);
    const angle = Math.atan2(cross.length, dot);

    if (reference) {
      const sign = cross.dot(reference);
      return sign < 0 ? -angle : angle;
    }

    return angle;
  }

  /**
   * Rotates a vector around an axis by an angle.
   * @param {Vec3} v - Vector to rotate.
   * @param {Vec3} axis - Rotation axis.
   * @param {number} angle - Rotation angle in radians.
   * @returns {Vec3} Rotated vector.
   */
  static rotateAround(v, axis, angle) {
    if (!(v instanceof Vec3) || !(axis instanceof Vec3)) {
      throw new TypeError('Vec3Ext.rotateAround(): Expected Vec3 instances');
    }

    const q = Quat.fromAxisAngle(axis, angle);
    return q.mulVec3(v);
  }

  /**
   * Fast version of rotateAround without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} v - Vector to rotate.
   * @param {Vec3} axis - Rotation axis.
   * @param {number} angle - Rotation angle in radians.
   * @returns {Vec3} Rotated vector.
   */
  static rotateAroundFast(v, axis, angle) {
    const q = Quat.fromAxisAngle(axis, angle);
    return q.mulVec3(v);
  }

  /**
   * Computes the component of a vector along another vector.
   * @param {Vec3} v - Vector.
   * @param {Vec3} along - Direction vector.
   * @returns {Vec3} Component along the direction.
   */
  static componentAlong(v, along) {
    if (!(v instanceof Vec3) || !(along instanceof Vec3)) {
      throw new TypeError('Vec3Ext.componentAlong(): Expected Vec3 instances');
    }

    const a = along.clone().normalize();
    const d = v.dot(a);
    return a.clone().scale(d);
  }

  /**
   * Computes the perpendicular component of a vector.
   * @param {Vec3} v - Vector.
   * @param {Vec3} along - Direction vector.
   * @returns {Vec3} Perpendicular component.
   */
  static componentPerp(v, along) {
    if (!(v instanceof Vec3) || !(along instanceof Vec3)) {
      throw new TypeError('Vec3Ext.componentPerp(): Expected Vec3 instances');
    }

    const comp = Vec3Ext.componentAlong(v, along);
    return v.clone().sub(comp);
  }

  /**
   * Computes the projection of a point onto a line.
   * @param {Vec3} point - Point to project.
   * @param {Vec3} linePoint - Point on the line.
   * @param {Vec3} lineDirection - Direction of the line.
   * @returns {Vec3} Projected point.
   */
  static projectOnLine(point, linePoint, lineDirection) {
    if (!(point instanceof Vec3) || !(linePoint instanceof Vec3) || !(lineDirection instanceof Vec3)) {
      throw new TypeError('Vec3Ext.projectOnLine(): Expected Vec3 instances');
    }

    const dir = lineDirection.clone().normalize();
    const v = point.clone().sub(linePoint);
    const t = v.dot(dir);
    return linePoint.clone().add(dir.clone().scale(t));
  }

  /**
   * Computes the rejection of a vector (component perpendicular to plane).
   * @param {Vec3} v - Vector.
   * @param {Vec3} normal - Plane normal.
   * @returns {Vec3} Rejected vector.
   */
  static reject(v, normal) {
    if (!(v instanceof Vec3) || !(normal instanceof Vec3)) {
      throw new TypeError('Vec3Ext.reject(): Expected Vec3 instances');
    }

    return v.clone().sub(Vec3Ext.projectOnPlane(v, normal));
  }

  /**
   * Linearly interpolates between two vectors with ease.
   * @param {Vec3} a - Start vector.
   * @param {Vec3} b - End vector.
   * @param {number} t - Interpolation factor (0 to 1).
   * @param {string} [ease='linear'] - Ease function name.
   * @returns {Vec3} Interpolated vector.
   */
  static lerpEase(a, b, t, ease = 'linear') {
    if (!(a instanceof Vec3) || !(b instanceof Vec3)) {
      throw new TypeError('Vec3Ext.lerpEase(): Expected Vec3 instances');
    }

    let t2 = t;
    switch (ease) {
      case 'smoothstep':
        t2 = t * t * (3 - 2 * t);
        break;
      case 'smootherstep':
        t2 = t * t * t * (t * (t * 6 - 15) + 10);
        break;
      case 'easeIn':
        t2 = t * t;
        break;
      case 'easeOut':
        t2 = 1 - (1 - t) * (1 - t);
        break;
      case 'easeInOut':
        t2 = t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
        break;
      default:
        t2 = t;
    }

    return a.lerp(b, t2);
  }

  /**
   * Computes the bisector of two vectors.
   * @param {Vec3} a - First vector.
   * @param {Vec3} b - Second vector.
   * @returns {Vec3} Bisector vector.
   */
  static bisector(a, b) {
    if (!(a instanceof Vec3) || !(b instanceof Vec3)) {
      throw new TypeError('Vec3Ext.bisector(): Expected Vec3 instances');
    }

    const aNorm = a.clone().normalize();
    const bNorm = b.clone().normalize();
    return aNorm.add(bNorm).normalize();
  }

  /**
   * Computes the perpendicular bisector of two points.
   * @param {Vec3} p1 - First point.
   * @param {Vec3} p2 - Second point.
   * @returns {{normal: Vec3, point: Vec3}} Normal and midpoint.
   */
  static perpendicularBisector(p1, p2) {
    if (!(p1 instanceof Vec3) || !(p2 instanceof Vec3)) {
      throw new TypeError('Vec3Ext.perpendicularBisector(): Expected Vec3 instances');
    }

    const midpoint = p1.clone().add(p2).scale(0.5);
    const normal = p2.clone().sub(p1).normalize();
    return { normal, point: midpoint };
  }
}

export default Vec3Ext;

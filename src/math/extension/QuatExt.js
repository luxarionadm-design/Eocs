/**
 * Quaternion extensions.
 * Additional quaternion operations including slerp shortest path, squad, exp, log, pow, nlerp.
 * 
 * @example
 * const result = QuatExt.slerpShortest(q1, q2, 0.5);
 */
import Quat from '../Quat.js';
import Vec3 from '../Vec3.js';

class QuatExt {
  /**
   * Spherical linear interpolation with shortest path.
   * @param {Quat} a - Start quaternion.
   * @param {Quat} b - End quaternion.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Quat} Interpolated quaternion.
   */
  static slerpShortest(a, b, t) {
    if (!(a instanceof Quat) || !(b instanceof Quat)) {
      throw new TypeError('QuatExt.slerpShortest(): Expected Quat instances');
    }

    let qa = a.clone();
    let qb = b.clone();

    let cosHalfAngle = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;

    if (cosHalfAngle < 0) {
      qb = new Quat(-qb.x, -qb.y, -qb.z, -qb.w);
      cosHalfAngle = -cosHalfAngle;
    }

    if (cosHalfAngle > 0.9999) {
      const result = new Quat(
        qa.x + (qb.x - qa.x) * t,
        qa.y + (qb.y - qa.y) * t,
        qa.z + (qb.z - qa.z) * t,
        qa.w + (qb.w - qa.w) * t
      );
      return result.normalizeSafe();
    }

    const halfAngle = Math.acos(cosHalfAngle);
    const sinHalfAngle = Math.sin(halfAngle);
    const a1 = Math.sin((1 - t) * halfAngle) / sinHalfAngle;
    const b1 = Math.sin(t * halfAngle) / sinHalfAngle;

    return new Quat(
      a1 * qa.x + b1 * qb.x,
      a1 * qa.y + b1 * qb.y,
      a1 * qa.z + b1 * qb.z,
      a1 * qa.w + b1 * qb.w
    );
  }

  /**
   * Fast version of slerpShortest without validation.
   * For internal use only when type is guaranteed.
   * @param {Quat} a - Start quaternion.
   * @param {Quat} b - End quaternion.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Quat} Interpolated quaternion.
   */
  static slerpShortestFast(a, b, t) {
    let qa = a;
    let qb = b;

    let cosHalfAngle = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;

    if (cosHalfAngle < 0) {
      qb = new Quat(-qb.x, -qb.y, -qb.z, -qb.w);
      cosHalfAngle = -cosHalfAngle;
    }

    if (cosHalfAngle > 0.9999) {
      const result = new Quat(
        qa.x + (qb.x - qa.x) * t,
        qa.y + (qb.y - qa.y) * t,
        qa.z + (qb.z - qa.z) * t,
        qa.w + (qb.w - qa.w) * t
      );
      return result.normalizeSafe();
    }

    const halfAngle = Math.acos(cosHalfAngle);
    const sinHalfAngle = Math.sin(halfAngle);
    const a1 = Math.sin((1 - t) * halfAngle) / sinHalfAngle;
    const b1 = Math.sin(t * halfAngle) / sinHalfAngle;

    return new Quat(
      a1 * qa.x + b1 * qb.x,
      a1 * qa.y + b1 * qb.y,
      a1 * qa.z + b1 * qb.z,
      a1 * qa.w + b1 * qb.w
    );
  }

  /**
   * Squad interpolation (spherical quadrangle).
   * @param {Quat} a - Start quaternion.
   * @param {Quat} b - End quaternion.
   * @param {Quat} c - Control quaternion.
   * @param {Quat} d - Control quaternion.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Quat} Interpolated quaternion.
   */
  static squad(a, b, c, d, t) {
    if (!(a instanceof Quat) || !(b instanceof Quat) ||
        !(c instanceof Quat) || !(d instanceof Quat)) {
      throw new TypeError('QuatExt.squad(): Expected Quat instances');
    }

    const q1 = QuatExt.slerpShortest(a, d, t);
    const q2 = QuatExt.slerpShortest(b, c, t);
    return QuatExt.slerpShortest(q1, q2, 2 * t * (1 - t));
  }

  /**
   * Fast version of squad without validation.
   * For internal use only when type is guaranteed.
   * @param {Quat} a - Start quaternion.
   * @param {Quat} b - End quaternion.
   * @param {Quat} c - Control quaternion.
   * @param {Quat} d - Control quaternion.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Quat} Interpolated quaternion.
   */
  static squadFast(a, b, c, d, t) {
    const q1 = QuatExt.slerpShortestFast(a, d, t);
    const q2 = QuatExt.slerpShortestFast(b, c, t);
    return QuatExt.slerpShortestFast(q1, q2, 2 * t * (1 - t));
  }

  /**
   * Exponential of a quaternion.
   * @param {Quat} q - Quaternion.
   * @returns {Quat} Exponential.
   */
  static exp(q) {
    if (!(q instanceof Quat)) {
      throw new TypeError('QuatExt.exp(): Expected Quat instance');
    }

    const angle = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    if (angle < 1e-10) {
      return new Quat(0, 0, 0, Math.exp(q.w));
    }

    const expW = Math.exp(q.w);
    const s = expW * sinA / angle;

    return new Quat(
      s * q.x,
      s * q.y,
      s * q.z,
      expW * cosA
    );
  }

  /**
   * Logarithm of a quaternion.
   * @param {Quat} q - Quaternion.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {Quat} Logarithm.
   */
  static log(q, epsilon = 1e-10) {
    if (!(q instanceof Quat)) {
      throw new TypeError('QuatExt.log(): Expected Quat instance');
    }

    const norm = q.length;
    if (norm < epsilon) {
      throw new Error('QuatExt.log(): Cannot take log of zero quaternion');
    }

    const w = Math.log(norm);
    const angle = Math.acos(q.w / norm);
    const sinA = Math.sin(angle);

    if (Math.abs(sinA) < epsilon) {
      return new Quat(0, 0, 0, w);
    }

    const s = angle / sinA;

    return new Quat(
      s * q.x / norm,
      s * q.y / norm,
      s * q.z / norm,
      w
    );
  }

  /**
   * Power of a quaternion.
   * @param {Quat} q - Quaternion.
   * @param {number} t - Power.
   * @returns {Quat} q^t.
   */
  static pow(q, t) {
    if (!(q instanceof Quat)) {
      throw new TypeError('QuatExt.pow(): Expected Quat instance');
    }

    if (t === 0) return Quat.identity();
    if (t === 1) return q.clone();

    const logQ = QuatExt.log(q);
    const expQ = logQ.clone().scale(t);
    return QuatExt.exp(expQ);
  }

  /**
   * Normalized linear interpolation.
   * @param {Quat} a - Start quaternion.
   * @param {Quat} b - End quaternion.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Quat} Interpolated quaternion.
   */
  static nlerp(a, b, t) {
    if (!(a instanceof Quat) || !(b instanceof Quat)) {
      throw new TypeError('QuatExt.nlerp(): Expected Quat instances');
    }

    const result = new Quat(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t,
      a.z + (b.z - a.z) * t,
      a.w + (b.w - a.w) * t
    );

    return result.normalizeSafe();
  }

  /**
   * Fast version of nlerp without validation.
   * For internal use only when type is guaranteed.
   * @param {Quat} a - Start quaternion.
   * @param {Quat} b - End quaternion.
   * @param {number} t - Interpolation factor (0 to 1).
   * @returns {Quat} Interpolated quaternion.
   */
  static nlerpFast(a, b, t) {
    const result = new Quat(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t,
      a.z + (b.z - a.z) * t,
      a.w + (b.w - a.w) * t
    );

    return result.normalizeSafe();
  }

  /**
   * Creates a swing-twist decomposition.
   * @param {Quat} q - Quaternion to decompose.
   * @param {Vec3} axis - Twist axis.
   * @returns {{swing: Quat, twist: Quat}} Swing and twist parts.
   */
  static swingTwist(q, axis) {
    if (!(q instanceof Quat) || !(axis instanceof Vec3)) {
      throw new TypeError('QuatExt.swingTwist(): Expected Quat and Vec3');
    }

    const a = axis.clone().normalize();
    const p = q.clone().normalize();

    const dot = p.x * a.x + p.y * a.y + p.z * a.z;
    const twist = new Quat(
      a.x * dot,
      a.y * dot,
      a.z * dot,
      p.w
    ).normalize();

    const swing = p.clone().mul(twist.conjugate).normalize();

    return { swing, twist };
  }

  /**
   * Fast version of swingTwist without validation.
   * For internal use only when type is guaranteed.
   * @param {Quat} q - Quaternion to decompose.
   * @param {Vec3} axis - Twist axis.
   * @returns {{swing: Quat, twist: Quat}} Swing and twist parts.
   */
  static swingTwistFast(q, axis) {
    const a = axis.clone().normalize();
    const p = q.clone().normalize();

    const dot = p.x * a.x + p.y * a.y + p.z * a.z;
    const twist = new Quat(
      a.x * dot,
      a.y * dot,
      a.z * dot,
      p.w
    ).normalize();

    const swing = p.clone().mul(twist.conjugate).normalize();

    return { swing, twist };
  }

  /**
   * Computes the angular distance between two quaternions.
   * @param {Quat} a - First quaternion.
   * @param {Quat} b - Second quaternion.
   * @returns {number} Angular distance in radians.
   */
  static angularDistance(a, b) {
    if (!(a instanceof Quat) || !(b instanceof Quat)) {
      throw new TypeError('QuatExt.angularDistance(): Expected Quat instances');
    }

    const q = a.clone().mul(b.conjugate);
    const angle = 2 * Math.acos(Math.min(1, Math.abs(q.w)));
    return angle;
  }

  /**
   * Computes the derivative of a quaternion.
   * @param {Quat} q0 - Quaternion at time 0.
   * @param {Quat} q1 - Quaternion at time 1.
   * @param {number} dt - Time step.
   * @returns {Quat} Derivative.
   */
  static derivative(q0, q1, dt) {
    if (!(q0 instanceof Quat) || !(q1 instanceof Quat)) {
      throw new TypeError('QuatExt.derivative(): Expected Quat instances');
    }

    const diff = q1.clone().mul(q0.conjugate);
    const logDiff = QuatExt.log(diff);
    return logDiff.clone().scale(1 / dt);
  }

  /**
   * Integrates a quaternion derivative.
   * @param {Quat} q - Starting quaternion.
   * @param {Quat} derivative - Derivative.
   * @param {number} dt - Time step.
   * @returns {Quat} Integrated quaternion.
   */
  static integrate(q, derivative, dt) {
    if (!(q instanceof Quat) || !(derivative instanceof Quat)) {
      throw new TypeError('QuatExt.integrate(): Expected Quat instances');
    }

    const expDeriv = QuatExt.exp(derivative.clone().scale(dt));
    return q.clone().mul(expDeriv);
  }
}

export default QuatExt;

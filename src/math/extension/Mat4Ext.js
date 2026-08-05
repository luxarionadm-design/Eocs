/**
 * Mat4 extensions.
 * Additional matrix operations: decompose, interpolate, cofactor, adjugate, orthogonalize.
 * 
 * @example
 * const result = Mat4Ext.decompose(matrix);
 */
import Mat4 from '../Mat4.js';
import Vec3 from '../Vec3.js';
import Quat from '../Quat.js';
import Mat3 from '../Mat3.js';
import QuatExt from './QuatExt.js';

class Mat4Ext {
  /**
   * Decomposes a matrix into position, rotation, and scale.
   * @param {Mat4} mat - Matrix to decompose.
   * @returns {{position: Vec3, rotation: Quat, scale: Vec3}} Decomposed components.
   * @throws {Error} If matrix is singular.
   */
  static decompose(mat) {
    if (!(mat instanceof Mat4)) {
      throw new TypeError('Mat4Ext.decompose(): Expected Mat4 instance');
    }

    const m = mat.getData();

    const position = new Vec3(m[12], m[13], m[14]);

    const scaleX = Math.sqrt(m[0] * m[0] + m[4] * m[4] + m[8] * m[8]);
    const scaleY = Math.sqrt(m[1] * m[1] + m[5] * m[5] + m[9] * m[9]);
    const scaleZ = Math.sqrt(m[2] * m[2] + m[6] * m[6] + m[10] * m[10]);
    const scale = new Vec3(scaleX, scaleY, scaleZ);

    const det = mat.determinant;
    if (det < 0) {
    }

    if (Math.abs(scaleX) < 1e-10 || Math.abs(scaleY) < 1e-10 || Math.abs(scaleZ) < 1e-10) {
      throw new Error('Mat4Ext.decompose(): Matrix has zero scale');
    }

    const rotMat = new Mat3(
      m[0] / scaleX, m[1] / scaleY, m[2] / scaleZ,
      m[4] / scaleX, m[5] / scaleY, m[6] / scaleZ,
      m[8] / scaleX, m[9] / scaleY, m[10] / scaleZ
    );

    const rotation = Quat.fromMat3(rotMat);

    return { position, rotation, scale };
  }

  /**
   * Fast version of decompose without validation.
   * For internal use only when type is guaranteed.
   * @param {Mat4} mat - Matrix to decompose.
   * @returns {{position: Vec3, rotation: Quat, scale: Vec3}} Decomposed components.
   */
  static decomposeFast(mat) {
    const m = mat.getData();

    const position = new Vec3(m[12], m[13], m[14]);

    const scaleX = Math.sqrt(m[0] * m[0] + m[4] * m[4] + m[8] * m[8]);
    const scaleY = Math.sqrt(m[1] * m[1] + m[5] * m[5] + m[9] * m[9]);
    const scaleZ = Math.sqrt(m[2] * m[2] + m[6] * m[6] + m[10] * m[10]);
    const scale = new Vec3(scaleX, scaleY, scaleZ);

    const rotMat = new Mat3(
      m[0] / scaleX, m[1] / scaleY, m[2] / scaleZ,
      m[4] / scaleX, m[5] / scaleY, m[6] / scaleZ,
      m[8] / scaleX, m[9] / scaleY, m[10] / scaleZ
    );

    const rotation = Quat.fromMat3(rotMat);

    return { position, rotation, scale };
  }

  /**
   * Interpolates between two matrices.
   * @param {Mat4} a - First matrix.
   * @param {Mat4} b - Second matrix.
   * @param {number} t - Interpolation factor (0 to 1).
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {Mat4} Interpolated matrix.
   */
  static interpolate(a, b, t, method = 'linear') {
    if (!(a instanceof Mat4) || !(b instanceof Mat4)) {
      throw new TypeError('Mat4Ext.interpolate(): Expected Mat4 instances');
    }

    const decA = Mat4Ext.decompose(a);
    const decB = Mat4Ext.decompose(b);

    let position, rotation, scale;

    switch (method) {
      case 'linear':
        position = decA.position.clone().lerp(decB.position, t);
        rotation = QuatExt.nlerp(decA.rotation, decB.rotation, t);
        scale = decA.scale.clone().lerp(decB.scale, t);
        break;

      case 'slerp':
        position = decA.position.clone().lerp(decB.position, t);
        rotation = QuatExt.slerpShortest(decA.rotation, decB.rotation, t);
        scale = decA.scale.clone().lerp(decB.scale, t);
        break;

      default:
        throw new Error(`Mat4Ext.interpolate(): Unknown method ${method}`);
    }

    return Mat4Ext.compose(position, rotation, scale);
  }

  /**
   * Fast version of interpolate without validation.
   * For internal use only when type is guaranteed.
   * @param {Mat4} a - First matrix.
   * @param {Mat4} b - Second matrix.
   * @param {number} t - Interpolation factor (0 to 1).
   * @param {string} [method='linear'] - Interpolation method.
   * @returns {Mat4} Interpolated matrix.
   */
  static interpolateFast(a, b, t, method = 'linear') {
    const decA = Mat4Ext.decomposeFast(a);
    const decB = Mat4Ext.decomposeFast(b);

    let position, rotation, scale;

    switch (method) {
      case 'linear':
        position = decA.position.clone().lerp(decB.position, t);
        rotation = QuatExt.nlerpFast(decA.rotation, decB.rotation, t);
        scale = decA.scale.clone().lerp(decB.scale, t);
        break;

      case 'slerp':
        position = decA.position.clone().lerp(decB.position, t);
        rotation = QuatExt.slerpShortestFast(decA.rotation, decB.rotation, t);
        scale = decA.scale.clone().lerp(decB.scale, t);
        break;

      default:
        throw new Error(`Mat4Ext.interpolateFast(): Unknown method ${method}`);
    }

    return Mat4Ext.composeFast(position, rotation, scale);
  }

  /**
   * Composes a matrix from position, rotation, and scale.
   * @param {Vec3} position - Position.
   * @param {Quat} rotation - Rotation.
   * @param {Vec3} scale - Scale.
   * @returns {Mat4} Composed matrix.
   */
  static compose(position, rotation, scale) {
    if (!(position instanceof Vec3) || !(rotation instanceof Quat) || !(scale instanceof Vec3)) {
      throw new TypeError('Mat4Ext.compose(): Expected Vec3, Quat, Vec3');
    }

    const mat = rotation.toMat4();
    mat.scale(scale.x, scale.y, scale.z);
    mat.translate(position.x, position.y, position.z);
    return mat;
  }

  /**
   * Fast version of compose without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} position - Position.
   * @param {Quat} rotation - Rotation.
   * @param {Vec3} scale - Scale.
   * @returns {Mat4} Composed matrix.
   */
  static composeFast(position, rotation, scale) {
    const mat = rotation.toMat4();
    mat.scale(scale.x, scale.y, scale.z);
    mat.translate(position.x, position.y, position.z);
    return mat;
  }

  /**
   * Computes the cofactor matrix.
   * @param {Mat4} mat - Matrix.
   * @returns {Mat4} Cofactor matrix.
   */
  static cofactor(mat) {
    if (!(mat instanceof Mat4)) {
      throw new TypeError('Mat4Ext.cofactor(): Expected Mat4 instance');
    }

    const m = mat.getData();
    const cof = new Float32Array(16);

    const minor = (i, j) => {
      const rows = [0, 1, 2, 3].filter(r => r !== i);
      const cols = [0, 1, 2, 3].filter(c => c !== j);
      const sub = [
        m[rows[0] * 4 + cols[0]], m[rows[0] * 4 + cols[1]], m[rows[0] * 4 + cols[2]],
        m[rows[1] * 4 + cols[0]], m[rows[1] * 4 + cols[1]], m[rows[1] * 4 + cols[2]],
        m[rows[2] * 4 + cols[0]], m[rows[2] * 4 + cols[1]], m[rows[2] * 4 + cols[2]]
      ];
      return sub[0] * (sub[4] * sub[8] - sub[5] * sub[7]) -
             sub[1] * (sub[3] * sub[8] - sub[5] * sub[6]) +
             sub[2] * (sub[3] * sub[7] - sub[4] * sub[6]);
    };

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        cof[i * 4 + j] = ((i + j) % 2 === 0 ? 1 : -1) * minor(i, j);
      }
    }

    return new Mat4(
      cof[0], cof[1], cof[2], cof[3],
      cof[4], cof[5], cof[6], cof[7],
      cof[8], cof[9], cof[10], cof[11],
      cof[12], cof[13], cof[14], cof[15]
    );
  }

  /**
   * Computes the adjugate matrix.
   * @param {Mat4} mat - Matrix.
   * @returns {Mat4} Adjugate matrix.
   */
  static adjugate(mat) {
    if (!(mat instanceof Mat4)) {
      throw new TypeError('Mat4Ext.adjugate(): Expected Mat4 instance');
    }

    return Mat4Ext.cofactor(mat).transpose;
  }

  /**
   * Orthogonalizes a matrix (Gram-Schmidt).
   * @param {Mat4} mat - Matrix to orthogonalize.
   * @returns {Mat4} Orthogonalized matrix.
   */
  static orthogonalize(mat) {
    if (!(mat instanceof Mat4)) {
      throw new TypeError('Mat4Ext.orthogonalize(): Expected Mat4 instance');
    }

    const m = mat.getData();

    let v0 = new Vec3(m[0], m[4], m[8]);
    let v1 = new Vec3(m[1], m[5], m[9]);
    let v2 = new Vec3(m[2], m[6], m[10]);

    v0 = v0.clone().normalize();

    const dot01 = v0.dot(v1);
    v1 = v1.clone().sub(v0.clone().scale(dot01)).normalize();

    const dot02 = v0.dot(v2);
    const dot12 = v1.dot(v2);
    v2 = v2.clone().sub(v0.clone().scale(dot02)).sub(v1.clone().scale(dot12)).normalize();

    const result = mat.clone();
    const d = result.getData();
    d[0] = v0.x; d[1] = v1.x; d[2] = v2.x;
    d[4] = v0.y; d[5] = v1.y; d[6] = v2.y;
    d[8] = v0.z; d[9] = v1.z; d[10] = v2.z;

    return result;
  }

  /**
   * Creates a rotation matrix from an axis and angle.
   * @param {Vec3} axis - Rotation axis.
   * @param {number} angle - Rotation angle in radians.
   * @returns {Mat4} Rotation matrix.
   */
  static rotationAxis(axis, angle) {
    if (!(axis instanceof Vec3)) {
      throw new TypeError('Mat4Ext.rotationAxis(): Expected Vec3');
    }

    const q = Quat.fromAxisAngle(axis, angle);
    return q.toMat4();
  }

  /**
   * Creates a scaling matrix.
   * @param {Vec3} scale - Scale factors.
   * @returns {Mat4} Scaling matrix.
   */
  static scaling(scale) {
    if (!(scale instanceof Vec3)) {
      throw new TypeError('Mat4Ext.scaling(): Expected Vec3');
    }

    return new Mat4(
      scale.x, 0, 0, 0,
      0, scale.y, 0, 0,
      0, 0, scale.z, 0,
      0, 0, 0, 1
    );
  }

  /**
   * Creates a translation matrix.
   * @param {Vec3} position - Position.
   * @returns {Mat4} Translation matrix.
   */
  static translation(position) {
    if (!(position instanceof Vec3)) {
      throw new TypeError('Mat4Ext.translation(): Expected Vec3');
    }

    return new Mat4(
      1, 0, 0, position.x,
      0, 1, 0, position.y,
      0, 0, 1, position.z,
      0, 0, 0, 1
    );
  }
}

export default Mat4Ext;

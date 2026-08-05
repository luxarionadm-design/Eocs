/**
 * Axis-Aligned Bounding Box.
 * Defined by min and max corners.
 * 
 * @example
 * const aabb = new AABB(new Vec3(0, 0, 0), new Vec3(1, 1, 1));
 * const contains = aabb.containsPoint(new Vec3(0.5, 0.5, 0.5));
 */
import Vec3 from '../core/Vec3.js';

class AABB {
  /** @type {Vec3} */ #min;
  /** @type {Vec3} */ #max;

  /**
   * Creates a new AABB.
   * @param {Vec3} min - Minimum corner.
   * @param {Vec3} max - Maximum corner.
   */
  constructor(min, max) {
    this.#min = min.clone();
    this.#max = max.clone();
    this.#validate();
  }

  /**
   * Validates the AABB.
   * @throws {Error} If min > max.
   */
  #validate() {
    if (this.#min.x > this.#max.x ||
        this.#min.y > this.#max.y ||
        this.#min.z > this.#max.z) {
      throw new Error('AABB: min must be less than or equal to max');
    }
  }

  /** Returns the min corner (cloned). @returns {Vec3} */
  get min() { return this.#min.clone(); }

  /** Returns the max corner (cloned). @returns {Vec3} */
  get max() { return this.#max.clone(); }

  /** Returns the center of the box. @returns {Vec3} */
  get center() {
    return this.#min.clone().add(this.#max).scale(0.5);
  }

  /** Returns the size of the box. @returns {Vec3} */
  get size() {
    return this.#max.clone().sub(this.#min);
  }

  /** Returns the volume of the box. @type {number} */
  get volume() {
    const s = this.size;
    return s.x * s.y * s.z;
  }

  /** Returns the surface area. @type {number} */
  get surfaceArea() {
    const s = this.size;
    return 2 * (s.x * s.y + s.y * s.z + s.z * s.x);
  }

  /**
   * Sets the min corner.
   * @param {Vec3} min - New min corner.
   * @returns {this} For chaining.
   */
  setMin(min) {
    this.#min = min.clone();
    this.#validate();
    return this;
  }

  /**
   * Sets the max corner.
   * @param {Vec3} max - New max corner.
   * @returns {this} For chaining.
   */
  setMax(max) {
    this.#max = max.clone();
    this.#validate();
    return this;
  }

  /**
   * Sets the box from center and size.
   * @param {Vec3} center - Center of the box.
   * @param {Vec3} size - Size of the box.
   * @returns {this} For chaining.
   */
  setFromCenterSize(center, size) {
    const half = size.clone().scale(0.5);
    this.#min = center.clone().sub(half);
    this.#max = center.clone().add(half);
    this.#validate();
    return this;
  }

  /**
   * Sets the box from an array of points.
   * @param {Array<Vec3>} points - Points to contain.
   * @returns {this} For chaining.
   */
  setFromPoints(points) {
    if (!points || points.length === 0) {
      this.#min = new Vec3(0, 0, 0);
      this.#max = new Vec3(0, 0, 0);
      return this;
    }

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (const p of points) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }

    this.#min = new Vec3(minX, minY, minZ);
    this.#max = new Vec3(maxX, maxY, maxZ);
    this.#validate();
    return this;
  }

  /**
   * Checks if a point is inside the box.
   * @param {Vec3} point - Point to check.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  containsPoint(point, epsilon = 1e-10) {
    return point.x >= this.#min.x - epsilon &&
           point.x <= this.#max.x + epsilon &&
           point.y >= this.#min.y - epsilon &&
           point.y <= this.#max.y + epsilon &&
           point.z >= this.#min.z - epsilon &&
           point.z <= this.#max.z + epsilon;
  }

  /**
   * Fast version of containsPoint without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} point - Point to check.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  containsPointFast(point, epsilon = 1e-10) {
    return point.x >= this.#min.x - epsilon &&
           point.x <= this.#max.x + epsilon &&
           point.y >= this.#min.y - epsilon &&
           point.y <= this.#max.y + epsilon &&
           point.z >= this.#min.z - epsilon &&
           point.z <= this.#max.z + epsilon;
  }

  /**
   * Checks if this box contains another box.
   * @param {AABB} other - Other box.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  containsBox(other, epsilon = 1e-10) {
    return this.containsPoint(other.#min, epsilon) &&
           this.containsPoint(other.#max, epsilon);
  }

  /**
   * Checks if this box intersects another box.
   * @param {AABB} other - Other box.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  intersectsBox(other, epsilon = 1e-10) {
    return this.#min.x - epsilon <= other.#max.x &&
           this.#max.x + epsilon >= other.#min.x &&
           this.#min.y - epsilon <= other.#max.y &&
           this.#max.y + epsilon >= other.#min.y &&
           this.#min.z - epsilon <= other.#max.z &&
           this.#max.z + epsilon >= other.#min.z;
  }

  /**
   * Fast version of intersectsBox without validation.
   * For internal use only when type is guaranteed.
   * @param {AABB} other - Other box.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  intersectsBoxFast(other, epsilon = 1e-10) {
    return this.#min.x - epsilon <= other.#max.x &&
           this.#max.x + epsilon >= other.#min.x &&
           this.#min.y - epsilon <= other.#max.y &&
           this.#max.y + epsilon >= other.#min.y &&
           this.#min.z - epsilon <= other.#max.z &&
           this.#max.z + epsilon >= other.#min.z;
  }

  /**
   * Computes the intersection of two boxes.
   * @param {AABB} other - Other box.
   * @returns {AABB|null} Intersection box or null.
   */
  intersectionBox(other) {
    const min = new Vec3(
      Math.max(this.#min.x, other.#min.x),
      Math.max(this.#min.y, other.#min.y),
      Math.max(this.#min.z, other.#min.z)
    );
    const max = new Vec3(
      Math.min(this.#max.x, other.#max.x),
      Math.min(this.#max.y, other.#max.y),
      Math.min(this.#max.z, other.#max.z)
    );

    if (min.x > max.x || min.y > max.y || min.z > max.z) {
      return null;
    }

    return new AABB(min, max);
  }

  /**
   * Computes the union of two boxes.
   * @param {AABB} other - Other box.
   * @returns {AABB} Union box.
   */
  unionBox(other) {
    const min = new Vec3(
      Math.min(this.#min.x, other.#min.x),
      Math.min(this.#min.y, other.#min.y),
      Math.min(this.#min.z, other.#min.z)
    );
    const max = new Vec3(
      Math.max(this.#max.x, other.#max.x),
      Math.max(this.#max.y, other.#max.y),
      Math.max(this.#max.z, other.#max.z)
    );

    return new AABB(min, max);
  }

  /**
   * Expands the box by a margin.
   * @param {number} margin - Margin to expand.
   * @returns {this} For chaining.
   */
  expand(margin) {
    this.#min.x -= margin;
    this.#min.y -= margin;
    this.#min.z -= margin;
    this.#max.x += margin;
    this.#max.y += margin;
    this.#max.z += margin;
    return this;
  }

  /**
   * Computes the closest point on the box to a point.
   * @param {Vec3} point - Point to find closest.
   * @returns {Vec3} Closest point.
   */
  closestPoint(point) {
    return new Vec3(
      Math.max(this.#min.x, Math.min(this.#max.x, point.x)),
      Math.max(this.#min.y, Math.min(this.#max.y, point.y)),
      Math.max(this.#min.z, Math.min(this.#max.z, point.z))
    );
  }

  /**
   * Computes the distance from a point to the box.
   * @param {Vec3} point - Point to test.
   * @returns {number} Distance (0 if inside).
   */
  distanceToPoint(point) {
    const cp = this.closestPoint(point);
    return point.distance(cp);
  }

  /**
   * Computes the squared distance from a point to the box.
   * @param {Vec3} point - Point to test.
   * @returns {number} Squared distance (0 if inside).
   */
  distanceSqToPoint(point) {
    const dx = Math.max(this.#min.x - point.x, 0, point.x - this.#max.x);
    const dy = Math.max(this.#min.y - point.y, 0, point.y - this.#max.y);
    const dz = Math.max(this.#min.z - point.z, 0, point.z - this.#max.z);
    return dx * dx + dy * dy + dz * dz;
  }

  /**
   * Gets the eight corners of the box.
   * @returns {Array<Vec3>} Eight corners.
   */
  getCorners() {
    return [
      new Vec3(this.#min.x, this.#min.y, this.#min.z),
      new Vec3(this.#max.x, this.#min.y, this.#min.z),
      new Vec3(this.#max.x, this.#max.y, this.#min.z),
      new Vec3(this.#min.x, this.#max.y, this.#min.z),
      new Vec3(this.#min.x, this.#min.y, this.#max.z),
      new Vec3(this.#max.x, this.#min.y, this.#max.z),
      new Vec3(this.#max.x, this.#max.y, this.#max.z),
      new Vec3(this.#min.x, this.#max.y, this.#max.z)
    ];
  }

  /**
   * Creates a copy of this AABB.
   * @returns {AABB}
   */
  clone() {
    return new AABB(this.#min, this.#max);
  }

  /** @returns {AABB} Empty/invalid box */
  static empty() {
    return new AABB(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
  }

  /**
   * Creates an AABB from center and size.
   * @param {Vec3} center - Center of the box.
   * @param {Vec3} size - Size of the box.
   * @returns {AABB}
   */
  static fromCenterSize(center, size) {
    const aabb = new AABB(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
    aabb.setFromCenterSize(center, size);
    return aabb;
  }

  /**
   * Creates an AABB from points.
   * @param {Array<Vec3>} points - Points to contain.
   * @returns {AABB}
   */
  static fromPoints(points) {
    const aabb = new AABB(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
    aabb.setFromPoints(points);
    return aabb;
  }
}

export default AABB;

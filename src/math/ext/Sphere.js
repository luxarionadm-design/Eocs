/**
 * Sphere geometry representation.
 * Defined by center and radius.
 * 
 * @example
 * const sphere = new Sphere(new Vec3(0, 0, 0), 5);
 * const point = sphere.randomPoint();
 */
import Vec3 from '../core/Vec3.js';
import MathUtils from '../utils/MathUtils.js';

class Sphere {
  /** @type {Vec3} */ #center;
  /** @type {number} */ #radius;

  /**
   * Creates a new Sphere.
   * @param {Vec3} center - Center of the sphere.
   * @param {number} radius - Radius of the sphere.
   */
  constructor(center, radius = 1) {
    this.#center = center.clone();
    this.#radius = Math.max(0, radius);
  }

  /** Returns the center (cloned). @returns {Vec3} */
  get center() { return this.#center.clone(); }

  /** Returns the radius. @type {number} */
  get radius() { return this.#radius; }

  /** Returns the diameter. @type {number} */
  get diameter() { return this.#radius * 2; }

  /** Returns the surface area. @type {number} */
  get surfaceArea() { return 4 * Math.PI * this.#radius * this.#radius; }

  /** Returns the volume. @type {number} */
  get volume() { return (4 / 3) * Math.PI * this.#radius * this.#radius * this.#radius; }

  /**
   * Sets the center.
   * @param {Vec3} center - New center.
   * @returns {this} For chaining.
   */
  setCenter(center) {
    this.#center = center.clone();
    return this;
  }

  /**
   * Sets the radius.
   * @param {number} radius - New radius.
   * @returns {this} For chaining.
   */
  setRadius(radius) {
    this.#radius = Math.max(0, radius);
    return this;
  }

  /**
   * Sets from two points (diameter).
   * @param {Vec3} p1 - First point.
   * @param {Vec3} p2 - Second point.
   * @returns {this} For chaining.
   */
  setFromPoints(p1, p2) {
    this.#center = p1.clone().add(p2).scale(0.5);
    this.#radius = p1.distance(p2) / 2;
    return this;
  }

  /**
   * Sets the sphere to contain multiple points.
   * @param {Array<Vec3>} points - Points to contain.
   * @returns {this} For chaining.
   */
  setFromPoints(points) {
    if (!points || points.length === 0) return this;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    for (const p of points) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }

    const center = new Vec3(
      (minX + maxX) / 2,
      (minY + maxY) / 2,
      (minZ + maxZ) / 2
    );

    let radius = 0;
    for (const p of points) {
      const d = center.distance(p);
      if (d > radius) radius = d;
    }

    this.#center = center;
    this.#radius = radius;
    return this;
  }

  /**
   * Computes the distance from a point to the sphere surface.
   * @param {Vec3} point - Point to test.
   * @returns {number} Positive if outside, negative if inside.
   */
  distanceToPoint(point) {
    return point.distance(this.#center) - this.#radius;
  }

  /**
   * Fast version of distanceToPoint without validation.
   * For internal use only when type is guaranteed.
   * @param {Vec3} point - Point to test.
   * @returns {number} Positive if outside, negative if inside.
   */
  distanceToPointFast(point) {
    const dx = point.x - this.#center.x;
    const dy = point.y - this.#center.y;
    const dz = point.z - this.#center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz) - this.#radius;
  }

  /**
   * Checks if a point is inside the sphere.
   * @param {Vec3} point - Point to check.
   * @param {number} [epsilon=1e-10] - Tolerance.
   * @returns {boolean}
   */
  containsPoint(point, epsilon = 1e-10) {
    return point.distance(this.#center) <= this.#radius + epsilon;
  }

  /**
   * Projects a point onto the sphere surface.
   * @param {Vec3} point - Point to project.
   * @returns {Vec3} Projected point.
   */
  projectPoint(point) {
    const v = point.clone().sub(this.#center);
    const len = v.length;
    if (len < 1e-10) {
      return this.#center.clone().add(new Vec3(this.#radius, 0, 0));
    }
    return this.#center.clone().add(v.scale(this.#radius / len));
  }

  /**
   * Generates a random point on the sphere surface.
   * @returns {Vec3} Random point.
   */
  randomPoint() {
    const theta = MathUtils.randomRange(0, MathUtils.TWO_PI);
    const phi = Math.acos(MathUtils.randomRange(-1, 1));

    const x = this.#radius * Math.sin(phi) * Math.cos(theta);
    const y = this.#radius * Math.sin(phi) * Math.sin(theta);
    const z = this.#radius * Math.cos(phi);

    return this.#center.clone().add(new Vec3(x, y, z));
  }

  /**
   * Generates a random point inside the sphere.
   * @returns {Vec3} Random point.
   */
  randomPointInside() {
    while (true) {
      const x = MathUtils.randomRange(-this.#radius, this.#radius);
      const y = MathUtils.randomRange(-this.#radius, this.#radius);
      const z = MathUtils.randomRange(-this.#radius, this.#radius);
      const p = new Vec3(x, y, z);
      if (p.length <= this.#radius) {
        return this.#center.clone().add(p);
      }
    }
  }

  /**
   * Checks if this sphere intersects another.
   * @param {Sphere} other - Other sphere.
   * @returns {boolean}
   */
  intersectsSphere(other) {
    const dist = this.#center.distance(other.#center);
    return dist <= this.#radius + other.#radius;
  }

  /**
   * Computes the intersection volume of two spheres.
   * @param {Sphere} other - Other sphere.
   * @returns {number} Intersection volume.
   */
  intersectionVolume(other) {
    const d = this.#center.distance(other.#center);
    const r1 = this.#radius;
    const r2 = other.#radius;

    if (d >= r1 + r2) return 0;
    if (d <= Math.abs(r1 - r2)) {
      return Math.min(this.volume, other.volume);
    }

    const d1 = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const d2 = d - d1;

    const v1 = Math.PI * d1 * d1 * (r1 - d1 / 3);
    const v2 = Math.PI * d2 * d2 * (r2 - d2 / 3);

    return v1 + v2;
  }

  /**
   * Computes the bounding box of the sphere.
   * @returns {AABB} Bounding box.
   */
  boundingBox() {
    const AABB = require('./AABB.js').default;
    const min = this.#center.clone().add(new Vec3(-this.#radius, -this.#radius, -this.#radius));
    const max = this.#center.clone().add(new Vec3(this.#radius, this.#radius, this.#radius));
    return new AABB(min, max);
  }

  /**
   * Creates a copy of this sphere.
   * @returns {Sphere}
   */
  clone() {
    return new Sphere(this.#center, this.#radius);
  }

  /**
   * Creates a sphere from four points.
   * @param {Vec3} p1 - First point.
   * @param {Vec3} p2 - Second point.
   * @param {Vec3} p3 - Third point.
   * @param {Vec3} p4 - Fourth point.
   * @returns {Sphere}
   */
  static fromPoints(p1, p2, p3, p4) {
    const a = p2.clone().sub(p1);
    const b = p3.clone().sub(p1);
    const c = p4.clone().sub(p1);

    const ab = a.dot(a);
    const bb = b.dot(b);
    const cb = c.dot(c);

    const d = 2 * (
      a.x * (b.y * c.z - b.z * c.y) -
      a.y * (b.x * c.z - b.z * c.x) +
      a.z * (b.x * c.y - b.y * c.x)
    );

    if (Math.abs(d) < 1e-10) {
      return new Sphere(new Vec3(0, 0, 0), 0);
    }

    const ux = (bb * (c.z * a.y - c.y * a.z) + cb * (a.z * b.y - a.y * b.z)) / d;
    const uy = (bb * (c.x * a.z - c.z * a.x) + cb * (a.x * b.z - a.z * b.x)) / d;
    const uz = (bb * (c.y * a.x - c.x * a.y) + cb * (a.y * b.x - a.x * b.y)) / d;

    const center = new Vec3(ux, uy, uz);
    const radius = center.length;

    return new Sphere(p1.clone().add(center), radius);
  }

  /** @returns {Sphere} Unit sphere at origin */
  static unit() {
    return new Sphere(new Vec3(0, 0, 0), 1);
  }
}

export default Sphere;

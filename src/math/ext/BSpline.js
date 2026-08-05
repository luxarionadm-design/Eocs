/**
 * B-Spline curve implementation.
 * Supports uniform, clamped, and non-uniform knot vectors.
 * 
 * @example
 * const spline = new BSpline([new Vec2(0,0), new Vec2(1,2), new Vec2(2,0), new Vec2(3,1)]);
 * const point = spline.evaluate(0.5);
 */
import Vec2 from '../core/Vec2.js';
import Vec3 from '../core/Vec3.js';

class BSpline {
  /** @type {Array<Vec2|Vec3>} */ #controlPoints;
  /** @type {number} */ #degree;
  /** @type {Array<number>} */ #knots;
  /** @type {number} */ #dimension;
  /** @type {number} */ #n;

  /**
   * Creates a B-Spline curve.
   * @param {Array<Vec2|Vec3>} controlPoints - Control points.
   * @param {number} [degree=3] - Degree of the curve.
   * @param {Array<number>} [knots] - Optional knot vector.
   * @throws {Error} If control points are invalid.
   */
  constructor(controlPoints, degree = 3, knots = null) {
    if (!Array.isArray(controlPoints) || controlPoints.length < degree + 1) {
      throw new Error(`BSpline: Need at least ${degree + 1} control points`);
    }

    this.#controlPoints = controlPoints.map(p => p.clone());
    this.#degree = degree;
    this.#n = controlPoints.length - 1;
    this.#dimension = this.#determineDimension(controlPoints);

    if (knots) {
      this.#validateKnots(knots);
      this.#knots = knots.slice();
    } else {
      this.#knots = this.#generateClampedKnots();
    }
  }

  /**
   * Determines the dimension from control points.
   * @param {Array<Vec2|Vec3>} points - Control points.
   * @returns {number} 2 or 3.
   */
  #determineDimension(points) {
    const first = points[0];
    let dim = 2;
    if (first instanceof Vec3) dim = 3;
    else if (!(first instanceof Vec2)) {
      throw new Error('BSpline: Control points must be Vec2 or Vec3');
    }

    for (const p of points) {
      if (dim === 2 && !(p instanceof Vec2)) {
        throw new Error('BSpline: Mixed control point types');
      }
      if (dim === 3 && !(p instanceof Vec3)) {
        throw new Error('BSpline: Mixed control point types');
      }
    }
    return dim;
  }

  /**
   * Validates knot vector.
   * @param {Array<number>} knots - Knot vector.
   * @throws {Error} If invalid.
   */
  #validateKnots(knots) {
    if (!Array.isArray(knots) || knots.length !== this.#n + this.#degree + 2) {
      throw new Error('BSpline: Invalid knot vector length');
    }
    for (let i = 1; i < knots.length; i++) {
      if (knots[i] < knots[i - 1]) {
        throw new Error('BSpline: Knot vector must be non-decreasing');
      }
    }
  }

  /**
   * Generates clamped knot vector.
   * @returns {Array<number>}
   */
  #generateClampedKnots() {
    const m = this.#n + this.#degree + 1;
    const knots = [];
    for (let i = 0; i <= m; i++) {
      if (i <= this.#degree) {
        knots.push(0);
      } else if (i > this.#n) {
        knots.push(1);
      } else {
        knots.push((i - this.#degree) / (this.#n - this.#degree + 1));
      }
    }
    return knots;
  }

  /** Returns control points (cloned). @returns {Array<Vec2|Vec3>} */
  get controlPoints() {
    return this.#controlPoints.map(p => p.clone());
  }

  /** Returns the degree. @type {number} */
  get degree() { return this.#degree; }

  /** Returns the knot vector (cloned). @returns {Array<number>} */
  get knots() { return this.#knots.slice(); }

  /** Returns the dimension (2 or 3). @type {number} */
  get dimension() { return this.#dimension; }

  /** Returns the number of control points. @type {number} */
  get numControlPoints() { return this.#controlPoints.length; }

  /**
   * Evaluates the curve at parameter t.
   * @param {number} t - Parameter (0 to 1).
   * @returns {Vec2|Vec3} Point on the curve.
   */
  evaluate(t) {
    t = Math.max(0, Math.min(1, t));
    const span = this.#findSpan(t);
    const basis = this.#basisFunctions(span, t);
    return this.#evaluateCurve(span, basis);
  }

  /**
   * Fast version of evaluate without validation.
   * For internal use only when t is already clamped.
   * @param {number} t - Parameter (0 to 1).
   * @returns {Vec2|Vec3} Point on the curve.
   */
  evaluateFast(t) {
    const span = this.#findSpan(t);
    const basis = this.#basisFunctions(span, t);
    return this.#evaluateCurve(span, basis);
  }

  /**
   * Finds the knot span for parameter t.
   * @param {number} t - Parameter.
   * @returns {number} Span index.
   */
  #findSpan(t) {
    const n = this.#n;
    const p = this.#degree;
    const knots = this.#knots;

    if (t >= knots[n + 1]) return n;
    if (t <= knots[p]) return p;

    let low = p;
    let high = n + 1;
    let mid = Math.floor((low + high) / 2);

    while (t < knots[mid] || t >= knots[mid + 1]) {
      if (t < knots[mid]) {
        high = mid;
      } else {
        low = mid;
      }
      mid = Math.floor((low + high) / 2);
    }

    return mid;
  }

  /**
   * Computes basis functions for a given span.
   * @param {number} span - Span index.
   * @param {number} t - Parameter.
   * @returns {Array<number>} Basis function values.
   */
  #basisFunctions(span, t) {
    const p = this.#degree;
    const knots = this.#knots;
    const N = [1];
    const left = [];
    const right = [];

    for (let j = 1; j <= p; j++) {
      left[j] = t - knots[span + 1 - j];
      right[j] = knots[span + j] - t;
      let saved = 0;

      for (let r = 0; r < j; r++) {
        const temp = N[r] / (right[r + 1] + left[j - r]);
        N[r] = saved + right[r + 1] * temp;
        saved = left[j - r] * temp;
      }
      N[j] = saved;
    }

    return N;
  }

  /**
   * Evaluates the curve using basis functions.
   * @param {number} span - Span index.
   * @param {Array<number>} basis - Basis function values.
   * @returns {Vec2|Vec3} Point on the curve.
   */
  #evaluateCurve(span, basis) {
    const p = this.#degree;
    const start = span - p;
    const result = this.#createZero();

    for (let i = 0; i <= p; i++) {
      const idx = start + i;
      if (idx >= 0 && idx < this.#controlPoints.length) {
        const cp = this.#controlPoints[idx];
        const b = basis[i];
        if (b !== 0) {
          result.add(cp.clone().scale(b));
        }
      }
    }

    return result;
  }

  /**
   * Computes the derivative at parameter t.
   * @param {number} t - Parameter (0 to 1).
   * @returns {Vec2|Vec3} Derivative vector.
   */
  derivative(t) {
    t = Math.max(0, Math.min(1, t));
    const p = this.#degree;

    if (p === 0) return this.#createZero();

    const derivativePoints = [];
    for (let i = 0; i < this.#controlPoints.length - 1; i++) {
      const p1 = this.#controlPoints[i + 1].clone().sub(this.#controlPoints[i]);
      const span = this.#knots[i + p + 1] - this.#knots[i + 1];
      if (Math.abs(span) > 1e-10) {
        derivativePoints.push(p1.scale(p / span));
      } else {
        derivativePoints.push(this.#createZero());
      }
    }

    const derivativeKnots = this.#knots.slice(1, this.#knots.length - 1);
    const derivativeBSpline = new BSpline(derivativePoints, p - 1, derivativeKnots);
    return derivativeBSpline.evaluate(t);
  }

  /**
   * Computes the tangent at parameter t.
   * @param {number} t - Parameter (0 to 1).
   * @returns {Vec2|Vec3} Tangent vector (normalized).
   */
  tangent(t) {
    const d = this.derivative(t);
    const len = d.length;
    if (len < 1e-10) return this.#createZero();
    return d.clone().scale(1 / len);
  }

  /**
   * Inserts a knot into the curve.
   * @param {number} knot - Knot value to insert.
   * @param {number} [multiplicity=1] - Number of times to insert.
   * @returns {BSpline} New B-Spline with inserted knot.
   */
  insertKnot(knot, multiplicity = 1) {
    let result = this;
    for (let k = 0; k < multiplicity; k++) {
      result = result.#insertSingleKnot(knot);
    }
    return result;
  }

  /**
   * Inserts a single knot.
   * @param {number} knot - Knot value to insert.
   * @returns {BSpline} New B-Spline.
   */
  #insertSingleKnot(knot) {
    const p = this.#degree;
    const knots = this.#knots;
    const n = this.#n;

    let span = p;
    while (span < knots.length - 1 && knots[span + 1] <= knot) {
      span++;
    }

    if (span >= knots.length - 1) return this;

    const newControlPoints = [];
    const newKnots = [];

    for (let i = 0; i <= span - p; i++) {
      newControlPoints.push(this.#controlPoints[i].clone());
    }

    const alpha = [];
    for (let i = 0; i < p; i++) {
      const numerator = knot - knots[span - p + 1 + i];
      const denominator = knots[span + 1 + i] - knots[span - p + 1 + i];
      alpha[i] = Math.abs(denominator) < 1e-10 ? 0 : numerator / denominator;
    }

    for (let i = 0; i < p; i++) {
      const idx = span - p + 1 + i;
      const cp1 = this.#controlPoints[idx - 1] || this.#controlPoints[idx];
      const cp2 = this.#controlPoints[idx] || this.#controlPoints[idx - 1];
      const newCp = cp1.clone().scale(1 - alpha[i]).add(cp2.clone().scale(alpha[i]));
      newControlPoints.push(newCp);
    }

    for (let i = span - p + 1; i < this.#controlPoints.length; i++) {
      if (i >= 0 && i < this.#controlPoints.length) {
        newControlPoints.push(this.#controlPoints[i].clone());
      }
    }

    for (let i = 0; i < knots.length; i++) {
      newKnots.push(knots[i]);
      if (i === span) newKnots.push(knot);
    }

    return new BSpline(newControlPoints, p, newKnots);
  }

  /**
   * Converts to a polyline approximation.
   * @param {number} [segments=100] - Number of segments.
   * @returns {Array<Vec2|Vec3>} Array of points.
   */
  toPolyline(segments = 100) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      points.push(this.evaluate(i / segments));
    }
    return points;
  }

  /**
   * Creates a zero vector of the appropriate dimension.
   * @returns {Vec2|Vec3}
   */
  #createZero() {
    return this.#dimension === 2 ? new Vec2(0, 0) : new Vec3(0, 0, 0);
  }

  /**
   * Creates a uniform B-Spline.
   * @param {Array<Vec2|Vec3>} points - Control points.
   * @param {number} [degree=3] - Degree.
   * @returns {BSpline}
   */
  static uniform(points, degree = 3) {
    const n = points.length - 1;
    const m = n + degree + 1;
    const knots = [];
    for (let i = 0; i <= m; i++) {
      knots.push(i / m);
    }
    return new BSpline(points, degree, knots);
  }

  /**
   * Creates a clamped B-Spline.
   * @param {Array<Vec2|Vec3>} points - Control points.
   * @param {number} [degree=3] - Degree.
   * @returns {BSpline}
   */
  static clamped(points, degree = 3) {
    return new BSpline(points, degree);
  }
}

export default BSpline;

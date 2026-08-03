/**
 * @fileoverview Graph algorithms
 * @module Graph
 * @namespace LXRN.Algorithm
 * @memberof LXRN
 * 
 * @description
 * Provides graph data structure and algorithms including BFS, DFS,
 * Dijkstra, and topological sort.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { Graph } from '@lxrn/core';
 * 
 * const g = new Graph();
 * g.addVertex(0);
 * g.addVertex(1);
 * g.addEdge(0, 1);
 * console.log(g.bfs(0)); // [0, 1]
 */

import { Vector } from '../container/Vector.js';
import { Queue } from '../container/Queue.js';
import { Stack } from '../container/Stack.js';
import { Set } from '../container/Set.js';
import { ValidationError } from '../core/Error.js';

/**
 * Graph class - adjacency list representation
 * @class
 */
export class Graph {
  /**
   * Create a new Graph
   * @param {boolean} [directed=false] - Whether graph is directed
   */
  constructor(directed = false) {
    this._directed = directed;
    this._adjacency = new Map();
    this._vertices = new Set();
  }

  /**
   * Add a vertex
   * @param {*} vertex - Vertex value
   * @returns {Graph} This instance for chaining
   */
  addVertex(vertex) {
    if (!this._adjacency.has(vertex)) {
      this._adjacency.set(vertex, new Set());
      this._vertices.add(vertex);
    }
    return this;
  }

  /**
   * Add an edge
   * @param {*} from - Source vertex
   * @param {*} to - Target vertex
   * @param {number} [weight=1] - Edge weight
   * @returns {Graph} This instance for chaining
   */
  addEdge(from, to, weight = 1) {
    if (!this._adjacency.has(from)) {
      this.addVertex(from);
    }
    if (!this._adjacency.has(to)) {
      this.addVertex(to);
    }
    this._adjacency.get(from).add({ vertex: to, weight });
    if (!this._directed) {
      this._adjacency.get(to).add({ vertex: from, weight });
    }
    return this;
  }

  /**
   * Get all vertices
   * @returns {Array} Array of vertices
   */
  getVertices() {
    return [...this._vertices];
  }

  /**
   * Get neighbors of a vertex
   * @param {*} vertex - Vertex
   * @returns {Array} Array of neighbor objects
   */
  getNeighbors(vertex) {
    if (!this._adjacency.has(vertex)) {
      throw new ValidationError('Vertex not found');
    }
    return [...this._adjacency.get(vertex)];
  }

  /**
   * Breadth-First Search
   * @param {*} start - Starting vertex
   * @returns {Array} BFS traversal order
   */
  bfs(start) {
    if (!this._adjacency.has(start)) {
      throw new ValidationError('Start vertex not found');
    }
    const visited = new Set();
    const result = [];
    const queue = new Queue();
    queue.enqueue(start);
    visited.add(start);
    while (!queue.isEmpty()) {
      const vertex = queue.dequeue().get();
      result.push(vertex);
      const neighbors = this.getNeighbors(vertex);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.vertex)) {
          visited.add(neighbor.vertex);
          queue.enqueue(neighbor.vertex);
        }
      }
    }
    return result;
  }

  /**
   * Depth-First Search (iterative)
   * @param {*} start - Starting vertex
   * @returns {Array} DFS traversal order
   */
  dfs(start) {
    if (!this._adjacency.has(start)) {
      throw new ValidationError('Start vertex not found');
    }
    const visited = new Set();
    const result = [];
    const stack = new Stack();
    stack.push(start);
    while (!stack.isEmpty()) {
      const vertex = stack.pop().get();
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        const neighbors = this.getNeighbors(vertex);
        for (const neighbor of neighbors.reverse()) {
          if (!visited.has(neighbor.vertex)) {
            stack.push(neighbor.vertex);
          }
        }
      }
    }
    return result;
  }

  /**
   * Depth-First Search (recursive)
   * @param {*} start - Starting vertex
   * @param {Set} visited - Visited set (internal use)
   * @param {Array} result - Result array (internal use)
   * @returns {Array} DFS traversal order
   */
  dfsRecursive(start, visited = null, result = null) {
    if (visited === null) visited = new Set();
    if (result === null) result = [];
    if (!this._adjacency.has(start)) {
      throw new ValidationError('Start vertex not found');
    }
    visited.add(start);
    result.push(start);
    const neighbors = this.getNeighbors(start);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.vertex)) {
        this.dfsRecursive(neighbor.vertex, visited, result);
      }
    }
    return result;
  }

  /**
   * Dijkstra's shortest path algorithm
   * @param {*} start - Starting vertex
   * @param {*} end - Ending vertex
   * @returns {Object} Path and distance
   */
  dijkstra(start, end) {
    if (!this._adjacency.has(start) || !this._adjacency.has(end)) {
      throw new ValidationError('Start or end vertex not found');
    }
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();
    for (const vertex of this._vertices) {
      distances.set(vertex, Infinity);
      previous.set(vertex, null);
      unvisited.add(vertex);
    }
    distances.set(start, 0);
    while (unvisited.size > 0) {
      let current = null;
      let minDist = Infinity;
      for (const vertex of unvisited) {
        const dist = distances.get(vertex);
        if (dist < minDist) {
          minDist = dist;
          current = vertex;
        }
      }
      if (current === null || current === end) break;
      unvisited.delete(current);
      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        if (unvisited.has(neighbor.vertex)) {
          const alt = distances.get(current) + neighbor.weight;
          if (alt < distances.get(neighbor.vertex)) {
            distances.set(neighbor.vertex, alt);
            previous.set(neighbor.vertex, current);
          }
        }
      }
    }
    const path = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current);
    }
    return { path, distance: distances.get(end) };
  }

  /**
   * Topological sort (Directed Acyclic Graph only)
   * @returns {Array} Topological order
   */
  topologicalSort() {
    if (!this._directed) {
      throw new ValidationError('Topological sort requires a directed graph');
    }
    const inDegree = new Map();
    for (const vertex of this._vertices) {
      inDegree.set(vertex, 0);
    }
    for (const vertex of this._vertices) {
      const neighbors = this.getNeighbors(vertex);
      for (const neighbor of neighbors) {
        inDegree.set(neighbor.vertex, inDegree.get(neighbor.vertex) + 1);
      }
    }
    const queue = new Queue();
    for (const [vertex, degree] of inDegree) {
      if (degree === 0) {
        queue.enqueue(vertex);
      }
    }
    const result = [];
    while (!queue.isEmpty()) {
      const vertex = queue.dequeue().get();
      result.push(vertex);
      const neighbors = this.getNeighbors(vertex);
      for (const neighbor of neighbors) {
        inDegree.set(neighbor.vertex, inDegree.get(neighbor.vertex) - 1);
        if (inDegree.get(neighbor.vertex) === 0) {
          queue.enqueue(neighbor.vertex);
        }
      }
    }
    if (result.length !== this._vertices.size) {
      throw new ValidationError('Graph has a cycle, cannot perform topological sort');
    }
    return result;
  }

  /**
   * Check if graph is connected (undirected graph)
   * @returns {boolean} True if connected
   */
  isConnected() {
    if (this._directed) {
      throw new ValidationError('Connected check is for undirected graphs');
    }
    if (this._vertices.size === 0) return true;
    const start = this._vertices.values().next().value;
    const traversal = this.bfs(start);
    return traversal.length === this._vertices.size;
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString() {
    let str = `Graph (${this._directed ? 'directed' : 'undirected'}):\n`;
    for (const vertex of this._vertices) {
      const neighbors = this.getNeighbors(vertex);
      str += `  ${vertex} -> [`;
      for (const neighbor of neighbors) {
        str += `${neighbor.vertex}(${neighbor.weight}), `;
      }
      str = str.slice(0, -2) + ']\n';
    }
    return str;
  }
}

/**
 * Default export containing Graph class
 * @type {Object}
 */
export default {
  Graph
};

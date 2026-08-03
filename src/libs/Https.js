/**
 * @fileoverview HTTP client
 * @module Http
 * @namespace LXRN.Network
 * @memberof LXRN
 * 
 * @description
 * Provides HTTP client with support for GET, POST, PUT, DELETE,
 * and other HTTP methods with promise-based API.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { http, get, post } from '@lxrn/core';
 * 
 * const response = await get('https://api.example.com/users');
 * console.log(response.data);
 * 
 * const response2 = await post('https://api.example.com/users', { name: 'John' });
 * console.log(response2.data);
 */

import { isString, isObject, isNumber } from '../core/Types.js';
import { NetworkError, ValidationError } from '../core/Error.js';
import { PlatformConfig, getPlatform } from '../config/PlatformConfig.js';

/**
 * HTTP response class
 * @class
 */
export class HttpResponse {
  /**
   * Create a new HttpResponse
   * @param {Object} response - Response object
   */
  constructor(response) {
    this._data = response.data;
    this._status = response.status;
    this._statusText = response.statusText;
    this._headers = response.headers;
    this._config = response.config;
  }

  /**
   * Get response data
   * @returns {*} Response data
   */
  getData() { return this._data; }

  /**
   * Get response status
   * @returns {number} Status code
   */
  getStatus() { return this._status; }

  /**
   * Get response status text
   * @returns {string} Status text
   */
  getStatusText() { return this._statusText; }

  /**
   * Get response headers
   * @returns {Object} Headers
   */
  getHeaders() { return this._headers; }

  /**
   * Check if response is OK (status 200-299)
   * @returns {boolean} True if OK
   */
  isOk() {
    return this._status >= 200 && this._status < 300;
  }

  /**
   * Convert to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      data: this._data,
      status: this._status,
      statusText: this._statusText,
      headers: this._headers
    };
  }
}

/**
 * HTTP request class
 * @class
 */
export class HttpRequest {
  /**
   * Create a new HttpRequest
   * @param {string} url - Request URL
   * @param {Object} [config] - Request configuration
   */
  constructor(url, config = {}) {
    if (!isString(url)) {
      throw new ValidationError('URL must be a string');
    }
    this._url = url;
    this._config = {
      method: 'GET',
      headers: {},
      timeout: 30000,
      withCredentials: false,
      ...config
    };
  }

  /**
   * Set request method
   * @param {string} method - HTTP method
   * @returns {HttpRequest} This instance for chaining
   */
  method(method) {
    this._config.method = method.toUpperCase();
    return this;
  }

  /**
   * Set request headers
   * @param {Object} headers - Headers
   * @returns {HttpRequest} This instance for chaining
   */
  headers(headers) {
    this._config.headers = { ...this._config.headers, ...headers };
    return this;
  }

  /**
   * Set request body
   * @param {*} data - Request body
   * @returns {HttpRequest} This instance for chaining
   */
  body(data) {
    this._config.body = data;
    return this;
  }

  /**
   * Set timeout
   * @param {number} timeout - Timeout in milliseconds
   * @returns {HttpRequest} This instance for chaining
   */
  timeout(timeout) {
    this._config.timeout = timeout;
    return this;
  }

  /**
   * Send the request
   * @returns {Promise<HttpResponse>} Response promise
   */
  send() {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new NetworkError('Request timeout', 408));
      }, this._config.timeout);

      const options = {
        method: this._config.method,
        headers: this._config.headers,
        signal: controller.signal,
        credentials: this._config.withCredentials ? 'include' : 'same-origin'
      };

      if (this._config.body) {
        if (isObject(this._config.body) && !(this._config.body instanceof FormData)) {
          options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
          options.body = JSON.stringify(this._config.body);
        } else {
          options.body = this._config.body;
        }
      }

      fetch(this._url, options)
        .then(async (response) => {
          clearTimeout(timeoutId);
          let data;
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            data = await response.json();
          } else {
            data = await response.text();
          }
          const httpResponse = new HttpResponse({
            data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config: this._config
          });
          if (httpResponse.isOk()) {
            resolve(httpResponse);
          } else {
            reject(new NetworkError(`Request failed with status ${response.status}`, response.status, data));
          }
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          if (error.name === 'AbortError') {
            reject(new NetworkError('Request aborted', 0));
          } else {
            reject(new NetworkError(`Request failed: ${error.message}`, 0));
          }
        });
    });
  }
}

/**
 * Send HTTP GET request
 * @param {string} url - Request URL
 * @param {Object} [config] - Request configuration
 * @returns {Promise<HttpResponse>} Response promise
 */
export function get(url, config = {}) {
  return new HttpRequest(url, { ...config, method: 'GET' }).send();
}

/**
 * Send HTTP POST request
 * @param {string} url - Request URL
 * @param {*} data - Request body
 * @param {Object} [config] - Request configuration
 * @returns {Promise<HttpResponse>} Response promise
 */
export function post(url, data, config = {}) {
  return new HttpRequest(url, { ...config, method: 'POST' }).body(data).send();
}

/**
 * Send HTTP PUT request
 * @param {string} url - Request URL
 * @param {*} data - Request body
 * @param {Object} [config] - Request configuration
 * @returns {Promise<HttpResponse>} Response promise
 */
export function put(url, data, config = {}) {
  return new HttpRequest(url, { ...config, method: 'PUT' }).body(data).send();
}

/**
 * Send HTTP DELETE request
 * @param {string} url - Request URL
 * @param {Object} [config] - Request configuration
 * @returns {Promise<HttpResponse>} Response promise
 */
export function del(url, config = {}) {
  return new HttpRequest(url, { ...config, method: 'DELETE' }).send();
}

/**
 * Send HTTP PATCH request
 * @param {string} url - Request URL
 * @param {*} data - Request body
 * @param {Object} [config] - Request configuration
 * @returns {Promise<HttpResponse>} Response promise
 */
export function patch(url, data, config = {}) {
  return new HttpRequest(url, { ...config, method: 'PATCH' }).body(data).send();
}

/**
 * Create a new HttpRequest instance
 * @param {string} url - Request URL
 * @param {Object} [config] - Request configuration
 * @returns {HttpRequest} HttpRequest instance
 */
export function http(url, config = {}) {
  return new HttpRequest(url, config);
}

/**
 * Default export containing HTTP client
 * @type {Object}
 */
export default {
  HttpResponse,
  HttpRequest,
  get,
  post,
  put,
  del,
  patch,
  http
};

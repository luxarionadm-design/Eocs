/**
 * @fileoverview IndexedDB wrapper
 * @module IndexedDB
 * @namespace LXRN.DB
 * @memberof LXRN
 * 
 * @description
 * Provides a wrapper for IndexedDB with promise-based API,
 * including CRUD operations and transaction support.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { IndexedDB } from '@lxrn/core';
 * 
 * const db = new IndexedDB('myDB', 'users');
 * await db.open();
 * await db.add({ id: 1, name: 'John' });
 * const user = await db.get(1);
 * console.log(user); // { id: 1, name: 'John' }
 */

import { Optional, optional } from '../container/Optional.js';
import { isString, isNumber, isObject } from '../core/Types.js';
import { DatabaseError, ValidationError } from '../core/Error.js';
import { PlatformConfig, getPlatform } from '../config/PlatformConfig.js';

/**
 * IndexedDB wrapper class
 * @class
 */
export class IndexedDB {
  /**
   * Create a new IndexedDB wrapper
   * @param {string} dbName - Database name
   * @param {string} storeName - Store name
   * @param {number} [version=1] - Database version
   */
  constructor(dbName, storeName, version = 1) {
    if (!isString(dbName)) {
      throw new ValidationError('Database name must be a string');
    }
    if (!isString(storeName)) {
      throw new ValidationError('Store name must be a string');
    }
    if (!isNumber(version) || version < 1) {
      throw new ValidationError('Version must be a positive number');
    }
    
    this._dbName = dbName;
    this._storeName = storeName;
    this._version = version;
    this._db = null;
    this._isOpen = false;
  }

  /**
   * Open the database
   * @param {Function} [upgrade] - Upgrade function
   * @returns {Promise<IndexedDB>} This instance
   */
  open(upgrade = null) {
    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(this._dbName, this._version);
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this._storeName)) {
            db.createObjectStore(this._storeName, { keyPath: 'id', autoIncrement: true });
          }
          if (isFunction(upgrade)) {
            upgrade(db);
          }
        };
        
        request.onsuccess = (event) => {
          this._db = event.target.result;
          this._isOpen = true;
          resolve(this);
        };
        
        request.onerror = (event) => {
          reject(new DatabaseError(`Failed to open database: ${event.target.error.message}`));
        };
      } catch (error) {
        reject(new DatabaseError(`Failed to open database: ${error.message}`));
      }
    });
  }

  /**
   * Close the database
   */
  close() {
    if (this._isOpen && this._db) {
      this._db.close();
      this._isOpen = false;
      this._db = null;
    }
  }

  /**
   * Check if database is open
   * @returns {boolean} True if open
   */
  isOpen() {
    return this._isOpen;
  }

  /**
   * Ensure database is open (internal)
   * @private
   */
  _ensureOpen() {
    if (!this._isOpen || !this._db) {
      throw new DatabaseError('Database is not open');
    }
  }

  /**
   * Execute a transaction
   * @param {string} mode - Transaction mode ('readonly' or 'readwrite')
   * @param {Function} callback - Transaction callback
   * @returns {Promise} Promise that resolves when transaction completes
   */
  transaction(mode, callback) {
    this._ensureOpen();
    return new Promise((resolve, reject) => {
      try {
        const tx = this._db.transaction(this._storeName, mode);
        const store = tx.objectStore(this._storeName);
        const result = callback(store);
        tx.oncomplete = () => resolve(result);
        tx.onerror = (event) => reject(new DatabaseError(`Transaction failed: ${event.target.error.message}`));
      } catch (error) {
        reject(new DatabaseError(`Transaction failed: ${error.message}`));
      }
    });
  }

  /**
   * Add a record
   * @param {Object} data - Record data
   * @returns {Promise<number>} Record ID
   */
  add(data) {
    if (!isObject(data)) {
      throw new ValidationError('Data must be an object');
    }
    return this.transaction('readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.add(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new DatabaseError(`Failed to add record: ${request.error.message}`));
      });
    });
  }

  /**
   * Get a record by ID
   * @param {number|string} id - Record ID
   * @returns {Promise<Optional>} Record or empty optional
   */
  get(id) {
    return this.transaction('readonly', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(optional(request.result));
        request.onerror = () => reject(new DatabaseError(`Failed to get record: ${request.error.message}`));
      });
    });
  }

  /**
   * Update a record
   * @param {Object} data - Record data with ID
   * @returns {Promise<number>} Record ID
   */
  put(data) {
    if (!isObject(data)) {
      throw new ValidationError('Data must be an object');
    }
    if (!data.id) {
      throw new ValidationError('Data must have an id property');
    }
    return this.transaction('readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.put(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new DatabaseError(`Failed to update record: ${request.error.message}`));
      });
    });
  }

  /**
   * Delete a record
   * @param {number|string} id - Record ID
   * @returns {Promise<boolean>} True if deleted
   */
  delete(id) {
    return this.transaction('readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(new DatabaseError(`Failed to delete record: ${request.error.message}`));
      });
    });
  }

  /**
   * Get all records
   * @param {number} [limit=0] - Maximum records (0 for all)
   * @param {string} [direction='next'] - Direction ('next', 'prev')
   * @returns {Promise<Array>} Array of records
   */
  getAll(limit = 0, direction = 'next') {
    return this.transaction('readonly', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.openCursor(null, direction);
        const results = [];
        let count = 0;
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor && (limit === 0 || count < limit)) {
            results.push(cursor.value);
            count++;
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        request.onerror = () => reject(new DatabaseError(`Failed to get all records: ${request.error.message}`));
      });
    });
  }

  /**
   * Count total records
   * @returns {Promise<number>} Total records
   */
  count() {
    return this.transaction('readonly', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new DatabaseError(`Failed to count records: ${request.error.message}`));
      });
    });
  }

  /**
   * Clear all records
   * @returns {Promise<boolean>} True if cleared
   */
  clear() {
    return this.transaction('readwrite', (store) => {
      return new Promise((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(new DatabaseError(`Failed to clear records: ${request.error.message}`));
      });
    });
  }

  /**
   * Delete the database
   * @returns {Promise<boolean>} True if deleted
   */
  deleteDatabase() {
    return new Promise((resolve, reject) => {
      try {
        this.close();
        const request = indexedDB.deleteDatabase(this._dbName);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(new DatabaseError(`Failed to delete database: ${request.error.message}`));
      } catch (error) {
        reject(new DatabaseError(`Failed to delete database: ${error.message}`));
      }
    });
  }
}

/**
 * Default export containing IndexedDB class
 * @type {Object}
 */
export default {
  IndexedDB
};

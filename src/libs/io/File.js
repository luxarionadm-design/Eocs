/**
 * @fileoverview File operations
 * @module File
 * @namespace LXRN.IO
 * @memberof LXRN
 * 
 * @description
 * Provides file operations including read, write, append, and delete
 * using Node.js fs module when available, or fallback for browser.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { readFile, writeFile, fileExists } from '@lxrn/core';
 * 
 * writeFile('test.txt', 'Hello World');
 * const content = readFile('test.txt');
 * console.log(content); // 'Hello World'
 */

import { isString } from '../core/Types.js';
import { FileError, ValidationError } from '../core/Error.js';
import { PlatformConfig, getPlatform } from '../config/PlatformConfig.js';

/**
 * Check if file exists
 * @param {string} path - File path
 * @returns {boolean} True if exists
 */
export function fileExists(path) {
  if (!isString(path)) {
    throw new ValidationError('Path must be a string');
  }
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(`file_${path}`) !== null;
    }
    return false;
  } catch (error) {
    throw new FileError(`Failed to check file existence: ${error.message}`, path);
  }
}

/**
 * Read file content
 * @param {string} path - File path
 * @returns {string} File content
 * @throws {FileError} If file not found or read fails
 */
export function readFile(path) {
  if (!isString(path)) {
    throw new ValidationError('Path must be a string');
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const content = localStorage.getItem(`file_${path}`);
      if (content === null) {
        throw new FileError(`File not found: ${path}`, path);
      }
      return content;
    }
    throw new FileError('File system not available in this environment', path);
  } catch (error) {
    if (error instanceof FileError) throw error;
    throw new FileError(`Failed to read file: ${error.message}`, path);
  }
}

/**
 * Write file content
 * @param {string} path - File path
 * @param {string} content - File content
 * @param {string} [mode='w'] - Write mode ('w' for overwrite, 'a' for append)
 * @returns {boolean} True if successful
 */
export function writeFile(path, content, mode = 'w') {
  if (!isString(path)) {
    throw new ValidationError('Path must be a string');
  }
  if (!isString(content)) {
    throw new ValidationError('Content must be a string');
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const existing = localStorage.getItem(`file_${path}`);
      let newContent = content;
      if (mode === 'a' && existing !== null) {
        newContent = existing + content;
      }
      localStorage.setItem(`file_${path}`, newContent);
      return true;
    }
    throw new FileError('File system not available in this environment', path);
  } catch (error) {
    if (error instanceof FileError) throw error;
    throw new FileError(`Failed to write file: ${error.message}`, path);
  }
}

/**
 * Append to file
 * @param {string} path - File path
 * @param {string} content - Content to append
 * @returns {boolean} True if successful
 */
export function appendFile(path, content) {
  return writeFile(path, content, 'a');
}

/**
 * Delete file
 * @param {string} path - File path
 * @returns {boolean} True if successful
 */
export function deleteFile(path) {
  if (!isString(path)) {
    throw new ValidationError('Path must be a string');
  }
  try {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem(`file_${path}`) === null) {
        throw new FileError(`File not found: ${path}`, path);
      }
      localStorage.removeItem(`file_${path}`);
      return true;
    }
    throw new FileError('File system not available in this environment', path);
  } catch (error) {
    if (error instanceof FileError) throw error;
    throw new FileError(`Failed to delete file: ${error.message}`, path);
  }
}

/**
 * Get file size
 * @param {string} path - File path
 * @returns {number} File size in bytes
 */
export function fileSize(path) {
  const content = readFile(path);
  return content.length;
}

/**
 * List all files
 * @returns {Array} Array of file paths
 */
export function listFiles() {
  try {
    if (typeof localStorage !== 'undefined') {
      const files = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('file_')) {
          files.push(key.substring(5));
        }
      }
      return files;
    }
    throw new FileError('File system not available in this environment');
  } catch (error) {
    if (error instanceof FileError) throw error;
    throw new FileError(`Failed to list files: ${error.message}`);
  }
}

/**
 * Default export containing all file operations
 * @type {Object}
 */
export default {
  fileExists,
  readFile,
  writeFile,
  appendFile,
  deleteFile,
  fileSize,
  listFiles
};

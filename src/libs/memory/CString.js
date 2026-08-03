/**
 * @fileoverview C-Style String Operations - Memory and string manipulation for LXRN
 * @module CString
 * @namespace LXRN.Memory
 * @memberof LXRN
 * 
 * @description
 * This module provides C-style string and memory operations including memcpy,
 * memset, memcmp, memmove, and various string functions like strcpy, strcat,
 * strcmp, strchr, and character classification utilities.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { memcpy, strcpy, atoi, isAlpha } from '@lxrn/core';
 * 
 * const src = [1, 2, 3, 4, 5];
 * const dest = new Array(5);
 * memcpy(dest, src, 5);
 * 
 * console.log(atoi('123')); // 123
 * console.log(isAlpha('A')); // true
 */

/**
 * Copy memory from source to destination
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @param {number} n - Number of bytes to copy
 * @returns {Array} Destination buffer
 * @throws {Error} If buffers are invalid or overflow
 */
export function memcpy(dest, src, n) {
  if (!dest || !src) {
    throw new Error('Invalid buffer pointer');
  }
  if (dest.length < n || src.length < n) {
    throw new Error('Buffer overflow in memcpy');
  }
  for (let i = 0; i < n; i++) {
    dest[i] = src[i];
  }
  return dest;
}

/**
 * Set memory to a value
 * @param {Array} dest - Destination buffer
 * @param {*} val - Value to set
 * @param {number} n - Number of bytes to set
 * @returns {Array} Destination buffer
 * @throws {Error} If buffer is invalid or overflow
 */
export function memset(dest, val, n) {
  if (!dest) {
    throw new Error('Invalid buffer pointer');
  }
  if (dest.length < n) {
    throw new Error('Buffer overflow in memset');
  }
  for (let i = 0; i < n; i++) {
    dest[i] = val;
  }
  return dest;
}

/**
 * Compare memory regions
 * @param {Array} s1 - First buffer
 * @param {Array} s2 - Second buffer
 * @param {number} n - Number of bytes to compare
 * @returns {number} Negative if s1 < s2, positive if s1 > s2, 0 if equal
 * @throws {Error} If buffers are invalid
 */
export function memcmp(s1, s2, n) {
  if (!s1 || !s2) {
    throw new Error('Invalid buffer pointer');
  }
  for (let i = 0; i < n; i++) {
    if (s1[i] !== s2[i]) {
      return s1[i] < s2[i] ? -1 : 1;
    }
  }
  return 0;
}

/**
 * Move memory from source to destination (handles overlap)
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @param {number} n - Number of bytes to move
 * @returns {Array} Destination buffer
 * @throws {Error} If buffers are invalid or overflow
 */
export function memmove(dest, src, n) {
  if (!dest || !src) {
    throw new Error('Invalid buffer pointer');
  }
  if (dest.length < n || src.length < n) {
    throw new Error('Buffer overflow in memmove');
  }
  const temp = src.slice(0, n);
  for (let i = 0; i < n; i++) {
    dest[i] = temp[i];
  }
  return dest;
}

/**
 * Find character in memory
 * @param {Array} ptr - Buffer to search
 * @param {*} val - Value to find
 * @param {number} n - Number of bytes to search
 * @returns {number} Index of found character, or -1 if not found
 * @throws {Error} If buffer is invalid
 */
export function memchr(ptr, val, n) {
  if (!ptr) {
    throw new Error('Invalid buffer pointer');
  }
  for (let i = 0; i < n; i++) {
    if (ptr[i] === val) {
      return i;
    }
  }
  return -1;
}

/**
 * Find character in memory (reverse)
 * @param {Array} ptr - Buffer to search
 * @param {*} val - Value to find
 * @param {number} n - Number of bytes to search
 * @returns {number} Index of found character, or -1 if not found
 * @throws {Error} If buffer is invalid
 */
export function memrchr(ptr, val, n) {
  if (!ptr) {
    throw new Error('Invalid buffer pointer');
  }
  for (let i = n - 1; i >= 0; i--) {
    if (ptr[i] === val) {
      return i;
    }
  }
  return -1;
}

/**
 * Copy string from source to destination
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @returns {Array} Destination buffer
 * @throws {Error} If strings are invalid
 */
export function strcpy(dest, src) {
  if (!dest || !src) {
    throw new Error('Invalid string pointer');
  }
  for (let i = 0; i < src.length; i++) {
    dest[i] = src[i];
  }
  return dest;
}

/**
 * Copy limited string from source to destination
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @param {number} n - Maximum number of characters to copy
 * @returns {Array} Destination buffer
 * @throws {Error} If strings are invalid
 */
export function strncpy(dest, src, n) {
  if (!dest || !src) {
    throw new Error('Invalid string pointer');
  }
  const len = Math.min(src.length, n);
  for (let i = 0; i < len; i++) {
    dest[i] = src[i];
  }
  return dest;
}

/**
 * Concatenate strings
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @returns {Array} Destination buffer
 * @throws {Error} If strings are invalid
 */
export function strcat(dest, src) {
  if (!dest || !src) {
    throw new Error('Invalid string pointer');
  }
  const destLen = dest.length;
  for (let i = 0; i < src.length; i++) {
    dest[destLen + i] = src[i];
  }
  return dest;
}

/**
 * Concatenate limited strings
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @param {number} n - Maximum number of characters to concatenate
 * @returns {Array} Destination buffer
 * @throws {Error} If strings are invalid
 */
export function strncat(dest, src, n) {
  if (!dest || !src) {
    throw new Error('Invalid string pointer');
  }
  const destLen = dest.length;
  const len = Math.min(src.length, n);
  for (let i = 0; i < len; i++) {
    dest[destLen + i] = src[i];
  }
  return dest;
}

/**
 * Compare strings
 * @param {Array} s1 - First string
 * @param {Array} s2 - Second string
 * @returns {number} Negative if s1 < s2, positive if s1 > s2, 0 if equal
 * @throws {Error} If strings are invalid
 */
export function strcmp(s1, s2) {
  if (!s1 || !s2) {
    throw new Error('Invalid string pointer');
  }
  if (s1.length !== s2.length) {
    return s1.length < s2.length ? -1 : 1;
  }
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      return s1[i] < s2[i] ? -1 : 1;
    }
  }
  return 0;
}

/**
 * Compare limited strings
 * @param {Array} s1 - First string
 * @param {Array} s2 - Second string
 * @param {number} n - Maximum number of characters to compare
 * @returns {number} Negative if s1 < s2, positive if s1 > s2, 0 if equal
 * @throws {Error} If strings are invalid
 */
export function strncmp(s1, s2, n) {
  if (!s1 || !s2) {
    throw new Error('Invalid string pointer');
  }
  for (let i = 0; i < n; i++) {
    if (s1[i] !== s2[i]) {
      return s1[i] < s2[i] ? -1 : 1;
    }
  }
  return 0;
}

/**
 * Find character in string
 * @param {Array} str - String to search
 * @param {*} ch - Character to find
 * @returns {number} Index of found character, or -1 if not found
 * @throws {Error} If string is invalid
 */
export function strchr(str, ch) {
  if (!str) {
    throw new Error('Invalid string pointer');
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) {
      return i;
    }
  }
  return -1;
}

/**
 * Find character in string (reverse)
 * @param {Array} str - String to search
 * @param {*} ch - Character to find
 * @returns {number} Index of found character, or -1 if not found
 * @throws {Error} If string is invalid
 */
export function strrchr(str, ch) {
  if (!str) {
    throw new Error('Invalid string pointer');
  }
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === ch) {
      return i;
    }
  }
  return -1;
}

/**
 * Get string length
 * @param {Array} str - String
 * @returns {number} Length of string
 * @throws {Error} If string is invalid
 */
export function strlen(str) {
  if (!str) {
    throw new Error('Invalid string pointer');
  }
  return str.length;
}

/**
 * Get span of characters in accept set
 * @param {Array} str - String to check
 * @param {Array} accept - Accept set
 * @returns {number} Length of span
 * @throws {Error} If strings are invalid
 */
export function strspn(str, accept) {
  if (!str || !accept) {
    throw new Error('Invalid string pointer');
  }
  let count = 0;
  const acceptSet = new Set(accept);
  for (let i = 0; i < str.length; i++) {
    if (!acceptSet.has(str[i])) {
      break;
    }
    count++;
  }
  return count;
}

/**
 * Get span of characters not in reject set
 * @param {Array} str - String to check
 * @param {Array} reject - Reject set
 * @returns {number} Length of span
 * @throws {Error} If strings are invalid
 */
export function strcspn(str, reject) {
  if (!str || !reject) {
    throw new Error('Invalid string pointer');
  }
  let count = 0;
  const rejectSet = new Set(reject);
  for (let i = 0; i < str.length; i++) {
    if (rejectSet.has(str[i])) {
      break;
    }
    count++;
  }
  return count;
}

/**
 * Find first character in accept set
 * @param {Array} str - String to search
 * @param {Array} accept - Accept set
 * @returns {number} Index of found character, or -1 if not found
 * @throws {Error} If strings are invalid
 */
export function strpbrk(str, accept) {
  if (!str || !accept) {
    throw new Error('Invalid string pointer');
  }
  const acceptSet = new Set(accept);
  for (let i = 0; i < str.length; i++) {
    if (acceptSet.has(str[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * Find substring in string
 * @param {Array} haystack - String to search
 * @param {Array} needle - Substring to find
 * @returns {number} Index of found substring, or -1 if not found
 * @throws {Error} If strings are invalid
 */
export function strstr(haystack, needle) {
  if (!haystack || !needle) {
    throw new Error('Invalid string pointer');
  }
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let found = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        found = false;
        break;
      }
    }
    if (found) {
      return i;
    }
  }
  return -1;
}

/**
 * Convert ASCII string to integer
 * @param {string} str - String to convert
 * @returns {number} Converted integer
 */
export function atoi(str) {
  if (!str) return 0;
  let result = 0;
  let sign = 1;
  let i = 0;
  while (str[i] === ' ' || str[i] === '\t') i++;
  if (str[i] === '-') { sign = -1; i++; }
  else if (str[i] === '+') { i++; }
  while (i < str.length && str[i] >= '0' && str[i] <= '9') {
    result = result * 10 + (str.charCodeAt(i) - 48);
    i++;
  }
  return sign * result;
}

/**
 * Convert ASCII string to long (alias for atoi)
 * @param {string} str - String to convert
 * @returns {number} Converted integer
 */
export function atol(str) {
  return atoi(str);
}

/**
 * Convert ASCII string to float
 * @param {string} str - String to convert
 * @returns {number} Converted float
 */
export function atof(str) {
  if (!str) return 0;
  return parseFloat(str);
}

/**
 * Convert integer to ASCII string
 * @param {number} value - Value to convert
 * @param {number} [radix=10] - Radix (base)
 * @returns {string} Converted string
 */
export function itoa(value, radix = 10) {
  return value.toString(radix);
}

/**
 * Check if character is alphabetic
 * @param {string} ch - Character to check
 * @returns {boolean} True if alphabetic
 */
export function isAlpha(ch) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

/**
 * Check if character is digit
 * @param {string} ch - Character to check
 * @returns {boolean} True if digit
 */
export function isDigit(ch) {
  return ch >= '0' && ch <= '9';
}

/**
 * Check if character is alphanumeric
 * @param {string} ch - Character to check
 * @returns {boolean} True if alphanumeric
 */
export function isAlNum(ch) {
  return isAlpha(ch) || isDigit(ch);
}

/**
 * Check if character is whitespace
 * @param {string} ch - Character to check
 * @returns {boolean} True if whitespace
 */
export function isSpace(ch) {
  return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || ch === '\v' || ch === '\f';
}

/**
 * Check if character is uppercase
 * @param {string} ch - Character to check
 * @returns {boolean} True if uppercase
 */
export function isUpper(ch) {
  return ch >= 'A' && ch <= 'Z';
}

/**
 * Check if character is lowercase
 * @param {string} ch - Character to check
 * @returns {boolean} True if lowercase
 */
export function isLower(ch) {
  return ch >= 'a' && ch <= 'z';
}

/**
 * Convert character to uppercase
 * @param {string} ch - Character to convert
 * @returns {string} Uppercase character
 */
export function toUpper(ch) {
  return isLower(ch) ? String.fromCharCode(ch.charCodeAt(0) - 32) : ch;
}

/**
 * Convert character to lowercase
 * @param {string} ch - Character to convert
 * @returns {string} Lowercase character
 */
export function toLower(ch) {
  return isUpper(ch) ? String.fromCharCode(ch.charCodeAt(0) + 32) : ch;
}

/**
 * Default export containing all C string utilities
 * @type {Object}
 */
export default {
  memcpy,
  memset,
  memcmp,
  memmove,
  memchr,
  memrchr,
  strcpy,
  strncpy,
  strcat,
  strncat,
  strcmp,
  strncmp,
  strchr,
  strrchr,
  strlen,
  strspn,
  strcspn,
  strpbrk,
  strstr,
  atoi,
  atol,
  atof,
  itoa,
  isAlpha,
  isDigit,
  isAlNum,
  isSpace,
  isUpper,
  isLower,
  toUpper,
  toLower
};

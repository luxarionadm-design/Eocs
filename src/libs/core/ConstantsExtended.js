/**
 * @fileoverview Extended Constants - Colors, HTTP status, permissions, and Unicode
 * @module ConstantsExtended
 * @namespace LXRN.Core
 * @memberof LXRN
 * 
 * @description
 * This module provides extended constant definitions including color values,
 * file permissions, HTTP status codes with messages, and Unicode characters.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { COLORS, HTTP_STATUS, UNICODE } from '@lxrn/core';
 * 
 * console.log(COLORS.RED); // '#FF0000'
 * console.log(HTTP_STATUS.OK); // 200
 * console.log(UNICODE.INFINITY); // '∞'
 */

/**
 * Color constants in hexadecimal format
 * @type {Object}
 */
export const COLORS = {
  TRANSPARENT: 'transparent',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF',
  YELLOW: '#FFFF00',
  CYAN: '#00FFFF',
  MAGENTA: '#FF00FF',
  GRAY: '#808080',
  DARK_GRAY: '#404040',
  LIGHT_GRAY: '#C0C0C0',
  NAVY: '#000080',
  MAROON: '#800000',
  OLIVE: '#808000',
  PURPLE: '#800080',
  TEAL: '#008080',
  SILVER: '#C0C0C0',
  GOLD: '#FFD700',
  ORANGE: '#FFA500',
  PINK: '#FFC0CB',
  BROWN: '#A52A2A',
  BEIGE: '#F5F5DC',
  CORAL: '#FF7F50',
  CRIMSON: '#DC143C',
  INDIGO: '#4B0082',
  LAVENDER: '#E6E6FA',
  LIME: '#00FF00',
  SALMON: '#FA8072',
  TAN: '#D2B48C',
  TURQUOISE: '#40E0D0',
  VIOLET: '#EE82EE',
  WHEAT: '#F5DEB3'
};

/**
 * File permission constants (octal values)
 * @type {Object}
 */
export const PERMISSIONS = {
  READ: 0o4,
  WRITE: 0o2,
  EXECUTE: 0o1,
  READ_WRITE: 0o6,
  READ_EXECUTE: 0o5,
  WRITE_EXECUTE: 0o3,
  ALL: 0o7,
  NONE: 0o0,
  USER_READ: 0o400,
  USER_WRITE: 0o200,
  USER_EXECUTE: 0o100,
  GROUP_READ: 0o040,
  GROUP_WRITE: 0o020,
  GROUP_EXECUTE: 0o010,
  OTHER_READ: 0o004,
  OTHER_WRITE: 0o002,
  OTHER_EXECUTE: 0o001
};

/**
 * HTTP status codes
 * @type {Object}
 */
export const HTTP_STATUS = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLY_HINTS: 103,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFO: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};

/**
 * HTTP status messages
 * @type {Object}
 */
export const HTTP_STATUS_MESSAGES = {
  [HTTP_STATUS.CONTINUE]: 'Continue',
  [HTTP_STATUS.SWITCHING_PROTOCOLS]: 'Switching Protocols',
  [HTTP_STATUS.PROCESSING]: 'Processing',
  [HTTP_STATUS.EARLY_HINTS]: 'Early Hints',
  [HTTP_STATUS.OK]: 'OK',
  [HTTP_STATUS.CREATED]: 'Created',
  [HTTP_STATUS.ACCEPTED]: 'Accepted',
  [HTTP_STATUS.NON_AUTHORITATIVE_INFO]: 'Non-Authoritative Information',
  [HTTP_STATUS.NO_CONTENT]: 'No Content',
  [HTTP_STATUS.RESET_CONTENT]: 'Reset Content',
  [HTTP_STATUS.PARTIAL_CONTENT]: 'Partial Content',
  [HTTP_STATUS.MULTI_STATUS]: 'Multi-Status',
  [HTTP_STATUS.ALREADY_REPORTED]: 'Already Reported',
  [HTTP_STATUS.IM_USED]: 'IM Used',
  [HTTP_STATUS.MULTIPLE_CHOICES]: 'Multiple Choices',
  [HTTP_STATUS.MOVED_PERMANENTLY]: 'Moved Permanently',
  [HTTP_STATUS.FOUND]: 'Found',
  [HTTP_STATUS.SEE_OTHER]: 'See Other',
  [HTTP_STATUS.NOT_MODIFIED]: 'Not Modified',
  [HTTP_STATUS.USE_PROXY]: 'Use Proxy',
  [HTTP_STATUS.TEMPORARY_REDIRECT]: 'Temporary Redirect',
  [HTTP_STATUS.PERMANENT_REDIRECT]: 'Permanent Redirect',
  [HTTP_STATUS.BAD_REQUEST]: 'Bad Request',
  [HTTP_STATUS.UNAUTHORIZED]: 'Unauthorized',
  [HTTP_STATUS.PAYMENT_REQUIRED]: 'Payment Required',
  [HTTP_STATUS.FORBIDDEN]: 'Forbidden',
  [HTTP_STATUS.NOT_FOUND]: 'Not Found',
  [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
  [HTTP_STATUS.NOT_ACCEPTABLE]: 'Not Acceptable',
  [HTTP_STATUS.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy Authentication Required',
  [HTTP_STATUS.REQUEST_TIMEOUT]: 'Request Timeout',
  [HTTP_STATUS.CONFLICT]: 'Conflict',
  [HTTP_STATUS.GONE]: 'Gone',
  [HTTP_STATUS.LENGTH_REQUIRED]: 'Length Required',
  [HTTP_STATUS.PRECONDITION_FAILED]: 'Precondition Failed',
  [HTTP_STATUS.PAYLOAD_TOO_LARGE]: 'Payload Too Large',
  [HTTP_STATUS.URI_TOO_LONG]: 'URI Too Long',
  [HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
  [HTTP_STATUS.RANGE_NOT_SATISFIABLE]: 'Range Not Satisfiable',
  [HTTP_STATUS.EXPECTATION_FAILED]: 'Expectation Failed',
  [HTTP_STATUS.MISDIRECTED_REQUEST]: 'Misdirected Request',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
  [HTTP_STATUS.LOCKED]: 'Locked',
  [HTTP_STATUS.FAILED_DEPENDENCY]: 'Failed Dependency',
  [HTTP_STATUS.TOO_EARLY]: 'Too Early',
  [HTTP_STATUS.UPGRADE_REQUIRED]: 'Upgrade Required',
  [HTTP_STATUS.PRECONDITION_REQUIRED]: 'Precondition Required',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too Many Requests',
  [HTTP_STATUS.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request Header Fields Too Large',
  [HTTP_STATUS.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable For Legal Reasons',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HTTP_STATUS.NOT_IMPLEMENTED]: 'Not Implemented',
  [HTTP_STATUS.BAD_GATEWAY]: 'Bad Gateway',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service Unavailable',
  [HTTP_STATUS.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  [HTTP_STATUS.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP Version Not Supported',
  [HTTP_STATUS.VARIANT_ALSO_NEGOTIATES]: 'Variant Also Negotiates',
  [HTTP_STATUS.INSUFFICIENT_STORAGE]: 'Insufficient Storage',
  [HTTP_STATUS.LOOP_DETECTED]: 'Loop Detected',
  [HTTP_STATUS.NOT_EXTENDED]: 'Not Extended',
  [HTTP_STATUS.NETWORK_AUTHENTICATION_REQUIRED]: 'Network Authentication Required'
};

/**
 * Unicode character constants
 * @type {Object}
 */
export const UNICODE = {
  SPACE: ' ',
  NBSP: '\u00A0',
  EN_SPACE: '\u2002',
  EM_SPACE: '\u2003',
  THIN_SPACE: '\u2009',
  ZERO_WIDTH_SPACE: '\u200B',
  ZERO_WIDTH_JOINER: '\u200D',
  LEFT_TO_RIGHT_MARK: '\u200E',
  RIGHT_TO_LEFT_MARK: '\u200F',
  SOFT_HYPHEN: '\u00AD',
  HORIZONTAL_ELLIPSIS: '\u2026',
  BULLET: '\u2022',
  MIDDLE_DOT: '\u00B7',
  COPYRIGHT: '\u00A9',
  REGISTERED: '\u00AE',
  TRADEMARK: '\u2122',
  DEGREE: '\u00B0',
  PLUS_MINUS: '\u00B1',
  TIMES: '\u00D7',
  DIVIDE: '\u00F7',
  INFINITY: '\u221E',
  INTEGRAL: '\u222B',
  SUM: '\u2211',
  PRODUCT: '\u220F',
  SQRT: '\u221A',
  PI_SYMBOL: '\u03C0',
  ALPHA: '\u03B1',
  BETA: '\u03B2',
  GAMMA: '\u03B3',
  DELTA: '\u03B4',
  EPSILON: '\u03B5',
  ZETA: '\u03B6',
  ETA: '\u03B7',
  THETA: '\u03B8',
  IOTA: '\u03B9',
  KAPPA: '\u03BA',
  LAMBDA: '\u03BB',
  MU: '\u03BC',
  NU: '\u03BD',
  XI: '\u03BE',
  OMICRON: '\u03BF',
  PI_LOWERCASE: '\u03C0',
  RHO: '\u03C1',
  SIGMA: '\u03C3',
  TAU: '\u03C4',
  UPSILON: '\u03C5',
  PHI: '\u03C6',
  CHI: '\u03C7',
  PSI: '\u03C8',
  OMEGA: '\u03C9'
};

/**
 * Default export containing all extended constants
 * @type {Object}
 */
export default {
  COLORS,
  PERMISSIONS,
  HTTP_STATUS,
  HTTP_STATUS_MESSAGES,
  UNICODE
};

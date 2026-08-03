/**
 * @fileoverview Mathematical and Physical Constants - Comprehensive constants for LXRN
 * @module Constants
 * @namespace LXRN.Core
 * @memberof LXRN
 * 
 * @description
 * This module provides a comprehensive collection of mathematical, physical,
 * astronomical, computing, and unit conversion constants. Includes metadata
 * and lookup functions for constant values.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { PI, SPEED_OF_LIGHT, KIBIBYTE, getConstant } from '@lxrn/core';
 * 
 * console.log(PI); // 3.141592653589793
 * console.log(SPEED_OF_LIGHT); // 299792458
 * console.log(KIBIBYTE); // 1024
 * console.log(getConstant('EARTH_MASS')); // 5.97237e24
 */

/**
 * Mathematical constant PI
 * @type {number}
 */
export const PI = Math.PI;

/**
 * Mathematical constant TAU (2 * PI)
 * @type {number}
 */
export const TAU = 2 * Math.PI;

/**
 * Euler's number
 * @type {number}
 */
export const E = Math.E;

/**
 * Golden ratio
 * @type {number}
 */
export const PHI = 1.618033988749895;

/**
 * Square root of 2
 * @type {number}
 */
export const SQRT2 = Math.SQRT2;

/**
 * Square root of 3
 * @type {number}
 */
export const SQRT3 = 1.7320508075688772;

/**
 * Square root of 5
 * @type {number}
 */
export const SQRT5 = 2.23606797749979;

/**
 * Natural logarithm of 2
 * @type {number}
 */
export const LN2 = Math.LN2;

/**
 * Natural logarithm of 10
 * @type {number}
 */
export const LN10 = Math.LN10;

/**
 * Base-2 logarithm of E
 * @type {number}
 */
export const LOG2E = Math.LOG2E;

/**
 * Base-10 logarithm of E
 * @type {number}
 */
export const LOG10E = Math.LOG10E;

/**
 * Machine epsilon
 * @type {number}
 */
export const EPSILON = Number.EPSILON;

/**
 * Positive infinity
 * @type {number}
 */
export const INFINITY = Number.POSITIVE_INFINITY;

/**
 * Negative infinity
 * @type {number}
 */
export const NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;

/**
 * Not a number constant
 * @type {number}
 */
export const NaN = Number.NaN;

/**
 * Speed of light in vacuum (m/s)
 * @type {number}
 */
export const SPEED_OF_LIGHT = 299792458;

/**
 * Planck constant (J·s)
 * @type {number}
 */
export const PLANCK_CONSTANT = 6.62607015e-34;

/**
 * Reduced Planck constant (J·s)
 * @type {number}
 */
export const REDUCED_PLANCK = 1.054571817e-34;

/**
 * Gravitational constant (m³·kg⁻¹·s⁻²)
 * @type {number}
 */
export const GRAVITATIONAL_CONSTANT = 6.67430e-11;

/**
 * Electron mass (kg)
 * @type {number}
 */
export const ELECTRON_MASS = 9.1093837015e-31;

/**
 * Proton mass (kg)
 * @type {number}
 */
export const PROTON_MASS = 1.67262192369e-27;

/**
 * Neutron mass (kg)
 * @type {number}
 */
export const NEUTRON_MASS = 1.67492749804e-27;

/**
 * Elementary charge (C)
 * @type {number}
 */
export const ELEMENTARY_CHARGE = 1.602176634e-19;

/**
 * Boltzmann constant (J/K)
 * @type {number}
 */
export const BOLTZMANN_CONSTANT = 1.380649e-23;

/**
 * Avogadro constant (mol⁻¹)
 * @type {number}
 */
export const AVOGADRO_CONSTANT = 6.02214076e23;

/**
 * Gas constant (J/(mol·K))
 * @type {number}
 */
export const GAS_CONSTANT = 8.314462618;

/**
 * Standard gravity (m/s²)
 * @type {number}
 */
export const STANDARD_GRAVITY = 9.80665;

/**
 * Standard atmosphere (Pa)
 * @type {number}
 */
export const ATMOSPHERE = 101325;

/**
 * Astronomical unit (m)
 * @type {number}
 */
export const ASTRONOMICAL_UNIT = 149597870700;

/**
 * Parsec (m)
 * @type {number}
 */
export const PARSEC = 3.085677581e16;

/**
 * Light year (m)
 * @type {number}
 */
export const LIGHT_YEAR = 9.4607304725808e15;

/**
 * Solar mass (kg)
 * @type {number}
 */
export const SOLAR_MASS = 1.98847e30;

/**
 * Solar radius (m)
 * @type {number}
 */
export const SOLAR_RADIUS = 6.957e8;

/**
 * Earth mass (kg)
 * @type {number}
 */
export const EARTH_MASS = 5.97237e24;

/**
 * Earth radius (m)
 * @type {number}
 */
export const EARTH_RADIUS = 6.371e6;

/**
 * Earth orbit period (days)
 * @type {number}
 */
export const EARTH_ORBIT_PERIOD = 365.256363004;

/**
 * Earth orbit radius (m)
 * @type {number}
 */
export const EARTH_ORBIT_RADIUS = 1.495978707e11;

/**
 * Moon mass (kg)
 * @type {number}
 */
export const MOON_MASS = 7.342e22;

/**
 * Moon radius (m)
 * @type {number}
 */
export const MOON_RADIUS = 1.7374e6;

/**
 * Atomic mass unit (kg)
 * @type {number}
 */
export const ATOMIC_MASS_UNIT = 1.66053906660e-27;

/**
 * Faraday constant (C/mol)
 * @type {number}
 */
export const FARADAY_CONSTANT = 96485.33212;

/**
 * Planck mass (kg)
 * @type {number}
 */
export const PLANCK_MASS = 2.176434e-8;

/**
 * Planck length (m)
 * @type {number}
 */
export const PLANCK_LENGTH = 1.616255e-35;

/**
 * Planck time (s)
 * @type {number}
 */
export const PLANCK_TIME = 5.391247e-44;

/**
 * Planck temperature (K)
 * @type {number}
 */
export const PLANCK_TEMPERATURE = 1.416784e32;

/**
 * Kibibyte (1024 bytes)
 * @type {number}
 */
export const KIBIBYTE = 1024;

/**
 * Mebibyte (1024^2 bytes)
 * @type {number}
 */
export const MEBIBYTE = 1048576;

/**
 * Gibibyte (1024^3 bytes)
 * @type {number}
 */
export const GIBIBYTE = 1073741824;

/**
 * Tebibyte (1024^4 bytes)
 * @type {number}
 */
export const TEBIBYTE = 1099511627776;

/**
 * Kilobyte (1000 bytes)
 * @type {number}
 */
export const KILOBYTE = 1000;

/**
 * Megabyte (1000^2 bytes)
 * @type {number}
 */
export const MEGABYTE = 1000000;

/**
 * Gigabyte (1000^3 bytes)
 * @type {number}
 */
export const GIGABYTE = 1000000000;

/**
 * Terabyte (1000^4 bytes)
 * @type {number}
 */
export const TERABYTE = 1000000000000;

/**
 * Bit size
 * @type {number}
 */
export const BIT = 1;

/**
 * Byte size (8 bits)
 * @type {number}
 */
export const BYTE = 8;

/**
 * Word size (16 bits)
 * @type {number}
 */
export const WORD = 16;

/**
 * DWORD size (32 bits)
 * @type {number}
 */
export const DWORD = 32;

/**
 * QWORD size (64 bits)
 * @type {number}
 */
export const QWORD = 64;

/**
 * Second in seconds
 * @type {number}
 */
export const SECOND = 1;

/**
 * Minute in seconds
 * @type {number}
 */
export const MINUTE = 60;

/**
 * Hour in seconds
 * @type {number}
 */
export const HOUR = 3600;

/**
 * Day in seconds
 * @type {number}
 */
export const DAY = 86400;

/**
 * Week in seconds
 * @type {number}
 */
export const WEEK = 604800;

/**
 * Year in seconds (365 days)
 * @type {number}
 */
export const YEAR = 31536000;

/**
 * Leap year in seconds (366 days)
 * @type {number}
 */
export const LEAP_YEAR = 31622400;

/**
 * Degrees to radians conversion factor
 * @type {number}
 */
export const DEG2RAD = PI / 180;

/**
 * Radians to degrees conversion factor
 * @type {number}
 */
export const RAD2DEG = 180 / PI;

/**
 * Gradians to radians conversion factor
 * @type {number}
 */
export const GRAD2RAD = PI / 200;

/**
 * Radians to gradians conversion factor
 * @type {number}
 */
export const RAD2GRAD = 200 / PI;

/**
 * Database of constant values with metadata
 * @type {Object}
 */
export const CONSTANTS = {
  PI: { value: PI, description: 'Ratio of circumference to diameter', category: 'Math' },
  TAU: { value: TAU, description: 'Ratio of circumference to radius', category: 'Math' },
  E: { value: E, description: "Euler's number", category: 'Math' },
  PHI: { value: PHI, description: 'Golden ratio', category: 'Math' },
  SPEED_OF_LIGHT: { value: SPEED_OF_LIGHT, description: 'Speed of light in vacuum', category: 'Physics' },
  PLANCK_CONSTANT: { value: PLANCK_CONSTANT, description: 'Planck constant', category: 'Physics' },
  GRAVITATIONAL_CONSTANT: { value: GRAVITATIONAL_CONSTANT, description: 'Gravitational constant', category: 'Physics' },
  EARTH_MASS: { value: EARTH_MASS, description: 'Mass of Earth', category: 'Astronomy' },
  EARTH_RADIUS: { value: EARTH_RADIUS, description: 'Radius of Earth', category: 'Astronomy' },
  AVOGADRO_CONSTANT: { value: AVOGADRO_CONSTANT, description: 'Avogadro constant', category: 'Chemistry' },
  KIBIBYTE: { value: KIBIBYTE, description: '1024 bytes', category: 'Computing' },
  DAY: { value: DAY, description: 'Seconds in a day', category: 'Time' },
  DEG2RAD: { value: DEG2RAD, description: 'Degrees to radians', category: 'Angle' }
};

/**
 * Get a constant value by name
 * @param {string} name - Constant name
 * @returns {*} Constant value or undefined
 */
export function getConstant(name) {
  return CONSTANTS[name] ? CONSTANTS[name].value : undefined;
}

/**
 * Get constant information by name
 * @param {string} name - Constant name
 * @returns {Object|null} Constant info or null
 */
export function getConstantInfo(name) {
  return CONSTANTS[name] || null;
}

/**
 * Get all constants
 * @returns {Object} All constants with metadata
 */
export function getAllConstants() {
  return { ...CONSTANTS };
}

/**
 * Get constants by category
 * @param {string} category - Category name
 * @returns {Object} Constants in the category
 */
export function getConstantsByCategory(category) {
  const result = {};
  for (const [key, value] of Object.entries(CONSTANTS)) {
    if (value.category === category) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Default export containing all constants
 * @type {Object}
 */
export default {
  PI,
  TAU,
  E,
  PHI,
  SQRT2,
  SQRT3,
  SQRT5,
  LN2,
  LN10,
  LOG2E,
  LOG10E,
  EPSILON,
  INFINITY,
  NEGATIVE_INFINITY,
  NaN,
  SPEED_OF_LIGHT,
  PLANCK_CONSTANT,
  REDUCED_PLANCK,
  GRAVITATIONAL_CONSTANT,
  ELECTRON_MASS,
  PROTON_MASS,
  NEUTRON_MASS,
  ELEMENTARY_CHARGE,
  BOLTZMANN_CONSTANT,
  AVOGADRO_CONSTANT,
  GAS_CONSTANT,
  STANDARD_GRAVITY,
  ATMOSPHERE,
  ASTRONOMICAL_UNIT,
  PARSEC,
  LIGHT_YEAR,
  SOLAR_MASS,
  SOLAR_RADIUS,
  EARTH_MASS,
  EARTH_RADIUS,
  EARTH_ORBIT_PERIOD,
  EARTH_ORBIT_RADIUS,
  MOON_MASS,
  MOON_RADIUS,
  ATOMIC_MASS_UNIT,
  FARADAY_CONSTANT,
  PLANCK_MASS,
  PLANCK_LENGTH,
  PLANCK_TIME,
  PLANCK_TEMPERATURE,
  KIBIBYTE,
  MEBIBYTE,
  GIBIBYTE,
  TEBIBYTE,
  KILOBYTE,
  MEGABYTE,
  GIGABYTE,
  TERABYTE,
  BIT,
  BYTE,
  WORD,
  DWORD,
  QWORD,
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
  YEAR,
  LEAP_YEAR,
  DEG2RAD,
  RAD2DEG,
  GRAD2RAD,
  RAD2GRAD,
  getConstant,
  getConstantInfo,
  getAllConstants,
  getConstantsByCategory
};

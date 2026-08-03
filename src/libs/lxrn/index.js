/**
 * @fileoverview LXRN Module Entry Point - Re-exports LXRN namespace
 * @module lxrn
 * @namespace LXRN
 * @memberof LXRN
 * 
 * @description
 * This is the entry point for the LXRN module. It re-exports the main LXRN
 * namespace containing all learning experience management functionality.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import LXRN from '@lxrn/core/lxrn';
 * 
 * const learning = new LXRN.LearningExperience({
 *   title: 'My Learning'
 * });
 */

import LXRN from './LXRN.js';

export { LXRN };
export default LXRN;

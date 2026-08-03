/**
 * Standard Definitions for LXRN
 * @namespace LXRN.Core
 */
export const StdDef = {
  /**
   * Size_t type - represents size of objects in bytes
   * @type {Function}
   */
  size_t: Number,
  
  /**
   * Nullptr_t type - represents null pointer
   * @type {null}
   */
  nullptr_t: null,
  
  /**
   * Wchar_t type - represents wide character
   * @type {Function}
   */
  wchar_t: String,
  
  /**
   * Exit success code
   * @type {number}
   */
  EXIT_SUCCESS: 0,
  
  /**
   * Exit failure code
   * @type {number}
   */
  EXIT_FAILURE: 1
};

// Named exports
export const { 
  size_t, 
  ptrdiff_t, 
  nullptr_t, 
  wchar_t,
  char16_t,
  char32_t,
  SizeT,
  PtrdiffT,
  NullptrT,
  WcharT,
  max_align_t,
  byte,
  NULL,
  nullptr,
  EXIT_SUCCESS,
  EXIT_FAILURE 
} = StdDef;

export default StdDef;

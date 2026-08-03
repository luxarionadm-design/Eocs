// stddef.ts
/**
 * @fileoverview Standard Definitions for LXRN
 * @module StdDef
 * @namespace LXRN.Core
 */

export type size_t = number;
export type ptrdiff_t = number;
export type nullptr_t = null;
export type wchar_t = string;
export type char16_t = string;
export type char32_t = string;

export const size_t: size_t = Number as any;
export const ptrdiff_t: ptrdiff_t = Number as any;
export const nullptr_t: nullptr_t = null;
export const wchar_t: wchar_t = String as any;
export const char16_t: char16_t = String as any;
export const char32_t: char32_t = String as any;

export const SizeT = size_t;
export const PtrdiffT = ptrdiff_t;
export const NullptrT = nullptr_t;
export const WcharT = wchar_t;

export const max_align_t = Number;
export const byte = Number;
export const NULL = null;
export const nullptr = null;
export const EXIT_SUCCESS = 0;
export const EXIT_FAILURE = 1;

export default {
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
};

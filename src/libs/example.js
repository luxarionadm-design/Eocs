/**
 * @fileoverview Complete Usage Example - Demonstrates all LXRN modules
 * @module example
 * @namespace LXRN.Example
 * @memberof LXRN
 * 
 * @description
 * This file provides a complete usage example for all LXRN modules,
 * demonstrating how to use core types, constants, math utilities,
 * containers, smart pointers, and the LXRN learning system together.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * node src/libs/example.js
 */

import {
  StdDef,
  StdInt,
  Types,
  Constants,
  ConstantsExtended,
  LXRN,
  MathUtils,
  BitUtils,
  CString,
  MemoryUtils,
  Pair,
  Tuple,
  Optional,
  Range,
  StringView,
  UniquePtr,
  SharedPtr,
  TypeTraits,
  Utility,
  HashUtils,
  PlatformConfig,
  ErrorList
} from './index.js';

console.log('=== LXRN Standard Library Complete Example ===\n');

console.log('1. Core Types (StdDef, StdInt, Types):');
console.log(`  size_t: ${StdDef.size_t}`);
console.log(`  nullptr_t: ${StdDef.nullptr_t}`);
console.log(`  INT32_MAX: ${StdInt.INT32_MAX}`);
console.log(`  isNumber(42): ${Types.isNumber(42)}`);
console.log(`  isString('hello'): ${Types.isString('hello')}`);
console.log(`  typeName(42): ${Types.typeName(42)}\n`);

console.log('2. Constants (Constants, ConstantsExtended):');
console.log(`  Constants.PI: ${Constants.PI}`);
console.log(`  Constants.SPEED_OF_LIGHT: ${Constants.SPEED_OF_LIGHT} m/s`);
console.log(`  Constants.EARTH_MASS: ${Constants.EARTH_MASS} kg`);
console.log(`  Constants.DAY: ${Constants.DAY} seconds`);
console.log(`  Constants.KIBIBYTE: ${Constants.KIBIBYTE} bytes`);
console.log(`  getConstant('PI'): ${Constants.getConstant('PI')}`);
console.log(`  getConstantInfo('PI'):`, Constants.getConstantInfo('PI'));
console.log(`  COLORS.RED: ${ConstantsExtended.COLORS.RED}`);
console.log(`  HTTP_STATUS.OK: ${ConstantsExtended.HTTP_STATUS.OK}`);
console.log(`  UNICODE.INFINITY: ${ConstantsExtended.UNICODE.INFINITY}\n`);

console.log('3. MathUtils:');
console.log(`  MathUtils.PI: ${MathUtils.PI}`);
console.log(`  clamp(15, 0, 10): ${MathUtils.clamp(15, 0, 10)}`);
console.log(`  gcd(48, 18): ${MathUtils.gcd(48, 18)}`);
console.log(`  lcm(4, 6): ${MathUtils.lcm(4, 6)}`);
console.log(`  factorial(5): ${MathUtils.factorial(5)}`);
console.log(`  isPrime(17): ${MathUtils.isPrime(17)}`);
console.log(`  average(1,2,3,4,5): ${MathUtils.average(1,2,3,4,5)}`);
console.log(`  stddev(1,2,3,4,5): ${MathUtils.stddev(1,2,3,4,5)}\n`);

console.log('4. BitUtils:');
console.log(`  bswap16(0x1234): 0x${BitUtils.bswap16(0x1234).toString(16)}`);
console.log(`  isPowerOfTwo(16): ${BitUtils.isPowerOfTwo(16)}`);
console.log(`  nextPowerOfTwo(5): ${BitUtils.nextPowerOfTwo(5)}`);
console.log(`  alignUp(7, 4): ${BitUtils.alignUp(7, 4)}`);
console.log(`  isLittleEndian(): ${BitUtils.isLittleEndian()}`);
console.log(`  rotateLeft(0x12345678, 4): 0x${BitUtils.rotateLeft(0x12345678, 4).toString(16)}\n`);

console.log('5. Memory (CString, MemoryUtils):');
const src = [1, 2, 3, 4, 5];
const dest = new Array(5);
CString.memcpy(dest, src, 5);
console.log(`  memcpy: ${JSON.stringify(src)} -> ${JSON.stringify(dest)}`);
console.log(`  atoi('123'): ${CString.atoi('123')}`);
console.log(`  isAlpha('A'): ${CString.isAlpha('A')}`);
console.log(`  toUpper('a'): ${CString.toUpper('a')}`);
console.log(`  isDigit('5'): ${CString.isDigit('5')}`);
const mem = MemoryUtils.allocate(10);
console.log(`  allocate(10): ${mem.length}`);
MemoryUtils.memorySet(mem, 5, 10);
console.log(`  memorySet: ${JSON.stringify(mem)}`);
const mem2 = MemoryUtils.reallocate(mem, 20);
console.log(`  reallocate to 20: ${mem2.length}`);
MemoryUtils.free(mem2);
console.log(`  free: done\n`);

console.log('6. Containers (Pair, Tuple, Optional, Range, StringView):');
const p = new Pair.Pair(10, 20);
console.log(`  Pair: ${p.toString()}`);
p.setFirst(30);
p.setSecond(40);
console.log(`  After set: ${p.toString()}`);
console.log(`  equals(new Pair(30, 40)): ${p.equals(new Pair(30, 40))}`);

const t = new Tuple.Tuple(1, 'hello', true, 42);
console.log(`  Tuple: ${t.toString()}`);
console.log(`  size: ${t.size()}`);
console.log(`  get(1): ${t.get(1)}`);
console.log(`  mapped: ${t.map(x => typeof x === 'number' ? x * 2 : x).toString()}`);

const opt = new Optional.Optional(42);
console.log(`  Optional: ${opt.toString()}`);
console.log(`  hasValue: ${opt.hasValue()}`);
console.log(`  getOr(0): ${opt.getOr(0)}`);
const mapped = opt.map(x => x * 2);
console.log(`  map: ${mapped.toString()}`);
const emptyOpt = new Optional.Optional();
console.log(`  empty: ${emptyOpt.toString()}`);
console.log(`  empty getOr(0): ${emptyOpt.getOr(0)}`);

const r = new Range.Range(0, 10, 2);
console.log(`  Range: ${r.toString()}`);
console.log(`  toArray: ${r.toArray()}`);
console.log(`  size: ${r.size()}`);
console.log(`  includes(4): ${r.includes(4)}`);
console.log(`  filter: ${r.filter(x => x % 4 === 0).toArray()}`);

const sv = new StringView.StringView('Hello World', 0, 5);
console.log(`  StringView: ${sv.toString()}`);
console.log(`  length: ${sv.length()}`);
console.log(`  charAt(2): ${sv.charAt(2)}`);
console.log(`  find('ll'): ${sv.find('ll')}`);
console.log(`  startsWith('He'): ${sv.startsWith('He')}`);
console.log(`  toUpperCase: ${sv.toUpperCase().toString()}\n`);

console.log('7. Smart Pointers (UniquePtr, SharedPtr):');
const up = new UniquePtr.UniquePtr(42);
console.log(`  UniquePtr: ${up.toString()}`);
console.log(`  get: ${up.get()}`);
up.reset(100);
console.log(`  after reset: ${up.get()}`);
up.release();
console.log(`  after release: ${up.get()}`);

const sp = new SharedPtr.SharedPtr(42);
console.log(`  SharedPtr: ${sp.toString()}`);
console.log(`  useCount: ${sp.useCount()}`);
console.log(`  unique: ${sp.unique()}\n`);

console.log('8. TypeTraits:');
console.log(`  isIntegral(Number): ${TypeTraits.isIntegral(Number)}`);
console.log(`  isFloatingPoint(Number): ${TypeTraits.isFloatingPoint(Number)}`);
console.log(`  isArray([]): ${TypeTraits.isArray([])}`);
console.log(`  isFunction(() => {}): ${TypeTraits.isFunction(() => {})}`);
console.log(`  isClass(Number): ${TypeTraits.isClass(Number)}`);
console.log(`  isConstructible(Array): ${TypeTraits.isConstructible(Array)}`);
console.log(`  isSame(Number, Number): ${TypeTraits.isSame(Number, Number)}\n`);

console.log('9. Utility & HashUtils:');
console.log(`  swap(1, 2): ${Utility.swap(1, 2)}`);
console.log(`  pair(10, 20): ${Utility.pair(10, 20)}`);
console.log(`  inRange(5, 0, 10): ${Utility.inRange(5, 0, 10)}`);
console.log(`  xor(true, false): ${Utility.xor(true, false)}`);
console.log(`  hash('hello'): ${HashUtils.hash('hello')}`);
console.log(`  hashCombine(1,2,3): ${HashUtils.hashCombine(1,2,3)}`);
console.log(`  murmurHash3('hello'): ${HashUtils.murmurHash3('hello')}`);
console.log(`  fnv1a('hello'): ${HashUtils.fnv1a('hello')}\n`);

console.log('10. PlatformConfig & ErrorList:');
console.log(`  Platform: ${PlatformConfig.platform}`);
console.log(`  Debug: ${PlatformConfig.debug}`);
console.log(`  isDebug(): ${PlatformConfig.isDebug()}`);
console.log(`  isRelease(): ${PlatformConfig.isRelease()}`);
console.log(`  getBuildType(): ${PlatformConfig.getBuildType()}`);
console.log(`  hasFeature('constexpr'): ${PlatformConfig.hasFeature('constexpr')}`);
console.log(`  SUCCESS: ${ErrorList.SUCCESS}`);
console.log(`  MEMORY_ERROR: ${ErrorList.MEMORY_ERROR}`);
console.log(`  getErrorMessage(2): ${ErrorList.getErrorMessage(2)}`);
console.log(`  getErrorName(2): ${ErrorList.getErrorName(2)}`);
console.log(`  isSuccess(0): ${ErrorList.isSuccess(0)}\n`);

console.log('11. LXRN - Learning Experience Reference Number:');
console.log(`  LXRN.VERSION: ${LXRN.VERSION}`);
console.log(`  LXRN.Categories:`, Object.keys(LXRN.Categories));
console.log(`  LXRN.Levels:`, Object.keys(LXRN.Levels));
console.log(`  LXRN.Status:`, Object.keys(LXRN.Status));
console.log(`  LXRN.Types:`, Object.keys(LXRN.Types));

const learning = new LXRN.LearningExperience({
  category: LXRN.Categories.MATH,
  level: LXRN.Levels.INTERMEDIATE,
  type: LXRN.Types.CONCEPT,
  title: 'Calculus Fundamentals',
  description: 'Understanding limits, derivatives, and integrals',
  duration: 120,
  tags: ['calculus', 'math', 'derivatives'],
  learningOutcomes: [
    'Understand limits and continuity',
    'Calculate derivatives',
    'Solve integrals'
  ],
  author: 'Dr. Math',
  difficulty: 7
});

console.log(`  Learning ID: ${learning.getId()}`);
console.log(`  Title: ${learning.getTitle()}`);
console.log(`  Status: ${learning.getStatus()} - ${LXRN.Utils.getStatusName(learning.getStatus())}`);
console.log(`  Progress: ${LXRN.Utils.formatProgress(learning.getProgress())}`);
console.log(`  Duration: ${LXRN.Utils.formatDuration(learning.getDuration())}`);
console.log(`  Difficulty: ${learning.getDifficulty()}/10`);
console.log(`  Author: ${learning.getAuthor()}`);

learning.setProgress(0.5);
learning.addTag('advanced');
console.log(`  After update - Progress: ${LXRN.Utils.formatProgress(learning.getProgress())}`);
console.log(`  Tags: ${learning.getTags().join(', ')}`);

const collection = new LXRN.Collection();
collection.add(learning);

const project = LXRN.Factory.createProject(
  'Machine Learning Project',
  'Build a neural network from scratch',
  {
    category: LXRN.Categories.COMPUTER,
    level: LXRN.Levels.ADVANCED,
    duration: 300,
    tags: ['machine learning', 'neural networks'],
    author: 'Dr. AI'
  }
);
collection.add(project);

console.log(`  Collection count: ${collection.count()}`);
console.log(`  Collection stats:`, collection.getStats());

const path = LXRN.Path.create(
  [learning.getId(), project.getId()],
  'Math to AI Path',
  'Learning path from calculus to AI'
);
console.log(`  Path: ${path.name} (${path.experiences.length} experiences)`);
console.log(`  Path ID: ${path.id}`);

console.log('\n=== Example Complete ===');

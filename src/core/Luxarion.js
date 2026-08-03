import { HybridTypedArray } from './HybridTypedArray.js';
import { FlexibleTypedArray } from './FlexibleTypedArray.js';
import { OptimizedTypedArray } from './OptimizedTypedArray.js';
import { ConfigDefaults } from '../constants/config.js';
import { StatusValues } from '../constants/status.js';
import { ErrorCodes } from '../constants/errors.js';
import { Messages } from '../constants/messages.js';
import { helpers } from '../utils/helpers.js';
import { converters } from '../utils/converters.js';
import { generators } from '../utils/generators.js';
import { formatters } from '../utils/formatters.js';
import { EmailValidator } from '../validators/EmailValidator.js';
import { URLValidator } from '../validators/URLValidator.js';
import { PhoneValidator } from '../validators/PhoneValidator.js';
import { PasswordValidator } from '../validators/PasswordValidator.js';
import { StatusEnum } from '../enums/StatusEnum.js';

const __private = new WeakMap();

export class Luxarion {
  constructor(config = {}) {
    this.name = 'Luxarion';
    this.version = '1.0.0';
    this.config = { ...ConfigDefaults, ...config };
    this.status = StatusValues.INITIALIZED;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    __private.set(this, {
      data: null,
      state: 'idle',
      cache: new Map(),
      listeners: [],
      error: null,
      helpers: helpers,
      converters: converters,
      generators: generators,
      formatters: formatters,
      emailValidator: new EmailValidator(),
      urlValidator: new URLValidator(),
      phoneValidator: new PhoneValidator(),
      passwordValidator: new PasswordValidator()
    });

    this.#initialize();
  }

  #initialize() {
    const priv = __private.get(this);
    priv.state = 'running';
    this.status = StatusValues.READY;
    this.updatedAt = new Date();
    this.#log('Luxarion initialized');
  }

  #log(message) {
    console.log(`[Luxarion] ${message}`);
  }

  getData() {
    return __private.get(this).data;
  }

  setData(value) {
    __private.get(this).data = value;
    this.updatedAt = new Date();
    return this;
  }

  getState() {
    const priv = __private.get(this);
    return {
      name: this.name,
      version: this.version,
      status: this.status,
      state: priv.state,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  reset() {
    const priv = __private.get(this);
    priv.data = null;
    priv.state = 'idle';
    priv.error = null;
    priv.cache.clear();
    this.status = StatusValues.RESET;
    this.updatedAt = new Date();
    return this;
  }

  getConfig() {
    return { ...this.config };
  }

  setConfig(config) {
    this.config = { ...this.config, ...config };
    this.updatedAt = new Date();
    return this;
  }

  getHelpers() {
    return __private.get(this).helpers;
  }

  getConverters() {
    return __private.get(this).converters;
  }

  getGenerators() {
    return __private.get(this).generators;
  }

  getFormatters() {
    return __private.get(this).formatters;
  }

  getEmailValidator() {
    return __private.get(this).emailValidator;
  }

  getURLValidator() {
    return __private.get(this).urlValidator;
  }

  getPhoneValidator() {
    return __private.get(this).phoneValidator;
  }

  getPasswordValidator() {
    return __private.get(this).passwordValidator;
  }

  createHybridTypedArray(data) {
    return new HybridTypedArray(data);
  }

  createFlexibleTypedArray(data, type) {
    return new FlexibleTypedArray(data, type);
  }

  createOptimizedTypedArray(data) {
    return new OptimizedTypedArray(data);
  }

  static create(config = {}) {
    return new Luxarion(config);
  }

  static getInstance() {
    if (!Luxarion._instance) {
      Luxarion._instance = new Luxarion();
    }
    return Luxarion._instance;
  }

  _getPrivate() {
    return __private.get(this);
  }

  __getSystemState() {
    return {
      memory: process.memoryUsage ? process.memoryUsage() : null,
      timestamp: Date.now()
    };
  }
}

export default Luxarion;

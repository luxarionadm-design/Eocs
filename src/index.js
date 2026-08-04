/**
 * index.js
 * Main entry point for the EventLuxarion event system.
 * Exports all public APIs including core, integration, platform, render, scene, visualization, GPU, backend, and utilities.
 * 
 * @module EventSystem
 * @author EventLuxarion Team
 * @version 1.0.0
 * 
 * @example
 * import EventSystem, { EventLuxarion, RenderEngine, SceneManager, MathUtils } from 'event-system';
 * const app = new EventSystem({ debug: true });
 */

export { default as EventLuxarion } from './core/EventLuxarion.js';
export { default as EventNode } from './core/EventNode.js';
export { default as NodeFactory } from './core/NodeFactory.js';
export { default as EventSystemIntegration } from './integration/EventSystemIntegration.js';
export * from './types/index.js';
export { NodeTypes, NodeStates, NodePriorities } from './types/NodeTypes.js';
export { Constants, PrivateSymbols } from './constants/EventConstants.js';
export { ErrorMessages } from './constants/ErrorMessages.js';
export { default as Logger } from './utilities/Logger.js';
export { default as EventValidator } from './utilities/EventValidator.js';
export { default as EventNormalizer } from './utilities/EventNormalizer.js';
export { default as MetricsCollector } from './utilities/MetricsCollector.js';
export { default as NodeValidator } from './utilities/NodeValidator.js';
export { default as NodeSerializer } from './utilities/NodeSerializer.js';
export { default as MathUtils, DEG2RAD, RAD2DEG, PI, TWO_PI, HALF_PI, QUARTER_PI, calculateWeightedAverage, calculatePercentile, calculateAverage, calculateMinimum, calculateMaximum, calculateSum, calculatePercentage, calculateExponentialBackoff, calculateJitterDelay, calculateElapsed, generateRandomId, generateRandomString, generateUUID, randomInt, randomFloat, randomBoolean, randomChoice, randomFloatSpread, seededRandom, shuffle, calculateCircularIndex, calculateBufferShift, calculateBufferSize, calculateNextPowerOfTwo, isPowerOfTwo, calculateCeilPowerOfTwo, calculateFloorPowerOfTwo, calculateCircleAngle, calculateCirclePosition, calculateAspectRatio, lerp, inverseLerp, mapLinear, clamp, euclideanModulo, pingpong, smoothstep, smootherstep, damp, degToRad, radToDeg, hashCode, simpleHash, calculateFramesPerSecond, calculateFrameTime, calculateDelta, formatTime, formatMemory, normalize, denormalize } from './utilities/MathUtils.js';
export { default as ErrorHandler } from './handlers/ErrorHandler.js';
export { default as MiddlewareHandler } from './handlers/MiddlewareHandler.js';
export { default as FilterHandler } from './handlers/FilterHandler.js';
export { default as ExecutionHandler } from './handlers/ExecutionHandler.js';
export { default as RetryHandler } from './handlers/RetryHandler.js';
export { default as TimeoutHandler } from './handlers/TimeoutHandler.js';
export { default as ListenerManager } from './managers/ListenerManager.js';
export { default as SubscriptionManager } from './managers/SubscriptionManager.js';
export { default as QueueManager } from './managers/QueueManager.js';
export { default as CleanupManager } from './managers/CleanupManager.js';
export { default as NodeLifecycleManager } from './managers/NodeLifecycleManager.js';
export { default as NodeRelationshipManager } from './managers/NodeRelationshipManager.js';
export { default as NodeStateManager } from './managers/NodeStateManager.js';
export { default as EventProcessor } from './processors/EventProcessor.js';
export { default as ThrottleProcessor } from './processors/ThrottleProcessor.js';
export { default as DebounceProcessor } from './processors/DebounceProcessor.js';
export { default as LifecycleHookManager } from './hooks/LifecycleHookManager.js';
export { default as NodeMetricsCollector } from './metrics/NodeMetricsCollector.js';
export { GameMixin } from './mixins/GameMixin.js';
export { GraphicsMixin } from './mixins/GraphicsMixin.js';
export { OSMixin } from './mixins/OSMixin.js';
export { createEventMixin, createParamMixin, BaseMixin } from './mixins/BaseMixin.js';
export { default as PlatformManager, PlatformTypes, GPUBackendTypes } from './platform/PlatformManager.js';
export { default as BackendAdapter, WebGLBackendAdapter, WebGPUBackendAdapter, CPUBackendAdapter, BackendAdapterFactory } from './platform/BackendAdapter.js';
export { default as NativeBridge } from './platform/NativeBridge.js';
export { default as GPUContext } from './platform/GPUContext.js';
export { default as RenderEngine } from './render/RenderEngine.js';
export { default as ShaderManager, ShaderTemplates } from './render/ShaderManager.js';
export { default as SceneManager } from './scene/SceneManager.js';
export { default as Node3D } from './scene/Node3D.js';
export { default as EventVisualizer } from './visualization/EventVisualizer.js';
export { default as PerformanceMonitor } from './visualization/PerformanceMonitor.js';
export { VERSION, NAME } from './constants/EventConstants.js';

export default EventSystemIntegration;

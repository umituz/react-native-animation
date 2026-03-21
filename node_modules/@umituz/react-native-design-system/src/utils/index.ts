/**
 * Utils Module
 *
 * Centralized utility functions for the design system.
 *
 * Usage:
 *   import { createMappedArray, retryWithBackoff, formatFileSize, clamp, Logger, DesignSystemError } from '@umituz/react-native-design-system/utils';
 */

// =============================================================================
// ARRAY UTILITIES
// =============================================================================

export {
  createMappedArray,
  safeSlice,
  filterById,
  findById,
} from './arrayUtils';

// =============================================================================
// TIME CONSTANTS
// =============================================================================

export {
  MILLISECONDS_PER_SECOND,
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_DAY,
  SECONDS_PER_MINUTE,
  SECONDS_PER_HOUR,
  SECONDS_PER_DAY,
  MINUTES_PER_HOUR,
  MINUTES_PER_DAY,
  ONE_SECOND_MS,
  FIVE_SECONDS_MS,
  TEN_SECONDS_MS,
  THIRTY_SECONDS_MS,
  ONE_MINUTE_MS,
  FIVE_MINUTES_MS,
  TEN_MINUTES_MS,
  THIRTY_MINUTES_MS,
  ONE_HOUR_MS,
  ONE_DAY_MS,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_LONG_TIMEOUT_MS,
  DEFAULT_CACHE_TTL_MS,
} from './constants/TimeConstants';

// =============================================================================
// ASYNC UTILITIES
// =============================================================================

export {
  retryWithBackoff,
  retryWithTimeout,
  isNetworkError,
  isRetryableHttpStatus,
  type RetryOptions,
} from './async';

// =============================================================================
// FORMATTER UTILITIES
// =============================================================================

export {
  formatFileSize,
  formatDuration,
  formatPhone,
  truncateText,
  capitalize,
  toTitleCase,
  toSlug,
  type FileSizeFormatOptions,
  type DurationFormatOptions,
  type PhoneFormatOptions,
} from './formatters/stringFormatter';

// =============================================================================
// MATH UTILITIES
// =============================================================================

export {
  clamp,
  calculatePercentage,
  roundTo,
  calculateGridItemWidth,
  isInRange,
  lerp,
  mapRange,
  normalizeProgress,
  formatPercentage,
  calculateStepProgress,
  isComplete,
  hasStarted,
  intensityToOpacity,
  createRgbaColor,
  ratioToOpacity,
} from './math';

// =============================================================================
// LOGGER
// =============================================================================

export {
  Logger,
  logger,
  type LoggerConfig,
} from './logger';

// =============================================================================
// HOOKS
// =============================================================================

export {
  useAsyncOperation,
  type AsyncOperationOptions,
  type AsyncOperationState,
  type AsyncOperationActions,
  type AsyncOperationReturn,
  type ErrorHandler as AsyncErrorHandler,
} from './hooks';

// =============================================================================
// ERROR HANDLING
// =============================================================================

export {
  DesignSystemError,
  ErrorCodes,
  ErrorCategory,
} from './errors';

export type {
  ErrorCode,
  ErrorMetadata,
} from './errors';

export { ErrorHandler } from './errors/ErrorHandler';

export type {
  Result,
} from './errors/types/Result';

export {
  ok,
  err,
  unwrap,
  unwrapOr,
  map,
  mapError,
} from './errors';

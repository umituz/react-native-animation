/**
 * Error Utilities
 * Unified error handling for the design system
 */

export { DesignSystemError, ErrorCodes, ErrorCategory, type ErrorCode, type ErrorMetadata } from './DesignSystemError';
export { ErrorHandler } from './ErrorHandler';

// Result type for explicit error handling
export type { Result } from './types/Result';
export { ok, err, unwrap, unwrapOr, map, mapError } from './types/Result';

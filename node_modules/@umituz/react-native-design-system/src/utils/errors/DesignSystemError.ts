/**
 * DesignSystemError
 *
 * Unified error class for the design system package.
 * Provides consistent error handling with error codes and context.
 */

export class DesignSystemError extends Error {
  /**
   * Error code for categorization
   */
  public readonly code: string;

  /**
   * Additional context about the error
   */
  public readonly context?: Record<string, any>;

  /**
   * Timestamp when error was created
   */
  public readonly timestamp: Date;

  /**
   * Error category for grouping
   */
  public readonly category: ErrorCategory;

  /**
   * Operation that failed
   */
  public readonly operation?: string;

  /**
   * Original error cause
   */
  public readonly cause?: unknown;

  /**
   * Whether operation can be retried
   */
  public readonly retryable: boolean;

  constructor(
    message: string,
    code: string,
    context?: Record<string, any>,
    metadata?: ErrorMetadata
  ) {
    super(message);
    this.name = 'DesignSystemError';
    this.code = code;
    this.context = context;
    this.timestamp = new Date();

    // Extract metadata
    this.category = metadata?.category ?? ErrorCategory.UNKNOWN;
    this.operation = metadata?.operation;
    this.cause = metadata?.cause;
    this.retryable = metadata?.retryable ?? false;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    const ErrorConstructor = Error as { captureStackTrace?: (error: Error, constructor: typeof DesignSystemError) => void };
    if (typeof ErrorConstructor.captureStackTrace === 'function') {
      ErrorConstructor.captureStackTrace(this, DesignSystemError);
    }
  }

  /**
   * Convert error to JSON for logging/debugging
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
    };
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    // You can customize user-facing messages based on error codes
    switch (this.code) {
      case 'FILE_NOT_FOUND':
        return 'The requested file could not be found.';
      case 'PERMISSION_DENIED':
        return 'Permission denied. Please check app permissions.';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection.';
      case 'STORAGE_FULL':
        return 'Storage is full. Please free up some space.';
      case 'INVALID_INPUT':
        return 'Invalid input provided.';
      default:
        return this.message;
    }
  }
}

/**
 * Common error codes used across the design system
 */
export const ErrorCodes = {
  // File system errors
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  FILE_READ_ERROR: 'FILE_READ_ERROR',
  FILE_WRITE_ERROR: 'FILE_WRITE_ERROR',
  FILE_DELETE_ERROR: 'FILE_DELETE_ERROR',
  DIRECTORY_CREATE_ERROR: 'DIRECTORY_CREATE_ERROR',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  STORAGE_FULL: 'STORAGE_FULL',

  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  API_ERROR: 'API_ERROR',

  // Media errors
  MEDIA_PICKER_ERROR: 'MEDIA_PICKER_ERROR',
  MEDIA_SAVE_ERROR: 'MEDIA_SAVE_ERROR',
  IMAGE_LOAD_ERROR: 'IMAGE_LOAD_ERROR',

  // Storage errors
  CACHE_ERROR: 'CACHE_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',

  // Validation errors
  INVALID_INPUT: 'INVALID_INPUT',
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  // Theme errors
  THEME_LOAD_ERROR: 'THEME_LOAD_ERROR',
  THEME_SAVE_ERROR: 'THEME_SAVE_ERROR',

  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INITIALIZATION_ERROR: 'INITIALIZATION_ERROR',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

/**
 * Error Categories for grouping related errors
 */
export enum ErrorCategory {
  FILESYSTEM = 'FILESYSTEM',
  NETWORK = 'NETWORK',
  MEDIA = 'MEDIA',
  STORAGE = 'STORAGE',
  CACHE = 'CACHE',
  IMAGE = 'IMAGE',
  VALIDATION = 'VALIDATION',
  THEME = 'THEME',
  PERMISSION = 'PERMISSION',
  INITIALIZATION = 'INITIALIZATION',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Error metadata for rich context
 */
export interface ErrorMetadata {
  category?: ErrorCategory;
  operation?: string;
  key?: string;
  cause?: unknown;
  retryable?: boolean;
  userMessage?: string;
}

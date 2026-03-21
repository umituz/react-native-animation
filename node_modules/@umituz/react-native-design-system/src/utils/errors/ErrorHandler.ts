/**
 * ErrorHandler
 *
 * Centralized error handling utility for the design system.
 * Provides consistent error handling, logging, and reporting.
 */

import { DesignSystemError, ErrorCodes, ErrorCategory, type ErrorMetadata } from './DesignSystemError';
import type { Result } from './types/Result';
import { ok, err } from './types/Result';

export class ErrorHandler {
  /**
   * Handle and normalize errors
   * Converts any error type to DesignSystemError
   */
  static handle(
    error: unknown,
    context?: string,
    additionalContext?: Record<string, any>
  ): DesignSystemError {
    // Already a DesignSystemError, return as-is
    if (error instanceof DesignSystemError) {
      return error;
    }

    // Standard Error object
    if (error instanceof Error) {
      return new DesignSystemError(
        error.message,
        ErrorCodes.UNKNOWN_ERROR,
        {
          context,
          originalError: error.name,
          stack: error.stack,
          ...additionalContext,
        }
      );
    }

    // String error
    if (typeof error === 'string') {
      return new DesignSystemError(
        error,
        ErrorCodes.UNKNOWN_ERROR,
        { context, ...additionalContext }
      );
    }

    // Unknown error type
    return new DesignSystemError(
      'An unknown error occurred',
      ErrorCodes.UNKNOWN_ERROR,
      {
        context,
        originalError: String(error),
        ...additionalContext,
      }
    );
  }

  /**
   * Log error to console (only in development)
   */
  static log(error: DesignSystemError | Error | unknown): void {
    if (__DEV__) {
      if (error instanceof DesignSystemError) {
        console.error('[DesignSystemError]', error.toJSON());
      } else if (error instanceof Error) {
        console.error('[Error]', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      } else {
        console.error('[Unknown Error]', error);
      }
    }
  }

  /**
   * Handle error with logging
   * Combines handle() and log() for convenience
   */
  static handleAndLog(
    error: unknown,
    context?: string,
    additionalContext?: Record<string, any>
  ): DesignSystemError {
    const handled = this.handle(error, context, additionalContext);
    this.log(handled);
    return handled;
  }

  /**
   * Create a new DesignSystemError with specific code
   */
  static create(
    message: string,
    code: string,
    context?: Record<string, any>
  ): DesignSystemError {
    return new DesignSystemError(message, code, context);
  }

  /**
   * Wrap async function with error handling
   * Returns [error, result] tuple (similar to Go pattern)
   */
  static async tryAsync<T>(
    fn: () => Promise<T>,
    context?: string
  ): Promise<[DesignSystemError | null, T | null]> {
    try {
      const result = await fn();
      return [null, result];
    } catch (error) {
      const handled = this.handleAndLog(error, context);
      return [handled, null];
    }
  }

  /**
   * Wrap sync function with error handling
   * Returns [error, result] tuple
   */
  static try<T>(
    fn: () => T,
    context?: string
  ): [DesignSystemError | null, T | null] {
    try {
      const result = fn();
      return [null, result];
    } catch (error) {
      const handled = this.handleAndLog(error, context);
      return [handled, null];
    }
  }

  /**
   * Normalize any error to DesignSystemError with metadata
   */
  static normalize(
    error: unknown,
    code: string,
    metadata?: ErrorMetadata
  ): DesignSystemError {
    if (error instanceof DesignSystemError) {
      return error;
    }

    if (error instanceof Error) {
      return new DesignSystemError(
        error.message,
        code,
        {
          originalError: error.name,
          stack: error.stack,
        },
        {
          ...metadata,
          cause: error,
        }
      );
    }

    if (typeof error === 'string') {
      return new DesignSystemError(error, code, undefined, metadata);
    }

    return new DesignSystemError(
      'An unknown error occurred',
      code,
      { originalError: String(error) },
      metadata
    );
  }

  /**
   * Wrap async function with timeout
   */
  static async withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    context?: string
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(
          new DesignSystemError(
            `${context || 'Operation'} timed out after ${timeoutMs}ms`,
            ErrorCodes.TIMEOUT_ERROR,
            { timeoutMs, context },
            {
              category: ErrorCategory.NETWORK,
              retryable: true,
            }
          )
        );
      }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }

  /**
   * Wrap async function returning Result type
   */
  static async tryAsyncResult<T>(
    fn: () => Promise<T>,
    code: string,
    metadata?: ErrorMetadata
  ): Promise<Result<T, DesignSystemError>> {
    try {
      const result = await fn();
      return ok(result);
    } catch (error) {
      const normalized = this.normalize(error, code, metadata);
      this.log(normalized);
      return err(normalized);
    }
  }

  /**
   * Wrap sync function returning Result type
   */
  static tryResult<T>(
    fn: () => T,
    code: string,
    metadata?: ErrorMetadata
  ): Result<T, DesignSystemError> {
    try {
      const result = fn();
      return ok(result);
    } catch (error) {
      const normalized = this.normalize(error, code, metadata);
      this.log(normalized);
      return err(normalized);
    }
  }
}

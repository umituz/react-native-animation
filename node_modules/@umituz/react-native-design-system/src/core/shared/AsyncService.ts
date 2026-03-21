/**
 * Async Service Base - Shared Utilities
 *
 * Base class for services with automatic error handling.
 */

import type { Result } from './Result';
import { ResultHelper } from './Result';

export abstract class AsyncService {
  protected readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  /**
   * Execute async operation with automatic error handling
   */
  protected async execute<T>(
    operation: string,
    fn: () => Promise<T>
  ): Promise<Result<T>> {
    try {
      const data = await fn();
      return ResultHelper.ok(data);
    } catch (error) {
      this.logError(operation, error);
      return ResultHelper.fail(error instanceof Error ? error : new Error(String(error)));
    }
  }

  /**
   * Log error in development mode
   */
  protected logError(operation: string, error: unknown): void {
    if (__DEV__) {
      console.error(`[${this.serviceName}] ${operation}:`, error);
    }
  }

  protected logWarning(message: string): void {
    if (__DEV__) {
      console.warn(`[${this.serviceName}] ${message}`);
    }
  }

  protected logInfo(message: string): void {
    if (__DEV__) {
      console.log(`[${this.serviceName}] ${message}`);
    }
  }
}

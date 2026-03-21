/**
 * retryWithBackoff
 *
 * Retry utility with exponential backoff for async operations.
 * Useful for network requests, file operations, etc.
 */

import { DEFAULT_LONG_TIMEOUT_MS, ONE_SECOND_MS, TEN_SECONDS_MS } from '../constants/TimeConstants';

export interface RetryOptions {
  /**
   * Maximum number of retry attempts
   * @default 3
   */
  maxRetries?: number;

  /**
   * Initial delay in milliseconds before first retry
   * @default 1000
   */
  baseDelay?: number;

  /**
   * Maximum delay in milliseconds (caps exponential growth)
   * @default 10000
   */
  maxDelay?: number;

  /**
   * Multiplier for exponential backoff
   * @default 2
   */
  backoffMultiplier?: number;

  /**
   * Function to determine if error is retryable
   * @default () => true (retry all errors)
   */
  shouldRetry?: (error: Error, attempt: number) => boolean;

  /**
   * Callback on each retry attempt
   */
  onRetry?: (error: Error, attempt: number, delay: number) => void;
}

/**
 * Retry an async function with exponential backoff
 *
 * @example
 * ```ts
 * const result = await retryWithBackoff(
 *   () => fetch('https://api.example.com'),
 *   { maxRetries: 3, baseDelay: 1000 }
 * );
 * ```
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = ONE_SECOND_MS,
    maxDelay = TEN_SECONDS_MS,
    backoffMultiplier = 2,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Attempt the operation
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if we should retry
      const isLastAttempt = attempt === maxRetries;
      if (isLastAttempt || !shouldRetry(lastError, attempt)) {
        throw lastError;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        baseDelay * Math.pow(backoffMultiplier, attempt),
        maxDelay
      );

      // Call onRetry callback if provided
      if (onRetry) {
        onRetry(lastError, attempt + 1, delay);
      }

      // Log retry in development
      if (__DEV__) {
        console.log(
          `[Retry] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delay}ms...`,
          lastError.message
        );
      }

      // Wait before retrying
      await new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError ?? new Error('Retry operation failed with unknown error');
}

/**
 * Retry with timeout
 * Combines retry logic with a timeout
 *
 * @example
 * ```ts
 * const result = await retryWithTimeout(
 *   () => fetch('https://api.example.com'),
 *   { timeout: 5000, maxRetries: 3 }
 * );
 * ```
 */
export async function retryWithTimeout<T>(
  fn: () => Promise<T>,
  options: RetryOptions & { timeout?: number } = {}
): Promise<T> {
  const { timeout = DEFAULT_LONG_TIMEOUT_MS, ...retryOptions } = options;

  return retryWithBackoff(
    () => withTimeout(fn(), timeout),
    retryOptions
  );
}

/**
 * Add timeout to a promise
 */
function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Operation timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
}

/**
 * Check if error is a network error
 * Useful for shouldRetry callback
 */
export function isNetworkError(error: Error): boolean {
  return (
    error.message.includes('network') ||
    error.message.includes('timeout') ||
    error.message.includes('fetch') ||
    error.message.includes('ECONNREFUSED') ||
    error.message.includes('ETIMEDOUT')
  );
}

/**
 * Check if error is retryable HTTP status
 * Useful for shouldRetry callback
 */
export function isRetryableHttpStatus(status: number): boolean {
  // Retry on 5xx server errors and 429 (rate limit)
  return status >= 500 || status === 429 || status === 408;
}

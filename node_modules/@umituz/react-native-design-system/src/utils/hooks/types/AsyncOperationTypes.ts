/**
 * AsyncOperation Types
 * Type definitions for useAsyncOperation hook
 */

export type ErrorHandler<E = Error> = (error: unknown) => E;

export interface AsyncOperationOptions<T, E = Error> {
  /** Skip execution (useful for conditional operations) */
  skip?: boolean;

  /** Execute immediately on mount */
  immediate?: boolean;

  /** Initial data value */
  initialData?: T | null;

  /** Convert error to custom type */
  errorHandler?: ErrorHandler<E>;

  /** Callback on success */
  onSuccess?: (data: T) => void;

  /** Callback on error */
  onError?: (error: E) => void;

  /** Callback on finally (success or error) */
  onFinally?: () => void;

  /** Enable retry functionality */
  enableRetry?: boolean;

  /** Maximum retry attempts */
  maxRetries?: number;
}

export interface AsyncOperationState<T, E = Error> {
  /** Current data value */
  data: T | null;

  /** Loading state */
  isLoading: boolean;

  /** Error state */
  error: E | null;

  /** Is operation idle (not executed yet) */
  isIdle: boolean;

  /** Is operation successful */
  isSuccess: boolean;

  /** Is operation in error state */
  isError: boolean;
}

export interface AsyncOperationActions<T, E = Error> {
  /** Execute the async operation */
  execute: (...args: any[]) => Promise<T | null>;

  /** Retry the last operation */
  retry: () => Promise<T | null>;

  /** Reset to initial state */
  reset: () => void;

  /** Set data manually */
  setData: (data: T | null) => void;

  /** Set error manually */
  setError: (error: E | null) => void;
}

export type AsyncOperationReturn<T, E = Error> =
  AsyncOperationState<T, E> & AsyncOperationActions<T, E>;

/**
 * Result Type
 *
 * Rust/Go-inspired Result type for explicit error handling.
 * Alternative to throwing errors or returning tuples.
 */

export type Result<T, E = Error> =
  | { success: true; value: T; error: null }
  | { success: false; value: null; error: E };

/**
 * Create a successful result
 */
export function ok<T, E = Error>(value: T): Result<T, E> {
  return { success: true, value, error: null };
}

/**
 * Create an error result
 */
export function err<T, E = Error>(error: E): Result<T, E> {
  return { success: false, value: null, error };
}

/**
 * Unwrap result value or throw error
 */
export function unwrap<T, E = Error>(result: Result<T, E>): T {
  if (result.success) {
    return result.value;
  }
  throw result.error;
}

/**
 * Unwrap result value or return default
 */
export function unwrapOr<T, E = Error>(result: Result<T, E>, defaultValue: T): T {
  return result.success ? result.value : defaultValue;
}

/**
 * Map result value if successful
 */
export function map<T, U, E = Error>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  if (result.success) {
    return ok(fn(result.value));
  }
  return { success: false, value: null, error: result.error };
}

/**
 * Map result error if failed
 */
export function mapError<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  return result.success ? result : err(fn(result.error));
}

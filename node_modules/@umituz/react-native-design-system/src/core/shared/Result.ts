/**
 * Result Type - Shared Utilities
 *
 * Functional error handling without exceptions.
 */

export type Result<T, E = Error> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: E };

export const ResultHelper = {
  ok: <T>(data: T): Result<T> => ({ success: true, data }),

  fail: <E = Error>(error: E): Result<never, E> => ({
    success: false,
    error,
  }),

  fromAsync: async <T>(
    fn: () => Promise<T>
  ): Promise<Result<T, Error>> => {
    try {
      return ResultHelper.ok(await fn());
    } catch (error) {
      return ResultHelper.fail(error instanceof Error ? error : new Error(String(error)));
    }
  },

  map: <T, U>(
    result: Result<T>,
    fn: (data: T) => U
  ): Result<U> =>
    result.success ? ResultHelper.ok(fn(result.data)) : ResultHelper.fail(result.error),
};

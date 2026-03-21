/**
 * Type Utilities
 * Domain layer - Type extractors and helpers
 *
 * General-purpose type utilities for TanStack Query
 */

import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query';

/**
 * Extract data type from UseQueryResult
 *
 * @example
 * ```typescript
 * const result = useQuery({ queryKey: ['user'], queryFn: fetchUser });
 * type User = ExtractQueryDataType<typeof result>; // User
 * ```
 */
export type ExtractQueryDataType<TQuery extends UseQueryResult<unknown, unknown>> =
  TQuery extends UseQueryResult<infer TData, unknown> ? TData : never;

/**
 * Extract error type from UseQueryResult
 *
 * @example
 * ```typescript
 * const result = useQuery({ queryKey: ['user'], queryFn: fetchUser });
 * type Error = ExtractQueryErrorType<typeof result>; // Error
 * ```
 */
export type ExtractQueryErrorType<TQuery extends UseQueryResult<unknown, unknown>> =
  TQuery extends UseQueryResult<unknown, infer TError> ? TError : never;

/**
 * Extract data type from UseMutationResult
 *
 * @example
 * ```typescript
 * const mutation = useMutation({ mutationFn: createUser });
 * type User = ExtractMutationDataType<typeof mutation>; // User
 * ```
 */
export type ExtractMutationDataType<TMutation extends UseMutationResult<unknown, unknown, unknown>> =
  TMutation extends UseMutationResult<infer TData, unknown, unknown> ? TData : never;

/**
 * Extract error type from UseMutationResult
 *
 * @example
 * ```typescript
 * const mutation = useMutation({ mutationFn: createUser });
 * type Error = ExtractMutationErrorType<typeof mutation>; // Error
 * ```
 */
export type ExtractMutationErrorType<TMutation extends UseMutationResult<unknown, unknown, unknown>> =
  TMutation extends UseMutationResult<unknown, infer TError, unknown> ? TError : never;

/**
 * Extract variables type from UseMutationResult
 *
 * @example
 * ```typescript
 * const mutation = useMutation({ mutationFn: createUser });
 * type Variables = ExtractMutationVariables<typeof mutation>; // CreateUserVars
 * ```
 */
export type ExtractMutationVariables<TMutation extends UseMutationResult<unknown, unknown, unknown>> =
  TMutation extends UseMutationResult<unknown, unknown, infer TVariables> ? TVariables : never;

/**
 * Extract data type from infinite query
 *
 * @example
 * ```typescript
 * const result = useInfiniteQuery({ queryKey: ['posts'], queryFn: fetchPosts });
 * type Posts = ExtractInfiniteDataType<typeof result>; // InfiniteData<PostsResponse>
 * ```
 */
export type ExtractInfiniteDataType<TQuery extends UseQueryResult<unknown, unknown>> =
  TQuery extends UseQueryResult<infer TData, unknown> ? TData : never;

/**
 * Extract page data type from infinite query
 *
 * @example
 * ```typescript
 * const result = useInfiniteQuery({ queryKey: ['posts'], queryFn: fetchPosts });
 * type Page = ExtractInfinitePageType<typeof result>; // PostsResponse
 * ```
 */
export type ExtractInfinitePageType<TQuery> = TQuery extends {
  data: { pages: infer TPages };
}
  ? TPages extends Array<infer TPage>
    ? TPage
    : never
  : never;

/**
 * Make specific keys required from a type
 *
 * @example
 * ```typescript
 * type User = { id?: number; name: string; email?: string };
 * type UserWithId = RequireKeys<User, 'id' | 'email'>;
 * // { id: number; name: string; email: string }
 * ```
 */
export type RequireKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Make specific keys optional from a type
 *
 * @example
 * ```typescript
 * type User = { id: number; name: string; email: string };
 * type PartialUser = OptionalKeys<User, 'id' | 'email'>;
 * // { id?: number; name: string; email?: string }
 * ```
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Deep partial type
 *
 * @example
 * ```typescript
 * type User = { id: number; profile: { name: string; email: string } };
 * type PartialUser = DeepPartial<User>;
 * // { id?: number; profile?: { name?: string; email?: string } }
 * ```
 */
export type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

/**
 * Deep required type
 *
 * @example
 * ```typescript
 * type User = { id?: number; profile?: { name?: string; email?: string } };
 * type RequiredUser = DeepRequired<User>;
 * // { id: number; profile: { name: string; email: string } }
 * ```
 */
export type DeepRequired<T> = T extends object
  ? {
      [K in keyof T]-?: DeepRequired<T[K]>;
    }
  : T;

/**
 * Repository Key Factory
 *
 * Generic query key factory for repositories.
 * Provides consistent query key structure across all repositories.
 */

import type { QueryKeyFactory, ListParams } from './types';

/**
 * Create query key factory for a resource
 *
 * @param resource - Resource name (e.g., 'users', 'posts')
 * @returns Query key factory
 *
 * @example
 * ```ts
 * const keys = createRepositoryKeyFactory('users');
 *
 * keys.all(); // ['users']
 * keys.lists(); // ['users', 'list']
 * keys.list({ page: 1 }); // ['users', 'list', { page: 1 }]
 * keys.details(); // ['users', 'detail']
 * keys.detail(123); // ['users', 'detail', 123]
 * ```
 */
export function createRepositoryKeyFactory(
  resource: string
): QueryKeyFactory {
  return {
    all: () => [resource] as const,

    lists: () => [resource, 'list'] as const,

    list: (params: ListParams) => [resource, 'list', params] as const,

    details: () => [resource, 'detail'] as const,

    detail: (id: string | number) => [resource, 'detail', id] as const,
  };
}

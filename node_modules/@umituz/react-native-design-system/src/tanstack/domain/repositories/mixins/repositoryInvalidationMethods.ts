/**
 * Repository Invalidation Methods
 * Cache invalidation methods for repository operations
 */

import type { IBaseRepository } from '../IBaseRepository';
import { matchesResource } from '../helpers/repositoryHelpers';

/**
 * Invalidate all queries for this resource
 *
 * @param repository - Repository instance
 */
export function invalidateAll<TData>(
  repository: IBaseRepository<TData, unknown, unknown>
): Promise<void> {
  const client = repository.getClient();
  const resource = repository.resource;

  return client.invalidateQueries({
    predicate: (query: { queryKey: readonly unknown[] }) => {
      return matchesResource(query.queryKey, resource);
    },
  });
}

/**
 * Invalidate list queries
 *
 * @param repository - Repository instance
 */
export function invalidateLists<TData>(
  repository: IBaseRepository<TData, unknown, unknown>
): Promise<void> {
  const client = repository.getClient();
  return client.invalidateQueries({
    queryKey: repository.keys.lists(),
  });
}

/**
 * Invalidate detail query
 *
 * @param repository - Repository instance
 * @param id - Item ID
 */
export function invalidateDetail<TData>(
  repository: IBaseRepository<TData, unknown, unknown>,
  id: string | number
): Promise<void> {
  const client = repository.getClient();
  return client.invalidateQueries({
    queryKey: repository.keys.detail(id),
  });
}

/**
 * Set query data (optimistic update)
 *
 * @param repository - Repository instance
 * @param id - Item ID
 * @param data - Data to set
 */
export function setData<TData>(
  repository: IBaseRepository<TData, unknown, unknown>,
  id: string | number,
  data: TData
): void {
  const client = repository.getClient();
  client.setQueryData(repository.keys.detail(id), data);
}

/**
 * Get query data from cache
 *
 * @param repository - Repository instance
 * @param id - Item ID
 * @returns Cached data or undefined
 */
export function getData<TData>(
  repository: IBaseRepository<TData, unknown, unknown>,
  id: string | number
): TData | undefined {
  const client = repository.getClient();
  return client.getQueryData<TData>(repository.keys.detail(id));
}

/**
 * Remove query data from cache
 *
 * @param repository - Repository instance
 * @param id - Item ID
 */
export function clearData<TData>(
  repository: IBaseRepository<TData, unknown, unknown>,
  id: string | number
): void {
  const client = repository.getClient();
  client.setQueryData(repository.keys.detail(id), undefined);
}

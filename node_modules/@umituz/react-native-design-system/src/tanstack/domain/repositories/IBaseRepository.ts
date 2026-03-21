/**
 * Base Repository Interface
 * Defines the contract for repository implementations
 */

import type { QueryClient } from '@tanstack/react-query';
import type {
  CreateParams,
  UpdateParams,
  ListParams,
} from './RepositoryTypes';

export interface IBaseRepository<TData, TCreateVariables, TUpdateVariables> {
  /** Query client instance */
  getClient(): QueryClient;

  /** Resource name */
  readonly resource: string;

  /** Query key factory */
  readonly keys: ReturnType<typeof import('../utils/QueryKeyFactory').createQueryKeyFactory>;

  /** Cache options */
  getCacheOptions(): { staleTime: number; gcTime: number };

  /** Abstract methods to be implemented by subclasses */
  fetchAll(params?: ListParams): Promise<TData[]>;
  fetchById(id: string | number): Promise<TData>;
  create(data: CreateParams<TCreateVariables>): Promise<TData>;
  update(params: UpdateParams<TUpdateVariables>): Promise<TData>;
  remove(id: string | number): Promise<void>;
}

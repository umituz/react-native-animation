/**
 * Base Repository
 * Domain layer - Abstract repository for data operations
 *
 * Provides generic CRUD operations with TanStack Query integration.
 * Now uses common repository utilities from core/repositories.
 *
 * @example
 * ```typescript
 * class UserRepository extends BaseRepository<User, CreateUserVars, UpdateUserVars> {
 *   constructor() {
 *     super('users');
 *   }
 *
 *   async fetchAll(): Promise<User[]> {
 *     return api.get('/users');
 *   }
 *
 *   async fetchById(id: string): Promise<User> {
 *     return api.get(`/users/${id}`);
 *   }
 *
 *   async create(data: CreateUserVars): Promise<User> {
 *     return api.post('/users', data);
 *   }
 *
 *   async update(id: string, data: UpdateUserVars): Promise<User> {
 *     return api.put(`/users/${id}`, data);
 *   }
 *
 *   async remove(id: string): Promise<void> {
 *     return api.delete(`/users/${id}`);
 *   }
 * }
 * ```
 */

import type { QueryClient } from '@tanstack/react-query';
import { getGlobalQueryClient } from '../config/QueryClientAccessor';
import { createQueryKeyFactory } from '../utils/QueryKeyFactory';
import type {
  CreateParams,
  UpdateParams,
  ListParams,
  RepositoryOptions,
} from './RepositoryTypes';
import { mergeRepositoryOptions, getCacheOptions } from './helpers/repositoryHelpers';
import * as queryMethods from './mixins/repositoryQueryMethods';
import * as invalidationMethods from './mixins/repositoryInvalidationMethods';
// Import common utilities from core
import { createRepositoryLogger } from '../../../core/repositories/domain/RepositoryUtils';

/**
 * Base repository for CRUD operations
 *
 * @template TData - Entity type
 * @template TCreateVariables - Variables for create mutation
 * @template TUpdateVariables - Variables for update mutation
 */
export abstract class BaseRepository<
  TData,
  TCreateVariables = unknown,
  TUpdateVariables = Partial<TData>,
> {
  public readonly resource: string;
  public readonly options: RepositoryOptions;

  /**
   * Query key factory for this repository
   */
  public readonly keys: ReturnType<typeof createQueryKeyFactory>;

  /**
   * Debug logger for this repository
   */
  protected readonly log: (method: string, ...args: unknown[]) => void;

  constructor(resource: string, options: RepositoryOptions = {}) {
    this.resource = resource;
    this.options = mergeRepositoryOptions(options);
    this.keys = createQueryKeyFactory(this.resource);
    this.log = createRepositoryLogger(resource, __DEV__);
  }

  /**
   * Get query client instance
   */
  public getClient(): QueryClient {
    return getGlobalQueryClient();
  }

  /**
   * Get cache options for queries
   */
  public getCacheOptions(): { staleTime: number; gcTime: number } {
    return getCacheOptions(this.options);
  }

  /**
   * Fetch all items - to be implemented by subclass
   */
  abstract fetchAll(params?: ListParams): Promise<TData[]>;

  /**
   * Fetch item by ID - to be implemented by subclass
   */
  abstract fetchById(id: string | number): Promise<TData>;

  /**
   * Create item - to be implemented by subclass
   */
  abstract create(params: CreateParams<TCreateVariables>): Promise<TData>;

  /**
   * Update item - to be implemented by subclass
   */
  abstract update(params: UpdateParams<TUpdateVariables>): Promise<TData>;

  /**
   * Delete item - to be implemented by subclass
   */
  abstract remove(id: string | number): Promise<void>;

  /**
   * Query all items with caching
   */
  async queryAll(params?: ListParams): Promise<TData[]> {
    this.log('queryAll', params);
    return queryMethods.queryAll(this, params);
  }

  /**
   * Query item by ID with caching
   */
  async queryById(id: string | number): Promise<TData | undefined> {
    this.log('queryById', id);
    return queryMethods.queryById(this, id);
  }

  /**
   * Prefetch all items
   */
  async prefetchAll(params?: ListParams): Promise<void> {
    this.log('prefetchAll', params);
    return queryMethods.prefetchAll(this, params);
  }

  /**
   * Prefetch item by ID
   */
  async prefetchById(id: string | number): Promise<void> {
    this.log('prefetchById', id);
    return queryMethods.prefetchById(this, id);
  }

  /**
   * Invalidate all queries for this resource
   */
  invalidateAll(): Promise<void> {
    this.log('invalidateAll');
    return invalidationMethods.invalidateAll(this);
  }

  /**
   * Invalidate list queries
   */
  invalidateLists(): Promise<void> {
    this.log('invalidateLists');
    return invalidationMethods.invalidateLists(this);
  }

  /**
   * Invalidate detail query
   */
  invalidateDetail(id: string | number): Promise<void> {
    this.log('invalidateDetail', id);
    return invalidationMethods.invalidateDetail(this, id);
  }

  /**
   * Set query data (optimistic update)
   */
  setData(id: string | number, data: TData): void {
    this.log('setData', id);
    invalidationMethods.setData(this, id, data);
  }

  /**
   * Get query data from cache
   */
  getData(id: string | number): TData | undefined {
    return invalidationMethods.getData(this, id);
  }

  /**
   * Remove query data from cache
   */
  clearData(id: string | number): void {
    this.log('clearData', id);
    invalidationMethods.clearData(this, id);
  }
}

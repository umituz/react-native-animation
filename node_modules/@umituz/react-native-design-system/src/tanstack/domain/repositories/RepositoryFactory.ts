/**
 * Repository Factory
 * Domain layer - Factory for creating repository instances
 *
 * Provides singleton instances of repositories to avoid multiple instances.
 * Repositories are registered once and reused throughout the app.
 *
 * @example
 * ```typescript
 * // Register repositories
 * RepositoryFactory.register('users', new UserRepository());
 * RepositoryFactory.register('posts', new PostRepository());
 *
 * // Get repository
 * const userRepo = RepositoryFactory.get<UserRepository>('users');
 * const users = await userRepo.queryAll();
 *
 * // Get all registered keys
 * const keys = RepositoryFactory.keys(); // ['users', 'posts']
 *
 * // Invalidate all repositories
 * RepositoryFactory.invalidateAll();
 * ```
 */

import type { BaseRepository } from './BaseRepository';
import { getGlobalQueryClient } from '../config/QueryClientAccessor';

type RepositoryMap = Map<string, BaseRepository<unknown, unknown, unknown>>;

class RepositoryFactoryClass {
  private repositories: RepositoryMap = new Map();

  /**
   * Register a repository instance
   *
   * @param key - Unique identifier for the repository
   * @param repository - Repository instance
   */
  register<TRepository extends BaseRepository<unknown, unknown, unknown>>(
    key: string,
    repository: TRepository,
  ): void {
    if (this.repositories.has(key)) {
      if (__DEV__) {
        console.warn(
          `[RepositoryFactory] Repository "${key}" is already registered. Overwriting.`,
        );
      }
    }
    this.repositories.set(key, repository);
  }

  /**
   * Get a registered repository instance
   *
   * @param key - Repository identifier
   * @throws Error if repository not found
   */
  get<TRepository extends BaseRepository<unknown, unknown, unknown>>(
    key: string,
  ): TRepository {
    const repository = this.repositories.get(key);
    if (!repository) {
      throw new Error(
        `[RepositoryFactory] Repository "${key}" not found. Make sure to register it first.`,
      );
    }
    return repository as TRepository;
  }

  /**
   * Check if repository is registered
   */
  has(key: string): boolean {
    return this.repositories.has(key);
  }

  /**
   * Unregister a repository
   */
  unregister(key: string): boolean {
    if (__DEV__ && !this.repositories.has(key)) {
      
    }
    return this.repositories.delete(key);
  }

  /**
   * Get all registered repository keys
   */
  keys(): string[] {
    return Array.from(this.repositories.keys());
  }

  /**
   * Clear all registered repositories
   * Useful for testing or cleanup
   */
  clear(): void {
    this.repositories.clear();
  }

  /**
   * Invalidate all queries from all registered repositories
   */
  async invalidateAll(): Promise<void> {
    const client = getGlobalQueryClient();
    await client.invalidateQueries();
  }

  /**
   * Prefetch all data from all registered repositories
   * Useful for app initialization or online event
   */
  async prefetchAll(): Promise<void> {
    const promises = Array.from(this.repositories.values()).map((repo) => {
      try {
        return repo.prefetchAll();
      } catch {
        // Ignore prefetch errors
        return Promise.resolve();
      }
    });

    await Promise.all(promises);
  }
}

/**
 * Global repository factory instance
 */
export const RepositoryFactory = new RepositoryFactoryClass();

/**
 * Cache Storage Operations
 *
 * Handles cache storage operations following Single Responsibility Principle
 */

import { storageRepository } from '../../infrastructure/repositories/AsyncStorageRepository';
import type { CachedValue } from '../../domain/entities/CachedValue';
import { createCachedValue } from '../../domain/entities/CachedValue';
import { isValidCachedValue } from '../../domain/utils/ValidationUtils';

export interface CacheStorageOptions {
  ttl?: number;
  version?: number;
  enabled?: boolean;
}

/**
 * Handles cache storage operations with proper error handling and memory management
 */
export class CacheStorageOperations {
  private static instance: CacheStorageOperations | null = null;

  /**
   * Singleton pattern to prevent memory leaks
   */
  static getInstance(): CacheStorageOperations {
    if (!CacheStorageOperations.instance) {
      CacheStorageOperations.instance = new CacheStorageOperations();
    }
    return CacheStorageOperations.instance;
  }

  /**
   * Reset singleton instance (useful for testing)
   */
  static resetInstance(): void {
    CacheStorageOperations.instance = null;
  }

  /**
   * Load cached data from storage
   */
  async loadFromStorage<T>(
    key: string
  ): Promise<CachedValue<T> | null> {
    try {
      const result = await storageRepository.getString(key, '');

      if (result.success && result.data) {
        const parsed = JSON.parse(result.data) as unknown;

        // Runtime validation to ensure type safety
        if (isValidCachedValue(parsed)) {
          return parsed as CachedValue<T>;
        }

        return null;
      }

      return null;
    } catch (_error) {
      return null;
    }
  }

  /**
   * Save data to cache storage
   */
  async saveToStorage<T>(
    key: string,
    value: T,
    options: CacheStorageOptions = {}
  ): Promise<void> {
    const { ttl, version, enabled = true } = options;

    if (!enabled) return;

    try {
      const cached = createCachedValue(value, ttl || 0, version);
      await storageRepository.setString(key, JSON.stringify(cached));
    } catch (_error) {
      // Silent failure
    }
  }

  /**
   * Clear cached data from storage
   */
  async clearFromStorage(key: string, enabled = true): Promise<void> {
    if (!enabled) return;

    try {
      await storageRepository.removeItem(key);
    } catch (_error) {
      // Silent failure
    }
  }
}
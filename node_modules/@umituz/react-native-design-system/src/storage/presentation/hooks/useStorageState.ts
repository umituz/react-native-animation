/**
 * useStorageState Hook
 *
 * Domain-Driven Design: Presentation layer hook for state + storage sync
 * Combines React state with automatic storage persistence
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { storageRepository } from '../../infrastructure/repositories/AsyncStorageRepository';
import { unwrap } from '../../domain/entities/StorageResult';
import type { StorageKey } from '../../domain/value-objects/StorageKey';

/**
 * Storage State Hook
 * Syncs React state with AsyncStorage automatically
 *
 * @example
 * ```typescript
 * const [settings, setSettings] = useStorageState('user_settings', { theme: 'light' });
 * // State is automatically persisted to storage
 * ```
 */
export const useStorageState = <T>(
  key: string | StorageKey,
  defaultValue: T
): [T, (value: T) => Promise<void>, boolean] => {
  const keyString = typeof key === 'string' ? key : String(key);
  const [state, setState] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);
  const defaultValueRef = useRef(defaultValue);

  // Update ref when defaultValue changes
  useEffect(() => {
    defaultValueRef.current = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    isMountedRef.current = true;
    setIsLoading(true);

    storageRepository
      .getItem<T>(keyString, defaultValueRef.current)
      .then((result) => {
        if (isMountedRef.current) {
          setState(unwrap(result, defaultValueRef.current));
        }
      })
      .catch((error) => {
        // Keep defaultValue on error
        if (__DEV__) {
          console.warn('[useStorageState] Failed to load from storage:', error);
        }
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      });

    return () => {
      isMountedRef.current = false;
    };
  }, [keyString]);

  // Update state and persist to storage
  const updateState = useCallback(
    async (value: T) => {
      // Optimistic update
      const previousValue = state;
      setState(value);

      try {
        await storageRepository.setItem(keyString, value);
      } catch (error) {
        // Rollback on error
        setState(previousValue);
        if (__DEV__) {
          console.warn('[useStorageState] Failed to persist state, rolling back:', error);
        }
      }
    },
    [keyString, state]
  );

  return [state, updateState, isLoading];
};

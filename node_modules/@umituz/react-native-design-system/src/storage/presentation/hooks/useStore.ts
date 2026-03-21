/**
 * useStore Hook
 * Helper for creating stores in components
 */

import { useMemo } from 'react';
import { createStore } from '../../domain/factories/StoreFactory';
import type { StoreConfig } from '../../domain/types/Store';

export function useStore<T extends object>(config: StoreConfig<T>) {
  const stableConfig = useMemo(
    () => config,
    [config]
  );

  const store = useMemo(() => createStore(stableConfig), [stableConfig]);
  return store;
}

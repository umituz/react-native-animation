/**
 * useOfflineState Hook
 * Raw store access without NetInfo subscription
 * Use this for selectors and performance optimization
 */

import type { OfflineStore } from '../../types';
import { useOfflineStore } from '../../infrastructure/storage/OfflineStore';

export const useOfflineState = <T = OfflineStore>(
  selector?: (state: OfflineStore) => T
): T => {
  const store = useOfflineStore();
  return selector ? selector(store) : (store as T);
};

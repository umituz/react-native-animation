/**
 * useOfflineWithMutations Hook
 * Enhanced version that calls a callback when coming back online
 * Useful for syncing data or resuming operations
 */

import { useEffect, useRef, useCallback } from 'react';
import { useOffline } from './useOffline';

export const useOfflineWithMutations = (onOnline: () => Promise<void>) => {
  const offlineState = useOffline();
  const previousOnlineRef = useRef(offlineState.isOnline);
  const isProcessingRef = useRef(false);

  const handleOnlineCallback = useCallback(async () => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    try {
      if (__DEV__) {
      }
      await onOnline();
    } catch (_error) {
      if (__DEV__) {
      }
    } finally {
      isProcessingRef.current = false;
    }
  }, [onOnline]);

  useEffect(() => {
    const wasOffline = !previousOnlineRef.current;
    const isNowOnline = offlineState.isOnline;

    if (wasOffline && isNowOnline && !isProcessingRef.current) {
      handleOnlineCallback();
    }

    previousOnlineRef.current = offlineState.isOnline;
  }, [offlineState.isOnline, handleOnlineCallback]);

  return offlineState;
};

/**
 * useOffline Hook
 * Primary hook for accessing offline state in components
 * Automatically subscribes to network changes via expo-network (lazy loaded)
 */

import { useEffect, useCallback, useRef, useMemo } from 'react';
import type { NetworkState as ExpoNetworkState } from 'expo-network';
import type { NetworkState, OfflineConfig } from '../../types';
import { useOfflineStore } from '../../infrastructure/storage/OfflineStore';
import { networkEvents } from '../../infrastructure/events/NetworkEvents';
import { useOfflineConfigStore } from '../../infrastructure/storage/OfflineConfigStore';

/**
 * Lazy-load expo-network to avoid crash when native module is not available
 * (e.g. running in Expo Go without a custom dev build)
 */
let _networkModule: typeof import('expo-network') | null = null;

const getNetworkModule = (): typeof import('expo-network') | null => {
  if (_networkModule !== null) return _networkModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _networkModule = require('expo-network') as typeof import('expo-network');
    return _networkModule;
  } catch {
    return null;
  }
};

/**
 * Convert expo-network state to our internal format
 */
const toNetworkState = (state: ExpoNetworkState): NetworkState => ({
  type: state.type?.toString() ?? 'unknown',
  isConnected: state.isConnected ?? false,
  isInternetReachable: state.isInternetReachable ?? null,
  details: null,
});

export const useOffline = (config?: OfflineConfig) => {
  const store = useOfflineStore();
  const globalConfig = useOfflineConfigStore((state) => state.config);
  const isInitialized = useRef(false);
  const previousStateRef = useRef<NetworkState | null>(null);
  const isMountedRef = useRef(true);

  // Memoize merged config to prevent unnecessary effect re-runs
  const mergedConfig = useMemo(
    () => ({ ...globalConfig, ...config }),
    [globalConfig, config]
  );

  const handleNetworkStateChange = useCallback((state: ExpoNetworkState) => {
    const networkState = toNetworkState(state);
    const wasOnline = previousStateRef.current?.isConnected ?? false;
    const isNowOnline = networkState.isConnected ?? false;

    store.updateNetworkState(networkState);

    if (wasOnline !== isNowOnline) {
      if (isNowOnline) {
        networkEvents.emit('online', networkState);
      } else {
        networkEvents.emit('offline', networkState);
      }
    }

    networkEvents.emit('change', networkState);
    previousStateRef.current = networkState;
  }, [store]);

  useEffect(() => {
    if (isInitialized.current) return;

    isMountedRef.current = true;

    const Network = getNetworkModule();

    if (!Network) {
      if (__DEV__ || mergedConfig.debug) {
        console.warn('[DesignSystem] useOffline: expo-network native module not available. Network state tracking disabled.');
      }
      return;
    }

    Network.getNetworkStateAsync()
      .then((state: ExpoNetworkState) => {
        if (isMountedRef.current) {
          handleNetworkStateChange(state);
          isInitialized.current = true;
        }
      })
      .catch((_error: Error) => {
        if (isMountedRef.current && (__DEV__ || mergedConfig.debug)) {
          console.error('[DesignSystem] useOffline: Failed to get initial network state', _error);
        }
      });

    const subscription = Network.addNetworkStateListener(handleNetworkStateChange);

    return () => {
      isMountedRef.current = false;
      subscription.remove();
      isInitialized.current = false;
    };
  }, [handleNetworkStateChange, mergedConfig.debug]);

  return {
    isOnline: store.isOnline,
    isOffline: store.isOffline,
    connectionType: store.connectionType,
    isInternetReachable: store.isInternetReachable,
    lastOnlineAt: store.lastOnlineAt,
    lastOfflineAt: store.lastOfflineAt,
    connectionQuality: store.connectionQuality,
    hasConnection: store.isOnline,
    hasInternet: store.isOnline && store.isInternetReachable !== false,
  };
};

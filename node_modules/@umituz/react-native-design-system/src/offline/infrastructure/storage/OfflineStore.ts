/**
 * Offline Store
 * Manages network connectivity state across the application
 * Uses expo-network for universal network detection
 */

import { createStore } from '../../../storage';
import type { NetworkState, OfflineState, OfflineActions } from '../../types';

const initialState: OfflineState = {
  isOnline: true,
  isOffline: false,
  connectionType: null,
  isInternetReachable: null,
  lastOnlineAt: new Date(),
  lastOfflineAt: null,
  connectionQuality: {
    latency: null,
    effectiveType: null,
    isSlow: false,
  },
};

export const useOfflineStore = createStore<OfflineState, OfflineActions>({
  name: 'offline-store',
  initialState,
  persist: false,
  actions: (set, get) => ({
    updateNetworkState: (state: NetworkState) => {
      const isConnected = state.isConnected ?? false;
      const isReachable = state.isInternetReachable ?? null;
      const isOnline = isConnected && (isReachable !== false);
      const currentState = get();

      const hasChanged =
        currentState.isOnline !== isOnline ||
        currentState.connectionType !== state.type ||
        currentState.isInternetReachable !== isReachable;

      if (hasChanged) {
        set({
          isOnline,
          isOffline: !isConnected || (isReachable === false),
          connectionType: state.type,
          isInternetReachable: isReachable,
          lastOnlineAt: (isConnected && isReachable !== false) ? new Date() : currentState.lastOnlineAt,
          lastOfflineAt: (!isConnected || isReachable === false) ? new Date() : currentState.lastOfflineAt,
          connectionQuality: currentState.connectionQuality,
        });
      }
    },

    setOnline: () => {
      const currentState = get();
      if (!currentState.isOnline) {
        set({
          isOnline: true,
          isOffline: false,
          lastOnlineAt: new Date(),
          connectionQuality: currentState.connectionQuality,
        });
      }
    },

    setOffline: () => {
      const currentState = get();
      if (currentState.isOnline) {
        set({
          isOnline: false,
          isOffline: true,
          lastOfflineAt: new Date(),
          connectionQuality: currentState.connectionQuality,
        });
      }
    },

    reset: () => set(initialState),
  }),
});

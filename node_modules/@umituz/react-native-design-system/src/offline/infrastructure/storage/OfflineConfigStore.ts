/**
 * Offline Config Store
 * Centralized configuration for offline functionality
 * Replaces module-level mutable state with Zustand store
 */

import { create } from 'zustand';
import type { OfflineConfig } from '../../types';

interface OfflineConfigStore {
  config: OfflineConfig;
  setConfig: (config: OfflineConfig) => void;
  mergeConfig: (partialConfig: OfflineConfig) => void;
  reset: () => void;
}

export const useOfflineConfigStore = create<OfflineConfigStore>((set) => ({
  config: {},

  setConfig: (config) => set({ config }),

  mergeConfig: (partialConfig) => set((state) => ({
    config: { ...state.config, ...partialConfig }
  })),

  reset: () => set({ config: {} }),
}));

/**
 * Get current config (for non-React contexts)
 */
export const getOfflineConfig = (): OfflineConfig => {
  return useOfflineConfigStore.getState().config;
};

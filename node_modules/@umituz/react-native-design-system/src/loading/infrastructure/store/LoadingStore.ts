/**
 * LoadingStore
 * Global loading state management with Zustand
 */

import { create } from 'zustand';
import type { LoadingStore, LoadingSource } from '../../domain/types/loading.types';

const initialState = {
  isLoading: false,
  message: undefined,
  source: undefined,
  count: 0,
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  ...initialState,

  show: (message?: string, source: LoadingSource = 'manual') => {
    set((state) => ({
      isLoading: true,
      message: message || state.message,
      source,
      count: state.count + 1,
    }));
  },

  hide: () => {
    set((state) => {
      const newCount = Math.max(0, state.count - 1);
      return {
        count: newCount,
        isLoading: newCount > 0,
        message: newCount > 0 ? state.message : undefined,
        source: newCount > 0 ? state.source : undefined,
      };
    });
  },

  reset: () => {
    set(initialState);
  },
}));

/**
 * AsyncStorage Adapter for Zustand Persist
 * Converts AsyncStorageRepository to Zustand-compatible storage
 */

import { storageRepository } from '../../../../storage';

export const zustandStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const result = await storageRepository.getItem<string>(name, '');
      if (result.success && result.data !== undefined) {
        return result.data;
      }
      return null;
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await storageRepository.setItem(name, value);
    } catch {
      // Silent fail
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await storageRepository.removeItem(name);
    } catch {
      // Silent fail
    }
  },
};

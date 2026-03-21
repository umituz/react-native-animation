/**
 * Storage Service
 *
 * Zustand persist middleware compatible StateStorage implementation.
 * Uses AsyncStorage under the hood for React Native persistence.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from '../../domain/types/Store';

/**
 * Storage service for Zustand persist middleware
 * Direct AsyncStorage implementation with proper error handling
 */
export const storageService: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (_error) {
      return null;
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (_error) {
      // Silent failure
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (_error) {
      // Silent failure
    }
  },
};

/**
 * Theme Storage
 * Persists theme mode and custom colors using AsyncStorage
 */

import { storageRepository, unwrap } from '../../../storage';
import type { ThemeMode } from '../../core/ColorPalette';
import type { CustomThemeColors } from '../../core/CustomColors';
import { DESIGN_CONSTANTS } from '../../core/constants/DesignConstants';
import { validateCustomColors } from '../../core/CustomColors';

const MODE_KEY = `${DESIGN_CONSTANTS.STORAGE_NAMESPACE}/mode`;
const COLORS_KEY = `${DESIGN_CONSTANTS.STORAGE_NAMESPACE}/colors`;

export class ThemeStorage {
  static async getThemeMode(): Promise<ThemeMode | null> {
    try {
      const result = await storageRepository.getString(MODE_KEY, '');
      const value = unwrap(result, '');
      if (!value) return null;
      if (value === 'light' || value === 'dark') return value as ThemeMode;
      return null;
    } catch {
      return null;
    }
  }

  static async setThemeMode(mode: ThemeMode): Promise<void> {
    try {
      if (!mode || (mode !== 'light' && mode !== 'dark')) {
        throw new Error(`Invalid theme mode: ${mode}`);
      }
      await storageRepository.setString(MODE_KEY, mode);
    } catch (error) {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('Invalid theme mode')) throw error;
    }
  }

  static async clearThemeMode(): Promise<void> {
    try {
      await storageRepository.removeItem(MODE_KEY);
    } catch {
      // Silent fail
    }
  }

  static async getCustomColors(): Promise<CustomThemeColors | undefined> {
    try {
      const result = await storageRepository.getString(COLORS_KEY, '');
      const value = unwrap(result, '');
      if (!value) return undefined;

      const parsed = JSON.parse(value) as unknown;

      // Runtime validation to ensure type safety
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const customColors = parsed as CustomThemeColors;
        if (validateCustomColors(customColors)) {
          return customColors;
        }
      }

      if (__DEV__) {
      }

      return undefined;
    } catch {
      return undefined;
    }
  }

  static async setCustomColors(colors?: CustomThemeColors): Promise<void> {
    try {
      if (!colors || Object.keys(colors).length === 0) {
        await storageRepository.removeItem(COLORS_KEY);
        return;
      }
      await storageRepository.setString(COLORS_KEY, JSON.stringify(colors));
    } catch {
      // Silent fail
    }
  }

  static async clearCustomColors(): Promise<void> {
    try {
      await storageRepository.removeItem(COLORS_KEY);
    } catch {
      // Silent fail
    }
  }
}












/**
 * Theme Store - Zustand State Management
 *
 * Single source of truth for theme mode AND custom colors.
 * Uses AsyncStorage for persistence via ThemeStorage.
 */

import { createStore } from '../../../storage';
import { lightTheme, darkTheme, type Theme } from '../../core/themes';
import { ThemeStorage } from '../storage/ThemeStorage';
import type { ThemeMode } from '../../core/ColorPalette';
import type { CustomThemeColors } from '../../core/CustomColors';

/**
 * Shallow equality check for CustomThemeColors
 * Compares all defined properties without deep object traversal
 */
function areCustomColorsEqual(a?: CustomThemeColors, b?: CustomThemeColors): boolean {
  if (a === b) return true;
  if (!a || !b) return false;

  const keysA = Object.keys(a) as (keyof CustomThemeColors)[];
  const keysB = Object.keys(b) as (keyof CustomThemeColors)[];

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (a[key] !== b[key]) return false;
  }

  return true;
}

interface ThemeState {
  theme: Theme;
  themeMode: ThemeMode;
  customColors?: CustomThemeColors;
  defaultColors?: CustomThemeColors;
  defaultThemeMode: ThemeMode;
  isDark: boolean;
  isInitialized: boolean;
  _updateInProgress: boolean;
  _initInProgress: boolean;
  _lastUpdateId?: number;
}

interface ThemeActions {
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setCustomColors: (colors?: CustomThemeColors) => Promise<void>;
  setDefaultColors: (colors: CustomThemeColors) => void;
  setDefaultThemeMode: (mode: ThemeMode) => void;
  resetToDefaults: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useTheme = createStore<ThemeState, ThemeActions>({
  name: 'theme-store',
  initialState: {
    theme: darkTheme,
    themeMode: 'dark',
    customColors: undefined,
    defaultColors: undefined,
    defaultThemeMode: 'dark',
    isDark: true,
    isInitialized: false,
    _updateInProgress: false,
    _initInProgress: false,
    _lastUpdateId: undefined,
  },
  persist: false,
  actions: (set, get) => ({
    initialize: async () => {
      const { isInitialized, _initInProgress, customColors: currentColors, defaultThemeMode } = get();
      if (isInitialized || _initInProgress) return;

      set({ _initInProgress: true });

      try {
        const [savedMode, savedColors] = await Promise.all([
          ThemeStorage.getThemeMode(),
          ThemeStorage.getCustomColors(),
        ]);

        const mode = savedMode || defaultThemeMode;
        const theme = mode === 'light' ? lightTheme : darkTheme;
        // Only use savedColors if they exist, otherwise keep current (prop-based) colors
        const colors = savedColors !== undefined ? savedColors : currentColors;

        set({
          themeMode: mode,
          theme,
          customColors: colors,
          isDark: mode === 'dark',
          isInitialized: true,
        });
      } catch (error) {
        if (__DEV__) {
          console.error('[ThemeStore] Failed to initialize theme:', error);
        }
        set({ isInitialized: true, _initInProgress: false });
      } finally {
        set({ _initInProgress: false });
      }
    },

    setThemeMode: async (mode: ThemeMode) => {
      const { _updateInProgress, themeMode: currentMode } = get();
      if (_updateInProgress || mode === currentMode) return;

      const updateId = Date.now();
      set({ _updateInProgress: true, _lastUpdateId: updateId });

      try {
        const theme = mode === 'light' ? lightTheme : darkTheme;
        set({ themeMode: mode, theme, isDark: mode === 'dark' });
        await ThemeStorage.setThemeMode(mode);
      } catch (error) {
        // Revert state on error
        set({ _lastUpdateId: undefined });
        if (__DEV__) {
          console.error('[ThemeStore] Failed to set theme mode:', error);
        }
        throw error;
      } finally {
        set({ _updateInProgress: false });
      }
    },

    setCustomColors: async (colors?: CustomThemeColors) => {
      const { _updateInProgress, customColors: currentColors } = get();
      if (_updateInProgress) return;

      // Shallow comparison to avoid redundant updates from new object references
      if (areCustomColorsEqual(colors, currentColors)) return;

      const updateId = Date.now();
      set({ _updateInProgress: true, _lastUpdateId: updateId, customColors: colors });

      try {
        await ThemeStorage.setCustomColors(colors);
      } catch (error) {
        // Revert to previous colors on error
        set({ customColors: currentColors, _lastUpdateId: undefined });
        if (__DEV__) {
          console.error('[ThemeStore] Failed to set custom colors:', error);
        }
        throw error;
      } finally {
        set({ _updateInProgress: false });
      }
    },

    setDefaultColors: (colors: CustomThemeColors) => {
      set({ defaultColors: colors });
    },

    setDefaultThemeMode: (mode: ThemeMode) => {
      set({ defaultThemeMode: mode });
    },

    resetToDefaults: async () => {
      const { defaultColors, defaultThemeMode } = get();
      const theme = defaultThemeMode === 'light' ? lightTheme : darkTheme;
      set({ themeMode: defaultThemeMode, theme, isDark: defaultThemeMode === 'dark', customColors: defaultColors });
      await ThemeStorage.clearThemeMode();
      await ThemeStorage.clearCustomColors();
    },

    toggleTheme: async () => {
      const { themeMode, setThemeMode } = get();
      await setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    },
  }),
});




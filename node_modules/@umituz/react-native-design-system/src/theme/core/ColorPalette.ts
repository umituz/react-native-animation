/**
 * COLOR PALETTE - Main Export
 * 
 * Aggregates all color modules and provides theme utilities
 */

import { lightColors } from './colors/LightColors';
import { darkColors } from './colors/DarkColors';
import { withAlpha, isValidHexColor } from './colors/ColorUtils';

export type ColorPalette = typeof lightColors;
export type ThemeMode = 'light' | 'dark';

/**
 * Get color palette for specific theme mode
 * @param mode - 'light' or 'dark'
 * @returns Color palette object
 */
export const getColorPalette = (mode: ThemeMode): ColorPalette => {
  return mode === 'dark' ? darkColors : lightColors;
};

// Export all colors and utilities
export { 
  lightColors, 
  darkColors, 
  withAlpha, 
  isValidHexColor 
};
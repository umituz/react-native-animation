/**
 * Responsive Utility Functions
 *
 * Centralized responsive calculations to avoid code duplication.
 * All components should use these utilities instead of manual calculations.
 */

/**
 * Calculate responsive size from base value
 * Multiplies base size by spacingMultiplier and floors the result
 *
 * @param baseSize - Base size in pixels (e.g., 16, 24, 32)
 * @param spacingMultiplier - Multiplier from design tokens (0.9, 1.0, 1.2)
 * @returns Responsive size in pixels (floored for integer values)
 *
 * @example
 * const responsive = useResponsive();
 * const padding = calculateResponsiveSize(16, responsive.spacingMultiplier); // 14.4 → 14
 */
export const calculateResponsiveSize = (
  baseSize: number,
  spacingMultiplier: number
): number => {
  return Math.floor(baseSize * spacingMultiplier);
};

/**
 * Calculate multiple responsive sizes at once
 * Useful for component configs with multiple size properties
 *
 * @param sizes - Object with base sizes
 * @param spacingMultiplier - Multiplier from design tokens
 * @returns Object with responsive sizes
 *
 * @example
 * const baseConfig = { padding: 16, margin: 24, fontSize: 14 };
 * const responsiveConfig = calculateResponsiveSizes(baseConfig, spacingMultiplier);
 * // { padding: 14, margin: 21, fontSize: 12 }
 */
export const calculateResponsiveSizes = <T extends Record<string, number>>(
  sizes: T,
  spacingMultiplier: number
): { [K in keyof T]: number } => {
  const result = {} as { [K in keyof T]: number };

  for (const key in sizes) {
    if (Object.prototype.hasOwnProperty.call(sizes, key)) {
      result[key] = calculateResponsiveSize(sizes[key], spacingMultiplier);
    }
  }

  return result;
};

/**
 * Calculate responsive size with subtle scaling
 * For values that shouldn't scale as much (e.g., borderWidth, borderRadius)
 * Uses 0.8x of the spacing multiplier
 *
 * @param baseSize - Base size in pixels
 * @param spacingMultiplier - Multiplier from design tokens
 * @returns Responsive size with subtle scaling
 *
 * @example
 * const borderWidth = calculateResponsiveSizeSubtle(2, spacingMultiplier); // 2 → 2 (small tablets)
 */
export const calculateResponsiveSizeSubtle = (
  baseSize: number,
  spacingMultiplier: number
): number => {
  const subtleMultiplier = Math.max(1, spacingMultiplier * 0.8);
  return Math.floor(baseSize * subtleMultiplier);
};

/**
 * Calculate responsive line height from font size
 * Standard 1.5x ratio for readability
 *
 * @param fontSize - Font size in pixels
 * @param spacingMultiplier - Multiplier from design tokens
 * @returns Line height in pixels
 *
 * @example
 * const lineHeight = calculateLineHeight(16, spacingMultiplier); // 24 → 20
 */
export const calculateLineHeight = (
  fontSize: number,
  spacingMultiplier: number
): number => {
  return Math.floor(fontSize * spacingMultiplier * 1.5);
};

/**
 * Create responsive StyleSheet values
 * Converts an object with base sizes to responsive sizes
 *
 * @param baseStyles - Object with base style values
 * @param spacingMultiplier - Multiplier from design tokens
 * @returns Responsive style values
 *
 * @example
 * const baseSizes = { width: 100, height: 50, padding: 16 };
 * const responsiveSizes = createResponsiveSizes(baseSizes, spacingMultiplier);
 */
export const createResponsiveSizes = <T extends Record<string, number>>(
  baseSizes: T,
  spacingMultiplier: number
): T => {
  return calculateResponsiveSizes(baseSizes, spacingMultiplier) as T;
};

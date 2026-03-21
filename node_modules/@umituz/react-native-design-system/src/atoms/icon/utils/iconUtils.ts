/**
 * Icon Utility Functions
 * Helper functions for icon color and size calculations
 */

import type { IconColor } from '../AtomicIcon.types';
import type { DesignTokens } from '../../../theme/types/ThemeTypes';

/**
 * Maps semantic color names to actual color values from tokens
 *
 * @param color - Semantic color name
 * @param tokens - Design tokens
 * @returns Hex color string
 */
export function getSemanticColor(
  color: IconColor,
  tokens: DesignTokens
): string {
  const colorMap: Record<IconColor, string> = {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    error: tokens.colors.error,
    info: tokens.colors.info,
    onSurface: tokens.colors.onSurface,
    surfaceVariant: tokens.colors.surfaceVariant,
    onPrimary: tokens.colors.onPrimary,
    onSecondary: tokens.colors.onSecondary,
    textInverse: tokens.colors.textInverse,
    textPrimary: tokens.colors.textPrimary,
    textSecondary: tokens.colors.textSecondary,
    textTertiary: tokens.colors.textTertiary,
    onSurfaceVariant: tokens.colors.onSurfaceVariant,
  };
  return colorMap[color];
}

/**
 * Calculates icon size in pixels
 *
 * @param size - Size preset or custom size value
 * @param customSize - Custom size in pixels (overrides size)
 * @param tokens - Design tokens
 * @returns Size in pixels
 */
export function calculateIconSize(
  size: string | number,
  customSize: number | undefined,
  tokens: DesignTokens
): number {
  const baseSize = customSize ?? size;
  const iconSizesMap = tokens.iconSizes as Record<string, number>;

  return typeof baseSize === 'number'
    ? baseSize * tokens.spacingMultiplier
    : iconSizesMap[baseSize] ?? iconSizesMap['md'] ?? 24;
}

/**
 * Calculates icon color
 *
 * @param customColor - Custom color override
 * @param semanticColor - Semantic color from theme
 * @param tokens - Design tokens
 * @returns Hex color string
 */
export function calculateIconColor(
  customColor: string | undefined,
  semanticColor: IconColor | undefined,
  tokens: DesignTokens
): string {
  if (customColor) {
    return customColor;
  }

  if (semanticColor) {
    return getSemanticColor(semanticColor, tokens);
  }

  return tokens.colors.textPrimary;
}

/**
 * Calculates container size for icon with background
 *
 * @param iconSize - Icon size in pixels
 * @param padding - Padding around icon (default: 16)
 * @returns Container size
 */
export function calculateContainerSize(iconSize: number, padding: number = 16): number {
  return iconSize + padding;
}

/**
 * FAB (Floating Action Button) Styles
 *
 * Material Design 3 compliant FAB sizing and styling
 * Used by AtomicFab component
 */

import type { ViewStyle } from 'react-native';
import type { FabSizeConfig, FabVariantConfig } from '../types';
import { FAB_SIZES as BASE_FAB_SIZES } from '../../../constants';
import { calculateResponsiveSize } from '../../../responsive';

// Re-export FAB_SIZES for convenience
export const FAB_SIZES = BASE_FAB_SIZES;

/**
 * Get responsive FAB sizes based on spacing multiplier
 * @param spacingMultiplier - Spacing multiplier from design tokens
 * @returns Size configurations for sm, md, lg
 */
export function getFabSizes(spacingMultiplier: number): Record<'sm' | 'md' | 'lg', FabSizeConfig> {
  return {
    sm: {
      width: calculateResponsiveSize(BASE_FAB_SIZES.sm, spacingMultiplier),
      height: calculateResponsiveSize(BASE_FAB_SIZES.sm, spacingMultiplier),
      borderRadius: 12,
    },
    md: {
      width: calculateResponsiveSize(BASE_FAB_SIZES.md, spacingMultiplier),
      height: calculateResponsiveSize(BASE_FAB_SIZES.md, spacingMultiplier),
      borderRadius: 16,
    },
    lg: {
      width: calculateResponsiveSize(BASE_FAB_SIZES.lg, spacingMultiplier),
      height: calculateResponsiveSize(BASE_FAB_SIZES.lg, spacingMultiplier),
      borderRadius: 20,
    },
  };
}

/**
 * Get FAB variant configurations based on design tokens
 * @param tokens - Design tokens from theme
 * @returns Variant configurations for primary, secondary, and surface
 */
export function getFabVariants(tokens: {
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
    onSecondary: string;
    surface: string;
    onSurface: string;
  };
}): Record<'primary' | 'secondary' | 'surface', FabVariantConfig> {
  return {
    primary: {
      backgroundColor: tokens.colors.primary,
      iconColor: tokens.colors.onPrimary,
    },
    secondary: {
      backgroundColor: tokens.colors.secondary,
      iconColor: tokens.colors.onSecondary,
    },
    surface: {
      backgroundColor: tokens.colors.surface,
      iconColor: tokens.colors.onSurface,
    },
  };
}

/**
 * Get icon size based on FAB size
 * @param size - FAB size variant
 * @returns Icon size in pixels
 */
export function getFabIconSize(size: 'sm' | 'md' | 'lg'): number {
  switch (size) {
    case 'sm':
      return 20;
    case 'md':
      return 24;
    case 'lg':
      return 28;
    default:
      return 24;
  }
}

/**
 * Get FAB border style for depth (no shadows per CLAUDE.md)
 * @param tokens - Design tokens from theme
 * @returns Border style object
 */
export function getFabBorder(tokens: {
  colors: {
    border: string;
  };
}): ViewStyle {
  return {
    borderWidth: 1,
    borderColor: tokens.colors.border,
  };
}

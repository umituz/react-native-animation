/**
 * Typography Style Utilities
 * 
 * Helper functions for resolving typography styles from design tokens.
 * These utilities are used by components to map text style variants
 * to actual style objects from theme.
 * 
 * @fileoverview Provides typography style resolution utilities for Material Design 3
 * @author Ümit UZ <umit@umituz.com>
 * @since 1.2.0
 * @version 1.2.0
 * 
 * @example
 * ```typescript
 * import { getTextStyle } from '@umituz/react-native-design-system-typography';
 * import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
 * 
 * const MyComponent = () => {
 *   const tokens = useAppDesignTokens();
 *   const textStyle = getTextStyle('headlineLarge', tokens);
 *   return <Text style={textStyle}>Hello</Text>;
 * };
 * ```
 */

import type { TextStyle as RNTextStyle } from 'react-native';

/**
 * Basic text style interface
 * Compatible with React Native TextStyle
 */
type TextStyle = RNTextStyle;

import type { TextStyleVariant } from '../../domain/entities/TypographyTypes';
import type { DesignTokens } from '../../../theme';

// Cache for text style variant validation to improve performance
const TEXT_STYLE_VARIANT_SET = new Set<string>([
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'labelLarge',
  'labelMedium',
  'labelSmall',
]);

/**
 * Typography style mapper interface for dependency injection
 */
interface TypographyStyleMapper {
  getStyle(variant: TextStyleVariant, tokens: DesignTokens): TextStyle;
}

/**
 * Material Design 3 typography style mapper implementation
 */
class MaterialTypographyMapper implements TypographyStyleMapper {
  getStyle(variant: TextStyleVariant, tokens: DesignTokens): TextStyle {
    const style = tokens.typography[variant] || tokens.typography.bodyLarge;
    return style as TextStyle;
  }
}

// Singleton instance for performance
const typographyMapper = new MaterialTypographyMapper();

// Cache for resolved typography styles to improve performance
const typographyCache = new Map<string, TextStyle>();

/**
 * Clear typography cache
 * Useful for testing or theme changes
 */
export function clearTypographyCache(): void {
  typographyCache.clear();
}

/**
 * Get typography style from design tokens based on text style variant
 * 
 * @param variant - Text style variant
 * @param tokens - Design tokens containing typography values
 * @returns Resolved typography style object
 * 
 * @example
 * ```tsx
 * const tokens = useAppDesignTokens();
 * const textStyle = getTextStyle('headlineLarge', tokens);
 * // Returns: { fontSize: 32, fontWeight: '400' }
 * ```
 */
export function getTextStyle(
  variant: TextStyleVariant,
  tokens: DesignTokens,
): TextStyle {
  // Validate tokens parameter
  if (!tokens || !tokens.typography) {
    throw new Error('Invalid design tokens: tokens and tokens.typography are required');
  }

  // Create cache key - use hash instead of JSON.stringify to prevent memory leaks
  const cacheKey = `${variant}_${Object.keys(tokens.typography).length}_${tokens.typography.bodyLarge?.fontSize || 16}`;

  // Check cache first
  if (typographyCache.has(cacheKey)) {
    const cached = typographyCache.get(cacheKey);
    if (cached) return cached;
  }

  // Resolve style and cache it
  const resolvedStyle = typographyMapper.getStyle(variant, tokens);
  typographyCache.set(cacheKey, resolvedStyle);

  return resolvedStyle;
}

/**
 * Check if a string is a valid TextStyleVariant
 * Uses Set for O(1) lookup performance
 * 
 * @param value - String to check
 * @returns True if value is a TextStyleVariant
 */
export function isTextStyleVariant(value: string): value is TextStyleVariant {
  return TEXT_STYLE_VARIANT_SET.has(value);
}

/**
 * Get all available text style variants
 * 
 * @returns Array of all TextStyleVariant values
 */
export function getAllTextStyleVariants(): TextStyleVariant[] {
  return [
    'displayLarge',
    'displayMedium',
    'displaySmall',
    'headlineLarge',
    'headlineMedium',
    'headlineSmall',
    'titleLarge',
    'titleMedium',
    'titleSmall',
    'bodyLarge',
    'bodyMedium',
    'bodySmall',
    'labelLarge',
    'labelMedium',
    'labelSmall',
  ];
}
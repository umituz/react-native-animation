/**
 * Text Color Utilities
 *
 * Helper functions for resolving text colors from design tokens.
 */

import type { ColorVariant } from '../../domain/entities/TypographyTypes';
import type { DesignTokens } from '../../../theme';

const COLOR_VARIANT_SET = new Set<string>([
  'textPrimary', 'textSecondary', 'textTertiary', 'textDisabled', 'textInverse',
  'onSurface', 'onBackground', 'onPrimary', 'onSecondary', 'onSuccess', 'onError', 'onWarning', 'onInfo',
  'success', 'error', 'warning', 'info',
]);

const COLOR_MAP: Record<ColorVariant, keyof DesignTokens['colors']> = {
  textPrimary: 'textPrimary',
  textSecondary: 'textSecondary',
  textTertiary: 'textTertiary',
  textDisabled: 'textDisabled',
  textInverse: 'textInverse',
  onSurface: 'onSurface',
  onBackground: 'onBackground',
  onPrimary: 'onPrimary',
  onSecondary: 'onSecondary',
  onSuccess: 'onSuccess',
  onError: 'onError',
  onWarning: 'onWarning',
  onInfo: 'onInfo',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

const colorCache = new Map<string, string>();

export function clearColorCache(): void {
  colorCache.clear();
}

export function getTextColor(
  color: ColorVariant | string | undefined,
  tokens: DesignTokens,
): string {
  if (!tokens?.colors) {
    throw new Error('Invalid design tokens: tokens and tokens.colors are required');
  }

  if (!color) return tokens.colors.textPrimary;

  if (typeof color === 'string' && !isColorVariant(color)) return color;

  const cacheKey = `${color}_${Object.keys(tokens.colors).length}_${tokens.colors.textPrimary}`;

  if (colorCache.has(cacheKey)) {
    const cached = colorCache.get(cacheKey);
    if (cached) return cached;
  }

  const colorKey = COLOR_MAP[color as ColorVariant] ?? 'textPrimary';
  const resolvedColor = tokens.colors[colorKey];

  colorCache.set(cacheKey, resolvedColor);
  return resolvedColor;
}

function isColorVariant(value: string): value is ColorVariant {
  return COLOR_VARIANT_SET.has(value);
}


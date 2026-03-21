/**
 * Chip Styles
 */

import type { DesignTokens } from '../../../theme';
import type { ChipVariant } from '../types';

export const getChipBorderStyle = (
  variant: ChipVariant,
  tokens: DesignTokens,
) => {
  return {
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderRadius: tokens.borders.radius.xl,
  };
};

export const getChipSelectedStyle = (
  selected: boolean,
  tokens: DesignTokens,
) => {
  if (!selected) return {};

  return {
    borderWidth: tokens.borders.width.medium,
    borderColor: tokens.colors.primary,
  };
};

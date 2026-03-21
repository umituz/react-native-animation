/**
 * Chip Size Configuration
 */

import type { DesignTokens } from '../../../theme';
import type { ChipSize, ChipSizeConfig } from '../types';

export const getChipSizeConfig = (
  size: ChipSize,
  tokens: DesignTokens,
): ChipSizeConfig => {
  const sizeConfigs: Record<ChipSize, ChipSizeConfig> = {
    sm: {
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      fontSize: tokens.typography.bodySmall.responsiveFontSize,
      iconSize: 'xs',
    },
    md: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      fontSize: tokens.typography.bodyMedium.responsiveFontSize,
      iconSize: 'sm',
    },
    lg: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      fontSize: tokens.typography.bodyLarge.responsiveFontSize,
      iconSize: 'sm',
    },
  };

  return sizeConfigs[size];
};

/**
 * Button Size Configuration
 */

import type { DesignTokens } from '../../../theme';
import type { ButtonSize, ButtonSizeConfig } from '../types';

export const getButtonSizeConfig = (
  size: ButtonSize,
  tokens: DesignTokens,
): ButtonSizeConfig => {
  const sizeConfigs: Record<ButtonSize, ButtonSizeConfig> = {
    sm: {
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      fontSize: tokens.typography.bodySmall.responsiveFontSize,
      iconSize: 16 * tokens.spacingMultiplier,
      minHeight: 32 * tokens.spacingMultiplier,
    },
    md: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      fontSize: tokens.typography.bodyMedium.responsiveFontSize,
      iconSize: 20 * tokens.spacingMultiplier,
      minHeight: 44 * tokens.spacingMultiplier,
    },
    lg: {
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      fontSize: tokens.typography.bodyLarge.responsiveFontSize,
      iconSize: 24 * tokens.spacingMultiplier,
      minHeight: 52 * tokens.spacingMultiplier,
    },
  };

  return sizeConfigs[size];
};

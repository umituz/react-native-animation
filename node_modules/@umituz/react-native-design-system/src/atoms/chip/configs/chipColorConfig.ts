/**
 * Chip Color Configuration
 */

import type { DesignTokens } from '../../../theme';
import type { ChipColor, ChipVariant, ChipColorConfig } from '../types';

export const getChipColorConfig = (
  color: ChipColor,
  variant: ChipVariant,
  tokens: DesignTokens,
): ChipColorConfig => {
  const colorMap: Record<ChipColor, Record<ChipVariant, ChipColorConfig>> = {
    primary: {
      filled: { bg: tokens.colors.primary, text: tokens.colors.onPrimary, border: tokens.colors.primary },
      outlined: { bg: undefined, text: tokens.colors.primary, border: tokens.colors.primary },
      soft: { bg: tokens.colors.primaryContainer, text: tokens.colors.onPrimaryContainer, border: undefined },
    },
    secondary: {
      filled: { bg: tokens.colors.secondary, text: tokens.colors.onSecondary, border: tokens.colors.secondary },
      outlined: { bg: undefined, text: tokens.colors.secondary, border: tokens.colors.secondary },
      soft: { bg: tokens.colors.secondaryContainer, text: tokens.colors.onSecondaryContainer, border: undefined },
    },
    success: {
      filled: { bg: tokens.colors.success, text: tokens.colors.onSuccess, border: tokens.colors.success },
      outlined: { bg: undefined, text: tokens.colors.success, border: tokens.colors.success },
      soft: { bg: tokens.colors.successContainer, text: tokens.colors.onSuccessContainer, border: undefined },
    },
    warning: {
      filled: { bg: tokens.colors.warning, text: tokens.colors.onWarning, border: tokens.colors.warning },
      outlined: { bg: undefined, text: tokens.colors.warning, border: tokens.colors.warning },
      soft: { bg: tokens.colors.warningContainer, text: tokens.colors.onWarningContainer, border: undefined },
    },
    error: {
      filled: { bg: tokens.colors.error, text: tokens.colors.onError, border: tokens.colors.error },
      outlined: { bg: undefined, text: tokens.colors.error, border: tokens.colors.error },
      soft: { bg: tokens.colors.errorContainer, text: tokens.colors.onErrorContainer, border: undefined },
    },
    info: {
      filled: { bg: tokens.colors.info, text: tokens.colors.onInfo, border: tokens.colors.info },
      outlined: { bg: undefined, text: tokens.colors.info, border: tokens.colors.info },
      soft: { bg: tokens.colors.infoContainer, text: tokens.colors.onInfoContainer, border: undefined },
    },
  };

  return colorMap[color][variant];
};

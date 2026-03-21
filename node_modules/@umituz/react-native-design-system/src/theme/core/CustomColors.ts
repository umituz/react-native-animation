/**
 * Custom Colors Types
 *
 * Types for custom theme color overrides
 */

import type { ColorPalette } from './ColorPalette';
import { isValidHexColor } from './colors/ColorUtils';

export interface CustomThemeColors {
  primary?: string;
  primaryLight?: string;
  primaryDark?: string;
  secondary?: string;
  secondaryLight?: string;
  secondaryDark?: string;
  accent?: string;
  accentLight?: string;
  accentDark?: string;
  onPrimary?: string;
  onSecondary?: string;
  onSuccess?: string;
  onError?: string;
  onWarning?: string;
  onInfo?: string;
  onSurface?: string;
  onBackground?: string;
  onSurfaceDisabled?: string;
  onSurfaceVariant?: string;
  primaryContainer?: string;
  onPrimaryContainer?: string;
  secondaryContainer?: string;
  onSecondaryContainer?: string;
  errorContainer?: string;
  onErrorContainer?: string;
  outline?: string;
  outlineVariant?: string;
  outlineDisabled?: string;
  success?: string;
  successLight?: string;
  successDark?: string;
  error?: string;
  errorLight?: string;
  errorDark?: string;
  warning?: string;
  warningLight?: string;
  warningDark?: string;
  info?: string;
  infoLight?: string;
  infoDark?: string;
  successContainer?: string;
  onSuccessContainer?: string;
  warningContainer?: string;
  onWarningContainer?: string;
  infoContainer?: string;
  onInfoContainer?: string;
  backgroundPrimary?: string;
  backgroundSecondary?: string;
  surface?: string;
  surfaceVariant?: string;
  surfaceSecondary?: string;
  surfaceDisabled?: string;
  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
  textDisabled?: string;
  textInverse?: string;
  border?: string;
  borderLight?: string;
  borderMedium?: string;
  borderFocus?: string;
  borderDisabled?: string;
  buttonPrimary?: string;
  buttonSecondary?: string;
  inputBackground?: string;
  inputBorder?: string;
  cardBackground?: string;
  transparent?: string;
  black?: string;
  white?: string;
  modalOverlay?: string;
}

export const validateCustomColors = (customColors: CustomThemeColors): boolean => {
  const colorValues = Object.values(customColors).filter(Boolean) as string[];
  return colorValues.every((color) => isValidHexColor(color));
};

export const applyCustomColors = (
  palette: ColorPalette,
  customColors?: CustomThemeColors,
): ColorPalette => {
  if (!customColors) return palette;

  if (!validateCustomColors(customColors)) {
    return palette;
  }

  const result: Partial<ColorPalette> = { ...palette };

  for (const [key, value] of Object.entries(customColors)) {
    if (value !== undefined) {
      (result as Record<string, string>)[key] = value;
    }
  }

  return result as ColorPalette;
};

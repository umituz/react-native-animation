/**
 * Picker Option Styles
 */

import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';

export const getOptionContainerStyles = (
  tokens: DesignTokens,
  selected: boolean,
  disabled: boolean
): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: tokens.spacing.md,
  paddingVertical: tokens.spacing.md,
  gap: tokens.spacing.md,
  backgroundColor: selected ? tokens.colors.surfaceVariant : 'transparent',
  opacity: disabled ? tokens.opacity.disabled : 1,
});

export const getOptionTextStyles = (tokens: DesignTokens, selected: boolean): TextStyle => ({
  fontSize: tokens.typography.bodyLarge.responsiveFontSize,
  color: selected ? tokens.colors.primary : tokens.colors.onSurface,
  fontWeight: selected ? '600' : '400',
});

export const getOptionDescriptionStyles = (tokens: DesignTokens): TextStyle => ({
  fontSize: tokens.typography.bodySmall.responsiveFontSize,
  color: tokens.colors.textSecondary,
  marginTop: tokens.spacing.xs,
});

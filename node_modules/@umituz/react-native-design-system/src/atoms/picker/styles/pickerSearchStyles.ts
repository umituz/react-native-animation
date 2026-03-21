/**
 * Picker Search Styles
 */

import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';

export const getSearchContainerStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: tokens.colors.surfaceVariant,
  borderRadius: tokens.borders.radius.md,
  marginHorizontal: tokens.spacing.md,
  marginVertical: tokens.spacing.sm,
  paddingHorizontal: tokens.spacing.md,
  paddingVertical: tokens.spacing.sm,
  gap: tokens.spacing.sm,
});

export const getSearchInputStyles = (tokens: DesignTokens): TextStyle => ({
  flex: 1,
  fontSize: tokens.typography.bodyMedium.responsiveFontSize,
  color: tokens.colors.onSurface,
  paddingVertical: 0,
});

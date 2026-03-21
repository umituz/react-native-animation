/**
 * Picker Empty State & Chip Styles
 */

import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';

export const getEmptyStateStyles = (tokens: DesignTokens): ViewStyle => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: tokens.spacing.xl,
  gap: tokens.spacing.md,
});

export const getEmptyStateTextStyles = (tokens: DesignTokens): TextStyle => ({
  fontSize: tokens.typography.bodyMedium.responsiveFontSize,
  color: tokens.colors.textSecondary,
  textAlign: 'center',
});

export const getChipContainerStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: tokens.spacing.xs,
  marginTop: tokens.spacing.sm,
});

export const getChipStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: tokens.colors.surfaceVariant,
  borderRadius: tokens.borders.radius.full,
  paddingHorizontal: tokens.spacing.sm,
  paddingVertical: tokens.spacing.xs,
  gap: tokens.spacing.xs,
});

export const getChipTextStyles = (tokens: DesignTokens): TextStyle => ({
  fontSize: tokens.typography.bodySmall.responsiveFontSize,
  color: tokens.colors.onSurface,
});

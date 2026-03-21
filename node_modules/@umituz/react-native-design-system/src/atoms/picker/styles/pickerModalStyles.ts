/**
 * Picker Modal Styles
 */

import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';

export const getModalOverlayStyles = (): ViewStyle => ({
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'flex-end',
});

export const getModalContainerStyles = (tokens: DesignTokens, bottomInset: number): ViewStyle => ({
  backgroundColor: tokens.colors.surface,
  borderTopLeftRadius: tokens.borders.radius.lg,
  borderTopRightRadius: tokens.borders.radius.lg,
  maxHeight: '80%',
  paddingBottom: bottomInset,
});

export const getModalHeaderStyles = (tokens: DesignTokens): ViewStyle => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: tokens.spacing.md,
  paddingVertical: tokens.spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: tokens.colors.outline,
});

export const getModalTitleStyles = (tokens: DesignTokens): TextStyle => ({
  fontSize: tokens.typography.titleLarge.responsiveFontSize,
  fontWeight: '600',
  color: tokens.colors.onSurface,
});

/**
 * Text Styles
 */

import type { TextStyle } from 'react-native';
import type { DesignTokens } from '../../types/ThemeTypes';

export const createTextStyles = (tokens: DesignTokens) => ({
  screenTitle: {
    ...tokens.typography.headlineLarge,
    fontWeight: tokens.typography.bold,
    color: tokens.colors.textPrimary,
    marginBottom: tokens.spacing.sm,
  } as TextStyle,

  sectionTitle: {
    ...tokens.typography.headlineSmall,
    fontWeight: tokens.typography.semibold,
    color: tokens.colors.textPrimary,
    marginBottom: tokens.spacing.md,
  } as TextStyle,

  subtitle: {
    ...tokens.typography.bodyMedium,
    color: tokens.colors.textSecondary,
    textAlign: 'center',
  } as TextStyle,

  bodyText: {
    ...tokens.typography.bodyMedium,
    color: tokens.colors.textPrimary,
  } as TextStyle,

  secondaryText: {
    ...tokens.typography.bodySmall,
    color: tokens.colors.textSecondary,
  } as TextStyle,
});

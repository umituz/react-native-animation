/**
 * DatePicker Styles
 * StyleSheet generator for AtomicDatePicker component
 */

import { StyleSheet } from 'react-native';
import type { DesignTokens } from '../../../theme';

export const getDatePickerStyles = (tokens: DesignTokens) => {
  return StyleSheet.create({
    container: {
      marginBottom: tokens.spacing.md,
    },
    label: {
      fontSize: tokens.typography.bodyMedium.responsiveFontSize,
      fontWeight: tokens.typography.semibold,
      color: tokens.colors.onSurface,
      marginBottom: tokens.spacing.sm,
    },
    errorText: {
      fontSize: tokens.typography.bodySmall.responsiveFontSize,
      color: tokens.colors.error,
      marginTop: tokens.spacing.xs,
      marginLeft: tokens.spacing.xs,
    },
  });
};

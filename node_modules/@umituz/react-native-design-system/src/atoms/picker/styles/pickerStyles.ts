/**
 * AtomicPicker Styles
 */
import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';

export type PickerSize = 'sm' | 'md' | 'lg';

export interface PickerContainerStyles {
  base: ViewStyle;
  size: Record<PickerSize, ViewStyle>;
  state: {
    error: ViewStyle;
    disabled: ViewStyle;
  };
}

export interface PickerLabelStyles {
  base: TextStyle;
  size: Record<PickerSize, TextStyle>;
}

export interface PickerValueStyles {
  base: TextStyle;
  size: Record<PickerSize, TextStyle>;
}

export interface PickerPlaceholderStyles {
  base: TextStyle;
  size: Record<PickerSize, TextStyle>;
}

export const getPickerContainerStyles = (tokens: DesignTokens): PickerContainerStyles => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: tokens.colors.outline,
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borders.radius.md,
  },
  size: {
    sm: {
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      minHeight: 36 * tokens.spacingMultiplier,
    },
    md: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      minHeight: 48 * tokens.spacingMultiplier,
    },
    lg: {
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.md,
      minHeight: 56 * tokens.spacingMultiplier,
    },
  },
  state: {
    error: {
      borderColor: tokens.colors.error,
    },
    disabled: {
      opacity: tokens.opacity.disabled,
    },
  },
});

export const getPickerLabelStyles = (tokens: DesignTokens): PickerLabelStyles => ({
  base: {
    color: tokens.colors.textPrimary,
    marginBottom: tokens.spacing.xs,
  },
  size: {
    sm: { fontSize: tokens.typography.bodySmall.responsiveFontSize },
    md: { fontSize: tokens.typography.bodyMedium.responsiveFontSize },
    lg: { fontSize: tokens.typography.bodyLarge.responsiveFontSize },
  },
});

export const getPickerValueStyles = (tokens: DesignTokens): PickerValueStyles => ({
  base: {
    color: tokens.colors.textPrimary,
    flex: 1,
  },
  size: {
    sm: { fontSize: tokens.typography.bodySmall.responsiveFontSize },
    md: { fontSize: tokens.typography.bodyMedium.responsiveFontSize },
    lg: { fontSize: tokens.typography.bodyLarge.responsiveFontSize },
  },
});

export const getPickerPlaceholderStyles = (tokens: DesignTokens): PickerPlaceholderStyles => ({
  base: {
    color: tokens.colors.textTertiary,
    flex: 1,
  },
  size: {
    sm: { fontSize: tokens.typography.bodySmall.responsiveFontSize },
    md: { fontSize: tokens.typography.bodyMedium.responsiveFontSize },
    lg: { fontSize: tokens.typography.bodyLarge.responsiveFontSize },
  },
});

export const getPickerErrorStyles = (tokens: DesignTokens): TextStyle => ({
  color: tokens.colors.error,
  fontSize: tokens.typography.bodySmall.responsiveFontSize,
  marginTop: tokens.spacing.xs,
});

// Re-export modal, search, option, and chip styles
export * from './pickerModalStyles';
export * from './pickerSearchStyles';
export * from './pickerOptionStyles';
export * from './pickerStateStyles';


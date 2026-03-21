/**
 * ConfirmationModal Style Utilities
 *
 * Styling functions for confirmation modal component
 */

import { ViewStyle } from 'react-native';
import { ConfirmationModalVariant, ConfirmationModalVariantConfig } from '../types';
import type { DesignTokens } from '../../../theme';

/**
 * Get variant configuration (icon and color only)
 * Note: Confirm text is handled in component with translations
 */
export const getVariantConfig = (
  variant: ConfirmationModalVariant
): Omit<ConfirmationModalVariantConfig, 'confirmText'> => {
  switch (variant) {
    case 'destructive':
      return {
        icon: 'warning',
        iconColor: 'error',
      };
    case 'warning':
      return {
        icon: 'warning',
        iconColor: 'warning',
      };
    case 'success':
      return {
        icon: 'checkmark-circle-outline',
        iconColor: 'success',
      };
    case 'default':
    default:
      return {
        icon: 'help-circle',
        iconColor: 'primary',
      };
  }
};

/**
 * Get modal overlay style
 */
export const getModalOverlayStyle = (): ViewStyle => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

/**
 * Get backdrop style (invisible layer for dismissing)
 */
export const getBackdropStyle = (): ViewStyle => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

/**
 * Get modal container style
 */
export const getModalContainerStyle = (tokens: DesignTokens): ViewStyle => ({
  width: '85%',
  maxWidth: 400,
  backgroundColor: tokens.colors.surface,
  borderRadius: 16,
  padding: 24,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: tokens.colors.outline,
});

/**
 * Get icon container style
 */
export const getIconContainerStyle = (): ViewStyle => ({
  marginBottom: 16,
});

/**
 * Get title container style
 */
export const getTitleContainerStyle = (): ViewStyle => ({
  marginBottom: 8,
});

/**
 * Get message container style
 */
export const getMessageContainerStyle = (): ViewStyle => ({
  marginBottom: 24,
});

/**
 * Get button container style
 */
export const getButtonContainerStyle = (): ViewStyle => ({
  flexDirection: 'row',
  gap: 12,
  width: '100%',
});

/**
 * Get button style
 */
export const getButtonStyle = (): ViewStyle => ({
  flex: 1,
});

/**
 * Get confirm button variant based on modal variant
 */
export const getConfirmButtonVariant = (
  variant: ConfirmationModalVariant
): 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' => {
  switch (variant) {
    case 'destructive':
      return 'primary'; // Will use error color
    case 'warning':
      return 'primary'; // Will use warning color
    case 'success':
      return 'primary'; // Will use success color
    case 'default':
    default:
      return 'primary';
  }
};

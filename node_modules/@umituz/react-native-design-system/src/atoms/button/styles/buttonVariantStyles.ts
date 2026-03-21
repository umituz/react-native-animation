/**
 * Button Variant Styles
 */

import type { DesignTokens } from '../../../theme';
import type { ButtonVariant, ButtonVariantStyles } from '../types';

export const getVariantStyles = (
  variant: ButtonVariant,
  tokens: DesignTokens,
): ButtonVariantStyles => {
  const baseStyle = {
    backgroundColor: tokens.colors.primary,
    borderWidth: 0,
  };

  switch (variant) {
    case 'primary':
      return {
        container: {
          ...baseStyle,
          backgroundColor: tokens.colors.primary,
        },
        text: {
          color: tokens.colors.onPrimary,
        },
      };

    case 'secondary':
      return {
        container: {
          ...baseStyle,
          backgroundColor: tokens.colors.surfaceSecondary,
        },
        text: {
          color: tokens.colors.textPrimary,
        },
      };

    case 'outline':
      return {
        container: {
          backgroundColor: undefined,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        },
        text: {
          color: tokens.colors.textPrimary,
        },
      };

    case 'text':
      return {
        container: {
          backgroundColor: undefined,
        },
        text: {
          color: tokens.colors.primary,
        },
      };

    case 'danger':
      return {
        container: {
          ...baseStyle,
          backgroundColor: tokens.colors.error,
        },
        text: {
          color: tokens.colors.onError,
        },
      };

    default:
      return {
        container: baseStyle,
        text: {
          color: tokens.colors.onPrimary,
        },
      };
  }
};

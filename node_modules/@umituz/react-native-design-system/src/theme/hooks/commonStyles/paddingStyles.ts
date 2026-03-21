/**
 * Padding Styles
 */

import type { ViewStyle } from 'react-native';
import type { DesignTokens } from '../../types/ThemeTypes';

export const createPaddingStyles = (tokens: DesignTokens) => ({
  paddedHorizontal: {
    paddingHorizontal: tokens.spacing.lg,
  } as ViewStyle,

  paddedVertical: {
    paddingVertical: tokens.spacing.lg,
  } as ViewStyle,

  padded: {
    padding: tokens.spacing.lg,
  } as ViewStyle,
});

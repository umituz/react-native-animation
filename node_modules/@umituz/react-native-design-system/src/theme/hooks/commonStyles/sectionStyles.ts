/**
 * Section Styles
 */

import type { ViewStyle } from 'react-native';
import type { DesignTokens } from '../../types/ThemeTypes';

export const createSectionStyles = (tokens: DesignTokens) => ({
  section: {
    marginBottom: tokens.spacing.xl,
  } as ViewStyle,

  sectionPadded: {
    marginBottom: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.lg,
  } as ViewStyle,
});

/**
 * Scroll Container Styles
 */

import type { ViewStyle } from 'react-native';
import type { DesignTokens } from '../../types/ThemeTypes';

export const createScrollContainerStyles = (tokens: DesignTokens) => ({
  scrollView: {
    flex: 1,
  } as ViewStyle,

  scrollContent: {
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.xl,
  } as ViewStyle,

  scrollContentGrow: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
  } as ViewStyle,

  scrollContentCentered: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    justifyContent: 'center',
  } as ViewStyle,
});

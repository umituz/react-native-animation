/**
 * Screen Container Styles
 */

import type { ViewStyle } from 'react-native';
import type { DesignTokens } from '../../types/ThemeTypes';

export const createScreenContainerStyles = (tokens: DesignTokens) => ({
  screenContainer: {
    flex: 1,
    backgroundColor: tokens.colors.backgroundPrimary,
  } as ViewStyle,

  flexContainer: {
    flex: 1,
  } as ViewStyle,

  screenContainerSecondary: {
    flex: 1,
    backgroundColor: tokens.colors.backgroundSecondary,
  } as ViewStyle,
});

/**
 * Screen Options Creator
 * Creates React Navigation screen options with design tokens
 * Used by all packages for consistent navigation headers
 */

import type { StackNavigationOptions } from '@react-navigation/stack';

export interface ScreenOptionsParams {
  colors: {
    surface: string;
    textPrimary: string;
    borderLight: string;
  };
  backTitle?: string;
}

/**
 * Creates standard screen options for React Navigation
 * @param params - Design tokens and back title
 * @returns React Navigation screen options
 */
export const createScreenOptions = (params: ScreenOptionsParams): StackNavigationOptions => {
  const { colors, backTitle } = params;

  return {
    headerStyle: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.borderLight,
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    headerTitleAlign: 'left',
    headerTintColor: colors.textPrimary,
    ...(backTitle && {
      headerBackTitle: backTitle,
      headerBackTitleStyle: {
        fontSize: 16,
        color: colors.textPrimary,
      },
    }),
  };
};

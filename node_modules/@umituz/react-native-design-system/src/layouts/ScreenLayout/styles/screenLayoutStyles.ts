/**
 * ScreenLayout Styles
 */

import { StyleSheet } from 'react-native';

export interface ScreenLayoutStylesConfig {
  readonly maxWidth?: number;
  readonly horizontalPadding: number;
  readonly verticalPadding: number;
}

export const getScreenLayoutStyles = (
  config: ScreenLayoutStylesConfig,
) => {
  const { maxWidth, horizontalPadding, verticalPadding } = config;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    responsiveWrapper: {
      flex: 1,
      width: '100%',
      ...(maxWidth ? { maxWidth, alignSelf: 'center' as const } : {}),
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: verticalPadding,
      paddingHorizontal: horizontalPadding,
      paddingBottom: verticalPadding,
    },
  });
};

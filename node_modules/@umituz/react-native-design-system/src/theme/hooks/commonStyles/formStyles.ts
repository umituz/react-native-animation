/**
 * Form Styles
 */

import type { ViewStyle } from 'react-native';
import type { DesignTokens } from '../../types/ThemeTypes';

export const createFormStyles = (tokens: DesignTokens) => ({
  form: {
    width: '100%',
  } as ViewStyle,

  formHeader: {
    alignItems: 'center',
    marginBottom: tokens.spacing.xl,
  } as ViewStyle,
});

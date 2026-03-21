/**
 * BORDER TOKENS
 * 
 * Border radius, width, and component-specific border styles
 */

import type { ViewStyle } from 'react-native';
import type { Borders } from './BaseTokens';
import { DESIGN_CONSTANTS } from '../constants/DesignConstants';

export const borders: Borders = {
  radius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: DESIGN_CONSTANTS.FULL_BORDER_RADIUS,
  },
  width: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 4,
  },
  button: {
    borderRadius: 12,
    borderWidth: 0,
  } as ViewStyle,
  card: {
    borderRadius: 16,
    borderWidth: 1,
  } as ViewStyle,
  input: {
    borderRadius: 8,
    borderWidth: 1,
  } as ViewStyle,
  pill: {
    borderRadius: DESIGN_CONSTANTS.FULL_BORDER_RADIUS,
    borderWidth: 0,
  } as ViewStyle,
};
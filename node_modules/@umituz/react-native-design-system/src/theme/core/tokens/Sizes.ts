/**
 * SIZE TOKENS
 * 
 * Icon sizes, opacity levels, avatar sizes, and component dimensions
 */

import type { IconSizes, Opacity, AvatarSizes, ComponentSizes } from './BaseTokens';
import { DESIGN_CONSTANTS } from '../constants/DesignConstants';

export const iconSizes: IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  hero: 64,
};

export const opacity: Opacity = {
  disabled: 0.6,
  inactive: 0.7,
  subtle: 0.8,
  medium: 0.9,
  full: 1.0,
};

export const avatarSizes: AvatarSizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  xxl: 80,
};

export const sizes: ComponentSizes = {
  touchTarget: DESIGN_CONSTANTS.MINIMUM_TOUCH_TARGET,
  progressBar: {
    normal: 4,
    thick: 8,
  },
  dot: {
    active: 12,
    inactive: 8,
  },
  buttonHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },
};
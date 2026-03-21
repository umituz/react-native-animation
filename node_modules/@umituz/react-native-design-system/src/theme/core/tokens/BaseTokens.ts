/**
 * BASE TOKENS - Type Definitions
 * 
 * Type definitions for all static design tokens
 */

import type { TextStyle, ViewStyle } from 'react-native';

export type Spacing = {
  // Base Spacing Scale
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;

  // Semantic Spacing
  screenPadding: number;
  cardPadding: number;
  buttonPadding: number;
  inputPadding: number;
  sectionSpacing: number;

  // Icon Sizes
  iconSizeSmall: number;
  iconSizeMedium: number;
  iconSizeLarge: number;
  iconSizeXLarge: number;
  iconSizeHero: number;

  // Component Heights
  buttonHeight: number;
  inputHeight: number;
  appBarHeight: number;
  tabBarHeight: number;
};

export type Typography = {
  displayLarge: TextStyle;
  displayMedium: TextStyle;
  displaySmall: TextStyle;
  headlineLarge: TextStyle;
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  titleSmall: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  labelSmall: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  overline: TextStyle;
  // Font weight helpers (for inline fontWeight usage)
  semibold: '600';
  medium: '500';
  bold: '700';
};

export type Borders = {
  radius: {
    none: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    full: number;
  };
  width: {
    none: number;
    thin: number;
    medium: number;
    thick: number;
  };
  button: ViewStyle;
  card: ViewStyle;
  input: ViewStyle;
  pill: ViewStyle;
};

export type IconSizes = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  hero: number;
};

export type Opacity = {
  disabled: number;
  inactive: number;
  subtle: number;
  medium: number;
  full: number;
};

export type AvatarSizes = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type ComponentSizes = {
  touchTarget: number;
  progressBar: {
    normal: number;
    thick: number;
  };
  dot: {
    active: number;
    inactive: number;
  };
  buttonHeight: {
    sm: number;
    md: number;
    lg: number;
  };
};

export type BaseTokens = {
  spacing: Spacing;
  typography: Typography;
  borders: Borders;
  iconSizes: IconSizes;
  opacity: Opacity;
  avatarSizes: AvatarSizes;
  sizes: ComponentSizes;
};
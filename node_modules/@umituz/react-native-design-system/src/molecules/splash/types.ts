/**
 * Splash Screen Types
 * All type definitions for the splash screen package
 */

import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import type { ReactNode } from "react";

/**
 * Splash screen color configuration
 * All colors should be provided by the main app via design tokens
 */
export interface SplashColors {
  /** Background color */
  background: string;
  /** Text color for app name and tagline */
  text: string;
  /** Background color for icon placeholder circle */
  iconPlaceholder?: string;
}

/**
 * Custom colors for SplashThemeProvider
 */
export interface SplashCustomColors {
  /** Text color for app name and tagline */
  textColor: string;
  /** Background color */
  backgroundColor?: string;
  /** Background color for icon placeholder circle */
  iconPlaceholderColor?: string;
}

/**
 * SplashThemeProvider props
 */
export interface SplashThemeProviderProps {
  /** Children components */
  children: ReactNode;

  /** Custom color configuration */
  customColors?: SplashCustomColors;
}

/**
 * Splash theme context value
 */
export interface SplashThemeContextValue {
  /** Resolved colors for splash screen */
  colors: SplashColors;

}

/**
 * Splash screen component props
 * Can be used standalone with colors prop or with SplashThemeProvider
 */
export interface SplashScreenProps {
  /** App name to display */
  appName?: string;

  /** Tagline or subtitle */
  tagline?: string;

  /** App icon/logo image source */
  icon?: ImageSourcePropType;

  /**
   * Color configuration (optional - uses design tokens by default)
   *
   * If not provided, colors will be automatically derived from the current theme:
   * - Light mode: dark text on light background
   * - Dark mode: light text on dark background
   *
   * @example
   * // Auto theme-aware (recommended)
   * <SplashScreen appName="MyApp" icon={icon} />
   *
   * // Custom colors
   * <SplashScreen
   *   appName="MyApp"
   *   icon={icon}
   *   colors={{ background: '#FF0000', text: '#FFFFFF' }}
   * />
   */
  colors?: SplashColors;



  /** Control visibility */
  visible?: boolean;

  /** Maximum duration before timeout callback */
  maxDuration?: number;

  /** Callback when max duration is reached */
  onTimeout?: () => void;

  /** Callback when splash is ready/mounted */
  onReady?: () => void;

  /** Additional container style */
  style?: StyleProp<ViewStyle>;
}

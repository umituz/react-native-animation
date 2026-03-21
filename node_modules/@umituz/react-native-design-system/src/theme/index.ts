/**
 * @umituz/react-native-design-system-theme - Public API
 *
 * Theme management system for React Native apps
 * Provides colors, design tokens, and theme state management
 *
 * Usage:
 *   import { useAppDesignTokens, useDesignSystemTheme, lightColors, darkColors } from '@umituz/react-native-design-system-theme';
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export {
  lightColors,
  darkColors,
  getColorPalette,
  withAlpha,
  type ColorPalette,
  type ThemeMode,
} from './core/ColorPalette';

export {
  applyCustomColors,
  type CustomThemeColors,
} from './core/CustomColors';

// =============================================================================
// BASE TOKENS - Static Design Tokens
// =============================================================================

export {
  BASE_TOKENS,
  spacing,
  typography,
  borders,
  type Spacing,
  type Typography,
  type Borders,
  type BaseTokens,
  type IconSizes,
  type Opacity,
  type AvatarSizes,
  type ComponentSizes,
} from './core/BaseTokens';

// =============================================================================
// TOKEN FACTORY
// =============================================================================

export {
  createDesignTokens,
} from './core/TokenFactory';

export type {
  DesignTokens,
  ResponsiveSpacing,
  ResponsiveTypography,
  ResponsiveBorderRadius,
} from './types/ThemeTypes';

// =============================================================================
// HOOKS
// =============================================================================

export { useAppDesignTokens } from './hooks/useAppDesignTokens';
// Alias for backward compatibility - useTheme is now the single source of truth
export { useTheme as useDesignSystemTheme } from './infrastructure/stores/themeStore';
export { useTheme } from './infrastructure/stores/themeStore';
export { useThemedStyles, useThemedStyleSheet } from './hooks/useThemedStyles';
export { useCommonStyles } from './hooks/useCommonStyles';

// =============================================================================
// PROVIDER
// =============================================================================

export { DesignSystemProvider } from './infrastructure/providers/DesignSystemProvider';

// =============================================================================
// THEME OBJECTS
// =============================================================================

export {
  lightTheme,
  darkTheme,
  createResponsiveValue,
  type Theme,
} from './core/themes';

// =============================================================================
// STORAGE
// =============================================================================

export { ThemeStorage } from './infrastructure/storage/ThemeStorage';

// =============================================================================
// NAVIGATION THEME
// =============================================================================

export {
  createNavigationTheme,
  type NavigationTheme,
} from './core/NavigationTheme';


import { type TextStyle } from 'react-native';
import { type ColorPalette, type ThemeMode } from '../core/ColorPalette';
import { type BaseTokens, type Spacing, type Typography, type Borders } from '../core/tokens/BaseTokens';

/**
 * Responsive Spacing Type
 */
export type ResponsiveSpacing = Spacing;

/**
 * Responsive Border Radius Type
 */
export type ResponsiveBorderRadius = Borders['radius'];

/**
 * Responsive Typography Type
 */
export type ResponsiveTypography = Typography & {
  displayLarge: TextStyle & { responsiveFontSize: number };
  displayMedium: TextStyle & { responsiveFontSize: number };
  displaySmall: TextStyle & { responsiveFontSize: number };
  headlineLarge: TextStyle & { responsiveFontSize: number };
  headlineMedium: TextStyle & { responsiveFontSize: number };
  headlineSmall: TextStyle & { responsiveFontSize: number };
  titleLarge: TextStyle & { responsiveFontSize: number };
  titleMedium: TextStyle & { responsiveFontSize: number };
  titleSmall: TextStyle & { responsiveFontSize: number };
  bodyLarge: TextStyle & { responsiveFontSize: number };
  bodyMedium: TextStyle & { responsiveFontSize: number };
  bodySmall: TextStyle & { responsiveFontSize: number };
  labelLarge: TextStyle & { responsiveFontSize: number };
  labelMedium: TextStyle & { responsiveFontSize: number };
  labelSmall: TextStyle & { responsiveFontSize: number };
};

/**
 * Combined Design Tokens Type
 * Now responsive by default
 */
export type DesignTokens = {
  colors: ColorPalette;
  spacing: ResponsiveSpacing;
  typography: ResponsiveTypography;
  iconSizes: BaseTokens['iconSizes'];
  opacity: BaseTokens['opacity'];
  avatarSizes: BaseTokens['avatarSizes'];
  radius: ResponsiveBorderRadius;
  borderRadius: ResponsiveBorderRadius;
  borders: Borders & {
    card: Borders['card'] & { borderColor: string };
    input: Borders['input'] & { borderColor: string };
  };

  // Responsive metadata
  spacingMultiplier: number;

  // Base tokens for reference if needed
  baseSpacing: Spacing;
  baseTypography: Typography;
  baseBorderRadius: Borders['radius'];
};

export type { ThemeMode };

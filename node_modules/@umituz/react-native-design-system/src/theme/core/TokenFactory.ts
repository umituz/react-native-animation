import { BASE_TOKENS } from './BaseTokens';
import { getColorPalette, withAlpha, type ThemeMode, type ColorPalette } from './ColorPalette';
import { applyCustomColors, type CustomThemeColors } from './CustomColors';
import { type DesignTokens, type ResponsiveTypography } from '../types/ThemeTypes';

/**
 * Create complete design tokens for a specific theme mode
 *
 * @param mode - Theme mode ('light' or 'dark')
 * @param customColors - Optional custom colors to override default colors
 * @param multiplier - Device-based spacing multiplier
 * @param getFontSize - Function to get responsive font size
 * @returns Complete responsive design tokens object
 */
export const createDesignTokens = (
  mode: ThemeMode,
  customColors?: CustomThemeColors,
  multiplier: number = 1,
  getFontSize: (size: number) => number = (s) => s,
): DesignTokens => {
  const baseColors = getColorPalette(mode);
  const colors = applyCustomColors(baseColors, customColors);

  // Responsive Spacing
  type SpacingKeys = keyof typeof BASE_TOKENS.spacing;
  const spacing: Record<string, number | string> = {};
  for (const key of Object.keys(BASE_TOKENS.spacing) as SpacingKeys[]) {
    const value = BASE_TOKENS.spacing[key];
    spacing[key] = typeof value === 'number' ? value * multiplier : value;
  }

  // Responsive Typography
  type TypographyKeys = keyof typeof BASE_TOKENS.typography;
  const typography: Record<string, unknown> = {};
  for (const key of Object.keys(BASE_TOKENS.typography) as TypographyKeys[]) {
    const style = BASE_TOKENS.typography[key];
    if (typeof style === 'object' && 'fontSize' in style) {
      typography[key] = {
        ...style,
        responsiveFontSize: getFontSize(style.fontSize as number),
      };
    } else {
      typography[key] = style;
    }
  }

  // Responsive Borders
  type RadiusKeys = keyof typeof BASE_TOKENS.borders.radius;
  const borderRadius = (Object.keys(BASE_TOKENS.borders.radius) as RadiusKeys[]).reduce<Record<RadiusKeys, number>>((acc, key) => {
    const value = BASE_TOKENS.borders.radius[key];
    acc[key] = value === 0 || key === 'full' ? value : Math.round(value * multiplier);
    return acc;
  }, {} as Record<RadiusKeys, number>);

  // Responsive Icon Sizes
  type IconKeys = keyof typeof BASE_TOKENS.iconSizes;
  const iconSizes = (Object.keys(BASE_TOKENS.iconSizes) as IconKeys[]).reduce<Record<IconKeys, number>>((acc, key) => {
    acc[key] = BASE_TOKENS.iconSizes[key] * multiplier;
    return acc;
  }, {} as Record<IconKeys, number>);

  // Responsive Avatar Sizes
  type AvatarKeys = keyof typeof BASE_TOKENS.avatarSizes;
  const avatarSizes = (Object.keys(BASE_TOKENS.avatarSizes) as AvatarKeys[]).reduce<Record<AvatarKeys, number>>((acc, key) => {
    acc[key] = BASE_TOKENS.avatarSizes[key] * multiplier;
    return acc;
  }, {} as Record<AvatarKeys, number>);

  return {
    colors,
    spacing: spacing as DesignTokens['spacing'],
    typography: typography as ResponsiveTypography,
    iconSizes: iconSizes as DesignTokens['iconSizes'],
    opacity: BASE_TOKENS.opacity,
    avatarSizes: avatarSizes as DesignTokens['avatarSizes'],
    radius: borderRadius as DesignTokens['radius'],
    borderRadius: borderRadius as DesignTokens['borderRadius'],
    borders: {
      ...BASE_TOKENS.borders,
      radius: borderRadius,
      card: {
        ...BASE_TOKENS.borders.card,
        borderColor: colors.border,
      },
      input: {
        ...BASE_TOKENS.borders.input,
        borderColor: colors.border,
      },
    },
    spacingMultiplier: multiplier,
    baseSpacing: BASE_TOKENS.spacing,
    baseTypography: BASE_TOKENS.typography,
    baseBorderRadius: BASE_TOKENS.borders.radius,
  };
};

export { withAlpha };
export type { ThemeMode, ColorPalette };

import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { useResponsive } from '../responsive';
import { AtomicIcon } from './icon';
import { AtomicFabProps } from './fab/types';
import {
  FAB_SIZES,
  getFabVariants,
  getFabIconSize,
  getFabBorder,
} from './fab/styles/fabStyles';

export type { FabSize, FabVariant, FabVariantConfig, FabSizeConfig, AtomicFabProps } from './fab/types';
export { FAB_SIZES, getFabVariants, getFabIconSize, getFabBorder };

/**
 * AtomicFab - Floating Action Button Component
 *
 * A Material Design 3 compliant FAB component for primary actions.
 * Follows CLAUDE.md standards for responsive positioning.
 *
 * @example
 * ```tsx
 * // IMPORTANT: FAB must be used at screen level, NOT inside ScrollView
 * <ScreenLayout>
 *   <ScrollView>
 *     {/* Your content *\/}
 *   </ScrollView>
 *   <AtomicFab
 *     icon="add"
 *     onPress={handleAddItem}
 *     variant="primary"
 *     size="md"
 *   />
 * </ScreenLayout>
 * ```
 *
 * Features:
 * - Material Design 3 sizes (sm: 40px, md: 56px, lg: 72px)
 * - Three variants: primary, secondary, surface
 * - Responsive positioning (above tab bar, safe area aware)
 * - Disabled state with opacity
 * - Theme-aware colors from design tokens
 * - Border for depth (no shadows per CLAUDE.md)
 */
export const AtomicFab: React.FC<AtomicFabProps> = ({
  icon,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  testID,
  accessibilityLabel,
  activeOpacity = 0.7,
}) => {
  const tokens = useAppDesignTokens();
  const responsive = useResponsive();

  const variantConfig = useMemo(() => getFabVariants(tokens)[variant as 'primary' | 'secondary' | 'surface'], [tokens, variant]);
  const iconSize = useMemo(() => getFabIconSize(size as 'sm' | 'md' | 'lg') * tokens.spacingMultiplier, [size, tokens.spacingMultiplier]);

  const fabStyle = useMemo(() => {
    const baseSize = FAB_SIZES[size as 'sm' | 'md' | 'lg'];
    const borderRadius = size === 'sm' ? 12 : size === 'md' ? 16 : 20;
    const sizeConfig = {
      width: baseSize * tokens.spacingMultiplier,
      height: baseSize * tokens.spacingMultiplier,
      borderRadius: borderRadius * tokens.spacingMultiplier,
    };

    return StyleSheet.flatten([
      {
        position: 'absolute' as const,
        bottom: responsive.fabPosition.bottom,
        right: responsive.fabPosition.right,
        width: sizeConfig.width,
        height: sizeConfig.height,
        borderRadius: sizeConfig.borderRadius,
        backgroundColor: variantConfig.backgroundColor,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      },
      getFabBorder(tokens),
      disabled ? { opacity: tokens.opacity.disabled } : undefined,
      style,
    ]);
  }, [size, tokens, responsive.fabPosition, variantConfig, disabled, style]);

  return (
    <TouchableOpacity
      style={fabStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      testID={testID}
      accessibilityLabel={accessibilityLabel || `${icon} floating action button`}
      accessibilityRole="button"
    >
      <AtomicIcon name={icon} size={iconSize} customColor={variantConfig.iconColor} />
    </TouchableOpacity>
  );
};

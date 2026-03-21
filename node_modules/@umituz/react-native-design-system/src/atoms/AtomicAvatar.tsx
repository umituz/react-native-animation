/**
 * AtomicAvatar - Universal Avatar Component
 *
 * Displays user profile images with fallback to initials
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: User profile image display
 *
 * Usage:
 * - User profile pictures
 * - Contact avatars
 * - Group member avatars
 * - Default user placeholders
 */

import React, { useMemo } from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens } from '../theme';

// =============================================================================
// UTILITY FUNCTIONS (moved outside component)
// =============================================================================

/**
 * Generate initials from name
 */
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Calculate font size based on avatar size
 */
const getAvatarFontSize = (sizeValue: number, spacingMultiplier: number): number => {
  const baseFontSize = sizeValue <= 32 ? 12 :
                      sizeValue <= 48 ? 16 :
                      sizeValue <= 64 ? 20 : 24;
  return baseFontSize * spacingMultiplier;
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicAvatarProps {
  /** Image source (URI or require) */
  source?: ImageSourcePropType;
  /** User's name for fallback initials */
  name?: string;
  /** Size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /** Custom size in pixels */
  customSize?: number;
  /** Background color for fallback */
  backgroundColor?: string;
  /** Text color for initials */
  textColor?: string;
  /** Border radius (default: circular) */
  borderRadius?: number;
  /** Border width */
  borderWidth?: number;
  /** Border color */
  borderColor?: string;
  /** Style overrides */
  style?: ViewStyle | ViewStyle[];
  /** Image style overrides */
  imageStyle?: ImageStyle | ImageStyle[];
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicAvatar: React.FC<AtomicAvatarProps> = React.memo(({
  source,
  name,
  size = 'md',
  customSize,
  backgroundColor,
  textColor,
  borderRadius,
  borderWidth = 0,
  borderColor,
  style,
  imageStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const avatarSize = useMemo(() =>
    customSize ? customSize * tokens.spacingMultiplier : tokens.avatarSizes[size],
    [customSize, size, tokens.spacingMultiplier, tokens.avatarSizes]
  );

  const avatarRadius = useMemo(() =>
    borderRadius ?? avatarSize / 2,
    [borderRadius, avatarSize]
  );

  const defaultBackgroundColor = useMemo(() =>
    backgroundColor || tokens.colors.primary,
    [backgroundColor, tokens.colors.primary]
  );

  const defaultTextColor = useMemo(() =>
    textColor || tokens.colors.onPrimary,
    [textColor, tokens.colors.onPrimary]
  );

  const defaultBorderColor = useMemo(() =>
    borderColor || tokens.colors.border,
    [borderColor, tokens.colors.border]
  );

  const avatarStyle = useMemo<ViewStyle>(() => ({
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarRadius,
    backgroundColor: defaultBackgroundColor,
    borderWidth,
    borderColor: defaultBorderColor,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden',
  }), [avatarSize, avatarRadius, defaultBackgroundColor, borderWidth, defaultBorderColor]);

  const imageStyleFinal = useMemo<ImageStyle>(() => ({
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarRadius,
  }), [avatarSize, avatarRadius]);

  const avatarFontSize = useMemo(() =>
    getAvatarFontSize(avatarSize, tokens.spacingMultiplier),
    [avatarSize, tokens.spacingMultiplier]
  );

  const textStyle = useMemo(() => ({
    fontSize: avatarFontSize,
    fontWeight: tokens.typography.semibold,
  }), [avatarFontSize, tokens.typography.semibold]);

  return (
    <View
      style={[avatarStyle, style]}
      testID={testID}
      accessibilityLabel={name ? `Avatar for ${name}` : 'Default avatar'}
      accessibilityRole="image"
    >
      {source ? (
        <Image
          source={source}
          style={StyleSheet.flatten([imageStyleFinal, imageStyle])}
          resizeMode="cover"
        />
      ) : name ? (
        <AtomicText
          type="labelLarge"
          color={defaultTextColor}
          style={textStyle}
        >
          {getInitials(name)}
        </AtomicText>
      ) : (
        <AtomicText
          type="labelLarge"
          color={defaultTextColor}
          style={textStyle}
        >
          ?
        </AtomicText>
      )}
    </View>
  );
});


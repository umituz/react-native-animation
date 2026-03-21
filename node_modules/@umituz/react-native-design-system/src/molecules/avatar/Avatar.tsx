/**
 * Avatar Domain - Avatar Component
 *
 * Universal avatar component with image, initials, and icon support.
 * Handles loading states, fallbacks, and status indicators.
 */

import React, { useMemo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, type StyleProp, type ViewStyle, type ImageStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicText, AtomicIcon } from '../../atoms';
import type { AvatarSize, AvatarShape } from './Avatar.types';
import type { SizeConfig } from './Avatar.types';
import { AVATAR_SIZES } from '../../constants';
import { calculateResponsiveSize } from '../../responsive';
import { AvatarUtils } from './Avatar.utils';

export interface AvatarProps {
  uri?: string;
  name?: string;
  icon?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  backgroundColor?: string;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

interface AvatarContentProps {
  hasImage: boolean;
  hasName: boolean;
  uri?: string;
  initials: string;
  icon: string;
  config: SizeConfig;
  borderRadius: number;
  imageStyle?: StyleProp<ImageStyle>;
}

const AvatarContent: React.FC<AvatarContentProps> = React.memo(({
  hasImage,
  hasName,
  uri,
  initials,
  icon,
  config,
  borderRadius,
  imageStyle: propImageStyle,
}) => {
  const tokens = useAppDesignTokens();

  const imageStyle = useMemo(() => [
    styles.image,
    {
      width: config.size,
      height: config.size,
      borderRadius,
    },
    propImageStyle,
  ], [config.size, borderRadius, propImageStyle]);

  const initialsStyle = useMemo(() => [
    styles.initials,
    {
      fontSize: config.fontSize,
      color: tokens.colors.textInverse,
    },
  ], [config.fontSize, tokens.colors.textInverse]);

  if (hasImage) {
    return (
      <Image
        source={{ uri }}
        style={imageStyle}
      />
    );
  }

  if (hasName) {
    return (
      <AtomicText
        type="bodyMedium"
        style={initialsStyle}
      >
        {initials}
      </AtomicText>
    );
  }

  return (
    <AtomicIcon
      name={icon}
      customSize={config.iconSize}
      customColor={tokens.colors.textInverse}
    />
  );
});

const AVATAR_CONSTANTS = {
  DEFAULT_ICON: 'person',
  DEFAULT_SIZE: 'md' as AvatarSize,
  DEFAULT_SHAPE: 'circle' as AvatarShape,
  FALLBACK_INITIALS: '?',
};

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  icon = AVATAR_CONSTANTS.DEFAULT_ICON,
  size = AVATAR_CONSTANTS.DEFAULT_SIZE,
  shape = AVATAR_CONSTANTS.DEFAULT_SHAPE,
  backgroundColor,
  showStatus = false,
  status = 'offline',
  style,
  imageStyle,
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const spacingMultiplier = tokens.spacingMultiplier;

  const sizeConfigs = useMemo(() => {
    const baseSizes = AVATAR_SIZES;
    return Object.entries(baseSizes).reduce((acc, [key, value]) => {
      acc[key as AvatarSize] = {
        size: calculateResponsiveSize(value.size, spacingMultiplier),
        fontSize: calculateResponsiveSize(value.fontSize, spacingMultiplier),
        iconSize: calculateResponsiveSize(value.iconSize, spacingMultiplier),
        statusSize: calculateResponsiveSize(value.statusSize, spacingMultiplier),
        borderWidth: value.borderWidth,
      };
      return acc;
    }, {} as Record<AvatarSize, SizeConfig>);
  }, [spacingMultiplier]);

  const config = useMemo(() => sizeConfigs[size], [size, sizeConfigs]);

  const hasImage = !!uri;
  const hasName = !!name;
  const initials = useMemo(
    () => (hasName ? AvatarUtils.generateInitials(name) : AVATAR_CONSTANTS.FALLBACK_INITIALS),
    [hasName, name]
  );
  const bgColor = useMemo(
    () => backgroundColor || (hasName ? AvatarUtils.getColorForName(name) : tokens.colors.surfaceSecondary),
    [backgroundColor, hasName, name, tokens.colors.surfaceSecondary]
  );
  const borderRadius = useMemo(
    () => AvatarUtils.getBorderRadius(shape, config.size),
    [shape, config.size]
  );

  const statusPosition = useMemo(() => ({
    bottom: 0,
    right: 0,
  }), []);

  const containerStyle = useMemo(() => [
    styles.container,
    {
      width: config.size,
      height: config.size,
      borderRadius,
      backgroundColor: bgColor,
    },
    style,
  ], [config.size, borderRadius, bgColor, style]);

  const statusStyle = useMemo(() => [
    styles.statusIndicator,
    {
      width: config.statusSize,
      height: config.statusSize,
      borderRadius: config.statusSize / 2,
      backgroundColor: AvatarUtils.getStatusColor(status),
      borderWidth: config.borderWidth,
      borderColor: tokens.colors.onBackground,
      ...statusPosition,
    },
  ], [config.statusSize, config.borderWidth, status, tokens.colors.onBackground, statusPosition]);

  const AvatarWrapper = onPress ? TouchableOpacity : View;

  return (
    <AvatarWrapper
      style={containerStyle}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={name || 'User avatar'}
      accessible={true}
    >
      <AvatarContent
        hasImage={hasImage}
        hasName={hasName}
        uri={uri}
        initials={initials}
        icon={icon}
        config={config}
        borderRadius={borderRadius}
        imageStyle={imageStyle}
      />

      {showStatus && (
        <View
          style={statusStyle}
          accessibilityLabel={`Status: ${status}`}
          accessibilityRole="none"
        />
      )}
    </AvatarWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: '600',
    textAlign: 'center',
  },
  statusIndicator: {
    position: 'absolute',
  },
});

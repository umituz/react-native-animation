/**
 * Avatar Domain - AvatarGroup Component
 *
 * Displays multiple avatars in a stacked layout.
 * Shows overflow count when exceeding max visible avatars.
 */

import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicText } from '../../atoms';
import { Avatar } from './Avatar';
import type { AvatarSize, AvatarShape } from './Avatar.types';
import { AVATAR_SIZES } from '../../constants';
import { calculateResponsiveSize } from '../../responsive';
import type { SizeConfig } from './Avatar.types';

const AVATAR_CONSTANTS = {
  MAX_GROUP_VISIBLE: 3,
  DEFAULT_SIZE: 'md' as AvatarSize,
  DEFAULT_SHAPE: 'circle' as AvatarShape,
  GROUP_SPACING: -12,
};

/**
 * Avatar item for group
 */
export interface AvatarGroupItem {
  uri?: string;
  name?: string;
  icon?: string;
}

/**
 * AvatarGroup component props
 */
export interface AvatarGroupProps {
  /** Array of avatar items */
  items: AvatarGroupItem[];
  /** Maximum visible avatars */
  maxVisible?: number;
  /** Avatar size */
  size?: AvatarSize;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Spacing between avatars (negative for overlap) */
  spacing?: number;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

// Memoized individual avatar item
const AvatarItem = React.memo<{
  item: AvatarGroupItem;
  index: number;
  size: AvatarSize;
  shape: AvatarShape;
  spacing: number;
  avatarStyle: any;
}>(({ item, index, size, shape, spacing, avatarStyle }) => {
  const wrapperStyle = useMemo(() => {
    const baseStyle = [styles.avatarWrapper];
    if (index > 0) {
      baseStyle.push({ marginLeft: spacing });
    }
    return baseStyle;
  }, [index, spacing]);

  return (
    <View style={wrapperStyle}>
      <Avatar
        uri={item.uri}
        name={item.name}
        icon={item.icon}
        size={size}
        shape={shape}
        style={avatarStyle}
      />
    </View>
  );
});

// Memoized overflow badge
const OverflowBadge = React.memo<{
  count: number;
  spacing: number;
  config: SizeConfig;
  shape: AvatarShape;
  surfaceSecondary: string;
  onBackground: string;
  textSecondary: string;
}>(({ count, spacing, config, shape, surfaceSecondary, onBackground, textSecondary }) => {
  const wrapperStyle = useMemo(
    () => [
      styles.avatarWrapper,
      { marginLeft: spacing },
    ],
    [spacing]
  );

  const badgeStyle = useMemo(
    () => [
      styles.overflow,
      {
        width: config.size,
        height: config.size,
        borderRadius: shape === 'circle' ? config.size / 2 : shape === 'rounded' ? 8 : 0,
        backgroundColor: surfaceSecondary,
        borderWidth: 2,
        borderColor: onBackground,
      },
    ],
    [config.size, shape, surfaceSecondary, onBackground]
  );

  const textStyle = useMemo(
    () => [
      styles.overflowText,
      {
        fontSize: config.fontSize,
        color: textSecondary,
      },
    ],
    [config.fontSize, textSecondary]
  );

  return (
    <View style={wrapperStyle}>
      <View style={badgeStyle}>
        <AtomicText
          type="bodySmall"
          style={textStyle}
        >
          +{count}
        </AtomicText>
      </View>
    </View>
  );
});

export const AvatarGroup: React.FC<AvatarGroupProps> = React.memo(({
  items,
  maxVisible = AVATAR_CONSTANTS.MAX_GROUP_VISIBLE,
  size = AVATAR_CONSTANTS.DEFAULT_SIZE,
  shape = AVATAR_CONSTANTS.DEFAULT_SHAPE,
  spacing = AVATAR_CONSTANTS.GROUP_SPACING,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const spacingMultiplier = tokens.spacingMultiplier;

  const config = useMemo(() => {
    const baseConfig = AVATAR_SIZES[size];
    return {
      size: calculateResponsiveSize(baseConfig.size, spacingMultiplier),
      fontSize: calculateResponsiveSize(baseConfig.fontSize, spacingMultiplier),
      iconSize: calculateResponsiveSize(baseConfig.iconSize, spacingMultiplier),
      statusSize: calculateResponsiveSize(baseConfig.statusSize, spacingMultiplier),
      borderWidth: baseConfig.borderWidth,
    };
  }, [size, spacingMultiplier]);

  // Memoize calculations to prevent recalculation on every render
  const { visibleItems, overflowCount, hasOverflow } = useMemo(() => {
    const visItems = items.slice(0, maxVisible);
    const overflow = items.length - maxVisible;
    return {
      visibleItems: visItems,
      overflowCount: overflow,
      hasOverflow: overflow > 0,
    };
  }, [items, maxVisible]);

  // Memoize avatar style
  const avatarStyle = useMemo(
    () => [
      styles.avatar,
      {
        borderWidth: 2,
        borderColor: tokens.colors.onBackground,
      },
    ],
    [tokens.colors.onBackground]
  );

  // Stable key extractor
  const keyExtractor = useCallback((item: AvatarGroupItem, index: number) => {
    return item.uri || item.name || item.icon || `avatar-${index}`;
  }, []);

  return (
    <View style={[styles.container, style]}>
      {visibleItems.map((item, index) => (
        <AvatarItem
          key={keyExtractor(item, index)}
          item={item}
          index={index}
          size={size}
          shape={shape}
          spacing={spacing}
          avatarStyle={avatarStyle}
        />
      ))}

      {hasOverflow && (
        <OverflowBadge
          count={overflowCount}
          spacing={spacing}
          config={config}
          shape={shape}
          surfaceSecondary={tokens.colors.surfaceSecondary}
          onBackground={tokens.colors.onBackground}
          textSecondary={tokens.colors.textSecondary}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {},
  avatar: {},
  overflow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowText: {
    fontWeight: '600',
  },
});


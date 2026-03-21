/**
 * OfflineBanner Component
 *
 * Displays a banner when the device is offline.
 * Respects safe area insets for proper display on all devices.
 * Simple conditional rendering - NO animations per CLAUDE.md
 *
 * @example
 * ```tsx
 * import { OfflineBanner, useOffline } from '@umituz/react-native-design-system';
 *
 * const App = () => {
 *   const { isOffline } = useOffline();
 *   return (
 *     <>
 *       <OfflineBanner visible={isOffline} message="No internet connection" />
 *       <YourContent />
 *     </>
 *   );
 * };
 * ```
 */

import React, { memo } from 'react';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from '../../../safe-area';
import { AtomicText, AtomicIcon } from '../../../atoms';

export interface OfflineBannerProps {
  /** Whether the banner is visible */
  visible: boolean;
  /** Message to display */
  message?: string;
  /** Background color of the banner */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Icon name from design system icons */
  iconName?: string;
  /** Position of the banner */
  position?: 'top' | 'bottom';
  /** Custom container style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
}

const CONTENT_HEIGHT = 44;
const HORIZONTAL_PADDING = 16;
const ICON_SIZE = 18;

export const OfflineBanner: React.FC<OfflineBannerProps> = memo(({
  visible,
  message = 'No internet connection',
  backgroundColor = '#DC2626',
  textColor = '#FFFFFF',
  iconName = 'wifi-off',
  position = 'top',
  style,
  textStyle,
}) => {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  const isTop = position === 'top';
  const safeAreaPadding = isTop ? insets.top : insets.bottom;

  return (
    <View
      style={[
        styles.container,
        isTop ? styles.positionTop : styles.positionBottom,
        {
          backgroundColor,
          paddingTop: isTop ? safeAreaPadding : 0,
          paddingBottom: isTop ? 0 : safeAreaPadding,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <AtomicIcon
          name={iconName}
          customSize={ICON_SIZE}
          customColor={textColor}
        />
        <AtomicText
          style={[styles.message, { color: textColor }, textStyle]}
          numberOfLines={1}
        >
          {message}
        </AtomicText>
      </View>
    </View>
  );
});

OfflineBanner.displayName = 'OfflineBanner';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  positionTop: {
    top: 0,
  },
  positionBottom: {
    bottom: 0,
  },
  content: {
    height: CONTENT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 8,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
  },
});

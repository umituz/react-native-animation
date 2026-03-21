/**
 * Swipe Actions Domain - SwipeActionButton Component
 *
 * Individual swipe action button with icon and label.
 * Rendered inside SwipeableItem when swiping.
 *
 * @domain swipe-actions
 * @layer presentation/components
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, type StyleProp, type ViewStyle } from 'react-native';
import { AtomicText, AtomicIcon } from '../../../../atoms';
import { useAppDesignTokens } from '../../../../theme/hooks/useAppDesignTokens';
import { HapticService } from '../../../../haptics';
import type { SwipeActionConfig } from '../../domain/entities/SwipeAction';
import {
  getActionLabel,
  getActionIcon,
  getActionColorKey,
  getHapticsIntensity,
} from '../../domain/entities/SwipeAction';

/**
 * SwipeActionButton component props
 */
export interface SwipeActionButtonProps {
  /** Action configuration */
  action: SwipeActionConfig;
  /** Action position (index) */
  position: number;
  /** Total actions count */
  totalActions: number;
  /** Swipe direction */
  direction: 'left' | 'right';
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * SwipeActionButton Component
 *
 * Displays an individual swipe action with icon and label.
 * Animates based on swipe progress.
 *
 * USAGE:
 * ```typescript
 * // Used internally by SwipeableItem
 * <SwipeActionButton
 *   action={deleteAction}
 *   progress={progressValue}
 *   drag={dragValue}
 *   position={0}
 *   totalActions={1}
 *   direction="right"
 * />
 * ```
 */
export const SwipeActionButton: React.FC<SwipeActionButtonProps> = ({
  action,
  style,
}) => {
  const tokens = useAppDesignTokens();

  // Get action properties
  const label = getActionLabel(action);
  const iconName = getActionIcon(action);
  const colorKey = getActionColorKey(action);
  const customColor = action.color;
  const enableHaptics = action.enableHaptics !== false;

  // Get background color from theme or custom
  // Type-safe color lookup with fallback
  const getBackgroundColor = (): string => {
    if (customColor) {
      return customColor;
    }

    if (colorKey && colorKey in tokens.colors) {
      return tokens.colors[colorKey as keyof typeof tokens.colors];
    }

    return tokens.colors.primary;
  };

  const backgroundColor = getBackgroundColor();

  const handlePress = async () => {
    try {
      if (enableHaptics) {
        const intensity = getHapticsIntensity(action);
        await HapticService.impact(intensity);
      }
      await action.onPress();
    } catch (error) {
      if (__DEV__) console.warn('[SwipeActionButton] Action failed:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          paddingHorizontal: tokens.spacing.lg,
          minWidth: 80,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.content}>
        <AtomicIcon
          name={iconName}
          size="md"
          customColor="#FFFFFF"
        />
        <AtomicText
          type="bodySmall"
          style={[styles.label, { color: '#FFFFFF' }]}
        >
          {label}
        </AtomicText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    textAlign: 'center',
  },
});

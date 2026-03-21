/**
 * ScreenHeader Component
 *
 * Reusable screen header with consistent back button placement
 *
 * Features:
 * - Top-left back button (configurable icon)
 * - Centered title text
 * - Optional right action button
 * - Consistent spacing and layout
 * - Theme-aware styling
 * - Fully configurable for general purpose use
 */

import React, { useCallback, useMemo } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { AtomicIcon, AtomicText } from '../../atoms';
import { useAppDesignTokens } from '../../theme';

export interface ScreenHeaderProps {
  /** Screen title (centered) */
  title: string;

  /** Optional right action button */
  rightAction?: React.ReactNode;

  /** Custom back button action (required if back button is visible) */
  onBackPress?: () => void;

  /** Hide back button (rare cases only) */
  hideBackButton?: boolean;

  /** Additional header style */
  style?: ViewStyle;

  /** Test ID for E2E testing */
  testID?: string;

  /** Custom back button icon name */
  backIconName?: string;

  /** Custom back button icon color */
  backIconColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'surfaceVariant';
}

/**
 * ScreenHeader Component
 *
 * @example
 * // Basic usage (most common)
 * <ScreenHeader title="Settings" />
 *
 * @example
 * // With right action
 * <ScreenHeader
 *   title="Edit Profile"
 *   rightAction={<TouchableOpacity onPress={handleSave}><Text>Save</Text></TouchableOpacity>}
 * />
 *
 * @example
 * // Custom back action
 * <ScreenHeader
 *   title="Unsaved Changes"
 *   onBackPress={handleUnsavedChanges}
 * />
 */
const ScreenHeaderBackButton: React.FC<{
  hideBackButton?: boolean;
  onBackPress?: () => void;
  backIconName?: string;
  backIconColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'surfaceVariant';
  testID?: string;
}> = ({ hideBackButton, onBackPress, backIconName, backIconColor, testID }) => {
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    }
    // If no onBackPress provided, do nothing silently
  }, [onBackPress]);

  if (hideBackButton) return null;

  return (
    <View style={{ width: 40, alignItems: 'flex-start' }}>
      <TouchableOpacity
        onPress={handleBackPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        testID={`${testID}-back-button`}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        accessibilityState={{ disabled: !onBackPress }}
        accessible
      >
        <AtomicIcon name={backIconName || 'arrow-back'} color={backIconColor} />
      </TouchableOpacity>
    </View>
  );
};

const ScreenHeaderTitle: React.FC<{
  title: string;
  tokens: ReturnType<typeof useAppDesignTokens>;
  testID?: string;
}> = React.memo(({ title, tokens, testID }) => (
  <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: tokens.spacing.sm }}>
    <AtomicText
      type="headlineMedium"
      style={[
        {
          fontWeight: tokens.typography.bold,
          textAlign: 'center',
          color: tokens.colors.textPrimary,
        }
      ]}
      numberOfLines={1}
      testID={`${testID}-title`}
    >
      {title}
    </AtomicText>
  </View>
));

const ScreenHeaderRightAction: React.FC<{
  rightAction?: React.ReactNode;
}> = React.memo(({ rightAction }) => (
  <View style={{ width: 40, alignItems: 'flex-start' }}>
    {rightAction || <View style={{ width: 40 }} />}
  </View>
));

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  rightAction,
  onBackPress,
  hideBackButton = false,
  style,
  testID = 'screen-header',
  backIconName = 'arrow-back',
  backIconColor = 'primary',
}) => {
  const tokens = useAppDesignTokens();

  const headerStyle = useMemo(() => [
    {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      paddingHorizontal: tokens.spacing.screenPadding,
      paddingVertical: tokens.spacing.md,
      borderBottomWidth: 0.5,
      backgroundColor: tokens.colors.backgroundPrimary,
      borderBottomColor: tokens.colors.border,
    },
    style
  ], [tokens, style]);

  return (
    <View style={headerStyle} testID={testID}>
      <ScreenHeaderBackButton
        hideBackButton={hideBackButton}
        onBackPress={onBackPress}
        backIconName={backIconName}
        backIconColor={backIconColor}
        testID={testID}
      />

      <ScreenHeaderTitle title={title} tokens={tokens} testID={testID} />

      <ScreenHeaderRightAction rightAction={rightAction} />
    </View>
  );
};

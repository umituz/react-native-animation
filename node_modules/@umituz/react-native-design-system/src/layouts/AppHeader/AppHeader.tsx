/**
 * AppHeader Organism - Application Header Component
 *
 * Complex header combining atoms and molecules
 * Generic component suitable for any application
 *
 * Atomic Design Level: ORGANISM
 * Composition: AtomicIcon + AtomicText + AtomicButton
 */

import React, { useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { SafeAreaView } from '../../safe-area';
import { useAppDesignTokens } from '../../theme';
import { AtomicText, AtomicButton, type IconName } from '../../atoms';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * AppHeader component props
 *
 * leftIcon/rightIcon: Any MaterialIcons name
 * @see https://fonts.google.com/icons
 */
export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: IconName;
  onLeftPress?: () => void;
  rightIcon?: IconName;
  onRightPress?: () => void;
  backgroundColor?: string;
  style?: ViewStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessible?: boolean;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  backgroundColor,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessible,
}) => {
  const tokens = useAppDesignTokens();
  const bgColor = backgroundColor || tokens.colors.surface;

  const styles = useMemo(() => createAppHeaderStyles(tokens), [tokens]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: bgColor }]}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessible={accessible !== false}
      accessibilityRole="header"
    >
      <View style={[styles.container, { backgroundColor: bgColor }, style]}>
        {/* Left Action */}
        <View style={styles.leftContainer}>
          {leftIcon && onLeftPress && (
            <AtomicButton
              variant="text"
              size="sm"
              onPress={onLeftPress}
              icon={leftIcon}
            />
          )}
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <AtomicText type="titleLarge" color="primary" numberOfLines={1}>
            {title}
          </AtomicText>
          {subtitle && (
            <AtomicText type="bodySmall" color="secondary" numberOfLines={1}>
              {subtitle}
            </AtomicText>
          )}
        </View>

        {/* Right Action */}
        <View style={styles.rightContainer}>
          {rightIcon && onRightPress && (
            <AtomicButton
              variant="text"
              size="sm"
              onPress={onRightPress}
              icon={rightIcon}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const createAppHeaderStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => ({
  safeArea: {
    backgroundColor: tokens.colors.surface,
  } as ViewStyle,
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    minHeight: tokens.iconSizes.xl + tokens.spacing.md,
  } as ViewStyle,
  leftContainer: {
    width: tokens.iconSizes.xl + tokens.spacing.sm,
    alignItems: 'flex-start' as const,
  } as ViewStyle,
  titleContainer: {
    flex: 1,
    alignItems: 'center' as const,
    paddingHorizontal: tokens.spacing.sm,
  } as ViewStyle,
  rightContainer: {
    width: tokens.iconSizes.xl + tokens.spacing.sm,
    alignItems: 'flex-start' as const,
  } as ViewStyle,
});

// =============================================================================
// EXPORTS
// =============================================================================


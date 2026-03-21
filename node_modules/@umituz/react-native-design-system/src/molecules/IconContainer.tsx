/**
 * IconContainer Molecule Component
 *
 * Standardized icon container with consistent sizing and styling.
 * Used throughout app for icon displays in lists, cards, and settings.
 *
 * Features:
 * - Consistent sizing system
 * - Optional background circle
 * - Optional background circle
 * - Theme-aware colors
 * - Accessibility support
 *
 * Atomic Design: Molecule (View + Icon)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '../theme';

interface IconContainerProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  withBorder?: boolean;
  borderColor?: string;
  style?: object;
  testID?: string;
}

const getSizeMap = (tokens: ReturnType<typeof useAppDesignTokens>) => ({
  sm: tokens.iconSizes.sm,
  md: tokens.iconSizes.md,
  lg: tokens.iconSizes.lg,
  xl: tokens.iconSizes.xl,
});

export const IconContainer: React.FC<IconContainerProps> = ({
  icon,
  size = 'md',
  backgroundColor,
  withBorder = false,
  borderColor,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const sizeMap = getSizeMap(tokens);
  const containerSize = sizeMap[size];
  const borderRadius = containerSize / 2;

  const containerStyle = [
    styles.container,
    {
      width: containerSize,
      height: containerSize,
      borderRadius,
      backgroundColor: backgroundColor || tokens.colors.surfaceVariant,
    },
    withBorder && {
      borderWidth: 1,
      borderColor: borderColor || tokens.colors.border,
    },
    style,
  ];

  return (
    <View style={containerStyle} testID={testID}>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

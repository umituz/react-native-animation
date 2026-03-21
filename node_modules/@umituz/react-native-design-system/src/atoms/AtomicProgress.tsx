/**
 * AtomicProgress - Universal Progress Bar Component
 *
 * Displays progress bars for completion tracking
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: Progress indication and completion tracking
 *
 * Usage:
 * - File upload progress
 * - Task completion progress
 * - Achievement progress
 * - Form completion
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue, Text } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { normalizeProgress } from '../utils/math';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicProgressProps {
  /** Progress value (0-100) */
  value: number;
  /** Progress bar height */
  height?: number;
  /** Progress bar width */
  width?: number | string;
  /** Progress bar color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Progress bar shape */
  shape?: 'rounded' | 'square';
  /** Whether to show percentage text */
  showPercentage?: boolean;
  /** Whether to show value text */
  showValue?: boolean;
  /** Custom text color */
  textColor?: string;
  /** Style overrides */
  style?: ViewStyle | ViewStyle[];
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicProgress: React.FC<AtomicProgressProps> = ({
  value,
  height = 8,
  width = '100%',
  color,
  backgroundColor,
  shape = 'rounded',
  showPercentage = false,
  showValue = false,
  textColor,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Normalize progress value using utility
  const normalizedValue = useMemo(
    () => normalizeProgress(value),
    [value]
  );

  // Default colors
  const progressColor = color || tokens.colors.primary;
  const progressBackground = backgroundColor || tokens.colors.surfaceVariant;
  const progressTextColor = textColor || tokens.colors.textPrimary;

  // Calculate progress width
  const progressWidth = `${normalizedValue}%`;

  const scaledHeight = height * tokens.spacingMultiplier;

  // Border radius based on shape
  const progressBorderRadius = shape === 'rounded' ? scaledHeight / 2 : 0;

  const containerStyle = useMemo<ViewStyle>(() => ({
    width: width as DimensionValue,
    height: scaledHeight,
    backgroundColor: progressBackground,
    borderRadius: progressBorderRadius,
    overflow: 'hidden',
  }), [width, scaledHeight, progressBackground, progressBorderRadius]);

  const progressStyle = useMemo<ViewStyle>(() => ({
    width: progressWidth as DimensionValue,
    height: '100%' as DimensionValue,
    backgroundColor: progressColor,
    borderRadius: progressBorderRadius,
  }), [progressWidth, progressColor, progressBorderRadius]);

  const textStyle = useMemo(() => ({
    fontSize: tokens.typography.bodySmall.responsiveFontSize,
    fontWeight: tokens.typography.labelMedium.fontWeight,
    color: progressTextColor,
    textAlign: 'center' as const,
  }), [tokens.typography.bodySmall.responsiveFontSize, tokens.typography.labelMedium.fontWeight, progressTextColor]);

  return (
    <View
      style={[containerStyle, style]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(normalizedValue) }}
      accessibilityLabel={`Progress: ${Math.round(normalizedValue)}${showPercentage ? '%' : ''}`}
    >
      <View style={progressStyle} />
      {(showPercentage || showValue) && (
        <View style={styles.textContainer}>
          <Text
            style={textStyle}
            accessibilityLiveRegion="polite"
            accessibilityLabel={`Current progress: ${Math.round(normalizedValue)}${showPercentage ? '%' : ''}`}
          >
            {showPercentage ? `${Math.round(normalizedValue)}%` : `${Math.round(normalizedValue)}`}
          </Text>
        </View>
      )}
    </View>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


/**
 * Typing Indicator Component
 *
 * Shows animated typing dots for bot messages
 * Uses CSS animations for minimal bundle impact
 * Fully responsive - scales dot size and spacing on larger screens
 */

import React, { memo, useEffect, useState, useMemo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useResponsive } from "../../../../responsive/useResponsive";

export interface TypingIndicatorProps {
  /** Dot color */
  dotColor?: string;

  /** Container background color */
  backgroundColor?: string;

  /** Additional styles */
  style?: ViewStyle;

  /** Animation duration in ms */
  duration?: number;
}

/**
 * Typing indicator dots component
 * Responsive design: Scales dot size and spacing based on screen size
 */
export const TypingIndicator = memo(
  ({
    dotColor = "#9CA3AF",
    backgroundColor = "#F3F4F6",
    style,
    duration = 800,
  }: TypingIndicatorProps) => {
    const responsive = useResponsive();
    const [phase, setPhase] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setPhase((prev) => (prev + 1) % 4);
      }, duration / 4);

      return () => clearInterval(interval);
    }, [duration]);

    // Responsive sizing - dots scale slightly on tablets
    const dotSize = useMemo(() => Math.floor(8 * Math.max(1, responsive.spacingMultiplier * 0.8)), [responsive.spacingMultiplier]);
    const dotRadius = useMemo(() => Math.floor(dotSize / 2), [dotSize]);
    const dotSpacing = useMemo(() => Math.floor(3 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);

    const padding = useMemo(() => Math.floor(12 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const borderRadius = useMemo(() => Math.floor(16 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const marginBottom = useMemo(() => Math.floor(8 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const minIndicatorWidth = useMemo(() => Math.floor(60 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);

    const dotStyle = (index: number) => [
      styles.dot,
      {
        width: dotSize,
        height: dotSize,
        borderRadius: dotRadius,
        marginHorizontal: dotSpacing,
        backgroundColor: dotColor,
        opacity: phase === index ? 1 : 0.3,
      },
    ];

    return (
      <View style={[styles.container, { backgroundColor, padding, borderRadius, marginBottom, minWidth: minIndicatorWidth }, style]}>
        <View style={dotStyle(0)} />
        <View style={dotStyle(1)} />
        <View style={dotStyle(2)} />
      </View>
    );
  }
);

TypingIndicator.displayName = "TypingIndicator";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12, // default, will be overridden
    borderRadius: 16, // default, will be overridden
    alignSelf: "flex-start",
    marginBottom: 8, // default, will be overridden
    minWidth: 60, // default, will be overridden
  },
  dot: {
    width: 8, // default, will be overridden
    height: 8, // default, will be overridden
    borderRadius: 4, // default, will be overridden
    marginHorizontal: 3, // default, will be overridden
  },
});

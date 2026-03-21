/**
 * Icon Renderer Components
 * SVG rendering and background rendering logic
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { IconRenderProps } from '../iconStore';

/**
 * Renders an SVG icon from path data
 *
 * @param svgPath - SVG path string
 * @param svgViewBox - SVG viewBox attribute
 * @param size - Icon size in pixels
 * @param color - Icon color
 * @param testID - Test ID for testing
 * @param accessibilityLabel - Accessibility label
 * @returns SVG element
 */
export function renderSvgIcon(
  svgPath: string,
  svgViewBox: string,
  size: number,
  color: string,
  testID?: string,
  accessibilityLabel?: string,
  accessibilityRole?: import('react-native').AccessibilityRole
): React.ReactElement {
  return (
    <Svg
      viewBox={svgViewBox}
      width={size}
      height={size}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      <Path d={svgPath} fill={color} />
    </Svg>
  );
}

/**
 * Renders an icon with a circular background
 *
 * @param iconElement - Icon element to wrap
 * @param size - Icon size in pixels
 * @param backgroundColor - Background color
 * @param style - Additional styles
 * @param testID - Test ID for testing
 * @param accessibilityLabel - Accessibility label
 * @returns Wrapped icon with background
 */
export function renderWithBackground(
  iconElement: React.ReactNode,
  size: number,
  backgroundColor: string,
  style?: StyleProp<ViewStyle>,
  testID?: string,
  accessibilityLabel?: string,
  accessibilityRole?: import('react-native').AccessibilityRole
): React.ReactElement {
  const containerSize = size + 16;

  return (
    <View
      style={[
        styles.backgroundContainer,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
          backgroundColor,
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      {iconElement}
    </View>
  );
}

/**
 * Builds render props for custom icon renderer
 *
 * @param name - Icon name
 * @param size - Icon size in pixels
 * @param color - Icon color
 * @param style - Additional styles
 * @param testID - Test ID
 * @param accessibilityLabel - Accessibility label
 * @returns Icon render props
 */
export function buildIconRenderProps(
  name: string,
  size: number,
  color: string,
  style?: StyleProp<ViewStyle>,
  testID?: string,
  accessibilityLabel?: string,
  accessibilityRole?: import('react-native').AccessibilityRole
): IconRenderProps {
  return {
    name,
    size,
    color,
    style: style as StyleProp<ViewStyle>,
    testID,
    accessibilityLabel,
    accessibilityRole,
  };
}

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

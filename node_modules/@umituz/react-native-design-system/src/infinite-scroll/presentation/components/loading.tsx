/**
 * Loading Component
 *
 * Presentation component for loading state
 * Fully customizable via props
 * Accessibility support included
 */

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import type { LoadingProps } from "./types";

export const Loading = React.memo<LoadingProps>(({
  containerStyle,
  size = "large",
  color,
  accessibilityLabel = "Loading",
  ...accessibilityProps
}) => (
  <View
    style={[styles.container, containerStyle]}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="progressbar"
    accessibilityState={{ busy: true }}
    {...accessibilityProps}
  >
    <ActivityIndicator size={size} color={color} />
  </View>
));

Loading.displayName = "Loading";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

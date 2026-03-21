/**
 * Loading More Component
 *
 * Presentation component for loading more state
 * Fully customizable via props
 * Accessibility support included
 */

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import type { LoadingMoreProps } from "./types";

export const LoadingMore = React.memo<LoadingMoreProps>(({
  containerStyle,
  size = "small",
  color,
  accessibilityLabel = "Loading more",
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

LoadingMore.displayName = "LoadingMore";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
});

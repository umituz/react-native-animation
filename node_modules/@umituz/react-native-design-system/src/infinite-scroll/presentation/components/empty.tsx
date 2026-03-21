/**
 * Empty Component
 *
 * Presentation component for empty state
 * Fully customizable via props
 * Accessibility support included
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { EmptyProps } from "./types";

export const Empty = React.memo<EmptyProps>(({
  text = "No items found",
  containerStyle,
  textStyle,
  accessibilityLabel = "Empty list",
  ...accessibilityProps
}) => (
  <View
    style={[styles.container, containerStyle]}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="text"
    accessibilityValue={{ text }}
    {...accessibilityProps}
  >
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </View>
));

Empty.displayName = "Empty";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

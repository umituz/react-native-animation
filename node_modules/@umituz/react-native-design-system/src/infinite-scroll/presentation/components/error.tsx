/**
 * Error Component
 *
 * Presentation component for error state
 * Fully customizable via props
 * Accessibility support included
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { ErrorProps } from "./types";

export const Error = React.memo<ErrorProps>(({
  error,
  onRetry,
  retryText = "Tap to retry",
  containerStyle,
  errorTextStyle,
  retryTextStyle,
  accessibilityLabel,
  retryAccessibilityHint = "Double tap to retry",
  ...accessibilityProps
}) => (
  <View
    style={[styles.container, containerStyle]}
    accessibilityLabel={accessibilityLabel || `Error: ${error}`}
    accessibilityRole="alert"
    {...accessibilityProps}
  >
    <Text
      style={[styles.errorText, errorTextStyle]}
      accessibilityRole="text"
    >
      {error}
    </Text>
    <TouchableOpacity
      onPress={onRetry}
      accessibilityRole="button"
      accessibilityLabel={retryText}
      accessibilityHint={retryAccessibilityHint}
    >
      <Text style={[styles.retryText, retryTextStyle]}>{retryText}</Text>
    </TouchableOpacity>
  </View>
));

Error.displayName = "Error";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});

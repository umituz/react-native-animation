/**
 * Component Types
 *
 * Shared types for presentation components
 */

import type { TextStyle, ViewStyle, AccessibilityProps } from "react-native";

export interface EmptyProps extends AccessibilityProps {
  /**
   * Optional text to display
   * Default: "No items found"
   */
  text?: string;

  /**
   * Optional accessibility label
   * Default: "Empty list"
   */
  accessibilityLabel?: string;

  /**
   * Optional custom style for container
   */
  containerStyle?: ViewStyle;

  /**
   * Optional custom style for text
   */
  textStyle?: TextStyle;
}

export interface ErrorProps extends AccessibilityProps {
  /**
   * Error message to display
   */
  error: string;

  /**
   * Retry callback
   */
  onRetry: () => void;

  /**
   * Optional text for retry button
   * Default: "Tap to retry"
   */
  retryText?: string;

  /**
   * Optional accessibility label for error
   * Default: "Error: {error}"
   */
  accessibilityLabel?: string;

  /**
   * Optional accessibility hint for retry button
   * Default: "Double tap to retry"
   */
  retryAccessibilityHint?: string;

  /**
   * Optional custom style for container
   */
  containerStyle?: ViewStyle;

  /**
   * Optional custom style for error text
   */
  errorTextStyle?: TextStyle;

  /**
   * Optional custom style for retry text
   */
  retryTextStyle?: TextStyle;
}

export interface LoadingProps extends AccessibilityProps {
  /**
   * Optional custom style for container
   */
  containerStyle?: ViewStyle;

  /**
   * Optional size for indicator
   * Default: "large"
   */
  size?: "small" | "large" | number;

  /**
   * Optional color for indicator
   */
  color?: string;

  /**
   * Optional accessibility label
   * Default: "Loading"
   */
  accessibilityLabel?: string;
}

export interface LoadingMoreProps extends AccessibilityProps {
  /**
   * Optional custom style for container
   */
  containerStyle?: ViewStyle;

  /**
   * Optional size for indicator
   * Default: "small"
   */
  size?: "small" | "large" | number;

  /**
   * Optional color for indicator
   */
  color?: string;

  /**
   * Optional accessibility label
   * Default: "Loading more"
   */
  accessibilityLabel?: string;
}

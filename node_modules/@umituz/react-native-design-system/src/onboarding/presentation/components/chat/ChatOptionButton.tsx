/**
 * Chat Option Button Component
 *
 * Displays a selectable option in the chat interface
 * Lazy loads animations for optimal bundle size
 * Fully responsive - scales padding, font sizes, and icon sizes
 */

import React, { memo, useMemo } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from "react-native";
import { useResponsive } from "../../../../responsive/useResponsive";
import type { ChatOption } from "../../../domain/entities/ChatStep";

export interface ChatOptionButtonProps {
  /** Option data */
  option: ChatOption;

  /** Button press handler */
  onPress: (option: ChatOption) => void;

  /** Button background color */
  backgroundColor?: string;

  /** Button text color */
  textColor?: string;

  /** Button border color */
  borderColor?: string;

  /** Whether button is disabled */
  disabled?: boolean;

  /** Additional styles */
  style?: ViewStyle;

  /** Enable animations (default: true) */
  animate?: boolean;

  /** Custom icon component */
  renderIcon?: (iconName: string) => React.ReactNode;
}

/**
 * Chat option button component
 * Responsive design: Scales padding, font size, and min-width based on screen size
 */
export const ChatOptionButton = memo(
  ({
    option,
    onPress,
    backgroundColor = "#F3F4F6",
    textColor = "#1F2937",
    borderColor = "#E5E7EB",
    disabled = false,
    style,
    renderIcon,
  }: ChatOptionButtonProps) => {
    const responsive = useResponsive();

    const handlePress = () => {
      if (!disabled) {
        onPress(option);
      }
    };

    // Responsive sizing based on screen width and safe area
    const padding = useMemo(() => Math.floor(14 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const borderRadius = useMemo(() => Math.floor(12 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const fontSize = useMemo(() => Math.floor(16 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const marginBottom = useMemo(() => Math.floor(8 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const iconMargin = useMemo(() => Math.floor(12 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);

    // Responsive min-width: tablets allow wider buttons
    const minButtonWidth = useMemo(() => {
      const screenWidth = responsive.insets.left + responsive.insets.right + 375; // Approximate base width
      const baseMinWidth = 200;
      const scaledMinWidth = Math.floor(baseMinWidth * (screenWidth / 375) * responsive.spacingMultiplier);
      return Math.min(scaledMinWidth, baseMinWidth * 1.5); // Cap at 1.5x for very large screens
    }, [responsive.insets.left, responsive.insets.right, responsive.spacingMultiplier]);

    const buttonStyle = useMemo(
      () => [
        styles.button,
        {
          padding,
          borderRadius,
          marginBottom,
          minWidth: minButtonWidth,
          backgroundColor,
          borderColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ],
      [padding, borderRadius, marginBottom, minButtonWidth, backgroundColor, borderColor, disabled, style]
    );

    const textStyle = useMemo(
      () => [
        styles.text,
        {
          fontSize,
          color: textColor,
        },
      ],
      [fontSize, textColor]
    );

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {option.icon && renderIcon && (
          <View style={[styles.iconContainer, { marginRight: iconMargin }]}>{renderIcon(option.icon)}</View>
        )}
        <Text style={textStyle}>{option.label}</Text>
      </TouchableOpacity>
    );
  }
);

ChatOptionButton.displayName = "ChatOptionButton";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14, // default, will be overridden by responsive value
    borderRadius: 12, // default, will be overridden
    borderWidth: 1,
    marginBottom: 8, // default, will be overridden
    minWidth: 200, // default, will be overridden
  },
  iconContainer: {
    marginRight: 12, // default, will be overridden
  },
  text: {
    fontSize: 16, // default, will be overridden
    fontWeight: "600",
    flex: 1,
  },
});

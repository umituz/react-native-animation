/**
 * Chat Message Component
 *
 * Displays a single message in the chat interface
 * Lazy loads animations for optimal bundle size
 * Fully responsive - uses safe area insets and responsive sizing
 */

import React, { memo, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ViewStyle, Dimensions } from "react-native";
import { useResponsive } from "../../../../responsive/useResponsive";

import type { ChatMessage as ChatMessageEntity } from "../../../domain/entities/ChatMessage";

export interface ChatMessageProps {
  /** Message data */
  message: ChatMessageEntity;

  /** Message background color */
  backgroundColor?: string;

  /** Message text color */
  textColor?: string;

  /** Important message highlight color */
  importantColor?: string;

  /** User message background color */
  userBackgroundColor?: string;

  /** User message text color */
  userTextColor?: string;

  /** Additional styles */
  style?: ViewStyle;

  /** Enable animations (default: true) */
  animate?: boolean;
}

/**
 * Chat message bubble component
 * Responsive design: Uses safe area insets and scales padding/font sizes
 */
export const ChatMessage = memo(
  ({
    message,
    backgroundColor = "#FFFFFF",
    textColor = "#000000",
    importantColor = "#FF6B6B",
    userBackgroundColor = "#3B82F6",
    userTextColor = "#FFFFFF",
    style,
    animate = true,
  }: ChatMessageProps) => {
    const responsive = useResponsive();
    const [opacity, setOpacity] = React.useState(0);

    useEffect(() => {
      if (!animate) {
        setOpacity(1);
        return;
      }

      // Simple fade-in without Reanimated
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 50);

      return () => clearTimeout(timer);
    }, [animate]);

    // Responsive padding based on screen size (uses central spacingMultiplier)
    const padding = useMemo(() => Math.floor(12 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const fontSize = useMemo(() => Math.floor(16 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const lineHeight = useMemo(() => Math.floor(22 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const borderRadius = useMemo(() => Math.floor(16 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const marginBottom = useMemo(() => Math.floor(8 * responsive.spacingMultiplier), [responsive.spacingMultiplier]);
    const borderWidth = useMemo(() => Math.max(2, Math.floor(2 * responsive.spacingMultiplier)), [responsive.spacingMultiplier]);
    const maxTextWidth = useMemo(() => {
      // On tablets, allow wider messages (up to 90% vs 80% on mobile)
      const screenWidth = Dimensions.get('window').width;
      const baseMaxWidth = responsive.insets.left + responsive.insets.right > 20 ? 0.9 : 0.8;
      return Math.floor(screenWidth * baseMaxWidth);
    }, [responsive.insets.left, responsive.insets.right]);

    const containerStyle = useMemo(
      () => [
        styles.container,
        {
          maxWidth: maxTextWidth,
          padding,
          borderRadius,
          marginBottom,
        },
        message.isUser ? styles.userContainer : styles.botContainer,
        {
          backgroundColor: message.isUser ? userBackgroundColor : backgroundColor,
          opacity,
        },
        message.isImportant && !message.isUser ? {
          borderWidth,
          borderColor: "#FF6B6B",
        } : null,
        style,
      ],
      [
        padding,
        borderRadius,
        marginBottom,
        borderWidth,
        maxTextWidth,
        backgroundColor,
        userBackgroundColor,
        message.isUser,
        message.isImportant,
        opacity,
        style,
      ]
    );

    const textStyle = useMemo(
      () => [
        styles.text,
        {
          fontSize,
          lineHeight,
          color: message.isUser ? userTextColor : textColor,
        },
        message.isImportant && !message.isUser
          ? { color: importantColor, fontWeight: "600" as const }
          : null,
      ],
      [fontSize, lineHeight, textColor, userTextColor, message.isUser, message.isImportant, importantColor]
    );

    return (
      <View style={containerStyle}>
        <Text style={textStyle}>{message.text}</Text>
      </View>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

const styles = StyleSheet.create({
  container: {
    // maxWidth is set dynamically based on screen size
    padding: 12, // default, will be overridden by responsive value
    borderRadius: 16, // default, will be overridden
    marginBottom: 8, // default, will be overridden
  },
  userContainer: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  botContainer: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16, // default, will be overridden
    lineHeight: 22, // default, will be overridden
  },
});

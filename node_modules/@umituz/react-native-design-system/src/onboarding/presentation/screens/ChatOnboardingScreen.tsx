/**
 * Chat Onboarding Screen
 *
 * Chat-based onboarding experience for user engagement
 * Fully configurable flow, optional mascot, lazy-loaded animations
 *
 * Responsive Design:
 * - Uses useSafeAreaInsets() from react-native-safe-area-context for proper device compatibility
 * - Flexible flex-based layouts that adapt to all screen sizes
 * - KeyboardAvoidingView for proper keyboard handling on iOS/Android
 * - Percentage-based maxWidth in chat messages for responsive text layout
 * - Proper insets integration with device and safe-area modules
 *
 * Compatible with:
 * - @umituz/react-native-design-system/device (useDeviceInfo)
 * - @umituz/react-native-design-system/safe-area (useSafeAreaInsets)
 * - All screen sizes (iPhone, iPad, Android phones/tablets)
 */

import React, { memo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  Text,
} from "react-native";
import { useResponsive } from "../../../responsive/useResponsive";

import type { ChatStep } from "../../domain/entities/ChatStep";
import { useChatOnboarding } from "../hooks/useChatOnboarding";
import { ChatMessageComponent, ChatOptionButton, TypingIndicator } from "../components/chat";

export interface ChatOnboardingScreenProps {
  /** Chat onboarding flow configuration */
  flow: Record<string, ChatStep>;

  /** Initial step ID */
  initialStepId?: string;

  /** Completion callback */
  onComplete?: () => void;

  /** Skip callback */
  onSkip?: () => void;

  /** Show mascot (default: false) */
  showMascot?: boolean;

  /** Mascot component to render */
  renderMascot?: (state: string) => React.ReactNode;

  /** Theme colors */
  theme?: {
    /** Background color */
    background?: string;

    /** Message background color */
    messageBackground?: string;

    /** Message text color */
    messageText?: string;

    /** User message background color */
    userMessageBackground?: string;

    /** User message text color */
    userMessageText?: string;

    /** Button background color */
    buttonBackground?: string;

    /** Button text color */
    buttonText?: string;

    /** Button border color */
    buttonBorder?: string;
  };

  /** Custom styles */
  style?: ViewStyle;

  /** Delay between messages */
  messageDelay?: number;

  /** Render custom icon */
  renderIcon?: (iconName: string) => React.ReactNode;

  /** Storage key for progress persistence */
  storageKey?: string;
}

/**
 * Chat onboarding screen component
 */
export const ChatOnboardingScreen = memo(
  ({
    flow,
    initialStepId,
    onComplete,
    onSkip,
    showMascot = false,
    renderMascot,
    theme = {},
    style,
    messageDelay = 500,
    renderIcon,
  }: ChatOnboardingScreenProps) => {
    const responsive = useResponsive();

    const {
      currentStep,
      messages,
      showOptions,
      isProcessing,
      showTypingIndicator,
      handleOptionSelect,
      handleSubmitName,
    } = useChatOnboarding({
      flow,
      initialStepId,
      onComplete,
      onSkip,
      messageDelay,
    });

    const [nameInput, setNameInput] = React.useState("");

    const handleNameSubmit = () => {
      handleSubmitName(nameInput);
      setNameInput("");
    };

    const containerStyle = [
      styles.container,
      {
        backgroundColor: theme.background || "#FFFFFF",
        paddingBottom: responsive.insets.bottom + 20,
        paddingTop: responsive.insets.top + 20,
      },
      style,
    ];

    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Mascot Section */}
        {showMascot && renderMascot && currentStep?.mascotState && (
          <View style={styles.mascotContainer}>{renderMascot(currentStep.mascotState)}</View>
        )}

        {/* Messages Section */}
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <ChatMessageComponent
              key={`${currentStep?.id}-${index}`}
              message={msg}
              backgroundColor={theme.messageBackground}
              textColor={theme.messageText}
              userBackgroundColor={theme.userMessageBackground}
              userTextColor={theme.userMessageText}
            />
          ))}

          {showTypingIndicator && (
            <TypingIndicator
              backgroundColor={theme.messageBackground}
              dotColor={theme.messageText}
            />
          )}

          {/* Options Section */}
          {showOptions && currentStep?.options && (
            <View style={styles.optionsContainer}>
              {currentStep.options.map((option, index) => (
                <ChatOptionButton
                  key={`${option.value}-${index}`}
                  option={option}
                  onPress={handleOptionSelect}
                  backgroundColor={theme.buttonBackground}
                  textColor={theme.buttonText}
                  borderColor={theme.buttonBorder}
                  disabled={isProcessing}
                  renderIcon={renderIcon}
                />
              ))}
            </View>
          )}

          {/* Name Input Section */}
          {currentStep?.isNameInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.nameInput, { borderColor: theme.buttonBorder }]}
                placeholder="Enter your name..."
                placeholderTextColor={theme.messageText}
                value={nameInput}
                onChangeText={setNameInput}
                onSubmitEditing={handleNameSubmit}
                returnKeyType="done"
                autoCapitalize="words"
              />
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.buttonBackground }]}
                onPress={handleNameSubmit}
                disabled={isProcessing || !nameInput.trim()}
              >
                <Text style={[styles.submitButtonText, { color: theme.buttonText }]}>Send</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
);

ChatOnboardingScreen.displayName = "ChatOnboardingScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mascotContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 10,
  },
  optionsContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  nameInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  submitButton: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

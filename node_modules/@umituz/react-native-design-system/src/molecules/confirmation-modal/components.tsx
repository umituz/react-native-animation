/**
 * ConfirmationModal Subcomponents
 *
 * Smaller components for the confirmation modal
 */

import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { AtomicText, AtomicButton, AtomicIcon } from '../../atoms';
import type { DesignTokens } from '../../theme';
import {
  getButtonContainerStyle,
  getButtonStyle,
} from './styles/confirmationModalStyles';

export const ConfirmationModalIcon: React.FC<{
  icon: string;
  iconColor: string;
  testID: string;
}> = ({ icon, iconColor, testID }) => (
  <AtomicIcon
    name={icon}
    size="xl"
    color={iconColor as 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'surfaceVariant'}
    testID={`${testID}-icon`}
  />
);

export const ConfirmationModalTitle: React.FC<{
  title: string;
  tokens: DesignTokens;
  testID: string;
}> = ({ title, tokens, testID }) => (
  <AtomicText
    type="titleLarge"
    style={{
      color: tokens.colors.textPrimary,
      textAlign: 'center',
      fontWeight: tokens.typography.bold,
    }}
    testID={`${testID}-title`}
  >
    {title}
  </AtomicText>
);

export const ConfirmationModalMessage: React.FC<{
  message: string;
  tokens: DesignTokens;
  testID: string;
}> = ({ message, tokens, testID }) => (
  <AtomicText
    type="bodyMedium"
    style={{
      color: tokens.colors.textSecondary,
      textAlign: 'center',
      lineHeight: tokens.typography.bodyMedium.lineHeight,
    }}
    testID={`${testID}-message`}
  >
    {message}
  </AtomicText>
);

export const ConfirmationModalButtons: React.FC<{
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonStyle: StyleProp<ViewStyle>;
  testID: string;
}> = ({ confirmText, cancelText, onConfirm, onCancel, confirmButtonStyle, testID }) => (
  <View style={getButtonContainerStyle()}>
    <AtomicButton
      variant="outline"
      size="md"
      onPress={onCancel}
      style={getButtonStyle()}
      testID={`${testID}-cancel-button`}
    >
      {cancelText}
    </AtomicButton>

    <AtomicButton
      variant="primary"
      size="md"
      onPress={onConfirm}
      style={confirmButtonStyle}
      testID={`${testID}-confirm-button`}
    >
      {confirmText}
    </AtomicButton>
  </View>
);
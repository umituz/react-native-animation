/**
 * ConfirmationModal Content Component
 *
 * Content component for confirmation modal
 */

import React, { useMemo } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { ConfirmationModalVariant } from './confirmation-modal/types';
import {
  getVariantConfig,
  getModalContainerStyle,
  getIconContainerStyle,
  getTitleContainerStyle,
  getMessageContainerStyle,
  getButtonStyle,
} from './confirmation-modal/styles/confirmationModalStyles';
import {
  ConfirmationModalIcon,
  ConfirmationModalTitle,
  ConfirmationModalMessage,
  ConfirmationModalButtons,
} from './confirmation-modal/components';

const useConfirmButtonStyle = (
  variant: ConfirmationModalVariant,
  tokens: ReturnType<typeof useAppDesignTokens>
) => {
  return useMemo(() => {
    const baseStyle = getButtonStyle();
    const variantStyles: ViewStyle[] = [];

    if (variant === 'destructive') variantStyles.push({ backgroundColor: tokens.colors.error });
    if (variant === 'warning') variantStyles.push({ backgroundColor: tokens.colors.warning });
    if (variant === 'success') variantStyles.push({ backgroundColor: tokens.colors.success });

    return [baseStyle, ...variantStyles];
  }, [variant, tokens.colors]);
};

export const ConfirmationModalContent: React.FC<{
  tokens: ReturnType<typeof useAppDesignTokens>;
  variant: ConfirmationModalVariant;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  icon?: string;
  onConfirm: () => void;
  onCancel: () => void;
  style?: StyleProp<ViewStyle>;
  testID: string;
}> = ({ tokens, variant, title, message, confirmText, cancelText, icon, onConfirm, onCancel, style, testID }) => {
  const variantConfig = getVariantConfig(variant as 'default' | 'destructive' | 'warning' | 'success');
  const finalIcon = icon || variantConfig.icon;
  const confirmButtonStyle = useConfirmButtonStyle(variant, tokens);

  return (
    <View style={[getModalContainerStyle(tokens), style]}>
      <View style={getIconContainerStyle()}>
        <ConfirmationModalIcon
          icon={finalIcon}
          iconColor={variantConfig.iconColor}
          testID={testID}
        />
      </View>

      <View style={getTitleContainerStyle()}>
        <ConfirmationModalTitle title={title} tokens={tokens} testID={testID} />
      </View>

      <View style={getMessageContainerStyle()}>
        <ConfirmationModalMessage message={message} tokens={tokens} testID={testID} />
      </View>

      <ConfirmationModalButtons
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonStyle={confirmButtonStyle}
        testID={testID}
      />
    </View>
  );
};
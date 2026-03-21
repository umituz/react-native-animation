/**
 * ConfirmationModal Main Component
 *
 * Main confirmation modal component
 */

import React, { useCallback } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { ConfirmationModalProps } from './confirmation-modal/types';
import {
  getModalOverlayStyle,
  getBackdropStyle,
} from './confirmation-modal/styles/confirmationModalStyles';
import { ConfirmationModalContent } from './ConfirmationModalContent';

const useBackdropHandler = (backdropDismissible: boolean, onCancel: () => void) => {
  return useCallback(() => {
    if (backdropDismissible) {
      onCancel();
    }
  }, [backdropDismissible, onCancel]);
};

const ConfirmationModalBackdrop: React.FC<{
  showBackdrop: boolean;
  onBackdropPress: () => void;
  testID: string;
}> = React.memo(({ showBackdrop, onBackdropPress, testID }) => {
  if (!showBackdrop) return null;

  return (
    <TouchableOpacity
      style={getBackdropStyle()}
      activeOpacity={1}
      onPress={onBackdropPress}
      testID={`${testID}-backdrop`}
    />
  );
});

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  variant = 'default',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  icon,
  onConfirm,
  onCancel,
  showBackdrop = true,
  backdropDismissible = true,
  style,
  testID = 'atomic-confirmation-modal',
}) => {
  const tokens = useAppDesignTokens();
  const handleBackdropPress = useBackdropHandler(backdropDismissible, onCancel);

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onCancel}
      statusBarTranslucent
      testID={testID}
      accessibilityViewIsModal={true}
    >
      <View style={getModalOverlayStyle()}>
        <ConfirmationModalBackdrop
          showBackdrop={showBackdrop}
          onBackdropPress={handleBackdropPress}
          testID={testID}
        />

        <ConfirmationModalContent
          tokens={tokens}
          variant={variant}
          title={title}
          message={message}
          confirmText={confirmText}
          cancelText={cancelText}
          icon={icon}
          onConfirm={onConfirm}
          onCancel={onCancel}
          style={style}
          testID={testID}
        />
      </View>
    </Modal>
  );
};
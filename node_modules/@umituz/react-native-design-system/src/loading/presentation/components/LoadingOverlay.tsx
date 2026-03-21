/**
 * LoadingOverlay Component
 * Full-screen loading overlay with spinner
 */

import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { AtomicSpinner } from '../../../atoms/AtomicSpinner';
import type { LoadingOverlayProps } from '../../domain/types/loading.types';

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.5)';

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
  spinnerColor = 'white',
  spinnerSize = 'lg',
  overlayColor = DEFAULT_OVERLAY_COLOR,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <AtomicSpinner
          size={spinnerSize}
          color={spinnerColor}
          text={message}
          textPosition="bottom"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

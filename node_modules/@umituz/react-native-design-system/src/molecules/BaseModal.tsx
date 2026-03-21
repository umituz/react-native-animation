/**
 * BaseModal Component
 * Generic fullscreen modal with responsive design
 * Used across all modals in the app for consistency
 */

import React, { useCallback } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { useResponsive } from '../responsive';
import { AtomicText } from '../atoms/AtomicText';


export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissOnBackdrop?: boolean;
  contentStyle?: ViewStyle;
  testID?: string;
  title?: string;
  subtitle?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  dismissOnBackdrop = true,
  contentStyle,
  testID = 'base-modal',
  title,
  subtitle,
}) => {
  const tokens = useAppDesignTokens();
  const { modalLayout } = useResponsive();

  const handleBackdropPress = useCallback(() => {
    if (dismissOnBackdrop) {
      onClose();
    }
  }, [dismissOnBackdrop, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      testID={testID}
      accessibilityViewIsModal={true}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={[
            styles.backdrop,
            { backgroundColor: `rgba(0, 0, 0, ${modalLayout.backdropOpacity})` }
          ]}
          activeOpacity={1}
          onPress={handleBackdropPress}
          testID={`${testID}-backdrop`}
        />

        <View
          style={[
            styles.content,
            {
              width: modalLayout.width,
              height: modalLayout.height,
              borderRadius: modalLayout.borderRadius,
              backgroundColor: tokens.colors.backgroundPrimary,
              borderColor: tokens.colors.border,
            },
            contentStyle,
          ]}
          testID={`${testID}-content`}
        >
          {(title || subtitle) && (
            <View style={{ 
              paddingTop: tokens.spacing.lg,
              paddingHorizontal: tokens.spacing.md,
              paddingBottom: tokens.spacing.md,
            }}>
              {title && (
                <AtomicText 
                  type="headlineMedium"
                  style={{ 
                    textAlign: 'center',
                    marginBottom: subtitle ? tokens.spacing.xs : 0,
                  }}
                >
                  {title}
                </AtomicText>
              )}
              {subtitle && (
                <AtomicText 
                  type="bodyMedium"
                  style={{ 
                    color: tokens.colors.textSecondary, 
                    textAlign: 'center', 
                    lineHeight: 20,
                  }}
                >
                  {subtitle}
                </AtomicText>
              )}
            </View>
          )}
          {children}
        </View>
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
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    overflow: 'hidden',
    borderWidth: 1,
  },
});

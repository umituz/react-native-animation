import React, { forwardRef, useImperativeHandle, useState, useCallback, useMemo } from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { useSafeAreaInsets } from '../../../safe-area';
import { getResponsiveBottomSheetLayout } from '../../../responsive';
import { calculateResponsiveSize } from '../../../responsive';
import { BOTTOM_SHEET_HANDLE } from '../../../constants';
import type { BottomSheetModalRef, BottomSheetModalProps } from '../types/BottomSheet';


export const BottomSheetModal = forwardRef<BottomSheetModalRef, BottomSheetModalProps>(
  (props, ref) => {
    const {
      children,
      preset = 'medium',
      onDismiss,
      backgroundColor,
    } = props;

    const [visible, setVisible] = useState(false);
    const tokens = useAppDesignTokens();
    const insets = useSafeAreaInsets();
    const { maxHeight, borderRadius } = getResponsiveBottomSheetLayout();

    const PRESET_HEIGHTS = {
      small: maxHeight * 0.35,
      medium: maxHeight * 0.6,
      large: maxHeight * 0.85,
      full: maxHeight,
      custom: maxHeight * 0.6,
    };

    const sheetHeight = PRESET_HEIGHTS[preset] || PRESET_HEIGHTS.medium;

    const present = useCallback(() => {
      setVisible(true);
    }, []);

    const dismiss = useCallback(() => {
      setVisible(false);
      onDismiss?.();
    }, [onDismiss]);

    useImperativeHandle(ref, () => ({
      present,
      dismiss,
      snapToIndex: (index: number) => {
        if (index >= 0) present();
        else dismiss();
      },
      snapToPosition: () => present(),
      expand: () => present(),
      collapse: () => dismiss(),
    }));

    const spacingMultiplier = tokens.spacingMultiplier;

    const styles = useMemo(() => ({
      overlay: {
        flex: 1,
        backgroundColor: tokens.colors.modalOverlay,
        justifyContent: 'flex-end' as const,
      },
      container: {
        height: sheetHeight,
        backgroundColor: backgroundColor || tokens.colors.surface,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        paddingBottom: Math.max(insets.bottom, tokens.spacing.xs),
        width: '100%' as const,
      },
      contentWrapper: {
        flex: 1,
      },
      handle: {
        width: calculateResponsiveSize(BOTTOM_SHEET_HANDLE.width, spacingMultiplier),
        height: calculateResponsiveSize(BOTTOM_SHEET_HANDLE.height, spacingMultiplier),
        backgroundColor: tokens.colors.border,
        borderRadius: calculateResponsiveSize(BOTTOM_SHEET_HANDLE.borderRadius, spacingMultiplier),
        alignSelf: 'center' as const,
        marginTop: tokens.spacing.md,
        marginBottom: tokens.spacing.sm,
      },
    }), [sheetHeight, backgroundColor, tokens, borderRadius, insets.bottom, spacingMultiplier]);

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={dismiss}
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={dismiss}
            accessibilityLabel="Close modal"
          />
          <View style={styles.container}>
            <View style={styles.contentWrapper}>
              <View style={styles.handle} />
              {children}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

BottomSheetModal.displayName = 'BottomSheetModal';

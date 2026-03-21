import React, { forwardRef, useCallback, useMemo, useImperativeHandle, useState } from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { useSafeAreaInsets } from '../../../safe-area';
import { getResponsiveBottomSheetLayout } from '../../../responsive';
import { calculateResponsiveSize } from '../../../responsive';
import { BOTTOM_SHEET_HANDLE } from '../../../constants';
import type {
  BottomSheetRef,
  BottomSheetProps,
} from '../types/BottomSheet';

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {
  const {
    children,
    preset = 'medium',
    snapPoints: customSnapPoints,
    initialIndex,
    backgroundColor,
    onChange,
    onClose,
  } = props;

  const [visible, setVisible] = useState(initialIndex !== undefined && initialIndex >= 0);
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { maxHeight, borderRadius } = getResponsiveBottomSheetLayout();

  const sheetHeight = useMemo(() => {
    if (customSnapPoints && customSnapPoints.length > 0) {
      const highest = customSnapPoints[customSnapPoints.length - 1];
      if (typeof highest === 'number') return highest;
      if (typeof highest === 'string' && highest.endsWith('%')) {
        return (maxHeight * parseFloat(highest)) / 100;
      }
    }
    
    const PRESET_HEIGHTS = {
      small: maxHeight * 0.35,
      medium: maxHeight * 0.6,
      large: maxHeight * 0.85,
      full: maxHeight,
      custom: maxHeight * 0.6,
    };
    return PRESET_HEIGHTS[preset] || PRESET_HEIGHTS.medium;
  }, [preset, customSnapPoints, maxHeight]);

  const present = useCallback(() => {
    setVisible(true);
    onChange?.(0);
  }, [onChange]);

  const dismiss = useCallback(() => {
    setVisible(false);
    onClose?.();
    onChange?.(-1);
  }, [onClose, onChange]);

  const handleContentPress = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  useImperativeHandle(ref, () => ({
    snapToIndex: (index: number) => {
      if (index >= 0) present();
      else dismiss();
    },
    snapToPosition: () => present(),
    expand: () => present(),
    collapse: () => dismiss(),
    close: () => dismiss(),
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
    content: {
      flex: 1,
    }
  }), [sheetHeight, backgroundColor, tokens, borderRadius, insets.bottom, spacingMultiplier]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={dismiss}
      statusBarTranslucent
      accessibilityViewIsModal={true}
    >
      <Pressable style={styles.overlay} onPress={dismiss} accessibilityLabel="Close" accessibilityRole="button">
        <View style={styles.container}>
          <Pressable onPress={handleContentPress} style={styles.content} accessibilityRole="none">
            <View style={styles.handle} />
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
});

BottomSheet.displayName = 'BottomSheet';

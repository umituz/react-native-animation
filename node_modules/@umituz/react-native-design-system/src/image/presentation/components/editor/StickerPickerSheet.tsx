/**
 * Presentation - Sticker Picker Sheet
 */

import React, { forwardRef } from 'react';
import { View, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native';
import { BottomSheetModal } from '../../../../molecules/bottom-sheet/components/BottomSheetModal';
import type { BottomSheetModalRef } from '../../../../molecules/bottom-sheet/types/BottomSheet';
import { AtomicText } from '../../../../atoms/AtomicText';
import { useAppDesignTokens } from '../../../../theme/hooks/useAppDesignTokens';

export interface StickerPickerSheetProps {
  stickers: string[];
  onSelectSticker: (uri: string) => void;
  onDismiss: () => void;
  title?: string;
  snapPoints?: string[];
}

export const StickerPickerSheet = forwardRef<BottomSheetModalRef, StickerPickerSheetProps>(
  ({ stickers, onSelectSticker, onDismiss, title = 'Select Sticker', snapPoints = ['60%'] }, ref) => {
    const tokens = useAppDesignTokens();
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const stickerSize = (SCREEN_WIDTH - 64) / 3;

    return (
      <BottomSheetModal ref={ref} snapPoints={snapPoints} onDismiss={onDismiss}>
        <View style={{ padding: tokens.spacing.lg, flex: 1 }}>
          <AtomicText style={{ ...tokens.typography.titleLarge, fontWeight: tokens.typography.semibold, marginBottom: tokens.spacing.md }}>
            {title}
          </AtomicText>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
              {stickers.map((uri) => (
                <TouchableOpacity
                  key={uri}
                  onPress={() => onSelectSticker(uri)}
                  style={{
                    width: stickerSize,
                    aspectRatio: 1,
                    backgroundColor: tokens.colors.surfaceVariant,
                    borderRadius: tokens.radius.md,
                    padding: tokens.spacing.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </BottomSheetModal>
    );
  }
);

StickerPickerSheet.displayName = 'StickerPickerSheet';

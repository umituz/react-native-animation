/**
 * Presentation - Text Editor Sheet
 */

import React, { forwardRef, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheetModal } from '../../../../molecules/bottom-sheet/components/BottomSheetModal';
import type { BottomSheetModalRef } from '../../../../molecules/bottom-sheet/types/BottomSheet';
import { AtomicText } from '../../../../atoms/AtomicText';
import { AtomicIcon } from '../../../../atoms';
import { useAppDesignTokens } from '../../../../theme/hooks/useAppDesignTokens';
import { TextContentTab, TextStyleTab, TextTransformTab } from './text-editor';

export interface TextEditorSheetProps {
  text: string;
  onTextChange: (text: string) => void;
  color: string;
  onColorChange: (color: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  fontFamily: string;
  onFontFamilyChange: (font: string) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  rotation: number;
  onRotationChange: (rotation: number) => void;
  opacity: number;
  onOpacityChange: (opacity: number) => void;
  onDelete?: () => void;
  onDismiss: () => void;
  snapPoints?: string[];
  t: (key: string) => string;
}

export const TextEditorSheet = forwardRef<BottomSheetModalRef, TextEditorSheetProps>((props, ref) => {
  const tokens = useAppDesignTokens();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'transform'>('content');
  const { onDismiss, snapPoints = ['75%'], t } = props;

  const tabs: { id: 'content' | 'style' | 'transform'; label: string; icon: string }[] = [
    { id: 'content', label: 'Text', icon: 'text' },
    { id: 'style', label: 'Style', icon: 'color-palette' },
    { id: 'transform', label: 'Edit', icon: 'options' },
  ];

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints} onDismiss={onDismiss}>
      <View style={{ padding: tokens.spacing.lg, flex: 1 }}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, marginBottom: tokens.spacing.lg }}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={{
                flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 3, borderBottomColor: activeTab === tab.id ? tokens.colors.primary : 'transparent'
              }}
            >
              <AtomicIcon name={tab.icon} size={20} color={activeTab === tab.id ? 'primary' : 'secondary'} />
              <AtomicText style={{ 
                ...tokens.typography.labelSmall, 
                color: activeTab === tab.id ? tokens.colors.primary : tokens.colors.textSecondary,
                marginTop: 4
              }}>
                {tab.label}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }} keyboardShouldPersistTaps="handled">
          {activeTab === 'content' && <TextContentTab text={props.text} onTextChange={props.onTextChange} t={t} />}
          {activeTab === 'style' && (
            <TextStyleTab 
              fontSize={props.fontSize} setFontSize={props.onFontSizeChange}
              color={props.color} setColor={props.onColorChange}
              fontFamily={props.fontFamily} setFontFamily={props.onFontFamilyChange}
              t={t}
            />
          )}
          {activeTab === 'transform' && (
            <TextTransformTab 
              scale={props.scale} setScale={props.onScaleChange}
              rotation={props.rotation} setRotation={props.onRotationChange}
              opacity={props.opacity} setOpacity={props.onOpacityChange}
              onDelete={props.onDelete}
              t={t}
            />
          )}
        </ScrollView>
      </View>
    </BottomSheetModal>
  );
});

TextEditorSheet.displayName = 'TextEditorSheet';

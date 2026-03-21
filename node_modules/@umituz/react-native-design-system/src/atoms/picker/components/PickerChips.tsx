/**
 * PickerChips Component
 *
 * Component for rendering selected chips in multi-select mode.
 * Extracted from AtomicPicker for better separation of concerns.
 */

import React, { useMemo, useCallback } from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { PickerOption } from '../types';
import { AtomicIcon, useIconName } from '../../icon';
import { AtomicText } from '../../AtomicText';
import {
  getChipContainerStyles,
  getChipStyles,
  getChipTextStyles,
} from '../styles/pickerStyles';

interface PickerChipsProps {
  selectedOptions: PickerOption[];
  onRemoveChip: (value: string) => void;
  testID?: string;
}

export const PickerChips: React.FC<PickerChipsProps> = React.memo(({
  selectedOptions,
  onRemoveChip,
}) => {
  const tokens = useAppDesignTokens();
  const closeIcon = useIconName('close');

  // Memoize styles to prevent recalculation
  const chipContainerStyles = useMemo(() => getChipContainerStyles(tokens), [tokens]);
  const chipStyles = useMemo(() => getChipStyles(tokens), [tokens]);
  const chipTextStyles = useMemo(() => getChipTextStyles(tokens), [tokens]);

  // Memoized chip renderer - handleRemove created inline to avoid useCallback inside callback
  const renderChip = useCallback((opt: PickerOption) => {
    const handleRemove = (e: GestureResponderEvent) => {
      e.stopPropagation();
      onRemoveChip(opt.value);
    };

    return (
      <View key={opt.value} style={chipStyles}>
        <AtomicText style={chipTextStyles}>{opt.label}</AtomicText>
        <TouchableOpacity
          onPress={handleRemove}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${opt.label}`}
        >
          <AtomicIcon name={closeIcon} size="sm" color="primary" />
        </TouchableOpacity>
      </View>
    );
  }, [chipStyles, chipTextStyles, closeIcon, onRemoveChip]);

  return (
    <View style={chipContainerStyles}>
      {selectedOptions.map(renderChip)}
    </View>
  );
});
PickerChips.displayName = 'PickerChips';
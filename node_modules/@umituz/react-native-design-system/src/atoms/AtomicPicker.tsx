/**
 * AtomicPicker Component
 *
 * A reusable option picker/dropdown component for selecting from a list of options.
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicPickerProps } from './picker/types';
import { AtomicText } from './AtomicText';
import { PickerModal } from './picker/components/PickerModal';
import { PickerChips } from './picker/components/PickerChips';
import { PickerIcons } from './picker/components/PickerIcons';
import {
  getPickerContainerStyles,
  getPickerLabelStyles,
  getPickerPlaceholderStyles,
  getPickerValueStyles,
  getPickerErrorStyles,
} from './picker/styles/pickerStyles';
import { usePickerState } from './picker/hooks/usePickerState';

export type { AtomicPickerProps, PickerOption, PickerSize } from './picker/types';

export const AtomicPicker: React.FC<AtomicPickerProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  autoClose = true,
  size = 'md',
  modalTitle,
  emptyMessage,
  searchPlaceholder,
  clearAccessibilityLabel,
  closeAccessibilityLabel,
  style,
  labelStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const pickerState = usePickerState({ value, multiple, options, placeholder, autoClose, onChange });

  const containerStyles = getPickerContainerStyles(tokens);
  const labelStyles = getPickerLabelStyles(tokens);
  const placeholderStyles = getPickerPlaceholderStyles(tokens);
  const valueStyles = getPickerValueStyles(tokens);
  const errorStyles = getPickerErrorStyles(tokens);

  const hasSelection = pickerState.selectedOptions.length > 0;

  return (
    <View>
      {label && <AtomicText style={StyleSheet.flatten([labelStyles.base, labelStyles.size[size], labelStyle])}>{label}</AtomicText>}

      <TouchableOpacity
        onPress={() => !disabled && pickerState.openModal()}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder || 'Select option'}
        accessibilityState={{ disabled }}
        testID={testID}
        style={StyleSheet.flatten([
          containerStyles.base,
          containerStyles.size[size],
          error && containerStyles.state.error,
          disabled && containerStyles.state.disabled,
          style,
        ])}
      >
        <AtomicText
          style={StyleSheet.flatten([
            hasSelection ? valueStyles.base : placeholderStyles.base,
            hasSelection ? valueStyles.size[size] : placeholderStyles.size[size],
          ])}
          numberOfLines={1}
        >
          {pickerState.displayText}
        </AtomicText>

        <PickerIcons
          clearable={clearable}
          disabled={disabled}
          modalVisible={pickerState.modalVisible}
          selectedOptionsCount={pickerState.selectedOptions.length}
          onClear={pickerState.handleClear}
          clearAccessibilityLabel={clearAccessibilityLabel}
          testID={testID}
        />
      </TouchableOpacity>

      <PickerChips
        selectedOptions={pickerState.selectedOptions}
        onRemoveChip={pickerState.handleChipRemove}
        testID={testID}
      />

      {error && <AtomicText style={errorStyles}>{error}</AtomicText>}

      <PickerModal
        visible={pickerState.modalVisible}
        onClose={pickerState.closeModal}
        options={options}
        selectedValues={pickerState.selectedValues}
        onSelect={pickerState.handleSelect}
        title={modalTitle || label}
        searchable={searchable}
        searchQuery={pickerState.searchQuery}
        onSearchChange={pickerState.handleSearch}
        filteredOptions={pickerState.filteredOptions}
        multiple={multiple}
        emptyMessage={emptyMessage}
        searchPlaceholder={searchPlaceholder}
        closeAccessibilityLabel={closeAccessibilityLabel}
        testID={testID}
      />
    </View>
  );
};

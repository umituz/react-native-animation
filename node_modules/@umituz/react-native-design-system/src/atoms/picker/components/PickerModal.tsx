/**
 * PickerModal - Selection modal for AtomicPicker
 */

import React, { useCallback, useMemo } from 'react';
import { View, Modal, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from '../../../safe-area';
import { useAppDesignTokens } from '../../../theme';
import { PickerOption } from '../types';
import { AtomicIcon, useIconName } from '../../icon';
import { AtomicText } from '../../AtomicText';
import {
  getModalOverlayStyles,
  getModalContainerStyles,
  getModalHeaderStyles,
  getModalTitleStyles,
  getSearchContainerStyles,
  getSearchInputStyles,
  getOptionContainerStyles,
  getOptionTextStyles,
  getOptionDescriptionStyles,
  getEmptyStateStyles,
  getEmptyStateTextStyles,
} from '../styles/pickerStyles';

interface PickerModalProps {
  visible: boolean;
  onClose: () => void;
  options: PickerOption[];
  selectedValues: string[];
  onSelect: (value: string) => void;
  title?: string;
  searchable?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredOptions: PickerOption[];
  multiple?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
  closeAccessibilityLabel?: string;
  testID?: string;
}

export const PickerModal: React.FC<PickerModalProps> = React.memo(({
  visible,
  onClose,
  selectedValues,
  onSelect,
  title,
  searchable = false,
  searchQuery,
  onSearchChange,
  filteredOptions,
  emptyMessage,
  searchPlaceholder,
  closeAccessibilityLabel,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const icons = { checkCircle: useIconName('checkCircle'), search: useIconName('search'), close: useIconName('close'), info: useIconName('info') };

  const styles = useMemo(() => ({
    overlay: getModalOverlayStyles(),
    container: getModalContainerStyles(tokens, 0),
    header: getModalHeaderStyles(tokens),
    title: getModalTitleStyles(tokens),
    search: getSearchContainerStyles(tokens),
    searchInput: getSearchInputStyles(tokens),
    empty: getEmptyStateStyles(tokens),
    emptyText: getEmptyStateTextStyles(tokens),
  }), [tokens]);

  const isSelected = useCallback((value: string) => selectedValues?.includes(value) ?? false, [selectedValues]);

  const OPTION_HEIGHT = 56; // Approximate height of each option

  const getItemLayout = useCallback((_: unknown, index: number) => ({
    length: OPTION_HEIGHT,
    offset: OPTION_HEIGHT * index,
    index,
  }), []);

  const renderOption = useCallback(({ item }: { item: PickerOption }) => {
    const selected = isSelected(item.value);
    const disabled = item.disabled || false;

    return (
      <TouchableOpacity
        onPress={() => !disabled && onSelect(item.value)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={item.label}
        accessibilityState={{ disabled, selected }}
        testID={item.testID || `${testID}-option-${item.value}`}
        style={getOptionContainerStyles(tokens, selected, disabled)}
      >
        {item.icon && <AtomicIcon name={item.icon} size="md" color={selected ? 'primary' : 'secondary'} />}
        <View style={{ flex: 1 }}>
          <AtomicText style={getOptionTextStyles(tokens, selected)}>{item.label}</AtomicText>
          {item.description && <AtomicText style={getOptionDescriptionStyles(tokens)}>{item.description}</AtomicText>}
        </View>
        {selected && <AtomicIcon name={icons.checkCircle} size="md" color="primary" />}
      </TouchableOpacity>
    );
  }, [icons.checkCircle, isSelected, onSelect, tokens, testID]);

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onClose} testID={`${testID}-modal`} accessibilityViewIsModal={true}>
      <View style={styles.overlay}>
        <View style={[styles.container, { paddingBottom: insets.bottom + tokens.spacing.md }]}>
          <View style={styles.header}>
            <AtomicText style={styles.title}>{title || 'Select'}</AtomicText>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} accessibilityRole="button" accessibilityLabel={closeAccessibilityLabel} testID={`${testID}-close`}>
              <AtomicIcon name={icons.close} size="md" color="primary" />
            </TouchableOpacity>
          </View>

          {searchable && (
            <View style={styles.search}>
              <AtomicIcon name={icons.search} size="sm" color="secondary" />
              <TextInput value={searchQuery} onChangeText={onSearchChange} placeholder={searchPlaceholder} placeholderTextColor={tokens.colors.textSecondary} style={styles.searchInput} testID={`${testID}-search`} />
              {searchQuery.length > 0 && <TouchableOpacity onPress={() => onSearchChange('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} accessibilityRole="button" accessibilityLabel="Clear search"><AtomicIcon name={icons.close} size="sm" color="secondary" /></TouchableOpacity>}
            </View>
          )}

          {filteredOptions.length > 0 ? (
            <FlatList
              data={filteredOptions}
              keyExtractor={(item: PickerOption) => item.value}
              renderItem={renderOption}
              getItemLayout={getItemLayout}
              windowSize={5}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              removeClippedSubviews
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              testID={`${testID}-list`}
            />
          ) : (
            <View style={styles.empty}>
              <AtomicIcon name={icons.info} size="xl" color="secondary" />
              <AtomicText style={styles.emptyText}>{emptyMessage}</AtomicText>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
});

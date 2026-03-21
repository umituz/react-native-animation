/**
 * DatePickerModal Component
 *
 * Modal component for iOS date picker with proper styling and behavior.
 * Uses lazy-loaded @react-native-community/datetimepicker (optional peer dependency).
 */

import React, { useMemo } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from '../../../safe-area';
import { useAppDesignTokens } from '../../../theme';
import { AtomicText } from '../../AtomicText';

let DateTimePicker: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  DateTimePicker = require('@react-native-community/datetimepicker').default;
} catch {
  // Optional peer dependency not installed
}

type DateTimePickerEvent = {
  type: 'set' | 'dismissed' | 'neutralButtonPressed';
  nativeEvent: { timestamp: number; utcOffset: number };
};

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void;
  currentDate: Date;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  overlayOpacity?: number;
  titleText?: {
    date?: string;
    time?: string;
    datetime?: string;
  };
  doneButtonText?: string;
  testID?: string;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onDateChange,
  currentDate,
  mode = 'date',
  minimumDate,
  maximumDate,
  overlayOpacity = 0.5,
  titleText,
  doneButtonText = 'Done',
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const modalStyles = useMemo(() => ({
    overlay: {
      flex: 1,
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      justifyContent: 'flex-end' as const,
    },
    container: {
      backgroundColor: tokens.colors.surface,
      borderTopLeftRadius: tokens.borders.radius.lg,
      borderTopRightRadius: tokens.borders.radius.lg,
      paddingBottom: insets.bottom,
    },
    header: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.outline,
    },
    title: {
      fontSize: tokens.typography.titleLarge.fontSize,
      fontWeight: '600' as const,
      color: tokens.colors.onSurface,
    },
    doneButton: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.primary,
    },
    doneButtonText: {
      fontSize: tokens.typography.labelMedium.fontSize,
      fontWeight: '500' as const,
      color: tokens.colors.onPrimary,
    },
  }), [overlayOpacity, tokens, insets.bottom]);

  const pickerStyle = useMemo(() => ({
    alignSelf: 'center' as const,
  }), []);

  if (Platform.OS !== 'ios' || !DateTimePicker) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      testID={testID ? `${testID}-modal` : undefined}
      accessibilityViewIsModal={true}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          {/* Header */}
          <View style={modalStyles.header}>
            <AtomicText style={modalStyles.title}>
              {mode === 'date'
                ? (titleText?.date || 'Select Date')
                : mode === 'time'
                  ? (titleText?.time || 'Select Time')
                  : (titleText?.datetime || 'Select Date & Time')
              }
            </AtomicText>
            <TouchableOpacity
              onPress={onClose}
              style={modalStyles.doneButton}
              testID={testID ? `${testID}-done` : undefined}
            >
              <AtomicText style={modalStyles.doneButtonText}>{doneButtonText}</AtomicText>
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <DateTimePicker
            value={currentDate}
            mode={mode}
            onChange={onDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            display="spinner"
            style={pickerStyle}
            testID={testID ? `${testID}-picker` : undefined}
          />
        </View>
      </View>
    </Modal>
  );
};

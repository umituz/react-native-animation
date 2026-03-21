/**
 * AtomicDatePicker Component
 *
 * A reusable date picker component that wraps the native date picker
 * with consistent styling and behavior across platforms.
 *
 * Requires @react-native-community/datetimepicker as a peer dependency.
 * If not installed, the component will render only the button with a
 * console warning when pressed.
 *
 * @module AtomicDatePicker
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText } from './AtomicText';
import { DatePickerModal } from './datepicker/components/DatePickerModal';
import { DatePickerButton } from './datepicker/components/DatePickerButton';
import { useDatePickerText } from './datepicker/hooks/useDatePickerText';
import { getDatePickerStyles } from './datepicker/styles/datePickerStyles';

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

/**
 * Props for AtomicDatePicker component
 */
export interface AtomicDatePickerProps {
  /** Selected date value */
  value: Date | null;
  /** Callback when date changes */
  onChange: (date: Date) => void;
  /** Optional label displayed above picker */
  label?: string;
  /** Optional error message displayed below picker */
  error?: string;
  /** Disable picker interaction */
  disabled?: boolean;
  /** Minimum selectable date */
  minimumDate?: Date;
  /** Maximum selectable date */
  maximumDate?: Date;
  /** Picker mode - date, time, or datetime (iOS only) */
  mode?: 'date' | 'time' | 'datetime';
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Optional test ID for E2E testing */
  testID?: string;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
}

export const AtomicDatePicker: React.FC<AtomicDatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  disabled = false,
  minimumDate,
  maximumDate,
  mode = 'date',
  placeholder = 'Select date',
  testID,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
      if (event.type === 'dismissed') {
        setShowPicker(false);
      }
    }
  }, [onChange]);

  const handleOpen = useCallback(() => {
    if (!DateTimePicker) {
      console.warn(
        '[AtomicDatePicker] @react-native-community/datetimepicker is not installed. ' +
        'Install it to use the date picker: npx expo install @react-native-community/datetimepicker'
      );
      return;
    }
    setShowPicker(true);
  }, [DateTimePicker]);

  const { displayText } = useDatePickerText({ value, placeholder, mode });
  const styles = useMemo(() => getDatePickerStyles(tokens), [tokens]);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <AtomicText style={styles.label} testID={testID ? `${testID}-label` : undefined}>
          {label}
        </AtomicText>
      )}

      <DatePickerButton
        onPress={handleOpen}
        disabled={disabled}
        displayText={displayText}
        hasValue={!!value}
        error={!!error}
        testID={testID ? `${testID}-button` : undefined}
      />

      {error && (
        <AtomicText style={styles.errorText} testID={testID ? `${testID}-error` : undefined}>
          {error}
        </AtomicText>
      )}

      {/* iOS Modal */}
      {DateTimePicker && (
        <DatePickerModal
          visible={Platform.OS === 'ios' && showPicker}
          onClose={() => setShowPicker(false)}
          onDateChange={handleChange}
          currentDate={value ?? new Date()}
          mode={mode}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          testID={testID}
        />
      )}

      {/* Android Picker */}
      {DateTimePicker && Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          testID={testID ? `${testID}-picker` : undefined}
        />
      )}
    </View>
  );
};

/**
 * DatePickerButton Component
 *
 * Button component that triggers the date picker modal.
 * Extracted from AtomicDatePicker for better separation of concerns.
 */

import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { AtomicIcon, useIconName } from '../../icon';
import { AtomicText } from '../../AtomicText';

interface DatePickerButtonProps {
  onPress: () => void;
  disabled?: boolean;
  displayText: string;
  hasValue: boolean;
  error?: boolean;
  testID?: string;
}

export const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  onPress,
  disabled = false,
  displayText,
  hasValue,
  error,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const calendarIcon = useIconName('calendar');

  const buttonStyles = useMemo(() => ({
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderRadius: tokens.borders.radius.md,
      borderWidth: 1,
      backgroundColor: tokens.colors.surface,
      minHeight: 48,
    },
    containerError: {
      borderColor: tokens.colors.error,
    },
    containerDisabled: {
      backgroundColor: tokens.colors.surfaceVariant,
      borderColor: tokens.colors.outline,
      opacity: 0.6,
    },
    containerDefault: {
      borderColor: tokens.colors.outline,
    },
    textContainer: {
      flex: 1,
    },
    placeholderText: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      color: tokens.colors.textSecondary,
    },
    valueText: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      color: tokens.colors.onSurface,
      fontWeight: '500',
    },
    iconContainer: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: tokens.spacing.xs,
    },
  }), [tokens]);

  const containerStyle = useMemo(() => [
    buttonStyles.container,
    error ? buttonStyles.containerError :
      disabled ? buttonStyles.containerDisabled :
        buttonStyles.containerDefault,
  ], [buttonStyles, error, disabled]);

  const textStyle = hasValue ? buttonStyles.valueText : buttonStyles.placeholderText;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      testID={testID}
      style={containerStyle}
    >
      <View style={buttonStyles.textContainer}>
        <AtomicText style={textStyle} numberOfLines={1}>
          {displayText}
        </AtomicText>
      </View>

      <View style={buttonStyles.iconContainer}>
        <AtomicIcon
          name={calendarIcon}
          size="md"
          color={disabled ? 'surfaceVariant' : 'secondary'}
        />
      </View>
    </TouchableOpacity>
  );
};
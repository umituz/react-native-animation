import React, { forwardRef, useMemo } from 'react';
import { View, TextInput, StyleSheet, type ViewStyle, type StyleProp, type TextStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText } from './AtomicText';

export interface AtomicTextAreaProps {
  /** Text area label */
  label?: string;
  /** Current value */
  value?: string;
  /** Value change callback */
  onChangeText?: (text: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message to display */
  errorText?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Number of lines (default: 4) */
  numberOfLines?: number;
  /** Alternative to numberOfLines */
  rows?: number;
  /** Minimum height override */
  minHeight?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Input text style */
  inputStyle?: StyleProp<TextStyle>;
  /** Return key type */
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  /** Callback when submit button is pressed */
  onSubmitEditing?: () => void;
  /** Blur on submit */
  blurOnSubmit?: boolean;
  /** Test ID */
  testID?: string;
}

/**
 * AtomicTextArea - Multiline Text Input Component
 * Consistent with AtomicInput but optimized for multiline usage.
 */
export const AtomicTextArea = forwardRef<React.ElementRef<typeof TextInput>, AtomicTextAreaProps>(({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  errorText,
  maxLength,
  numberOfLines,
  rows = 4,
  minHeight,
  disabled = false,
  style,
  inputStyle,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  testID,
}, ref) => {
  const lineCount = numberOfLines ?? rows;
  const calculatedMinHeight = minHeight ?? lineCount * 24;
  const tokens = useAppDesignTokens();
  const hasError = !!errorText;

  const textInputStyle = useMemo<StyleProp<TextStyle>>(() => [
    styles.input,
    {
      backgroundColor: tokens.colors.surface,
      borderColor: hasError ? tokens.colors.error : tokens.colors.border,
      color: tokens.colors.textPrimary,
      minHeight: calculatedMinHeight,
      padding: tokens.spacing.md,
      borderRadius: tokens.borderRadius.md,
      fontSize: 16,
    },
    inputStyle,
    disabled && { opacity: 0.5 },
  ], [tokens, hasError, calculatedMinHeight, inputStyle, disabled]);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <AtomicText
          type="labelMedium"
          color={hasError ? 'error' : 'secondary'}
          style={styles.label}
        >
          {label}
        </AtomicText>
      )}
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.textSecondary}
        maxLength={maxLength}
        numberOfLines={lineCount}
        multiline
        editable={!disabled}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        textAlignVertical="top"
        style={textInputStyle}
      />
      {(helperText || errorText) && (
        <View style={styles.helperRow}>
          <AtomicText
            type="bodySmall"
            color={hasError ? 'error' : 'secondary'}
            style={styles.helperText}
          >
            {errorText || helperText}
          </AtomicText>
          {maxLength && value !== undefined && (
            <AtomicText
              type="labelSmall"
              color={hasError ? 'error' : 'secondary'}
              style={styles.characterCount}
            >
              {value.length}/{maxLength}
            </AtomicText>
          )}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
  },
  helperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  helperText: {
    flex: 1,
  },
  characterCount: {
    marginLeft: 8,
  },
});

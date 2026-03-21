/**
 * FormField Molecule - Complete Form Input with Label and Error
 *
 * Combines AtomicText (label/error) + AtomicInput (field)
 *
 * Atomic Design Level: MOLECULE
 * Composition: AtomicText + AtomicInput
 */

import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText, AtomicInput, type AtomicInputProps } from '../atoms';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface FormFieldProps extends Omit<AtomicInputProps, 'state' | 'label'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle; // Alias for containerStyle (for convenience)
  requiredIndicator?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

const FormFieldLabel: React.FC<{
  label?: string;
  required?: boolean;
  requiredIndicator?: string;
  styles: ReturnType<typeof getStyles>;
}> = ({ label, required, requiredIndicator, styles }) => {
  if (!label) return null;

  return (
    <View style={styles.labelContainer}>
      <AtomicText type="labelMedium" color="primary" style={styles.label}>
        {label}
      </AtomicText>
      {required && (
        <AtomicText type="labelMedium" color="error">
          {requiredIndicator}
        </AtomicText>
      )}
    </View>
  );
};

const FormFieldMessage: React.FC<{
  error?: string;
  helperText?: string;
  styles: ReturnType<typeof getStyles>;
}> = ({ error, helperText, styles }) => {
  if (error) {
    return (
      <AtomicText
        type="bodySmall"
        color="error"
        style={styles.errorText}
      >
        {error}
      </AtomicText>
    );
  }

  if (helperText) {
    return (
      <AtomicText
        type="bodySmall"
        color="secondary"
        style={styles.helperText}
      >
        {helperText}
      </AtomicText>
    );
  }

  return null;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required = false,
  containerStyle,
  style,
  requiredIndicator = ' *',
  ...inputProps
}) => {
  const tokens = useAppDesignTokens();
  const inputState = error ? 'error' : 'default';
  const styles = useMemo(() => getStyles(tokens), [tokens]);

  return (
    <View style={[styles.container, containerStyle || style]}>
      <FormFieldLabel
        label={label}
        required={required}
        requiredIndicator={requiredIndicator}
        styles={styles}
      />

      <AtomicInput
        {...inputProps}
        state={inputState}
      />

      <FormFieldMessage
        error={error}
        helperText={helperText}
        styles={styles}
      />
    </View>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => ({
  container: {
    marginBottom: tokens.spacing.md,
  } as ViewStyle,
  labelContainer: {
    flexDirection: 'row',
    marginBottom: tokens.spacing.sm,
  } as ViewStyle,
  label: {
    fontWeight: tokens.typography.labelMedium.fontWeight,
    color: tokens.colors.textPrimary,
  } as ViewStyle,
  inputError: {
    borderColor: tokens.colors.error,
  } as ViewStyle,
  errorText: {
    marginTop: tokens.spacing.xs,
  } as ViewStyle,
  helperText: {
    marginTop: tokens.spacing.xs,
  } as ViewStyle,
});

// =============================================================================
// EXPORTS
// =============================================================================


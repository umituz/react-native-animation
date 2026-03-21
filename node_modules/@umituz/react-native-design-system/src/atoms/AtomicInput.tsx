import React, { useCallback, useMemo } from 'react';
import { View, TextInput, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { useInputState } from './input/hooks/useInputState';
import { getSizeConfig, getVariantStyle, getTextColor } from './input/styles/inputStylesHelper';
import { inputStyles } from './input/styles/inputStyles';
import type { AtomicInputProps } from './input/types';
import { InputLabel } from './input/components/InputLabel';
import { InputIcon } from './input/components/InputIcon';
import { InputHelper } from './input/components/InputHelper';

export const AtomicInput = React.forwardRef<React.ElementRef<typeof TextInput>, AtomicInputProps>(({
  variant = 'outlined',
  state = 'default',
  size = 'md',
  label,
  value = '',
  onChangeText,
  placeholder,
  helperText,
  leadingIcon,
  trailingIcon,
  onTrailingIconPress,
  showPasswordToggle = false,
  secureTextEntry = false,
  maxLength,
  showCharacterCount = false,
  keyboardType = 'default',
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  autoComplete,
  disabled = false,
  style,
  inputStyle,
  testID,
  onBlur,
  onFocus,
  multiline = false,
  numberOfLines,
  textContentType,
}, ref) => {
  const tokens = useAppDesignTokens();

  const {
    localValue,
    isFocused,
    isPasswordVisible,
    characterCount,
    setIsFocused,
    handleTextChange,
    togglePasswordVisibility,
  } = useInputState({
    value,
    onChangeText,
    secureTextEntry,
    maxLength,
  });

  const isDisabled = state === 'disabled' || disabled;
  const hasError = state === 'error';
  const hasSuccess = state === 'success';

  const sizeConfig = getSizeConfig({ size, tokens });
  const variantStyle = getVariantStyle({ variant, isFocused, hasError, hasSuccess, isDisabled, tokens });
  const textColor = getTextColor({ isDisabled, hasError, hasSuccess, tokens });
  const iconColor = isDisabled ? tokens.colors.textDisabled : tokens.colors.textSecondary;
  const iconPadding = sizeConfig.iconSize + 8;

  const containerStyle = useMemo<StyleProp<ViewStyle>>(() => [
    inputStyles.container,
    variantStyle,
    {
      paddingTop: sizeConfig.paddingVertical,
      paddingBottom: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      minHeight: sizeConfig.minHeight,
      justifyContent: 'center' as const,
      opacity: isDisabled ? 0.5 : 1,
    },
    style,
  ], [variantStyle, sizeConfig, isDisabled, style]);

  const handleBlur = useCallback(() => { setIsFocused(false); onBlur?.(); }, [setIsFocused, onBlur]);
  const handleFocus = useCallback(() => { setIsFocused(true); onFocus?.(); }, [setIsFocused, onFocus]);

  const textInputStyle = useMemo<StyleProp<TextStyle>>(() => [
    inputStyles.input,
    {
      fontSize: sizeConfig.fontSize,
      lineHeight: (sizeConfig.fontSize || 16) * 1.2,
      color: textColor,
      paddingVertical: Math.floor(4 * tokens.spacingMultiplier),
      paddingLeft: leadingIcon ? iconPadding : undefined,
      paddingRight: (trailingIcon || showPasswordToggle) ? iconPadding : undefined,
    },
    inputStyle,
  ], [sizeConfig, textColor, leadingIcon, trailingIcon, showPasswordToggle, iconPadding, inputStyle, tokens.spacingMultiplier]);

  return (
    <View testID={testID}>
      <InputLabel label={label} state={state} />

      <View style={containerStyle}>
        {leadingIcon && <InputIcon name={leadingIcon} size={sizeConfig.iconSize} color={iconColor} position="leading" />}

        <TextInput
          ref={ref}
          value={localValue}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.textSecondary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          maxLength={maxLength}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          editable={!isDisabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textContentType={textContentType}
          style={textInputStyle}
          onBlur={handleBlur}
          onFocus={handleFocus}
          testID={testID ? `${testID}-input` : undefined}
        />

        {showPasswordToggle && secureTextEntry && (
          <InputIcon
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={sizeConfig.iconSize}
            color={iconColor}
            position="trailing"
            onPress={togglePasswordVisibility}
            testID={testID ? `${testID}-toggle-password` : undefined}
          />
        )}

        {trailingIcon && !showPasswordToggle && (
          <InputIcon
            name={trailingIcon}
            size={sizeConfig.iconSize}
            color={iconColor}
            position="trailing"
            onPress={onTrailingIconPress}
            testID={testID ? `${testID}-trailing-icon` : undefined}
          />
        )}
      </View>

      <InputHelper
        helperText={helperText}
        showCharacterCount={showCharacterCount}
        characterCount={characterCount}
        maxLength={maxLength}
        state={state}
        testID={testID}
      />
    </View>
  );
});

import type { StyleProp, TextInputProps } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import type { IconName } from '../icon';

export type AtomicInputVariant = 'outlined' | 'filled' | 'flat';
export type AtomicInputState = 'default' | 'error' | 'success' | 'disabled';
export type AtomicInputSize = 'sm' | 'md' | 'lg';

export interface AtomicInputProps {
  /** Input label */
  label?: string;
  /** Current input value */
  value?: string;
  /** Value change callback */
  onChangeText?: (text: string) => void;
  /** Input variant (outlined, filled, flat) */
  variant?: AtomicInputVariant;
  /** Input state (default, error, success, disabled) */
  state?: AtomicInputState;
  /** Input size (sm, md, lg) */
  size?: AtomicInputSize;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below input */
  helperText?: string;
  /** Leading icon (Ionicons name) */
  leadingIcon?: IconName;
  /** Trailing icon (Ionicons name) */
  trailingIcon?: IconName;
  /** Callback when trailing icon is pressed */
  onTrailingIconPress?: () => void;
  /** Show password toggle for secure inputs */
  showPasswordToggle?: boolean;
  /** Secure text entry (password field) */
  secureTextEntry?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Show character counter */
  showCharacterCount?: boolean;
  /** Keyboard type */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'number-pad' | 'decimal-pad' | 'web-search' | 'twitter' | 'numeric' | 'visible-password';
  /** Return key type */
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  /** Callback when submit button is pressed */
  onSubmitEditing?: () => void;
  /** Blur on submit */
  blurOnSubmit?: boolean;
  /** Auto-capitalize */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Auto-correct */
  autoCorrect?: boolean;
  /** Auto-complete (Android/Web) */
  autoComplete?: TextInputProps['autoComplete'];
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Input text style */
  inputStyle?: StyleProp<TextStyle>;
  /** Test ID for E2E testing */
  testID?: string;
  /** Blur callback */
  onBlur?: () => void;
  /** Focus callback */
  onFocus?: () => void;
  /** Multiline input support */
  multiline?: boolean;
  /** Number of lines for multiline input */
  numberOfLines?: number;
  /** iOS text content type for AutoFill */
  textContentType?: TextInputProps['textContentType'];
}

export type { AtomicInputProps as InputProps };

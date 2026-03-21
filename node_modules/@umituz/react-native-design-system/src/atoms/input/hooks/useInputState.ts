import { useState, useCallback, useEffect } from 'react';

interface UseInputStateProps {
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  maxLength?: number;
}

interface UseInputStateReturn {
  localValue: string;
  isFocused: boolean;
  isPasswordVisible: boolean;
  characterCount: number;
  isAtMaxLength: boolean;
  setIsFocused: (focused: boolean) => void;
  handleTextChange: (text: string) => void;
  togglePasswordVisibility: () => void;
}

export const useInputState = ({
  value = '',
  onChangeText,
  secureTextEntry = false,
  maxLength,
}: UseInputStateProps = {}): UseInputStateReturn => {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  // Sync localValue when controlled value prop changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleTextChange = useCallback((text: string) => {
    setLocalValue(text);
    onChangeText?.(text);
  }, [onChangeText]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const characterCount = localValue.length;
  const isAtMaxLength = maxLength ? characterCount >= maxLength : false;

  return {
    localValue,
    isFocused,
    isPasswordVisible,
    characterCount,
    isAtMaxLength,
    setIsFocused,
    handleTextChange,
    togglePasswordVisibility,
  };
};

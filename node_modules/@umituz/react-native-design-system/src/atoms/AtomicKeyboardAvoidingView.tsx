import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  type KeyboardAvoidingViewProps,
} from 'react-native';

export interface AtomicKeyboardAvoidingViewProps extends KeyboardAvoidingViewProps {
  /**
   * Optional offset to adjust the position of the content.
   * On iOS, this is often necessary to account for headers, tabs, etc.
   */
  offset?: number;
}

/**
 * AtomicKeyboardAvoidingView - A consistent wrapper for React Native's KeyboardAvoidingView
 * 
 * Provides sensible defaults and OS-specific behaviors:
 * - iOS: behavior="padding"
 * - Android: behavior=undefined (handled by windowSoftInputMode="adjustResize")
 */
export const AtomicKeyboardAvoidingView: React.FC<AtomicKeyboardAvoidingViewProps> = ({
  children,
  behavior,
  style,
  offset = 0,
  ...props
}) => {
  const defaultBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView
      behavior={behavior ?? defaultBehavior}
      style={[styles.container, style]}
      keyboardVerticalOffset={offset}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

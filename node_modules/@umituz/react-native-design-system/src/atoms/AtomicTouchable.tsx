/**
 * AtomicTouchable - Touchable Component
 *
 * Atomic Design Level: ATOM
 * Purpose: Touchable wrapper across all apps
 */

import React, { useRef, useCallback } from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';

const DEBOUNCE_MS = 300;

export interface AtomicTouchableProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  // Accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'link' | 'none' | 'text' | 'search' | 'image' | 'adjustable' | 'imagebutton' | 'header' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessible?: boolean;
}

const AtomicTouchableComponent: React.FC<AtomicTouchableProps> = ({
  children,
  onPress,
  onLongPress,
  disabled = false,
  activeOpacity = 0.7,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  accessibilityState,
  accessible = true,
}) => {
  const lastPressRef = useRef(0);
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;

  const handlePress = useCallback(() => {
    const now = Date.now();
    if (now - lastPressRef.current < DEBOUNCE_MS) return;
    lastPressRef.current = now;
    onPressRef.current?.();
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress ? handlePress : undefined}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={style}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ ...accessibilityState, disabled }}
      accessible={accessible}
    >
      {children}
    </TouchableOpacity>
  );
};

export const AtomicTouchable = React.memo(AtomicTouchableComponent);
AtomicTouchableComponent.displayName = 'AtomicTouchable';

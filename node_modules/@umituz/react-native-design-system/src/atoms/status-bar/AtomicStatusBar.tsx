/**
 * AtomicStatusBar Component
 * Theme-aware status bar that automatically adjusts based on theme mode
 */

import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useTheme } from '../../theme';
import { useAppDesignTokens } from '../../theme';

export interface AtomicStatusBarProps extends Omit<StatusBarProps, 'barStyle' | 'backgroundColor'> {
  barStyle?: 'auto' | 'light-content' | 'dark-content';
  backgroundColor?: string;
}

export const AtomicStatusBar: React.FC<AtomicStatusBarProps> = ({
  barStyle = 'auto',
  backgroundColor,
  ...props
}) => {
  const { themeMode } = useTheme();
  const tokens = useAppDesignTokens();

  const resolvedBarStyle = barStyle === 'auto'
    ? themeMode === 'dark' ? 'light-content' : 'dark-content'
    : barStyle;

  const resolvedBackgroundColor = backgroundColor || tokens.colors.backgroundPrimary;

  return (
    <StatusBar
      barStyle={resolvedBarStyle}
      backgroundColor={resolvedBackgroundColor}
      {...props}
    />
  );
};

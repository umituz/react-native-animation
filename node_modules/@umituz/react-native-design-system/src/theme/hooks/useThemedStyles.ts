/**
 * useThemedStyles Hook
 * Helper hook for creating StyleSheets with theme support
 *
 * Usage:
 * ```typescript
 * const createStyles = (theme: Theme) => StyleSheet.create({
 *   container: {
 *     backgroundColor: theme.colors.backgroundPrimary,
 *   }
 * });
 *
 * const Component = () => {
 *   const styles = useThemedStyles(createStyles);
 *   return <View style={styles.container} />;
 * };
 * ```
 */

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from '../infrastructure/stores/themeStore';
import type { Theme } from '../core/themes';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

/**
 * Hook for creating themed styles
 * Returns memoized styles that update when theme changes
 */
export function useThemedStyles<T extends NamedStyles<T>>(
  createStyles: (theme: Theme) => T,
): T {
  const { theme } = useTheme();

  return useMemo(() => createStyles(theme), [theme, createStyles]);
}

/**
 * Alternative: Direct StyleSheet creation with theme
 * Returns memoized styles that update when theme changes
 */
export function useThemedStyleSheet<T extends NamedStyles<T>>(
  styleFactory: (theme: Theme) => T,
): T {
  const { theme } = useTheme();

  return useMemo(
    () => StyleSheet.create(styleFactory(theme)),
    [theme, styleFactory],
  );
}

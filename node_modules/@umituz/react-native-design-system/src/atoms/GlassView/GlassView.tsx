import React from 'react';
import { StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { useTheme } from '../../theme';
import { intensityToOpacity } from '../../utils/math';
import { useMemo } from 'react';

// Define a local type for tint to maintain API compatibility
export type GlassTint = 'light' | 'dark' | 'default' | 'prominent' | 'regular' | 'extraLight' | 'systemThinMaterial' | 'systemMaterial' | 'systemThickMaterial' | 'systemChromeMaterial' | 'systemUltraThinMaterial' | 'systemThinMaterialLight' | 'systemMaterialLight' | 'systemThickMaterialLight' | 'systemChromeMaterialLight' | 'systemUltraThinMaterialLight' | 'systemThinMaterialDark' | 'systemMaterialDark' | 'systemThickMaterialDark' | 'systemChromeMaterialDark' | 'systemUltraThinMaterialDark';

export interface GlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: GlassTint; // Use local type instead of BlurTint
  experimentalBlurMethod?: 'dimezisBlurView' | 'none';
}

/**
 * GlassView
 *
 * A wrapper component for glassmorphism effects.
 * Currently uses a fallback transparency implementation to avoid native module issues with expo-blur.
 */
export const GlassView: React.FC<GlassViewProps> = ({
  children,
  style,
  intensity = 50,
  tint,
}) => {
  const themeMode = useTheme((state) => state.themeMode);
  const isDark = useMemo(() => themeMode === 'dark', [themeMode]);

  // Calculate opacity using utility function
  const opacity = intensityToOpacity(intensity);

  // Choose base color based on tint or theme
  const resolvedTint = tint || (isDark ? 'dark' : 'light');
  const isDarkBase = resolvedTint === 'dark' || resolvedTint.includes('Dark') || (resolvedTint === 'default' && isDark);

  const backgroundColor = isDarkBase
    ? `rgba(34, 16, 26, ${opacity})` // Dark color from theme
    : `rgba(255, 255, 255, ${opacity})`;

  return (
    <View
      style={[
        styles.container, 
        { backgroundColor },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

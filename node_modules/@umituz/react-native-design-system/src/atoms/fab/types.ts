import { StyleProp, ViewStyle } from 'react-native';

/**
 * FAB (Floating Action Button) size variants
 * Based on Material Design 3 standards
 */
export type FabSize = 'sm' | 'md' | 'lg';

/**
 * FAB variant types
 * - primary: Main action (uses primary color)
 * - secondary: Secondary action (uses secondary color)
 * - surface: Neutral action (uses surface color with border)
 */
export type FabVariant = 'primary' | 'secondary' | 'surface';

/**
 * FAB configuration for variant styling
 */
export interface FabVariantConfig {
  backgroundColor: string;
  iconColor: string;
}

/**
 * FAB configuration for size styling
 */
export interface FabSizeConfig {
  width: number;
  height: number;
  borderRadius: number;
}

/**
 * AtomicFab component props
 */
export interface AtomicFabProps {
  /**
   * Icon name to display (required)
   * Any MaterialIcons name (see https://fonts.google.com/icons)
   * Examples: 'add', 'edit', 'camera', etc.
   */
  icon: string;

  /**
   * Callback when FAB is pressed
   */
  onPress: () => void;

  /**
   * Visual variant of the FAB
   * @default 'primary'
   */
  variant?: FabVariant;

  /**
   * Size of the FAB
   * @default 'md'
   */
  size?: FabSize;

  /**
   * Whether the FAB is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom style for the FAB container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;

  /**
   * Active opacity for touch feedback
   * @default 0.7
   */
  activeOpacity?: number;
}

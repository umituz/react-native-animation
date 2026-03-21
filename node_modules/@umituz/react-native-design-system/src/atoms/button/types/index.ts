/**
 * AtomicButton Type Definitions
 */

import type { StyleProp } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import type { IconName } from '../../icon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AtomicButtonProps {
  readonly title?: string;
  readonly children?: React.ReactNode;
  readonly onPress: () => void;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly icon?: IconName;
  readonly iconPosition?: 'left' | 'right';
  readonly fullWidth?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
  readonly activeOpacity?: number;
  readonly testID?: string;
  // Accessibility props
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly accessibilityRole?: 'button' | 'link';
}

export interface ButtonSizeConfig {
  readonly paddingVertical: number;
  readonly paddingHorizontal: number;
  readonly fontSize: number;
  readonly iconSize: number;
  readonly minHeight: number;
}

export interface ButtonVariantStyles {
  readonly container: ViewStyle;
  readonly text: TextStyle;
}

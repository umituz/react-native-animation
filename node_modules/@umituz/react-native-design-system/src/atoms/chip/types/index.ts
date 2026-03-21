/**
 * AtomicChip Type Definitions
 */

import type { StyleProp, ViewStyle } from 'react-native';
import type { IconSize } from '../../icon';

export type ChipVariant = 'filled' | 'outlined' | 'soft';
export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface AtomicChipProps {
  readonly children: React.ReactNode;
  readonly variant?: ChipVariant;
  readonly size?: ChipSize;
  readonly color?: ChipColor;
  readonly backgroundColor?: string;
  readonly textColor?: string;
  readonly borderColor?: string;
  readonly leadingIcon?: string;
  readonly trailingIcon?: string;
  readonly clickable?: boolean;
  readonly onPress?: () => void;
  readonly selected?: boolean;
  readonly disabled?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
  readonly activeOpacity?: number;
}

export interface ChipSizeConfig {
  readonly paddingHorizontal: number;
  readonly paddingVertical: number;
  readonly fontSize: number;
  readonly iconSize: IconSize;
}

export interface ChipColorConfig {
  readonly bg: string | undefined;
  readonly text: string;
  readonly border: string | undefined;
}

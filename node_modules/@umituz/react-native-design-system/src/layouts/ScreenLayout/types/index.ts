/**
 * ScreenLayout Type Definitions
 */

import type { ViewStyle } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import type { RefreshControlProps } from 'react-native';

export interface ScreenLayoutProps {
  readonly children: React.ReactNode;
  readonly scrollable?: boolean;
  readonly edges?: Edge[];
  readonly header?: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly backgroundColor?: string;
  readonly containerStyle?: ViewStyle;
  readonly contentContainerStyle?: ViewStyle;
  readonly testID?: string;
  readonly hideScrollIndicator?: boolean;
  readonly keyboardAvoiding?: boolean;
  readonly keyboardVerticalOffset?: number;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly accessible?: boolean;
  readonly maxWidth?: number;
  /** Disable maxWidth constraint (useful for full-bleed layouts like paginated FlatLists) */
  readonly fullWidth?: boolean;
  readonly refreshControl?: React.ReactElement<RefreshControlProps>;
}

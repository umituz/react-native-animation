

import { ViewStyle, StyleProp } from 'react-native';

export interface ActionFooterProps {
  onBack: () => void;
  onAction: () => void;
  actionLabel: string;
  actionIcon?: string;
  backIcon?: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

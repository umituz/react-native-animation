
import { ViewStyle, StyleProp } from 'react-native';

export interface InfoGridItem {
  icon?: string;
  text: string;
  testID?: string;
}

export interface InfoGridProps {
  title?: string;
  headerIcon?: string;
  items: InfoGridItem[];
  columns?: number;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
}

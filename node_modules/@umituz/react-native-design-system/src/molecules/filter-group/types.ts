import type { StyleProp, ViewStyle } from 'react-native';

export interface FilterGroupItem<T = string> {
  label: string;
  value: T;
  testID?: string;
}

export interface FilterGroupProps<T = string> {
  items: FilterGroupItem<T>[];
  selectedValue: T | T[];
  onSelect: (value: T) => void;
  multiSelect?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
}

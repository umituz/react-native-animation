import type { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

export interface CarouselItem<T = unknown> {
  id: string;
  data: T;
  onPress?: () => void;
}

export interface CarouselProps<T = unknown> {
  items: CarouselItem<T>[];
  renderItem: (item: CarouselItem<T>, index: number) => React.ReactNode;
  itemWidth?: number;
  spacing?: number;
  onIndexChange?: (index: number) => void;
  showDots?: boolean;
  pagingEnabled?: boolean;
}

export interface CarouselScrollProps {
  itemWidth: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  children: React.ReactNode;
  pagingEnabled?: boolean;
}

export interface CarouselDotsProps {
  count: number;
  currentIndex: number;
  activeColor?: string;
  inactiveColor?: string;
}

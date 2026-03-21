import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import type { CarouselItem as CarouselItemType } from "./types";

interface CarouselItemProps<T = unknown> {
  item: CarouselItemType<T>;
  itemWidth: number;
  renderContent: (item: CarouselItemType<T>) => React.ReactNode;
  style?: ViewStyle;
  activeOpacity?: number;
}

export const CarouselItem = <T,>({
  item,
  itemWidth,
  renderContent,
  style,
  activeOpacity = 0.9,
}: CarouselItemProps<T>) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={item.onPress}
      style={[styles.container, { width: itemWidth }, style]}
    >
      {renderContent(item)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles handled by width prop
  },
});

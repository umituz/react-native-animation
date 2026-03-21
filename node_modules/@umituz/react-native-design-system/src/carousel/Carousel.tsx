import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, ViewStyle, FlatList } from "react-native";
import { useAppDesignTokens } from "../theme";
import { CarouselScrollView } from "./CarouselScrollView";
import { CarouselDots } from "./CarouselDots";
import { CarouselItem } from "./CarouselItem";
import { useCarouselScroll } from "./useCarouselScroll";
import { calculateItemWidth } from "./carouselCalculations";
import { useScreenWidth } from "../responsive/useScreenDimensions";
import type { CarouselProps, CarouselItem as CarouselItemType } from "./types";

export const Carousel = <T,>({
  items,
  renderItem,
  itemWidth,
  spacing = 16,
  onIndexChange,
  showDots = true,
  pagingEnabled = true,
  style,
}: CarouselProps<T> & { style?: ViewStyle }) => {
  const tokens = useAppDesignTokens();
  const screenWidth = useScreenWidth(); // Reactive width
  const calculatedItemWidth = itemWidth || calculateItemWidth(screenWidth, spacing);

  const pageWidth = calculatedItemWidth + spacing;

  const { currentIndex, handleScroll } = useCarouselScroll({
    itemWidth: pageWidth,
    onIndexChange,
  });

  if (items.length === 0) {
    return null;
  }

  // Stable key extractor
  const keyExtractor = useCallback((item: CarouselItemType<T>) => item.id, []);

  // Memoized render item to prevent unnecessary re-renders
  const renderCarouselItem = useCallback(({ item, index }: { item: CarouselItemType<T>; index: number }) => (
    <CarouselItem
      item={item}
      itemWidth={calculatedItemWidth}
      renderContent={(itemData) => renderItem(itemData, index)}
      style={
        index < items.length - 1 ? { marginRight: spacing } : undefined
      }
    />
  ), [calculatedItemWidth, renderItem, items.length, spacing]);

  // Get item layout for better performance
  const getItemLayout = useCallback((_: unknown, index: number) => ({
    length: calculatedItemWidth + spacing,
    offset: (calculatedItemWidth + spacing) * index,
    index,
  }), [calculatedItemWidth, spacing]);

  // Use FlatList for virtualization (renders only visible items)
  return (
    <View style={[styles.container, style]}>
      <FlatList
        horizontal
        data={items}
        renderItem={renderCarouselItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        onScroll={handleScroll}
        pagingEnabled={pagingEnabled}
        snapToInterval={pageWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        windowSize={3} // Render 3 screens worth of items
        initialNumToRender={2} // Start with 2 items
        maxToRenderPerBatch={2} // Batch rendering
        removeClippedSubviews
      />

      {showDots && items.length > 1 && (
        <CarouselDots
          count={items.length}
          currentIndex={currentIndex}
          activeColor={tokens.colors.primary}
          inactiveColor={tokens.colors.border}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
  },
});

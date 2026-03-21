import React from "react";
import {
  ScrollView,
  StyleSheet,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

interface CarouselScrollViewProps {
  itemWidth: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  children: React.ReactNode;
  pagingEnabled?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  spacing?: number;
}

export const CarouselScrollView: React.FC<CarouselScrollViewProps> = ({
  onScroll,
  children,
  pagingEnabled = true,
  style,
  contentContainerStyle,
  spacing = 0,
}) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled={pagingEnabled}
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      style={[styles.scrollView, style]}
      contentContainerStyle={[
        styles.scrollContent,
        pagingEnabled
          ? { paddingHorizontal: spacing }
          : { paddingLeft: spacing, paddingRight: spacing },
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
});

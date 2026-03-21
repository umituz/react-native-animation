import { useState, useCallback, useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { calculateIndexFromScroll } from "./carouselCalculations";

interface UseCarouselScrollOptions {
  itemWidth: number;
  onIndexChange?: (index: number) => void;
}

export const useCarouselScroll = ({
  itemWidth,
  onIndexChange,
}: UseCarouselScrollOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const newIndex = calculateIndexFromScroll(scrollPosition, itemWidth);

      if (newIndex !== currentIndexRef.current) {
        currentIndexRef.current = newIndex;
        setCurrentIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    },
    [itemWidth, onIndexChange],
  );

  return {
    currentIndex,
    handleScroll,
  };
};

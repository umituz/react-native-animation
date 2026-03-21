import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "../theme";
import type { CarouselDotsProps } from "./types";
import { createMappedArray } from "../utils/arrayUtils";

const CarouselDotsComponent: React.FC<CarouselDotsProps> = ({
  count,
  currentIndex,
  activeColor,
  inactiveColor,
}) => {
  const tokens = useAppDesignTokens();

  if (count <= 1) {
    return null;
  }

  const activeDotColor = activeColor || tokens.colors.primary;
  const inactiveDotColor = inactiveColor || tokens.colors.border;

  return (
    <View style={styles.container}>
      {createMappedArray(count, (index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentIndex ? activeDotColor : inactiveDotColor,
            },
          ]}
        />
      ))}
    </View>
  );
};
export const CarouselDots = React.memo(CarouselDotsComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

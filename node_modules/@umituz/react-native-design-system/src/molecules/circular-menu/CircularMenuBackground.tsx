import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "../../theme";
import { ARC_BACKGROUND } from "./constants";

export const CircularMenuBackground: React.FC = () => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.arc,
        {
          backgroundColor: tokens.colors.surface,
          width: ARC_BACKGROUND.WIDTH,
          height: ARC_BACKGROUND.HEIGHT,
          borderTopLeftRadius: ARC_BACKGROUND.BORDER_RADIUS_TOP,
          borderTopRightRadius: ARC_BACKGROUND.BORDER_RADIUS_TOP,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  arc: {
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

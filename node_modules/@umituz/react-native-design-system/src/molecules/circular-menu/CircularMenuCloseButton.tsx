import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon, useIconName } from "../../atoms";
import { useAppDesignTokens } from "../../theme";
import { LAYOUT } from "./constants";

export interface CircularMenuCloseButtonProps {
  onPress: () => void;
}

export const CircularMenuCloseButton: React.FC<CircularMenuCloseButtonProps> = ({
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const closeIcon = useIconName('close');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surface,
          width: LAYOUT.CLOSE_BUTTON_SIZE,
          height: LAYOUT.CLOSE_BUTTON_SIZE,
          borderRadius: LAYOUT.CLOSE_BUTTON_SIZE / 2,
          borderWidth: 1,
          borderColor: tokens.colors.border,
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
      ]}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="Close menu"
    >
      <AtomicIcon name={closeIcon} size="md" color="textPrimary" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

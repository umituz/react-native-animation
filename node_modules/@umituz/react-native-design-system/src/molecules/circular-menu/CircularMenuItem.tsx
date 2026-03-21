import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicIcon } from "../../atoms";
import { AtomicText } from "../../atoms";
import { useAppDesignTokens } from "../../theme";
import { LAYOUT } from "./constants";
import { calculateResponsiveSize } from "../../responsive";

export interface CircularMenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

export const CircularMenuItem: React.FC<CircularMenuItemProps> = React.memo(({
  icon,
  label,
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const spacingMultiplier = tokens.spacingMultiplier;

  const styles = useMemo(() => ({
    container: {
      alignItems: "center" as const,
      gap: 6,
      width: LAYOUT.ITEM_SIZE,
    },
    iconContainer: {
      justifyContent: "center" as const,
      alignItems: "center" as const,
      backgroundColor: tokens.colors.surfaceVariant,
      width: LAYOUT.ICON_SIZE,
      height: LAYOUT.ICON_SIZE,
      borderRadius: LAYOUT.ICON_SIZE / 2,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    label: {
      fontSize: calculateResponsiveSize(11, spacingMultiplier),
      fontWeight: "500" as const,
      textAlign: "center" as const,
      color: tokens.colors.textPrimary,
    },
  }), [spacingMultiplier, tokens.colors.surfaceVariant, tokens.colors.border, tokens.colors.textPrimary]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.iconContainer}>
        <AtomicIcon name={icon} size="lg" color="primary" />
      </View>
      <AtomicText
        type="labelSmall"
        style={styles.label}
      >
        {label}
      </AtomicText>
    </TouchableOpacity>
  );
});

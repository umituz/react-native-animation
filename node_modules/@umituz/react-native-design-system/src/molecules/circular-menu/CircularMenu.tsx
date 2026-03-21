import React, { useMemo } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ARC_BACKGROUND,
  OVERLAY,
  ROW_CONFIG,
  LAYOUT,
  getTopRowPosition,
  getBottomRowPosition,
} from "./constants";
import { CircularMenuBackground } from "./CircularMenuBackground";
import { CircularMenuItem } from "./CircularMenuItem";
import { CircularMenuCloseButton } from "./CircularMenuCloseButton";

export interface CircularMenuAction {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
}

export interface CircularMenuProps {
  visible: boolean;
  onClose: () => void;
  actions: CircularMenuAction[];
}

export const CircularMenu: React.FC<CircularMenuProps> = ({
  visible,
  onClose,
  actions,
}) => {
  const insets = useSafeAreaInsets();

  /**
   * Determine layout based on number of items.
   * If strictly 3 items, use the specific "Top Triangle" layout requested.
   * Otherwise, use a generic algorithm.
   */
  const layoutItems = useMemo(() => {
    if (actions.length === 3) {
      // Triangle layout: middle item on top, first and last on bottom
      return [
        { ...actions[1], position: getTopRowPosition(0, 1) },
        { ...actions[0], position: getBottomRowPosition("left") },
        { ...actions[2], position: getBottomRowPosition("right") },
      ];
    } else if (actions.length === 2) {
      // 2 items: place on bottom left and right of close button
      return [
        { ...actions[0], position: getBottomRowPosition("left") },
        { ...actions[1], position: getBottomRowPosition("right") },
      ];
    } else {
      // Default: distribute items - top row first, then bottom
      const topCount = Math.min(actions.length, 2);
      const bottomCount = Math.max(0, actions.length - 2);

      const mapped: Array<CircularMenuAction & { position: ViewStyle }> = [];
      // Top row
      for (let i = 0; i < topCount; i++) {
        const action = actions[i];
        if (!action) continue;
        mapped.push({
          ...action,
          position: getTopRowPosition(i, topCount),
        });
      }
      // Bottom row (left/right)
      if (bottomCount > 0 && actions[2]) {
        mapped.push({
           ...actions[2],
           position: getBottomRowPosition("left")
        });
      }
      if (bottomCount > 1 && actions[3]) {
         mapped.push({
            ...actions[3],
            position: getBottomRowPosition("right")
         });
      }
      return mapped;
    }
  }, [actions]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.container,
                {
                  paddingBottom: insets.bottom + OVERLAY.PADDING_BOTTOM_OFFSET,
                },
              ]}
            >
              <CircularMenuBackground />

              <View style={styles.itemsContainer}>
                {layoutItems.map((item) => {
                  if (!item.icon || !item.label || !item.onPress) return null;
                  return (
                    <View key={item.id} style={item.position as ViewStyle}>
                      <CircularMenuItem
                        icon={item.icon}
                        label={item.label}
                        onPress={item.onPress}
                      />
                    </View>
                  );
                })}

                <View style={styles.closeButton}>
                  <CircularMenuCloseButton onPress={onClose} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  container: {
    alignItems: "center",
  },
  itemsContainer: {
    width: ARC_BACKGROUND.WIDTH,
    height: ARC_BACKGROUND.HEIGHT,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    left: ARC_BACKGROUND.WIDTH / 2 - LAYOUT.CLOSE_BUTTON_SIZE / 2,
    top:
      ROW_CONFIG.CENTER_Y + ROW_CONFIG.BOTTOM_Y - LAYOUT.CLOSE_BUTTON_SIZE / 2,
  },
});

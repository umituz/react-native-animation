import { ViewStyle } from "react-native";

export const LAYOUT = {
  ITEM_SIZE: 90,
  ICON_SIZE: 52,
  CLOSE_BUTTON_SIZE: 48,
} as const;

export const ROW_CONFIG = {
  TOP_RADIUS: 80,
  TOP_START_ANGLE: -135,
  TOP_END_ANGLE: -45,
  BOTTOM_OFFSET_X: 130,
  BOTTOM_Y: 60,
  CENTER_Y: 150,
} as const;

export const ARC_BACKGROUND = {
  WIDTH: 450,
  HEIGHT: 280,
  BORDER_RADIUS_TOP: 225,
} as const;

export const OVERLAY = {
  PADDING_BOTTOM_OFFSET: 0,
} as const;

const CENTER_X = ARC_BACKGROUND.WIDTH / 2;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function getTopRowPosition(
  index: number,
  totalInRow: number
): ViewStyle {
  if (totalInRow <= 1) {
    const radian = toRadians(-90);
    const x = ROW_CONFIG.TOP_RADIUS * Math.cos(radian);
    const y = ROW_CONFIG.TOP_RADIUS * Math.sin(radian);

    return {
      position: "absolute",
      left: CENTER_X + x - LAYOUT.ITEM_SIZE / 2,
      top: ROW_CONFIG.CENTER_Y + y - LAYOUT.ITEM_SIZE / 2,
    };
  }

  const arcSpan = ROW_CONFIG.TOP_END_ANGLE - ROW_CONFIG.TOP_START_ANGLE;
  const step = arcSpan / (totalInRow - 1);
  const angle = ROW_CONFIG.TOP_START_ANGLE + step * index;
  const radian = toRadians(angle);

  const x = ROW_CONFIG.TOP_RADIUS * Math.cos(radian);
  const y = ROW_CONFIG.TOP_RADIUS * Math.sin(radian);

  return {
    position: "absolute",
    left: CENTER_X + x - LAYOUT.ITEM_SIZE / 2,
    top: ROW_CONFIG.CENTER_Y + y - LAYOUT.ITEM_SIZE / 2,
  };
}

export function getBottomRowPosition(side: "left" | "right"): ViewStyle {
  const offsetX =
    side === "left" ? -ROW_CONFIG.BOTTOM_OFFSET_X : ROW_CONFIG.BOTTOM_OFFSET_X;

  return {
    position: "absolute",
    left: CENTER_X + offsetX - LAYOUT.ITEM_SIZE / 2,
    top: ROW_CONFIG.CENTER_Y + ROW_CONFIG.BOTTOM_Y - LAYOUT.ITEM_SIZE / 2,
  };
}

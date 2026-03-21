/**
 * Grid Layout Generators
 * Standard and dense grid layouts with safe area support
 */

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./screenDimensions";
import type { ImageLayoutItem, LayoutConfig, ImageSourceType } from "./layoutTypes";

export const generateGridLayout = (
  images: ImageSourceType[],
  config: LayoutConfig = {},
): ImageLayoutItem[] => {
  const { columns, gap = 0, borderRadius = 0, safeAreaInsets } = config;
  const count = images.length;
  const cols = columns ?? Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const insets = safeAreaInsets ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const availableWidth = SCREEN_WIDTH - insets.left - insets.right;
  const availableHeight = SCREEN_HEIGHT - insets.top - insets.bottom;

  const totalGapX = gap * (cols - 1);
  const totalGapY = gap * (rows - 1);
  const cellWidth = (availableWidth - totalGapX) / cols;
  const cellHeight = (availableHeight - totalGapY) / rows;

  return images.map((source, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);

    return {
      source,
      style: {
        position: "absolute" as const,
        left: insets.left + col * (cellWidth + gap),
        top: insets.top + row * (cellHeight + gap),
        width: cellWidth,
        height: cellHeight,
        borderRadius,
      },
    };
  });
};

export const generateDenseGridLayout = (
  images: ImageSourceType[],
  config: LayoutConfig = {},
): ImageLayoutItem[] => {
  const { columns = 6, gap = 2, borderRadius = 4, safeAreaInsets } = config;
  const count = images.length;
  const rows = Math.ceil(count / columns);

  const insets = safeAreaInsets ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const availableWidth = SCREEN_WIDTH - insets.left - insets.right;
  const availableHeight = SCREEN_HEIGHT - insets.top - insets.bottom;

  const totalGapX = gap * (columns - 1);
  const totalGapY = gap * (rows - 1);
  const cellWidth = (availableWidth - totalGapX) / columns;
  const cellHeight = (availableHeight - totalGapY) / rows;

  return images.map((source, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);

    return {
      source,
      style: {
        position: "absolute" as const,
        left: insets.left + col * (cellWidth + gap),
        top: insets.top + row * (cellHeight + gap),
        width: cellWidth,
        height: cellHeight,
        borderRadius,
      },
    };
  });
};

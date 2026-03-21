/**
 * Masonry Layout Generator
 * Pinterest-style masonry layout
 */

import { SCREEN_WIDTH } from "./screenDimensions";
import type { ImageLayoutItem, LayoutConfig, ImageSourceType } from "./layoutTypes";

export const generateMasonryLayout = (
  images: ImageSourceType[],
  config: LayoutConfig = {},
): ImageLayoutItem[] => {
  const { columns = 3, gap = 2, borderRadius = 4 } = config;
  const colWidth = (SCREEN_WIDTH - gap * (columns - 1)) / columns;
  const columnHeights = new Array(columns).fill(0);

  return images.map((source) => {
    const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));
    const aspectRatio = 0.7 + Math.random() * 0.6;
    const height = colWidth * aspectRatio;

    const layout: ImageLayoutItem = {
      source,
      style: {
        position: "absolute" as const,
        left: shortestCol * (colWidth + gap),
        top: columnHeights[shortestCol],
        width: colWidth,
        height,
        borderRadius,
      },
    };

    columnHeights[shortestCol] += height + gap;
    return layout;
  });
};

/**
 * Tiles Layout Generator
 * Fixed size tiles centered on screen
 */

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./screenDimensions";
import type { ImageLayoutItem, LayoutConfig, ImageSourceType } from "./layoutTypes";

export const generateTilesLayout = (
  images: ImageSourceType[],
  config: LayoutConfig = {},
): ImageLayoutItem[] => {
  const { columns = 5, gap = 4, borderRadius = 8 } = config;
  const tileSize = (SCREEN_WIDTH - gap * (columns + 1)) / columns;
  const rows = Math.ceil(images.length / columns);
  const startY = (SCREEN_HEIGHT - rows * (tileSize + gap)) / 2;

  return images.map((source, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);

    return {
      source,
      style: {
        position: "absolute" as const,
        left: gap + col * (tileSize + gap),
        top: startY + row * (tileSize + gap),
        width: tileSize,
        height: tileSize,
        borderRadius,
      },
    };
  });
};

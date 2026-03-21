/**
 * Honeycomb Layout Generator
 * Hexagonal pattern layout
 */

import { SCREEN_WIDTH } from "./screenDimensions";
import type { ImageLayoutItem, LayoutConfig, ImageSourceType } from "./layoutTypes";

export const generateHoneycombLayout = (
  images: ImageSourceType[],
  config: LayoutConfig = {},
): ImageLayoutItem[] => {
  const { borderRadius = 50 } = config;
  const size = 80;
  const horizontalSpacing = size * 0.85;
  const verticalSpacing = size * 0.75;
  const columns = Math.floor(SCREEN_WIDTH / horizontalSpacing);

  return images.map((source, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const offsetX = row % 2 === 1 ? horizontalSpacing / 2 : 0;

    return {
      source,
      style: {
        position: "absolute" as const,
        left: col * horizontalSpacing + offsetX,
        top: row * verticalSpacing,
        width: size,
        height: size,
        borderRadius,
      },
    };
  });
};

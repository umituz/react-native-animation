/**
 * Scattered Layout Generator
 * Random small images scattered across screen
 */

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./screenDimensions";
import type { ImageLayoutItem, LayoutConfig, ImageSourceType } from "./layoutTypes";

export const generateScatteredLayout = (
  images: ImageSourceType[],
  config: LayoutConfig = {},
): ImageLayoutItem[] => {
  const { borderRadius = 6 } = config;
  const minSize = 60;
  const maxSize = 100;

  return images.map((source) => {
    const size = minSize + Math.random() * (maxSize - minSize);
    const left = Math.random() * (SCREEN_WIDTH - size);
    const top = Math.random() * (SCREEN_HEIGHT - size);

    return {
      source,
      style: {
        position: "absolute" as const,
        left,
        top,
        width: size,
        height: size,
        borderRadius,
      },
    };
  });
};

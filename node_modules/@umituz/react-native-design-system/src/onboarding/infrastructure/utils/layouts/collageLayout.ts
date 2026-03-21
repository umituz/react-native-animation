/**
 * Collage Layout Generator
 * Random collage with varying sizes
 */

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./screenDimensions";
import type { ImageLayoutItem, LayoutConfig, ImageSourceType } from "./layoutTypes";

export const generateCollageLayout = (
  images: ImageSourceType[],
  config: LayoutConfig = {},
): ImageLayoutItem[] => {
  const { borderRadius = 8 } = config;
  const layouts: ImageLayoutItem[] = [];
  const minSize = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.15;
  const maxSize = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.35;

  images.forEach((source) => {
    const size = minSize + Math.random() * (maxSize - minSize);
    const position = findNonOverlappingPosition(layouts, size);

    layouts.push({
      source,
      style: {
        position: "absolute" as const,
        left: position.left,
        top: position.top,
        width: size,
        height: size,
        borderRadius,
      },
    });
  });

  return layouts;
};

const findNonOverlappingPosition = (
  existing: ImageLayoutItem[],
  size: number,
): { left: number; top: number } => {
  const maxX = SCREEN_WIDTH - size;
  const maxY = SCREEN_HEIGHT - size;
  let attempts = 0;
  let left = 0;
  let top = 0;

  while (attempts < 50) {
    left = Math.random() * maxX;
    top = Math.random() * maxY;

    if (!hasOverlap(existing, left, top, size)) {
      break;
    }
    attempts++;
  }

  return { left, top };
};

const hasOverlap = (
  existing: ImageLayoutItem[],
  left: number,
  top: number,
  size: number,
): boolean => {
  const threshold = 20;

  for (const item of existing) {
    const { style } = item;
    if (
      left < style.left + style.width - threshold &&
      left + size > style.left + threshold &&
      top < style.top + style.height - threshold &&
      top + size > style.top + threshold
    ) {
      return true;
    }
  }
  return false;
};

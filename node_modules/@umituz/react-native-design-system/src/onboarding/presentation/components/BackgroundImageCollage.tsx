/**
 * Background Image Collage Component
 * Displays multiple images in various layout patterns with safe area support.
 * Uses expo-image when available, falls back to React Native Image.
 */

import React, { useCallback, useMemo } from "react";
import { View, Image as RNImage, StyleSheet, type ImageURISource, type ImageStyle } from "react-native";
import { useSafeAreaInsets } from "../../../safe-area/hooks/useSafeAreaInsets";
import {
  generateGridLayout,
  generateDenseGridLayout,
  generateMasonryLayout,
  generateCollageLayout,
  generateScatteredLayout,
  generateTilesLayout,
  generateHoneycombLayout,
  type ImageLayoutItem,
  type LayoutConfig,
  type ImageSourceType,
} from "../../infrastructure/utils/layouts";

// Lazy-load expo-image (optional peer dep)
let ExpoImage: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ExpoImage = require('expo-image').Image;
} catch {
  // expo-image not installed — using React Native Image fallback
}

export type CollageLayout =
  | "grid"
  | "dense"
  | "masonry"
  | "collage"
  | "scattered"
  | "tiles"
  | "honeycomb";

export interface BackgroundImageCollageProps {
  images: ImageSourceType[];
  layout?: CollageLayout;
  columns?: number;
  gap?: number;
  borderRadius?: number;
  opacity?: number;
}

type LayoutGenerator = (images: ImageSourceType[], config: LayoutConfig) => ImageLayoutItem[];

const LAYOUT_GENERATORS: Record<CollageLayout, LayoutGenerator> = {
  grid: generateGridLayout,
  dense: generateDenseGridLayout,
  masonry: generateMasonryLayout,
  collage: generateCollageLayout,
  scattered: generateScatteredLayout,
  tiles: generateTilesLayout,
  honeycomb: generateHoneycombLayout,
};

export const BackgroundImageCollage: React.FC<BackgroundImageCollageProps> = React.memo(({
  images,
  layout = "grid",
  columns,
  gap,
  borderRadius,
  opacity = 1,
}) => {
  const insets = useSafeAreaInsets();

  const imageLayouts = useMemo(() => {
    if (!images || images.length === 0) return [];
    const generator = LAYOUT_GENERATORS[layout] ?? generateGridLayout;
    return generator(images, { columns, gap, borderRadius, safeAreaInsets: insets });
  }, [images, layout, columns, gap, borderRadius, insets]);

  // Stable key extractor - must be before early return
  const keyExtractor = useCallback((item: ImageLayoutItem) => {
    return typeof item.source === 'string' ? item.source : String(item.source);
  }, []);

  if (imageLayouts.length === 0) return null;

  // Memoized image component to prevent unnecessary re-renders
  const CollageImage = React.memo<{ item: ImageLayoutItem }>(({ item }) => {
    if (ExpoImage) {
      return (
        <ExpoImage
          source={item.source}
          style={item.style}
          contentFit="cover"
        />
      );
    }
    return (
      <RNImage
        source={item.source as ImageURISource | number}
        style={item.style as ImageStyle}
        resizeMode="cover"
      />
    );
  });
  CollageImage.displayName = 'CollageImage';

  return (
    <View style={[StyleSheet.absoluteFill, { opacity }]} pointerEvents="none">
      {imageLayouts.map((item) => (
        <CollageImage key={keyExtractor(item)} item={item} />
      ))}
    </View>
  );
});

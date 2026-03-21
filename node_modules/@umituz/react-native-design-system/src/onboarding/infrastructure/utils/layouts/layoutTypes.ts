/**
 * Layout Types
 * Type definitions for image layout generators
 */

import type { ImageSourceType } from "../../../domain/types/ImageSourceType";

export type { ImageSourceType };

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ImageLayoutStyle {
  position: "absolute";
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius?: number;
}

export interface ImageLayoutItem {
  source: ImageSourceType;
  style: ImageLayoutStyle;
}

export interface LayoutConfig {
  columns?: number;
  gap?: number;
  borderRadius?: number;
  randomizeSize?: boolean;
  safeAreaInsets?: SafeAreaInsets;
}

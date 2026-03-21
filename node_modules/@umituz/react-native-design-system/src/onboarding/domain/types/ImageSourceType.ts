/**
 * Image Source Type
 * Domain type for image sources used in onboarding slides.
 * Compatible with expo-image ImageSource (optional peer dep).
 */

export type ImageSourceType =
  | number  // require() static assets
  | string  // URI string
  | { uri: string; headers?: Record<string, string>; cacheKey?: string; [key: string]: unknown };

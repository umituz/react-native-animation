/**
 * AtomicSkeleton Types
 *
 * Type definitions and configurations for skeleton loading states.
 */

/**
 * Skeleton loader pattern presets
 */
export type SkeletonPattern = 'list' | 'card' | 'profile' | 'text' | 'custom';

/**
 * Skeleton loader configuration for individual skeleton elements
 */
export interface SkeletonConfig {
  /** Width of skeleton element (number in pixels or percentage string) */
  width?: number | string;
  /** Height of skeleton element in pixels */
  height?: number;
  /** Border radius in pixels */
  borderRadius?: number;
  /** Bottom margin in pixels */
  marginBottom?: number;
}

/**
 * Predefined skeleton pattern configurations
 * 
 * - **list**: Single row skeleton for list items
 * - **card**: Card-style skeleton with image and text placeholders
 * - **profile**: Profile skeleton with avatar and text
 * - **text**: Multiple text line skeletons
 * - **custom**: Use custom configuration
 */
export const SKELETON_PATTERNS: Record<SkeletonPattern, SkeletonConfig[]> = {
  list: [
    { width: '100%', height: 60, borderRadius: 8, marginBottom: 12 },
  ],
  card: [
    { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
    { width: '80%', height: 20, borderRadius: 4, marginBottom: 8 },
    { width: '60%', height: 16, borderRadius: 4, marginBottom: 0 },
  ],
  profile: [
    { width: 80, height: 80, borderRadius: 40, marginBottom: 16 },
    { width: '60%', height: 24, borderRadius: 4, marginBottom: 8 },
    { width: '40%', height: 16, borderRadius: 4, marginBottom: 0 },
  ],
  text: [
    { width: '100%', height: 16, borderRadius: 4, marginBottom: 8 },
    { width: '90%', height: 16, borderRadius: 4, marginBottom: 8 },
    { width: '95%', height: 16, borderRadius: 4, marginBottom: 0 },
  ],
  custom: [],
};

/**
 * Carousel Calculations
 *
 * Utility functions for carousel calculations.
 * Note: Pass screenWidth from useScreenWidth() hook to ensure
 * reactivity on orientation changes, iPad Split View, etc.
 */

export const calculateItemWidth = (
  screenWidth: number,
  padding: number = 16
): number => {
  return screenWidth - padding * 2;
};

export const calculateIndexFromScroll = (
  scrollPosition: number,
  itemWidth: number,
): number => {
  return Math.round(scrollPosition / itemWidth);
};

/**
 * Calculation Utilities
 *
 * Common mathematical calculations used throughout the app
 */

/**
 * Clamps a number between a minimum and maximum value
 * @param value - The value to clamp
 * @param min - Minimum allowed value (default: 0)
 * @param max - Maximum allowed value (default: 100)
 * @returns Clamped value
 */
export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculates progress percentage
 * @param current - Current value
 * @param total - Total value
 * @returns Percentage (0-100)
 */
export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return (current / total) * 100;
}

/**
 * Rounds a number to specified decimal places
 * @param value - The value to round
 * @param decimals - Number of decimal places (default: 0)
 * @returns Rounded value
 */
export function roundTo(value: number, decimals = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Converts intensity (0-100) to opacity (0-1)
 * @param intensity - Intensity value (0-100)
 * @param minOpacity - Minimum opacity (default: 0.05)
 * @param maxOpacity - Maximum opacity (default: 0.95)
 * @returns Opacity value (0-1)
 */
export function intensityToOpacity(
  intensity: number,
  minOpacity = 0.05,
  maxOpacity = 0.95
): number {
  const clamped = clamp(intensity, 0, 100);
  return minOpacity + (clamped / 100) * (maxOpacity - minOpacity);
}

/**
 * Calculates grid item width based on container width and columns
 * @param containerWidth - Total container width
 * @param columns - Number of columns
 * @param gap - Gap between items in pixels
 * @returns Item width in pixels
 */
export function calculateGridItemWidth(
  containerWidth: number,
  columns: number,
  gap: number
): number {
  if (containerWidth <= 0) return 0;
  const totalGap = gap * (columns - 1);
  // Subtract 1px safety margin to prevent sub-pixel wrapping
  return Math.floor((containerWidth - totalGap) / columns) - 1;
}

/**
 * Checks if a value is within a range (inclusive)
 * @param value - Value to check
 * @param min - Range minimum
 * @param max - Range maximum
 * @returns True if value is in range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Linear interpolation between two values
 * @param start - Start value
 * @param end - End value
 * @param progress - Progress (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * Math.max(0, Math.min(1, progress));
}

/**
 * Maps a value from one range to another
 * @param value - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const range = inMax - inMin;
  if (range === 0) {
    // When input range is zero, return output minimum
    // This prevents division by zero (Infinity/NaN)
    if (__DEV__) {
      console.warn(`[mapRange] Input range is zero (inMin=${inMin}, inMax=${inMax}), returning outMin=${outMin}`);
    }
    return outMin;
  }
  return ((value - inMin) * (outMax - outMin)) / range + outMin;
}

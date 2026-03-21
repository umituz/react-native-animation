/**
 * Opacity Utilities
 *
 * Helper functions for opacity-related calculations
 */

/**
 * Converts intensity value to opacity for glassmorphism effects
 * @param intensity - Intensity value (0-100)
 * @param options - Configuration options
 * @returns Opacity value (0-1)
 */
export function intensityToOpacity(
  intensity: number,
  options: {
    minOpacity?: number;
    maxOpacity?: number;
    invert?: boolean;
  } = {}
): number {
  const {
    minOpacity = 0.05,
    maxOpacity = 0.95,
    invert = false
  } = options;

  const clamped = Math.max(0, Math.min(100, intensity));
  let opacity = minOpacity + (clamped / 100) * (maxOpacity - minOpacity);

  if (invert) {
    opacity = maxOpacity - opacity + minOpacity;
  }

  return opacity;
}

/**
 * Creates an RGBA color string with specified opacity
 * @param rgb - RGB color as array [r, g, b]
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function createRgbaColor(rgb: [number, number, number], opacity: number): string {
  const [r, g, b] = rgb;
  const clampedOpacity = Math.max(0, Math.min(1, opacity));
  return `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
}

/**
 * Calculates opacity based on a ratio (0-1)
 * @param ratio - Ratio value (0-1)
 * @param minOpacity - Minimum opacity (default: 0.1)
 * @param maxOpacity - Maximum opacity (default: 1)
 * @returns Opacity value (0-1)
 */
export function ratioToOpacity(
  ratio: number,
  minOpacity = 0.1,
  maxOpacity = 1
): number {
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  return minOpacity + clampedRatio * (maxOpacity - minOpacity);
}

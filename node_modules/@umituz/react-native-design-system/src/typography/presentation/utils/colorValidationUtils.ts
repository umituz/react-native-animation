/**
 * Color Validation Utilities
 * 
 * Helper functions for validating color formats and values.
 * These utilities ensure color strings are in valid formats.
 * 
 * @fileoverview Provides color validation utilities
 * @author Ümit UZ <umit@umituz.com>
 * @since 1.2.0
 * @version 1.2.0
 */

/**
 * Regular expressions for color format validation
 */
const COLOR_PATTERNS = {
  // #RGB, #RRGGBB
  hex: /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/,
  // rgb(R, G, B), rgba(R, G, B, A)
  rgb: /^rgba?\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*(?:,\s*([01]?\.?\d*)\s*)?\)$/,
  // hsl(H, S, L), hsla(H, S, L, A)
  hsl: /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*(?:,\s*([01]?\.?\d*)\s*)?\)$/,
  // CSS color names (limited to common ones)
  named: /^(red|blue|green|yellow|orange|purple|pink|brown|black|white|gray|grey|transparent|inherit|initial|unset|currentcolor)$/i,
};

/**
 * Check if a string is a valid hex color
 * 
 * @param color - Color string to validate
 * @returns True if valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return COLOR_PATTERNS.hex.test(color);
}

/**
 * Check if a string is a valid RGB/RGBA color
 * 
 * @param color - Color string to validate
 * @returns True if valid RGB/RGBA color
 */
export function isValidRgbColor(color: string): boolean {
  if (!COLOR_PATTERNS.rgb.test(color)) {
    return false;
  }

  // Additional validation for RGB values
  const match = color.match(/\d+/g);
  if (!match || match.length < 3) return false;

  const [r = 0, g = 0, b = 0] = match.map(Number);
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

/**
 * Check if a string is a valid HSL/HSLA color
 * 
 * @param color - Color string to validate
 * @returns True if valid HSL/HSLA color
 */
export function isValidHslColor(color: string): boolean {
  if (!COLOR_PATTERNS.hsl.test(color)) {
    return false;
  }

  // Additional validation for HSL values
  const match = color.match(/\d+/g);
  if (!match || match.length < 3) return false;

  const [h = 0, s = 0, l = 0] = match.map(Number);
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

/**
 * Check if a string is a valid CSS named color
 * 
 * @param color - Color string to validate
 * @returns True if valid CSS named color
 */
export function isValidNamedColor(color: string): boolean {
  return COLOR_PATTERNS.named.test(color);
}

/**
 * Check if a string is a valid color in any supported format
 * 
 * @param color - Color string to validate
 * @returns True if valid color in any format
 */
export function isValidColor(color: string): boolean {
  return isValidHexColor(color) ||
    isValidRgbColor(color) ||
    isValidHslColor(color) ||
    isValidNamedColor(color);
}

/**
 * Get the format of a color string
 * 
 * @param color - Color string to analyze
 * @returns Color format or 'unknown' if not recognized
 */
export function getColorFormat(color: string): 'hex' | 'rgb' | 'hsl' | 'named' | 'unknown' {
  if (isValidHexColor(color)) return 'hex';
  if (isValidRgbColor(color)) return 'rgb';
  if (isValidHslColor(color)) return 'hsl';
  if (isValidNamedColor(color)) return 'named';
  return 'unknown';
}

/**
 * Normalize a color string to a consistent format
 * 
 * @param color - Color string to normalize
 * @returns Normalized color string
 */
export function normalizeColor(color: string): string {
  if (!isValidColor(color)) {
    return color;
  }

  // Convert 3-digit hex to 6-digit
  if (isValidHexColor(color) && color.length === 4) {
    const r = color[1];
    const g = color[2];
    const b = color[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  // Convert to lowercase for consistency
  return color.toLowerCase();
}
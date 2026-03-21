/**
 * COLOR UTILITIES
 * 
 * Color manipulation and validation utilities
 */

import { DESIGN_CONSTANTS } from '../constants/DesignConstants';

/**
 * Validate hex color format
 * @param hexColor - Hex color string to validate
 * @returns true if valid hex color
 */
export const isValidHexColor = (hexColor: string): boolean => {
  if (!hexColor || typeof hexColor !== 'string') {
    return false;
  }
  
  return DESIGN_CONSTANTS.HEX_COLOR_REGEX.test(hexColor);
};

/**
 * Add alpha transparency to hex color
 * @param hexColor - Hex color string (#RRGGBB or #RGB)
 * @param alpha - Alpha value 0-1
 * @returns Hex color with alpha (#RRGGBBAA)
 */
export const withAlpha = (hexColor: string, alpha: number): string => {
  if (!isValidHexColor(hexColor)) {
    return hexColor;
  }

  if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
    return hexColor;
  }

  let hex = hexColor;

  // Convert 3-digit hex to 6-digit (e.g., #RGB → #RRGGBB)
  if (hex.length === 4) {
    // Remove # and double each character, then add # back
    hex = '#' + hex.slice(1).split('').map(c => c + c).join('');
  }

  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');

  return hex + alphaHex;
};
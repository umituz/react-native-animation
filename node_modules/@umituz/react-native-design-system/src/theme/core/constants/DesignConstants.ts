/**
 * DESIGN SYSTEM CONSTANTS
 * 
 * Magic numbers and constants used throughout the design system
 */

export const DESIGN_CONSTANTS = {
  // Border radius
  FULL_BORDER_RADIUS: 9999,
  
  // Alpha values
  ALPHA_TRANSPARENT: 0,
  ALPHA_MINIMUM: 0,
  ALPHA_MAXIMUM: 1,
  
  // Spacing base unit (4px scale)
  SPACING_BASE_UNIT: 4,
  
  // Touch targets
  MINIMUM_TOUCH_TARGET: 44,
  
  // Storage keys
  STORAGE_NAMESPACE: '@umituz/react-native-design-system-theme',
  
  // Validation
  HEX_COLOR_REGEX: /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/,
  
  // Typography
  MINIMUM_FONT_SIZE: 10,
  MAXIMUM_FONT_SIZE: 57,
} as const;
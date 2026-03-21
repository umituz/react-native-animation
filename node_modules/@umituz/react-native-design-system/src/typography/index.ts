/**
 * @umituz/react-native-design-system-typography - Public API
 *
 * Typography types and utilities for React Native applications
 * Material Design 3 text styles and color variants
 *
 * This package provides:
 * - Typography type definitions (TextStyleVariant, ColorVariant)
 * - Text color utility functions
 * - Type-safe typography helpers
 *
 * Usage:
 *   import { TextStyleVariant, ColorVariant, getTextColor } from '@umituz/react-native-design-system-typography';
 */

// =============================================================================
// DOMAIN LAYER - Entities (Types)
// =============================================================================

export type {
  TextStyleVariant,
  ColorVariant,
} from './domain/entities/TypographyTypes';

// =============================================================================
// PRESENTATION LAYER - Utilities
// =============================================================================

export {
  getTextColor,
} from './presentation/utils/textColorUtils';

export {
  getTextStyle,
  isTextStyleVariant,
  getAllTextStyleVariants,
  clearTypographyCache,
} from './presentation/utils/textStyleUtils';

export {
  clearColorCache,
} from './presentation/utils/textColorUtils';

export {
  isValidHexColor,
  isValidRgbColor,
  isValidHslColor,
  isValidNamedColor,
  isValidColor,
  getColorFormat,
  normalizeColor,
} from './presentation/utils/colorValidationUtils';


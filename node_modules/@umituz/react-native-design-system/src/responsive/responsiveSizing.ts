/**
 * Responsive Sizing Utilities
 * Responsive sizing utilities for UI components.
 */

import { getScreenDimensions, isSmallPhone, isTablet } from '../device/detection';
import {
  RESPONSIVE_PERCENTAGES,
  SIZE_CONSTRAINTS,
  HEIGHT_THRESHOLDS,
} from './config';
import { validateNumber, validateFontSize, safePercentage, clamp } from './validation';

// Re-export grid utilities
export {
  getResponsiveGridColumns,
  getResponsiveGridCellSize,
  type GridCellSizeConfig,
} from './gridUtils';

/**
 * Responsive logo/icon size
 * @param baseSize - Base logo size (default: 140)
 */
/**
 * Responsive logo/icon size
 * @param baseSize - Base logo size (default: 140)
 * @param dimensions - Optional dimensions override
 */
export const getResponsiveLogoSize = (
  baseSize: number = 140,
  dimensions?: { width: number }
): number => {
  try {
    const validatedBaseSize = validateNumber(baseSize, 'baseSize', 50, 500);
    const { width } = dimensions || getScreenDimensions();
    const isSmallPhoneDevice = isSmallPhone(dimensions);
    const isTabletDevice = isTablet();

    if (isSmallPhoneDevice) {
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.LOGO_SMALL_PHONE_MAX);
      return clamp(calculatedSize, SIZE_CONSTRAINTS.LOGO_MIN_SMALL, SIZE_CONSTRAINTS.LOGO_MAX_SMALL);
    } else if (isTabletDevice) {
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.LOGO_TABLET_MAX);
      return clamp(calculatedSize, SIZE_CONSTRAINTS.LOGO_MIN_TABLET, SIZE_CONSTRAINTS.LOGO_MAX_TABLET);
    }

    return validatedBaseSize;
  } catch {
    return 140;
  }
};

/**
 * Responsive multiline input height
 * @param baseHeight - Base input height (default: 200)
 * @param dimensions - Optional dimensions override
 */
export const getResponsiveInputHeight = (
  baseHeight: number = 200,
  dimensions?: { height: number }
): number => {
  try {
    const validatedBaseHeight = validateNumber(baseHeight, 'baseHeight', 50, 500);
    const { height } = dimensions || getScreenDimensions();

    if (height <= HEIGHT_THRESHOLDS.SMALL_DEVICE) {
      const calculatedHeight = safePercentage(height, RESPONSIVE_PERCENTAGES.INPUT_SMALL_DEVICE);
      return Math.min(calculatedHeight, SIZE_CONSTRAINTS.INPUT_MAX_SMALL);
    } else if (height <= HEIGHT_THRESHOLDS.MEDIUM_DEVICE) {
      const calculatedHeight = safePercentage(height, RESPONSIVE_PERCENTAGES.INPUT_MEDIUM_DEVICE);
      return Math.min(calculatedHeight, SIZE_CONSTRAINTS.INPUT_MAX_MEDIUM);
    }

    return Math.min(validatedBaseHeight, SIZE_CONSTRAINTS.INPUT_MAX_LARGE);
  } catch {
    return 200;
  }
};

/**
 * Responsive icon container size
 * @param baseSize - Base container size (default: 140)
 * @param dimensions - Optional dimensions override
 */
export const getResponsiveIconContainerSize = (
  baseSize: number = 140,
  dimensions?: { width: number }
): number => {
  try {
    const validatedBaseSize = validateNumber(baseSize, 'baseSize', 50, 300);
    const { width } = dimensions || getScreenDimensions();
    const isSmallPhoneDevice = isSmallPhone(dimensions);
    const isTabletDevice = isTablet();

    if (isSmallPhoneDevice) {
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.ICON_CONTAINER_SMALL_PHONE);
      return Math.min(calculatedSize, SIZE_CONSTRAINTS.ICON_MAX_SMALL);
    } else if (isTabletDevice) {
      const calculatedSize = safePercentage(width, RESPONSIVE_PERCENTAGES.ICON_CONTAINER_TABLET);
      return Math.min(calculatedSize, SIZE_CONSTRAINTS.ICON_MAX_TABLET);
    }

    return validatedBaseSize;
  } catch {
    return 140;
  }
};

/**
 * Responsive max width for content
 * @param baseWidth - Base content width (default: 400)
 * @param dimensions - Optional dimensions override
 */
export const getResponsiveMaxWidth = (
  baseWidth: number = 400,
  dimensions?: { width: number }
): number => {
  try {
    const validatedBaseWidth = validateNumber(baseWidth, 'baseWidth', 100, 1000);
    const { width } = dimensions || getScreenDimensions();
    const isSmallPhoneDevice = isSmallPhone(dimensions);
    const isTabletDevice = isTablet();

    if (isSmallPhoneDevice) {
      return safePercentage(width, RESPONSIVE_PERCENTAGES.CONTENT_SMALL_PHONE);
    } else if (isTabletDevice) {
      const calculatedWidth = safePercentage(width, RESPONSIVE_PERCENTAGES.CONTENT_TABLET);
      return Math.min(calculatedWidth, SIZE_CONSTRAINTS.CONTENT_MAX_TABLET);
    }

    const maxWidth = safePercentage(width, RESPONSIVE_PERCENTAGES.CONTENT_PHONE);
    return Math.min(maxWidth, validatedBaseWidth);
  } catch {
    return 400;
  }
};

/**
 * Responsive font size
 * @param baseFontSize - Base font size
 * @param dimensions - Optional dimensions override
 */
export const getResponsiveFontSize = (
  baseFontSize: number,
  dimensions?: { width: number }
): number => {
  try {
    const validatedBaseSize = validateFontSize(baseFontSize);
    const isSmallPhoneDevice = isSmallPhone(dimensions);
    const isTabletDevice = isTablet();

    if (isSmallPhoneDevice) {
      const scaledSize = validatedBaseSize * RESPONSIVE_PERCENTAGES.FONT_SMALL_PHONE;
      return Math.max(scaledSize, SIZE_CONSTRAINTS.FONT_MIN_SIZE);
    } else if (isTabletDevice) {
      return validatedBaseSize * RESPONSIVE_PERCENTAGES.FONT_TABLET;
    }

    return validatedBaseSize;
  } catch {
    return 16;
  }
};

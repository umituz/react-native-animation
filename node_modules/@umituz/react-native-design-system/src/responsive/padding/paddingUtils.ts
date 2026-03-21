/**
 * Padding Utilities
 */

import { isTablet, isSmallPhone, getSpacingMultiplier } from '../../device/detection';
import { LAYOUT_CONSTANTS } from '../config';
import { validateNumber, validateSafeAreaInsets } from '../validation';

export const getResponsiveVerticalPadding = (
  insets: { top?: number; bottom?: number } = { top: 0, bottom: 0 }
): number => {
  try {
    validateSafeAreaInsets(insets);
    const isTabletDevice = isTablet();
    const isSmall = isSmallPhone();
    const spacingMultiplier = getSpacingMultiplier();

    // Base padding adjusted by device type
    let basePadding: number = LAYOUT_CONSTANTS.VERTICAL_PADDING_STANDARD;
    if (isTabletDevice) {
      basePadding = LAYOUT_CONSTANTS.VERTICAL_PADDING_TABLET;
    } else if (isSmall) {
      basePadding = LAYOUT_CONSTANTS.VERTICAL_PADDING_SMALL;
    }

    // Apply spacing multiplier for consistency
    const adjustedPadding = basePadding * spacingMultiplier;

    // We now return the base padding; safe areas are handled by ScreenLayout
    return adjustedPadding;
  } catch {
    return LAYOUT_CONSTANTS.VERTICAL_PADDING_STANDARD;
  }
};

export const getResponsiveHorizontalPadding = (
  basePadding: number = LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
  insets: { left?: number; right?: number } = { left: 0, right: 0 }
): number => {
  try {
    const validatedBasePadding = validateNumber(basePadding, 'basePadding', 0, 100);
    validateSafeAreaInsets(insets);

    const { left = 0, right = 0 } = insets;
    const isTabletDevice = isTablet();

    if (isTabletDevice) {
      const tabletPadding = validatedBasePadding * LAYOUT_CONSTANTS.SPACING_MULTIPLIER_TABLET;
      return Math.max(
        tabletPadding,
        left + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
        right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
      );
    }

    return Math.max(
      validatedBasePadding,
      left + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET,
      right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
    );
  } catch {
    return 16;
  }
};

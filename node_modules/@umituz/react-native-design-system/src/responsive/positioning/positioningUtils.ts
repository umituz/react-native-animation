/**
 * Positioning Utilities
 */

import { isTablet } from '../../device/detection';
import { LAYOUT_CONSTANTS } from '../config';
import { validateNumber, validateSafeAreaInsets } from '../validation';

export const getResponsiveBottomPosition = (
  basePosition: number = LAYOUT_CONSTANTS.BOTTOM_POSITION_BASE,
  insets: { bottom?: number } = { bottom: 0 }
): number => {
  try {
    const validatedBasePosition = validateNumber(basePosition, 'basePosition', 0, 500);
    validateSafeAreaInsets(insets);

    const { bottom = 0 } = insets;
    return Math.max(validatedBasePosition, bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET);
  } catch {
    return 32;
  }
};

export const getResponsiveFABPosition = (
  insets: { bottom?: number; right?: number } = { bottom: 0, right: 0 }
): { bottom: number; right: number } => {
  try {
    validateSafeAreaInsets(insets);
    const { bottom = 0, right = 0 } = insets;
    const isTabletDevice = isTablet();

    if (isTabletDevice) {
      return {
        bottom: Math.max(
          LAYOUT_CONSTANTS.FAB_BOTTOM_TABLET,
          bottom + LAYOUT_CONSTANTS.TAB_BAR_OFFSET
        ),
        right: Math.max(
          LAYOUT_CONSTANTS.FAB_RIGHT_TABLET,
          right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
        ),
      };
    }

    return {
      bottom: Math.max(
        LAYOUT_CONSTANTS.TAB_BAR_OFFSET,
        bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
      right: Math.max(
        LAYOUT_CONSTANTS.FAB_RIGHT_PHONE,
        right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
    };
  } catch {
    return {
      bottom: LAYOUT_CONSTANTS.TAB_BAR_OFFSET,
      right: LAYOUT_CONSTANTS.FAB_RIGHT_PHONE,
    };
  }
};

/**
 * Screen Layout Configuration
 */

import { isTablet, getSpacingMultiplier } from '../../device/detection';
import { LAYOUT_CONSTANTS, SIZE_CONSTRAINTS } from '../config';
import { getResponsiveHorizontalPadding } from '../padding/paddingUtils';
import { getResponsiveVerticalPadding } from '../padding/paddingUtils';

export interface ScreenLayoutConfig {
  readonly maxContentWidth: number | undefined;
  readonly horizontalPadding: number;
  readonly verticalPadding: number;
  readonly spacingMultiplier: number;
}

export const getScreenLayoutConfig = (
  insets: { left?: number; right?: number; top?: number; bottom?: number } = {}
): ScreenLayoutConfig => {
  try {
    const isTabletDevice = isTablet();
    const spacingMultiplier = getSpacingMultiplier();

    return {
      maxContentWidth: isTabletDevice ? SIZE_CONSTRAINTS.CONTENT_MAX_TABLET : undefined,
      horizontalPadding: getResponsiveHorizontalPadding(LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE, insets),
      verticalPadding: getResponsiveVerticalPadding(insets),
      spacingMultiplier,
    };
  } catch {
    return {
      maxContentWidth: undefined,
      horizontalPadding: LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
      verticalPadding: LAYOUT_CONSTANTS.VERTICAL_PADDING_STANDARD,
      spacingMultiplier: LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD,
    };
  }
};

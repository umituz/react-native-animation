/**
 * Responsive Positioning Computation
 */

import {
  getResponsiveHorizontalPadding,
  getResponsiveVerticalPadding,
  getResponsiveBottomPosition,
  getResponsiveFABPosition,
  getScreenLayoutConfig,
  getResponsiveTabBarConfig,
  getResponsiveModalLayout,
  getResponsiveBottomSheetLayout,
  getResponsiveDialogLayout,
} from '../responsive';
import type { ResponsiveModalLayout, ResponsiveBottomSheetLayout, ResponsiveDialogLayout, ResponsiveTabBarConfig, ScreenLayoutConfig } from '../responsive';

export interface ComputedResponsivePositioning {
  readonly horizontalPadding: number;
  readonly verticalPadding: number;
  readonly bottomPosition: number;
  readonly fabPosition: { readonly bottom: number; readonly right: number };
  readonly screenLayoutConfig: ScreenLayoutConfig;
  readonly tabBarConfig: ResponsiveTabBarConfig;
  readonly modalLayout: ResponsiveModalLayout;
  readonly bottomSheetLayout: ResponsiveBottomSheetLayout;
  readonly dialogLayout: ResponsiveDialogLayout;
}

export const computeResponsivePositioning = (
  insets: { top: number; bottom: number; left: number; right: number },
  dimensions?: { width: number; height: number }
): ComputedResponsivePositioning => ({
  horizontalPadding: getResponsiveHorizontalPadding(undefined, insets),
  verticalPadding: getResponsiveVerticalPadding(insets),
  bottomPosition: getResponsiveBottomPosition(undefined, insets),
  fabPosition: getResponsiveFABPosition(insets),
  screenLayoutConfig: getScreenLayoutConfig(insets),
  tabBarConfig: getResponsiveTabBarConfig(insets),
  modalLayout: getResponsiveModalLayout(dimensions),
  bottomSheetLayout: getResponsiveBottomSheetLayout(dimensions),
  dialogLayout: getResponsiveDialogLayout(dimensions),
});

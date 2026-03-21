/**
 * Responsive Sizes Computation
 */

import {
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveIconContainerSize,
  getResponsiveMaxWidth,
  getResponsiveModalMaxHeight,
  getResponsiveMinModalHeight,
  getResponsiveGridColumns,
} from '../responsive';
import { getMinTouchTarget } from '../platformConstants';
import type { ComputedDeviceInfo } from './computeDeviceInfo';

export interface ComputedResponsiveSizes {
  readonly logoSize: number;
  readonly inputHeight: number;
  readonly iconContainerSize: number;
  readonly maxContentWidth: number;
  readonly minTouchTarget: number;
  readonly modalMaxHeight: string;
  readonly modalMinHeight: number;
  readonly gridColumns: number;
}

export const computeResponsiveSizes = (
  dimensions?: { width: number; height: number }
): ComputedResponsiveSizes => ({
  logoSize: getResponsiveLogoSize(undefined, dimensions),
  inputHeight: getResponsiveInputHeight(undefined, dimensions),
  iconContainerSize: getResponsiveIconContainerSize(undefined, dimensions),
  maxContentWidth: getResponsiveMaxWidth(undefined, dimensions),
  minTouchTarget: getMinTouchTarget(),
  modalMaxHeight: getResponsiveModalMaxHeight(dimensions),
  modalMinHeight: getResponsiveMinModalHeight(dimensions),
  gridColumns: getResponsiveGridColumns(),
});

export const computeOnboardingSizes = (
  deviceInfo: ComputedDeviceInfo
) => ({
  onboardingIconSize: getResponsiveIconContainerSize(64),
  onboardingIconMarginTop: deviceInfo.spacingMultiplier * 24,
  onboardingIconMarginBottom: deviceInfo.spacingMultiplier * 16,
  onboardingTitleMarginBottom: deviceInfo.spacingMultiplier * 16,
  onboardingDescriptionMarginTop: deviceInfo.spacingMultiplier * 12,
  onboardingTextPadding: deviceInfo.spacingMultiplier * 20,
});

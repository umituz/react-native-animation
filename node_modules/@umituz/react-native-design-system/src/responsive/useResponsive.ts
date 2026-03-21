/**
 * useResponsive Hook
 * Refactored: Extracted compute functions
 */

import { useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "../safe-area";
import {
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveIconContainerSize,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  getResponsiveGridColumns,
} from "./responsive";
import { computeDeviceInfo } from "./compute/computeDeviceInfo";
import { computeResponsiveSizes, computeOnboardingSizes } from "./compute/computeResponsiveSizes";
import { computeResponsivePositioning } from "./compute/computeResponsivePositioning";
import { getIPadLayoutInfo } from "../device/detection";
import type { UseResponsiveReturn } from "./types/responsiveTypes";

export const useResponsive = (): UseResponsiveReturn => {
  const { width, height } = useWindowDimensions();
  // Live reactive insets — updates on orientation change, multitasking, notch changes
  const insets = useSafeAreaInsets();

  // Memoize utility functions
  const getLogoSize = useCallback(
    (baseSize?: number) => getResponsiveLogoSize(baseSize, { width }),
    [width],
  );
  const getInputHeight = useCallback(
    (baseHeight?: number) => getResponsiveInputHeight(baseHeight, { height }),
    [height],
  );
  const getIconSize = useCallback(
    (baseSize?: number) => getResponsiveIconContainerSize(baseSize, { width }),
    [width],
  );
  const getMaxWidth = useCallback(
    (baseWidth?: number) => getResponsiveMaxWidth(baseWidth, { width }),
    [width],
  );
  const getFontSize = useCallback(
    (baseFontSize: number) => getResponsiveFontSize(baseFontSize, { width }),
    [width],
  );
  const getGridCols = useCallback(
    (mobile?: number, tablet?: number) =>
      getResponsiveGridColumns(mobile, tablet),
    [],
  );

  // Compute all responsive values
  // Spread individual inset values in deps so useMemo recomputes on any inset change
  const responsiveValues = useMemo(
    () => {
      const dimensions = { width, height };
      const deviceInfo = computeDeviceInfo(dimensions);
      const sizes = computeResponsiveSizes(dimensions);
      const positioning = computeResponsivePositioning(insets, dimensions);
      const onboarding = computeOnboardingSizes(deviceInfo);
      const iPadLayout = deviceInfo.isTabletDevice ? getIPadLayoutInfo() : null;

      return {
        // Device info
        width,
        height,
        isSmallDevice: deviceInfo.isSmallDevice,
        isTabletDevice: deviceInfo.isTabletDevice,
        isLandscapeDevice: deviceInfo.isLandscapeDevice,
        deviceType: deviceInfo.deviceType,

        // Safe area insets (live, reactive)
        insets,

        // iPad-specific layout info (null on phones)
        iPadLayout,

        // Responsive sizes
        logoSize: sizes.logoSize,
        inputHeight: sizes.inputHeight,
        iconContainerSize: sizes.iconContainerSize,
        maxContentWidth: sizes.maxContentWidth,
        minTouchTarget: sizes.minTouchTarget,

        // Responsive positioning
        horizontalPadding: positioning.horizontalPadding,
        verticalPadding: positioning.verticalPadding,
        bottomPosition: positioning.bottomPosition,
        fabPosition: positioning.fabPosition,

        // Screen layout config
        screenLayoutConfig: positioning.screenLayoutConfig,

        // Responsive layout
        modalMaxHeight: sizes.modalMaxHeight,
        modalMinHeight: sizes.modalMinHeight,
        gridColumns: sizes.gridColumns,
        spacingMultiplier: deviceInfo.spacingMultiplier,
        tabBarConfig: positioning.tabBarConfig,

        // Modal layouts
        modalLayout: positioning.modalLayout,
        bottomSheetLayout: positioning.bottomSheetLayout,
        dialogLayout: positioning.dialogLayout,

        // Onboarding specific
        ...onboarding,

        // Utility functions
        getLogoSize,
        getInputHeight,
        getIconSize,
        getMaxWidth,
        getFontSize,
        getGridCols,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, height, insets.top, insets.bottom, insets.left, insets.right, getLogoSize, getInputHeight, getIconSize, getMaxWidth, getFontSize, getGridCols],
  );

  return responsiveValues;
};

// Re-export types
export type { UseResponsiveReturn } from './types/responsiveTypes';

/**
 * Responsive Hook Type Definitions
 */

import type { DeviceType, IPadLayoutInfo } from '../../device/detection';
import type { ResponsiveModalLayout, ResponsiveBottomSheetLayout, ResponsiveDialogLayout } from '../responsive';
import type { ResponsiveTabBarConfig, ScreenLayoutConfig } from '../responsiveLayout';

export interface UseResponsiveReturn {
  // Device info
  readonly width: number;
  readonly height: number;
  readonly isSmallDevice: boolean;
  readonly isTabletDevice: boolean;
  readonly isLandscapeDevice: boolean;
  readonly deviceType: DeviceType;

  // Safe area insets (live, reactive — updates on orientation change)
  readonly insets: {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
  };

  // iPad-specific layout info (null on phones)
  readonly iPadLayout: IPadLayoutInfo | null;

  // Responsive sizes
  readonly logoSize: number;
  readonly inputHeight: number;
  readonly iconContainerSize: number;
  readonly maxContentWidth: number;
  readonly minTouchTarget: number;

  // Responsive positioning
  readonly horizontalPadding: number;
  readonly verticalPadding: number;
  readonly bottomPosition: number;
  readonly fabPosition: { readonly bottom: number; readonly right: number };

  // Screen layout config
  readonly screenLayoutConfig: ScreenLayoutConfig;

  // Responsive layout
  readonly modalMaxHeight: string;
  readonly modalMinHeight: number;
  readonly gridColumns: number;
  readonly spacingMultiplier: number;
  readonly tabBarConfig: ResponsiveTabBarConfig;

  // Modal layouts
  readonly modalLayout: ResponsiveModalLayout;
  readonly bottomSheetLayout: ResponsiveBottomSheetLayout;
  readonly dialogLayout: ResponsiveDialogLayout;

  // Onboarding specific
  readonly onboardingIconSize: number;
  readonly onboardingIconMarginTop: number;
  readonly onboardingIconMarginBottom: number;
  readonly onboardingTitleMarginBottom: number;
  readonly onboardingDescriptionMarginTop: number;
  readonly onboardingTextPadding: number;

  // Utility functions
  readonly getLogoSize: (baseSize?: number) => number;
  readonly getInputHeight: (baseHeight?: number) => number;
  readonly getIconSize: (baseSize?: number) => number;
  readonly getMaxWidth: (baseWidth?: number) => number;
  readonly getFontSize: (baseFontSize: number) => number;
  readonly getGridCols: (mobile?: number, tablet?: number) => number;
}

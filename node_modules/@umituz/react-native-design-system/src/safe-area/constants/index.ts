/**
 * Constants for safe area calculations
 */

export const SAFE_AREA_DEFAULTS = {
  MIN_HEADER_PADDING: 0,
  MIN_CONTENT_PADDING: 0,
  MIN_STATUS_BAR_PADDING: 0,
  ADDITIONAL_PADDING: 0,
} as const;

export const PLATFORM_BEHAVIORS = {
  IOS_STATUS_BAR_USES_SAFE_AREA: true,
} as const;

/**
 * Default configuration that can be overridden by applications
 */
export const DEFAULT_CONFIG = {
  minHeaderPadding: SAFE_AREA_DEFAULTS.MIN_HEADER_PADDING,
  minContentPadding: SAFE_AREA_DEFAULTS.MIN_CONTENT_PADDING,
  minStatusBarPadding: SAFE_AREA_DEFAULTS.MIN_STATUS_BAR_PADDING,
  additionalPadding: SAFE_AREA_DEFAULTS.ADDITIONAL_PADDING,
  iosStatusBarUsesSafeArea: PLATFORM_BEHAVIORS.IOS_STATUS_BAR_USES_SAFE_AREA,
} as const;
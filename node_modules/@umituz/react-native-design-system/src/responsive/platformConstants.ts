/**
 * Platform-Specific Constants
 *
 * Design system constants that ensure compliance with platform guidelines.
 * These values are based on official Human Interface Guidelines (HIG) from Apple and Material Design from Google.
 */

/**
 * iOS Human Interface Guidelines (HIG) Constants
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */
export const IOS_HIG = {
  /**
   * Minimum Touch Target Size
   *
   * Apple requires a minimum tappable area of 44pt x 44pt for ALL interactive controls.
   * This is enforced during App Store review.
   *
   * @critical Violating this can result in App Store rejection
   */
  MIN_TOUCH_TARGET: 44,

  /**
   * Recommended Minimum Touch Target Size
   *
   * For better accessibility and usability, Apple recommends 48pt x 48pt.
   */
  RECOMMENDED_TOUCH_TARGET: 48,

  /**
   * Minimum Text Size
   *
   * Minimum font size for body text to ensure readability.
   */
  MIN_TEXT_SIZE: 17,


} as const;



/**
 * Universal Platform Constants
 *
 * These values work across both iOS and Android, taking the more restrictive requirement.
 */
export const PLATFORM_CONSTANTS = {
  /**
   * Minimum Touch Target Size
   *
   * Uses iOS requirement (44pt) as it's more restrictive than Android (48dp).
   * This ensures compliance on both platforms.
   */
  MIN_TOUCH_TARGET: Math.max(IOS_HIG.MIN_TOUCH_TARGET, 48),

  /**
   * Recommended Touch Target Size
   *
   * Uses the higher value between iOS and Android recommendations.
   */
  RECOMMENDED_TOUCH_TARGET: 48,

  /**
   * Minimum Text Size
   *
   * Uses iOS requirement as it's larger.
   */
  MIN_TEXT_SIZE: Math.max(IOS_HIG.MIN_TEXT_SIZE, 14),
} as const;

/**
 * Helper function to validate touch target size
 *
 * @param size - The size to validate (in pt/dp)
 * @returns true if size meets platform requirements
 */
export const isValidTouchTarget = (size: number): boolean => {
  return size >= IOS_HIG.MIN_TOUCH_TARGET;
};

/**
 * Helper function to get minimum touch target for component
 *
 * @param componentType - The type of component ('button' | 'input' | 'icon' | 'generic')
 * @returns The minimum touch target size for that component type
 */
export const getMinTouchTarget = (componentType: 'button' | 'input' | 'icon' | 'generic' = 'generic'): number => {
  switch (componentType) {
    case 'button':
    case 'input':
      return PLATFORM_CONSTANTS.RECOMMENDED_TOUCH_TARGET; // 48pt recommended for buttons and inputs
    case 'icon':
    case 'generic':
    default:
      return IOS_HIG.MIN_TOUCH_TARGET; // 44pt minimum for icons and generic elements
  }
};

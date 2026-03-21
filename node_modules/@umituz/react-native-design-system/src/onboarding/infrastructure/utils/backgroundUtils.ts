/**
 * Background Utilities
 *
 * Utility functions for background-related operations
 * Follows Single Responsibility Principle
 */

import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";

/**
 * Check if slide should use custom background or overlay
 * Indicates that we are not using the default theme background.
 * 
 * @param slide - The slide to check
 * @param globalUseCustomBackground - Global option from OnboardingOptions
 * @returns true if custom background/media should be used, false otherwise
 */
export function shouldUseCustomBackground(
  slide: OnboardingSlide | undefined,
  globalUseCustomBackground?: boolean
): boolean {
  if (!slide) {
    return false;
  }

  // If there is background media, we always treat it as custom (needs overlay for readability)
  if (slide.backgroundImage || slide.backgroundVideo || (slide.backgroundImages && slide.backgroundImages.length > 0)) {
    return true;
  }

  // If global custom background is enabled, use it if slide has color defined
  if (globalUseCustomBackground === true) {
    return !!slide.backgroundColor;
  }

  // Otherwise, check slide's own useCustomBackground prop
  return slide.useCustomBackground === true && !!slide.backgroundColor;
}

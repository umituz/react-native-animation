/**
 * Onboarding Slide Service
 *
 * Business logic for filtering and processing onboarding slides
 * Follows Single Responsibility Principle
 */

import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import type { OnboardingUserData } from "../../domain/entities/OnboardingUserData";

/**
 * SlideManager
 */
export class SlideManager {
  /**
   * Filter slides based on skipIf conditions
   * @param slides - All available slides
   * @param userData - User's onboarding data including answers
   * @returns Filtered slides that should be shown
   */
  static filterSlides(
    slides: OnboardingSlide[] | undefined,
    userData: OnboardingUserData,
  ): OnboardingSlide[] {
    // Safety check: return empty array if slides is undefined or not an array
    if (!slides || !Array.isArray(slides)) {
      return [];
    }
    return slides.filter((slide) => {
      if (slide.skipIf) {
        return !slide.skipIf(userData.answers);
      }
      return true;
    });
  }

  /**
   * Get slide at specific index
   * @param slides - Filtered slides array
   * @param index - Slide index
   * @returns Slide at index or undefined
   */
  static getSlideAtIndex(
    slides: OnboardingSlide[],
    index: number,
  ): OnboardingSlide | undefined {
    if (index < 0 || index >= slides.length) {
      return undefined;
    }
    return slides[index];
  }
}


/**
 * Onboarding Slide Entity
 *
 * Domain entity representing a single onboarding slide
 */

// Compatible with expo-video VideoSource (optional peer dep)
type VideoSource = string | { uri: string; headers?: Record<string, string>; [key: string]: unknown };

import type { ImageSourceType } from "../types/ImageSourceType";
import type { OnboardingQuestion, OnboardingAnswerValue } from "./OnboardingQuestion";

/**
 * Slide type - determines the content and behavior
 */
export type SlideType = "info" | "question" | "welcome" | "completion";

/**
 * Content position - determines where the text content is positioned
 */
export type ContentPosition = "center" | "bottom";

/**
 * Onboarding Slide
 * Each slide represents one step in the onboarding flow
 */
export interface OnboardingSlide {
  id: string;
  type?: SlideType;
  title: string;
  description: string;
  icon?: string;
  iconType?: 'emoji' | 'icon';
  hideIcon?: boolean;
  contentPosition?: ContentPosition;
  backgroundColor?: string;
  useCustomBackground?: boolean;
  image?: ImageSourceType;
  backgroundImage?: ImageSourceType;
  backgroundImages?: ImageSourceType[];
  backgroundImagesLayout?: 'grid' | 'dense' | 'masonry' | 'collage' | 'scattered' | 'tiles' | 'honeycomb';
  backgroundImagesColumns?: number;
  backgroundImagesGap?: number;
  backgroundImagesBorderRadius?: number;
  backgroundVideo?: VideoSource;
  overlayOpacity?: number;
  features?: string[];
  question?: OnboardingQuestion;
  skipIf?: (answers: Record<string, OnboardingAnswerValue>) => boolean;
}

/**
 * Onboarding User Data Entity
 *
 * Domain entity representing collected user data from onboarding
 */

import type { OnboardingAnswerValue } from "./OnboardingQuestion";

/**
 * User data collected during onboarding
 */
export interface OnboardingUserData {
  /**
   * User's answers to questions
   * Key: question ID, Value: answer
   */
  answers: Record<string, OnboardingAnswerValue>;

  /**
   * Timestamp when onboarding was completed
   */
  completedAt?: string;

  /**
   * Was onboarding skipped?
   */
  skipped?: boolean;

  /**
   * User preferences derived from answers
   */
  preferences?: Record<string, unknown>;

  /**
   * User profile data
   */
  profile?: {
    name?: string;
    email?: string;
    age?: number;
    gender?: string;
    [key: string]: string | number | undefined;
  };
}


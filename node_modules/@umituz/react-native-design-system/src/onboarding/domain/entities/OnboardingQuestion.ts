/**
 * Onboarding Question Entity
 *
 * Domain entity representing a personalization question in the onboarding flow
 */

/**
 * Possible answer value types for onboarding questions
 */
export type OnboardingAnswerValue = string | string[] | number | undefined;

/**
 * Question types for different input methods
 */
export type QuestionType =
  | "single_choice" // Radio buttons - single selection
  | "multiple_choice" // Checkboxes - multiple selections
  | "text_input" // Text input field
  | "rating" // Star rating or numeric rating
  | "date" // Date picker
  | "image_picker"; // Image selection from gallery

/**
 * Option for single/multiple choice questions
 */
export interface QuestionOption {
  /**
   * Unique identifier for the option
   */
  id: string;

  /**
   * Display label for the option
   */
  label: string;

  /**
   * Optional icon (emoji or Ionicons name)
   */
  icon?: string;

  /**
   * Optional image URL
   */
  image?: string;

  /**
   * Optional value (if different from label)
   */
  value?: string;

  /**
   * Type of icon: 'emoji' or 'icon' (default: 'icon')
   */
  iconType?: 'emoji' | 'icon';
}

/**
 * Validation rules for questions
 */
export interface QuestionValidation {
  /**
   * Is this question required?
   */
  required?: boolean;

  /**
   * Minimum value (for rating)
   */
  min?: number;

  /**
   * Maximum value (for rating)
   */
  max?: number;

  /**
   * Minimum length (for text input)
   */
  minLength?: number;

  /**
   * Maximum length (for text input)
   */
  maxLength?: number;

  /**
   * Minimum selections (for multiple choice)
   */
  minSelections?: number;

  /**
   * Maximum selections (for multiple choice)
   */
  maxSelections?: number;

  /**
   * Custom validation function
   */
  customValidator?: (value: OnboardingAnswerValue) => boolean | string;
}

/**
 * Onboarding Question
 * Represents a personalization question in the onboarding flow
 */
export interface OnboardingQuestion {
  /**
   * Unique identifier for the question
   */
  id: string;

  /**
   * Question type
   */
  type: QuestionType;

  /**
   * Question text
   */
  question: string;

  /**
   * Optional subtitle/description
   */
  subtitle?: string;

  /**
   * Optional placeholder text (for text input)
   */
  placeholder?: string;

  /**
   * Options for single/multiple choice questions
   */
  options?: QuestionOption[];

  /**
   * Validation rules
   */
  validation?: QuestionValidation;

  /**
   * Default value
   */
  defaultValue?: OnboardingAnswerValue;

  /**
   * Storage key for saving the answer
   */
  storageKey: string;

  /**
   * Optional icon for the question
   */
  icon?: string;

  /**
   * Type of icon: 'emoji' or 'icon' (default: 'icon')
   */
  iconType?: 'emoji' | 'icon';

  /**
   * Skip this question if condition is met
   * @param answers - Previous answers
   * @returns true to skip, false to show
   */
  skipIf?: (answers: Record<string, OnboardingAnswerValue>) => boolean;
}


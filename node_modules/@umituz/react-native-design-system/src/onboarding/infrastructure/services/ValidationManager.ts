/**
 * Onboarding Validation Service
 *
 * Business logic for validating onboarding question answers
 * Follows Single Responsibility Principle
 */

import type { OnboardingQuestion, OnboardingAnswerValue } from "../../domain/entities/OnboardingQuestion";

/**
 * ValidationManager
 */
export class ValidationManager {
  /**
   * Validate answer against question validation rules
   * @param question - The question to validate against
   * @param answer - The answer to validate
   * @returns true if valid, false otherwise
   */
  static validateAnswer(
    question: OnboardingQuestion,
    answer: OnboardingAnswerValue,
  ): boolean {
    const { validation } = question;
    if (!validation) {
      return true;
    }

    // Required validation
    if (validation.required && !answer) {
      return false;
    }

    // Type-specific validations
    switch (question.type) {
      case "multiple_choice":
        return this.validateMultipleChoice(answer, validation);
      case "text_input":
        return this.validateTextInput(answer, validation);
      case "date":
        return this.validateDate(answer, validation);
      case "rating":
        return this.validateNumeric(answer, validation);
      default:
        break;
    }

    // Custom validator (for types not covered by switch, e.g. default)
    if (validation.customValidator) {
      const customResult = validation.customValidator(answer);
      return customResult === true;
    }

    return true;
  }

  /**
   * Validate multiple choice answer
   */
  private static validateMultipleChoice(
    answer: OnboardingAnswerValue,
    validation: OnboardingQuestion["validation"],
  ): boolean {
    if (!validation) return true;

    if (validation.minSelections) {
      if (!answer || !Array.isArray(answer) || answer.length < validation.minSelections) {
        return false;
      }
    }

    if (validation.maxSelections) {
      if (Array.isArray(answer) && answer.length > validation.maxSelections) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validate text input answer
   */
  private static validateTextInput(
    answer: OnboardingAnswerValue,
    validation: OnboardingQuestion["validation"],
  ): boolean {
    if (!validation) return true;

    // If no answer yet (undefined/null), valid only when not required
    if (answer === undefined || answer === null) {
      return !validation.required;
    }

    if (typeof answer !== "string") {
      return false;
    }

    // Empty string: valid only when not required
    if (!answer.trim() && validation.required) {
      return false;
    }

    if (validation.minLength && answer.length < validation.minLength) {
      return false;
    }

    if (validation.maxLength && answer.length > validation.maxLength) {
      return false;
    }

    // Run custom validator if provided
    if (validation.customValidator) {
      const customResult = validation.customValidator(answer);
      return customResult === true;
    }

    return true;
  }

  /**
   * Validate date answer (ISO string from date picker)
   */
  private static validateDate(
    answer: OnboardingAnswerValue,
    validation: OnboardingQuestion["validation"],
  ): boolean {
    if (!validation) return true;

    if (answer === undefined || answer === null) {
      return !validation.required;
    }

    if (typeof answer !== "string" || !answer) {
      return !validation.required;
    }

    const d = new Date(answer);
    return !isNaN(d.getTime());
  }

  /**
   * Validate numeric answer (rating)
   */
  private static validateNumeric(
    answer: OnboardingAnswerValue,
    validation: OnboardingQuestion["validation"],
  ): boolean {
    if (!validation) return true;

    if (typeof answer !== "number") {
      return false;
    }

    if (validation.min !== undefined && answer < validation.min) {
      return false;
    }

    if (validation.max !== undefined && answer > validation.max) {
      return false;
    }

    return true;
  }
}


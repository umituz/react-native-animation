/**
 * Validation Result Interface
 * Represents the outcome of a validation operation
 */
export interface ValidationResult {
  /**
   * Whether the validation passed
   */
  isValid: boolean;

  /**
   * Error message if validation failed
   */
  error?: string;
}

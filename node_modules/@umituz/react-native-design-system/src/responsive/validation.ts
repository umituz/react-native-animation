/**
 * Input Validation Utilities
 *
 * Centralized validation for all responsive utility functions.
 * Ensures type safety and prevents runtime errors.
 */

import { VALIDATION_CONSTRAINTS } from './config';

/**
 * Custom error class for responsive utilities
 */
export class ResponsiveValidationError extends Error {
  constructor(message: string) {
    super(`[Responsive] ${message}`);
    this.name = 'ResponsiveValidationError';
    Object.setPrototypeOf(this, ResponsiveValidationError.prototype);
  }
}

/**
 * Validates a numeric input parameter
 * @param value - The value to validate
 * @param paramName - Parameter name for error messages
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @throws ResponsiveValidationError if validation fails
 */
export const validateNumber = (
  value: number | undefined,
  paramName: string,
  min: number = VALIDATION_CONSTRAINTS.MIN_BASE_SIZE,
  max: number = VALIDATION_CONSTRAINTS.MAX_BASE_SIZE
): number => {
  if (value === undefined || value === null) {
    throw new ResponsiveValidationError(`${paramName} is required`);
  }

  if (typeof value !== 'number' || isNaN(value)) {
    throw new ResponsiveValidationError(`${paramName} must be a valid number`);
  }

  if (!isFinite(value)) {
    throw new ResponsiveValidationError(`${paramName} must be a finite number`);
  }

  if (value < min) {
    throw new ResponsiveValidationError(`${paramName} must be at least ${min}`);
  }

  if (value > max) {
    throw new ResponsiveValidationError(`${paramName} must be at most ${max}`);
  }

  return value;
};

/**
 * Validates font size input
 * @param fontSize - Font size to validate
 * @param paramName - Parameter name for error messages
 * @returns Validated font size
 */
export const validateFontSize = (fontSize: number, paramName: string = 'fontSize'): number => {
  return validateNumber(
    fontSize,
    paramName,
    VALIDATION_CONSTRAINTS.MIN_BASE_FONT_SIZE,
    VALIDATION_CONSTRAINTS.MAX_BASE_FONT_SIZE
  );
};

/**
 * Validates screen dimensions
 * @param width - Screen width
 * @param height - Screen height
 * @throws ResponsiveValidationError if validation fails
 */
export const validateScreenDimensions = (width: number, height: number): void => {
  validateNumber(
    width,
    'width',
    VALIDATION_CONSTRAINTS.MIN_SCREEN_DIMENSION,
    VALIDATION_CONSTRAINTS.MAX_SCREEN_DIMENSION
  );
  
  validateNumber(
    height,
    'height',
    VALIDATION_CONSTRAINTS.MIN_SCREEN_DIMENSION,
    VALIDATION_CONSTRAINTS.MAX_SCREEN_DIMENSION
  );
};

/**
 * Validates safe area insets
 * @param insets - Safe area insets object
 * @throws ResponsiveValidationError if validation fails
 */
export const validateSafeAreaInsets = (insets: {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}): void => {
  if (!insets || typeof insets !== 'object') {
    throw new ResponsiveValidationError('Safe area insets must be an object');
  }

  const { top = 0, bottom = 0, left = 0, right = 0 } = insets;

  validateNumber(top, 'insets.top', 0, 1000);
  validateNumber(bottom, 'insets.bottom', 0, 1000);
  validateNumber(left, 'insets.left', 0, 1000);
  validateNumber(right, 'insets.right', 0, 1000);
};

/**
 * Validates grid column parameters
 * @param mobileColumns - Number of columns for mobile
 * @param tabletColumns - Number of columns for tablet
 * @throws ResponsiveValidationError if validation fails
 */
export const validateGridColumns = (
  mobileColumns?: number,
  tabletColumns?: number
): void => {
  if (mobileColumns !== undefined) {
    validateNumber(mobileColumns, 'mobileColumns', 1, 20);
  }
  
  if (tabletColumns !== undefined) {
    validateNumber(tabletColumns, 'tabletColumns', 1, 20);
  }
};

/**
 * Clamps a value between min and max bounds
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Safely calculates a percentage of a value
 * @param value - Base value
 * @param percentage - Percentage (0-1)
 * @returns Calculated percentage
 */
export const safePercentage = (value: number, percentage: number): number => {
  const validatedValue = validateNumber(value, 'value', 0, Infinity);
  const validatedPercentage = clamp(percentage, 0, 1);
  
  return validatedValue * validatedPercentage;
};
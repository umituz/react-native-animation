/**
 * Progress Utilities
 *
 * Helper functions for progress-related calculations
 */

import { clamp } from './CalculationUtils';

/**
 * Validates and clamps a progress value to ensure it's within valid range
 * @param value - Raw progress value
 * @returns Clamped progress value (0-100)
 */
export function normalizeProgress(value: number): number {
  return clamp(value, 0, 100);
}

/**
 * Formats a progress value as a percentage string
 * @param value - Progress value (0-100)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals = 0): string {
  const normalized = normalizeProgress(value);
  return `${normalized.toFixed(decimals)}%`;
}

/**
 * Calculates the percentage completed of a multi-step process
 * @param currentStep - Current step (1-indexed)
 * @param totalSteps - Total number of steps
 * @returns Percentage (0-100)
 */
export function calculateStepProgress(currentStep: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0;
  const normalizedStep = Math.max(0, Math.min(currentStep, totalSteps));
  return (normalizedStep / totalSteps) * 100;
}

/**
 * Checks if progress is complete
 * @param value - Progress value (0-100)
 * @returns True if progress is 100%
 */
export function isComplete(value: number): boolean {
  return normalizeProgress(value) >= 100;
}

/**
 * Checks if progress has started
 * @param value - Progress value (0-100)
 * @returns True if progress > 0%
 */
export function hasStarted(value: number): boolean {
  return normalizeProgress(value) > 0;
}

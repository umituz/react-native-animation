/**
 * Swipe Action Validator
 *
 * Validation functions for swipe action configurations.
 */

import type { SwipeActionConfig } from '../entities/SwipeAction';

/**
 * Validates swipe action configuration
 */
export function validateSwipeAction(action: SwipeActionConfig): boolean {
  // Must have onPress handler
  if (!action.onPress || typeof action.onPress !== 'function') {
    return false;
  }

  // Custom actions must have label, icon, and color
  if (action.type === 'custom') {
    return !!(action.label && action.icon && action.color);
  }

  return true;
}

/**
 * Validates multiple swipe actions
 */
export function validateSwipeActions(actions: SwipeActionConfig[]): boolean {
  return actions.every(validateSwipeAction);
}

/**
 * Gets validation error message for an action
 */
export function getValidationError(action: SwipeActionConfig): string | null {
  if (!action.onPress || typeof action.onPress !== 'function') {
    return 'Action must have an onPress handler';
  }

  if (action.type === 'custom') {
    if (!action.label) {
      return 'Custom action must have a label';
    }
    if (!action.icon) {
      return 'Custom action must have an icon';
    }
    if (!action.color) {
      return 'Custom action must have a color';
    }
  }

  return null;
}

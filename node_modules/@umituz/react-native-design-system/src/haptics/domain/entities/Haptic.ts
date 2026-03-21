/**
 * Haptics Domain - Core Entities
 *
 * This file defines core types and interfaces for haptic feedback.
 * Handles vibration patterns and feedback types using expo-haptics.
 *
 * @domain haptics
 * @layer domain/entities
 */

/**
 * Impact feedback style (compatible with expo-haptics)
 */
export type ImpactStyle = 'Light' | 'Medium' | 'Heavy' | 'Rigid' | 'Soft';

/**
 * Notification feedback type (compatible with expo-haptics)
 */
export type NotificationType = 'Success' | 'Warning' | 'Error';

/**
 * Haptic patterns for common interactions
 */
export type HapticPattern =
  | 'success'
  | 'warning'
  | 'error'
  | 'selection';

/**
 * Haptic constants
 */
export const HAPTIC_CONSTANTS = {
  DEFAULT_IMPACT: 'Light' as ImpactStyle,
  BUTTON_IMPACT: 'Light' as ImpactStyle,
  DELETE_IMPACT: 'Medium' as ImpactStyle,
  ERROR_IMPACT: 'Heavy' as ImpactStyle,
} as const;

/**
 * Type guards for runtime type safety
 */

/**
 * Check if value is a valid ImpactStyle
 */
export function isImpactStyle(value: unknown): value is ImpactStyle {
  return typeof value === 'string' &&
         ['Light', 'Medium', 'Heavy', 'Rigid', 'Soft'].includes(value);
}

/**
 * Check if value is a valid NotificationType
 */
export function isNotificationType(value: unknown): value is NotificationType {
  return typeof value === 'string' &&
         ['Success', 'Warning', 'Error'].includes(value);
}

/**
 * Check if value is a valid HapticPattern
 */
export function isHapticPattern(value: unknown): value is HapticPattern {
  return typeof value === 'string' &&
         ['success', 'warning', 'error', 'selection'].includes(value);
}

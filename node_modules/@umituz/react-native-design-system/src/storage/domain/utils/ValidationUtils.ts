/**
 * Runtime validation utilities for storage operations
 */

/**
 * Check if parsed value is a valid object (not null, not array)
 */
export function isValidObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Check if parsed value is a valid array
 */
export function isValidArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Validate cached value structure
 */
export function isValidCachedValue(value: unknown): boolean {
  if (!isValidObject(value)) return false;

  // Check for required properties
  return 'value' in value && 'timestamp' in value;
}

/**
 * Validate calendar event structure
 */
export function isValidCalendarEvent(value: unknown): boolean {
  if (!isValidObject(value)) return false;

  const event = value as Record<string, unknown>;

  // Check for required properties
  return (
    typeof event.id === 'string' &&
    typeof event.title === 'string' &&
    typeof event.startDate === 'string' &&
    typeof event.endDate === 'string'
  );
}

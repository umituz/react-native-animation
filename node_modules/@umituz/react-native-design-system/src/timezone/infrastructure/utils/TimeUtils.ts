/**
 * Time Utilities
 * Utility functions for time formatting and conversion
 */

/**
 * Format hours and minutes as "HH:MM" string
 *
 * @example
 * formatTimeComponent(14, 30) // Returns "14:30"
 * formatTimeComponent(9, 5) // Returns "09:05"
 *
 * @param hours - Hours (0-23)
 * @param minutes - Minutes (0-59)
 * @returns Formatted time string
 */
export function formatTimeComponent(hours: number, minutes: number): string {
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Parse a time string "HH:MM" to hours and minutes
 *
 * @example
 * parseTimeComponent("14:30") // Returns { hours: 14, minutes: 30 }
 * parseTimeComponent("09:05") // Returns { hours: 9, minutes: 5 }
 *
 * @param timeStr - Time string in "HH:MM" format
 * @returns Object with hours and minutes
 */
export function parseTimeComponent(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
}

/**
 * Convert milliseconds to seconds
 *
 * @example
 * millisecondsToSeconds(5000) // Returns 5
 *
 * @param ms - Milliseconds
 * @returns Seconds
 */
export function millisecondsToSeconds(ms: number): number {
  return Math.floor(ms / 1000);
}

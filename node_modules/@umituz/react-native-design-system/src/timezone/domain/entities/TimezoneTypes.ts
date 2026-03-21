/**
 * Timezone Types
 */

/**
 * Timezone information from device
 */
export interface TimezoneInfo {
  /** IANA timezone identifier (e.g., "America/New_York", "Europe/Istanbul") */
  timezone: string;

  /** UTC offset in minutes (negative for west, positive for east) */
  offset: number;

  /** Human-readable timezone display name */
  displayName: string;
}

/**
 * Calendar day representation
 * Generic structure - can be extended by apps for app-specific data
 */
export interface TimezoneCalendarDay {
  /** Date object for this day */
  date: Date;

  /** Day of month (1-31) */
  day: number;

  /** Day of week (0 = Sunday, 6 = Saturday) */
  dayOfWeek: number;

  /** Month (0-11, 0 = January) */
  month: number;

  /** Year (e.g., 2024) */
  year: number;

  /** Whether this day is in the current month */
  isCurrentMonth: boolean;

  /** Whether this day is today */
  isToday: boolean;

  /** ISO date string (YYYY-MM-DD) */
  isoDate: string;
}

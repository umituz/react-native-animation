/**
 * Date Utilities
 *
 * Pure functions for date operations and formatting.
 * No side effects, timezone-aware operations.
 *
 * SOLID: Single Responsibility - Only date operations
 * DRY: Reusable date utility functions
 * KISS: Simple, focused functions
 */

export class DateUtilities {
  /**
   * Format date to string (YYYY-MM-DD)
   */
  static formatDateToString(date: Date): string {
    const parts = date.toISOString().split('T');
    return parts[0] ?? '';
  }

  /**
   * Check if two dates are the same day
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return this.formatDateToString(date1) === this.formatDateToString(date2);
  }

  /**
   * Add days to a date
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Check if date is today
   */
  static isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  /**
   * Get current timezone
   */
  static getCurrentTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /**
   * Get start of month
   */
  static getStartOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  /**
   * Get end of month
   */
  static getEndOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  /**
   * Get number of days in month
   */
  static getDaysInMonth(date: Date): number {
    return this.getEndOfMonth(date).getDate();
  }

  /**
   * Get start of week (Sunday)
   */
  static getStartOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day;
    return new Date(result.setDate(diff));
  }

  /**
   * Get end of week (Saturday)
   */
  static getEndOfWeek(date: Date): Date {
    const result = this.getStartOfWeek(date);
    result.setDate(result.getDate() + 6);
    return result;
  }

  /**
   * Parse date from string (YYYY-MM-DD)
   */
  static parseDate(dateString: string): Date {
    const parts = dateString.split('-').map(Number);
    const year = parts[0] ?? 0;
    const month = parts[1] ?? 1;
    const day = parts[2] ?? 1;

    const date = new Date(year, month - 1, day);

    // Validate the date is not invalid
    if (isNaN(date.getTime())) {
      if (__DEV__) {
        console.warn(`[DateUtilities] Invalid date string: ${dateString}`);
      }
      throw new Error(`Invalid date string: ${dateString}`);
    }

    return date;
  }

  /**
   * Format time to string (HH:MM)
   */
  static formatTimeToString(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  /**
   * Check if date is in the past
   */
  static isPast(date: Date): boolean {
    return date < new Date();
  }

  /**
   * Check if date is in the future
   */
  static isFuture(date: Date): boolean {
    return date > new Date();
  }
}











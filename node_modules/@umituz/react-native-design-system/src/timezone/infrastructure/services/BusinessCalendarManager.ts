/**
 * BusinessCalendarManager
 *
 * Business date utilities for work days and month boundaries
 * Handles weekend detection and business day calculations
 */

export class BusinessCalendarManager {
  /**
   * Check if date is on weekend (Saturday or Sunday)
   */
  isWeekend(date: Date | string | number): boolean {
    const d = this.parse(date);
    const day = d.getDay();
    return day === 0 || day === 6;
  }

  /**
   * Add business days (skips weekends)
   * Positive days adds, negative days subtracts
   */
  addBusinessDays(date: Date | string | number, days: number): Date {
    const result = this.parse(date);
    const direction = days >= 0 ? 1 : -1;
    let remainingDays = Math.abs(days);

    while (remainingDays > 0) {
      result.setDate(result.getDate() + direction);

      if (!this.isWeekend(result)) {
        remainingDays--;
      }
    }

    return result;
  }

  /**
   * Check if date is first day of month
   */
  isFirstDayOfMonth(date: Date | string | number): boolean {
    const d = this.parse(date);
    return d.getDate() === 1;
  }

  /**
   * Check if date is last day of month
   */
  isLastDayOfMonth(date: Date | string | number): boolean {
    const d = this.parse(date);
    const tomorrow = new Date(d);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.getMonth() !== d.getMonth();
  }

  /**
   * Get number of days in month
   */
  getDaysInMonth(date: Date | string | number): number {
    const d = this.parse(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  private parse(date: Date | string | number): Date {
    if (date instanceof Date) return new Date(date.getTime());
    return new Date(date);
  }
}

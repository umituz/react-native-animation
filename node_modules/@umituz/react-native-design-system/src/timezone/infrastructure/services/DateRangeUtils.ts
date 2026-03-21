/**
 * DateRangeUtils
 *
 * Date range utilities for working with date intervals
 * Handles range generation, overlap detection, and clamping
 */
export class DateRangeUtils {
  /**
   * Get array of dates in range (inclusive)
   */
  getDateRange(start: Date | string | number, end: Date | string | number): Date[] {
    const startDate = this.parse(start);
    const endDate = this.parse(end);
    const dates: Date[] = [];

    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  /**
   * Check if two date ranges overlap
   */
  areRangesOverlapping(
    start1: Date | string | number,
    end1: Date | string | number,
    start2: Date | string | number,
    end2: Date | string | number,
  ): boolean {
    const s1 = this.parse(start1).getTime();
    const e1 = this.parse(end1).getTime();
    const s2 = this.parse(start2).getTime();
    const e2 = this.parse(end2).getTime();

    return s1 <= e2 && e1 >= s2;
  }

  /**
   * Clamp date to range
   */
  clampDate(
    date: Date | string | number,
    min: Date | string | number,
    max: Date | string | number,
  ): Date {
    const d = this.parse(date).getTime();
    const minTime = this.parse(min).getTime();
    const maxTime = this.parse(max).getTime();

    if (d < minTime) return this.parse(min);
    if (d > maxTime) return this.parse(max);
    return this.parse(date);
  }

  private parse(date: Date | string | number): Date {
    if (date instanceof Date) return new Date(date.getTime());
    return new Date(date);
  }
}

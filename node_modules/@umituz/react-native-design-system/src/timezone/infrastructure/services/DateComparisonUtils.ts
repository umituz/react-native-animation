/**
 * DateComparisonUtils
 *
 * Precise date comparison utilities and relative time formatting
 * Handles hour/minute precision comparisons and "from now" formatting
 */
export class DateComparisonUtils {
  /**
   * Check if two dates are same hour
   */
  areSameHour(date1: Date | string | number, date2: Date | string | number): boolean {
    const d1 = this.parse(date1);
    const d2 = this.parse(date2);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate() &&
      d1.getHours() === d2.getHours()
    );
  }

  /**
   * Check if two dates are same minute
   */
  areSameMinute(date1: Date | string | number, date2: Date | string | number): boolean {
    const d1 = this.parse(date1);
    const d2 = this.parse(date2);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate() &&
      d1.getHours() === d2.getHours() &&
      d1.getMinutes() === d2.getMinutes()
    );
  }

  /**
   * Get middle of day (12:00:00)
   */
  getMiddleOfDay(date: Date | string | number): Date {
    const d = this.parse(date);
    d.setHours(12, 0, 0, 0);
    return d;
  }

  /**
   * Get relative time from now ("5 minutes ago", "in 2 hours")
   */
  fromNow(date: Date | string | number, locale: string): string {
    const d = this.parse(date);
    const now = new Date();
    const diffInMs = d.getTime() - now.getTime();
    const diffInSeconds = Math.abs(diffInMs) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (diffInSeconds < 60) {
      return rtf.format(Math.round(diffInMs / 1000), 'second');
    }

    if (diffInMinutes < 60) {
      return rtf.format(Math.round(diffInMs / (1000 * 60)), 'minute');
    }

    if (diffInHours < 24) {
      return rtf.format(Math.round(diffInMs / (1000 * 60 * 60)), 'hour');
    }

    if (diffInDays < 30) {
      return rtf.format(Math.round(diffInMs / (1000 * 60 * 60 * 24)), 'day');
    }

    if (diffInDays < 365) {
      return rtf.format(Math.round(diffInDays / 30), 'month');
    }

    return rtf.format(Math.round(diffInDays / 365), 'year');
  }

  private parse(date: Date | string | number): Date {
    if (date instanceof Date) return new Date(date.getTime());
    return new Date(date);
  }
}

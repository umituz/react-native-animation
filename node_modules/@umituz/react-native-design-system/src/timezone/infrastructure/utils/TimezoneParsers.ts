/**
 * Timezone Parsers Utility
 *
 * Shared parsing functions for timezone services.
 * Extracted from duplicate methods across DateFormatter, CalendarManager,
 * BusinessCalendarManager, DateRangeUtils, and DateComparisonUtils.
 */

/**
 * Parse date from various input types
 * Ensures a Date object is returned from Date, string, or number input
 */
export function parseDate(date: Date | string | number): Date {
    if (date instanceof Date) return new Date(date.getTime());
    return new Date(date);
}

/**
 * Parse timezone offset string to number
 * @param offset - Offset string (e.g., "+05:30", "-08:00")
 * @returns Offset in minutes
 */
export function parseTimezoneOffset(offset: string): number {
    const sign = offset[0] === '-' ? -1 : 1;
    const [hours, minutes] = offset.slice(1).split(':').map(Number);
    return sign * (hours * 60 + (minutes || 0));
}

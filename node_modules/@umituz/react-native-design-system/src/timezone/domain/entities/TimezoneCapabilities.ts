import type { TimezoneInfo, TimezoneCalendarDay } from './TimezoneTypes';

/**
 * Core timezone detection and information checks
 */
export interface ITimezoneCore {
  /** Get current device timezone (IANA identifier) */
  getCurrentTimezone(): string;

  /** Get timezone offset in minutes */
  getTimezoneOffset(): number;

  /** Get complete timezone information */
  getTimezoneInfo(): TimezoneInfo;

  /** Get current date as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ) */
  getCurrentISOString(): string;

  /** Get current date object */
  getNow(): Date;

  /** Get list of common timezones for selection */
  getTimezones(): TimezoneInfo[];

  /** Get timezone offset for specific timezone in minutes */
  getTimezoneOffsetFor(timezone: string, date?: Date | string | number): number;
}

/**
 * Date and time formatting capabilities
 */
export interface ITimezoneFormatting {
  /** Format date with locale support */
  formatDate(
    date: Date | string | number,
    locale?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string;

  /** Format time with locale support */
  formatTime(
    date: Date | string | number,
    locale?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string;

  /** Format date to ISO string (YYYY-MM-DD) */
  formatDateToString(date: Date | string | number): string;

  /** Format to display date string (DD.MM.YYYY) */
  formatToDisplayDate(date: Date | string | number): string;

  /** Format to display date time string (DD.MM.YYYY HH:mm) */
  formatToDisplayDateTime(date: Date | string | number): string;

  /** Format date to ISO datetime string (YYYY-MM-DDTHH:mm:ss.sssZ) */
  formatToISOString(date: Date | string | number): string;

  /** Format duration in milliseconds to human readable string */
  formatDuration(milliseconds: number): string;

  /** Format time as minutes:seconds (e.g., "3:45", "12:05") */
  formatTimeShort(seconds: number): string;

  /** Format date with relative time labels (Today, Yesterday, X days ago, X weeks ago) */
  formatRelativeDate(
    date: Date | string | number,
    locale: string,
    translations?: {
      today?: string;
      yesterday?: string;
      daysAgo?: string;
      weeksAgo?: string;
    }
  ): string;

  /** Format date in short format (Jan 1, 2024) */
  formatShortDate(date: Date | string | number, locale: string): string;

  /** Get relative time from now ("5 minutes ago", "in 2 hours") */
  fromNow(date: Date | string | number, locale?: string): string;
}

/**
 * Date manipulation and calculation capabilities
 */
export interface ITimezoneManipulation {
  /** Parse input to Date object */
  parse(date: Date | string | number): Date;

  /** Add days to a date */
  addDays(date: Date | string | number, days: number): Date;

  /** Get start of day (00:00:00) */
  startOfDay(date: Date | string | number): Date;

  /** Get end of day (23:59:59.999) */
  endOfDay(date: Date | string | number): Date;

  /** Get middle of day (12:00:00) */
  getMiddleOfDay(date: Date | string | number): Date;

  /** Set specific time of day (hours and minutes) */
  setTimeOfDay(date: Date | string | number, hours: number, minutes: number): Date;

  /** Convert date from one timezone to another */
  convertTimezone(
    date: Date | string | number,
    fromTimezone: string,
    toTimezone: string,
  ): Date;

  /** Add business days (skip weekends) */
  addBusinessDays(date: Date | string | number, days: number): Date;

  /** Clamp date to range */
  clampDate(
    date: Date | string | number,
    min: Date | string | number,
    max: Date | string | number,
  ): Date;
}

/**
 * Date checking and comparison capabilities
 */
export interface ITimezoneComparison {
  /** Check if date is today */
  isToday(date: Date | string | number): boolean;

  /** Check if two dates are the same day */
  isSameDay(date1: Date | string | number, date2: Date | string | number): boolean;

  /** Check if date is in the future */
  isFuture(date: Date | string | number): boolean;

  /** Check if date is in the past */
  isPast(date: Date | string | number): boolean;

  /** Check if date is valid */
  isValid(date: Date | string | number): boolean;

  /** Check if date is between two dates (inclusive) */
  isBetween(
    date: Date | string | number,
    start: Date | string | number,
    end: Date | string | number,
  ): boolean;

  /** Check if date is on weekend */
  isWeekend(date: Date | string | number): boolean;

  /** Check if date is first day of month */
  isFirstDayOfMonth(date: Date | string | number): boolean;

  /** Check if date is last day of month */
  isLastDayOfMonth(date: Date | string | number): boolean;

  /** Check if two dates are same hour */
  areSameHour(date1: Date | string | number, date2: Date | string | number): boolean;

  /** Check if two dates are same minute */
  areSameMinute(date1: Date | string | number, date2: Date | string | number): boolean;

  /** Check if two date ranges overlap */
  areRangesOverlapping(
    start1: Date | string | number,
    end1: Date | string | number,
    start2: Date | string | number,
    end2: Date | string | number,
  ): boolean;
}

/**
 * Advanced calendar and range capabilities
 */
export interface ITimezoneCalendar {
  /** Get calendar days for a month */
  getCalendarDays(year: number, month: number): TimezoneCalendarDay[];

  /** Get days until a future date (returns 0 if past) */
  getDaysUntil(date: Date | string | number): number;

  /** Get difference in days between two dates */
  getDifferenceInDays(date1: Date | string | number, date2: Date | string | number): number;

  /** Calculate age from birth date */
  getAge(birthDate: Date | string | number): number;

  /** Get earliest date from array */
  min(dates: Array<Date | string | number>): Date;

  /** Get latest date from array */
  max(dates: Array<Date | string | number>): Date;

  /** Get ISO week number (1-53) */
  getWeek(date: Date | string | number): number;

  /** Get quarter (1-4) */
  getQuarter(date: Date | string | number): number;

  /** Get number of days in month */
  getDaysInMonth(date: Date | string | number): number;

  /** Get array of dates in range */
  getDateRange(
    start: Date | string | number,
    end: Date | string | number,
  ): Date[];
}

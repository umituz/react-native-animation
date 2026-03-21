import { useMemo } from 'react';
import { timezoneService } from '../../infrastructure/services/TimezoneService';
import type { TimezoneInfo, TimezoneCalendarDay } from '../../domain/entities/Timezone';

export interface UseTimezoneReturn {
  timezone: string;
  timezoneInfo: TimezoneInfo;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  getCalendarDays(year: number, month: number): TimezoneCalendarDay[];
  isToday: (date: Date) => boolean;
  isSameDay: (date1: Date, date2: Date) => boolean;
  addDays: (date: Date, days: number) => Date;
  startOfDay: (date: Date) => Date;
  endOfDay: (date: Date) => Date;
  formatDateToString: (date: Date) => string;
  getCurrentISOString: () => string;
  formatToISOString: (date: Date) => string;
  formatRelativeTime: (date: Date) => string;
  formatDateTime: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatTimeShort: (seconds: number) => string;
  formatRelativeDate: (
    date: Date,
    translations?: {
      today?: string;
      yesterday?: string;
      daysAgo?: string;
      weeksAgo?: string;
    }
  ) => string;
  formatShortDate: (date: Date) => string;
  getTimezones: () => TimezoneInfo[];
  isValid: (date: Date) => boolean;
  getAge: (birthDate: Date) => number;
  isBetween: (date: Date, start: Date, end: Date) => boolean;
  min: (dates: Date[]) => Date;
  max: (dates: Date[]) => Date;
  getWeek: (date: Date) => number;
  getQuarter: (date: Date) => number;
  getTimezoneOffsetFor: (timezone: string, date?: Date) => number;
  convertTimezone: (date: Date, fromTimezone: string, toTimezone: string) => Date;
  formatDuration: (milliseconds: number) => string;
  isWeekend: (date: Date) => boolean;
  addBusinessDays: (date: Date, days: number) => Date;
  isFirstDayOfMonth: (date: Date) => boolean;
  isLastDayOfMonth: (date: Date) => boolean;
  getDaysInMonth: (date: Date) => number;
  getDateRange: (start: Date, end: Date) => Date[];
  areRangesOverlapping: (start1: Date, end1: Date, start2: Date, end2: Date) => boolean;
  clampDate: (date: Date, min: Date, max: Date) => Date;
  areSameHour: (date1: Date, date2: Date) => boolean;
  areSameMinute: (date1: Date, date2: Date) => boolean;
  getMiddleOfDay: (date: Date) => Date;
  fromNow: (date: Date) => string;
}

export interface UseTimezoneOptions {
  locale?: string;
}

export const useTimezone = (options?: UseTimezoneOptions): UseTimezoneReturn => {
  const locale = options?.locale ?? 'en';
  const timezoneInfo = useMemo(() => timezoneService.getTimezoneInfo(), []);

  // timezoneService is a singleton with pure functions - no need for individual useCallbacks.
  // Only locale-dependent functions need to be memoized when locale changes.
  return useMemo(
    () => ({
      timezone: timezoneInfo.timezone || '',
      timezoneInfo,
      // Locale-dependent formatters
      formatDate: (date: Date, opts?: Intl.DateTimeFormatOptions) =>
        timezoneService.formatDate(date, locale, opts),
      formatTime: (date: Date, opts?: Intl.DateTimeFormatOptions) =>
        timezoneService.formatTime(date, locale, opts),
      formatDateTime: (date: Date, opts?: Intl.DateTimeFormatOptions) =>
        timezoneService.formatDateTime(date, locale, opts),
      formatRelativeTime: (date: Date) =>
        timezoneService.formatRelativeTime(date, locale),
      formatShortDate: (date: Date) =>
        timezoneService.formatShortDate(date, locale),
      formatRelativeDate: (date: Date, translations?: {
        today?: string;
        yesterday?: string;
        daysAgo?: string;
        weeksAgo?: string;
      }) =>
        timezoneService.formatRelativeDate(date, locale, translations),
      fromNow: (date: Date) =>
        timezoneService.fromNow(date, locale),
      // Locale-independent delegates
      formatTimeShort: (seconds: number) => timezoneService.formatTimeShort(seconds),
      getCalendarDays: (year: number, month: number) => timezoneService.getCalendarDays(year, month),
      isToday: (date: Date) => timezoneService.isToday(date),
      isSameDay: (date1: Date, date2: Date) => timezoneService.isSameDay(date1, date2),
      addDays: (date: Date, days: number) => timezoneService.addDays(date, days),
      startOfDay: (date: Date) => timezoneService.startOfDay(date),
      endOfDay: (date: Date) => timezoneService.endOfDay(date),
      formatDateToString: (date: Date) => timezoneService.formatDateToString(date),
      getCurrentISOString: () => timezoneService.getCurrentISOString(),
      formatToISOString: (date: Date) => timezoneService.formatToISOString(date),
      getTimezones: () => timezoneService.getTimezones(),
      isValid: (date: Date) => timezoneService.isValid(date),
      getAge: (birthDate: Date) => timezoneService.getAge(birthDate),
      isBetween: (date: Date, start: Date, end: Date) => timezoneService.isBetween(date, start, end),
      min: (dates: Date[]) => timezoneService.min(dates),
      max: (dates: Date[]) => timezoneService.max(dates),
      getWeek: (date: Date) => timezoneService.getWeek(date),
      getQuarter: (date: Date) => timezoneService.getQuarter(date),
      getTimezoneOffsetFor: (tz: string, date?: Date) => timezoneService.getTimezoneOffsetFor(tz, date),
      convertTimezone: (date: Date, from: string, to: string) => timezoneService.convertTimezone(date, from, to),
      formatDuration: (ms: number) => timezoneService.formatDuration(ms),
      isWeekend: (date: Date) => timezoneService.isWeekend(date),
      addBusinessDays: (date: Date, days: number) => timezoneService.addBusinessDays(date, days),
      isFirstDayOfMonth: (date: Date) => timezoneService.isFirstDayOfMonth(date),
      isLastDayOfMonth: (date: Date) => timezoneService.isLastDayOfMonth(date),
      getDaysInMonth: (date: Date) => timezoneService.getDaysInMonth(date),
      getDateRange: (start: Date, end: Date) => timezoneService.getDateRange(start, end),
      areRangesOverlapping: (s1: Date, e1: Date, s2: Date, e2: Date) =>
        timezoneService.areRangesOverlapping(s1, e1, s2, e2),
      clampDate: (date: Date, mn: Date, mx: Date) => timezoneService.clampDate(date, mn, mx),
      areSameHour: (d1: Date, d2: Date) => timezoneService.areSameHour(d1, d2),
      areSameMinute: (d1: Date, d2: Date) => timezoneService.areSameMinute(d1, d2),
      getMiddleOfDay: (date: Date) => timezoneService.getMiddleOfDay(date),
    }),
    [locale, timezoneInfo],
  );
};

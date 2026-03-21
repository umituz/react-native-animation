/**
 * Timezone Service Implementation
 * Infrastructure Layer - Facade for all timezone operations
 */

import {
  ITimezoneService,
  TimezoneInfo,
  TimezoneCalendarDay,
} from '../../domain/entities/Timezone';
import { TimezoneProvider } from './TimezoneProvider';
import { CalendarManager } from './CalendarManager';
import { BusinessCalendarManager } from './BusinessCalendarManager';
import { DateRangeUtils } from './DateRangeUtils';
import { DateComparisonUtils } from './DateComparisonUtils';
import { DateFormatter } from './DateFormatter';

export class TimezoneService implements ITimezoneService {
  private provider = new TimezoneProvider();
  private calendar = new CalendarManager();
  private businessCalendar = new BusinessCalendarManager();
  private rangeUtils = new DateRangeUtils();
  private comparisonUtils = new DateComparisonUtils();
  private formatter = new DateFormatter();

  getCurrentTimezone(): string { return this.provider.getCurrentTimezone(); }
  getTimezoneOffset(): number { return this.provider.getTimezoneOffset(); }
  getTimezoneInfo(): TimezoneInfo { return this.provider.getTimezoneInfo(); }
  getTimezones(): TimezoneInfo[] { return this.provider.getTimezones(); }

  formatDate(date: Date | string | number, locale: string, options?: Intl.DateTimeFormatOptions): string {
    return this.formatter.formatDate(date, locale, options);
  }

  formatTime(date: Date | string | number, locale: string, options?: Intl.DateTimeFormatOptions): string {
    return this.formatter.formatTime(date, locale, options);
  }

  formatDateTime(date: Date | string | number, locale: string, options?: Intl.DateTimeFormatOptions): string {
    return this.formatter.formatDateTime(date, locale, options);
  }

  getCalendarDays(year: number, month: number): TimezoneCalendarDay[] {
    return this.calendar.getCalendarDays(year, month, (d) => this.formatter.formatDateToString(d));
  }

  isToday(date: Date | string | number): boolean { return this.calendar.isToday(date); }
  isSameDay(date1: Date | string | number, date2: Date | string | number): boolean {
    return this.calendar.isSameDay(date1, date2);
  }

  addDays(date: Date | string | number, days: number): Date { return this.calendar.addDays(date, days); }
  startOfDay(date: Date | string | number): Date { return this.calendar.startOfDay(date); }
  endOfDay(date: Date | string | number): Date { return this.calendar.endOfDay(date); }
  setTimeOfDay(date: Date | string | number, hours: number, minutes: number): Date { return this.calendar.setTimeOfDay(date, hours, minutes); }

  formatDateToString(date: Date | string | number): string { return this.formatter.formatDateToString(date); }
  getCurrentISOString(): string { return this.formatter.formatToISOString(new Date()); }
  formatToISOString(date: Date | string | number): string { return this.formatter.formatToISOString(date); }
  formatToDisplayDate(date: Date | string | number): string { return this.formatter.formatToDisplayDate(date); }
  getNow(): Date { return new Date(); }

  parse(date: Date | string | number): Date { return this.calendar.parse(date); }

  formatToDisplayDateTime(date: Date | string | number): string {
    return this.formatter.formatToDisplayDateTime(date);
  }

  formatRelativeTime(date: Date | string | number, locale: string): string {
    return this.formatter.formatRelativeTime(date, locale);
  }

  isFuture(date: Date | string | number): boolean { return this.calendar.isFuture(date); }
  isPast(date: Date | string | number): boolean { return this.calendar.isPast(date); }
  getDaysUntil(date: Date | string | number): number { return this.calendar.getDaysUntil(date); }

  getDifferenceInDays(date1: Date | string | number, date2: Date | string | number): number {
    return this.calendar.getDifferenceInDays(date1, date2);
  }

  isValid(date: Date | string | number): boolean { return this.calendar.isValid(date); }
  getAge(birthDate: Date | string | number): number { return this.calendar.getAge(birthDate); }

  isBetween(date: Date | string | number, start: Date | string | number, end: Date | string | number): boolean {
    return this.calendar.isBetween(date, start, end);
  }

  min(dates: Array<Date | string | number>): Date { return this.calendar.min(dates); }
  max(dates: Array<Date | string | number>): Date { return this.calendar.max(dates); }
  getWeek(date: Date | string | number): number { return this.calendar.getWeek(date); }
  getQuarter(date: Date | string | number): number { return this.calendar.getQuarter(date); }

  getTimezoneOffsetFor(timezone: string, date?: Date | string | number): number {
    return this.provider.getTimezoneOffsetFor(timezone, date);
  }

  convertTimezone(date: Date | string | number, fromTimezone: string, toTimezone: string): Date {
    return this.provider.convertTimezone(date, fromTimezone, toTimezone);
  }

  formatDuration(milliseconds: number): string { return this.formatter.formatDuration(milliseconds); }

  formatTimeShort(seconds: number): string { return this.formatter.formatTimeShort(seconds); }

  formatRelativeDate(
    date: Date | string | number,
    locale: string,
    translations?: {
      today?: string;
      yesterday?: string;
      daysAgo?: string;
      weeksAgo?: string;
    }
  ): string {
    return this.formatter.formatRelativeDate(date, locale, translations);
  }

  formatShortDate(date: Date | string | number, locale: string): string {
    return this.formatter.formatShortDate(date, locale);
  }

  isWeekend(date: Date | string | number): boolean { return this.businessCalendar.isWeekend(date); }

  addBusinessDays(date: Date | string | number, days: number): Date {
    return this.businessCalendar.addBusinessDays(date, days);
  }

  isFirstDayOfMonth(date: Date | string | number): boolean {
    return this.businessCalendar.isFirstDayOfMonth(date);
  }

  isLastDayOfMonth(date: Date | string | number): boolean {
    return this.businessCalendar.isLastDayOfMonth(date);
  }

  getDaysInMonth(date: Date | string | number): number { return this.businessCalendar.getDaysInMonth(date); }

  getDateRange(start: Date | string | number, end: Date | string | number): Date[] {
    return this.rangeUtils.getDateRange(start, end);
  }

  areRangesOverlapping(
    start1: Date | string | number,
    end1: Date | string | number,
    start2: Date | string | number,
    end2: Date | string | number,
  ): boolean { return this.rangeUtils.areRangesOverlapping(start1, end1, start2, end2); }

  clampDate(date: Date | string | number, min: Date | string | number, max: Date | string | number): Date {
    return this.rangeUtils.clampDate(date, min, max);
  }

  areSameHour(date1: Date | string | number, date2: Date | string | number): boolean {
    return this.comparisonUtils.areSameHour(date1, date2);
  }

  areSameMinute(date1: Date | string | number, date2: Date | string | number): boolean {
    return this.comparisonUtils.areSameMinute(date1, date2);
  }

  getMiddleOfDay(date: Date | string | number): Date { return this.comparisonUtils.getMiddleOfDay(date); }

  fromNow(date: Date | string | number, locale?: string): string {
    return this.comparisonUtils.fromNow(date, locale || 'en');
  }
}

export const timezoneService = new TimezoneService();

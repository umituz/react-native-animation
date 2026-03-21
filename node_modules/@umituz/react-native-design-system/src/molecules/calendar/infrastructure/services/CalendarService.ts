/**
 * Calendar Service
 *
 * Facade for calendar operations using composition.
 * Delegates to specialized services for specific operations.
 *
 * SOLID: Facade pattern - Single entry point, delegates to specialists
 * DRY: Avoids code duplication by composing smaller services
 * KISS: Simple interface, complex operations delegated
 */

import type { CalendarDay, CalendarWeek } from '../../domain/entities/CalendarDay.entity';
import type { CalendarEvent } from '../../domain/entities/CalendarEvent.entity';
import { CalendarGeneration } from './CalendarGeneration';
import { DateUtilities } from '../utils/DateUtilities';

/**
 * Calendar Service Implementation
 *
 * Facade that delegates to specialized services.
 * Follows SOLID principles with composition over inheritance.
 */
export class CalendarService {
  // Cache for weekday names to prevent recalculation
  private static weekdayNamesCache = new Map<string, string[]>();

  /**
   * Generate calendar days for a specific month
   */
  static getMonthDays(
    year: number,
    month: number,
    events: CalendarEvent[] = []
  ): CalendarDay[] {
    return CalendarGeneration.generateMonthDays(year, month, events);
  }

  /**
   * Generate calendar week
   */
  static getWeek(date: Date, events: CalendarEvent[] = []): CalendarWeek {
    const startDate = DateUtilities.getStartOfWeek(date);
    const endDate = DateUtilities.getEndOfWeek(date);
    const days = CalendarGeneration.generateWeekDays(startDate, events);

    return {
      startDate,
      endDate,
      days
    };
  }

  /**
   * Navigate to previous month
   */
  static getPreviousMonth(currentDate: Date): Date {
    return CalendarGeneration.getPreviousMonth(currentDate);
  }

  /**
   * Navigate to next month
   */
  static getNextMonth(currentDate: Date): Date {
    return CalendarGeneration.getNextMonth(currentDate);
  }

  /**
   * Navigate to previous week
   */
  static getPreviousWeek(currentDate: Date): Date {
    return CalendarGeneration.getPreviousWeek(currentDate);
  }

  /**
   * Navigate to next week
   */
  static getNextWeek(currentDate: Date): Date {
    return CalendarGeneration.getNextWeek(currentDate);
  }

  /**
   * Get events for a specific date
   */
  static getEventsForDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
    return CalendarGeneration.getEventsForDate(date, events);
  }

  /**
   * Get events in date range
   */
  static getEventsInRange(
    startDate: Date,
    endDate: Date,
    events: CalendarEvent[]
  ): CalendarEvent[] {
    return CalendarGeneration.getEventsInRange(startDate, endDate, events);
  }

  /**
   * Get weekday names
   */
  static getWeekdayNames(locale: string = 'en-US'): string[] {
    const cacheKey = locale;

    // Return cached result if available
    if (this.weekdayNamesCache.has(cacheKey)) {
      return this.weekdayNamesCache.get(cacheKey)!;
    }

    // Calculate and cache
    const weekdays: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + i);
      weekdays.push(date.toLocaleDateString(locale, { weekday: 'short' }));
    }

    this.weekdayNamesCache.set(cacheKey, weekdays);
    return weekdays;
  }

  /**
   * Check if two dates are the same day
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return DateUtilities.isSameDay(date1, date2);
  }
}
/**
 * Calendar Generation Service
 *
 * Generates calendar grids and layouts.
 *
 * SOLID: Single Responsibility - Only calendar generation
 * DRY: Reusable calendar generation logic
 * KISS: Simple calendar grid creation
 */

import { DateUtilities } from '../utils/DateUtilities';
import type { CalendarDay } from '../../domain/entities/CalendarDay.entity';
import type { CalendarEvent } from '../../domain/entities/CalendarEvent.entity';

export class CalendarGeneration {
  /**
   * Generate calendar days for a specific month
   * Returns 42 days (6 weeks) including days from prev/next months
   */
  static generateMonthDays(
    year: number,
    month: number,
    events: CalendarEvent[] = []
  ): CalendarDay[] {
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);

    // Start from Sunday of the week containing the 1st
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const currentDate = DateUtilities.addDays(startDate, i);
      const dayEvents = this.getEventsForDate(currentDate, events);

      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: DateUtilities.isSameDay(currentDate, today),
        isSelected: false,
        events: dayEvents
      });
    }

    return days;
  }

  /**
   * Generate calendar days for a specific week
   */
  static generateWeekDays(
    startDate: Date,
    events: CalendarEvent[] = []
  ): CalendarDay[] {
    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = DateUtilities.addDays(startDate, i);
      const dayEvents = this.getEventsForDate(currentDate, events);

      days.push({
        date: currentDate,
        isCurrentMonth: true, // All days in week view are "current"
        isToday: DateUtilities.isSameDay(currentDate, today),
        isSelected: false,
        events: dayEvents
      });
    }

    return days;
  }

  /**
   * Get events for a specific date
   */
  static getEventsForDate(date: Date, allEvents: CalendarEvent[]): CalendarEvent[] {
    const dateStr = DateUtilities.formatDateToString(date);
    return allEvents.filter(event => event.date === dateStr);
  }

  /**
   * Get events in date range
   */
  static getEventsInRange(
    startDate: Date,
    endDate: Date,
    events: CalendarEvent[]
  ): CalendarEvent[] {
    const startStr = DateUtilities.formatDateToString(startDate);
    const endStr = DateUtilities.formatDateToString(endDate);

    return events.filter(event => event.date >= startStr && event.date <= endStr);
  }

  /**
   * Navigate to previous month
   */
  static getPreviousMonth(currentDate: Date): Date {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
  }

  /**
   * Navigate to next month
   */
  static getNextMonth(currentDate: Date): Date {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }

  /**
   * Navigate to previous week
   */
  static getPreviousWeek(currentDate: Date): Date {
    return DateUtilities.addDays(currentDate, -7);
  }

  /**
   * Navigate to next week
   */
  static getNextWeek(currentDate: Date): Date {
    return DateUtilities.addDays(currentDate, 7);
  }

  /**
   * Check if date is today
   */
  static isToday(date: Date): boolean {
    return DateUtilities.isToday(date);
  }

  /**
   * Check if two dates are the same day
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return DateUtilities.isSameDay(date1, date2);
  }

  /**
   * Format date for display
   */
  static formatDate(date: Date): string {
    return DateUtilities.formatDateToString(date);
  }

  /**
   * Get month name
   */
  static getMonthName(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long' });
  }

  /**
   * Get weekday name
   */
  static getWeekdayName(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  /**
   * Get short weekday name
   */
  static getShortWeekdayName(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
}

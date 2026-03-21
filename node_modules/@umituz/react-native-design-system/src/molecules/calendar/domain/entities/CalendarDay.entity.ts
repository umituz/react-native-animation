/**
 * CalendarDay Entity
 *
 * Represents a single day in a calendar view with its properties and associated events.
 *
 * Design Philosophy:
 * - Timezone-aware (uses timezone domain for date calculations)
 * - Event-agnostic (works with any CalendarEvent type)
 * - View-ready (contains all display state)
 * - Immutable (never mutate, create new instances)
 */

import type { CalendarEvent } from './CalendarEvent.entity';

export interface CalendarDay {
  /**
   * The date this calendar day represents
   */
  date: Date;

  /**
   * Whether this day belongs to the currently displayed month
   * Used to gray out days from prev/next months in calendar grid
   */
  isCurrentMonth: boolean;

  /**
   * Whether this day is today (timezone-aware via timezone domain)
   */
  isToday: boolean;

  /**
   * Whether this day is currently selected by the user
   */
  isSelected: boolean;

  /**
   * Events scheduled for this day
   * @default []
   */
  events: CalendarEvent[];

  /**
   * Whether this day is disabled/non-selectable
   * @example Past dates, dates outside valid range
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether this day is a weekend (Saturday or Sunday)
   * Useful for styling weekend days differently
   */
  isWeekend?: boolean;
}

/**
 * Calendar Month Configuration
 *
 * Represents a full month view with all necessary display information
 */
export interface CalendarMonth {
  /**
   * Year of the month
   */
  year: number;

  /**
   * Month (0-indexed: 0 = January, 11 = December)
   */
  month: number;

  /**
   * All days to display in the calendar grid (usually 42 days = 6 weeks)
   * Includes days from previous and next months to fill the grid
   */
  days: CalendarDay[];

  /**
   * First day of the month
   */
  firstDay: Date;

  /**
   * Last day of the month
   */
  lastDay: Date;

  /**
   * Total number of days in this month
   */
  daysInMonth: number;
}

/**
 * Week View Configuration
 *
 * Represents a week view with 7 days
 */
export interface CalendarWeek {
  /**
   * Start date of the week (usually Sunday)
   */
  startDate: Date;

  /**
   * End date of the week (usually Saturday)
   */
  endDate: Date;

  /**
   * All 7 days in the week
   */
  days: CalendarDay[];
}

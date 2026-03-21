/**
 * CalendarEvent Entity
 *
 * Generic calendar event that can represent:
 * - Workouts (fitness apps)
 * - Habits (habit tracking apps)
 * - Tasks (productivity apps)
 * - Appointments (scheduling apps)
 * - Any other time-based event
 *
 * Design Philosophy:
 * - Generic and reusable across all app types
 * - Extensible via metadata field
 * - Simple core properties
 * - App-specific data in metadata
 */

export interface CalendarEvent {
  /**
   * Unique identifier for the event
   */
  id: string;

  /**
   * Event title/name
   * @example "Morning Workout", "Team Meeting", "Water plants"
   */
  title: string;

  /**
   * Event date in YYYY-MM-DD format (timezone-aware via timezone domain)
   * @example "2024-10-30"
   */
  date: string;

  /**
   * Optional event time in HH:mm format
   * @example "09:30", "14:00"
   */
  time?: string;

  /**
   * Optional event color for visual distinction
   * Uses design token color names or hex values
   * @example "primary", "success", "#FF5733"
   */
  color?: string;

  /**
   * Whether the event has been completed/checked off
   * @default false
   */
  isCompleted?: boolean;

  /**
   * Optional duration in minutes
   * @example 30, 60, 90
   */
  duration?: number;

  /**
   * Optional event description/notes
   */
  description?: string;

  /**
   * Optional location for the event
   */
  location?: string;

  /**
   * Reminders/alarms (minutes before event)
   * @example [15, 30] → 15 mins and 30 mins before
   */
  reminders?: number[];

  /**
   * App-specific metadata
   * Use this for domain-specific properties
   * @example
   * // Workout app:
   * metadata: { workoutTemplateId: "abc123", exercises: [...] }
   *
   * // Habit app:
   * metadata: { habitId: "xyz789", streak: 5 }
   */
  metadata?: unknown;

  /**
   * Recurring event configuration
   */
  recurring?: {
    /**
     * Recurrence pattern
     */
    pattern: 'daily' | 'weekly' | 'monthly' | 'custom';

    /**
     * Interval for recurrence
     * @example pattern: 'weekly', interval: 2 → every 2 weeks
     */
    interval?: number;

    /**
     * Days of week for weekly recurrence (0 = Sunday, 6 = Saturday)
     * @example [1, 3, 5] → Monday, Wednesday, Friday
     */
    daysOfWeek?: number[];

    /**
     * End date for recurrence (YYYY-MM-DD)
     */
    endDate?: string;
  };

  /**
   * Creation timestamp
   */
  createdAt: Date;

  /**
   * Last update timestamp
   */
  updatedAt: Date;
}

/**
 * Request object for creating a new calendar event
 */
export interface CreateCalendarEventRequest {
  title: string;
  date: string;
  time?: string;
  color?: string;
  duration?: number;
  description?: string;
  location?: string;
  reminders?: number[];
  metadata?: unknown;
  recurring?: CalendarEvent['recurring'];
}

/**
 * Request object for updating an existing calendar event
 */
export interface UpdateCalendarEventRequest {
  id: string;
  title?: string;
  date?: string;
  time?: string;
  color?: string;
  isCompleted?: boolean;
  duration?: number;
  description?: string;
  location?: string;
  reminders?: number[];
  metadata?: unknown;
  recurring?: CalendarEvent['recurring'];
}

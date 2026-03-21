/**
 * ICalendarRepository Interface
 *
 * Port (interface) for calendar data access operations.
 * Implementations can use any storage mechanism (AsyncStorage, SQLite, etc.)
 *
 * Design Philosophy:
 * - Repository pattern (DDD)
 * - Storage-agnostic
 * - CRUD operations for calendar events
 * - Query methods for finding events
 */

import type {
  CalendarEvent,
  CreateCalendarEventRequest,
  UpdateCalendarEventRequest,
} from '../entities/CalendarEvent.entity';

export interface ICalendarRepository {
  /**
   * Get all calendar events
   * @returns Promise resolving to array of all events
   */
  getAllEvents(): Promise<CalendarEvent[]>;

  /**
   * Get a calendar event by ID
   * @param id - Event ID
   * @returns Promise resolving to event or null if not found
   */
  getEventById(id: string): Promise<CalendarEvent | null>;

  /**
   * Get events for a specific date
   * @param date - Date string in YYYY-MM-DD format
   * @returns Promise resolving to array of events for that date
   */
  getEventsByDate(date: string): Promise<CalendarEvent[]>;

  /**
   * Get events within a date range
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   * @returns Promise resolving to array of events in range
   */
  getEventsByDateRange(startDate: string, endDate: string): Promise<CalendarEvent[]>;

  /**
   * Get events for a specific month
   * @param year - Year (e.g., 2024)
   * @param month - Month (0-indexed: 0 = January, 11 = December)
   * @returns Promise resolving to array of events in that month
   */
  getEventsByMonth(year: number, month: number): Promise<CalendarEvent[]>;

  /**
   * Create a new calendar event
   * @param request - Event creation data
   * @returns Promise resolving to created event
   */
  createEvent(request: CreateCalendarEventRequest): Promise<CalendarEvent>;

  /**
   * Update an existing calendar event
   * @param request - Event update data (must include id)
   * @returns Promise resolving to updated event
   */
  updateEvent(request: UpdateCalendarEventRequest): Promise<CalendarEvent>;

  /**
   * Delete a calendar event
   * @param id - Event ID to delete
   * @returns Promise resolving to void
   */
  deleteEvent(id: string): Promise<void>;

  /**
   * Delete all events for a specific date
   * @param date - Date string in YYYY-MM-DD format
   * @returns Promise resolving to number of deleted events
   */
  deleteEventsByDate(date: string): Promise<number>;

  /**
   * Mark an event as completed
   * @param id - Event ID
   * @returns Promise resolving to updated event
   */
  completeEvent(id: string): Promise<CalendarEvent>;

  /**
   * Mark an event as incomplete
   * @param id - Event ID
   * @returns Promise resolving to updated event
   */
  uncompleteEvent(id: string): Promise<CalendarEvent>;

  /**
   * Search events by title
   * @param query - Search query string
   * @returns Promise resolving to array of matching events
   */
  searchEvents(query: string): Promise<CalendarEvent[]>;

  /**
   * Get upcoming events (from today onwards)
   * @param limit - Maximum number of events to return
   * @returns Promise resolving to array of upcoming events
   */
  getUpcomingEvents(limit?: number): Promise<CalendarEvent[]>;

  /**
   * Get completed events count for a date range
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   * @returns Promise resolving to count of completed events
   */
  getCompletedEventsCount(startDate: string, endDate: string): Promise<number>;
}

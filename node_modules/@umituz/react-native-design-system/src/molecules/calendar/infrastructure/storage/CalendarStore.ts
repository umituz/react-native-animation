/**
 * Calendar Store - Combined Hook
 * Convenience hook that combines all calendar stores
 */

import { useMemo, useCallback } from 'react';
import { useCalendarEvents } from '../stores/useCalendarEvents';
import { useCalendarNavigation } from '../stores/useCalendarNavigation';
import { useCalendarView } from '../stores/useCalendarView';
import { CalendarService } from '../services/CalendarService';

// Export individual stores
export { useCalendarEvents } from '../stores/useCalendarEvents';
export { useCalendarNavigation } from '../stores/useCalendarNavigation';
export { useCalendarView } from '../stores/useCalendarView';

// Export types
export type { CalendarViewMode } from '../stores/useCalendarView';

/**
 * Combined calendar hook
 * Use this for convenience, or use individual stores for fine-grained control
 */
export const useCalendar = () => {
  const events = useCalendarEvents();
  const navigation = useCalendarNavigation();
  const view = useCalendarView();

  // Utility functions - memoized to prevent recreating on every render
  const getEventsForDate = useCallback((date: Date | null | undefined) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      if (__DEV__) {
        console.warn('[CalendarStore] getEventsForDate called with invalid date:', date);
      }
      return [];
    }
    return events.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  }, [events.events]);

  const getEventsForMonth = useCallback((year: number, month: number) => {
    if (typeof year !== 'number' || typeof month !== 'number' ||
        isNaN(year) || isNaN(month) || month < 0 || month > 11) {
      if (__DEV__) {
        console.warn('[CalendarStore] getEventsForMonth called with invalid year/month:', { year, month });
      }
      return [];
    }
    return events.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }, [events.events]);

  return useMemo(() => ({
    // Events state and actions
    events: events.events,
    isLoading: events.isLoading,
    error: events.error,
    loadEvents: events.loadEvents,
    addEvent: events.addEvent,
    updateEvent: events.updateEvent,
    deleteEvent: events.deleteEvent,
    completeEvent: events.completeEvent,
    uncompleteEvent: events.uncompleteEvent,
    clearError: events.clearError,
    clearAllEvents: events.clearAllEvents,

    // Navigation state and actions
    selectedDate: navigation.selectedDate,
    currentMonth: navigation.currentMonth,
    setSelectedDate: navigation.setSelectedDate,
    goToToday: navigation.goToToday,
    navigateMonth: navigation.navigateMonth,
    setCurrentMonth: navigation.setCurrentMonth,

    // View state and actions
    viewMode: view.viewMode,
    setViewMode: view.setViewMode,

    // Utility functions
    getEventsForDate,
    getEventsForMonth,
  }), [
    events.events,
    events.isLoading,
    events.error,
    events.loadEvents,
    events.addEvent,
    events.updateEvent,
    events.deleteEvent,
    events.completeEvent,
    events.uncompleteEvent,
    events.clearError,
    events.clearAllEvents,
    navigation.selectedDate,
    navigation.currentMonth,
    navigation.setSelectedDate,
    navigation.goToToday,
    navigation.navigateMonth,
    navigation.setCurrentMonth,
    view.viewMode,
    view.setViewMode,
    getEventsForDate,
    getEventsForMonth,
  ]);
};

/**
 * Combined calendar store hook with computed days
 */
export const useCalendarStore = () => {
  const calendar = useCalendar();

  const days = useMemo(() => {
    const year = calendar.currentMonth.getFullYear();
    const month = calendar.currentMonth.getMonth();
    return CalendarService.getMonthDays(year, month, calendar.events);
  }, [calendar.currentMonth, calendar.events]);

  const actions = useMemo(() => ({
    loadEvents: calendar.loadEvents,
    addEvent: calendar.addEvent,
    updateEvent: calendar.updateEvent,
    deleteEvent: calendar.deleteEvent,
    completeEvent: calendar.completeEvent,
    uncompleteEvent: calendar.uncompleteEvent,
    setSelectedDate: calendar.setSelectedDate,
    goToToday: calendar.goToToday,
    navigateMonth: calendar.navigateMonth,
    setCurrentMonth: calendar.setCurrentMonth,
    setViewMode: calendar.setViewMode,
    getEventsForDate: calendar.getEventsForDate,
    getEventsForMonth: calendar.getEventsForMonth,
    clearError: calendar.clearError,
    clearAllEvents: calendar.clearAllEvents,
  }), [
    calendar.loadEvents,
    calendar.addEvent,
    calendar.updateEvent,
    calendar.deleteEvent,
    calendar.completeEvent,
    calendar.uncompleteEvent,
    calendar.setSelectedDate,
    calendar.goToToday,
    calendar.navigateMonth,
    calendar.setCurrentMonth,
    calendar.setViewMode,
    calendar.getEventsForDate,
    calendar.getEventsForMonth,
    calendar.clearError,
    calendar.clearAllEvents,
  ]);

  return {
    events: calendar.events,
    selectedDate: calendar.selectedDate,
    currentMonth: calendar.currentMonth,
    viewMode: calendar.viewMode,
    isLoading: calendar.isLoading,
    error: calendar.error,
    actions,
    days,
  };
};

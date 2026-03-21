/**
 * Calendar Events Store
 * Manages event CRUD operations only
 * Uses manual persistence (no zustand persist middleware)
 */

import { create } from 'zustand';
import type { CalendarEvent, CreateCalendarEventRequest, UpdateCalendarEventRequest } from '../../domain/entities/CalendarEvent.entity';
import { zustandStorage } from './storageAdapter';
import { isValidArray, isValidCalendarEvent } from '../../../../storage/domain/utils/ValidationUtils';
import { ErrorHandler } from '../../../../utils/errors/ErrorHandler';

const STORAGE_KEY = 'calendar_events';

interface CalendarEventsState {
  readonly events: CalendarEvent[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

interface CalendarEventsActions {
  readonly loadEvents: () => Promise<void>;
  readonly addEvent: (request: CreateCalendarEventRequest) => Promise<void>;
  readonly updateEvent: (request: UpdateCalendarEventRequest) => Promise<void>;
  readonly deleteEvent: (id: string) => Promise<void>;
  readonly completeEvent: (id: string) => Promise<void>;
  readonly uncompleteEvent: (id: string) => Promise<void>;
  readonly clearError: () => void;
  readonly clearAllEvents: () => Promise<void>;
}

type CalendarEventsStore = CalendarEventsState & CalendarEventsActions;

const generateId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const persistEvents = async (events: CalendarEvent[]): Promise<void> => {
  try {
    await zustandStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    ErrorHandler.log(error);
    throw error; // Re-throw to allow caller to handle
  }
};

export const useCalendarEvents = create<CalendarEventsStore>()((set, get) => ({
  events: [],
  isLoading: false,
  error: null,

  loadEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const json = await zustandStorage.getItem(STORAGE_KEY);
      if (!json) {
        set({ isLoading: false });
        return;
      }

      const parsed = JSON.parse(json) as unknown;

      // Runtime validation
      if (!isValidArray(parsed)) {
        if (__DEV__) {
          console.error('[CalendarEvents] Invalid data format: expected array, got', typeof parsed);
        }
        set({ error: 'Invalid data format', isLoading: false });
        return;
      }

      // Validate each event structure
      const validEvents = parsed.filter(isValidCalendarEvent) as CalendarEvent[];

      if (validEvents.length > 0) {
        const hydratedEvents = validEvents.map((event) => ({
          ...event,
          createdAt: event.createdAt ? new Date(event.createdAt) : new Date(),
          updatedAt: event.updatedAt ? new Date(event.updatedAt) : new Date(),
        }));
        set({ events: hydratedEvents, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      ErrorHandler.log(error);
      set({ error: 'Failed to load events', isLoading: false });
    }
  },

  addEvent: async (request) => {
    set({ isLoading: true, error: null });
    try {
      const newEvent: CalendarEvent = {
        id: generateId(),
        ...request,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { events } = get();
      const updatedEvents = [...events, newEvent];

      await persistEvents(updatedEvents);
      set({ events: updatedEvents, isLoading: false });
    } catch (error) {
      ErrorHandler.log(error);
      set({ error: 'Failed to add event', isLoading: false });
    }
  },

  updateEvent: async (request) => {
    set({ isLoading: true, error: null });
    try {
      const { events } = get();
      const updatedEvents = events.map((event) =>
        event.id === request.id
          ? { ...event, ...request, updatedAt: new Date() }
          : event
      );

      await persistEvents(updatedEvents);
      set({ events: updatedEvents, isLoading: false });
    } catch (error) {
      ErrorHandler.log(error);
      set({ error: 'Failed to update event', isLoading: false });
    }
  },

  deleteEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { events } = get();
      const updatedEvents = events.filter((event) => event.id !== id);

      await persistEvents(updatedEvents);
      set({ events: updatedEvents, isLoading: false });
    } catch (error) {
      ErrorHandler.log(error);
      set({ error: 'Failed to delete event', isLoading: false });
    }
  },

  completeEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { events } = get();
      const updatedEvents = events.map((event) =>
        event.id === id
          ? { ...event, completed: true, updatedAt: new Date() }
          : event
      );

      await persistEvents(updatedEvents);
      set({ events: updatedEvents, isLoading: false });
    } catch (error) {
      ErrorHandler.log(error);
      set({ error: 'Failed to complete event', isLoading: false });
    }
  },

  uncompleteEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { events } = get();
      const updatedEvents = events.map((event) =>
        event.id === id
          ? { ...event, completed: false, updatedAt: new Date() }
          : event
      );

      await persistEvents(updatedEvents);
      set({ events: updatedEvents, isLoading: false });
    } catch (error) {
      ErrorHandler.log(error);
      set({ error: 'Failed to uncomplete event', isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  clearAllEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      await zustandStorage.removeItem(STORAGE_KEY);
      set({ events: [], isLoading: false });
    } catch (error) {
      ErrorHandler.log(error);
      set({ error: 'Failed to clear events', isLoading: false });
    }
  },
}));

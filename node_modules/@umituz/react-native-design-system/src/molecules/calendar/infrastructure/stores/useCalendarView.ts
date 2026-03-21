/**
 * Calendar View Store
 * Manages calendar view mode (no persistence needed)
 */

import { create } from 'zustand';

export type CalendarViewMode = 'month' | 'week' | 'day' | 'list';

interface CalendarViewState {
  readonly viewMode: CalendarViewMode;
}

interface CalendarViewActions {
  readonly setViewMode: (mode: CalendarViewMode) => void;
}

type CalendarViewStore = CalendarViewState & CalendarViewActions;

export const useCalendarView = create<CalendarViewStore>()((set) => ({
  viewMode: 'month',

  setViewMode: (mode) => set({ viewMode: mode }),
}));

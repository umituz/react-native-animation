/**
 * Calendar Navigation Store
 * Manages date navigation state (no persistence needed)
 */

import { create } from 'zustand';

interface CalendarNavigationState {
  readonly selectedDate: Date;
  readonly currentMonth: Date;
}

interface CalendarNavigationActions {
  readonly setSelectedDate: (date: Date) => void;
  readonly goToToday: () => void;
  readonly navigateMonth: (direction: 'prev' | 'next') => void;
  readonly setCurrentMonth: (date: Date) => void;
}

type CalendarNavigationStore = CalendarNavigationState & CalendarNavigationActions;

export const useCalendarNavigation = create<CalendarNavigationStore>()((set) => ({
  selectedDate: new Date(),
  currentMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),

  setSelectedDate: (date) => set({ selectedDate: date }),

  goToToday: () => {
    const today = new Date();
    set({
      selectedDate: today,
      currentMonth: new Date(today.getFullYear(), today.getMonth(), 1),
    });
  },

  navigateMonth: (direction) => {
    set((state) => {
      const { currentMonth } = state;
      const newMonth = direction === 'next' ? currentMonth.getMonth() + 1 : currentMonth.getMonth() - 1;
      return {
        currentMonth: new Date(currentMonth.getFullYear(), newMonth, 1),
      };
    });
  },

  setCurrentMonth: (date) => set({ currentMonth: new Date(date.getFullYear(), date.getMonth(), 1) }),
}));

/**
 * Calendar Domain - Barrel Export
 *
 * Public API for the calendar domain.
 * Provides generic, reusable calendar functionality for all factory-generated apps.
 *
 * Features:
 * - Timezone-aware calendar generation (built-in DateUtilities)
 * - Generic event system (workouts, habits, tasks, etc.)
 * - Month/Week/Day views
 * - Event CRUD operations with persistence
 * - Completion tracking
 * - Recurring events support
 *
 * Usage:
 * ```tsx
 * import { useCalendar, AtomicCalendar } from '@umituz/react-native-design-system';
 *
 * const MyScreen = () => {
 *   const { days, selectedDate, actions } = useCalendar();
 *
 *   return (
 *     <AtomicCalendar
 *       days={days}
 *       selectedDate={selectedDate}
 *       onDateSelect={actions.setSelectedDate}
 *     />
 *   );
 * };
 * ```
 */

// Domain Entities
export type {
  CalendarEvent,
  CreateCalendarEventRequest,
  UpdateCalendarEventRequest,
} from './domain/entities/CalendarEvent.entity';

export type {
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
} from './domain/entities/CalendarDay.entity';

// Domain Repositories
export type { ICalendarRepository } from './domain/repositories/ICalendarRepository';

// Infrastructure Services
export { CalendarService } from './infrastructure/services/CalendarService';
export { CalendarGeneration } from './infrastructure/services/CalendarGeneration';

// Infrastructure Utils
export { DateUtilities } from './infrastructure/utils/DateUtilities';

// Infrastructure Storage
export {
  useCalendar,
  useCalendarEvents,
  useCalendarNavigation,
  useCalendarView,
  type CalendarViewMode,
} from './infrastructure/storage/CalendarStore';

// Presentation Components
export {
  AtomicCalendar,
  type AtomicCalendarProps,
} from './presentation/components/AtomicCalendar';

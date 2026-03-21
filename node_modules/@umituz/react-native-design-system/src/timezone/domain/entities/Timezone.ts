import type { TimezoneInfo, TimezoneCalendarDay } from './TimezoneTypes';
import type {
  ITimezoneCore,
  ITimezoneFormatting,
  ITimezoneManipulation,
  ITimezoneComparison,
  ITimezoneCalendar,
} from './TimezoneCapabilities';

export type { TimezoneInfo, TimezoneCalendarDay };

/**
 * Timezone Service Interface
 * Aggregates all timezone capabilities into a single service contract
 */
export interface ITimezoneService
  extends ITimezoneCore,
    ITimezoneFormatting,
    ITimezoneManipulation,
    ITimezoneComparison,
    ITimezoneCalendar {}


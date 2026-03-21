/**
 * AtomicCalendar Component
 *
 * Generic, reusable calendar component with month view.
 * Works with any type of events (workouts, habits, tasks, etc.)
 *
 * Features:
 * - Monthly grid view (42 days = 6 weeks)
 * - Timezone-aware via calendar service
 * - Event indicators (colored dots)
 * - Customizable styling
 * - Accessible
 * - Theme-aware
 *
 * Usage:
 * ```tsx
 * import { AtomicCalendar, useCalendar } from '@umituz/react-native-calendar';
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

import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../../../theme/hooks/useAppDesignTokens';
import type { CalendarDay } from '../../domain/entities/CalendarDay.entity';
import { CalendarService } from '../../infrastructure/services/CalendarService';
import { calendarStyles } from './calendarStyles';
import { CalendarWeekdayHeader } from './CalendarWeekdayHeader';
import { CalendarDayCell } from './CalendarDayCell';

/**
 * AtomicCalendar Props
 */
export interface AtomicCalendarProps {
  /**
   * Calendar days to display (42 days for 6-week grid)
   */
  days: CalendarDay[];

  /**
   * Currently selected date
   */
  selectedDate: Date;

  /**
   * Callback when a date is selected
   */
  onDateSelect: (date: Date) => void;

  /**
   * Whether to show weekday headers
   * @default true
   */
  showWeekdayHeaders?: boolean;

  /**
   * Maximum number of event indicators to show per day
   * @default 3
   */
  maxEventIndicators?: number;

  /**
   * Custom container style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom day cell style
   */
  dayStyle?: StyleProp<ViewStyle>;

  /**
   * Whether to show event count when exceeds max indicators
   * @default true
   */
  showEventCount?: boolean;

  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * AtomicCalendar Component
 */
export const AtomicCalendar: React.FC<AtomicCalendarProps> = ({
  days,
  selectedDate,
  onDateSelect,
  showWeekdayHeaders = true,
  maxEventIndicators = 3,
  style,
  dayStyle,
  showEventCount = true,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const weekdayNames = CalendarService.getWeekdayNames();

  return (
    <View style={[calendarStyles.container, { backgroundColor: tokens.colors.surface }, style]} testID={testID}>
      {showWeekdayHeaders && <CalendarWeekdayHeader weekdayNames={weekdayNames} />}

      <View style={calendarStyles.grid}>
        {days.map((day, index) => {
          const isSelected = CalendarService.isSameDay(day.date, selectedDate);

          return (
            <CalendarDayCell
              key={day.date.getTime()}
              day={day}
              index={index}
              isSelected={isSelected}

              onDateSelect={onDateSelect}
              maxEventIndicators={maxEventIndicators}
              showEventCount={showEventCount}
              dayStyle={dayStyle}
              testID={testID}
            />
          );
        })}
      </View>
    </View>
  );
};

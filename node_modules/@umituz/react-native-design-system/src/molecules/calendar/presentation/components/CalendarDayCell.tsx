/**
 * Calendar Day Cell Component
 */

import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { AtomicText } from '../../../../atoms';
import { useAppDesignTokens } from '../../../../theme/hooks/useAppDesignTokens';
import type { CalendarDay } from '../../domain/entities/CalendarDay.entity';

import { calendarStyles } from './calendarStyles';

interface CalendarDayCellProps {
  day: CalendarDay;
  index: number;
  isSelected: boolean;

  onDateSelect: (date: Date) => void;
  maxEventIndicators: number;
  showEventCount: boolean;
  dayStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export const CalendarDayCell: React.FC<CalendarDayCellProps> = React.memo(({
  day,
  index,
  isSelected,

  onDateSelect,
  maxEventIndicators,
  showEventCount,
  dayStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const eventCount = day.events.length;
  const visibleEvents = day.events.slice(0, maxEventIndicators);
  const hiddenEventCount = Math.max(0, eventCount - maxEventIndicators);

  const cellStyle = useMemo(() => [
    calendarStyles.dayCell,
    {
      backgroundColor: isSelected ? tokens.colors.primary : 'transparent',
      borderColor: isSelected
        ? tokens.colors.primary
        : day.isToday
          ? tokens.colors.primary
          : tokens.colors.border,
      borderWidth: isSelected ? 2 : day.isToday ? 2 : 1,
      opacity: day.isDisabled ? 0.4 : 1,
    },
    dayStyle,
  ], [isSelected, day.isToday, day.isDisabled, tokens.colors.primary, tokens.colors.border, dayStyle]);

  const dayTextStyle = useMemo(() => [
    calendarStyles.dayText,
    day.isToday && !isSelected && { fontWeight: 'bold' as const },
  ], [day.isToday, isSelected]);

  const todayDotStyle = useMemo(() => [
    calendarStyles.eventDot,
    { backgroundColor: tokens.colors.success },
  ], [calendarStyles.eventDot, tokens.colors.success]);

  return (
    <TouchableOpacity
      style={cellStyle}
      onPress={() => !day.isDisabled && onDateSelect(day.date)}
      disabled={day.isDisabled}
      testID={testID ? `${testID}-day-${index}` : undefined}
      accessibilityLabel={`${day.date.toLocaleDateString()}, ${eventCount} events`}
      accessibilityRole="button"
      accessibilityState={{ disabled: day.isDisabled, selected: isSelected }}
    >
      <AtomicText
        type="bodyMedium"
        color={isSelected ? 'inverse' : day.isCurrentMonth ? 'primary' : 'secondary'}
        style={dayTextStyle}
      >
        {day.date.getDate()}
      </AtomicText>

      <View style={calendarStyles.eventIndicators}>
        {day.isToday && eventCount === 0 && (
          <View style={todayDotStyle} />
        )}

        {visibleEvents.map((event) => {
          const eventDotStyle = useMemo(() => [
            calendarStyles.eventDot,
            {
              backgroundColor: event.color
                ? event.color
                : event.isCompleted
                  ? tokens.colors.success
                  : tokens.colors.primary,
            },
          ], [event.color, event.isCompleted, tokens.colors.success, tokens.colors.primary]);

          return (
            <View
              key={event.id}
              style={eventDotStyle}
            />
          );
        })}

        {showEventCount && hiddenEventCount > 0 && (
          <AtomicText type="bodySmall" color="secondary" style={calendarStyles.moreEventsText}>
            +{hiddenEventCount}
          </AtomicText>
        )}
      </View>
    </TouchableOpacity>
  );
});

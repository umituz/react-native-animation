# AtomicCalendar

A full-featured calendar component for React Native with monthly view, event display, date selection, and timezone support.

## Import & Usage

```typescript
import { AtomicCalendar } from 'react-native-design-system/src/molecules/calendar';
```

**Location:** `src/molecules/calendar/AtomicCalendar.tsx`

## Basic Usage

```tsx
const [selectedDate, setSelectedDate] = useState(new Date());
const days = calculateCalendarDays(selectedDate);

<AtomicCalendar
  days={days}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
/>
```

## Strategy

**Purpose**: Provide a standardized, accessible calendar interface for date selection and event visualization.

**When to Use**:
- Date pickers for forms
- Event scheduling and management
- Appointment booking
- Task management with due dates
- Attendance tracking
- Holiday/leave planning
- Availability displays

**When NOT to Use**:
- For simple date selection (use DatePicker instead)
- For date range selection only (use DateRangePicker instead)
- For time-only selection (use TimePicker instead)
- For recurring event configuration (use specialized scheduler UI)

## Rules

### Required

1. **MUST** provide `days` array (42 days, 6-week grid)
2. **MUST** have `selectedDate` and `onDateSelect` handlers
3. **ALWAYS** calculate days correctly with timezone handling
4. **MUST** handle month boundaries (padding days from prev/next months)
5. **SHOULD** show event indicators when events exist
6. **MUST** respect isDisabled flag for unavailable dates

### Day Calculation

1. **42-day grid**: Always return 42 days (6 weeks)
2. **Month padding**: Include days from prev/next months to fill grid
3. **Timezone handling**: Use consistent timezone throughout
4. **Date validation**: Ensure all dates are valid Date objects

### Event Indicators

1. **Max indicators**: Default to 3, adjust based on design
2. **Event mapping**: Map events to correct dates
3. **Visual distinction**: Different colors for different event types
4. **Performance**: Limit events per day for performance

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No days array
<AtomicCalendar
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
/>

// ❌ Wrong day count (not 42 days)
const getDays = () => {
  const days = [];
  // ❌ Only returns 30 days for current month
  for (let i = 1; i <= 30; i++) {
    days.push({ date: new Date(year, month, i) });
  }
  return days;
};

// ❌ No timezone handling
const days = calculateCalendarDays(selectedDate); // ❌ Uses local time

// ❌ Missing month padding
const days = currentMonthDays; // ❌ No prev/next month days

// ❌ Not handling disabled dates
<AtomicCalendar
  days={days}
  selectedDate={new Date('2024-01-01')} // ❌ Past date
  onDateSelect={setSelectedDate}
/>

// ❌ Too many event indicators
<AtomicCalendar
  days={days}
  selectedDate={selectedDate}
  maxEventIndicators={20} // ❌ Too many, performance issue
/>

// ❌ No date validation
const days = [
  { date: null }, // ❌ Invalid date
  { date: '2024-01-01' }, // ❌ String, not Date object
];
```

## Best Practices

### Day Calculation

✅ **DO**:
```tsx
// ✅ Good - 42-day grid with padding
const calculateCalendarDays = (date: Date): CalendarDay[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday
  const daysInMonth = lastDay.getDate();

  const days: CalendarDay[] = [];

  // Add padding days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({
      date: prevDate,
      isCurrentMonth: false,
      isSelected: isSameDay(prevDate, selectedDate),
      isToday: isSameDay(prevDate, new Date()),
    });
  }

  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month, i);
    days.push({
      date: currentDate,
      isCurrentMonth: true,
      isSelected: isSameDay(currentDate, selectedDate),
      isToday: isSameDay(currentDate, new Date()),
    });
  }

  // Add padding days from next month to reach 42
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate,
      isCurrentMonth: false,
      isSelected: isSameDay(nextDate, selectedDate),
      isToday: isSameDay(nextDate, new Date()),
    });
  }

  return days;
};
```

❌ **DON'T**:
```tsx
// ❌ Bad - only current month, no padding
const getDays = (date: Date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(date.getFullYear(), date.getMonth(), i),
      isCurrentMonth: true,
    });
  }
  return days; // ❌ Only 28-31 days, breaks grid layout
};
```

### Event Mapping

✅ **DO**:
```tsx
// ✅ Good - map events to days
const getDaysWithEvents = (date: Date, events: Event[]): CalendarDay[] => {
  const days = calculateCalendarDays(date);
  return days.map(day => ({
    ...day,
    events: events.filter(event =>
      isSameDay(event.date, day.date)
    ).slice(0, 3), // Limit to 3 for performance
  }));
};
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicCalendar components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { AtomicCalendar } from 'react-native-design-system/src/molecules/calendar';
   ```

2. **Always calculate 42-day grid**:
   ```tsx
   // ✅ Good - always 42 days
   const calculateCalendarDays = (date: Date): CalendarDay[] => {
     // Calculate with padding from prev/next months
     // Must return exactly 42 days (6 weeks)
   };

   // ❌ Bad - variable day count
   const getDays = (date: Date) => {
     // Returns 28-31 days
   };
   ```

3. **Always handle month boundaries**:
   ```tsx
   // ✅ Good - include padding days
   const days: CalendarDay[] = [];

   // Previous month padding
   for (let i = firstDayOfWeek - 1; i >= 0; i--) {
     days.push(createDay(new Date(year, month, -i), false));
   }

   // Current month
   for (let i = 1; i <= daysInMonth; i++) {
     days.push(createDay(new Date(year, month, i), true));
   }

   // Next month padding (to reach 42)
   for (let i = 1; days.length < 42; i++) {
     days.push(createDay(new Date(year, month + 1, i), false));
   }
   ```

4. **Always validate date objects**:
   ```tsx
   // ✅ Good - validate dates
   if (!(date instanceof Date) || isNaN(date.getTime())) {
     throw new Error('Invalid date');
   }

   // ❌ Bad - no validation
   const days = [{ date: someInput }]; // Could be invalid
   ```

5. **Always limit event indicators**:
   ```tsx
   // ✅ Good - limit events
   const daysWithEvents = days.map(day => ({
     ...day,
     events: events
       .filter(e => isSameDay(e.date, day.date))
       .slice(0, 3), // Max 3 events
   }));

   // ❌ Bad - unlimited events
   events.filter(e => isSameDay(e.date, day.date)) // Could be 100+
   ```

### Common Patterns

#### Basic Calendar
```tsx
const [selectedDate, setSelectedDate] = useState(new Date());
const days = useMemo(() => calculateCalendarDays(selectedDate), [selectedDate]);

<AtomicCalendar
  days={days}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
/>
```

#### Calendar with Events
```tsx
const [selectedDate, setSelectedDate] = useState(new Date());
const [events, setEvents] = useState<Event[]>([]);

const days = useMemo(() => {
  const calendarDays = calculateCalendarDays(selectedDate);
  return calendarDays.map(day => ({
    ...day,
    events: events
      .filter(e => isSameDay(e.date, day.date))
      .slice(0, 3),
  }));
}, [selectedDate, events]);

<AtomicCalendar
  days={days}
  selectedDate={selectedDate}
  onDateSelect={(date) => {
    setSelectedDate(date);
    loadEventsForDate(date);
  }}
/>
```

#### Calendar with Disabled Dates
```tsx
const days = useMemo(() => {
  const calendarDays = calculateCalendarDays(selectedDate);
  return calendarDays.map(day => ({
    ...day,
    isDisabled: day.date < new Date(), // Disable past dates
  }));
}, [selectedDate]);
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `days` | `CalendarDay[]` | Yes | - | Calendar days (42 days) |
| `selectedDate` | `Date` | Yes | - | Selected date |
| `onDateSelect` | `(date: Date) => void` | Yes | - | Date selection callback |
| `showWeekdayHeaders` | `boolean` | No | `true` | Show weekday headers |
| `maxEventIndicators` | `number` | No | `3` | Maximum event indicators |
| `dayStyle` | `ViewStyle` | No | - | Day cell style |
| `showEventCount` | `boolean` | No | `true` | Show event count |

### CalendarDay Interface

```typescript
interface CalendarDay {
  date: Date;              // Date object
  isCurrentMonth: boolean; // Is in current month
  isSelected: boolean;     // Is selected
  isToday: boolean;        // Is today
  events?: Event[];        // Events for this day
  isDisabled?: boolean;    // Is disabled
}
```

## Accessibility

- ✅ Screen reader announces date and events
- ✅ Touch target size maintained (min 44x44pt)
- ✅ Keyboard navigation (web)
- ✅ Semantic date information
- ✅ Visual indicators for today and selected date

## Performance Tips

1. **Memoization**: Always memo `days` array with useMemo
2. **Limit events**: Max 3-5 event indicators per day
3. **Lazy load**: Load events only when needed
4. **Debounce selection**: Debounce rapid date changes

## Related Components

- [`BaseModal`](../BaseModal/README.md) - Modal component
- [`FormField`](../FormField/README.md) - Form field component
- [`Button`](../../atoms/button/README.md) - Button component

## License

MIT

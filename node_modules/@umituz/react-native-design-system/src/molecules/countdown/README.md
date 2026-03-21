# Countdown

A countdown timer component that displays remaining time to a specific date/target with support for multiple targets and custom time units.

## Import & Usage

```typescript
import { Countdown, useCountdown } from 'react-native-design-system/src/molecules/countdown';
```

**Location:** `src/molecules/countdown/Countdown.tsx`

## Basic Usage

```tsx
<Countdown
  target={{
    date: new Date('2025-12-31'),
    label: 'New Year',
  }}
/>
```

## Strategy

**Purpose**: Display time remaining to specific events or deadlines with real-time updates.

**When to Use**:
- Flash sales and limited-time offers
- Event countdowns (concerts, conferences)
- Competition deadlines
- Daily reset timers
- Game timers
- Auction end times

**When NOT to Use**:
- For static time display (use regular text instead)
- For past dates (validate before use)
- For very short durations (<1 minute, use progress bar)
- For simple clocks (use time display instead)

## Rules

### Required

1. **MUST** provide a valid future `date` in target
2. **MUST** provide a `label` for the target
3. **SHOULD** set appropriate `interval` (1000ms recommended)
4. **MUST** handle `onExpire` callback when needed
5. **ALWAYS** validate date before passing to component
6. **SHOULD** use memoization for performance
7. **NEVER** use past dates

### Time Display

1. **Days**: Show for durations >24 hours
2. **Hours**: Always show for durations <1 week
3. **Minutes**: Always show
4. **Seconds**: Optional, hide for long durations

### Performance

1. **Interval**: 1000ms (1 second) recommended
2. **Cleanup**: Always cleanup in useEffect
3. **Memoization**: Memo callback functions
4. **Throttle**: Throttle onTick callbacks

### Memory Management

1. **Cleanup**: Clear intervals on unmount
2. **Unmount**: Stop countdown when not visible
3. **Throttle**: Don't update too frequently
4. **Memo**: Memoize target objects

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Past date
<Countdown
  target={{
    date: new Date('2020-01-01'), // ❌ Past date
    label: 'Expired Event',
  }}
/>

// ❌ Too frequent updates
<Countdown
  target={{ date: futureDate, label: 'Event' }}
  interval={100} // ❌ Too frequent (100ms)
/>

// ❌ No cleanup
useEffect(() => {
  const { start } = useCountdown(target);
  start(); // ❌ No cleanup function
}, []);

// ❌ Missing onExpire for critical actions
<Countdown
  target={{ date: deadline, label: 'Sale Ends' }}
  // Missing onExpire - user won't know when it ends
/>

// ❌ Too many countdowns on screen
<View>
  <Countdown target={target1} />
  <Countdown target={target2} />
  <Countdown target={target3} />
  <Countdown target={target4} />
  <Countdown target={target5} />
  {/* ❌ Too many, causes performance issues */}
</View>

// ❌ Invalid date format
<Countdown
  target={{
    date: '2025-12-31', // ❌ String instead of Date
    label: 'Event',
  }}
/>

// ❌ Not handling timezone
<Countdown
  target={{
    date: new Date('2025-12-31'), // ❌ Ambiguous timezone
    label: 'Global Event',
  }}
/>
```

## Best Practices

### Flash Sale Countdown

✅ **DO**:
```tsx
<Countdown
  target={{
    date: endDate,
    label: 'Flash Sale Ends',
    icon: 'flash-outline',
  }}
  displayConfig={{
    showDays: false,
    size: 'large',
  }}
  onExpire={() => {
    Alert.alert('Sale ended!');
    // Refresh UI or redirect
  }}
/>
```

❌ **DON'T**:
```tsx
// ❌ No expire handler
<Countdown
  target={{ date: endDate, label: 'Sale Ends' }}
  // User doesn't know what happens when it ends
/>
```

### Timezone Handling

✅ **DO**:
```tsx
// ✅ Good - explicit UTC timezone
const targetDate = new Date('2025-12-31T23:59:59Z');

<Countdown
  target={{ date: targetDate, label: 'New Year' }}
/>
```

❌ **DON'T**:
```tsx
// ❌ Bad - ambiguous timezone
const targetDate = new Date('2025-12-31');
```

### Performance

✅ **DO**:
```tsx
// ✅ Good - appropriate interval
<Countdown
  target={{ date: futureDate, label: 'Event' }}
  interval={1000} // 1 second
/>
```

❌ **DON'T**:
```tsx
// ❌ Bad - too frequent
<Countdown
  target={{ date: futureDate, label: 'Event' }}
  interval={100} // 100ms - causes performance issues
/>
```

### Memory Cleanup

✅ **DO**:
```tsx
const countdown = useCountdown(target, {
  interval: 1000,
  autoStart: true,
});

useEffect(() => {
  return () => {
    countdown.stop(); // ✅ Cleanup
  };
}, []);
```

## AI Coding Guidelines

### For AI Agents

When generating Countdown components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { Countdown, useCountdown } from 'react-native-design-system/src/molecules/countdown';
   ```

2. **Always validate date before use**:
   ```tsx
   // ✅ Good - validate date
   const targetDate = new Date('2025-12-31');
   if (targetDate <= new Date()) {
     throw new Error('Target date must be in the future');
   }

   <Countdown
     target={{ date: targetDate, label: 'Event' }}
   />

   // ❌ Bad - no validation
   <Countdown
     target={{ date: new Date('2020-01-01'), label: 'Event' }}
   />
   ```

3. **Always use appropriate interval**:
   ```tsx
   // ✅ Good - 1 second interval
   <Countdown
     target={{ date: futureDate, label: 'Event' }}
     interval={1000}
   />

   // ❌ Bad - too frequent
   <Countdown
     target={{ date: futureDate, label: 'Event' }}
     interval={100}
   />
   ```

4. **Always handle onExpire for critical events**:
   ```tsx
   // ✅ Good - handle expiry
   <Countdown
     target={{ date: deadline, label: 'Sale Ends' }}
     onExpire={() => {
       Alert.alert('Sale ended!', 'The flash sale has ended.');
       // Refresh data or redirect
     }}
   />

   // ❌ Bad - no expire handler
   <Countdown
     target={{ date: deadline, label: 'Sale Ends' }}
   />
   ```

5. **Always use UTC for global events**:
   ```tsx
   // ✅ Good - explicit UTC
   const targetDate = new Date('2025-12-31T23:59:59Z');

   // ❌ Bad - local timezone
   const targetDate = new Date('2025-12-31');
   ```

### Common Patterns

#### Flash Sale Countdown
```tsx
const endDate = new Date(Date.now() + 3600000); // 1 hour from now

<Countdown
  target={{
    date: endDate,
    label: 'Flash Sale Ends',
    icon: 'flash-outline',
  }}
  displayConfig={{
    showDays: false,
    showSeconds: true,
    size: 'large',
  }}
  onExpire={() => {
    Alert.alert('Sale ended!');
    refreshProducts();
  }}
/>
```

#### Event Countdown
```tsx
<Countdown
  target={{
    date: new Date('2025-06-30T20:00:00Z'),
    label: 'Summer Concert',
    icon: 'musical-notes-outline',
  }}
  displayConfig={{
    size: 'medium',
    showLabel: true,
  }}
/>
```

#### Game Timer
```tsx
const [timeLeft, setTimeLeft] = useState(0);

useCountdown(
  { date: gameEndTime },
  {
    interval: 1000,
    onTick: (time) => {
      setTimeLeft(time.totalSeconds);
    },
    onExpire: () => {
      handleTimeUp();
    },
  }
);
```

#### Daily Reset Timer
```tsx
const getNextMidnight = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

<Countdown
  target={{
    date: getNextMidnight(),
    label: 'Daily Reset',
  }}
  displayConfig={{
    showDays: false,
    showLabel: false,
  }}
  onExpire={() => {
    window.location.reload();
  }}
/>
```

## Props Reference

### CountdownProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `target` | `CountdownTarget` | **Yes** | - | Target date and label |
| `alternateTargets` | `CountdownTarget[]` | No | `[]` | Alternate targets to switch between |
| `displayConfig` | `CountdownDisplayConfig` | No | `{}` | Display configuration |
| `interval` | `number` | No | `1000` | Update interval in milliseconds |
| `onExpire` | `() => void` | No | - | Callback when countdown expires |
| `onTargetChange` | `(target) => void` | No | - | Callback when target changes |
| `formatLabel` | `(unit, value) => string` | No | - | Custom label formatting |

### CountdownTarget

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `date` | `Date` | **Yes** | - | Target date (must be in future) |
| `label` | `string` | **Yes** | - | Target label |
| `icon` | `string` | No | - | Icon name (Ionicons) |

### CountdownDisplayConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showLabel` | `boolean` | `true` | Show target label |
| `showToggle` | `boolean` | Auto | Show target toggle button |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Display size |
| `showDays` | `boolean` | Auto | Show days (auto based on duration) |
| `showHours` | `boolean` | `true` | Show hours |
| `showMinutes` | `boolean` | `true` | Show minutes |
| `showSeconds` | `boolean` | `true` | Show seconds |

### useCountdown Hook

```typescript
useCountdown(target: CountdownTarget, options?: {
  interval?: number;        // Default: 1000
  autoStart?: boolean;      // Default: true
  onExpire?: () => void;
  onTick?: (time: TimeRemaining) => void;
}): {
  timeRemaining: TimeRemaining;
  isActive: boolean;
  isExpired: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  setTarget: (target: CountdownTarget) => void;
}
```

## Accessibility

- ✅ Screen reader announces time remaining
- ✅ Timer role for semantic meaning
- ✅ Live region for updates
- ✅ Label announces target event
- ✅ Accessible toggle between targets

## Performance Tips

1. **Interval**: Use 1000ms (1 second) for most cases
2. **Cleanup**: Always cleanup in useEffect
3. **Throttle**: Throttle onTick callbacks
4. **Memoization**: Memo target objects and callbacks
5. **Visibility**: Stop countdown when not visible

## Related Components

- [`StepProgress`](../StepProgress/README.md) - Step progress indicator
- [`AtomicText`](../../atoms/AtomicText/README.md) - Text component
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - Icon component
- [`BaseModal`](../BaseModal/README.md) - Modal component

## License

MIT

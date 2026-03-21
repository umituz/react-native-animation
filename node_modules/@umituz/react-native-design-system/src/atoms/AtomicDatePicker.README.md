# AtomicDatePicker

A platform-native date/time picker component for React Native.

## Import & Usage

```typescript
import { AtomicDatePicker } from 'react-native-design-system/src/atoms/AtomicDatePicker';
```

**Location:** `src/atoms/AtomicDatePicker.tsx`

## Basic Usage

```tsx
<AtomicDatePicker
  value={date}
  onChange={setDate}
  label="Birthday"
  placeholder="Select date"
/>
```

## Strategy

**Purpose**: Provide native date/time selection with platform-appropriate UI.

**When to Use**:
- Date selection (birthdays, appointments, events)
- Time selection (reminders, scheduling)
- Date ranges (start/end dates)
- Any date/time input

**When NOT to Use**:
- For custom calendar UI (build custom component)
- When using non-standard calendars

## Rules

### Required

1. **MUST** provide `value` and `onChange`
2. **SHOULD** provide `label` for accessibility
3. **MUST** show error messages clearly
4. **ALWAYS** set appropriate `mode` (date, time, datetime)
5. **SHOULD** use `minimumDate`/`maximumDate` for constraints
6. **MUST** validate dates appropriately

### Date Validation

1. **Future dates**: Birthdays, events
2. **Past dates**: Historical dates
3. **Ranges**: Set min/max appropriately
4. **Business rules**: Enforce date constraints

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No value or onChange
<AtomicDatePicker
  label="Birthday"
  placeholder="Select date"
  // ❌ Missing value and onChange
/>

// ❌ Wrong mode
<AtomicDatePicker
  mode="datetime" {/* ❌ Android doesn't support */}
/>

// ❌ No date constraints
<AtomicDatePicker
  label="Birthday"
  // ❌ Should have maximumDate
/>

// ❌ Generic error
<AtomicDatePicker
  error="Invalid date" {/* ❌ Not actionable */}
/>
```

## Best Practices

### Date Constraints

✅ **DO**:
```tsx
<AtomicDatePicker
  label="Birthday"
  value={birthDate}
  onChange={setBirthDate}
  minimumDate={new Date(1900, 0, 1)}
  maximumDate={new Date()}
/>
```

❌ **DON'T**:
```tsx
// ❌ No constraints
<AtomicDatePicker
  label="Birthday"
  value={birthDate}
  onChange={setBirthDate}
  // User can select any date
/>
```

## AI Coding Guidelines

### For AI Agents

1. **Always provide value and onChange**:
   ```tsx
   // ✅ Good
   const [date, setDate] = useState<Date | null>(null);
   <AtomicDatePicker value={date} onChange={setDate} label="Date" />

   // ❌ Bad
   <AtomicDatePicker label="Date" />
   ```

2. **Always set date constraints**:
   ```tsx
   // ✅ Good
   <AtomicDatePicker
     label="Birthday"
     maximumDate={new Date()}
   />

   // ❌ Bad
   <AtomicDatePicker label="Birthday" />
   ```

3. **Always use appropriate mode**:
   ```tsx
   // ✅ Good - correct mode
   <AtomicDatePicker mode="date" />
   <AtomicDatePicker mode="time" />

   // ❌ Bad - datetime on Android
   <AtomicDatePicker mode="datetime" />
   ```

### Common Patterns

#### Date Picker
```tsx
<AtomicDatePicker
  label="Date"
  value={date}
  onChange={setDate}
  mode="date"
/>
```

#### Time Picker
```tsx
<AtomicDatePicker
  label="Time"
  value={time}
  onChange={setTime}
  mode="time"
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `Date \| null` | Yes | - | Selected date |
| `onChange` | `(date: Date) => void` | Yes | - | Change callback |
| `label` | `string` | No | - | Field label |
| `error` | `string` | No | - | Error message |
| `mode` | `'date' \| 'time' \| 'datetime'` | No | `'date'` | Picker mode |
| `minimumDate` | `Date` | No | - | Minimum date |
| `maximumDate` | `Date` | No | - | Maximum date |

## Accessibility

- ✅ Screen reader support
- ✅ Native picker accessibility
- ✅ Error state announcement

## Related Components

- [`AtomicInput`](./AtomicInput.README.md) - Text input
- [`FormField`](../molecules/FormField) - Form wrapper

## License

MIT

# AtomicProgress

A progress bar component for showing determinate progress (0-100%).

## Import & Usage

```typescript
import { AtomicProgress } from 'react-native-design-system/src/atoms/AtomicProgress';
```

**Location:** `src/atoms/AtomicProgress.tsx`

## Basic Usage

```tsx
<AtomicProgress value={50} />
```

## Strategy

**Purpose**: Show determinate progress for operations with known completion percentage.

**When to Use**:
- File upload/download progress
- Task completion progress
- Form filling progress
- Loading with known percentage
- Step-by-step progress

**When NOT to Use**:
- For indeterminate loading (use AtomicSpinner instead)
- When progress percentage is unknown
- For status indicators (use badges instead)

## Rules

### Required

1. **MUST** provide `value` (0-100)
2. **ALWAYS** clamp value to 0-100 range
3. **SHOULD** use appropriate height for context
4. **MUST** provide accessibility label
5. **SHOULD** use semantic colors for meaning
6. **ALWAYS** show progress text for meaningful feedback

### Color Semantics

1. **Primary**: General progress
2. **Success**: Completion/success
3. **Warning**: Caution needed
4. **Error**: Error occurred

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No value
<AtomicProgress /> {/* ❌ Missing required prop */}

// ❌ Value out of range
<AtomicProgress value={150} /> {/* ❌ Must be 0-100 */}

// ❌ For indeterminate loading
<AtomicProgress value={unknownProgress} /> {/* ❌ Use Spinner */}

// ❌ Too tall
<AtomicProgress value={50} height={50} /> {/* ❌ Too thick */}

// ❌ Confusing color
<AtomicProgress
  value={100}
  color="error" {/* ❌ 100% should be success */}
/>
```

## Best Practices

### Value Management

✅ **DO**:
```tsx
const progress = (completed / total) * 100;
<AtomicProgress value={progress} />
```

❌ **DON'T**:
```tsx
// ❌ Unclamped value
<AtomicProgress value={150} />
```

## AI Coding Guidelines

### For AI Agents

1. **Always provide value**:
   ```tsx
   // ✅ Good
   <AtomicProgress value={progress} />

   // ❌ Bad
   <AtomicProgress />
   ```

2. **Always clamp value to 0-100**:
   ```tsx
   // ✅ Good
   const value = Math.max(0, Math.min(100, progress));
   <AtomicProgress value={value} />

   // ❌ Bad
   <AtomicProgress value={progress} /> {/* Could be > 100 */}
   ```

3. **Always use appropriate height**:
   ```tsx
   // ✅ Good
   <AtomicProgress value={50} height={8} />

   // ❌ Bad
   <AtomicProgress value={50} height={30} /> {/* Too thick */}
   ```

### Common Patterns

#### Basic Progress
```tsx
<AtomicProgress value={50} />
```

#### With Percentage
```tsx
<AtomicProgress
  value={75}
  showPercentage
  height={24}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `number` | Yes | - | Progress value (0-100) |
| `height` | `number` | No | `8` | Progress bar height |
| `color` | `string` | No | - | Progress color |
| `showPercentage` | `boolean` | No | `false` | Show percentage text |
| `showValue` | `boolean` | No | `false` | Show value text |

## Accessibility

- ✅ Progress bar role
- ✅ Accessibility label
- ✅ Accessibility value (min, max, now)

## Related Components

- [`AtomicSpinner`](./AtomicSpinner.README.md) - Indeterminate loading
- [`AtomicSkeleton`](./skeleton/AtomicSkeleton.README.md) - Skeleton placeholder

## License

MIT

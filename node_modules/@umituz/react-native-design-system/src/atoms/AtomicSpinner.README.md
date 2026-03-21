# AtomicSpinner

A versatile loading indicator component for React Native. Wrapper around ActivityIndicator with extensive customization options.

## Import & Usage

```typescript
import { AtomicSpinner } from 'react-native-design-system/src/atoms/AtomicSpinner';
```

**Location:** `src/atoms/AtomicSpinner.tsx`

## Basic Usage

```tsx
<AtomicSpinner />
```

## Strategy

**Purpose**: Provide a consistent, accessible loading indicator for async operations and content loading states.

**When to Use**:
- During data fetching (API calls, database queries)
- For content loading states (images, videos, lists)
- In forms during submission
- For page transitions
- During async operations (file uploads, processing)

**When NOT to Use**:
- For determinate progress (use AtomicProgress instead)
- When progress percentage is known (use progress bar)
- For static content that doesn't need loading indication
- As a decorative element without loading context

## Rules

### Required

1. **MUST** provide accessible loading state to screen readers
2. **ALWAYS** show spinner during actual async operations
3. **MUST** hide spinner when loading completes
4. **SHOULD** provide context with `text` prop for longer operations
5. **ALWAYS** use appropriate size for the context
6. **MUST** not block user interaction unnecessarily (unless overlay)
7. **SHOULD** use `fullContainer` for centered loading states

### Usage Guidelines

1. **Size selection**: Match size to context (sm for buttons, md-lg for content)
2. **Text context**: Always provide text for operations taking > 3 seconds
3. **Overlay use**: Only use overlay for blocking operations
4. **Color semantics**: Use semantic colors (primary, success, error) when meaningful
5. **Positioning**: Use `fullContainer` for centering, or handle positioning manually

### Performance

1. **Don't over-render**: Only show when actually loading
2. **Avoid nested spinners**: One spinner per loading context
3. **Clean up**: Always remove spinner when complete

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Spinner without loading state
<View>
  <AtomicSpinner /> {/* ❌ Always visible, no loading state */}
  <Content />
</View>

// ❌ Generic text without context
<AtomicSpinner
  text="Loading" {/* ❌ What is loading? */}
/>

// ❌ Wrong size for button
<Button onPress={handleAction}>
  {loading && <AtomicSpinner size="xl" />}
  {/* ❌ Too large for button */}
</Button>

// ❌ Overlay for non-blocking operation
<AtomicSpinner
  overlay {/* ❌ Blocks UI for simple fetch */}
  text="Fetching data"
/>

// ❌ Never removes spinner
const [loading, setLoading] = useState(true);
// ❌ Never sets to false

// ❌ Spinner in static content
<View>
  <AtomicSpinner /> {/* ❌ Static content, not loading */}
  <Text>Welcome</Text>
</View>
```

## Best Practices

### Loading States

✅ **DO**:
```tsx
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    await apiCall();
  } finally {
    setLoading(false); // ✅ Always completes
  }
};

{loading ? (
  <AtomicSpinner fullContainer text="Loading data..." />
) : (
  <DataContent />
)}
```

❌ **DON'T**:
```tsx
// ❌ No cleanup
const fetchData = async () => {
  setLoading(true);
  await apiCall();
  // Forgot setLoading(false)
};

// ❌ Loading state not managed
<AtomicSpinner /> {/* Always visible */}
```

### Context with Text

✅ **DO**:
```tsx
// ✅ Specific context
<AtomicSpinner
  text="Uploading photo..."
  size="md"
/>

// ✅ Progress indication
<AtomicSpinner
  text="Processing step 1 of 3..."
  textPosition="bottom"
/>
```

❌ **DON'T**:
```tsx
// ❌ Generic text
<AtomicSpinner text="Loading" />
<AtomicSpinner text="Please wait" />

// ❌ Unnecessary text for quick operation
<AtomicSpinner text="Loading..." /> {/* < 1 second */}
```

### Size Selection

✅ **DO**:
```tsx
// ✅ Button inline
<Button>
  {loading && <AtomicSpinner size="sm" color="white" />}
</Button>

// ✅ Content loading
<AtomicSpinner size="md" fullContainer />

// ✅ Page loading
<AtomicSpinner size="lg" fullContainer text="Loading page..." />
```

❌ **DON'T**:
```tsx
// ❌ Too large for button
<Button>
  <AtomicSpinner size="xl" />
</Button>

// ❌ Too small for page
<AtomicSpinner size="xs" fullContainer />
```

### Overlay Usage

✅ **DO**:
```tsx
// ✅ Blocking operation
<AtomicSpinner
  overlay
  text="Processing payment..."
  color="white"
/>

// ✅ Modal loading
<Modal visible={loading}>
  <AtomicSpinner overlay />
</Modal>
```

❌ **DON'T**:
```tsx
// ❌ Overlay for non-blocking
<AtomicSpinner
  overlay {/* ❌ Blocks UI unnecessarily */}
  text="Fetching list"
/>

// ❌ Missing color for dark overlay
<AtomicSpinner
  overlay
  overlayColor="rgba(0, 0, 0, 0.7)"
  color="primary" {/* ❌ Hard to see on dark */}
/>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicSpinner components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { AtomicSpinner } from 'react-native-design-system/src/atoms/AtomicSpinner';
   ```

2. **Always manage loading state properly**:
   ```tsx
   // ✅ Good - proper state management
   const [loading, setLoading] = useState(false);
   const handleAction = async () => {
     setLoading(true);
     try {
       await doSomething();
     } finally {
       setLoading(false);
     }
   };

   // ❌ Bad - no cleanup
   const [loading, setLoading] = useState(false);
   const handleAction = async () => {
     setLoading(true);
     await doSomething();
     // Forgot setLoading(false)
   };
   ```

3. **Always provide context for long operations**:
   ```tsx
   // ✅ Good - specific context
   <AtomicSpinner
     text="Uploading profile photo..."
     fullContainer
   />

   // ❌ Bad - generic text
   <AtomicSpinner text="Loading..." />
   ```

4. **Always use appropriate sizes**:
   ```tsx
   // ✅ Good - size matches context
   <Button>
     {loading && <AtomicSpinner size="sm" color="white" />}
   </Button>
   <AtomicSpinner size="lg" fullContainer />

   // ❌ Bad - wrong sizes
   <Button>
     <AtomicSpinner size="xl" /> {/* Too large */}
   </Button>
   ```

5. **Always clean up spinner**:
   ```tsx
   // ✅ Good - always completes
   try {
     setLoading(true);
     await operation();
   } finally {
     setLoading(false);
   }

   // ❌ Bad - doesn't complete on error
   setLoading(true);
   await operation(); // If this throws, spinner stays
   setLoading(false);
   ```

### Common Patterns

#### Basic Loading State
```tsx
{loading && <AtomicSpinner />}
```

#### Full Container Loading
```tsx
{loading ? (
  <AtomicSpinner fullContainer text="Loading..." />
) : (
  <Content />
)}
```

#### Button Loading
```tsx
<Button onPress={handleSubmit} disabled={loading}>
  {loading ? (
    <AtomicSpinner size="sm" color="white" />
  ) : (
    "Submit"
  )}
</Button>
```

#### Overlay Loading
```tsx
<AtomicSpinner
  overlay
  overlayColor="rgba(0, 0, 0, 0.7)"
  text="Processing..."
  color="white"
/>
```

#### With Text Position
```tsx
<AtomicSpinner
  text="Uploading..."
  textPosition="right"
  size="sm"
/>
```

#### Custom Size
```tsx
<AtomicSpinner size={32} />
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | No | `'md'` | Spinner size |
| `color` | `SpinnerColor \| string` | No | `'primary'` | Spinner color |
| `text` | `string` | No | - | Loading text |
| `textPosition` | `'bottom' \| 'right'` | No | `'bottom'` | Text position |
| `fullContainer` | `boolean` | No | `false` | Fill and center in container |
| `overlay` | `boolean` | No | `false` | Show overlay background |
| `overlayColor` | `string` | No | `'rgba(0, 0, 0, 0.5)'` | Overlay background color |
| `style` | `ViewStyle \| ViewStyle[]` | No | - | Custom style |
| `testID` | `string` | No | - | Test identifier |

### SpinnerColor

```typescript
type SpinnerColor =
  | 'primary'    // Main theme color
  | 'secondary'  // Secondary theme color
  | 'success'    // Success color
  | 'error'      // Error color
  | 'warning'    // Warning color
  | 'white';     // White
```

## Accessibility

- ✅ Screen reader announces loading state
- ✅ Accessibility label for context
- ✅ Progress bar role
- ✅ Live region announcements
- ✅ Test ID support for testing

## Performance Tips

1. **Conditional rendering**: Only render when loading
2. **Size selection**: Use appropriate size for context
3. **Avoid re-renders**: Stabilize spinner props
4. **Clean up**: Always remove spinner when complete

## Related Components

- [`AtomicProgress`](./AtomicProgress.README.md) - Determinate progress bar
- [`AtomicSkeleton`](./skeleton/AtomicSkeleton.README.md) - Skeleton placeholder
- [`EmptyState`](./EmptyState.README.md) - Empty state component

## License

MIT

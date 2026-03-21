# EmptyState

A component displayed when no data is available. Explains the situation and guides users to take action.

## Import & Usage

```typescript
import { EmptyState } from 'react-native-design-system/src/atoms/EmptyState';
```

**Location:** `src/atoms/EmptyState.tsx`

## Basic Usage

```tsx
<EmptyState
  title="No items yet"
  description="Get started by creating your first item"
/>
```

## Strategy

**Purpose**: Communicate empty states clearly and guide users to resolution.

**When to Use**:
- No data in lists/feeds (empty folders, no results)
- Error states with recovery action
- Zero-state onboarding (first-time users)
- Search returned no results
- Feature not available yet

**When NOT to Use**:
- Loading states (use AtomicSpinner or AtomicSkeleton)
- Success states (use success-specific UI)
- For decorative illustrations without context

## Rules

### Required

1. **MUST** have a `title` prop explaining the state
2. **SHOULD** provide `description` for clarity
3. **MUST** provide actionable next step if applicable
4. **ALWAYS** use appropriate icon for context
5. **SHOULD** be concise and scannable
6. **MUST** have accessible labeling
7. **ALWAYS** provide action when user can resolve

### Content Guidelines

1. **Title**: Short, clear (3-5 words)
2. **Description**: Helpful, not obvious
3. **Action**: Clear, action-oriented text
4. **Icon**: Contextually appropriate

### Action Guidelines

1. **Provide action**: If user can resolve
2. **Skip action**: If informational only
3. **Make primary**: When there's one clear action
4. **Make optional**: When multiple actions possible

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No title
<EmptyState /> {/* ❌ Missing required context */}

// ❌ Generic title
<EmptyState
  title="Empty" {/* ❌ Not helpful */}
/>

// ❌ Obvious description
<EmptyState
  title="No items"
  description="There are no items here" {/* ❌ States the obvious */}
/>

// ❌ Action without handler
<EmptyState
  actionLabel="Create item"
  // ❌ Missing onAction
/>

// ❌ Wrong icon
<EmptyState
  title="No results"
  icon="checkmark-circle" {/* ❌ Confusing - suggests success */}
/>

// ❌ Too much text
<EmptyState
  title="No items found in your search"
  description="You searched for something and we couldn't find it. Try searching again with different terms or checking your spelling." {/* ❌ Too long */}
/>
```

## Best Practices

### Clear Messaging

✅ **DO**:
```tsx
// ✅ Specific and helpful
<EmptyState
  title="No conversations yet"
  description="Start a conversation with your contacts"
  icon="chatbubbles-outline"
/>

// ✅ Action-oriented
<EmptyState
  title="No search results"
  description="Try adjusting your search terms"
  actionLabel="Clear search"
  onAction={() => setSearchQuery('')}
/>
```

❌ **DON'T**:
```tsx
// ❌ Generic
<EmptyState title="Empty" />

// ❌ Obvious description
<EmptyState
  title="No items"
  description="You have no items"
/>
```

### Appropriate Actions

✅ **DO**:
```tsx
// ✅ Clear action
<EmptyState
  title="No photos yet"
  description="Take photos to see them here"
  actionLabel="Take Photo"
  onAction={handleTakePhoto}
/>

// ✅ Multiple options
<View>
  <EmptyState
    title="No internet connection"
    description="Check your connection and try again"
    icon="wifi-outline"
  />
  <Button title="Retry" onPress={handleRetry} />
</View>
```

❌ **DON'T**:
```tsx
// ❌ Action without handler
<EmptyState
  actionLabel="Create"
  // Missing onAction
/>

// ❌ Vague action
<EmptyState
  actionLabel="Click here"
  onAction={handleAction}
/>
```

### Icon Selection

✅ **DO**:
```tsx
// ✅ Contextually appropriate
<EmptyState icon="search-outline" title="No results" />
<EmptyState icon="cart-outline" title="Cart is empty" />
<EmptyState icon="notifications-off-outline" title="No notifications" />
<EmptyState icon="wifi-outline" title="No connection" />
```

❌ **DON'T**:
```tsx
// ❌ Confusing icons
<EmptyState icon="checkmark-circle" title="No results" />
<EmptyState icon="warning" title="Empty cart" />
```

## AI Coding Guidelines

### For AI Agents

When generating EmptyState components, follow these rules:

1. **Always provide clear title**:
   ```tsx
   // ✅ Good - specific and clear
   <EmptyState title="No conversations yet" />
   <EmptyState title="Search found no results" />

   // ❌ Bad - generic
   <EmptyState title="Empty" />
   <EmptyState title="No data" />
   ```

2. **Always provide helpful description**:
   ```tsx
   // ✅ Good - helpful guidance
   <EmptyState
     title="No items"
     description="Get started by creating your first item"
   />

   // ❌ Bad - obvious or missing
   <EmptyState
     title="No items"
     description="There are no items" // Obvious
   />
   ```

3. **Always provide action when resolvable**:
   ```tsx
   // ✅ Good - actionable
   <EmptyState
     title="No photos"
     actionLabel="Take Photo"
     onAction={handleTakePhoto}
   />

   // ❌ Bad - action without handler
   <EmptyState
     actionLabel="Create"
     // Missing onAction
   />
   ```

4. **Always use appropriate icons**:
   ```tsx
   // ✅ Good - contextual
   <EmptyState icon="search-outline" title="No results" />
   <EmptyState icon="cart-outline" title="Cart empty" />

   // ❌ Bad - wrong context
   <EmptyState icon="checkmark-circle" title="No results" />
   ```

### Common Patterns

#### Basic Empty State
```tsx
<EmptyState
  title="No items yet"
  description="Items will appear here when you add them"
/>
```

#### With Action
```tsx
<EmptyState
  title="No conversations"
  description="Start messaging your contacts"
  icon="chatbubbles-outline"
  actionLabel="Start Chat"
  onAction={handleStartChat}
/>
```

#### Error State
```tsx
<EmptyState
  title="Connection Error"
  description="Check your internet connection"
  icon="wifi-outline"
  actionLabel="Retry"
  onAction={handleRetry}
/>
```

#### Search Results
```tsx
<EmptyState
  title="No results found"
  description={`No results for "${query}"`}
  icon="search-outline"
  actionLabel="Clear search"
  onAction={() => setQuery('')}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | State title |
| `description` | `string` | No | - | State description |
| `icon` | `string` | No | `'file-tray-outline'` | Icon name |
| `actionLabel` | `string` | No | - | Action button text |
| `onAction` | `() => void` | No | - | Action callback |
| `illustration` | `ReactNode` | No | - | Custom illustration |
| `style` | `ViewStyle` | No | - | Custom style |
| `testID` | `string` | No | - | Test identifier |

## Accessibility

- ✅ Screen reader announces state and action
- ✅ Semantic meaning from icon
- ✅ Touch target for action button
- ✅ Test ID support

## Performance Tips

1. **Lazy illustrations**: Load illustration images lazily
2. **Memoization**: Memo empty state component
3. **Simple icons**: Prefer icons over complex illustrations

## Related Components

- [`AtomicSkeleton`](./skeleton/AtomicSkeleton.README.md) - Skeleton loading
- [`AtomicSpinner`](./AtomicSpinner.README.md) - Loading spinner
- [`AtomicIcon`](./AtomicIcon.README.md) - Icon component

## License

MIT

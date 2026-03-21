# AtomicFab (Floating Action Button)

A Material Design 3 floating action button for primary screen actions.

## Import & Usage

```typescript
import { AtomicFab } from 'react-native-design-system/src/atoms/AtomicFab';
```

**Location:** `src/atoms/AtomicFab.tsx`

## Basic Usage

```tsx
<ScreenLayout>
  <ScrollView>{/* Content */}</ScrollView>
  <AtomicFab icon="add" onPress={handleAdd} />
</ScreenLayout>
```

## Strategy

**Purpose**: Promote the primary action on a screen.

**When to Use**:
- Primary screen action (add item, create new)
- Frequently used action
- Single positive action (create, add, share)
- Destructive action when it's the only option

**When NOT to Use**:
- In ScrollView (MUST be at ScreenLayout level)
- For multiple actions of equal importance
- For non-primary actions
- For actions that are context-specific to list items

## Rules

### Required

1. **MUST** be at ScreenLayout level (NOT in ScrollView)
2. **ALWAYS** provide `icon` and `onPress`
3. **SHOULD** use `primary` variant for main action
4. **MUST** have accessibility label
5. **ALWAYS** use appropriate icon for action
6. **SHOULD** be the only FAB on screen
7. **MUST** not overlap important content

### Positioning

1. **Default**: Bottom-right corner
2. **Safe area**: Respects safe area insets
3. **Above navigation**: Above tab bar if present
4. **Manual**: Can position manually with style

### Variants

1. **primary**: Main action (default)
2. **secondary**: Secondary action
3. **surface**: Surface-level action

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ FAB in ScrollView
<ScrollView>
  <Content />
  <AtomicFab icon="add" onPress={handleAdd} /> {/* ❌ Wrong level */}
</ScrollView>

// ❌ Missing accessibility
<AtomicFab
  icon="add"
  onPress={handleAdd}
  // ❌ No accessibilityLabel
/>

// ❌ Wrong icon for action
<AtomicFab
  icon="trash" {/* ❌ FAB should be positive action */}
  onPress={handleDelete}
/>

// ❌ Multiple FABs
<ScreenLayout>
  <AtomicFab icon="add" onPress={handleAdd} />
  <AtomicFab icon="edit" onPress={handleEdit} /> {/* ❌ Too many */}
</ScreenLayout>

// ❌ Unnecessary variant
<AtomicFab
  icon="share"
  variant="surface" {/* Should use default primary */}
  onPress={handleShare}
/>
```

## Best Practices

### ScreenLayout Level

✅ **DO**:
```tsx
<ScreenLayout>
  <ScrollView>
    <Content />
  </ScrollView>
  <AtomicFab icon="add" onPress={handleAdd} />
</ScreenLayout>
```

❌ **DON'T**:
```tsx
// ❌ In ScrollView
<ScrollView>
  <Content />
  <AtomicFab icon="add" onPress={handleAdd} />
</ScrollView>
```

### Icon Selection

✅ **DO**:
```tsx
// ✅ Positive, clear actions
<AtomicFab icon="add" onPress={handleAdd} />
<AtomicFab icon="create" onPress={handleEdit} />
<AtomicFab icon="chatbubble" onPress={handleMessage} />
```

❌ **DON'T**:
```tsx
// ❌ Negative actions
<AtomicFab icon="trash" onPress={handleDelete} />
<AtomicFab icon="close" onPress={handleClose} />
```

### Accessibility

✅ **DO**:
```tsx
<AtomicFab
  icon="add"
  onPress={handleAdd}
  accessibilityLabel="Add new item"
/>
```

❌ **DON'T**:
```tsx
// ❌ No label
<AtomicFab icon="add" onPress={handleAdd} />
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicFab components, follow these rules:

1. **Always place at ScreenLayout level**:
   ```tsx
   // ✅ Good
   <ScreenLayout>
     <ScrollView>{/* Content */}</ScrollView>
     <AtomicFab icon="add" onPress={handleAdd} />
   </ScreenLayout>

   // ❌ Bad
   <ScrollView>
     <Content />
     <AtomicFab icon="add" onPress={handleAdd} />
   </ScrollView>
   ```

2. **Always use positive actions**:
   ```tsx
   // ✅ Good
   <AtomicFab icon="add" onPress={handleAdd} />
   <AtomicFab icon="create" onPress={handleCreate} />

   // ❌ Bad
   <AtomicFab icon="trash" onPress={handleDelete} />
   <AtomicFab icon="close" onPress={handleClose} />
   ```

3. **Always provide accessibility label**:
   ```tsx
   // ✅ Good
   <AtomicFab
     icon="add"
     onPress={handleAdd}
     accessibilityLabel="Create new item"
   />

   // ❌ Bad
   <AtomicFab icon="add" onPress={handleAdd} />
   ```

4. **Never use multiple FABs**:
   ```tsx
   // ❌ Bad - multiple FABs
   <ScreenLayout>
     <AtomicFab icon="add" />
     <AtomicFab icon="edit" />
   </ScreenLayout>
   ```

### Common Patterns

#### Basic FAB
```tsx
<ScreenLayout>
  <ScrollView>{/* Content */}</ScrollView>
  <AtomicFab icon="add" onPress={handleAdd} />
</ScreenLayout>
```

#### With Custom Position
```tsx
<AtomicFab
  icon="add"
  onPress={handleAdd}
  style={{ bottom: 100 }}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `string` | Yes | - | Icon name (Ionicons) |
| `onPress` | `() => void` | Yes | - | Press callback |
| `variant` | `'primary' \| 'secondary' \| 'surface'` | No | `'primary'` | FAB variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | FAB size |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `accessibilityLabel` | `string` | No | - | Accessibility label |

## Accessibility

- ✅ Touch target size (min 40x40)
- ✅ Screen reader support
- ✅ Accessibility label
- ✅ Semantic role (button)

## Performance Tips

1. **Stabilize onPress**: Use useCallback
2. **Single FAB**: Only one per screen
3. **Avoid re-renders**: Memo FAB wrapper

## Related Components

- [`AtomicButton`](./AtomicButton.README.md) - Regular button
- [`AtomicIcon`](./AtomicIcon.README.md) - Icon component
- [`ScreenLayout`](../layouts/ScreenLayout) - Screen layout

## License

MIT

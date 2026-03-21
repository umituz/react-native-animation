# Swipe Actions

Swipeable action buttons for list items that reveal quick actions (delete, edit, archive, etc.) when users swipe left or right.

## Import & Usage

```typescript
import { SwipeActionButton } from 'react-native-design-system/src/molecules/swipe-actions';
```

**Location:** `src/molecules/swipe-actions/SwipeActionButton.tsx`

## Basic Usage

```tsx
<SwipeActionButton
  action={{
    label: 'Delete',
    icon: 'trash-outline',
    color: '#ef4444',
    onPress: handleDelete,
  }}
  position={0}
  totalActions={1}
  direction="right"
/>
```

## Strategy

**Purpose**: Provide quick actions for list items through intuitive swipe gestures, improving efficiency in list interactions.

**When to Use**:
- Email clients (archive, delete, mark read)
- Task management (complete, snooze, delete)
- File managers (share, rename, delete)
- Message threads (reply, forward, delete)
- Contact lists (call, message, favorite)
- Shopping cart (wishlist, remove)

**When NOT to Use**:
- For critical confirmations (use modal instead)
- For complex multi-step actions
- For actions that require additional input
- For primary actions (use main buttons instead)

## Rules

### Required

1. **MUST** provide an `action` object with label, icon, and onPress
2. **MUST** specify `position` and `totalActions` for proper sizing
3. **MUST** specify `direction` (left or right swipe)
4. **ALWAYS** use haptic feedback for better UX
5. **SHOULD** limit to 2-3 actions per direction
6. **MUST** have clear, descriptive labels
7. **NEVER** use swipe actions for critical destructive actions without confirmation

### Action Placement

1. **Right swipe**: Destructive actions (delete, remove)
2. **Left swipe**: Common actions (edit, share, archive)
3. **Most common**: Position closest to content
4. **Color coding**: Red for destructive, themed for others

### Haptic Feedback

1. **Destructive actions**: Heavy intensity
2. **Secondary actions**: Medium intensity
3. **Always enable**: Haptics improve UX
4. **Respect settings**: Follow system preferences

### Color Guidelines

1. **Destructive**: Red (#ef4444)
2. **Success**: Green (#10b981)
3. **Primary**: Theme primary color
4. **Warning**: Orange/Amber (#f59e0b)

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Missing required props
<SwipeActionButton
  action={{ label: 'Delete' }}
  // Missing position, totalActions, direction
/>

// ❌ Destructive action without confirmation
<SwipeActionButton
  action={{
    label: 'Delete',
    icon: 'trash-outline',
    onPress: () => deleteAccount() // ❌ No confirmation
  }}
  position={0}
  totalActions={1}
  direction="right"
/>

// ❌ Too many actions
<SwipeActionButton
  action={action1}
  position={0}
  totalActions={5} // ❌ Too many
  direction="left"
/>

// ❌ Vague labels
<SwipeActionButton
  action={{
    label: 'OK', // ❌ Not descriptive
    icon: 'checkmark-outline',
    onPress: handleOK,
  }}
  position={0}
  totalActions={1}
  direction="left"
/>

// ❌ No haptic feedback
<SwipeActionButton
  action={{
    label: 'Delete',
    icon: 'trash-outline',
    enableHaptics: false, // ❌ Should have haptics
    onPress: handleDelete,
  }}
  position={0}
  totalActions={1}
  direction="right"
/>

// ❌ Wrong color semantics
<SwipeActionButton
  action={{
    label: 'Delete',
    color: '#10b981', // ❌ Green for delete
    onPress: handleDelete,
  }}
  position={0}
  totalActions={1}
  direction="right"
/>
```

## Best Practices

### Email Actions

✅ **DO**:
```tsx
<SwipeActionButton
  action={{
    label: 'Archive',
    icon: 'archive-outline',
    colorKey: 'primary',
    enableHaptics: true,
    hapticsIntensity: 'Medium',
    onPress: handleArchive,
  }}
  position={0}
  totalActions={2}
  direction="right"
/>
```

❌ **DON'T**:
```tsx
// ❌ Delete without confirmation
<SwipeActionButton
  action={{
    label: 'Delete',
    icon: 'trash-outline',
    onPress: () => deleteEmail() // No confirmation
  }}
  position={0}
  totalActions={1}
  direction="right"
/>
```

### Task Completion

✅ **DO**:
```tsx
<SwipeActionButton
  action={{
    label: 'Complete',
    icon: 'checkmark-circle-outline',
    colorKey: 'success',
    enableHaptics: true,
    hapticsIntensity: 'Heavy',
    onPress: handleComplete,
  }}
  position={0}
  totalActions={1}
  direction="right"
/>
```

### Action Organization

✅ **DO**:
```tsx
// ✅ Right swipe - destructive
<SwipeActionButton
  action={{ label: 'Delete', icon: 'trash-outline', colorKey: 'error' }}
  position={0}
  totalActions={1}
  direction="right"
/>

// ✅ Left swipe - common actions
<SwipeActionButton
  action={{ label: 'Edit', icon: 'create-outline', colorKey: 'primary' }}
  position={0}
  totalActions={2}
  direction="left"
/>
<SwipeActionButton
  action={{ label: 'Share', icon: 'share-outline', colorKey: 'primary' }}
  position={1}
  totalActions={2}
  direction="left"
/>
```

## AI Coding Guidelines

### For AI Agents

When generating SwipeActionButton components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { SwipeActionButton } from 'react-native-design-system/src/molecules/swipe-actions';
   ```

2. **Always provide all required props**:
   ```tsx
   <SwipeActionButton
     action={{
       label: '具体的动作名称',
       icon: '合适的图标',
       colorKey: '根据动作类型选择颜色',
       enableHaptics: true,
       onPress: 具体处理函数,
     }}
     position={位置索引}
     totalActions={该方向的总动作数}
     direction="left 或 right"
   />
   ```

3. **Always add confirmation for destructive actions**:
   ```tsx
   // ✅ Good - with confirmation
   action={{
     label: 'Delete',
     icon: 'trash-outline',
     colorKey: 'error',
     onPress: () => {
       Alert.alert(
         'Confirm Delete',
         'This action cannot be undone',
         [
           { text: 'Cancel', style: 'cancel' },
           { text: 'Delete', style: 'destructive', onPress: handleDelete },
         ]
       );
     },
   }}

   // ❌ Bad - immediate action
   action={{
     label: 'Delete',
     onPress: handleDelete, // No confirmation
   }}
   ```

4. **Always use semantic colors**:
   ```tsx
   // ✅ Good - semantic color mapping
   const getColorByActionType = (type: 'delete' | 'edit' | 'archive') => {
     switch (type) {
       case 'delete': return 'error';
       case 'edit': return 'primary';
       case 'archive': return 'tertiary';
       default: return 'primary';
     }
   };
   ```

5. **Always enable haptic feedback**:
   ```tsx
   // ✅ Good - haptics enabled
   action={{
     label: 'Complete',
     icon: 'checkmark-circle-outline',
     enableHaptics: true,
     hapticsIntensity: 'Heavy',
     onPress: handleComplete,
   }}
   ```

### Common Patterns

#### Email Swipe Actions
```tsx
<>
  {/* Right swipe - archive & delete */}
  <SwipeActionButton
    action={{
      label: 'Archive',
      icon: 'archive-outline',
      colorKey: 'primary',
      enableHaptics: true,
      onPress: handleArchive,
    }}
    position={0}
    totalActions={2}
    direction="right"
  />
  <SwipeActionButton
    action={{
      label: 'Delete',
      icon: 'trash-outline',
      colorKey: 'error',
      enableHaptics: true,
      onPress: () => showDeleteConfirmation(emailId),
    }}
    position={1}
    totalActions={2}
    direction="right"
  />

  {/* Left swipe - mark read & mute */}
  <SwipeActionButton
    action={{
      label: 'Mark Read',
      icon: 'checkmark-done-outline',
      colorKey: 'success',
      enableHaptics: true,
      onPress: handleMarkRead,
    }}
    position={0}
    totalActions={2}
    direction="left"
  />
</>
```

#### Task Swipe Actions
```tsx
<SwipeActionButton
  action={{
    label: 'Complete',
    icon: 'checkmark-circle-outline',
    colorKey: 'success',
    enableHaptics: true,
    hapticsIntensity: 'Heavy',
    onPress: handleComplete,
  }}
  position={0}
  totalActions={1}
  direction="right"
/>
```

#### File Swipe Actions
```tsx
<>
  <SwipeActionButton
    action={{
      label: 'Share',
      icon: 'share-outline',
      colorKey: 'primary',
      enableHaptics: true,
      onPress: handleShare,
    }}
    position={0}
    totalActions={2}
    direction="left"
  />
  <SwipeActionButton
    action={{
      label: 'Rename',
      icon: 'create-outline',
      colorKey: 'tertiary',
      enableHaptics: true,
      onPress: handleRename,
    }}
    position={1}
    totalActions={2}
    direction="left"
  />
  <SwipeActionButton
    action={{
      label: 'Delete',
      icon: 'trash-outline',
      colorKey: 'error',
      enableHaptics: true,
      onPress: () => showDeleteConfirmation(fileId),
    }}
    position={0}
    totalActions={1}
    direction="right"
  />
</>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `action` | `SwipeActionConfig` | **Yes** | - | Action configuration |
| `position` | `number` | **Yes** | - | Button position index (0-based) |
| `totalActions` | `number` | **Yes** | - | Total number of actions in this direction |
| `direction` | `'left' \| 'right'` | **Yes** | - | Swipe direction |
| `style` | `ViewStyle` | No | - | Custom container style |

### SwipeActionConfig

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | **Yes** | - | Button label |
| `icon` | `string` | **Yes** | - | Icon name (Ionicons) |
| `onPress` | `() => void` | **Yes** | - | Press callback |
| `color` | `string` | No | - | Custom color (hex) |
| `colorKey` | `string` | No | - | Theme color key |
| `enableHaptics` | `boolean` | No | `true` | Enable haptic feedback |
| `hapticsIntensity` | `'Light' \| 'Medium' \| 'Heavy'` | No | `'Medium'` | Haptic intensity |

## Accessibility

- ✅ Screen reader announces action label
- ✅ Touch target size maintained (min 44x44pt)
- ✅ Sufficient color contrast
- ✅ Semantic action roles
- ✅ Haptic feedback for tactile feedback

## Performance Tips

1. **Memo action callbacks**: Use useCallback for onPress handlers
2. **Limit actions**: Max 2-3 actions per direction
3. **Debounce**: Debounce rapid swipe actions
4. **Optimize re-renders**: Memo action configuration objects

## Related Components

- [`ListItem`](../listitem/README.md) - List item component
- [`BaseModal`](../BaseModal/README.md) - Modal for confirmations
- [`AlertInline`](../alerts/README.md) - Alert components

## License

MIT

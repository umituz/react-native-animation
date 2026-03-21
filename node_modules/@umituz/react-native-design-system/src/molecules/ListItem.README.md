# ListItem

A versatile list item component with title, subtitle, and optional icons for menus, settings, and navigation lists.

## Import & Usage

```typescript
import { ListItem } from 'react-native-design-system/src/molecules/listitem';
```

**Location:** `src/molecules/listitem/ListItem.tsx`

## Basic Usage

```tsx
<ListItem
  title="Settings"
  subtitle="Configure your preferences"
  leftIcon="settings-outline"
  rightIcon="chevron-forward-outline"
  onPress={() => navigateTo('Settings')}
/>
```

## Strategy

**Purpose**: Provide a consistent, accessible list item component for navigation, settings, and content display.

**When to Use**:
- Navigation menus and drawers
- Settings pages
- User lists and contacts
- File/item listings
- Action menus (edit, share, delete)
- Selection lists (radio buttons, checkboxes)

**When NOT to Use**:
- For card-based content (use AtomicCard instead)
- For complex row layouts (use custom View instead)
- For table data (use Table component instead)
- For simple dividers (use Divider instead)

## Rules

### Required

1. **MUST** have a `title` prop
2. **ALWAYS** provide `onPress` when item is interactive
3. **SHOULD** have descriptive icons (leftIcon for context, rightIcon for navigation)
4. **MUST** have proper touch feedback when pressable
5. **SHOULD** keep subtitles concise (1 line max recommended)
6. **ALWAYS** use unique `key` props when rendering lists
7. **MUST** respect disabled state (no feedback)

### Icon Usage

1. **Left icon**: Use for context/category (settings, profile, notifications)
2. **Right icon**: Use for navigation indication (chevron, checkmark)
3. **Consistency**: Use same icon style within list
4. **Size**: Use appropriate icon size (md recommended)

### Press Behavior

1. **Must have onPress**: Always provide when using rightIcon for navigation
2. **Visual feedback**: Show press effect
3. **Disabled state**: No press effect when disabled
4. **Action delay**: Add confirmation for destructive actions

### Content Guidelines

1. **Title**: Clear, concise (1-2 words recommended)
2. **Subtitle**: Additional context, max 1 line
3. **Truncation**: Titles should not wrap awkwardly
4. **Grouping**: Use dividers or section headers for groups

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No title
<ListItem
  // Missing title prop
  subtitle="No title"
/>

// ❌ Right icon without press handler
<ListItem
  title="Settings"
  rightIcon="chevron-forward-outline" // ❌ Indicates navigation
  // Missing onPress
/>

// ❌ Generic icons
<ListItem
  title="Settings"
  leftIcon="ellipse-outline" // ❌ Not descriptive
/>

// ❌ Too long subtitle
<ListItem
  title="User"
  subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore" // ❌ Too long
/>

// ❌ Destructive action without confirmation
<ListItem
  title="Delete Account"
  leftIcon="trash-outline"
  onPress={() => deleteAccount()} // ❌ No confirmation
/>

// ❌ Missing keys in lists
{items.map((item) => (
  <ListItem
    title={item.title} // ❌ No key prop
  />
))}

// ❌ Disabled but pressable
<ListItem
  title="Premium Feature"
  disabled
  onPress={() => {}} // ❌ Should not have onPress when disabled
/>
```

## Best Practices

### Navigation Items

✅ **DO**:
```tsx
<ListItem
  title="Settings"
  leftIcon="settings-outline"
  rightIcon="chevron-forward-outline"
  onPress={() => navigation.navigate('Settings')}
/>
```

❌ **DON'T**:
```tsx
// ❌ Navigation indicator without action
<ListItem
  title="Settings"
  rightIcon="chevron-forward-outline"
  // Missing onPress
/>
```

### Icon Selection

✅ **DO**:
```tsx
// Descriptive icons
<ListItem
  title="Notifications"
  leftIcon="notifications-outline"
/>
<ListItem
  title="Profile"
  leftIcon="person-outline"
/>
```

❌ **DON'T**:
```tsx
// Generic icons
<ListItem
  title="Notifications"
  leftIcon="ellipse-outline" // ❌ Not descriptive
/>
```

### List Rendering

✅ **DO**:
```tsx
{users.map((user) => (
  <ListItem
    key={user.id} // ✅ Unique key
    title={user.name}
    subtitle={user.email}
    onPress={() => navigateToUser(user.id)}
  />
))}
```

❌ **DON'T**:
```tsx
{users.map((user, index) => (
  <ListItem
    key={index} // ❌ Index as key
    title={user.name}
  />
))}
```

### Destructive Actions

✅ **DO**:
```tsx
<ListItem
  title="Delete Account"
  leftIcon="trash-outline"
  onPress={() => {
    showConfirmation({
      title: 'Delete Account',
      message: 'This action cannot be undone',
      onConfirm: deleteAccount,
    });
  }}
/>
```

❌ **DON'T**:
```tsx
<ListItem
  title="Delete Account"
  leftIcon="trash-outline"
  onPress={() => deleteAccount()} // ❌ No confirmation
/>
```

## AI Coding Guidelines

### For AI Agents

When generating ListItem components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { ListItem } from 'react-native-design-system/src/molecules/listitem';
   ```

2. **Always provide a title**:
   ```tsx
   // ✅ Good
   <ListItem
     title="Settings"
     onPress={handlePress}
   />

   // ❌ Bad - no title
   <ListItem
     onPress={handlePress}
   />
   ```

3. **Always match icons with context**:
   ```tsx
   // ✅ Good - descriptive icons
   const iconMap = {
     settings: 'settings-outline',
     profile: 'person-outline',
     notifications: 'notifications-outline',
     privacy: 'shield-checkmark-outline',
   };

   // ❌ Bad - generic icons
   const icons = ['ellipse-outline', 'circle-outline'];
   ```

4. **Always use unique keys in lists**:
   ```tsx
   // ✅ Good - unique ID as key
   {items.map((item) => (
     <ListItem
       key={item.id}
       title={item.title}
       onPress={() => handleItem(item)}
     />
   ))}

   // ❌ Bad - index as key
   {items.map((item, index) => (
     <ListItem
       key={index}
       title={item.title}
     />
   ))}
   ```

5. **Always add confirmation for destructive actions**:
   ```tsx
   // ✅ Good - confirmation dialog
   <ListItem
     title="Delete"
     leftIcon="trash-outline"
     onPress={() => {
       Alert.alert(
         'Confirm Delete',
         'This action cannot be undone',
         [
           { text: 'Cancel', style: 'cancel' },
           { text: 'Delete', style: 'destructive', onPress: handleDelete },
         ]
       );
     }}
   />

   // ❌ Bad - immediate action
   <ListItem
     title="Delete"
     leftIcon="trash-outline"
     onPress={handleDelete} // No confirmation
   />
   ```

### Common Patterns

#### Settings Menu Item
```tsx
<ListItem
  title="Settings"
  leftIcon="settings-outline"
  rightIcon="chevron-forward-outline"
  onPress={() => navigation.navigate('Settings')}
/>
```

#### User List Item
```tsx
{users.map((user) => (
  <ListItem
    key={user.id}
    title={user.name}
    subtitle={user.email}
    leftIcon="person-outline"
    onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
  />
))}
```

#### Selection List Item
```tsx
{options.map((option) => (
  <ListItem
    key={option.id}
    title={option.title}
    leftIcon={option.icon}
    rightIcon={selectedId === option.id ? 'checkmark' : undefined}
    onPress={() => setSelectedId(option.id)}
  />
))}
```

#### Action Menu Item
```tsx
<ListItem
  title="Edit"
  leftIcon="create-outline"
  rightIcon="chevron-forward-outline"
  onPress={() => onAction('edit')}
/>
```

#### Contact Item
```tsx
<ListItem
  title={contact.name}
  subtitle={contact.phone}
  leftIcon="person-outline"
  rightIcon="call-outline"
  onPress={() => Linking.openURL(`tel:${contact.phone}`)}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Primary text |
| `subtitle` | `string` | No | - | Secondary text |
| `leftIcon` | `string` | No | - | Left icon name (Ionicons) |
| `rightIcon` | `string` | No | - | Right icon name (Ionicons) |
| `onPress` | `() => void` | No | - | Press callback |
| `disabled` | `boolean` | No | `false` | Disable the item |
| `style` | `ViewStyle` | No | - | Custom container style |

## Accessibility

- ✅ Screen reader announces title and subtitle
- ✅ Touch target size maintained (min 44x44pt)
- ✅ Press feedback for screen readers
- ✅ Disabled state announced
- ✅ Semantic list item role
- ✅ Icon accessibility labels

## Performance Tips

1. **Memoization**: Memo ListItem components for large lists
2. **Unique keys**: Always use unique IDs as keys (not index)
3. **Avoid inline functions**: Use useCallback for onPress handlers
4. **FlatList**: Use FlatList for long lists instead of map

## Related Components

- [`List`](../List/README.md) - List container component
- [`Avatar`](../avatar/README.md) - User avatar component
- [`Divider`](../Divider/README.md) - List divider component
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - Icon component

## License

MIT

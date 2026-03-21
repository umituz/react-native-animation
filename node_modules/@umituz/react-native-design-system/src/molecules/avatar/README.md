# Avatar

Avatar is an advanced component for displaying user profile images with support for initials, icon fallbacks, and online status indicators.

## Import & Usage

```typescript
import { Avatar } from 'react-native-design-system/src/molecules/avatar';
```

**Location:** `src/molecules/avatar/Avatar.tsx`

## Basic Usage

```tsx
<Avatar
  uri="https://example.com/avatar.jpg"
  size="md"
/>
```

## Strategy

**Purpose**: Provide a flexible, accessible avatar component that handles various content types (images, initials, icons) with consistent styling.

**When to Use**:
- User profile pictures
- Team member displays
- Chat/conversation lists
- User selectors
- Online status indicators

**When NOT to Use**:
- For decorative images - use Image component
- For logos/branding - use dedicated logo component
- For complex graphics - use custom component

## Rules

### Required

1. **ALWAYS** provide at least one: `uri`, `name`, or `icon`
2. **MUST** handle missing images gracefully
3. **NEVER** use broken or invalid image URLs
4. **ALWAYS** provide accessibility labels
5. **MUST** maintain appropriate size for context

### Content Priority

1. **ALWAYS** prioritize: `uri` > `name` (initials) > `icon`
2. **MUST** fallback gracefully if image fails
3. **SHOULD** provide name for accessibility
4. **NEVER** show empty avatar

### Status Indicator

1. **ALWAYS** set `showStatus` to enable status
2. **MUST** provide valid `status` value when shown
3. **SHOULD** reflect actual user status
4. **NEVER** show status without `showStatus` prop

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Empty avatar
<Avatar /> {/* No content */}

// ❌ Invalid URI
<Avatar uri="not-a-valid-url" />

// ❌ Too many props
<Avatar
  uri="image.jpg"
  name="John"
  icon="person" // ❌ URI takes priority
/>

// ❌ Status without showStatus
<Avatar
  uri="image.jpg"
  status="online" // ❌ Missing showStatus
/>

// ❌ Wrong size for context
<Avatar
  uri="image.jpg"
  size="xl" // Too big for list item
/>

// ❌ No accessibility
<Avatar uri="image.jpg" /> {/* Missing accessibilityLabel */}

// ❌ Hardcoded status
<Avatar
  uri="image.jpg"
  showStatus
  status="online" // ❌ Should reflect actual status
/>
```

## Best Practices

### Size Selection

✅ **DO**:
```tsx
// List items - small
<Avatar size="sm" />

// Standard display - medium
<Avatar size="md" />

// Profile page - large
<Avatar size="xl" />
```

❌ **DON'T**:
```tsx
// Don't use wrong size for context
<ListItem>
  <Avatar size="xl" /> {/* ❌ Too big for list */}
</ListItem>
```

### Status Usage

✅ **DO**:
```tsx
// Show actual status
<Avatar
  uri={user.avatar}
  showStatus
  status={user.isOnline ? 'online' : 'offline'}
/>
```

❌ **DON'T**:
```tsx
// Don't fake status
<Avatar
  uri="image.jpg"
  showStatus
  status="online" // ❌ Not real status
/>
```

### Fallback Hierarchy

✅ **DO**:
```tsx
// 1. Image with name fallback
<Avatar
  uri={avatarUri}
  name="John Doe"
/>

// 2. Name only
<Avatar name="John Doe" /> {/* Shows "JD" */}

// 3. Icon fallback
<Avatar icon="person-outline" />
```

❌ **DON'T**:
```tsx
// Don't provide unnecessary props
<Avatar
  uri="image.jpg"
  name="John Doe"
  icon="person" // ❌ Unnecessary
/>
```

## AI Coding Guidelines

### For AI Agents

When generating Avatar components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { Avatar } from 'react-native-design-system/src/molecules/avatar';
   ```

2. **Always provide content**:
   ```tsx
   // ✅ Good - With fallback
   <Avatar
     uri={user.avatar}
     name={user.name}
   />

   // ❌ Bad - No fallback
   <Avatar uri={user.avatar} />
   ```

3. **Always use appropriate size**:
   ```tsx
   // List items
   <Avatar size="sm" />

   // Standard
   <Avatar size="md" />

   // Profile
   <Avatar size="lg" />

   // Featured
   <Avatar size="xl" />
   ```

4. **Always handle status correctly**:
   ```tsx
   // ❌ Bad
   <Avatar
     uri="image.jpg"
     status="online" // Missing showStatus
   />

   // ✅ Good
   <Avatar
     uri="image.jpg"
     showStatus
     status={user.isOnline ? 'online' : 'offline'}
   />
   ```

5. **Never forget accessibility**:
   ```tsx
   // ❌ Bad
   <Avatar uri="image.jpg" />

   // ✅ Good
   <Avatar
     uri="image.jpg}
     name="John Doe"
     accessibilityLabel="John Doe's profile picture"
   />
   ```

### Common Patterns

#### User List Item
```tsx
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Avatar
    uri={user.avatar}
    name={user.name}
    size="md"
    showStatus
    status={user.isOnline ? 'online' : 'offline'}
    style={{ marginRight: 12 }}
  />

  <View>
    <Text type="bodyLarge">{user.name}</Text>
    <Text type="bodySmall" color="secondary">@{user.username}</Text>
  </View>
</View>
```

#### Profile Header
```tsx
<View style={{ alignItems: 'center', padding: 24 }}>
  <Avatar
    uri={user.avatar}
    name={user.name}
    size="xl"
    showStatus
    status={user.status}
    style={{ marginBottom: 16 }}
  />

  <Text type="headlineSmall">{user.name}</Text>
  <Text type="bodyMedium" color="secondary">@{user.username}</Text>
</View>
```

#### Avatar Group
```tsx
<View style={{ flexDirection: 'row' }}>
  {users.slice(0, 3).map((user, index) => (
    <Avatar
      key={user.id}
      uri={user.avatar}
      name={user.name}
      size="sm"
      style={{ marginLeft: index > 0 ? -8 : 0 }}
    />
  ))}

  {users.length > 3 && (
    <View style={{ marginLeft: -8 }}>
      <Avatar name={`+${users.length - 3}`} size="sm" />
    </View>
  )}
</View>
```

#### Pressable Avatar
```tsx
<Avatar
  uri={user.avatar}
  name={user.name}
  size="lg"
  onPress={() => navigation.navigate('Profile', { userId: user.id })}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `uri` | `string` | No | - | Image URI |
| `name` | `string` | No | - | User name (for initials) |
| `icon` | `string` | No | - | Fallback icon name |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | No | `'md'` | Avatar size |
| `shape` | `'circle' \| 'square'` | No | `'circle'` | Avatar shape |
| `backgroundColor` | `string` | No | - | Custom background color |
| `showStatus` | `boolean` | No | `false` | Show status indicator |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | No | `'offline'` | Status type |
| `onPress` | `() => void` | No | - | Press handler |
| `accessibilityLabel` | `string` | No | - | Accessibility label |

### Size Values

| Size | Dimensions | Use Case |
|------|------------|----------|
| `xs` | 24x24pt | Compact lists |
| `sm` | 32x32pt | Standard lists |
| `md` | 40x40pt | Default size |
| `lg` | 56x56pt | Featured items |
| `xl` | 80x80pt | Profile pages |

### Status Types

| Status | Color | Meaning |
|--------|-------|---------|
| `online` | Green | Available |
| `offline` | Gray | Offline |
| `away` | Yellow | Away |
| `busy` | Red | Busy |

## Accessibility

- ✅ Screen reader announces user name
- ✅ FaceID support for status
- ✅ Touch target: minimum 44x44pt
- ✅ Accessibility label support
- ✅ Test ID support for testing

## Performance

1. **Image caching**: Enable image caching
2. **Lazy loading**: Use in long lists
3. **Optimization**: Resize images appropriately
4. **Memoization**: Memo avatar components in lists

## Related Components

- [`AvatarGroup`](./AvatarGroup/README.md) - Avatar group component
- [`AtomicAvatar`](../../atoms/AtomicAvatar/README.md) - Atom avatar component
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - Icon component
- [`MediaCard`](../media-card/README.md) - Media card component

## License

MIT

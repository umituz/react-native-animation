# AtomicAvatar

A user profile image component with fallback to initials when image is not available.

## Import & Usage

```typescript
import { AtomicAvatar } from 'react-native-design-system/src/atoms/AtomicAvatar';
```

**Location:** `src/atoms/AtomicAvatar.tsx`

## Basic Usage

```tsx
<AtomicAvatar name="John Doe" />
```

## Strategy

**Purpose**: Display user profile pictures with automatic fallback to initials when image unavailable.

**When to Use**:
- User profile images in lists or cards
- Comment/user activity sections
- Navigation headers with user info
- Team member displays
- Anywhere user identity needs visual representation

**When NOT to Use**:
- For non-user images (products, content) - use Image component
- When initials don't make sense (company logos, icons)
- For decorative images without user context

## Rules

### Required

1. **MUST** provide either `source` or `name` prop
2. **ALWAYS** use appropriate size for context
3. **SHOULD** provide `name` even when using image (for fallback)
4. **MUST** maintain accessible labeling
5. **ALWAYS** handle image loading errors gracefully
6. **SHOULD** use consistent sizes across related contexts
7. **MUST** not use for non-user avatars

### Size Selection

1. **xs (24px)**: Inline text, tiny mentions
2. **sm (32px)**: List items, compact displays
3. **md (40px)**: Default, most use cases
4. **lg (56px)**: Cards, profile headers
5. **xl (80px)**: Profile pages, large displays
6. **xxl (120px)**: Hero sections, featured profiles

### Initials Fallback

1. **Single name**: First letter
2. **Two names**: First letter of each (John Doe → JD)
3. **Three+ names**: First letter of first two names
4. **No name**: Shows "?" placeholder

### Image Loading

1. **Cache images**: Use FastImage or cached images
2. **Handle errors**: Always provide name fallback
3. **Lazy load**: In lists, use lazy loading

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No source or name
<AtomicAvatar /> {/* ❌ Shows "?" */}

// ❌ Wrong size for context
<AtomicList>
  <AtomicItem>
    <AtomicAvatar size="xxl" /> {/* ❌ Too large for list */}
  </AtomicItem>
</AtomicList>

// ❌ No name fallback
<AtomicAvatar
  source={{ uri: avatarUrl }}
  // ❌ No name, shows "?" if image fails
/>

// ❌ Name for non-user
<AtomicAvatar
  name="Product Name"
  source={{ uri: productImage }}
  // ❌ Should use Image component
/>

// ❌ Inconsistent sizes in list
<FlatList
  data={users}
  renderItem={({ item }) => (
    <UserItem>
      <AtomicAvatar
        name={item.name}
        size={item.index % 2 === 0 ? 'sm' : 'lg'} {/* ❌ Inconsistent */}
      />
    </UserItem>
  )}
/>

// ❌ Hardcoded border radius on circular avatar
<AtomicAvatar
  name="John"
  borderRadius={8} {/* ❌ Avatar is meant to be circular */}
/>
```

## Best Practices

### Size Selection

✅ **DO**:
```tsx
// ✅ List items
<FlatList
  data={users}
  renderItem={({ item }) => (
    <ListItem>
      <AtomicAvatar name={item.name} size="sm" />
    </ListItem>
  )}
/>

// ✅ Profile header
<AtomicAvatar name={user.name} size="xxl" />

// ✅ Default size
<AtomicAvatar name="John Doe" /> {/* md (40px) */}
```

❌ **DON'T**:
```tsx
// ❌ Wrong sizes
<ListItem>
  <AtomicAvatar name="John" size="xxl" /> {/* Too large */}
</ListItem>

<ProfileHeader>
  <AtomicAvatar name="John" size="xs" /> {/* Too small */}
</ProfileHeader>
```

### Fallback Handling

✅ **DO**:
```tsx
// ✅ Always provide name
<AtomicAvatar
  source={{ uri: user.avatar }}
  name={user.name} // Fallback to initials
/>

// ✅ Handle missing data
<AtomicAvatar
  name={user.name || 'Unknown User'}
  source={user.avatar ? { uri: user.avatar } : undefined}
/>
```

❌ **DON'T**:
```tsx
// ❌ No fallback
<AtomicAvatar
  source={{ uri: user.avatar }}
  // Shows "?" if image fails
/>

// ❌ Empty name
<AtomicAvatar name="" />
```

### Avatar Groups

✅ **DO**:
```tsx
// ✅ Overlapping avatars
<View style={{ flexDirection: 'row' }}>
  {users.slice(0, 3).map((user, index) => (
    <AtomicAvatar
      key={user.id}
      name={user.name}
      size="sm"
      style={{ marginLeft: index > 0 ? -8 : 0 }}
    />
  ))}
  {users.length > 3 && (
    <View style={{
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: tokens.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -8,
    }}>
      <AtomicText type="labelSmall">+{users.length - 3}</AtomicText>
    </View>
  )}
</View>
```

### Status Indicators

✅ **DO**:
```tsx
// ✅ Online status
<View style={{ position: 'relative' }}>
  <AtomicAvatar name={user.name} size="lg" />
  {user.isOnline && (
    <View style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: tokens.colors.success,
      borderWidth: 2,
      borderColor: tokens.colors.backgroundPrimary,
    }} />
  )}
</View>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicAvatar components, follow these rules:

1. **Always provide name fallback**:
   ```tsx
   // ✅ Good
   <AtomicAvatar
     source={{ uri: user.avatar }}
     name={user.name}
   />

   // ❌ Bad
   <AtomicAvatar source={{ uri: user.avatar }} />
   ```

2. **Always use appropriate size**:
   ```tsx
   // ✅ Good - size matches context
   <ListItem>
     <AtomicAvatar name={user.name} size="sm" />
   </ListItem>
   <ProfileHeader>
     <AtomicAvatar name={user.name} size="xxl" />
   </ProfileHeader>

   // ❌ Bad - wrong size
   <ListItem>
     <AtomicAvatar name={user.name} size="xxl" />
   </ListItem>
   ```

3. **Always handle missing data**:
   ```tsx
   // ✅ Good - handles missing
   <AtomicAvatar
     name={user.name || 'Unknown'}
     source={user.avatar ? { uri: user.avatar } : undefined}
   />

   // ❌ Bad - doesn't handle missing
   <AtomicAvatar name={user.name} source={{ uri: user.avatar }} />
   ```

4. **Never use for non-user images**:
   ```tsx
   // ❌ Bad - non-user avatar
   <AtomicAvatar
     name="Product"
     source={{ uri: productImage }}
   />
   // Should use Image component instead
   ```

### Common Patterns

#### Basic Avatar
```tsx
<AtomicAvatar name="John Doe" />
```

#### With Image
```tsx
<AtomicAvatar
  source={{ uri: user.avatarUrl }}
  name={user.name}
/>
```

#### List Avatar
```tsx
<FlatList
  data={users}
  renderItem={({ item }) => (
    <ListItem>
      <AtomicAvatar name={item.name} size="sm" />
      <AtomicText>{item.name}</AtomicText>
    </ListItem>
  )}
/>
```

#### Profile Header
```tsx
<View style={{ alignItems: 'center', padding: 24 }}>
  <AtomicAvatar
    source={{ uri: user.avatar }}
    name={user.name}
    size="xxl"
  />
  <AtomicText type="headlineLarge" marginTop="md">
    {user.name}
  </AtomicText>
</View>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `source` | `ImageSourcePropType` | No | - | Image source |
| `name` | `string` | No* | - | User name (for initials) |
| `size` | `AvatarSize` | No | `'md'` | Avatar size |
| `customSize` | `number` | No | - | Custom size (px) |
| `backgroundColor` | `string` | No | - | Background color |
| `textColor` | `string` | No | - | Initials text color |
| `borderRadius` | `number` | No | - | Corner radius |
| `borderWidth` | `number` | No | `0` | Border width |
| `borderColor` | `string` | No | - | Border color |

*Either `source` or `name` should be provided

## Accessibility

- ✅ Screen reader announces user name
- ✅ Accessibility label for image
- ✅ Semantic role (image)
- ✅ Test ID support

## Performance Tips

1. **Image caching**: Cache avatar images
2. **Lazy loading**: In long lists
3. **Resize images**: Load appropriate size
4. **Memoization**: Memo avatar in lists

## Related Components

- [`AtomicText`](./AtomicText.README.md) - Text component
- [`AtomicIcon`](./AtomicIcon.README.md) - Icon component
- [`AtomicCard`](./AtomicCard.README.md) - Card component

## License

MIT

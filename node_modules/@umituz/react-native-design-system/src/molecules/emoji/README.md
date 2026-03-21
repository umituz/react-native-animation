# EmojiPicker

EmojiPicker is a component for emoji selection that wraps `rn-emoji-keyboard` library. It provides category-based selection, search, and recently used emojis.

## Import & Usage

```typescript
import { EmojiPicker } from 'react-native-design-system/src/molecules/emoji';
```

**Location:** `src/molecules/emoji/EmojiPicker.tsx`

## Basic Usage

```tsx
<EmojiPicker
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onEmojiSelected={(emoji) => setEmoji(emoji.emoji)}
/>
```

## Strategy

**Purpose**: Provide a clean, user-friendly emoji selection interface for adding emojis to text content.

**When to Use**:
- Message composers and chat interfaces
- Comment input fields
- Post/reaction creators
- Profile or group name editors
- Emoji reactions and filters

**When NOT to Use**:
- For simple emoji display - use text directly
- For custom emoji systems - build custom solution
- For limited emoji sets - use simple picker

## Rules

### Required

1. **ALWAYS** control open state with parent component
2. **MUST** provide `onClose` callback
3. **MUST** provide `onEmojiSelected` handler
4. **ALWAYS** close picker after selection (usually)
5. **MUST** provide trigger button for opening

### State Management

1. **MUST** manage open state in parent component
2. **SHOULD** reset state after selection
3. **ALWAYS** handle close callback properly
4. **NEVER** leave picker open indefinitely

### User Experience

1. **ALWAYS** provide clear trigger button
2. **SHOULD** show selected emoji in UI
3. **MUST** close picker after selection (usually)
4. **NEVER** open picker automatically without user action

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Missing required props
<EmojiPicker />

// ❌ Not controlled
<EmojiPicker open={true} /> {/* Always open */}

// ❌ No close handler
<EmojiPicker
  open={isOpen}
  onEmojiSelected={handleSelect}
  // Missing onClose ❌
/>

// ❌ Not handling selection
<EmojiPicker
  open={isOpen}
  onClose={() => setIsOpen(false)}
  // Missing onEmojiSelected ❌
/>

// ❌ Auto-opening
useEffect(() => {
  setOpen(true); // ❌ Don't auto-open
}, []);

// ❌ Not showing selected emoji
const [emoji, setEmoji] = useState('');
<EmojiPicker
  onEmojiSelected={(emojiObject) => {
    // Not updating state ❌
  }}
/>
```

## Best Practices

### State Management

✅ **DO**:
```tsx
const [isOpen, setIsOpen] = useState(false);
const [selectedEmoji, setSelectedEmoji] = useState('');

<EmojiPicker
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onEmojiSelected={(emoji) => {
    setSelectedEmoji(emoji.emoji);
    setIsOpen(false); // Close after selection
  }}
/>
```

❌ **DON'T**:
```tsx
// Don't leave open
<EmojiPicker
  open={isOpen}
  onEmojiSelected={(emoji) => {
    setSelectedEmoji(emoji.emoji);
    // Not closing ❌
  }}
/>
```

### Trigger Button

✅ **DO**:
```tsx
<TouchableOpacity onPress={() => setIsOpen(true)}>
  <AtomicIcon name="happy-outline" size="lg" />
</TouchableOpacity>
```

❌ **DON'T**:
```tsx
// Don't use unclear trigger
<TouchableOpacity onPress={() => setIsOpen(true)}>
  <Text>Click here</Text> {/* ❌ Unclear */}
</TouchableOpacity>
```

### Inserting Emoji

✅ **DO**:
```tsx
const insertEmoji = (emojiObject) => {
  setMessage(message + emojiObject.emoji);
};
```

❌ **DON'T**:
```tsx
// Don't replace entire message
const insertEmoji = (emojiObject) => {
  setMessage(emojiObject.emoji); // ❌ Lost previous text
};
```

## AI Coding Guidelines

### For AI Agents

When generating EmojiPicker components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { EmojiPicker } from 'react-native-design-system/src/molecules/emoji';
   ```

2. **Always manage state properly**:
   ```tsx
   const [isOpen, setIsOpen] = useState(false);
   const [selectedEmoji, setSelectedEmoji] = useState('');
   ```

3. **Always handle all callbacks**:
   ```tsx
   <EmojiPicker
     open={isOpen}
     onClose={() => setIsOpen(false)}
     onEmojiSelected={(emoji) => {
       setSelectedEmoji(emoji.emoji);
       setIsOpen(false);
     }}
   />
   ```

4. **Always provide clear trigger**:
   ```tsx
   <TouchableOpacity onPress={() => setIsOpen(true)}>
     <AtomicIcon name="happy-outline" />
   </TouchableOpacity>
   ```

5. **Never leave picker open**:
   ```tsx
   // ❌ Bad
   onEmojiSelected={(emoji) => {
     setSelectedEmoji(emoji.emoji);
     // Not closing
   }}

   // ✅ Good
   onEmojiSelected={(emoji) => {
     setSelectedEmoji(emoji.emoji);
     setIsOpen(false); // Always close
   }}
   ```

### Common Patterns

#### Message Composer
```tsx
const [message, setMessage] = useState('');
const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

<View>
  <TextInput
    value={message}
    onChangeText={setMessage}
    placeholder="Type a message..."
  />

  <TouchableOpacity onPress={() => setEmojiPickerOpen(true)}>
    <AtomicIcon name="happy-outline" />
  </TouchableOpacity>

  <EmojiPicker
    open={emojiPickerOpen}
    onClose={() => setEmojiPickerOpen(false)}
    onEmojiSelected={(emoji) => {
      setMessage(message + emoji.emoji);
    }}
  />
</View>
```

#### Comment Input
```tsx
const [comment, setComment] = useState('');
const [showEmojiPicker, setShowEmojiPicker] = useState(false);

<View>
  <TextInput
    value={comment}
    onChangeText={setComment}
    placeholder="Add a comment..."
    multiline
  />

  <TouchableOpacity onPress={() => setShowEmojiPicker(true)}>
    <AtomicIcon name="happy-outline" />
  </TouchableOpacity>

  <EmojiPicker
    open={showEmojiPicker}
    onClose={() => setShowEmojiPicker(false)}
    onEmojiSelected={(emoji) => {
      setComment(comment + emoji.emoji);
    }}
  />
</View>
```

#### Emoji Selector
```tsx
const [selectedEmoji, setSelectedEmoji] = useState('');
const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

<Button
  title={selectedEmoji || 'Select Emoji'}
  onPress={() => setEmojiPickerOpen(true)}
/>

<EmojiPicker
  open={emojiPickerOpen}
  onClose={() => setEmojiPickerOpen(false)}
  onEmojiSelected={(emoji) => {
    setSelectedEmoji(emoji.emoji);
    setEmojiPickerOpen(false);
  }}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | - | Picker open state |
| `onClose` | `() => void` | Yes | - | Close callback |
| `onEmojiSelected` | `(emoji) => void` | Yes | - | Emoji selected callback |
| `config` | `EmojiPickerConfig` | No | `{}` | Picker configuration |

### EmojiPickerConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableRecentlyUsed` | `boolean` | `true` | Show recently used |
| `enableSearch` | `boolean` | `true` | Enable search |
| `enableCategoryTabs` | `boolean` | `true` | Show categories |
| `categoryOrder` | `string[]` | - | Category order |
| `translation` | `object` | - | Localization |

### EmojiObject

| Prop | Type | Description |
|------|------|-------------|
| `emoji` | `string` | Emoji character |
| `name` | `string` | Emoji name |
| `slug` | `string` | URL slug |
| `unicode_version` | `string` | Unicode version |

## Accessibility

- ✅ Screen reader support
- ✅ Touch target size: minimum 44x44pt
- ✅ Semantic emojis announced
- ✅ Keyboard navigation support

## Performance

1. **Lazy loading**: Load picker on demand
2. **Cache**: Cache recently used emojis
3. **Unmount**: Unmount when closed
4. **Optimization**: Debounce search input

## Related Components

- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - Icon component
- [`FormField`](../FormField/README.md) - Form field component
- [`BaseModal`](../BaseModal/README.md) - Modal component

## Dependencies

- `rn-emoji-keyboard` - Emoji picker UI library

## License

MIT

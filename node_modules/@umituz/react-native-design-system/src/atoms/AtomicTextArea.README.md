# AtomicTextArea

A multi-line text input component optimized for longer content.

## Import & Usage

```typescript
import { AtomicTextArea } from 'react-native-design-system/src/atoms/AtomicTextArea';
```

**Location:** `src/atoms/AtomicTextArea.tsx`

## Basic Usage

```tsx
<AtomicTextArea
  label="Description"
  value={value}
  onChangeText={setValue}
  placeholder="Enter description"
  rows={4}
/>
```

## Strategy

**Purpose**: Provide accessible multi-line text input for longer content.

**When to Use**:
- Descriptions, comments, feedback
- Addresses, bio information
- Any text input needing multiple lines
- Content exceeding single-line capacity

**When NOT to Use**:
- For single-line inputs (use AtomicInput instead)
- For numeric input (use numeric keyboard input)
- For passwords (use secure text entry on AtomicInput)

## Rules

### Required

1. **MUST** provide `value` and `onChangeText` (controlled input)
2. **SHOULD** provide `label` for accessibility
3. **MUST** show error messages clearly
4. **ALWAYS** provide helpful placeholder text
5. **SHOULD** set appropriate `rows` for content
6. **MUST** clear errors when user starts typing
7. **ALWAYS** use `helperText` for format requirements

### Validation Rules

1. **Validate on blur**: Check validity when user leaves field
2. **Clear on type**: Remove error when user starts typing
3. **Show inline errors**: Display errors below textarea
4. **Helper text**: Show format requirements

### Character Limits

1. **Set maxLength**: When there's a maximum
2. **Show counter**: Display remaining characters
3. **Enforce limits**: Prevent exceeding maximum

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Uncontrolled input
<AtomicTextArea
  placeholder="Enter text"
  // ❌ Missing value and onChangeText
/>

// ❌ No label
<AtomicTextArea
  value={value}
  onChangeText={setValue}
  placeholder="Description" {/* ❌ Placeholder is not a label */}
/>

// ❌ Generic error message
<AtomicTextArea
  error="Invalid" {/* ❌ Not actionable */}
/>

// ❌ Error persists after correction
<AtomicTextArea
  value={value}
  error={error}
  onChangeText={setValue} {/* ❌ Error still shows when typing */}
/>

// ❌ Wrong number of rows
<AtomicTextArea
  rows={20} {/* ❌ Too many rows, use 2-8 */}
/>

// ❌ Missing helper text for requirements
<AtomicTextArea
  label="Bio"
  maxLength={150}
  // ❌ Should show character limit
/>
```

## Best Practices

### Controlled Input

✅ **DO**:
```tsx
const [value, setValue] = useState('');

<AtomicTextArea
  label="Description"
  value={value}
  onChangeText={setValue}
  placeholder="Enter description"
  rows={4}
/>
```

❌ **DON'T**:
```tsx
// ❌ Uncontrolled
<AtomicTextArea placeholder="Enter text" />

// ❌ Missing handler
<AtomicTextArea
  value={value}
  placeholder="Text" {/* No onChangeText */}
/>
```

### Error Handling

✅ **DO**:
```tsx
const [value, setValue] = useState('');
const [error, setError] = useState('');

const handleChange = (text) => {
  setValue(text);
  if (error) setError(''); // Clear error on type
};

const handleBlur = () => {
  if (!value) setError('Description is required');
  else if (value.length < 10) setError('Minimum 10 characters');
};

<AtomicTextArea
  label="Description"
  value={value}
  onChangeText={handleChange}
  onBlur={handleBlur}
  error={error}
  rows={4}
/>
```

❌ **DON'T**:
```tsx
// ❌ Generic error
<AtomicTextArea error="Invalid" />

// ❌ Error persists
<AtomicTextArea
  value={value}
  error={error}
  onChangeText={setValue} {/* Error doesn't clear */}
/>
```

### Character Limits

✅ **DO**:
```tsx
<AtomicTextArea
  label="Bio"
  value={value}
  onChangeText={setValue}
  maxLength={150}
  rows={3}
  helperText="Maximum 150 characters"
/>

{value.length > 0 && (
  <AtomicText type="bodySmall" color="textSecondary">
    {value.length}/150 characters
  </AtomicText>
)}
```

❌ **DON'T**:
```tsx
// ❌ No indication of limit
<AtomicTextArea
  maxLength={150}
  // ❌ User doesn't know limit exists
/>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicTextArea components, follow these rules:

1. **Always use controlled input**:
   ```tsx
   // ✅ Good
   const [value, setValue] = useState('');
   <AtomicTextArea
     value={value}
     onChangeText={setValue}
     label="Description"
   />

   // ❌ Bad
   <AtomicTextArea placeholder="Enter text" />
   ```

2. **Always provide label**:
   ```tsx
   // ✅ Good
   <AtomicTextArea
     label="Description"
     value={value}
     onChangeText={setValue}
   />

   // ❌ Bad
   <AtomicTextArea
     value={value}
     onChangeText={setValue}
     placeholder="Description" // Not a label
   />
   ```

3. **Always handle errors properly**:
   ```tsx
   // ✅ Good - clears error
   const handleChange = (text) => {
     setValue(text);
     if (error) setError('');
   };

   // ❌ Bad - error persists
   const handleChange = (text) => {
     setValue(text);
   };
   ```

4. **Always use appropriate row count**:
   ```tsx
   // ✅ Good - reasonable rows
   <AtomicTextArea rows={2} />  // Short input
   <AtomicTextArea rows={4} />  // Normal
   <AtomicTextArea rows={8} />  // Long content

   // ❌ Bad - too many
   <AtomicTextArea rows={20} />
   ```

### Common Patterns

#### Basic TextArea
```tsx
<AtomicTextArea
  label="Description"
  value={value}
  onChangeText={setValue}
  placeholder="Enter description"
  rows={4}
/>
```

#### With Validation
```tsx
const [value, setValue] = useState('');
const [error, setError] = useState('');

<AtomicTextArea
  label="Description"
  value={value}
  onChangeText={(text) => {
    setValue(text);
    if (error) setError('');
  }}
  onBlur={() => {
    if (!value) setError('Required');
  }}
  error={error}
  rows={4}
/>
```

#### With Character Limit
```tsx
<AtomicTextArea
  label="Bio"
  value={value}
  onChangeText={setValue}
  maxLength={150}
  rows={3}
  helperText="Maximum 150 characters"
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | No | - | Field label |
| `value` | `string` | Yes | - | Input value |
| `onChangeText` | `(text: string) => void` | Yes | - | Change callback |
| `placeholder` | `string` | No | - | Placeholder text |
| `helperText` | `string` | No | - | Helper text |
| `error` | `string` | No | - | Error message |
| `maxLength` | `number` | No | - | Maximum characters |
| `rows` | `number` | No | `4` | Number of rows |
| `minHeight` | `number` | No | - | Minimum height |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `autoFocus` | `boolean` | No | - | Auto focus |
| `testID` | `string` | No | - | Test identifier |

## Accessibility

- ✅ Label association
- ✅ Error state announcement
- ✅ Character counter
- ✅ Screen reader support

## Performance Tips

1. **Controlled inputs**: Always use state
2. **Memoization**: Memo validation functions
3. **Debounce**: Debounce validation for better UX

## Related Components

- [`AtomicInput`](./AtomicInput.README.md) - Single-line input
- [`FormField`](../molecules/FormField) - Form field wrapper
- [`AtomicText`](./AtomicText.README.md) - Text component

## License

MIT

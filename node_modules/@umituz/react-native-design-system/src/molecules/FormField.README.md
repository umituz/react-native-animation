# FormField

A molecule component that combines label, input field, and validation messages into a complete form input unit.

## Import & Usage

```typescript
import { FormField } from 'react-native-design-system/src/molecules/FormField';
```

**Location:** `src/molecules/FormField.tsx`

## Basic Usage

```tsx
const [email, setEmail] = useState('');

<FormField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
/>
```

## Strategy

**Purpose**: Provide a consistent, accessible form input unit with integrated labeling, validation, and helper text.

**When to Use**:
- All form inputs requiring labels
- Data entry forms (login, registration, settings)
- Multi-field forms
- Input fields with validation requirements
- Fields needing helper text or error messages

**When NOT to Use**:
- For standalone inputs without labels (use AtomicInput instead)
- For search-only inputs (use SearchBar instead)
- For simple text display (use AtomicText instead)

## Rules

### Required

1. **MUST** have a `label` prop for accessibility
2. **ALWAYS** provide `value` and `onChangeText` for controlled inputs
3. **MUST** show clear error messages when validation fails
4. **SHOULD** provide helper text for format requirements
5. **ALWAYS** mark required fields visually with `required` prop
6. **MUST** clear errors when user starts typing
7. **SHOULD** use appropriate `keyboardType` for the input type

### Error Handling

1. **MUST** provide specific, actionable error messages
2. **SHOULD** show errors only after validation (not on focus)
3. **MUST** clear error when user corrects the input
4. **NEVER** show generic errors like "Invalid input"

### Validation

1. **Validate on blur**: Validate when user leaves the field
2. **Clear on type**: Clear error when user starts typing
3. **Show inline errors**: Display errors below the input
4. **Required fields**: Always validate required fields

### Helper Text

1. **Use for guidance**: Explain format or requirements
2. **Keep concise**: One short sentence
3. **Don't state obvious**: Avoid "Enter your name"
4. **Provide examples**: Show format when helpful

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No label
<FormField
  value={email}
  onChangeText={setEmail}
  placeholder="Email" // ❌ Placeholder is not a label
/>

// ❌ Generic error message
<FormField
  label="Email"
  error="Invalid" // ❌ Not actionable
/>

// ❌ Error persists after correction
<FormField
  label="Email"
  value={email}
  error={emailError} // ❌ Error still shows when typing
  onChangeText={setEmail}
/>

// ❌ Required but not visually marked
<FormField
  label="Email" // ❌ Missing required prop
  required={false} // Actually required
/>

// ❌ Unhelpful helper text
<FormField
  label="Email"
  helperText="Enter your email here" // ❌ Obvious
/>

// ❌ Wrong keyboard type
<FormField
  label="Email"
  keyboardType="default" // ❌ Should be email-address
/>

// ❌ Not clearing errors
const handleChange = (text) => {
  setEmail(text);
  // ❌ Error not cleared
};
```

## Best Practices

### Error Handling

✅ **DO**:
```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address';
  return '';
};

const handleChange = (text) => {
  setEmail(text);
  if (emailError) setEmailError(''); // Clear error on type
};

const handleBlur = () => {
  const error = validateEmail(email);
  setEmailError(error);
};

<FormField
  label="Email"
  value={email}
  onChangeText={handleChange}
  onBlur={handleBlur}
  error={emailError}
  keyboardType="email-address"
  autoCapitalize="none"
  required
/>
```

❌ **DON'T**:
```tsx
// ❌ Generic error
<FormField
  label="Email"
  error="Invalid input" // Not specific
/>

// ❌ Error persists
const handleChange = (text) => {
  setEmail(text);
  // Error still shows
};
```

### Helper Text

✅ **DO**:
```tsx
<FormField
  label="Password"
  helperText="Must be at least 8 characters with 1 number"
  secureTextEntry
/>
```

❌ **DON'T**:
```tsx
<FormField
  label="Password"
  helperText="Enter your password here" // Obvious
/>
```

### Required Fields

✅ **DO**:
```tsx
<FormField
  label="Email"
  required
  error={emailError}
/>
```

❌ **DON'T**:
```tsx
// ❌ No visual required indicator
<FormField
  label="Email"
  error={emailError || '* Required'}
/>
```

## AI Coding Guidelines

### For AI Agents

When generating FormField components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { FormField } from 'react-native-design-system/src/molecules/FormField';
   ```

2. **Always provide a label**:
   ```tsx
   // ✅ Good
   <FormField
     label="Email"
     value={email}
     onChangeText={setEmail}
   />

   // ❌ Bad - no label
   <FormField
     value={email}
     onChangeText={setEmail}
     placeholder="Email" // Placeholder is not a label
   />
   ```

3. **Always handle errors properly**:
   ```tsx
   // ✅ Good - clear errors on type
   const handleChange = (text) => {
     setValue(text);
     if (error) setError('');
   };

   // ❌ Bad - error persists
   const handleChange = (text) => {
     setValue(text);
     // Error still shows
   };
   ```

4. **Always use specific error messages**:
   ```tsx
   // ✅ Good - specific errors
   const validateEmail = (email) => {
     if (!email) return 'Email is required';
     if (!isValidEmail(email)) return 'Please enter a valid email address';
     if (!isCompanyEmail(email)) return 'Please use your company email';
     return '';
   };

   // ❌ Bad - generic error
   const validate = (value) => {
     if (!value) return 'Invalid';
   };
   ```

5. **Always use appropriate keyboard type**:
   ```tsx
   // ✅ Good - correct keyboard types
   <FormField
     label="Email"
     keyboardType="email-address"
     autoCapitalize="none"
   />
   <FormField
     label="ZIP Code"
     keyboardType="number-pad"
   />
   <FormField
     label="Website"
     keyboardType="url"
   />

   // ❌ Bad - always default
   <FormField
     label="Email"
     keyboardType="default"
   />
   ```

### Common Patterns

#### Basic Form Field
```tsx
<FormField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="your@email.com"
  keyboardType="email-address"
  autoCapitalize="none"
  required
/>
```

#### Field with Error Handling
```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleChange = (text) => {
  setEmail(text);
  if (error) setError('');
};

const handleBlur = () => {
  if (!email) setError('Email is required');
  else if (!isValidEmail(email)) setError('Please enter a valid email');
};

<FormField
  label="Email"
  value={email}
  onChangeText={handleChange}
  onBlur={handleBlur}
  error={error}
  required
/>
```

#### Field with Helper Text
```tsx
<FormField
  label="Password"
  value={password}
  onChangeText={setPassword}
  placeholder="Enter password"
  secureTextEntry
  helperText="Must be at least 8 characters with 1 number"
  required
/>
```

#### Field with Icons
```tsx
<FormField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="your@email.com"
  leftIcon="mail-outline"
  keyboardType="email-address"
/>
```

#### Multiline Field
```tsx
<FormField
  label="Bio"
  value={bio}
  onChangeText={setBio}
  placeholder="Tell us about yourself"
  multiline
  numberOfLines={4}
  helperText="Maximum 150 characters"
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Field label |
| `value` | `string` | Yes | - | Input value |
| `onChangeText` | `(text: string) => void` | Yes | - | Change callback |
| `error` | `string` | No | - | Error message |
| `helperText` | `string` | No | - | Helper text |
| `required` | `boolean` | No | `false` | Show required indicator |
| `placeholder` | `string` | No | - | Placeholder text |
| `secureTextEntry` | `boolean` | No | `false` | Password field |
| `keyboardType` | `KeyboardType` | No | `'default'` | Keyboard type |
| `autoCapitalize` | `'none' \| 'sentences' \| 'words' \| 'characters'` | No | - | Auto capitalize |
| `multiline` | `boolean` | No | `false` | Multiline input |
| `numberOfLines` | `number` | No | - | Number of lines |
| `leftIcon` | `string` | No | - | Left icon name |
| `rightIcon` | `string` | No | - | Right icon name |
| `onBlur` | `() => void` | No | - | Blur callback |
| `onFocus` | `() => void` | No | - | Focus callback |

## Accessibility

- ✅ Screen reader announces label and current value
- ✅ Error messages are announced to screen readers
- ✅ Required fields are indicated visually
- ✅ Helper text provides additional context
- ✅ Proper label-input association
- ✅ Touch target size maintained (min 44x44pt)

## Performance Tips

1. **Controlled inputs**: Always use controlled inputs with state
2. **Validation debounce**: Debounce validation for better UX
3. **Memoization**: Memo validation functions
4. **Clear errors**: Clear errors immediately on input change

## Related Components

- [`AtomicInput`](../atoms/input/README.md) - Base input component
- [`AtomicText`](../atoms/AtomicText/README.md) - Text component
- [`Button`](../atoms/button/README.md) - Button component
- [`BaseModal`](./BaseModal/README.md) - Modal for forms

## License

MIT

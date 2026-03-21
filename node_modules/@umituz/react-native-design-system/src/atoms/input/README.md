# AtomicInput

Customizable text input component with Material Design 3 principles for React Native applications.

## Import & Usage

```typescript
import { AtomicInput } from 'react-native-design-system/src/atoms/input';
```

**Location:** `src/atoms/input/AtomicInput.tsx`

## Basic Usage

```tsx
<AtomicInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  keyboardType="email-address"
/>
```

## Strategy

**Purpose**: Provide consistent, accessible, and performant text input with built-in validation states and Material Design aesthetics.

**When to Use**:
- Form inputs (name, email, password, etc.)
- Search fields
- Text entry for user data
- Multi-line text areas (textarea)

**When NOT to Use**:
- For numeric-only input - use NumericInput instead
- For selecting from options - use Picker component
- For rich text editing - use a specialized rich text editor

## Rules

### Required

1. **ALWAYS** provide a `label` prop for accessibility
2. **MUST** have `value` and `onChangeText` for controlled input
3. **NEVER** use without proper state management
4. **ALWAYS** provide appropriate `keyboardType` for the input type
5. **MUST** provide accessible labels and error messages

### Validation

1. **MUST** show error state with `state="error"` when validation fails
2. **ALWAYS** provide `helperText` to explain error or constraints
3. **SHOULD** show success state after valid input
4. **MUST** indicate required fields clearly

### Password Fields

1. **MUST** use `secureTextEntry` for passwords
2. **SHOULD** provide `showPasswordToggle` for better UX
3. **ALWAYS** consider password strength indicators

### Multi-line

1. **MUST** use `multiline` prop for text areas
2. **SHOULD** specify `numberOfLines` for better UX
3. **ALWAYS** consider character limit with `showCharacterCount`

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Uncontrolled input (no value/onChangeText)
<AtomicInput label="Name" />

// ❌ Input without label
<AtomicInput value={value} onChangeText={setValue} />

// ❌ Hardcoded placeholder text (use i18n)
<AtomicInput label="Email" placeholder="Enter your email" />
{/* ❌ Use placeholder={t('input.emailPlaceholder')} */}

// ❌ Email input without email keyboard type
<AtomicInput label="Email" keyboardType="default" />
{/* ❌ Use keyboardType="email-address" */}

// ❌ Password without secureTextEntry
<AtomicInput label="Password" />
{/* ❌ Use secureTextEntry */}

// ❌ Nested inputs
<AtomicInput label="Outer">
  <AtomicInput label="Inner" />
</AtomicInput>
```

## Best Practices

### Input Types

✅ **DO**:
```tsx
// Email input
<AtomicInput
  label={t('form.email')}
  keyboardType="email-address"
  autoCapitalize="none"
/>

// Password input
<AtomicInput
  label={t('form.password')}
  secureTextEntry
  showPasswordToggle
/>

// Numeric input
<AtomicInput
  label={t('form.age')}
  keyboardType="number-pad"
/>
```

❌ **DON'T**:
```tsx
// Don't use default keyboard for specific types
<AtomicInput keyboardType="default" />

// Don't forget autoCapitalize for email
<AtomicInput keyboardType="email-address" autoCapitalize="words" />
```

### Validation

✅ **DO**:
```tsx
<AtomicInput
  label={t('form.email')}
  value={email}
  onChangeText={setEmail}
  state={emailError ? 'error' : 'default'}
  helperText={emailError || t('form.emailHint')}
  onBlur={() => validateEmail(email)}
/>
```

❌ **DON'T**:
```tsx
// Don't validate on every keystroke (use onBlur or debounce)
<AtomicInput
  onChangeText={(text) => {
    setValue(text);
    validate(text); // ❌ Too frequent validation
  }}
/>
```

### Character Counting

✅ **DO**:
```tsx
<AtomicInput
  label={t('form.bio')}
  multiline
  numberOfLines={4}
  maxLength={150}
  showCharacterCount
/>
```

❌ **DON'T**:
```tsx
// Don't show character count without maxLength
<AtomicInput showCharacterCount />
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicInput components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { AtomicInput } from 'react-native-design-system/src/atoms/input';
   ```

2. **Always use controlled input**:
   ```tsx
   const [value, setValue] = useState('');

   <AtomicInput
     label="明确的标签"
     value={value}
     onChangeText={setValue}
     placeholder="适当的占位符"
   />
   ```

3. **Always use i18n for labels**:
   ```tsx
   <AtomicInput
     label={t('form.username')}
     placeholder={t('form.usernamePlaceholder')}
   />
   ```

4. **Always provide appropriate keyboard type**:
   ```tsx
   // Email
   <AtomicInput keyboardType="email-address" autoCapitalize="none" />

   // Password
   <AtomicInput secureTextEntry showPasswordToggle />

   // Phone
   <AtomicInput keyboardType="phone-pad" />
   ```

5. **Always handle validation properly**:
   ```tsx
   const [error, setError] = useState('');

   <AtomicInput
     label={t('form.email')}
     value={email}
     onChangeText={setEmail}
     state={error ? 'error' : 'default'}
     helperText={error || t('form.emailHint')}
     onBlur={() => setError(validateEmail(email))}
   />
   ```

### Common Patterns

#### Email Input
```tsx
<AtomicInput
  label={t('form.email')}
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
  autoComplete="email"
  state={emailError ? 'error' : 'default'}
  helperText={emailError || t('form.emailHint')}
/>
```

#### Password Input
```tsx
<AtomicInput
  label={t('form.password')}
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  showPasswordToggle
  maxLength={20}
  showCharacterCount
  state={passwordError ? 'error' : 'default'}
  helperText={passwordError || t('form.passwordHint')}
/>
```

#### Search Input
```tsx
<AtomicInput
  label={t('search.label')}
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder={t('search.placeholder')}
  leadingIcon="search-outline"
  keyboardType="web-search"
  returnKeyType="search"
  onSubmitEditing={handleSearch}
/>
```

#### Text Area
```tsx
<AtomicInput
  label={t('form.bio')}
  value={bio}
  onChangeText={setBio}
  multiline
  numberOfLines={4}
  maxLength={150}
  showCharacterCount
  placeholder={t('form.bioPlaceholder')}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Input label |
| `value` | `string` | Yes | - | Input value (controlled) |
| `onChangeText` | `(text: string) => void` | Yes | - | Change handler |
| `placeholder` | `string` | No | - | Placeholder text |
| `variant` | `'outlined' \| 'filled' \| 'flat'` | No | `'outlined'` | Visual style |
| `state` | `'default' \| 'error' \| 'success' \| 'disabled'` | No | `'default'` | Input state |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Input size |
| `helperText` | `string` | No | - | Helper or error text |
| `leadingIcon` | `string` | No | - | Leading icon name |
| `trailingIcon` | `string` | No | - | Trailing icon name |
| `onTrailingIconPress` | `() => void` | No | - | Trailing icon press |
| `secureTextEntry` | `boolean` | No | `false` | Password input |
| `showPasswordToggle` | `boolean` | No | `false` | Show password toggle |
| `keyboardType` | `KeyboardType` | No | `'default'` | Keyboard type |
| `multiline` | `boolean` | No | `false` | Multi-line input |
| `numberOfLines` | `number` | No | - | Number of lines |
| `maxLength` | `number` | No | - | Max length |
| `showCharacterCount` | `boolean` | No | `false` | Show character count |
| `disabled` | `boolean` | No | `false` | Disabled state |

## Accessibility

- ✅ Screen reader announces label and value
- ✅ Error state announced to screen readers
- ✅ Helper text provides additional context
- ✅ Keyboard type matches input type
- ✅ Focus management for form navigation
- ✅ Test ID support for testing

## Performance Tips

1. **Avoid inline functions**: Use `useCallback` for onChangeText
2. **Debounce validation**: Don't validate on every keystroke
3. **Memoize handlers**: Prevent unnecessary re-renders
4. **Lazy validation**: Validate on blur or submit

## Related Components

- [`AtomicPicker`](./picker/README.md) - Selection component
- [`FormField`](../../molecules/FormField/README.md) - Form field wrapper
- [`AtomicButton`](./button/README.md) - Form submit button

## Version History

- **2.6.0**: Added character count and password toggle
- **2.5.0**: Added multi-line support
- **2.0.0**: Initial release with Material Design 3

## License

MIT

# AtomicPicker

Powerful and customizable selection/dropdown component with modal interface for React Native applications.

## Import & Usage

```typescript
import { AtomicPicker } from 'react-native-design-system/src/atoms/picker';
```

**Location:** `src/atoms/picker/AtomicPicker.tsx`

## Basic Usage

```tsx
<AtomicPicker
  value={selectedValue}
  onChange={setSelectedValue}
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
  label="Select an option"
  placeholder="Choose..."
/>
```

## Strategy

**Purpose**: Provide consistent, accessible, and performant selection interface with mobile-first modal display.

**When to Use**:
- Selecting from options (single or multiple)
- Form fields with predefined choices
- Filtering and sorting options
- User role/category selection
- Country/city selection

**When NOT to Use**:
- For boolean choices - use Switch or Checkbox
- For date/time selection - use DateTimePicker
- For very long lists (>100 items) - consider search-first approach
- For custom selections - build custom modal

## Rules

### Required

1. **ALWAYS** provide `value`, `onChange`, and `options` props
2. **MUST** have proper `label` for accessibility
3. **NEVER** use empty options array
4. **ALWAYS** provide meaningful option labels
5. **MUST** provide `placeholder` for unselected state

### Options Structure

1. **MUST** have unique `value` for each option
2. **ALWAYS** provide human-readable `label`
3. **SHOULD** include `icon` for better UX
4. **MUST** keep labels short and clear

### Single vs Multi-Select

1. **Single**: Use for mutually exclusive choices
2. **Multi**: Use for multiple selections
3. **MUST** set `multiple` prop for multi-select
4. **SHOULD** use `autoClose={false}` for multi-select

### Searchable

1. **MUST** use `searchable` for lists with 20+ options
2. **ALWAYS** provide `searchPlaceholder`
3. **SHOULD** provide `emptyMessage` for no results

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Missing required props
<AtomicPicker />
<AtomicPicker options={options} />
<AtomicPicker value={value} onChange={onChange} />

// ❌ Empty options array
<AtomicPicker
  value={value}
  onChange={setValue}
  options={[]}
/>

// ❌ Options without labels
<AtomicPicker
  options={[
    { value: '1' }, // ❌ Missing label
    { value: '2' },
  ]}
/>

// ❌ Duplicate values
<AtomicPicker
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '1' }, // ❌ Duplicate value
  ]}
/>

// ❌ Hardcoded labels (use i18n)
<AtomicPicker
  options={[
    { label: 'Select', value: 'select' }, // ❌ Use t()
  ]}
/>

// ❌ Multi-select without multiple prop
<AtomicPicker
  value={[1, 2, 3]} // ❌ Array value but no multiple prop
  onChange={setValue}
  options={options}
/>

// ❌ Long lists without searchable
<AtomicPicker
  options={hundredOptions} // ❌ Add searchable prop
/>
```

## Best Practices

### Option Structure

✅ **DO**:
```tsx
// With icons for better UX
const roleOptions = [
  { label: t('roles.admin'), value: 'admin', icon: 'shield-checkmark' },
  { label: t('roles.moderator'), value: 'moderator', icon: 'person' },
  { label: t('roles.user'), value: 'user', icon: 'person-outline' },
];
```

❌ **DON'T**:
```tsx
// Don't use long labels
{ label: 'This is a very long label that breaks the UI', value: '1' }

// Don't use technical labels
{ label: 'USR_ROLE_ADMIN', value: 'admin' }
```

### Searchable Usage

✅ **DO**:
```tsx
<AtomicPicker
  value={country}
  onChange={setCountry}
  options={countries} // 50+ options
  searchable
  searchPlaceholder={t('search.country')}
  emptyMessage={t('search.noResults')}
/>
```

❌ **DON'T**:
```tsx
// Don't make searchable lists short
<AtomicPicker
  options={[{ label: 'Yes', value: 'yes' }]}
  searchable // ❌ Unnecessary for 1 option
/>
```

### Multi-Select

✅ **DO**:
```tsx
<AtomicPicker
  value={selectedCategories}
  onChange={setSelectedCategories}
  options={categories}
  multiple
  autoClose={false} // Keep open for multiple selections
  modalTitle={t('picker.selectCategories')}
/>
```

❌ **DON'T**:
```tsx
// Don't use autoClose with multi-select
<AtomicPicker
  multiple
  autoClose // ❌ Closes after each selection
/>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicPicker components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { AtomicPicker } from 'react-native-design-system/src/atoms/picker';
   ```

2. **Always provide all required props**:
   ```tsx
   <AtomicPicker
     value="选定的值"
     onChange="处理函数"
     options="选项数组"
     label="清晰的标签"
     placeholder="适当的占位符"
   />
   ```

3. **Always use i18n for labels**:
   ```tsx
   <AtomicPicker
     label={t('form.country')}
     placeholder={t('form.selectCountry')}
     options={[
       { label: t('countries.turkey'), value: 'tr' },
       { label: t('countries.usa'), value: 'us' },
     ]}
   />
   ```

4. **Always enable searchable for long lists**:
   ```tsx
   <AtomicPicker
     options={longOptionsList} // 20+ options
     searchable
     searchPlaceholder={t('search.placeholder')}
     emptyMessage={t('search.noResults')}
   />
   ```

5. **Always use autoClose={false} for multi-select**:
   ```tsx
   <AtomicPicker
     multiple
     autoClose={false}
     modalTitle={t('picker.selectMultiple')}
   />
   ```

### Common Patterns

#### Single Select
```tsx
const [role, setRole] = useState('user');

<AtomicPicker
  value={role}
  onChange={setRole}
  options={[
    { label: t('roles.admin'), value: 'admin', icon: 'shield-checkmark' },
    { label: t('roles.moderator'), value: 'moderator', icon: 'person' },
    { label: t('roles.user'), value: 'user', icon: 'person-outline' },
  ]}
  label={t('form.role')}
  placeholder={t('form.selectRole')}
/>
```

#### Multi Select
```tsx
const [categories, setCategories] = useState<string[]>([]);

<AtomicPicker
  value={categories}
  onChange={setCategories}
  multiple
  autoClose={false}
  options={categoryOptions}
  label={t('form.categories')}
  placeholder={t('form.selectCategories')}
  modalTitle={t('picker.selectCategories')}
  searchable
/>
```

#### Searchable Picker
```tsx
const [city, setCity] = useState('');

<AtomicPicker
  value={city}
  onChange={setCity}
  options={cities}
  label={t('form.city')}
  placeholder={t('form.selectCity')}
  searchable
  searchPlaceholder={t('search.searchCity')}
  emptyMessage={t('search.noCityFound')}
  clearable
/>
```

#### With Error State
```tsx
<AtomicPicker
  value={country}
  onChange={setCountry}
  options={countries}
  label={t('form.country')}
  placeholder={t('form.selectCountry')}
  error={errors.country}
/>
```

#### Priority Select
```tsx
const [priority, setPriority] = useState('medium');

<AtomicPicker
  value={priority}
  onChange={setPriority}
  options={[
    { label: t('priority.low'), value: 'low', icon: 'arrow-down' },
    { label: t('priority.medium'), value: 'medium', icon: 'remove' },
    { label: t('priority.high'), value: 'high', icon: 'arrow-up' },
    { label: t('priority.urgent'), value: 'urgent', icon: 'warning' },
  ]}
  label={t('form.priority')}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string \| string[]` | Yes | - | Selected value(s) |
| `onChange` | `(value: any) => void` | Yes | - | Change handler |
| `options` | `PickerOption[]` | Yes | - | Options array |
| `label` | `string` | No | - | Field label |
| `placeholder` | `string` | No | - | Placeholder text |
| `multiple` | `boolean` | No | `false` | Enable multi-select |
| `searchable` | `boolean` | No | `false` | Enable search |
| `clearable` | `boolean` | No | `false` | Show clear button |
| `autoClose` | `boolean` | No | `true` | Auto-close on select |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Picker size |
| `error` | `string` | No | - | Error message |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `modalTitle` | `string` | No | - | Modal title |
| `searchPlaceholder` | `string` | No | - | Search placeholder |
| `emptyMessage` | `string` | No | - | Empty results message |

## Accessibility

- ✅ Screen reader announces label and selection
- ✅ Modal is fully accessible
- ✅ Keyboard navigation support
- ✅ Error state announced to screen readers
- ✅ Test ID support for testing

## Performance Tips

1. **Limit options**: Keep under 100 options, use search for more
2. **Memo options**: Don't recreate options array on every render
3. **Stable onChange**: Use `useCallback` for onChange handler
4. **Lazy loading**: For very large lists, consider pagination

## Related Components

- [`AtomicChip`](./chip/README.md) - Display selected items as chips
- [`FormField`](../../molecules/FormField/README.md) - Form field wrapper
- [`AtomicInput`](./input/README.md) - Text input component

## Version History

- **2.6.0**: Added searchable and multi-select support
- **2.5.0**: Added modal interface
- **2.0.0**: Initial release

## License

MIT

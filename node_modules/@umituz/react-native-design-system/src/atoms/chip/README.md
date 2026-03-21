# AtomicChip

Small, tag-like components for displaying categories, statuses, or selectable items in React Native applications.

## Import & Usage

```typescript
import { AtomicChip } from 'react-native-design-system/src/atoms/chip';
```

**Location:** `src/atoms/chip/AtomicChip.tsx`

## Basic Usage

```tsx
<AtomicChip>React Native</AtomicChip>
```

## Strategy

**Purpose**: Provide visually consistent, interactive tags for filtering, categorization, and status display.

**When to Use**:
- Category labels (tags, skills, topics)
- Status indicators (active, pending, completed)
- Filter chips (selectable options)
- User attributes (roles, badges)
- Removable items (tags with delete action)

**When NOT to Use**:
- For primary navigation - use Tabs or Navigation components
- For complex selections - use Checkbox or Radio components
- For long text content - use Card or List items
- As standalone buttons - use Button component instead

## Rules

### Required

1. **ALWAYS** provide `children` content (text or elements)
2. **MUST** have appropriate color for semantic meaning
3. **NEVER** use chips for critical actions without confirmation
4. **ALWAYS** provide accessible label for screen readers
5. **MUST** have adequate touch target (min 44x44pt) when clickable

### Clickable Chips

1. **MUST** set `clickable` prop if onPress is provided
2. **ALWAYS** provide visual feedback for selected state
3. **SHOULD** use `selected` prop for toggle behavior
4. **MUST** have clear purpose for interaction

### Variant Selection

1. **Filled**: Primary categories, emphasized tags
2. **Outlined**: Secondary categories, list items
3. **Ghost**: Tertiary tags, background elements

### Color Usage

1. **Success**: Completed, verified, active states
2. **Error**: Failed, rejected, inactive states
3. **Warning**: Pending, attention needed
4. **Info**: Neutral information

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Empty chips
<AtomicChip />

// ❌ Chips without content (children)
<AtomicChip variant="filled" />

// ❌ Long text content (breaks layout)
<AtomicChip>This is a very long text that will break the chip layout and make it look bad</AtomicChip>

// ❌ Clickable without clickable prop
<AtomicChip onPress={handlePress}>Click me</AtomicChip>
{/* ❌ Add clickable prop */}

// ❌ Wrong color semantics
<AtomicChip color="error">Success</AtomicChip>
{/* ❌ Use color="success" */}

// ❌ Too many chips in one row
<View style={{ flexDirection: 'row' }}>
  <AtomicChip>1</AtomicChip>
  <AtomicChip>2</AtomicChip>
  {/* ... 20 more chips */} {/* ❌ Use wrap */}
</View>

// ❌ Hardcoded text (use i18n)
<AtomicChip>Active</AtomicChip>
{/* ❌ Use {t('status.active')} */}
```

## Best Practices

### Chip Sizing

✅ **DO**:
- Use `sm` for dense content and lists
- Use `md` (default) for normal usage
- Use `lg` for emphasis or important tags

❌ **DON'T**:
- Mix sizes inconsistently in same context
- Use `lg` for long lists (takes too much space)

### Color Selection

✅ **DO**:
```tsx
// Status indicators
<AtomicChip color="success">Active</AtomicChip>
<AtomicChip color="warning">Pending</AtomicChip>
<AtomicChip color="error">Inactive</AtomicChip>

// Categories
<AtomicChip color="primary">Technology</AtomicChip>
<AtomicChip color="secondary">Design</AtomicChip>
```

❌ **DON'T**:
```tsx
// Don't use decorative colors without meaning
<AtomicChip color="error">Just for fun</AtomicChip>

// Don't mix colors randomly
<AtomicChip color="success">Error</AtomicChip>
```

### Interactive Chips

✅ **DO**:
```tsx
const [selected, setSelected] = useState(false);

<AtomicChip
  clickable
  selected={selected}
  onPress={() => setSelected(!selected)}
>
  {t('filter.option')}
</AtomicChip>
```

❌ **DON'T**:
```tsx
// Don't forget clickable prop
<AtomicChip onPress={handlePress}>Click</AtomicChip>

// Don't use selected without clickable
<AtomicChip selected>Not clickable</AtomicChip>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicChip components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { AtomicChip } from 'react-native-design-system/src/atoms/chip';
   ```

2. **Always provide meaningful content**:
   ```tsx
   <AtomicChip>
     {t('category.name')}
   </AtomicChip>
   ```

3. **Always use appropriate variant**:
   ```tsx
   // Primary category
   <AtomicChip variant="filled">主要类别</AtomicChip>

   // Secondary category
   <AtomicChip variant="outlined">次要类别</AtomicChip>

   // Background tag
   <AtomicChip variant="ghost">背景标签</AtomicChip>
   ```

4. **Always use semantic colors**:
   ```tsx
   // Success state
   <AtomicChip color="success">成功</AtomicChip>

   // Error state
   <AtomicChip color="error">失败</AtomicChip>

   // Warning state
   <AtomicChip color="warning">警告</AtomicChip>
   ```

5. **Always enable clickable for interactive chips**:
   ```tsx
   <AtomicChip
     clickable
     selected={isSelected}
     onPress={handleToggle}
   >
     可选择的标签
   </AtomicChip>
   ```

### Common Patterns

#### Category Tags
```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <AtomicChip size="sm" variant="outlined">
    {t('category.react')}
  </AtomicChip>
  <AtomicChip size="sm" variant="outlined">
    {t('category.typescript')}
  </AtomicChip>
</View>
```

#### Status Indicators
```tsx
<AtomicChip
  size="sm"
  color={status === 'active' ? 'success' : 'error'}
  leadingIcon={status === 'active' ? 'checkmark-circle' : 'close-circle'}
>
  {t(`status.${status}`)}
</AtomicChip>
```

#### Filter Chips
```tsx
const [selectedFilters, setSelectedFilters] = useState<string[]>();

{filters.map((filter) => (
  <AtomicChip
    key={filter.value}
    clickable
    selected={selectedFilters.includes(filter.value)}
    onPress={() => toggleFilter(filter.value)}
    variant="outlined"
  >
    {filter.label}
  </AtomicChip>
))}
```

#### Removable Tags
```tsx
{tags.map((tag, index) => (
  <AtomicChip
    key={index}
    trailingIcon="close"
    clickable
    onPress={() => removeTag(index)}
    variant="outlined"
  >
    {tag}
  </AtomicChip>
))}
```

#### Skill Tags
```tsx
<AtomicChip
  leadingIcon="code-slash"
  color="info"
  size="sm"
>
  React
</AtomicChip>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Chip content |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | No | `'filled'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Chip size |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'surface'` | No | `'primary'` | Semantic color |
| `leadingIcon` | `string` | No | - | Leading icon name |
| `trailingIcon` | `string` | No | - | Trailing icon name |
| `clickable` | `boolean` | No | `false` | Enable click interaction |
| `onPress` | `() => void` | No | - | Press handler |
| `selected` | `boolean` | No | `false` | Selected state |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `backgroundColor` | `string` | No | - | Custom background color |
| `textColor` | `string` | No | - | Custom text color |
| `borderColor` | `string` | No | - | Custom border color |

## Accessibility

- ✅ Screen reader announces chip content
- ✅ Selected state announced for clickable chips
- ✅ Touch feedback for interactions
- ✅ Minimum touch target: 44x44pt (when clickable)
- ✅ Test ID support for testing

## Performance Tips

1. **Memo chips**: Component is already wrapped in `React.memo`
2. **Stable callbacks**: Use `useCallback` for onPress handlers
3. **Key prop**: Always provide key when rendering lists
4. **Limit count**: Avoid rendering 50+ chips at once

## Related Components

- [`AtomicPicker`](./picker/README.md) - Multi-select picker
- [`AtomicButton`](./button/README.md) - Button component
- [`FormField`](../../molecules/FormField/README.md) - Form field wrapper

## Version History

- **2.6.0**: Added clickable and selected states
- **2.5.0**: Added custom colors support
- **2.0.0**: Initial release with 3 variants

## License

MIT

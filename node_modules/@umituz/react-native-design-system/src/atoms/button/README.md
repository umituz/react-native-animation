# Button

Clickable button component with multiple variants and sizes for React Native applications.

## Import & Usage

```typescript
import { Button } from 'react-native-design-system/src/atoms/button';
```

**Location:** `src/atoms/button/Button.tsx`

## Basic Usage

```tsx
<Button title="Click me" onPress={handlePress} />
```

## Strategy

**Purpose**: Provide consistent, accessible, and performant button interactions throughout the application.

**When to Use**:
- Primary actions (submit, confirm, save)
- Secondary actions (cancel, go back)
- Destructive actions (delete, remove)
- Navigation actions (open link, go to screen)

**When NOT to Use**:
- For navigation - use Navigation components instead
- For complex interactions - use Pressable or TouchableOpacity
- For icon-only buttons - use IconButton instead

## Rules

### Required

1. **ALWAYS** provide a `title` prop (except for loading state)
2. **MUST** have an `onPress` handler (unless disabled)
3. **NEVER** nest buttons inside buttons
4. **ALWAYS** provide accessible label for icon-only buttons
5. **MUST** have adequate touch target size (min 44x44pt)

### Disabled State

1. **MUST** visually indicate disabled state
2. **MUST NOT** respond to touch when disabled
3. **SHOULD** provide reason for disabled state (tooltip or hint)

### Variants

1. **Primary**: Single primary action per screen/section
2. **Secondary**: Multiple secondary actions allowed
3. **Destructive**: Reserved for destructive actions only
4. **Ghost**: For tertiary actions or cancel buttons

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Empty buttons
<Button />

// ❌ Nested buttons
<Button onPress={action1}>
  <Button onPress={action2} />
</Button>

// ❌ Buttons without onPress
<Button title="Click me" />

// ❌ Inline buttons (use Link instead)
<View style={{ flexDirection: 'row' }}>
  <Text>Click </Text>
  <Button title="here" />
</View>

// ❌ Too many primary buttons
<View>
  <Button variant="primary" title="Save" />
  <Button variant="primary" title="Cancel" /> {/* ❌ Use ghost */}
</View>

// ❌ Hardcoded text (use i18n)
<Button title="Submit" /> {/* ❌ Use t('buttons.submit') */}
```

## Best Practices

### Button Placement

✅ **DO**:
- Place primary action at bottom-right or top-right
- Group related actions together
- Use consistent button order (Cancel, OK) or (OK, Cancel)

❌ **DON'T**:
- Place primary action in middle of other actions
- Mix button order inconsistently
- Use too many buttons on one screen

### Button Wording

✅ **DO**:
- Use action verbs (Save, Delete, Cancel)
- Be specific (Save Draft vs Save)
- Use sentence case
- Keep short (1-3 words)

❌ **DON'T**:
- Use ambiguous text (OK, Sure, Submit)
- Use long text (I agree to the terms and conditions)
- Use all caps (CLICK HERE)

### Loading State

✅ **DO**:
```tsx
<Button loading={isLoading} onPress={handleSubmit}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

❌ **DON'T**:
```tsx
// Don't disable entire form during load
<Button disabled={isLoading} />
```

## AI Coding Guidelines

### For AI Agents

When generating Button components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { Button } from 'react-native-design-system/src/atoms/button';
   ```

2. **Always provide required props**:
   ```tsx
   <Button
     title="明确且简洁的标题"
     onPress={具体的处理函数}
     variant="根据上下文选择合适的变体"
   />
   ```

3. **Always handle loading state**:
   ```tsx
   const [loading, setLoading] = useState(false);

   <Button
     loading={loading}
     onPress={async () => {
       setLoading(true);
       await handleAction();
       setLoading(false);
     }}
   />
   ```

4. **Always use i18n for text**:
   ```tsx
   <Button title={t('common.save')} onPress={handleSave} />
   ```

5. **Never disable without reason**:
   ```tsx
   // ❌ Bad
   <Button disabled={true} />

   // ✅ Good
   <Button disabled={!form.isValid} title={form.error || 'Complete form'} />
   ```

### Common Patterns

#### Form Submit Button
```tsx
<Button
  variant="primary"
  title={t('form.submit')}
  onPress={handleSubmit}
  disabled={!isFormValid}
  loading={isSubmitting}
/>
```

#### Destructive Action
```tsx
<Button
  variant="destructive"
  title={t('common.delete')}
  onPress={handleDelete}
  confirmRequired={true}
/>
```

#### Cancel Action
```tsx
<Button
  variant="ghost"
  title={t('common.cancel')}
  onPress={handleCancel}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes* | - | Button text (*not required for loading) |
| `onPress` | `() => void` | Yes | - | Press handler |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | No | `'primary'` | Visual style |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | Button size |
| `disabled` | `boolean` | No | `false` | Disable button |
| `loading` | `boolean` | No | `false` | Show loading indicator |
| `fullWidth` | `boolean` | No | `false` | Expand to full width |
| `icon` | `string` | No | - | Icon name (Ionicons) |

## Accessibility

- ✅ Screen reader announces button title
- ✅ Minimum touch target: 44x44pt
- ✅ Focus visible on keyboard navigation
- ✅ Disabled state announced to screen readers
- ✅ Loading state announced to screen readers

## Performance

1. **Memo handlers**: Use `useCallback` for onPress handlers
2. **Avoid inline functions**: Don't create functions in render
3. **Conditional rendering**: Don't render disabled buttons if action unavailable

## Related Components

- [`IconButton`](./icon-button/README.md) - Icon-only buttons
- [`Link`](./link/README.md) - Navigation links
- [`Pressable`](../pressable/README.md) - Custom pressable components

## Version History

- **2.6.0**: Added loading prop
- **2.5.0**: Added fullWidth support
- **2.0.0**: Initial release with 4 variants

## License

MIT

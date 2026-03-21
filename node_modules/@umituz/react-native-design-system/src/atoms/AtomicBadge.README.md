# AtomicBadge

A small badge component for status indicators, labels, and tags.

## Import & Usage

```typescript
import { AtomicBadge } from 'react-native-design-system/src/atoms/AtomicBadge';
```

**Location:** `src/atoms/AtomicBadge.tsx`

## Basic Usage

```tsx
<AtomicBadge text="New" variant="success" />
```

## Strategy

**Purpose**: Display status information, categories, or labels in compact form.

**When to Use**:
- Status indicators (active, pending, verified)
- Category tags (product types, topics)
- Count badges (notifications, messages)
- Labels (new, featured, beta)
- Priority indicators (high, low, urgent)

**When NOT to Use**:
- For large content blocks
- As buttons (use button with badge instead)
- For complex interactions

## Rules

### Required

1. **MUST** provide `text` prop
2. **ALWAYS** use appropriate variant for meaning
3. **SHOULD** use appropriate size for context
4. **MUST** have accessible labeling
5. **ALWAYS** use semantic colors meaningfully
6. **SHOULD** include icons when helpful

### Variant Selection

1. **primary**: General labels, categories
2. **success**: Positive status (active, verified, complete)
3. **warning**: Caution status (pending, review)
4. **error**: Negative status (inactive, failed, error)
5. **info**: Informational labels
6. **secondary**: Neutral labels

### Size Guidelines

1. **sm**: Inline text, compact lists
2. **md**: Default, most use cases
3. **lg**: Emphasis, featured badges

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No text
<AtomicBadge /> {/* ❌ Missing required prop */}

// ❌ Wrong variant for meaning
<AtomicBadge
  text="Error"
  variant="success" {/* ❌ Confusing */}
/>

// ❌ Too large for context
<AtomicText>
  This is <AtomicBadge text="NEW" size="lg" /> item {/* ❌ Too large */}
</AtomicText>

// ❌ Generic text
<AtomicBadge text="Label" /> {/* ❌ Not helpful */}
```

## Best Practices

### Variant Selection

✅ **DO**:
```tsx
<AtomicBadge text="Active" variant="success" />
<AtomicBadge text="Pending" variant="warning" />
<AtomicBadge text="Inactive" variant="error" />
<AtomicBadge text="Beta" variant="info" />
```

❌ **DON'T**:
```tsx
// ❌ Confusing variants
<AtomicBadge text="Success" variant="error" />
```

### With Icons

✅ **DO**:
```tsx
<AtomicBadge
  text="Verified"
  variant="success"
  icon="checkmark-circle"
/>
```

## AI Coding Guidelines

### For AI Agents

1. **Always provide text**:
   ```tsx
   // ✅ Good
   <AtomicBadge text="New" />

   // ❌ Bad
   <AtomicBadge />
   ```

2. **Always use appropriate variant**:
   ```tsx
   // ✅ Good - meaningful variants
   <AtomicBadge text="Active" variant="success" />
   <AtomicBadge text="Failed" variant="error" />

   // ❌ Bad - confusing variants
   <AtomicBadge text="Error" variant="success" />
   ```

3. **Always use appropriate size**:
   ```tsx
   // ✅ Good - size matches context
   <AtomicText>
     <AtomicBadge text="New" size="sm" /> Item
   </AtomicText>

   // ❌ Bad - too large
   <AtomicText>
     <AtomicBadge text="New" size="lg" /> Item
   </AtomicText>
   ```

### Common Patterns

#### Status Badge
```tsx
<AtomicBadge text="Active" variant="success" />
```

#### With Icon
```tsx
<AtomicBadge
  text="Verified"
  variant="success"
  icon="checkmark-circle"
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Yes | - | Badge text |
| `variant` | `BadgeVariant` | No | `'primary'` | Badge variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Badge size |
| `icon` | `string` | No | - | Icon name |

## Accessibility

- ✅ Screen reader support
- ✅ Semantic colors
- ✅ Touch target size

## Related Components

- [`AtomicChip`](./AtomicChip.README.md) - Interactive chips
- [`AtomicIcon`](./AtomicIcon.README.md) - Icon component
- [`AtomicText`](./AtomicText.README.md) - Text component

## License

MIT

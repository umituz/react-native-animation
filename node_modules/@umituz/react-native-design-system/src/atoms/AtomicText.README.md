# AtomicText

A theme-aware text component with Material Design 3 typography system.

## Import & Usage

```typescript
import { AtomicText } from 'react-native-design-system/src/atoms/AtomicText';
```

**Location:** `src/atoms/AtomicText.tsx`

## Basic Usage

```tsx
<AtomicText>Hello World</AtomicText>
```

## Strategy

**Purpose**: Provide consistent, theme-integrated typography.

**When to Use**:
- ALL text display
- Headlines, titles, body text
- Labels, captions
- Any text content

**When NOT to Use**:
- Never - use for all text display

## Rules

### Required

1. **MUST** use appropriate `type` for hierarchy
2. **ALWAYS** use semantic colors for meaning
3. **SHOULD** maintain consistent spacing
4. **MUST** be accessible (contrast, font scaling)
5. **ALWAYS** use convenience props for spacing
6. **SHOULD** follow content hierarchy

### Typography Hierarchy

1. **Display**: Hero content (rare)
2. **Headline**: Page/section titles
3. **Title**: Card titles, list items
4. **Label**: Buttons, tags, fields
5. **Body**: Main content (default)

### Color Semantics

1. **textPrimary**: Main content
2. **textSecondary**: Supporting content
3. **textTertiary**: Placeholder, disabled
4. **primary/secondary/success/error**: Semantic meaning

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Wrong hierarchy
<AtomicText type="displayLarge">Small note</AtomicText> {/* ❌ Too large */}

<AtomicText type="bodySmall">Main Title</AtomicText> {/* ❌ Too small */}

// ❌ Confusing colors
<AtomicText type="headlineLarge" color="error">
  Success Message {/* ❌ Confusing */}
</AtomicText>

// ❌ Manual spacing
<AtomicText type="titleLarge">
  Title
</AtomicText>
<View style={{ height: 16 }} /> {/* ❌ Use marginTop */}
<AtomicText>Content</AtomicText>

// ❌ Inline styles for standard props
<AtomicText
  style={{ fontSize: 16, fontWeight: '600', color: 'blue' }}
  // ❌ Should use type and color props
/>
```

## Best Practices

### Typography Hierarchy

✅ **DO**:
```tsx
<AtomicText type="headlineLarge">Page Title</AtomicText>
<AtomicText type="titleMedium">Card Title</AtomicText>
<AtomicText type="bodyMedium">Body content</AtomicText>
<AtomicText type="labelSmall">Button text</AtomicText>
```

❌ **DON'T**:
```tsx
// ❌ Wrong types
<AtomicText type="bodySmall">Page Title</AtomicText>
<AtomicText type="displayLarge">Caption</AtomicText>
```

### Semantic Colors

✅ **DO**:
```tsx
<AtomicText color="textPrimary">Main content</AtomicText>
<AtomicText color="textSecondary">Secondary info</AtomicText>
<AtomicText color="error">Error message</AtomicText>
<AtomicText color="success">Success message</AtomicText>
```

❌ **DON'T**:
```tsx
// ❌ Hardcoded colors
<AtomicText style={{ color: '#FF0000' }}>Error</AtomicText>

// ❌ Confusing semantics
<AtomicText color="success">Error occurred</AtomicText>
```

### Convenience Props

✅ **DO**:
```tsx
<AtomicText type="titleLarge" marginBottom="sm">
  Title
</AtomicText>
<AtomicText marginTop="sm">
  Content
</AtomicText>
```

❌ **DON'T**:
```tsx
// ❌ Manual spacing
<AtomicText type="titleLarge">Title</AtomicText>
<View style={{ height: 12 }} />
<AtomicText>Content</AtomicText>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicText components, follow these rules:

1. **Always use appropriate type**:
   ```tsx
   // ✅ Good - correct hierarchy
   <AtomicText type="headlineLarge">Page Title</AtomicText>
   <AtomicText type="bodyMedium">Content</AtomicText>

   // ❌ Bad - wrong hierarchy
   <AtomicText type="bodySmall">Page Title</AtomicText>
   ```

2. **Always use semantic colors**:
   ```tsx
   // ✅ Good - semantic colors
   <AtomicText color="textPrimary">Main</AtomicText>
   <AtomicText color="error">Error</AtomicText>

   // ❌ Bad - hardcoded
   <AtomicText style={{ color: '#000' }}>Text</AtomicText>
   ```

3. **Always use convenience props**:
   ```tsx
   // ✅ Good
   <AtomicText type="titleLarge" marginBottom="md">Title</AtomicText>

   // ❌ Bad
   <AtomicText type="titleLarge" style={{ marginBottom: 16 }}>Title</AtomicText>
   ```

### Common Patterns

#### Headline
```tsx
<AtomicText type="headlineLarge">Page Title</AtomicText>
```

#### Body with Color
```tsx
<AtomicText type="bodyMedium" color="textSecondary">
  Description text
</AtomicText>
```

#### With Spacing
```tsx
<AtomicText type="titleLarge" marginBottom="sm">
  Title
</AtomicText>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `TextStyleVariant` | No | `'bodyMedium'` | Typography style |
| `color` | `ColorVariant \| string` | No | `'textPrimary'` | Text color |
| `align` | `TextAlign` | No | - | Text alignment |
| `fontWeight` | `TextStyle['fontWeight']` | No | - | Font weight |
| `marginTop` | `keyof Spacing` | No | - | Top margin |
| `marginBottom` | `keyof Spacing` | No | - | Bottom margin |
| `children` | `ReactNode` | Yes | - | Text content |

## Accessibility

- ✅ Screen reader support
- ✅ Semantic meaning
- ✅ Contrast ratio
- ✅ Font scaling support

## Performance Tips

1. **Stabilize props**: Memo text styles
2. **Avoid inline styles**: Use type prop
3. **Memo content**: Memo long text blocks

## Related Components

- [`AtomicButton`](./AtomicButton.README.md) - Button component
- [`FormField`](../molecules/FormField) - Form wrapper
- [`AtomicInput`](./AtomicInput.README.md) - Input component

## License

MIT

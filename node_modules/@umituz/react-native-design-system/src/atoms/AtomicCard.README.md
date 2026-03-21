# AtomicCard

A simple and customizable card container component for React Native. Designed following Material Design 3 principles.

## Import & Usage

```typescript
import { AtomicCard } from 'react-native-design-system/src/atoms/AtomicCard';
```

**Location:** `src/atoms/AtomicCard.tsx`

## Basic Usage

```tsx
<AtomicCard>
  <AtomicText>Card content</AtomicText>
</AtomicCard>
```

## Strategy

**Purpose**: Provide a flexible container component for grouping related content with visual separation.

**When to Use**:
- Grouping related content (product details, user profiles, settings)
- Creating clickable list items
- Displaying information cards (stats, summaries)
- Building card-based layouts (dashboards, feeds)
- Highlighting important content sections

**When NOT to Use**:
- For full-page layouts (use ScreenLayout instead)
- For simple dividers or borders (use separators)
- As a replacement for proper modal or sheet components
- When you need complex card features (actions, menus) - use molecule cards instead

## Rules

### Required

1. **MUST** have meaningful content inside the card
2. **ALWAYS** provide padding for content (don't rely on card padding alone)
3. **SHOULD** use appropriate variant for the context
4. **MUST** have touch feedback if pressable
5. **ALWAYS** provide accessibility context if interactive
6. **SHOULD** maintain consistent spacing within card
7. **MUST** not nest cards unnecessarily (max 2 levels)

### Variant Selection

1. **Elevated**: Default, for most cards with depth
2. **Outlined**: For less emphasis, grouping content
3. **Filled**: For highest emphasis or contrasting backgrounds

### Padding Guidelines

1. **None**: When content has its own padding or is full-width
2. **Small (sm)**: For dense content or compact cards
3. **Medium (md)**: Default for most cards
4. **Large (lg)**: For spacious cards with minimal content

### Pressable Cards

1. **MUST** provide `onPress` callback
2. **SHOULD** have visual feedback
3. **MUST** announce interactivity to screen readers
4. **SHOULD** have clear affordance (icon, chevron, etc.)

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Empty card
<AtomicCard /> {/* ❌ No content */}

// ❌ Wrong variant for emphasis
<AtomicCard variant="elevated"> {/* ❌ Too much emphasis */}
  <AtomicText type="bodySmall">Small hint</AtomicText>
</AtomicCard>

// ❌ Pressable without callback
<AtomicCard
  onPress {/* ❌ Missing handler */}
>
  <AtomicText>Click me</AtomicText>
</AtomicCard>

// ❌ Deep nesting
<AtomicCard>
  <AtomicCard>
    <AtomicCard> {/* ❌ Too nested */}
      <Content />
    </AtomicCard>
  </AtomicCard>
</AtomicCard>

// ❌ Inconsistent padding
<AtomicCard padding="none">
  <View style={{ padding: 20 }}> {/* ❌ Manual padding */}
    <Content />
  </View>
</AtomicCard>

// ❌ Card for simple border
<AtomicCard variant="outlined">
  <Content />
</AtomicCard>
// ❌ Should use View with borderStyle instead

// ❌ Pressable card without accessibility context
<AtomicCard onPress={handleAction}>
  <AtomicText>Click</AtomicText>
</AtomicCard>
// ❌ No accessibilityLabel or hint
```

## Best Practices

### Variant Selection

✅ **DO**:
```tsx
// ✅ Default elevated card
<AtomicCard variant="elevated">
  <ProductDetails />
</AtomicCard>

// ✅ List item with outline
<FlatList
  data={items}
  renderItem={({ item }) => (
    <AtomicCard variant="outlined" padding="sm">
      <ListItemContent item={item} />
    </AtomicCard>
  )}
/>

// ✅ Highlighted section with filled
<AtomicCard variant="filled" padding="lg">
  <FeaturedContent />
</AtomicCard>
```

❌ **DON'T**:
```tsx
// ❌ Over-emphasizing minor content
<AtomicCard variant="elevated">
  <AtomicText type="bodySmall">Tip</AtomicText>
</AtomicCard>

// ❌ Under-emphasizing important content
<AtomicCard variant="outlined">
  <AtomicText type="headlineLarge">Critical Alert</AtomicText>
</AtomicCard>
```

### Padding Usage

✅ **DO**:
```tsx
// ✅ Dense content
<AtomicCard variant="outlined" padding="sm">
  <DenseListItems />
</AtomicCard>

// ✅ Normal content
<AtomicCard padding="md">
  <CardContent />
</AtomicCard>

// ✅ Minimal content
<AtomicCard padding="lg">
  <AtomicText align="center">Empty State</AtomicText>
</AtomicCard>
```

❌ **DON'T**:
```tsx
// ❌ No padding with unpadded content
<AtomicCard padding="none">
  <AtomicText>No breathing room</AtomicText>
</AtomicCard>

// ❌ Too much padding
<AtomicCard padding="lg">
  <DenseContent />
</AtomicCard>
```

### Pressable Cards

✅ **DO**:
```tsx
// ✅ Interactive card
<AtomicCard
  onPress={() => navigate('Detail', { id })}
  padding="md"
>
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flex: 1 }}>
      <AtomicText fontWeight="600">Title</AtomicText>
      <AtomicText type="bodySmall" color="textSecondary">
        Description
      </AtomicText>
    </View>
    <AtomicIcon name="chevron-forward" />
  </View>
</AtomicCard>
```

❌ **DON'T**:
```tsx
// ❌ Pressable without clear affordance
<AtomicCard onPress={handleAction}>
  <AtomicText>Click me somehow</AtomicText>
</AtomicCard>

// ❌ Missing accessibility
<AtomicCard onPress={handleAction}>
  <Content />
</AtomicCard>
```

### Content Organization

✅ **DO**:
```tsx
// ✅ Structured card content
<AtomicCard padding="md">
  <View style={{ marginBottom: 12 }}>
    <AtomicText type="titleMedium">Title</AtomicText>
  </View>
  <View style={{ marginBottom: 12 }}>
    <AtomicText type="bodyMedium">Description</AtomicText>
  </View>
  <View>
    <AtomicText type="bodySmall" color="textSecondary">
      Metadata
    </AtomicText>
  </View>
</AtomicCard>
```

❌ **DON'T**:
```tsx
// ❌ Unstructured content
<AtomicCard>
  <AtomicText>Title</AtomicText>
  <AtomicText>Description</AtomicText>
  <AtomicText>More</AtomicText>
  <AtomicText>Even more</AtomicText>
  {/* No spacing or hierarchy */}
</AtomicCard>
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicCard components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { AtomicCard } from 'react-native-design-system/src/atoms/AtomicCard';
   ```

2. **Always choose appropriate variant**:
   ```tsx
   // ✅ Good - variant matches emphasis
   <AtomicCard variant="elevated">
     <ImportantContent />
   </AtomicCard>
   <AtomicCard variant="outlined">
     <SecondaryContent />
   </AtomicCard>

   // ❌ Bad - wrong variant
   <AtomicCard variant="elevated">
     <MinorHint />
   </AtomicCard>
   ```

3. **Always use padding appropriately**:
   ```tsx
   // ✅ Good - padding matches content density
   <AtomicCard padding="sm">
     <DenseContent />
   </AtomicCard>
   <AtomicCard padding="lg">
     <MinimalContent />
   </AtomicCard>

   // ❌ Bad - wrong padding
   <AtomicCard padding="none">
     <ContentWithoutSpacing />
   </AtomicCard>
   ```

4. **Always handle pressable cards properly**:
   ```tsx
   // ✅ Good - pressable with affordance
   <AtomicCard
     onPress={() => navigate('Detail')}
     accessibilityLabel="View details"
     accessibilityRole="button"
   >
     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
       <View style={{ flex: 1 }}>
         <AtomicText fontWeight="600">Title</AtomicText>
       </View>
       <AtomicIcon name="chevron-forward" />
     </View>
   </AtomicCard>

   // ❌ Bad - pressable without affordance
   <AtomicCard onPress={handleAction}>
     <AtomicText>Click me</AtomicText>
   </AtomicCard>
   ```

5. **Always structure card content**:
   ```tsx
   // ✅ Good - clear structure
   <AtomicCard padding="md">
     <View style={{ marginBottom: 12 }}>
       <AtomicText type="titleMedium">Title</AtomicText>
     </View>
     <View>
       <AtomicText type="bodyMedium">Content</AtomicText>
     </View>
   </AtomicCard>

   // ❌ Bad - no structure
   <AtomicCard>
     <AtomicText>Title</AtomicText>
     <AtomicText>Content</AtomicText>
   </AtomicCard>
   ```

### Common Patterns

#### Basic Card
```tsx
<AtomicCard padding="md">
  <AtomicText>Card content</AtomicText>
</AtomicCard>
```

#### Clickable Card
```tsx
<AtomicCard
  onPress={() => navigate('Detail')}
  padding="md"
  accessibilityLabel="View details"
>
  <Content />
</AtomicCard>
```

#### List Item Card
```tsx
<FlatList
  data={items}
  renderItem={({ item }) => (
    <AtomicCard
      key={item.id}
      variant="outlined"
      padding="sm"
      onPress={() => handleItemPress(item)}
      style={{ marginBottom: 12 }}
    >
      <ListItemContent item={item} />
    </AtomicCard>
  )}
/>
```

#### Product Card
```tsx
<AtomicCard variant="elevated" padding="md">
  <AtomicText type="titleMedium" fontWeight="600">
    {product.name}
  </AtomicText>
  <AtomicText type="bodyMedium" color="textSecondary" marginTop="sm">
    {product.description}
  </AtomicText>
  <AtomicText type="titleLarge" color="primary" marginTop="md">
    ${product.price}
  </AtomicText>
</AtomicCard>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Card content |
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | No | `'elevated'` | Card visual style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | No | `'md'` | Internal padding |
| `onPress` | `(event: GestureResponderEvent) => void` | No | - | Press callback |
| `disabled` | `boolean` | No | `false` | Disable press |
| `style` | `ViewStyle` | No | - | Custom style |
| `testID` | `string` | No | - | Test identifier |

### AtomicCardVariant

```typescript
type AtomicCardVariant =
  | 'elevated'  // Shadow effect (default)
  | 'outlined'  // Border effect
  | 'filled';   // Background fill effect
```

### AtomicCardPadding

```typescript
type AtomicCardPadding =
  | 'none'  // No padding
  | 'sm'    // Small padding
  | 'md'    // Medium padding (default)
  | 'lg';   // Large padding
```

## Accessibility

- ✅ Touch target size maintained (min 44x44pt)
- ✅ Screen reader support for pressable cards
- ✅ Disabled state announced
- ✅ Test ID support for testing

## Performance Tips

1. **FlatList optimization**: Provide `key` prop for list items
2. **Avoid inline styles**: Use theme tokens or StyleSheet
3. **Memoization**: Memo card content if complex
4. **Limit nesting**: Don't nest cards more than 2 levels

## Related Components

- [`MediaCard`](../molecules/media-card) - Media card with image
- [`GlowingCard`](../molecules/GlowingCard) - Glowing effect card
- [`FormField`](../molecules/FormField) - Form field component

## License

MIT

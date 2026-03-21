# List

List is a responsive FlatList wrapper component with pull-to-refresh support, content padding, and theme-aware colors.

## Import & Usage

```typescript
import { List } from 'react-native-design-system/src/molecules/List';
```

**Location:** `src/molecules/List/List.tsx`

## Basic Usage

```tsx
<List
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
/>
```

## Strategy

**Purpose**: Provide a performant, theme-aware list component that wraps React Native's FlatList with sensible defaults.

**When to Use**:
- Displaying scrolling lists of data
- Rendering large datasets efficiently
- Implementing pull-to-refresh functionality
- Creating infinite scroll lists

**When NOT to Use**:
- For small static lists - use ScrollView or map
- For simple layouts - use FlatList directly
- For grid layouts - use FlatList with numColumns

## Rules

### Required

1. **ALWAYS** provide `data` array
2. **MUST** provide `renderItem` function
3. **ALWAYS** provide `keyExtractor` function
4. **NEVER** use array index as key
5. **MUST** handle empty state

### Performance

1. **ALWAYS** use stable keys from data
2. **MUST** memoize renderItem with useCallback
3. **SHOULD** use `getItemLayout` for fixed-size items
4. **NEVER** inline renderItem function

### Key Extraction

1. **ALWAYS** use unique IDs from data
2. **NEVER** use array index as key
3. **MUST** be stable across re-renders
4. **SHOULD** be unique across all items

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Missing required props
<List /> {/* Missing data, renderItem, keyExtractor */}

// ❌ Using index as key
<List
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item, index) => index.toString()} // ❌ Bad
/>

// ❌ Inline renderItem
<List
  data={items}
  renderItem={({ item }) => ( // ❌ Not memoized
    <ItemCard item={item} />
  )}
  keyExtractor={(item) => item.id}
/>

// ❌ No keyExtractor
<List
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  // Missing keyExtractor ❌
/>

// ❌ No empty state
<List
  data={[]} // Empty but no empty state shown
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>

// ❌ Wrong data type
<List
  data="not an array" // ❌ Should be array
  renderItem={renderItem}
  keyExtractor={keyExtractor}
/>
```

## Best Practices

### Key Extraction

✅ **DO**:
```tsx
// Use unique ID
keyExtractor={(item) => item.id}

// Use composite key
keyExtractor={(item) => `${item.type}-${item.id}`}

// Use slug/UUID
keyExtractor={(item) => item.slug}
```

❌ **DON'T**:
```tsx
// Don't use index
keyExtractor={(item, index) => index.toString()} // ❌

// Don't use mutable values
keyExtractor={(item) => item.name} // May change ❌
```

### Performance

✅ **DO**:
```tsx
// Memoize renderItem
const renderItem = useCallback(({ item }) => (
  <ItemCard item={item} />
), []);

// Use getItemLayout for fixed sizes
getItemLayout={(data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
})}
```

❌ **DON'T**:
```tsx
// Don't create functions in render
<List
  renderItem={({ item }) => <ItemCard item={item} />} // ❌ New function each render
/>
```

### Content Padding

✅ **DO**:
```tsx
// Use built-in contentPadding
<List contentPadding />

// Manual padding for custom layouts
<List
  contentContainerStyle={{ padding: 16 }}
/>
```

❌ **DON'T**:
```tsx
// Don't add unnecessary wrapper
<View style={{ padding: 16 }}>
  <List /> {/* Extra wrapper ❌ */}
</View>
```

### Empty State

✅ **DO**:
```tsx
{data.length === 0 ? (
  <EmptyState
    icon="inbox-outline"
    title="No items"
    message="Get started by adding your first item"
  />
) : (
  <List data={data} />
)}
```

❌ **DON'T**:
```tsx
// Don't show empty list
<List data={[]} /> {/* Shows nothing ❌ */}
```

## AI Coding Guidelines

### For AI Agents

When generating List components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { List } from 'react-native-design-system/src/molecules/List';
   ```

2. **Always provide required props**:
   ```tsx
   <List
     data={dataArray}
     renderItem={renderItemFunction}
     keyExtractor={keyExtractorFunction}
   />
   ```

3. **Always use unique keys**:
   ```tsx
   // ✅ Good
   keyExtractor={(item) => item.id}

   // ❌ Bad
   keyExtractor={(item, index) => index.toString()}
   ```

4. **Always memoize renderItem**:
   ```tsx
   const renderItem = useCallback(({ item }) => (
     <ItemCard item={item} />
   ), []);
   ```

5. **Never use inline functions**:
   ```tsx
   // ❌ Bad
   <List
     renderItem={({ item }) => <ItemCard item={item} />}
   />

   // ✅ Good
   const renderItem = useCallback(({ item }) => (
     <ItemCard item={item} />
   ), []);
   <List renderItem={renderItem} />
   ```

### Common Patterns

#### Basic List
```tsx
const renderItem = useCallback(({ item }) => (
  <ListItem
    title={item.title}
    onPress={() => navigateToDetail(item.id)}
  />
), []);

<List
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  contentPadding
/>
```

#### Pull-to-Refresh
```tsx
const [refreshing, setRefreshing] = useState(false);

const onRefresh = useCallback(async () => {
  setRefreshing(true);
  await loadData();
  setRefreshing(false);
}, []);

<List
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  onRefresh={onRefresh}
  refreshing={refreshing}
/>
```

#### Infinite Scroll
```tsx
const [loading, setLoading] = useState(false);

const loadMore = useCallback(async () => {
  if (loading) return;
  setLoading(true);
  const newItems = await fetchMore();
  setItems([...items, ...newItems]);
  setLoading(false);
}, [loading, items]);

<List
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  ListFooterComponent={loading ? <LoadingSpinner /> : null}
/>
```

#### Grid Layout
```tsx
<List
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  numColumns={2}
  columnWrapperStyle={{ gap: 8 }}
  contentPadding
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `T[]` | Yes | - | List data array |
| `renderItem` | `ListRenderItem<T>` | Yes | - | Render function |
| `keyExtractor` | `(item, index) => string` | Yes | - | Key extractor |
| `onRefresh` | `() => void` | No | - | Refresh callback |
| `refreshing` | `boolean` | No | `false` | Refreshing state |
| `contentPadding` | `boolean` | No | `false` | Add content padding |

**Note:** List supports all FlatList props.

## Accessibility

- ✅ Screen reader announces list items
- ✅ Semantic list structure
- ✅ Focus management for keyboard navigation
- ✅ Accessibility labels supported
- ✅ Proper list semantics

## Performance

1. **Key extraction**: Use unique, stable keys
2. **Memoization**: Memo renderItem function
3. **Windowing**: Uses FlatList windowing
4. **Optimization**: Consider `removeClippedSubviews` for large lists
5. **Layout**: Use `getItemLayout` for fixed-size items
6. **Batching**: Batch updates to data

## Related Components

- [`FlatList`](https://reactnative.dev/docs/flatlist) - React Native FlatList
- [`ListItem`](../listitem/README.md) - List item component
- [`MediaCard`](../media-card/README.md) - Media card component
- [`Avatar`](../avatar/README.md) - Avatar component

## License

MIT

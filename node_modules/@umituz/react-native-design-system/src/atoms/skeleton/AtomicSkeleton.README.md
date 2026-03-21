# AtomicSkeleton

A placeholder component shown while content is loading. Displays different patterns including lists, cards, avatars, and text.

## Import & Usage

```typescript
import { AtomicSkeleton } from 'react-native-design-system/src/atoms/skeleton/AtomicSkeleton';
```

**Location:** `src/atoms/skeleton/AtomicSkeleton.tsx`

## Basic Usage

```tsx
<AtomicSkeleton pattern="list" count={3} />
```

## Strategy

**Purpose**: Improve perceived performance by showing placeholder content while actual data loads.

**When to Use**:
- During initial page load
- For list items loading (feed, search results)
- For card-based content loading (products, profiles)
- For image loading states
- When content structure is predictable

**When NOT to Use**:
- For quick operations (< 500ms) - use spinner instead
- When content structure is unknown/variable
- For error states (use EmptyState instead)
- For static content that doesn't load
- As a decorative element

## Rules

### Required

1. **MUST** match skeleton pattern to actual content structure
2. **ALWAYS** remove skeleton when data arrives
3. **SHOULD** use appropriate count for expected content
4. **MUST** be hidden from screen readers (loading placeholder only)
5. **ALWAYS** use semantic patterns (list, card, avatar) when applicable
6. **SHOULD** keep skeleton duration reasonable (< 3 seconds preferred)
7. **MUST** not skeleton for very quick loads (< 300ms)

### Pattern Selection

1. **List**: For list items, feed items, search results
2. **Card**: For product cards, info cards
3. **Avatar**: For user avatars, profile pictures
4. **Text**: For paragraphs, descriptions
5. **Custom**: For unique layouts (define shapes)

### Count Guidelines

1. **Lists**: Use 3-5 skeletons for initial load
2. **Cards**: Use 2-6 skeletons depending on grid
3. **Avatars**: Use 5-10 for user lists
4. **Text**: Use 1-3 lines per section

### Custom Skeletons

1. **MUST** match actual content dimensions
2. **SHOULD** follow content spacing
3. **MUST** use appropriate borderRadius for shapes
4. **SHOULD** keep total elements reasonable (< 10 per skeleton)

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Skeleton never removed
{loading && <AtomicSkeleton />} {/* ❌ Always shows */}
{/* Even when data arrives */}

// ❌ Wrong pattern for content
<AtomicSkeleton pattern="avatar" /> {/* ❌ Content is text */}
// Actual content: <AtomicText>Long description</AtomicText>

// ❌ Too many skeletons
<AtomicSkeleton pattern="list" count={20} /> {/* ❌ Too many */}

// ❌ Skeleton for quick load
useEffect(() => {
  setLoading(true);
  fetchData(); {/* ❌ Takes 200ms, shouldn't skeleton */}
  setLoading(false);
}, []);

// ❌ Not matching content structure
<AtomicSkeleton pattern="list" />
// Actual content:
<View style={{ flexDirection: 'row' }}>
  <Image />
  <View>
    <Text>Title</Text>
    <Text>Description</Text>
  </View>
</View>

// ❌ Custom skeleton wrong dimensions
<AtomicSkeleton
  pattern="custom"
  custom={[{ width: 100, height: 100 }]} {/* ❌ Too large */}
/>
// Actual: <Image style={{ width: 50, height: 50 }} />

// ❌ Complex custom skeleton
<AtomicSkeleton
  pattern="custom"
  custom={[
    /* ❌ 20+ elements, too complex */
    { width: '100%', height: 200 },
    { width: '80%', height: 20 },
    // ... 18 more
  ]}
/>
```

## Best Practices

### Pattern Selection

✅ **DO**:
```tsx
// ✅ Match pattern to content
{loading ? (
  <AtomicSkeleton pattern="list" count={3} />
) : (
  <FlatList
    data={items}
    renderItem={({ item }) => <ListItem item={item} />}
  />
)}

// ✅ Card pattern for cards
{loading ? (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
    <AtomicSkeleton pattern="card" count={6} />
  </View>
) : (
  <ProductGrid products={products} />
)}
```

❌ **DON'T**:
```tsx
// ❌ Wrong pattern
{loading ? (
  <AtomicSkeleton pattern="avatar" /> {/* Wrong! */}
) : (
  <FlatList data={items} renderItem={({ item }) => <Text>{item.title}</Text>} />
)}

// ❌ Generic pattern when specific exists
<AtomicSkeleton
  pattern="custom"
  custom={[{ width: '100%', height: 60 }]} {/* Should use "list" */}
/>
```

### Appropriate Count

✅ **DO**:
```tsx
// ✅ Reasonable count
<AtomicSkeleton pattern="list" count={3} />
<AtomicSkeleton pattern="card" count={4} />
<AtomicSkeleton pattern="avatar" count={8} />
```

❌ **DON'T**:
```tsx
// ❌ Too many skeletons
<AtomicSkeleton pattern="list" count={15} />
<AtomicSkeleton pattern="card" count={12} />

// ❌ Too few skeletons
<AtomicSkeleton pattern="list" count={1} /> {/* Shows too little */}
```

### Removing Skeleton

✅ **DO**:
```tsx
// ✅ Proper loading state
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } finally {
      setLoading(false); // ✅ Always completes
    }
  };
  loadData();
}, []);

{loading ? (
  <AtomicSkeleton pattern="list" count={3} />
) : (
  <DataList data={data} />
)}
```

❌ **DON'T**:
```tsx
// ❌ Skeleton never removed
const [loading, setLoading] = useState(false);

{loading && <AtomicSkeleton />} {/* Never shows actual content */}

// ❌ Skeleton shows with data
<View>
  {loading && <AtomicSkeleton />}
  <DataList data={data} /> {/* Shows together! */}
</View>
```

### Custom Skeletons

✅ **DO**:
```tsx
// ✅ Match content structure
const skeletonCustom = [
  { width: '100%', height: 200, borderRadius: 12 }, // Image
  { width: '80%', height: 24, borderRadius: 4, marginBottom: 12 }, // Title
  { width: '100%', height: 16, borderRadius: 4, marginBottom: 8 }, // Line 1
  { width: '60%', height: 16, borderRadius: 4 }, // Line 2
];

{loading ? (
  <AtomicSkeleton pattern="custom" custom={skeletonCustom} />
) : (
  <ProductDetail product={product} />
)}
```

❌ **DON'T**:
```tsx
// ❌ Wrong dimensions
<AtomicSkeleton
  pattern="custom"
  custom={[{ width: 50, height: 50 }]} {/* Way too small */}
/>

// ❌ Too complex
<AtomicSkeleton
  pattern="custom"
  custom={Array.from({ length: 20 }).map(() => ({ /* ... */ }))} {/* Too many */}
/>
```

### Duration Considerations

✅ **DO**:
```tsx
// ✅ Show skeleton only if loading takes time
const [showSkeleton, setShowSkeleton] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setShowSkeleton(true), 300);
  // Only show skeleton if loading takes > 300ms

  const loadData = async () => {
    const result = await fetchData();
    setLoading(false);
    setShowSkeleton(false);
  };

  loadData();
  return () => clearTimeout(timer);
}, []);

{showSkeleton && loading ? (
  <AtomicSkeleton pattern="list" count={3} />
) : loading ? null : (
  <DataList data={data} />
)}
```

❌ **DON'T**:
```tsx
// ❌ Skeleton flashes for quick loads
{loading && <AtomicSkeleton />} {/* Flashes for 200ms loads */}
```

## AI Coding Guidelines

### For AI Agents

When generating AtomicSkeleton components, follow these rules:

1. **Always match pattern to content**:
   ```tsx
   // ✅ Good - pattern matches content
   {loading ? (
     <AtomicSkeleton pattern="list" count={3} />
   ) : (
     <FlatList data={items} renderItem={({ item }) => <ListItem />} />
   )}

   // ❌ Bad - pattern doesn't match
   {loading ? (
     <AtomicSkeleton pattern="card" />
   ) : (
     <FlatList data={items} renderItem={({ item }) => <Text>{item.title}</Text>} />
   )}
   ```

2. **Always remove skeleton when data arrives**:
   ```tsx
   // ✅ Good - proper conditional
   {loading ? (
     <AtomicSkeleton pattern="list" count={3} />
   ) : (
     <DataContent data={data} />
   )}

   // ❌ Bad - skeleton with content
   <View>
     {loading && <AtomicSkeleton />}
     <DataContent data={data} />
   </View>
   ```

3. **Always use reasonable count**:
   ```tsx
   // ✅ Good - appropriate count
   <AtomicSkeleton pattern="list" count={3} />
   <AtomicSkeleton pattern="card" count={4} />

   // ❌ Bad - too many or too few
   <AtomicSkeleton pattern="list" count={15} />
   <AtomicSkeleton pattern="list" count={1} />
   ```

4. **Always match custom skeleton dimensions**:
   ```tsx
   // ✅ Good - dimensions match content
   <AtomicSkeleton
     pattern="custom"
     custom={[
       { width: 100, height: 100, borderRadius: 50 }, // Avatar
       { width: 150, height: 20, borderRadius: 4 }, // Name
     ]}
   />

   // ❌ Bad - wrong dimensions
   <AtomicSkeleton
     pattern="custom"
     custom={[
       { width: 50, height: 50 }, // Way too small
       { width: 300, height: 50 }, // Too large
     ]}
   />
   ```

5. **Always avoid skeleton for quick loads**:
   ```tsx
   // ✅ Good - delay skeleton
   const [showSkeleton, setShowSkeleton] = useState(false);
   useEffect(() => {
     const timer = setTimeout(() => setShowSkeleton(true), 300);
     return () => clearTimeout(timer);
   }, []);

   // ❌ Bad - skeleton flashes
   {loading && <AtomicSkeleton />} {/* Even for 200ms loads */}
   ```

### Common Patterns

#### List Loading
```tsx
{loading ? (
  <AtomicSkeleton pattern="list" count={3} />
) : (
  <FlatList data={items} renderItem={({ item }) => <ListItem item={item} />} />
)}
```

#### Card Grid Loading
```tsx
{loading ? (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
    <AtomicSkeleton pattern="card" count={6} />
  </View>
) : (
  <ProductGrid products={products} />
)}
```

#### Avatar List Loading
```tsx
{loading ? (
  <AtomicSkeleton pattern="avatar" count={8} />
) : (
  <UserList users={users} />
)}
```

#### Custom Skeleton
```tsx
{loading ? (
  <AtomicSkeleton
    pattern="custom"
    custom={[
      { width: '100%', height: 200, borderRadius: 12 },
      { width: '80%', height: 24, borderRadius: 4, marginBottom: 12 },
      { width: '100%', height: 16, borderRadius: 4 },
    ]}
  />
) : (
  <Content />
)}
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pattern` | `SkeletonPattern` | No | `'list'` | Skeleton pattern |
| `custom` | `SkeletonConfig[]` | No | - | Custom configuration |
| `count` | `number` | No | `1` | Number of skeletons |
| `style` | `ViewStyle` | No | - | Custom style |
| `testID` | `string` | No | - | Test identifier |

### SkeletonPattern

```typescript
type SkeletonPattern =
  | 'list'    // List item
  | 'card'    // Card
  | 'avatar'  // Avatar
  | 'text'    // Text
  | 'custom'; // Custom
```

### SkeletonConfig

```typescript
interface SkeletonConfig {
  width: number | string;       // Width
  height?: number;              // Height
  borderRadius?: number;        // Corner radius
  marginBottom?: number;        // Bottom margin
}
```

## Accessibility

- ✅ Hidden from screen readers (loading placeholder only)
- ✅ Loading state announced to screen readers
- ✅ Accessibility properties for loading context

## Performance Tips

1. **Minimal count**: Use necessary number of skeletons
2. **Simple patterns**: Prefer built-in patterns over complex custom
3. **Unload promptly**: Remove skeleton as soon as data arrives
4. **Quick loads**: Skip skeleton for loads < 300ms

## Related Components

- [`AtomicSpinner`](../AtomicSpinner.README.md) - Loading spinner
- [`EmptyState`](../EmptyState.README.md) - Empty state
- [`AtomicProgress`](../AtomicProgress.README.md) - Progress bar

## License

MIT

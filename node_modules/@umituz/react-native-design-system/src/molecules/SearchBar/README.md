# SearchBar

A modern and customizable search input component for React Native with built-in loading state, clear button, and theme support.

## Import & Usage

```typescript
import { SearchBar } from 'react-native-design-system/src/molecules/SearchBar';
```

**Location:** `src/molecules/SearchBar/SearchBar.tsx`

## Basic Usage

```tsx
const [searchQuery, setSearchQuery] = useState('');

<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Search..."
/>
```

## Strategy

**Purpose**: Provide a consistent, accessible, and performant search interface for filtering and finding content.

**When to Use**:
- Searching through lists or datasets
- Filtering content by keywords
- Finding specific items (users, products, posts)
- Global search across multiple content types
- Autocomplete and suggestion inputs

**When NOT to Use**:
- For simple filtering (use Filter controls instead)
- For form inputs (use FormField instead)
- For single-choice selection (use Dropdown/Select instead)
- For URL navigation (use navigation components instead)

## Rules

### Required

1. **MUST** have `value` and `onChangeText` props
2. **ALWAYS** provide meaningful placeholder text
3. **MUST** debounce search input (500ms recommended)
4. **SHOULD** require minimum query length (2-3 chars)
5. **ALWAYS** show loading state during search
6. **MUST** handle empty results gracefully
7. **SHOULD** provide clear button when input has value

### Debouncing

1. **MUST** debounce search input to avoid excessive API calls
2. **Recommended delay**: 500ms
3. **MUST** cancel pending requests on new input
4. **ALWAYS** cleanup debounced timers

### Minimum Query Length

1. **Recommended**: 2-3 characters minimum
2. **MUST** show feedback if query too short
3. **SHOULD** not search with 1 character (too many results)
4. **MUST** handle empty query (clear results)

### Loading State

1. **MUST** show loading indicator during search
2. **SHOULD** disable input during search if needed
3. **MUST** handle search errors gracefully
4. **ALWAYS** reset loading state after search completes

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No debouncing
<SearchBar
  value={query}
  onChangeText={(text) => {
    setQuery(text);
    searchAPI(text); // ❌ API call on every keystroke
  }}
/>

// ❌ No minimum length check
<SearchBar
  value={query}
  onChangeText={(text) => {
    if (text.length > 0) { // ❌ Searches with 1 character
      performSearch(text);
    }
  }}
/>

// ❌ No loading state
<SearchBar
  value={query}
  onChangeText={handleSearch}
  // ❌ No loading indicator
/>

// ❌ Not handling empty results
const results = await searchAPI(query);
setResults(results); // ❌ Could be empty array

// ❌ Not clearing results
const handleClear = () => {
  setQuery('');
  // ❌ Results still showing
};

// ❌ No error handling
const handleSearch = async (query) => {
  setLoading(true);
  const results = await searchAPI(query); // ❌ No try/catch
  setResults(results);
  setLoading(false);
};

// ❌ Auto-focus without context
<SearchBar
  value={query}
  onChangeText={setQuery}
  autoFocus // ❌ Auto-focuses on every render
/>
```

## Best Practices

### Debounced Search

✅ **DO**:
```tsx
const [query, setQuery] = useState('');

// Debounce search input
useEffect(() => {
  const timer = setTimeout(() => {
    if (query.length >= 2) {
      performSearch(query);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [query]);

<SearchBar
  value={query}
  onChangeText={setQuery}
  placeholder="Search..."
/>
```

❌ **DON'T**:
```tsx
// ❌ No debouncing
<SearchBar
  value={query}
  onChangeText={(text) => {
    setQuery(text);
    performSearch(text); // API call on every keystroke
  }}
/>
```

### Minimum Query Length

✅ **DO**:
```tsx
const handleSearch = (text) => {
  if (text.length < 2) {
    setResults([]);
    return;
  }
  performSearch(text);
};
```

❌ **DON'T**:
```tsx
// ❌ Searches with 1 character
const handleSearch = (text) => {
  if (text.length > 0) {
    performSearch(text); // Too many results
  }
};
```

### Clear Handler

✅ **DO**:
```tsx
const handleClear = () => {
  setQuery('');
  setResults([]);
  onClear?.();
};

<SearchBar
  value={query}
  onChangeText={setQuery}
  onClear={handleClear}
/>
```

❌ **DON'T**:
```tsx
// ❌ Doesn't clear results
const handleClear = () => {
  setQuery('');
  // Results still showing
};
```

## AI Coding Guidelines

### For AI Agents

When generating SearchBar components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { SearchBar } from 'react-native-design-system/src/molecules/SearchBar';
   ```

2. **Always debounce search input**:
   ```tsx
   // ✅ Good - debounced search
   useEffect(() => {
     const timer = setTimeout(() => {
       if (query.length >= 2) {
         performSearch(query);
       }
     }, 500);

     return () => clearTimeout(timer);
   }, [query]);

   // ❌ Bad - no debouncing
   const handleChange = (text) => {
     setQuery(text);
     performSearch(text); // API call on every keystroke
   };
   ```

3. **Always require minimum query length**:
   ```tsx
   // ✅ Good - minimum length check
   if (query.length < 2) {
     setResults([]);
     return;
   }

   // ❌ Bad - searches immediately
   if (query.length > 0) {
     performSearch(query);
   }
   ```

4. **Always show loading state**:
   ```tsx
   // ✅ Good - loading state
   const [loading, setLoading] = useState(false);

   const handleSearch = async (query) => {
     if (query.length < 2) return;

     setLoading(true);
     try {
       const results = await searchAPI(query);
       setResults(results);
     } catch (error) {
       console.error('Search failed:', error);
     } finally {
       setLoading(false);
     }
   };

   <SearchBar
     value={query}
     onChangeText={setQuery}
     loading={loading}
   />;

   // ❌ Bad - no loading state
   const handleSearch = async (query) => {
     const results = await searchAPI(query);
     setResults(results);
   };
   ```

5. **Always handle clear properly**:
   ```tsx
   // ✅ Good - clears everything
   const handleClear = () => {
     setQuery('');
     setResults([]);
     setError(null);
   };

   // ❌ Bad - only clears input
   const handleClear = () => {
     setQuery('');
     // Results still showing
   };
   ```

### Common Patterns

#### Basic Search
```tsx
const [query, setQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    if (query.length >= 2) {
      performSearch(query);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [query]);

<SearchBar
  value={query}
  onChangeText={setQuery}
  placeholder="Search..."
/>
```

#### Search with Loading
```tsx
const [query, setQuery] = useState('');
const [loading, setLoading] = useState(false);

const handleSearch = async (text) => {
  setQuery(text);

  if (text.length < 2) {
    setResults([]);
    return;
  }

  setLoading(true);
  try {
    const results = await searchAPI(text);
    setResults(results);
  } finally {
    setLoading(false);
  }
};

<SearchBar
  value={query}
  onChangeText={handleSearch}
  loading={loading}
  placeholder="Search..."
/>
```

#### Search with Clear Handler
```tsx
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);

const handleClear = () => {
  setQuery('');
  setResults([]);
};

<SearchBar
  value={query}
  onChangeText={setQuery}
  onClear={handleClear}
  placeholder="Search..."
/>
```

#### Auto-Focus Search
```tsx
<SearchBar
  value={query}
  onChangeText={setQuery}
  autoFocus
  placeholder="Search..."
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string` | Yes | - | Search query value |
| `onChangeText` | `(text: string) => void` | Yes | - | Change callback |
| `placeholder` | `string` | No | `'Search...'` | Placeholder text |
| `onSubmit` | `() => void` | No | - | Submit callback |
| `onClear` | `() => void` | No | - | Clear callback |
| `onFocus` | `() => void` | No | - | Focus callback |
| `onBlur` | `() => void` | No | - | Blur callback |
| `autoFocus` | `boolean` | No | `false` | Auto focus input |
| `loading` | `boolean` | No | `false` | Show loading indicator |
| `disabled` | `boolean` | No | `false` | Disable input |
| `containerStyle` | `ViewStyle` | No | - | Custom container style |
| `inputStyle` | `TextStyle` | No | - | Custom input style |

## Accessibility

- ✅ Screen reader announces search input and placeholder
- ✅ Touch target size maintained (min 44x44pt)
- ✅ Keyboard navigation (web)
- ✅ Focus management
- ✅ Semantic search role
- ✅ Loading state announced to screen readers

## Performance Tips

1. **Debounce**: Always debounce with 500ms delay
2. **Minimum length**: Require 2-3 characters minimum
3. **Cancel requests**: Cancel pending requests on new input
4. **Memo results**: Memo search results to prevent re-renders
5. **Virtualization**: Use FlatList for large result sets

## Related Components

- [`FormField`](../FormField/README.md) - Form field component
- [`ListItem`](../ListItem/README.md) - List item for search results
- [`Button`](../../atoms/button/README.md) - Button component

## License

MIT

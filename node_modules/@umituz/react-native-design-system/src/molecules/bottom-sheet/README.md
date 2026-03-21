# BottomSheet

A modal-like component that opens from the bottom of the screen, ideal for filtering, selection, or on-screen actions.

## Import & Usage

```typescript
import { BottomSheet } from 'react-native-design-system/src/molecules/bottom-sheet';
```

**Location:** `src/molecules/bottom-sheet/BottomSheet.tsx`

## Basic Usage

```tsx
const bottomSheetRef = useRef<BottomSheetRef>(null);

<BottomSheet ref={bottomSheetRef} preset="medium">
  <View style={{ padding: 24 }}>
    <YourContent />
  </View>
</BottomSheet>
```

## Strategy

**Purpose**: Provide a contextual, gesture-friendly interface for mobile-first interactions from the bottom of the screen.

**When to Use**:
- Filtering and sorting options
- Selection from lists (share, actions, options)
- Form inputs and data entry
- Contextual actions (edit, delete, share)
- Multi-step wizards
- Settings panels

**When NOT to Use**:
- For critical confirmations (use BaseModal instead)
- For simple alerts (use Alert/toast instead)
- For dropdown menus (use Dropdown/Popover instead)
- For side panels (use Drawer instead)
- For desktop-first interfaces (use Modal instead)

## Rules

### Required

1. **MUST** provide a close mechanism (ref with close() or onClose callback)
2. **ALWAYS** use appropriate preset for content length
3. **MUST** handle back button (Android) and escape key (desktop)
4. **NEVER** nest bottom sheets inside bottom sheets
5. **SHOULD** have clear title at top
6. **MUST** respect safe area insets

### Preset Selection

1. **Small (35%)**: Selections, short lists, simple forms
2. **Medium (60%)**: Forms with multiple fields, medium lists
3. **Large (85%)**: Long forms, complex filters, long lists
4. **Full (100%)**: Full-screen content, complex wizards

### Dismiss Behavior

1. **Default**: Swipe down enabled
2. **Critical actions**: Consider disabling swipe, require explicit action
3. **Always provide close button** (don't rely only on swipe)

### Content Guidelines

1. **Scrollable content**: Use ScrollView for long content
2. **Actions at bottom**: Place primary actions at bottom
3. **Handle at top**: Optional visual drag handle

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No close mechanism
<BottomSheet ref={ref}>
  <Content />
</BottomSheet>

// ❌ Nested bottom sheets
<BottomSheet ref={ref1}>
  <Content />
  <BottomSheet ref={ref2}>
    <NestedContent />
  </BottomSheet>
</BottomSheet>

// ❌ Wrong preset choice
<BottomSheet ref={ref} preset="full">
  {/* ❌ Use small for simple selection */}
  <Text>Select option</Text>
</BottomSheet>

// ❌ No title (accessibility issue)
<BottomSheet ref={ref} onClose={onClose}>
  <Content /> {/* ❌ Missing title */}
</BottomSheet>

// ❌ Hardcoded height without scroll
<BottomSheet ref={ref} preset="small">
  <View style={{ height: 1000 }}>
    {/* ❌ Content too long, won't scroll */}
    <LongContent />
  </View>
</BottomSheet>

// ❌ Actions at top (bad UX)
<BottomSheet ref={ref}>
  <View style={{ padding: 16 }}>
    <Button title="Save" /> {/* ❌ Should be at bottom */}
  </View>
  <Content />
</BottomSheet>
```

## Best Practices

### Selection Sheet

✅ **DO**:
```tsx
<BottomSheet ref={ref} preset="small">
  <View style={{ padding: 24 }}>
    <AtomicText type="titleLarge" style={{ marginBottom: 16 }}>
      Select Option
    </AtomicText>
    {options.map((option) => (
      <Pressable
        key={option.id}
        style={{ padding: 16 }}
        onPress={() => {
          onSelect(option);
          ref.current?.close();
        }}
      >
        <AtomicText type="bodyLarge">{option.label}</AtomicText>
      </Pressable>
    ))}
  </View>
</BottomSheet>
```

❌ **DON'T**:
```tsx
// ❌ No close after selection
<BottomSheet ref={ref} preset="small">
  {options.map((option) => (
    <Pressable onPress={() => onSelect(option)}>
      <AtomicText>{option.label}</AtomicText>
    </Pressable>
  ))}
</BottomSheet>
```

### Filter Sheet

✅ **DO**:
```tsx
<BottomSheet ref={ref} preset="large">
  <View style={{ padding: 24 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <AtomicText type="titleLarge">Filter</AtomicText>
      <Pressable onPress={() => ref.current?.close()}>
        <AtomicIcon name="close" />
      </Pressable>
    </View>

    <ScrollView style={{ marginTop: 16 }}>
      <FilterOptions filters={filters} onChange={setFilters} />
    </ScrollView>

    <View style={{ flexDirection: 'row', gap: 16, marginTop: 24 }}>
      <Button title="Clear" variant="ghost" style={{ flex: 1 }} onPress={handleClear} />
      <Button title="Apply" style={{ flex: 1 }} onPress={handleApply} />
    </View>
  </View>
</BottomSheet>
```

### Preset Choice

✅ **DO**:
- Small: Simple selections (3-5 items)
- Medium: Forms with 3-5 fields
- Large: Long forms, complex filters
- Full: Multi-step wizards, complex content

❌ **DON'T**:
- Use full preset for simple selection
- Use small preset for long forms
- Use same preset for all use cases

## AI Coding Guidelines

### For AI Agents

When generating BottomSheet components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { BottomSheet } from 'react-native-design-system/src/molecules/bottom-sheet';
   ```

2. **Always provide ref and close mechanism**:
   ```tsx
   const ref = useRef<BottomSheetRef>(null);

   <BottomSheet ref={ref} onClose={handleClose}>
     {content}
   </BottomSheet>
   ```

3. **Always choose appropriate preset**:
   ```tsx
   // ✅ Good - preset by content type
   const getPreset = (type: 'selection' | 'form' | 'filter') => {
     switch (type) {
       case 'selection': return 'small';
       case 'form': return 'medium';
       case 'filter': return 'large';
       default: return 'medium';
     }
   };
   ```

4. **Always handle close actions**:
   ```tsx
   // ✅ Good - close after action
   const handleSelect = (option) => {
     onSelect(option);
     ref.current?.close();
   };

   // ❌ Bad - no close
   const handleSelect = (option) => {
     onSelect(option);
     // Sheet stays open
   };
   ```

5. **Always use ScrollView for long content**:
   ```tsx
   // ✅ Good - scrollable content
   <BottomSheet ref={ref} preset="medium">
     <View style={{ padding: 24 }}>
       <AtomicText type="titleLarge">Title</AtomicText>
       <ScrollView style={{ marginTop: 16 }}>
         <LongFormContent />
       </ScrollView>
       <View style={{ marginTop: 24 }}>
         <Button title="Save" onPress={handleSave} />
       </View>
     </View>
   </BottomSheet>
   ```

### Common Patterns

#### Selection Bottom Sheet
```tsx
<BottomSheet ref={ref} preset="small">
  <View style={{ padding: 24 }}>
    <AtomicText type="titleLarge">Select Option</AtomicText>
    <ScrollView style={{ marginTop: 16 }}>
      {options.map((option) => (
        <Pressable
          key={option.id}
          style={{ padding: 16 }}
          onPress={() => {
            onSelect(option);
            ref.current?.close();
          }}
        >
          <AtomicText>{option.label}</AtomicText>
        </Pressable>
      ))}
    </ScrollView>
  </View>
</BottomSheet>
```

#### Filter Bottom Sheet
```tsx
<BottomSheet ref={ref} preset="large">
  <View style={{ padding: 24 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
      <AtomicText type="titleLarge">Filter</AtomicText>
      <Pressable onPress={() => ref.current?.close()}>
        <AtomicIcon name="close" size="md" />
      </Pressable>
    </View>

    <ScrollView>
      <FilterOptions filters={filters} onChange={setFilters} />
    </ScrollView>

    <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
      <Button title="Clear" variant="ghost" style={{ flex: 1 }} onPress={handleClear} />
      <Button title="Apply" style={{ flex: 1 }} onPress={handleApply} />
    </View>
  </View>
</BottomSheet>
```

#### Share Bottom Sheet
```tsx
<BottomSheet ref={ref} preset="small">
  <View style={{ padding: 24 }}>
    <AtomicText type="titleLarge" style={{ marginBottom: 16 }}>
      Share
    </AtomicText>
    {shareOptions.map((option) => (
      <Pressable
        key={option.id}
        style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
        onPress={() => {
          onShare(option.id);
          ref.current?.close();
        }}
      >
        <AtomicIcon name={option.icon} size="lg" style={{ marginRight: 16 }} />
        <AtomicText type="bodyLarge">{option.label}</AtomicText>
      </Pressable>
    ))}
  </View>
</BottomSheet>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `ref` | `BottomSheetRef` | Yes | - | Sheet ref for control |
| `children` | `ReactNode` | Yes | - | Sheet content |
| `preset` | `'small' \| 'medium' \| 'large' \| 'full'` | No | `'medium'` | Height preset |
| `snapPoints` | `(number \| string)[]` | No | - | Custom snap points |
| `initialIndex` | `number` | No | - | Initial snap index |
| `backgroundColor` | `string` | No | - | Background color |
| `onChange` | `(index: number) => void` | No | - | Index change callback |
| `onClose` | `() => void` | No | - | Close callback |

### Ref Methods

- `expand()`: Open sheet
- `close()`: Close sheet
- `snapToIndex(index)`: Go to snap point

## Accessibility

- ✅ Screen reader announces sheet title and content
- ✅ Touch target size maintained (min 44x44pt)
- ✅ Escape key handling (desktop)
- ✅ Focus trap within sheet
- ✅ Swipe gesture for dismiss
- ✅ Back button handling (mobile)

## Performance Tips

1. **Lazy loading**: Load content only when sheet opens
2. **Memoization**: Memo sheet content to prevent re-renders
3. **Unmount**: Consider unmounting when closed for heavy content
4. **ScrollView**: Always use ScrollView for long lists

## Related Components

- [`BaseModal`](../BaseModal/README.md) - Modal component for critical actions
- [`FormField`](../FormField/README.md) - Form field component
- [`Button`](../../atoms/button/README.md) - Button component

## License

MIT

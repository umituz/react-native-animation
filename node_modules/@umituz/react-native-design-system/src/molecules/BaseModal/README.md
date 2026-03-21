# BaseModal

A generic fullscreen modal component for React Native with responsive design, providing a consistent base for all modal types.

## Import & Usage

```typescript
import { BaseModal } from 'react-native-design-system/src/molecules/BaseModal';
```

**Location:** `src/molecules/BaseModal/BaseModal.tsx`

## Basic Usage

```tsx
<BaseModal visible={isVisible} onClose={handleClose}>
  <YourModalContent />
</BaseModal>
```

## Strategy

**Purpose**: Provide a consistent, accessible, and performant modal system for the application.

**When to Use**:
- Form modals (login, registration, edit)
- Confirmation dialogs
- Information displays
- Settings panels
- Multi-step wizards

**When NOT to Use**:
- For simple alerts (use Alert/toast instead)
- For slide-up panels (use BottomSheet instead)
- For dropdowns (use Dropdown/Popover instead)
- For side panels (use Drawer instead)

## Rules

### Required

1. **MUST** have a close mechanism (onClose required)
2. **ALWAYS** provide a visible close button or back-drop dismiss
3. **MUST** handle escape key (desktop) and back button (mobile)
4. **NEVER** nest modals inside modals
5. **SHOULD** have title for accessibility
6. **MUST** trap focus within modal (accessibility)

### Dismiss Behavior

1. **Default**: Backdrop dismiss enabled
2. **Critical actions**: Disable backdrop dismiss, require explicit action
3. **Always provide close button** (don't rely only on backdrop)

### Modal Size

1. **Responsive**: Auto-adjusts to device size
2. **Mobile**: Full width with margin
3. **Tablet**: Fixed width (600px recommended)
4. **Desktop**: Fixed width centered (max 800px)

### Content Guidelines

1. **Scrollable content**: Use ScrollView for long content
2. **Actions at bottom**: Place buttons at bottom (right-aligned or full-width)
3. **Title at top**: Clear title with optional close button

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No close mechanism
<BaseModal visible={true}>
  <Content />
</BaseModal>

// ❌ Nested modals
<BaseModal visible={true}>
  <Content />
  <BaseModal visible={true}>
    <NestedModal />
  </BaseModal>
</BaseModal>

// ❌ No backdrop dismiss for non-critical
<BaseModal
  visible={true}
  dismissOnBackdrop={false}
>
  <InfoContent /> {/* ❌ Not critical */}
</BaseModal>

// ❌ No title (accessibility issue)
<BaseModal visible={true} onClose={onClose}>
  <Content /> {/* ❌ Missing title */}
</BaseModal>

// ❌ Full-screen hardcoded
<BaseModal
  visible={true}
  contentStyle={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
>
  <Content />
</BaseModal>

// ❌ Manual z-index wars
<BaseModal visible={true} style={{ zIndex: 9999 }}>
  <Content />
</BaseModal>
```

## Best Practices

### Confirmation Modal

✅ **DO**:
```tsx
<BaseModal
  visible={showConfirmation}
  onClose={() => setShowConfirmation(false)}
  dismissOnBackdrop={false}
>
  <View style={{ padding: 24 }}>
    <AtomicText type="titleLarge" style={{ marginBottom: 16 }}>
      Confirm Action
    </AtomicText>
    <AtomicText style={{ marginBottom: 24 }}>
      Are you sure you want to proceed?
    </AtomicText>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
      <Button title="Cancel" variant="ghost" onPress={() => setShowConfirmation(false)} />
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  </View>
</BaseModal>
```

❌ **DON'T**:
```tsx
// ❌ No clear confirmation
<BaseModal visible={showConfirmation} onClose={onClose}>
  <Button title="OK" onPress={onClose} />
</BaseModal>
```

### Form Modal

✅ **DO**:
```tsx
<BaseModal visible={showForm} onClose={handleClose}>
  <ScrollView style={{ padding: 24 }}>
    <AtomicText type="titleLarge" style={{ marginBottom: 24 }}>
      Create Item
    </AtomicText>
    <FormField label="Name" value={name} onChangeText={setName} />
    <FormField label="Email" value={email} onChangeText={setEmail} />
  </ScrollView>
  <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#e0e0e0' }}>
    <Button title="Cancel" variant="ghost" onPress={handleClose} style={{ marginRight: 8 }} />
    <Button title="Save" onPress={handleSave} />
  </View>
</BaseModal>
```

### Loading Modal

✅ **DO**:
```tsx
<BaseModal
  visible={isLoading}
  onClose={() => {}}
  dismissOnBackdrop={false}
  contentStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
>
  <View style={{ backgroundColor: '#fff', padding: 32, borderRadius: 16, alignItems: 'center' }}>
    <AtomicSpinner size="lg" />
    <AtomicText style={{ marginTop: 16 }}>Please wait...</AtomicText>
  </View>
</BaseModal>
```

## AI Coding Guidelines

### For AI Agents

When generating BaseModal components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { BaseModal } from 'react-native-design-system/src/molecules/BaseModal';
   ```

2. **Always provide close mechanism**:
   ```tsx
   <BaseModal
     visible={visible}
     onClose={具体的关闭函数}
     dismissOnBackdrop={根据操作重要性决定}
   >
     {content}
   </BaseModal>
   ```

3. **Always handle state properly**:
   ```tsx
   const [visible, setVisible] = useState(false);

   const open = () => setVisible(true);
   const close = () => setVisible(false);

   <BaseModal visible={visible} onClose={close}>
     {content}
   </BaseModal>
   ```

4. **Always consider content length**:
   ```tsx
   // ✅ Good - ScrollView for long content
   <BaseModal visible={visible} onClose={close}>
     <ScrollView style={{ padding: 24 }}>
       {longContent}
     </ScrollView>
   </BaseModal>

   // ✅ Good - View for short content
   <BaseModal visible={visible} onClose={close}>
     <View style={{ padding: 24 }}>
       {shortContent}
     </View>
   </BaseModal>
   ```

5. **Always use dismissOnBackdrop appropriately**:
   ```tsx
   // ✅ Good - non-critical modal
   <BaseModal
     visible={showInfo}
     onClose={close}
     dismissOnBackdrop={true}
   >
     <InfoContent />
   </BaseModal>

   // ✅ Good - critical action (prevent accidental dismiss)
   <BaseModal
     visible={showConfirmation}
     onClose={close}
     dismissOnBackdrop={false}
   >
     <ConfirmationContent />
   </BaseModal>
   ```

### Common Patterns

#### Form Modal
```tsx
<BaseModal visible={visible} onClose={handleClose}>
  <ScrollView style={{ padding: 24 }}>
    <AtomicText type="headlineLarge">Edit Profile</AtomicText>
    <FormField label="Name" value={name} onChangeText={setName} />
    <FormField label="Email" value={email} onChangeText={setEmail} />
  </ScrollView>
  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16, gap: 12 }}>
    <Button title="Cancel" variant="ghost" onPress={handleClose} />
    <Button title="Save" onPress={handleSave} />
  </View>
</BaseModal>
```

#### Confirmation Modal
```tsx
<BaseModal
  visible={showConfirm}
  onClose={() => setShowConfirm(false)}
  dismissOnBackdrop={false}
>
  <View style={{ padding: 24, alignItems: 'center' }}>
    <AtomicIcon name="warning" size="xl" color="warning" />
    <AtomicText type="titleLarge" style={{ marginTop: 16 }}>
      Confirm Delete
    </AtomicText>
    <AtomicText style={{ marginTop: 8, textAlign: 'center' }}>
      This action cannot be undone
    </AtomicText>
    <View style={{ flexDirection: 'row', marginTop: 24, gap: 12 }}>
      <Button title="Cancel" variant="ghost" onPress={() => setShowConfirm(false)} />
      <Button title="Delete" variant="destructive" onPress={handleDelete} />
    </View>
  </View>
</BaseModal>
```

#### Success Modal
```tsx
<BaseModal
  visible={showSuccess}
  onClose={() => setShowSuccess(false)}
  dismissOnBackdrop={true}
>
  <View style={{ padding: 32, alignItems: 'center' }}>
    <View style={{
      width: 80, height: 80, borderRadius: 40,
      backgroundColor: '#10b981', justifyContent: 'center', alignItems: 'center'
    }}>
      <AtomicIcon name="checkmark" size="xl" customColor="#fff" />
    </View>
    <AtomicText type="titleLarge" style={{ marginTop: 24 }}>
      Success!
    </AtomicText>
    <AtomicText style={{ marginTop: 12, textAlign: 'center', color: '#666' }}>
      Operation completed successfully
    </AtomicText>
    <Button title="Continue" onPress={() => setShowSuccess(false)} style={{ marginTop: 32 }} />
  </View>
</BaseModal>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `visible` | `boolean` | **Yes** | - | Modal visibility |
| `onClose` | `() => void` | **Yes** | - | Close callback |
| `children` | `ReactNode` | **Yes** | - | Modal content |
| `dismissOnBackdrop` | `boolean` | No | `true` | Close on backdrop tap |
| `contentStyle` | `ViewStyle` | No | - | Custom content style |
| `testID` | `string` | No | `'base-modal'` | Test ID for testing |

## Accessibility

- ✅ Screen reader announces modal title and content
- ✅ Focus trap within modal
- ✅ Keyboard navigation (Escape to close)
- ✅ Semantic roles and labels
- ✅ Focus management (return focus to trigger)
- ✅ Back button handling on mobile

## Performance Tips

1. **Lazy loading**: Load modal content only when visible
2. **Memoization**: Memo modal content
3. **Conditional rendering**: Don't render when not visible
4. **Cleanup**: Clean up resources and subscriptions on close

## Related Components

- [`ConfirmationModal`](./confirmation-modal/README.md) - Pre-styled confirmation modal
- [`BottomSheet`](./bottom-sheet/README.md) - Bottom sheet modal
- [`FormField`](./FormField/README.md) - Form field component
- [`Button`](../../atoms/button/README.md) - Button component

## License

MIT

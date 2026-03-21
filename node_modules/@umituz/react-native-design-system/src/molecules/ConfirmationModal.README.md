# ConfirmationModal

A modal component for getting user confirmation before critical actions like delete, save, or important changes.

## Import & Usage

```typescript
import { ConfirmationModal } from 'react-native-design-system/src/molecules/ConfirmationModal';
```

**Location:** `src/molecules/ConfirmationModal.tsx`

## Basic Usage

```tsx
const [visible, setVisible] = useState(false);

<ConfirmationModal
  visible={visible}
  title="Are you sure?"
  message="This action cannot be undone"
  confirmText="Confirm"
  cancelText="Cancel"
  onConfirm={() => {
    handleAction();
    setVisible(false);
  }}
  onCancel={() => setVisible(false)}
/>
```

## Strategy

**Purpose**: Provide a standardized, accessible confirmation dialog for critical and destructive actions.

**When to Use**:
- Deleting items (files, messages, accounts)
- Destructive operations (cancel subscription, remove data)
- Unsaved changes warnings
- Navigation away from forms with unsaved changes
- Critical settings changes
- Irreversible actions

**When NOT to Use**:
- For simple alerts (use Alert/toast instead)
- For non-critical confirmations (use inline confirmation)
- For information display (use BaseModal instead)
- For form submissions (use loading state instead)

## Rules

### Required

1. **MUST** have `visible`, `onConfirm`, and `onCancel` props
2. **ALWAYS** provide clear `title` and `message`
3. **MUST** use appropriate variant for action severity
4. **SHOULD** prevent accidental confirmation (consider backdropDismissible=false)
5. **MUST** close modal after action
6. **ALWAYS** provide specific button text (not just "OK")
7. **SHOULD** mention consequence in message

### Variant Selection

1. **Danger**: For destructive, irreversible actions (delete, remove)
2. **Warning**: For data loss or important changes (unsaved changes, logout)
3. **Default/Info**: For non-critical confirmations

### Message Guidelines

1. **Be specific**: Clearly state what will happen
2. **Mention consequences**: "This action cannot be undone"
3. **Keep concise**: 1-2 sentences max
4. **Use plain language**: Avoid technical jargon

### Button Text

1. **Confirm button**: Use action verbs (Delete, Save, Confirm)
2. **Cancel button**: Use Cancel, Go Back, Stay
3. **Be specific**: "Delete Account" not "OK"
4. **Match action**: Button text should match the action

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ No close mechanism
<ConfirmationModal
  visible={true}
  title="Confirm"
  // Missing onConfirm and onCancel
/>

// ❌ Vague message
<ConfirmationModal
  title="Are you sure?"
  message="Are you sure?" // ❌ Doesn't say what will happen
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>

// ❌ Wrong variant
<ConfirmationModal
  variant="default" // ❌ Should be danger for delete
  title="Delete Account"
  message="This cannot be undone"
  onConfirm={deleteAccount}
  onCancel={cancel}
/>

// ❌ Generic button text
<ConfirmationModal
  title="Delete Account"
  confirmText="OK" // ❌ Not specific
  cancelText="Cancel"
  onConfirm={deleteAccount}
  onCancel={cancel}
/>

// ❌ Doesn't close after action
<ConfirmationModal
  title="Delete Item"
  onConfirm={() => deleteItem()} // ❌ Doesn't close modal
  onCancel={cancel}
/>

// ❌ No consequence warning
<ConfirmationModal
  title="Delete Account"
  message="Do you want to delete?" // ❌ Doesn't mention it's permanent
  onConfirm={deleteAccount}
  onCancel={cancel}
/>

// ❌ Dismissible critical action
<ConfirmationModal
  variant="danger"
  title="Delete Account"
  backdropDismissible={true} // ❌ Should be false for critical
  onConfirm={deleteAccount}
  onCancel={cancel}
/>
```

## Best Practices

### Delete Confirmation

✅ **DO**:
```tsx
<ConfirmationModal
  visible={visible}
  variant="danger"
  icon="trash-outline"
  title="Delete Item"
  message="Are you sure you want to delete '{item.name}'? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={() => {
    deleteItem(item.id);
    setVisible(false);
  }}
  onCancel={() => setVisible(false)}
/>
```

❌ **DON'T**:
```tsx
// ❌ Vague message, wrong variant
<ConfirmationModal
  visible={visible}
  variant="default"
  title="Delete"
  message="Are you sure?"
  confirmText="OK"
  onConfirm={deleteItem}
  onCancel={cancel}
/>
```

### Unsaved Changes Warning

✅ **DO**:
```tsx
<ConfirmationModal
  visible={hasUnsavedChanges}
  variant="warning"
  icon="save-outline"
  title="Unsaved Changes"
  message="You have unsaved changes. What would you like to do?"
  confirmText="Save"
  cancelText="Discard"
  onConfirm={() => {
    saveChanges();
    setVisible(false);
  }}
  onCancel={() => {
    discardChanges();
    setVisible(false);
  }}
/>
```

❌ **DON'T**:
```tsx
// ❌ No clear options
<ConfirmationModal
  visible={hasUnsavedChanges}
  title="Changes"
  message="You have changes"
  confirmText="OK"
  onConfirm={saveChanges}
/>
```

### Logout Confirmation

✅ **DO**:
```tsx
<ConfirmationModal
  visible={showLogout}
  variant="warning"
  icon="log-out-outline"
  title="Log Out"
  message="Are you sure you want to log out of your account?"
  confirmText="Log Out"
  cancelText="Cancel"
  onConfirm={() => {
    logout();
    setShowLogout(false);
  }}
  onCancel={() => setShowLogout(false)}
/>
```

## AI Coding Guidelines

### For AI Agents

When generating ConfirmationModal components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { ConfirmationModal } from 'react-native-design-system/src/molecules/ConfirmationModal';
   ```

2. **Always use appropriate variant**:
   ```tsx
   // ✅ Good - variant by severity
   const getVariant = (action) => {
     if (action === 'delete') return 'danger';
     if (action === 'logout') return 'warning';
     return 'default';
   };

   // ❌ Bad - always default
   <ConfirmationModal variant="default" /> // Even for delete
   ```

3. **Always be specific in message**:
   ```tsx
   // ✅ Good - specific message
   message={`Delete '${item.name}'? This cannot be undone.`}

   // ❌ Bad - vague message
   message="Are you sure?"
   ```

4. **Always match button text to action**:
   ```tsx
   // ✅ Good - specific button text
   <ConfirmationModal
     confirmText="Delete Account"
     onConfirm={deleteAccount}
   />

   // ❌ Bad - generic button text
   <ConfirmationModal
     confirmText="OK"
     onConfirm={deleteAccount}
   />
   ```

5. **Always close modal after action**:
   ```tsx
   // ✅ Good - closes after action
   const handleConfirm = () => {
     deleteItem(id);
     setVisible(false);
   };

   // ❌ Bad - doesn't close
   const handleConfirm = () => {
     deleteItem(id);
     // Modal stays open
   };
   ```

### Common Patterns

#### Delete Confirmation
```tsx
<ConfirmationModal
  visible={showDelete}
  variant="danger"
  icon="trash-outline"
  title="Delete Item"
  message={`Delete '${item.name}'? This action cannot be undone.`}
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={() => {
    deleteItem(item.id);
    setShowDelete(false);
  }}
  onCancel={() => setShowDelete(false)}
/>
```

#### Unsaved Changes
```tsx
<ConfirmationModal
  visible={hasUnsavedChanges}
  variant="warning"
  icon="warning"
  title="Unsaved Changes"
  message="You have unsaved changes. Do you want to save them?"
  confirmText="Save"
  cancelText="Don't Save"
  onConfirm={() => {
    saveChanges();
    setHasUnsavedChanges(false);
  }}
  onCancel={() => {
    discardChanges();
    setHasUnsavedChanges(false);
  }}
/>
```

#### Logout Confirmation
```tsx
<ConfirmationModal
  visible={showLogout}
  variant="warning"
  icon="log-out-outline"
  title="Log Out"
  message="Are you sure you want to log out?"
  confirmText="Log Out"
  cancelText="Cancel"
  onConfirm={() => {
    logout();
    setShowLogout(false);
  }}
  onCancel={() => setShowLogout(false)}
/>
```

#### Critical Action (No Backdrop Dismiss)
```tsx
<ConfirmationModal
  visible={showCritical}
  variant="danger"
  backdropDismissible={false} // Prevents accidental dismiss
  title="Delete Account"
  message="This will permanently delete your account and all data. This cannot be undone."
  confirmText="Delete Account"
  cancelText="Cancel"
  onConfirm={() => {
    deleteAccount();
    setShowCritical(false);
  }}
  onCancel={() => setShowCritical(false)}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `visible` | `boolean` | Yes | - | Modal visibility |
| `onConfirm` | `() => void` | Yes | - | Confirm callback |
| `onCancel` | `() => void` | Yes | - | Cancel callback |
| `title` | `string` | No | - | Modal title |
| `message` | `string` | No | - | Modal message |
| `variant` | `'default' \| 'danger' \| 'warning' \| 'info'` | No | `'default'` | Visual variant |
| `confirmText` | `string` | No | `'Confirm'` | Confirm button text |
| `cancelText` | `string` | No | `'Cancel'` | Cancel button text |
| `icon` | `string` | No | - | Icon name (Ionicons) |
| `showBackdrop` | `boolean` | No | `true` | Show backdrop |
| `backdropDismissible` | `boolean` | No | `true` | Allow backdrop dismiss |
| `style` | `ViewStyle` | No | - | Custom container style |

## Accessibility

- ✅ Screen reader announces title and message
- ✅ Focus trap within modal
- ✅ Keyboard navigation (Escape to cancel)
- ✅ Touch target size maintained (min 44x44pt)
- ✅ Semantic dialog role
- ✅ Proper button labeling

## Performance Tips

1. **State management**: Use local state for visibility
2. **Cleanup**: Close modal after navigation
3. **Memo callbacks**: Use useCallback for handlers
4. **Prevent double-tap**: Disable confirm button during action

## Related Components

- [`BaseModal`](./BaseModal/README.md) - Base modal component
- [`AlertModal`](./alerts/README.md) - Alert modal component
- [`Button`](../atoms/button/README.md) - Button component

## License

MIT

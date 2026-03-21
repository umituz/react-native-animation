# Alert System

React Native Design System provides a comprehensive alert system for different use cases. Each alert type is optimized for specific scenarios.

## Import & Usage

```typescript
import {
  AlertBanner,
  AlertToast,
  AlertInline,
  AlertModal,
  AlertContainer,
  useAlert
} from 'react-native-design-system/src/molecules/alerts';
```

**Location:** `src/molecules/alerts/`

## Basic Usage

```tsx
import { useAlert } from 'react-native-design-system/src/molecules/alerts';

const { showToast } = useAlert();

showToast({
  variant: 'success',
  title: 'Success',
  message: 'Operation completed',
});
```

## Strategy

**Purpose**: Provide consistent, accessible, and user-friendly alert mechanisms for different communication needs.

**When to Use**:
- **AlertBanner**: Page-level notifications (maintenance, updates)
- **AlertToast**: Temporary feedback (success, error messages)
- **AlertInline**: Form validation errors
- **AlertModal**: Critical confirmations (delete, irreversible actions)

**When NOT to Use**:
- For navigation - use navigation components
- For complex dialogs - use custom modals
- For persistent content - use other UI patterns

## Rules

### Required

1. **ALWAYS** wrap app in `AlertContainer` provider
2. **MUST** use appropriate alert type for context
3. **NEVER** show multiple alerts simultaneously
4. **ALWAYS** provide meaningful messages
5. **MUST** use i18n for user-facing text

### Alert Types

1. **AlertBanner**: Persistent page-level warnings
2. **AlertToast**: Temporary notifications (auto-dismiss)
3. **AlertInline**: Contextual form errors
4. **AlertModal**: Critical confirmations (user action)

### Variants

1. **info**: Neutral information
2. **success**: Successful operations
3. **warning**: Warnings and cautions
4. **error**: Errors and failures

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Missing provider
export const App = () => {
  return <MyApp />; // Missing AlertContainer ❌
};

// ❌ Wrong alert type
useAlert().showAlert({
  variant: 'success',
  message: 'Saved successfully',
}); // Should be showToast ❌

// ❌ Too many alerts
const handleClick = () => {
  showToast({ message: 'First' });
  showToast({ message: 'Second' }); // ❌ Too many
  showToast({ message: 'Third' });
};

// ❌ Hardcoded text
showToast({
  message: 'Success', // ❌ Use i18n
});

// ❌ No variant
showAlert({
  message: 'Are you sure?',
  // Missing variant ❌
});

// ❌ Alert for navigation
showAlert({
  message: 'Go to settings',
  onConfirm: () => navigate('Settings'), // ❌ Use navigation
});

// ❌ Too long messages
showToast({
  message: 'This is an extremely long message that will be difficult to read and understand', // ❌
});
```

## Best Practices

### Alert Type Selection

✅ **DO**:
- Use AlertBanner for system-wide notices
- Use AlertToast for quick feedback (3-5 seconds)
- Use AlertInline for form validation
- Use AlertModal for destructive actions

❌ **DON'T**:
- Use AlertModal for simple notifications
- Use AlertToast for critical confirmations
- Use AlertBanner for temporary messages
- Show multiple alerts at once

### Message Length

✅ **DO**:
```tsx
// Short for toast
showToast({
  message: 'Saved successfully', // Short and clear
});

// Detailed for modal
showAlert({
  title: 'Delete Item',
  message: 'This action cannot be undone. Are you sure you want to continue?',
  onConfirm: handleDelete,
});
```

❌ **DON'T**:
```tsx
// Long toast message
showToast({
  message: 'Your changes have been saved successfully and you can continue with your work', // ❌ Too long
});
```

### Variant Usage

✅ **DO**:
```tsx
// Success - completed actions
showToast({ variant: 'success', message: 'Saved' });

// Error - failed operations
showToast({ variant: 'error', message: 'Failed to save' });

// Warning - potential issues
showAlert({ variant: 'warning', message: 'Unsaved changes' });

// Info - neutral information
showBanner({ variant: 'info', message: 'New feature available' });
```

❌ **DON'T**:
```tsx
// Wrong variant for context
showToast({ variant: 'error', message: 'Success!' }); // ❌ Wrong variant
```

## AI Coding Guidelines

### For AI Agents

When generating Alert components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { useAlert } from 'react-native-design-system/src/molecules/alerts';
   ```

2. **Always use appropriate alert type**:
   ```tsx
   // Quick feedback
   const { showToast } = useAlert();
   showToast({ variant: 'success', message: 'Saved' });

   // Critical action
   const { showAlert } = useAlert();
   showAlert({ variant: 'error', onConfirm: delete });

   // Form error
   <AlertInline variant="error" message="Invalid input" />

   // Page notice
   <AlertBanner variant="warning" message="Maintenance mode" />
   ```

3. **Always use i18n for messages**:
   ```tsx
   // ❌ Bad
   showToast({ message: 'Success' });

   // ✅ Good
   showToast({ message: t('alerts.success') });
   ```

4. **Always provide variant**:
   ```tsx
   // ❌ Bad
   showToast({ message: 'Something happened' });

   // ✅ Good
   showToast({ variant: 'info', message: t('alerts.info') });
   ```

5. **Never show multiple alerts**:
   ```tsx
   // ❌ Bad
   const handleClick = () => {
     showToast({ message: 'First' });
     showToast({ message: 'Second' }); // Don't stack
   };

   // ✅ Good
   const handleClick = () => {
     showToast({ message: 'Complete action' });
   };
   ```

### Common Patterns

#### Success Feedback
```tsx
const handleSave = async () => {
  try {
    await saveData();
    showToast({
      variant: 'success',
      title: t('alerts.success'),
      message: t('alerts.saved'),
    });
  } catch (error) {
    showToast({
      variant: 'error',
      title: t('alerts.error'),
      message: t('alerts.saveFailed'),
    });
  }
};
```

#### Delete Confirmation
```tsx
const handleDelete = () => {
  showAlert({
    variant: 'error',
    title: t('alerts.deleteTitle'),
    message: t('alerts.deleteConfirm'),
    confirmLabel: t('common.delete'),
    cancelLabel: t('common.cancel'),
    onConfirm: async () => {
      await deleteItem();
      showToast({
        variant: 'success',
        message: t('alerts.deleted'),
      });
    },
  });
};
```

#### Form Validation
```tsx
<View>
  <FormField
    label="Email"
    value={email}
    onChangeText={setEmail}
    error={emailError}
  />

  {emailError && (
    <AlertInline
      variant="error"
      message={t('validation.invalidEmail')}
    />
  )}
</View>
```

#### System Notice
```tsx
<AlertBanner
  variant="warning"
  title={t('alerts.maintenance')}
  message={t('alerts.maintenanceMessage')}
  dismissible
  onDismiss={() => setShowBanner(false)}
/>
```

## Props Reference

### AlertBanner

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | No | `'info'` | Alert variant |
| `title` | `string` | No | - | Alert title |
| `message` | `string` | Yes | - | Alert message |
| `dismissible` | `boolean` | No | `false` | Show dismiss button |
| `onDismiss` | `() => void` | No | - | Dismiss callback |
| `actionLabel` | `string` | No | - | Action button text |
| `onAction` | `() => void` | No | - | Action callback |

### AlertInline

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | No | `'error'` | Alert variant |
| `message` | `string` | Yes | - | Error message |

### useAlert Hook

| Method | Parameters | Description |
|--------|-----------|-------------|
| `showToast` | `ToastOptions` | Show temporary notification |
| `showAlert` | `AlertOptions` | Show confirmation modal |
| `showBanner` | `BannerOptions` | Show page banner |

### ToastOptions

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | Yes | - | Toast variant |
| `title` | `string` | No | - | Toast title |
| `message` | `string` | Yes | - | Toast message |
| `duration` | `number` | No | `3000` | Duration in ms |

### AlertOptions

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | Yes | - | Alert variant |
| `title` | `string` | Yes | - | Alert title |
| `message` | `string` | Yes | - | Alert message |
| `confirmLabel` | `string` | No | `'OK'` | Confirm button text |
| `cancelLabel` | `string` | No | - | Cancel button text |
| `onConfirm` | `() => void` | No | - | Confirm callback |

## Accessibility

- ✅ Screen reader announces all alerts
- ✅ Auto-dismiss for non-critical alerts
- ✅ Focus management for modals
- ✅ Keyboard navigation support
- ✅ Semantic alert roles
- ✅ ARIA live regions

## Performance

1. **Auto-dismiss**: Toasts dismiss automatically
2. **Queue**: Multiple alerts queue automatically
3. **Unmount**: Unmount when closed
4. **Debounce**: Debounce rapid alert calls

## Related Components

- [`BaseModal`](../BaseModal/README.md) - Modal component
- [`FormField`](../FormField/README.md) - Form field component
- [`Button`](../../atoms/button/README.md) - Button component

## License

MIT

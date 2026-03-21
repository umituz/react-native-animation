# BaseModal

BaseModal is a generic fullscreen modal component for React Native. Works with responsive design and provides a consistent base for all modal types.

## Features

- 📱 **Responsive**: Adapts to device size
- 🎨 **Theme-Aware**: Full theme integration
- ⬛ **Backdrop**: Opaque background
- ❌ **Dismiss on Backdrop**: Close by tapping backdrop
- ♿ **Accessible**: Full accessibility support
- 🔄 **Fade Animation**: Smooth fade animation
- 📏 **Auto-sizing**: Responsive width and height
- 🔲 **Bordered**: Styled with border

## Installation

```tsx
import { BaseModal } from 'react-native-design-system';
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BaseModal } from 'react-native-design-system';

export const BasicExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ padding: 16 }}>
      <Button title="Open Modal" onPress={() => setVisible(true)} />

      <BaseModal
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <View style={{ padding: 24 }}>
          <Text>Modal Content</Text>
        </View>
      </BaseModal>
    </View>
  );
};
```

## Basic Modal

```tsx
const [visible, setVisible] = useState(false);

<BaseModal
  visible={visible}
  onClose={() => setVisible(false)}
>
  <View style={{ padding: 24 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
      Title
    </Text>
    <Text style={{ marginTop: 16 }}>
      Modal content goes here.
    </Text>
  </View>
</BaseModal>
```

## Disable Backdrop Dismiss

```tsx
<BaseModal
  visible={visible}
  onClose={() => setVisible(false)}
  dismissOnBackdrop={false}
>
  {/* User must press close button */}
  <Button title="Close" onPress={() => setVisible(false)} />
</BaseModal>
```

## Custom Content Style

```tsx
<BaseModal
  visible={visible}
  onClose={() => setVisible(false)}
  contentStyle={{
    backgroundColor: '#f5f5f5',
    padding: 32,
  }}
>
  <Text>Custom Style</Text>
</BaseModal>
```

## Example Usages

### Confirmation Modal

```tsx
export const ConfirmationModal = ({ visible, onClose, onConfirm }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
    >
      <View style={{ padding: 24, alignItems: 'center' }}>
        <AtomicIcon name="warning" size="xl" color="warning" />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
          Confirm Action
        </Text>

        <Text style={{ marginTop: 8, textAlign: 'center' }}>
          Are you sure you want to proceed?
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 24, gap: 12 }}>
          <Button
            title="Cancel"
            variant="ghost"
            onPress={onClose}
          />
          <Button
            title="Confirm"
            variant="primary"
            onPress={() => {
              onConfirm();
              onClose();
            }}
          />
        </View>
      </View>
    </BaseModal>
  );
};
```

### Form Modal

```tsx
export const FormModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
    >
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Add User
        </Text>

        <FormField
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter name"
          style={{ marginTop: 16 }}
        />

        <FormField
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Enter email"
          keyboardType="email-address"
          style={{ marginTop: 16 }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
          <Button
            title="Cancel"
            variant="ghost"
            onPress={onClose}
          />
          <Button
            title="Save"
            onPress={() => {
              onSubmit(formData);
              onClose();
            }}
          />
        </View>
      </View>
    </BaseModal>
  );
};
```

### Image Preview Modal

```tsx
export const ImagePreviewModal = ({ visible, onClose, imageUri }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      dismissOnBackdrop={true}
      contentStyle={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={onClose}
        activeOpacity={1}
      >
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </BaseModal>
  );
};
```

### Settings Modal

```tsx
export const SettingsModal = ({ visible, onClose }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
    >
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Settings
          </Text>
          <TouchableOpacity onPress={onClose}>
            <AtomicIcon name="close-outline" size="lg" />
          </TouchableOpacity>
        </View>

        <Divider style={{ marginTop: 16 }} />

        <ListItem
          title="Dark Mode"
          subtitle="Enable dark theme"
          leftIcon="moon-outline"
          onPress={() => toggleDarkMode()}
          rightIcon="chevron-forward-outline"
        />

        <Divider />

        <ListItem
          title="Notifications"
          subtitle="Manage notifications"
          leftIcon="notifications-outline"
          onPress={() => navigation.navigate('Notifications')}
          rightIcon="chevron-forward-outline"
        />

        <Divider />

        <ListItem
          title="Privacy"
          subtitle="Privacy settings"
          leftIcon="shield-checkmark-outline"
          onPress={() => navigation.navigate('Privacy')}
          rightIcon="chevron-forward-outline"
        />
      </View>
    </BaseModal>
  );
};
```

### Info Modal

```tsx
export const InfoModal = ({ visible, onClose, title, message }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
    >
      <View style={{ padding: 24, alignItems: 'center' }}>
        <AtomicIcon name="information-circle" size="xl" color="primary" />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
          {title}
        </Text>

        <Text style={{ marginTop: 12, textAlign: 'center', color: '#666' }}>
          {message}
        </Text>

        <Button
          title="OK"
          onPress={onClose}
          style={{ marginTop: 24 }}
        />
      </View>
    </BaseModal>
  );
};
```

### Success Modal

```tsx
export const SuccessModal = ({ visible, onClose, message }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
    >
      <View style={{ padding: 32, alignItems: 'center' }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#4caf50',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <AtomicIcon name="checkmark" size="xl" customColor="#fff" />
        </View>

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 24 }}>
          Success!
        </Text>

        <Text style={{ marginTop: 12, textAlign: 'center', color: '#666' }}>
          {message}
        </Text>

        <Button
          title="Continue"
          onPress={onClose}
          style={{ marginTop: 32 }}
        />
      </View>
    </BaseModal>
  );
};
```

### Loading Modal

```tsx
export const LoadingModal = ({ visible }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={() => {}}
      dismissOnBackdrop={false}
      contentStyle={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }}
    >
      <View style={{
        backgroundColor: '#fff',
        padding: 32,
        borderRadius: 16,
        alignItems: 'center',
      }}>
        <AtomicSpinner size="lg" />
        <Text style={{ marginTop: 16 }}>
          Please wait...
        </Text>
      </View>
    </BaseModal>
  );
};
```

### Alert Modal

```tsx
export const AlertModal = ({ visible, onClose, title, message, onAction }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
    >
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <AtomicIcon name="warning" size="lg" color="warning" style={{ marginRight: 12 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>
            {title}
          </Text>
        </View>

        <Text style={{ color: '#666', lineHeight: 22 }}>
          {message}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
          <Button
            title="Cancel"
            variant="ghost"
            onPress={onClose}
          />
          <Button
            title="OK"
            onPress={() => {
              onAction?.();
              onClose();
            }}
          />
        </View>
      </View>
    </BaseModal>
  );
};
```

### Menu Modal

```tsx
export const MenuModal = ({ visible, onClose, options }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      contentStyle={{
        position: 'absolute',
        bottom: 0,
        margin: 16,
        marginBottom: 32,
      }}
    >
      <View style={{ padding: 8 }}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
            }}
            onPress={() => {
              option.onPress();
              onClose();
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BaseModal>
  );
};
```

## Props

### BaseModalProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | - **(Required)** | Modal visibility |
| `onClose` | `() => void` | - **(Required)** | Close callback |
| `children` | `ReactNode` | - **(Required)** | Modal content |
| `dismissOnBackdrop` | `boolean` | `true` | Close on backdrop tap |
| `contentStyle` | `ViewStyle` | - | Custom content style |
| `testID` | `string` | `'base-modal'` | Test ID for testing |

## Best Practices

### 1. Modal Size

```tsx
// BaseModal is responsive by default
// Content determines height automatically
<BaseModal visible={visible} onClose={onClose}>
  {/* Content */}
</BaseModal>
```

### 2. Dismiss Behavior

```tsx
// ✅ Good: Allow dismiss for non-critical modals
<BaseModal dismissOnBackdrop={true} />

// ✅ Good: Prevent dismiss for critical modals
<BaseModal dismissOnBackdrop={false} />
```

### 3. Close Buttons

```tsx
// ✅ Good: Always provide close option
<BaseModal visible={visible} onClose={onClose}>
  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
    <TouchableOpacity onPress={onClose}>
      <AtomicIcon name="close-outline" size="lg" />
    </TouchableOpacity>
  </View>

  {/* Content */}
</BaseModal>
```

### 4. Scrollable Content

```tsx
// ✅ Good: Use ScrollView for long content
<BaseModal visible={visible} onClose={onClose}>
  <ScrollView style={{ padding: 24 }}>
    {/* Long content */}
  </ScrollView>
</BaseModal>
```

## Accessibility

BaseModal provides full accessibility support:

- ✅ Screen reader support
- ✅ Focus trap
- ✅ Keyboard navigation
- ✅ Semantic roles
- ✅ Accessibility labels
- ✅ Escape key support (Android)

## Performance Tips

1. **Lazy Loading**: Load modal content only when visible
2. **Memoization**: Memo modal content
3. **Conditional Rendering**: Don't render when not visible
4. **Cleanup**: Clean up resources on close

## Responsive Behavior

BaseModal automatically adjusts its size based on device:

- **Mobile**: Full width with margin
- **Tablet**: Fixed width (e.g., 600px)
- **Desktop**: Fixed width centered

## Related Components

- [`ConfirmationModal`](./ConfirmationModal.README.md) - Pre-styled confirmation modal
- [`BottomSheet`](./bottom-sheet/README.md) - Bottom sheet modal
- [`FormField`](./FormField.README.md) - Form field component
- [`Button`](../atoms/button/README.md) - Button component

## License

MIT

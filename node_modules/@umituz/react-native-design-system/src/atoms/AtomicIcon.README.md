# AtomicIcon

A theme-aware, **icon-library agnostic** icon component with semantic sizing and colors.

## Setup - Icon Renderer (Required)

AtomicIcon requires an icon renderer to be provided via `DesignSystemProvider`. This allows your app to use ANY icon library.

```tsx
// App.tsx or your root component
import { Ionicons } from '@expo/vector-icons';
// OR MaterialIcons, Feather, FontAwesome, etc.

<DesignSystemProvider
  iconRenderer={({ name, size, color }) => (
    <Ionicons name={name} size={size} color={color} />
  )}
>
  <App />
</DesignSystemProvider>
```

## Import & Usage

```typescript
import { AtomicIcon } from '@umituz/react-native-design-system';
```

## Basic Usage

```tsx
<AtomicIcon name="heart" />
<AtomicIcon name="heart" size="lg" color="primary" />
<AtomicIcon name="settings" customSize={32} customColor="#FF0000" />
```

## Strategy

**Purpose**: Provide consistent, accessible icons with theme integration while allowing apps to choose their icon library.

**Key Benefits**:
- ✅ Use ANY icon library (Ionicons, MaterialIcons, Feather, FontAwesome, etc.)
- ✅ Theme-aware semantic colors
- ✅ Consistent sizing across the app
- ✅ No forced dependencies

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string` | Yes | - | Icon name (interpreted by your renderer) |
| `size` | `IconSize` | No | `'md'` | Semantic size preset |
| `customSize` | `number` | No | - | Custom size in pixels |
| `color` | `IconColor` | No | - | Semantic color from theme |
| `customColor` | `string` | No | - | Custom color (hex, rgba, etc.) |
| `svgPath` | `string` | No | - | Custom SVG path (built-in rendering) |
| `svgViewBox` | `string` | No | `'0 0 24 24'` | SVG viewBox |
| `withBackground` | `boolean` | No | `false` | Add circular background |
| `backgroundColor` | `string` | No | - | Background color |
| `accessibilityLabel` | `string` | No | - | Accessibility label |
| `testID` | `string` | No | - | Test ID |
| `style` | `StyleProp<ViewStyle>` | No | - | Additional styles |

## Size Presets

| Size | Pixels | Use Case |
|------|--------|----------|
| `xs` | 12px | Inline text, tiny badges |
| `sm` | 16px | List items, compact buttons |
| `md` | 20px | Default, most use cases |
| `lg` | 24px | Emphasis, large buttons |
| `xl` | 32px | Headers, featured icons |
| `xxl` | 48px | Hero icons, large displays |

## Semantic Colors

| Color | Use Case |
|-------|----------|
| `primary` | Primary actions, active states |
| `secondary` | Secondary actions, inactive states |
| `success` | Success states, confirmations |
| `warning` | Warning states, cautions |
| `error` | Error states, destructive actions |
| `info` | Information states |
| `textPrimary` | Default text color |
| `textSecondary` | Subdued text |

## Examples

### Different Icon Libraries

```tsx
// Ionicons
<DesignSystemProvider
  iconRenderer={({ name, size, color }) => (
    <Ionicons name={name} size={size} color={color} />
  )}
/>

// Material Icons
<DesignSystemProvider
  iconRenderer={({ name, size, color }) => (
    <MaterialIcons name={name} size={size} color={color} />
  )}
/>

// Feather Icons
<DesignSystemProvider
  iconRenderer={({ name, size, color }) => (
    <Feather name={name} size={size} color={color} />
  )}
/>

// Custom SVG Icons
<DesignSystemProvider
  iconRenderer={({ name, size, color }) => (
    <MySvgIcon name={name} width={size} height={size} fill={color} />
  )}
/>
```

### With Background

```tsx
<AtomicIcon
  name="add"
  size="md"
  color="primary"
  withBackground
  backgroundColor="#E3F2FD"
/>
```

### Custom SVG Path (No Renderer Needed)

```tsx
<AtomicIcon
  svgPath="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
  svgViewBox="0 0 24 24"
  color="primary"
/>
```

## Accessibility

```tsx
<AtomicIcon
  name="menu"
  accessibilityLabel="Open navigation menu"
/>
```

## Migration from Ionicons-specific

If you were using the old Ionicons-specific AtomicIcon:

1. Add `iconRenderer` to your `DesignSystemProvider`
2. Install your preferred icon library
3. Icon names remain the same if using Ionicons

```tsx
// Before (implicit Ionicons)
<AtomicIcon name="heart" />

// After (explicit Ionicons via renderer)
<DesignSystemProvider
  iconRenderer={({ name, size, color }) => (
    <Ionicons name={name} size={size} color={color} />
  )}
>
  <AtomicIcon name="heart" /> {/* Same usage */}
</DesignSystemProvider>
```

## Performance

- Component is memoized with `React.memo`
- Use stable icon names (avoid dynamic strings when possible)
- Icon renderer is cached via Provider

## Related

- [`IconProvider`](./IconRegistry.tsx) - Icon registry for custom renderers
- [`AtomicButton`](./button/README.md) - Button with icon support
- [`AtomicBadge`](./AtomicBadge.tsx) - Badge with icon support

# GlassView

Glassmorphism effect component with Expo BlurView wrapper, automatically adapting to theme mode.

## Import & Usage

```typescript
import { GlassView } from 'react-native-design-system/src/atoms/GlassView';
```

**Location:** `src/atoms/GlassView/GlassView.tsx`

## Basic Usage

```tsx
<GlassView style={{ padding: 24, borderRadius: 16 }}>
  <Text>Glassmorphism Effect</Text>
</GlassView>
```

## Strategy

**Purpose**: Provide modern glassmorphism (frosted glass) visual effects for overlays, modals, and navigation elements.

**When to Use**:
- Navigation bars (headers, tab bars)
- Modal overlays
- Card overlays with background images
- Floating elements (FAB, popup menus)
- Bottom sheets
- Hero sections with background content

**When NOT to Use**:
- For solid backgrounds - use View with backgroundColor instead
- For simple transparency - use opacity instead
- On solid backgrounds (no blur effect needed)
- For performance-critical lists (use sparingly)

## Rules

### Required

1. **ALWAYS** provide `style` prop with dimensions
2. **MUST** have background content behind to show blur effect
3. **NEVER** use on solid backgrounds (wastes performance)
4. **ALWAYS** test on real devices (blur varies by platform)
5. **MUST** use appropriate `intensity` for context

### Intensity Guidelines

1. **10-30**: Subtle blur, content visible
2. **40-60**: Medium blur, balanced (default: 50)
3. **70-100**: Strong blur, content-focused

### Tint Selection

1. **Light**: For light-themed overlays
2. **Dark**: For dark-themed overlays
3. **Auto**: Automatically adapts to theme (default)

### Performance

1. **MUST** limit usage on screen (max 2-3 instances)
2. **SHOULD** use lower intensity when possible
3. **ALWAYS** avoid nested GlassView components
4. **MUST** test on low-end devices

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Without dimensions (won't show anything)
<GlassView>
  <Text>No size</Text>
</GlassView>

// ❌ On solid background (no blur effect)
<View style={{ backgroundColor: '#fff' }}>
  <GlassView style={{ padding: 24 }}>
    <Text>No background to blur</Text>
  </GlassView>
</View>

// ❌ Nested glass views (performance killer)
<GlassView style={{ flex: 1 }}>
  <GlassView style={{ padding: 24 }}>
    <Text>Nested glass</Text>
  </GlassView>
</GlassView>

// ❌ Too high intensity (performance issue)
<GlassView intensity={100} style={{ flex: 1 }}>
  {/* Too heavy for full screen */}
</GlassView>

// ❌ Multiple instances on same screen
<View>
  <GlassView style={{ position: 'absolute', top: 0 }} />
  <GlassView style={{ position: 'absolute', bottom: 0 }} />
  <GlassView style={{ position: 'absolute', left: 0 }} />
  {/* ❌ Too many */}
</View>

// ❌ Without proper overflow handling
<GlassView style={{ borderRadius: 16 }}>
  {/* Content overflow breaks blur effect */}
</GlassView>
```

## Best Practices

### Intensity Selection

✅ **DO**:
```tsx
// Subtle blur - navigation bars
<GlassView intensity={30} style={{ height: 60 }} />

// Medium blur - modals, cards
<GlassView intensity={50} style={{ padding: 24 }} />

// Strong blur - focused content
<GlassView intensity={80} style={{ padding: 32 }} />
```

❌ **DON'T**:
```tsx
// Don't use high intensity for large areas
<GlassView intensity={100} style={{ flex: 1 }} />

// Don't use zero intensity
<GlassView intensity={0} /> {/* No effect */}
```

### Tint Usage

✅ **DO**:
```tsx
// Light theme overlay
<GlassView
  intensity={50}
  tint="light"
  style={{ padding: 24 }}
/>

// Dark theme overlay
<GlassView
  intensity={50}
  tint="dark"
  style={{ padding: 24 }}
/>

// Auto (recommended)
<GlassView intensity={50} style={{ padding: 24 }} />
```

❌ **DON'T**:
```tsx
// Don't mix tint inappropriately
<GlassView tint="light" style={{ backgroundColor: '#000' }} />
```

### Performance Optimization

✅ **DO**:
```tsx
// Fixed dimensions
<GlassView style={{ width: 200, height: 100 }} />

// Lower intensity
<GlassView intensity={30} />

// Overflow hidden
<GlassView style={{ overflow: 'hidden', borderRadius: 16 }} />
```

❌ **DON'T**:
```tsx
// Don't use flex with high intensity
<GlassView intensity={100} style={{ flex: 1 }} />

// Don't animate intensity
<GlassView intensity={animatedValue} />
```

## AI Coding Guidelines

### For AI Agents

When generating GlassView components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { GlassView } from 'react-native-design-system/src/atoms/GlassView';
   ```

2. **Always provide dimensions**:
   ```tsx
   <GlassView
     style={{
       width: '100%',
       height: 60,
       padding: 16,
     }}
   >
     内容
   </GlassView>
   ```

3. **Always use appropriate intensity**:
   ```tsx
   // 轻微模糊 - 导航栏
   <GlassView intensity={30} />

   // 中等模糊 - 卡片、模态框
   <GlassView intensity={50} />

   // 强烈模糊 - 聚焦内容
   <GlassView intensity={80} />
   ```

4. **Always ensure background content exists**:
   ```tsx
   <View style={{ flex: 1 }}>
     <BackgroundImage />

     <GlassView style={StyleSheet.absoluteFill}>
       <Content />
     </GlassView>
   </View>
   ```

5. **Always test on real devices**:
   ```tsx
   // Blur effect varies by platform and device
   // Test on both iOS and Android
   ```

### Common Patterns

#### Navigation Bar
```tsx
<GlassView
  intensity={30}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  }}
>
  <Text style={{ fontWeight: 'bold' }}>Logo</Text>
</GlassView>
```

#### Modal Overlay
```tsx
<Modal visible={visible} transparent>
  <GlassView
    intensity={80}
    tint="dark"
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    }}
  >
    <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24 }}>
      <Text>Modal Content</Text>
    </View>
  </GlassView>
</Modal>
```

#### Card Overlay
```tsx
<View style={{ borderRadius: 16, overflow: 'hidden', height: 200 }}>
  <BackgroundImage style={StyleSheet.absoluteFill} />

  <GlassView
    intensity={60}
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
    }}
  >
    <Text style={{ color: '#fff' }}>{title}</Text>
  </GlassView>
</View>
```

#### Tab Bar
```tsx
<GlassView
  intensity={40}
  style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  }}
>
  {tabs.map((tab) => (
    <TabItem key={tab.key} {...tab} />
  ))}
</GlassView>
```

#### Floating Action Button
```tsx
<GlassView
  intensity={70}
  style={{
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  }}
>
  <Pressable onPress={onPress}>
    <Icon name="add" />
  </Pressable>
</GlassView>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | No | - | Content |
| `style` | `StyleProp<ViewStyle>` | Yes* | - | Container style (*must have dimensions) |
| `intensity` | `number` | No | `50` | Blur intensity (0-100) |
| `tint` | `'light' \| 'dark'` | No | Auto | Color tint |
| `experimentalBlurMethod` | `'dimezisBlurView' \| 'none'` | No | - | Experimental blur method |

## Accessibility

- ✅ Screen reader accessible
- ✅ Maintains contrast ratios
- ✅ Semantic meaning preserved
- ✅ Touch targets maintained

## Performance Tips

1. **Limit usage**: Max 2-3 instances per screen
2. **Lower intensity**: Use 30-50 when possible
3. **Fixed size**: Avoid flex when possible
4. **Avoid nesting**: Never nest GlassView components
5. **Test devices**: Verify on low-end devices
6. **Platform testing**: Test on both iOS and Android

## Platform Support

- ✅ iOS: Full support with native blur
- ✅ Android: Full support with hardware blur
- ⚠️ Web: Partial support (fallback)

## Related Components

- [`BaseModal`](../../molecules/BaseModal/README.md) - Modal component
- [`AtomicCard`](../AtomicCard/README.md) - Card component
- [`GlowingCard`](../../molecules/GlowingCard/README.md) - Glowing card effect

## Version History

- **2.6.83**: Initial release with glassmorphism support
- **2.6.84**: Added theme-aware auto tint

## License

MIT

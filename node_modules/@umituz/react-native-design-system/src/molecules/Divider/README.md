# Divider

A visual separator component for content sections with support for horizontal, vertical, and text dividers.

## Import & Usage

```typescript
import { Divider } from 'react-native-design-system/src/molecules/Divider';
```

**Location:** `src/molecules/Divider/Divider.tsx`

## Basic Usage

```tsx
<Divider />
```

## Strategy

**Purpose**: Visually separate content sections, organize information, and improve content hierarchy.

**When to Use**:
- Between form sections
- Separating list items
- Content grouping
- Visual separation in cards
- Between related and unrelated items
- "OR" separators in auth flows

**When NOT to Use**:
- For decorative purposes only
- When spacing is sufficient
- For active interactive elements
- Too frequently (causes visual clutter)

## Rules

### Required

1. **MUST** have semantic purpose (not decorative)
2. **SHOULD** use appropriate spacing for context
3. **MUST** maintain consistent thickness
4. **ALWAYS** use theme colors unless custom color is intentional
5. **SHOULD** keep spacing minimal and purposeful
6. **NEVER** use for decorative purposes only

### Spacing Guidelines

1. **None**: Between tightly related items
2. **Small**: Within content groups (8px)
3. **Medium**: Default spacing (16px)
4. **Large**: Between major sections (24px)

### Orientation

1. **Horizontal**: Most common, between sections
2. **Vertical**: Between side-by-side content
3. **Text**: For "OR" separators

### Style Selection

1. **Solid**: Default, most common
2. **Dashed**: For emphasis or temporary sections
3. **Dotted**: For subtle separation

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Decorative only
<View>
  <Content />
  <Divider /> {/* ❌ No purpose, just decorative */}
  <MoreContent />
</View>

// ❌ Too many dividers
<View>
  <Item1 />
  <Divider />
  <Item2 />
  <Divider />
  <Item3 />
  <Divider />
  <Item4 />
  {/* ❌ Too many, use spacing instead */}
</View>

// ❌ Inconsistent spacing
<View>
  <Section1 />
  <Divider spacing="large" />
  <Section2 />
  <Divider spacing="none" /> {/* ❌ Inconsistent */}
  <Section3 />
</View>

// ❌ Random colors
<Divider color="#ff00ff" /> {/* ❌ Not theme-compliant */}

// ❌ Too thick
<Divider thickness={10} /> {/* ❌ Too heavy */}

// ❌ Wrong orientation for content
<View style={{ flexDirection: 'row' }}>
  <Content1 />
  <Divider /> {/* ❌ Should be vertical */}
  <Content2 />
</View>

// ❌ Nested dividers
<View>
  <Divider />
  <Divider />
  <Divider /> {/* ❌ Multiple dividers, use spacing */}
</View>
```

## Best Practices

### Form Sections

✅ **DO**:
```tsx
<View>
  <View>
    <AtomicText type="titleMedium">Personal Information</AtomicText>
    <FormField label="First Name" />
    <FormField label="Last Name" />
  </View>

  <Divider spacing="large" />

  <View>
    <AtomicText type="titleMedium">Contact Information</AtomicText>
    <FormField label="Email" />
    <FormField label="Phone" />
  </View>
</View>
```

❌ **DON'T**:
```tsx
// ❌ Dividers between every field
<FormField label="First Name" />
<Divider /> {/* ❌ Unnecessary */}
<FormField label="Last Name" />
<Divider /> {/* ❌ Unnecessary */}
<FormField label="Email" />
```

### List Grouping

✅ **DO**:
```tsx
<View>
  <AtomicText type="labelLarge">Favorites</AtomicText>
  <ListItem title="Item 1" />
  <ListItem title="Item 2" />

  <Divider spacing="large" />

  <AtomicText type="labelLarge">Recent</AtomicText>
  <ListItem title="Item 3" />
  <ListItem title="Item 4" />
</View>
```

### OR Separator

✅ **DO**:
```tsx
<View>
  <SocialLoginButton provider="google" label="Continue with Google" />

  <Divider text="OR" spacing="large" />

  <FormField label="Email" />
  <FormField label="Password" />
  <Button title="Sign In" />
</View>
```

❌ **DON'T**:
```tsx
// ❌ Plain divider without context
<SocialLoginButton provider="google" />
<Divider /> {/* ❌ Not clear what this separates */}
<FormField label="Email" />
```

### Spacing Consistency

✅ **DO**:
```tsx
// ✅ Consistent spacing
<Divider spacing="large" />
<Divider spacing="large" />
<Divider spacing="large" />
```

❌ **DON'T**:
```tsx
// ❌ Inconsistent spacing
<Divider spacing="large" />
<Divider spacing="small" />
<Divider spacing="medium" />
```

## AI Coding Guidelines

### For AI Agents

When generating Divider components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { Divider } from 'react-native-design-system/src/molecules/Divider';
   ```

2. **Always have semantic purpose**:
   ```tsx
   // ✅ Good - separates form sections
   <View>
     <PersonalInfoSection />
     <Divider spacing="large" />
     <ContactInfoSection />
   </View>

   // ❌ Bad - decorative only
   <View>
     <Content />
     <Divider /> {/* No semantic purpose */}
     <MoreContent />
   </View>
   ```

3. **Always use appropriate spacing**:
   ```tsx
   // ✅ Good - spacing by context
   <Divider spacing="large" /> // Between major sections
   <Divider spacing="small" /> // Within content groups
   <Divider spacing="none" /> // Tightly related items

   // ❌ Bad - random spacing
   <Divider spacing="large" />
   <Divider spacing="small" />
   <Divider spacing="large" />
   ```

4. **Always use theme colors unless intentional**:
   ```tsx
   // ✅ Good - theme color
   <Divider /> // Uses token.colors.border

   // ✅ Good - intentional custom color for emphasis
   <Divider color="#6366f1" />

   // ❌ Bad - random custom color
   <Divider color="#ff00ff" />
   ```

5. **Always match orientation to layout**:
   ```tsx
   // ✅ Good - horizontal for vertical stacks
   <View>
     <Content1 />
     <Divider /> {/* Horizontal */}
     <Content2 />
   </View>

   // ✅ Good - vertical for horizontal layouts
   <View style={{ flexDirection: 'row' }}>
     <Content1 />
     <Divider orientation="vertical" /> {/* Vertical */}
     <Content2 />
   </View>

   // ❌ Bad - wrong orientation
   <View style={{ flexDirection: 'row' }}>
     <Content1 />
     <Divider /> {/* Should be vertical */}
     <Content2 />
   </View>
   ```

### Common Patterns

#### Form Section Separator
```tsx
<View>
  <View>
    <AtomicText type="titleMedium">Personal Information</AtomicText>
    <FormField label="First Name" />
    <FormField label="Last Name" />
  </View>

  <Divider spacing="large" />

  <View>
    <AtomicText type="titleMedium">Contact Information</AtomicText>
    <FormField label="Email" />
    <FormField label="Phone" />
  </View>
</View>
```

#### List Group Separator
```tsx
<View>
  <AtomicText type="labelLarge">Favorites</AtomicText>
  {favorites.map(item => <ListItem key={item.id} title={item.title} />)}

  <Divider spacing="large" />

  <AtomicText type="labelLarge">Recent</AtomicText>
  {recent.map(item => <ListItem key={item.id} title={item.title} />)}
</View>
```

#### OR Separator
```tsx
<View>
  <SocialLoginButton provider="google" label="Continue with Google" />

  <Divider text="OR" spacing="large" />

  <FormField label="Email" />
  <FormField label="Password" />
  <Button title="Sign In" />
</View>
```

#### Menu Separator
```tsx
<View>
  <MenuItem title="Profile" icon="person-outline" />
  <MenuItem title="Settings" icon="settings-outline" />

  <Divider />

  <MenuItem title="Help" icon="help-circle-outline" />
  <MenuItem title="About" icon="information-circle-outline" />

  <Divider spacing="large" />

  <MenuItem title="Logout" icon="log-out-outline" variant="danger" />
</View>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Divider orientation |
| `lineStyle` | `'solid' \| 'dashed' \| 'dotted'` | No | `'solid'` | Line style |
| `spacing` | `'none' \| 'small' \| 'medium' \| 'large'` | No | `'medium'` | Spacing around divider |
| `color` | `string` | No | `tokens.colors.border` | Line color |
| `thickness` | `number` | No | `1` | Line thickness |
| `text` | `string` | No | - | Text label for text divider |
| `style` | `ViewStyle` | No | - | Custom container style |

## Accessibility

- ✅ Screen reader support with semantic role
- ✅ Visual separator announced
- ✅ Text divider accessible
- ✅ Sufficient color contrast

## Performance Tips

1. **Keep it simple**: Avoid excessive props
2. **Theme colors**: Use default theme colors
3. **Minimal usage**: Don't overuse dividers
4. **Consistency**: Keep styling consistent

## Related Components

- [`ListItem`](../listitem/README.md) - List item component
- [`AtomicCard`](../../atoms/AtomicCard/README.md) - Card component
- [`AtomicText`](../../atoms/AtomicText/README.md) - Text component

## License

MIT

# Navigation System

React Native Design System provides ready-to-use navigator components that integrate with React Navigation. These components offer theme-aware and customizable navigation solutions.

## Import & Usage

```typescript
import {
  TabsNavigator,
  StackNavigator
} from 'react-native-design-system/src/molecules/navigation';
```

**Location:** `src/molecules/navigation/`

## Basic Usage

```tsx
<TabsNavigator
  config={{
    id: 'main-tabs',
    initialRouteName: 'Home',
    screens: [
      {
        name: 'Home',
        component: HomeScreen,
        options: {
          tabBarLabel: 'Home',
          tabBarIcon: 'home-outline',
        },
      },
    ],
  }}
/>
```

## Strategy

**Purpose**: Provide consistent, theme-aware navigation components that integrate seamlessly with React Navigation.

**When to Use**:
- Building app navigation structure
- Creating bottom tab navigation
- Implementing stack navigation
- Managing nested navigation flows

**When NOT to Use**:
- For simple navigation - use React Navigation directly
- For custom navigation patterns - build custom solution
- For web-only apps - use web routing libraries

## Rules

### Required

1. **ALWAYS** provide unique `id` for navigator config
2. **MUST** have `name` and `component` for each screen
3. **NEVER** use duplicate screen names in same navigator
4. **ALWAYS** define `initialRouteName` explicitly
5. **MUST** wrap app in NavigationContainer

### Tab Navigator

1. **ALWAYS** provide `tabBarLabel` for each tab
2. **MUST** provide `tabBarIcon` using Ionicons names
3. **SHOULD** limit to 3-5 tabs for optimal UX
4. **NEVER** nest tabs more than 2 levels deep

### Stack Navigator

1. **ALWAYS** provide meaningful screen names
2. **MUST** handle header configuration consistently
3. **SHOULD** provide back button labels for navigation
4. **NEVER** stack more than 10 screens deep

## Forbidden

❌ **NEVER** do these:

```tsx
// ❌ Missing required props
<TabsNavigator /> {/* Missing config */}

// ❌ Duplicate screen names
<TabsNavigator
  config={{
    screens: [
      { name: 'Home', component: HomeScreen },
      { name: 'Home', component: AboutScreen }, {/* ❌ Duplicate */}
    ],
  }}
/>

// ❌ Too many tabs
<TabsNavigator
  config={{
    screens: [
      // 10 tabs... ❌ Too many
    ],
  }}
/>

// ❌ Missing icons
{
  name: 'Home',
  component: HomeScreen,
  options: {
    tabBarLabel: 'Home',
    // Missing tabBarIcon ❌
  },
}

// ❌ Inconsistent headers
{
  name: 'Screen1',
  options: { headerShown: true },
},
{
  name: 'Screen2',
  options: { headerShown: false }, {/* ❌ Inconsistent */}
}

// ❌ Hardcoded navigation
navigation.navigate('Profile', { userId: '123' }); {/* ❌ Use params */}
```

## Best Practices

### Navigation Structure

✅ **DO**:
- Use tabs for top-level navigation
- Use stacks for detail navigation
- Keep navigation flat (max 2-3 levels)
- Use descriptive screen names

❌ **DON'T**:
- Create deeply nested navigation
- Use more than 5 tabs
- Mix navigation patterns arbitrarily
- Use abbreviations in screen names

### Tab Configuration

✅ **DO**:
```tsx
options: {
  tabBarLabel: 'Home',
  tabBarIcon: 'home-outline',
  tabBarBadge: 3, // For notifications
}
```

❌ **DON'T**:
```tsx
options: {
  tabBarLabel: 'Hm', // ❌ Too abbreviated
  tabBarIcon: 'invalid-icon-name', // ❌ Invalid icon
}
```

### Screen Options

✅ **DO**:
```tsx
// Show header
options: {
  headerShown: true,
  title: 'Screen Title',
}

// Hide header
options: {
  headerShown: false,
}
```

❌ **DON'T**:
```tsx
// Don't mix header styles inconsistently
options: {
  headerShown: true,
  headerStyle: { backgroundColor: 'random-color' },
}
```

## AI Coding Guidelines

### For AI Agents

When generating Navigation components, follow these rules:

1. **Always import from correct path**:
   ```typescript
   import { TabsNavigator, StackNavigator } from 'react-native-design-system/src/molecules/navigation';
   ```

2. **Always provide unique IDs**:
   ```tsx
   config={{
     id: 'unique-navigator-id',
     initialRouteName: 'Home',
     screens: [...],
   }}
   ```

3. **Always use valid icon names**:
   ```tsx
   options: {
     tabBarIcon: 'home-outline', // Valid Ionicons name
   }
   ```

4. **Always define initial route**:
   ```tsx
   config={{
     initialRouteName: 'Home', // Always specify
   }}
   ```

5. **Never create deeply nested navigation**:
   ```tsx
   // ❌ Bad - Too deep
   Tabs -> Stack -> Stack -> Stack

   // ✅ Good - Flat
   Tabs -> Stack
   ```

### Common Patterns

#### Main Navigation Structure
```tsx
export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <TabsNavigator
        config={{
          id: 'main-tabs',
          initialRouteName: 'Home',
          screens: [
            {
              name: 'Home',
              component: HomeStack,
              options: {
                tabBarLabel: 'Home',
                tabBarIcon: 'home-outline',
              },
            },
            {
              name: 'Profile',
              component: ProfileStack,
              options: {
                tabBarLabel: 'Profile',
                tabBarIcon: 'person-outline',
              },
            },
          ],
        }}
      />
    </NavigationContainer>
  );
};
```

#### Stack with Header
```tsx
<StackNavigator
  config={{
    id: 'home-stack',
    initialRouteName: 'HomeList',
    screens: [
      {
        name: 'HomeList',
        component: HomeList,
        options: {
          title: 'Home',
          headerShown: true,
        },
      },
      {
        name: 'Detail',
        component: DetailScreen,
        options: {
          title: 'Details',
        },
      },
    ],
  }}
/>
```

#### Hidden Tab
```tsx
{
  name: 'Admin',
  component: AdminScreen,
  visible: false, // Hidden from UI
}
```

## Props Reference

### TabsNavigator

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `config` | `TabNavigatorConfig` | Yes | - | Navigator configuration |
| `theme` | `Theme` | No | Default theme | Theme object |

### StackNavigator

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `config` | `StackNavigatorConfig` | Yes | - | Navigator configuration |
| `theme` | `Theme` | No | Default theme | Theme object |

### TabScreenConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Yes | Screen name (unique) |
| `component` | `Component` | Yes | Screen component |
| `options` | `object` | No | Tab options (label, icon, badge) |
| `visible` | `boolean` | No | Show/hide tab |

## Accessibility

- ✅ Screen reader announces tab labels
- ✅ Focus management for keyboard navigation
- ✅ Semantic navigation structure
- ✅ Proper tab order
- ✅ Header titles announced

## Performance

1. **Lazy loading**: Load screens on demand
2. **Memoization**: Memo screen options
3. **Unmount**: Unmount unused screens
4. **Optimization**: Use `navigation.addListener` wisely

## Related Components

- [`AtomicFab`](../../atoms/AtomicFab/README.md) - Floating action button
- [`AtomicIcon`](../../atoms/AtomicIcon/README.md) - Icon component
- [`BaseModal`](../BaseModal/README.md) - Modal component

## External Resources

- [React Navigation Docs](https://reactnavigation.org/)
- [Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)
- [Stack Navigator](https://reactnavigation.org/docs/stack-navigator/)

## License

MIT

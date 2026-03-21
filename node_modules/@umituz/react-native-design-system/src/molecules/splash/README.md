# SplashScreen

SplashScreen is a startup screen component displayed when the application is launching. It includes logo, app name, tagline, and loading indicator. Provides theme-aware color support and timeout control.

## Features

- 🎨 **Theme-Aware**: Theme-conscious colors
- ⏱️ **Timeout Control**: Maximum duration and timeout callback
- 🖼️ **Logo/Icon**: App logo display
- 📝 **App Name & Tagline**: App name and slogan
- ⏳ **Loading Indicator**: Automatic loading indicator
- 🎭 **Customizable**: Colors, style, duration
- ♿ **Accessible**: Screen reader support

## Installation

```tsx
import { SplashScreen, useSplashFlow } from 'react-native-design-system';
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { SplashScreen, useSplashFlow } from 'react-native-design-system';

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const { isInitialized } = useSplashFlow({ duration: 2000 });

  if (!isInitialized) {
    return (
      <SplashScreen
        appName="My App"
        tagline="Welcome"
        visible={!isReady}
        onReady={() => setIsReady(true)}
      />
    );
  }

  return <MainApp />;
};
```

## Simple Splash

```tsx
<SplashScreen
  appName="My App"
  tagline="An amazing app"
  visible={true}
/>
```

## With Logo

```tsx
<SplashScreen
  icon={require('../assets/logo.png')}
  appName="My App"
  tagline="Welcome"
  visible={true}
/>
```

## Custom Colors

```tsx
<SplashScreen
  appName="My App"
  tagline="Welcome"
  colors={{
    background: '#1a1a1a',
    text: '#ffffff',
    iconPlaceholder: '#ffffff30',
  }}
  visible={true}
/>
```

## Timeout

```tsx
<SplashScreen
  appName="My App"
  tagline="Loading..."
  maxDuration={5000}
  onTimeout={() => {
    console.log('Splash timeout - showing error');
    // Handle timeout
  }}
  visible={true}
/>
```

## useSplashFlow Hook

### Basic Usage

```tsx
import { useSplashFlow } from 'react-native-design-system';

export const App = () => {
  const { isInitialized } = useSplashFlow({ duration: 2000 });

  if (!isInitialized) {
    return <SplashScreen appName="My App" visible />;
  }

  return <MainApp />;
};
```

### Custom Duration

```tsx
const { isInitialized } = useSplashFlow({
  duration: 3000, // 3 seconds
});
```

### DeviceEventEmitter Listening

```tsx
import { DeviceEventEmitter } from 'react-native';

useEffect(() => {
  const subscription = DeviceEventEmitter.addListener(
    'splash-ready',
    () => {
      console.log('Splash is ready!');
      navigation.replace('Main');
    }
  );

  return () => subscription.remove();
}, []);
```

## Example Usages

### Basic App Boot

```tsx
export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isInitialized } = useSplashFlow({ duration: 1500 });

  useEffect(() => {
    async function prepare() {
      try {
        // Preload assets
        await SplashScreen.preventAutoHideAsync();
        // Load fonts, images, etc.
        await loadAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady || !isInitialized) {
    return (
      <SplashScreen
        icon={require('./assets/logo.png')}
        appName="My App"
        tagline="Loading..."
        visible
      />
    );
  }

  return <Navigation />;
};
```

### With Auth Flow

```tsx
export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const { isInitialized } = useSplashFlow();

  useEffect(() => {
    // Check auth state
    checkAuthState().then((userData) => {
      setUser(userData);
      setIsReady(true);
    });
  }, []);

  if (!isInitialized || !isReady) {
    return (
      <SplashScreen
        appName="My App"
        tagline="Signing in..."
        visible
      />
    );
  }

  return user ? <AuthenticatedApp /> : <AuthStack />;
};
```

### With Remote Config

```tsx
export const App = () => {
  const [config, setConfig] = useState(null);
  const { isInitialized } = useSplashFlow({ duration: 2000 });

  useEffect(() => {
    // Fetch remote config
    fetchRemoteConfig().then((remoteConfig) => {
      setConfig(remoteConfig);
    });
  }, []);

  if (!isInitialized || !config) {
    return (
      <SplashScreen
        icon={require('./assets/logo.png')}
        appName="My App"
        tagline="Loading settings..."
        maxDuration={5000}
        onTimeout={() => {
          // Fallback to default config
          setConfig(getDefaultConfig());
        }}
        visible
      />
    );
  }

  return <MainApp config={config} />;
};
```

### Multi-Stage Loading

```tsx
export const MultiStageSplash = () => {
  const [loadingStage, setLoadingStage] = useState({
    assets: false,
    auth: false,
    config: false,
  });
  const { isInitialized } = useSplashFlow({ duration: 1500 });

  const allReady = Object.values(loadingStage).every(Boolean);

  const getTagline = () => {
    if (!loadingStage.assets) return 'Loading assets...';
    if (!loadingStage.auth) return 'Signing in...';
    if (!loadingStage.config) return 'Getting settings...';
    return 'Ready!';
  };

  if (!isInitialized || !allReady) {
    return (
      <SplashScreen
        appName="My App"
        tagline={getTagline()}
        visible
      />
    );
  }

  return <MainApp />;
};
```

### Debug Mode

```tsx
export const DebugSplash = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const { isInitialized } = useSplashFlow({ duration: 1000 });

  useEffect(() => {
    if (__DEV__) {
      console.log('[Splash] Initializing...');
      // Collect debug info
      setDebugInfo({
        version: '1.0.0',
        env: 'development',
        timestamp: Date.now(),
      });
    }
  }, []);

  return (
    <SplashScreen
      appName="My App"
      tagline={__DEV__ ? `Debug v${debugInfo.version}` : 'Welcome'}
      maxDuration={3000}
      onTimeout={() => {
        if (__DEV__) {
          console.error('[Splash] Initialization timeout!');
        }
      }}
      visible={!isInitialized}
    />
  );
};
```

## Props

### SplashScreenProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ImageSourcePropType` | - | Logo/icon |
| `appName` | `string` | - | App name |
| `tagline` | `string` | - | Tagline/slogan |
| `colors` | `SplashColors` | - | Custom colors |
| `visible` | `boolean` | `true` | Visibility |
| `maxDuration` | `number` | - | Maximum duration (ms) |
| `onTimeout` | `() => void` | - | Timeout callback |
| `onReady` | `() => void` | - | Ready callback |
| `style` | `ViewStyle` | - | Custom style |

### SplashColors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `string` | `tokens.colors.backgroundPrimary` | Background color |
| `text` | `string` | `tokens.colors.textPrimary` | Text color |
| `iconPlaceholder` | `string` | `text + 30% opacity` | Icon placeholder color |

### useSplashFlow Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `1500` | Splash duration (ms) |

## Best Practices

### 1. Duration Settings

```tsx
// Short
useSplashFlow({ duration: 1000 })

// Medium (recommended)
useSplashFlow({ duration: 2000 })

// Long
useSplashFlow({ duration: 3000 })
```

### 2. Timeout Usage

```tsx
<SplashScreen
  maxDuration={5000}
  onTimeout={() => {
    // Fallback behavior
    navigation.replace('Error');
  }}
/>
```

### 3. Asset Preloading

```tsx
useEffect(() => {
  async function load() {
    await Asset.loadAsync(require('./assets/logo.png'));
    await Font.loadAsync({ font: require('./assets/font.ttf') });
    setAssetsLoaded(true);
  }
  load();
}, []);
```

### 4. Theme Awareness

```tsx
// Theme-aware colors (recommended)
<SplashScreen appName="App" />

// Custom colors
<SplashScreen
  colors={{
    background: '#1a1a1a',
    text: '#ffffff',
  }}
/>
```

## Accessibility

SplashScreen provides full accessibility support:

- ✅ Screen reader support
- ✅ Accessibility label
- ✅ Loading state announcement
- ✅ Timeout notification (DEV mode)

## Performance Tips

1. **Preload Assets**: Preload assets during splash
2. **Optimize**: Optimize logo size
3. **Timeout**: Set maximum duration
4. **Async**: Run async operations in parallel
5. **Minimal**: Avoid unnecessary components

## Related Components

- [`AtomicSpinner`](../../atoms/AtomicSpinner/README.md) - Loading indicator
- [`AtomicText`](../../atoms/AtomicText/README.md) - Text component
- [`BaseModal`](../BaseModal/README.md) - Modal component

## License

MIT

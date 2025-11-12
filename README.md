# @umituz/react-native-animation

Universal animation system for React Native with react-native-reanimated. Provides declarative animations, gesture handling, and preset configurations.

## Installation

```bash
npm install @umituz/react-native-animation
```

## Peer Dependencies

- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `react-native-reanimated` >= 3.10.0
- `react-native-gesture-handler` >= 2.16.0

## Features

- ✅ Declarative animations (fade, slide, scale, bounce, shake)
- ✅ Spring physics animations
- ✅ Gesture handling (tap, pan, pinch, long press)
- ✅ Preset animation configs
- ✅ TypeScript type safety
- ✅ Zero backend dependencies

## Usage

### Basic Animation

```tsx
import { useAnimation } from '@umituz/react-native-animation';
import Animated from 'react-native-reanimated';

const MyComponent = () => {
  const { fadeIn, animatedStyle } = useAnimation();

  useEffect(() => {
    fadeIn();
  }, []);

  return <Animated.View style={animatedStyle}>Content</Animated.View>;
};
```

### Gesture Handling

```tsx
import { useGesture } from '@umituz/react-native-animation';

const MyComponent = () => {
  const { createPanGesture, animatedStyle, GestureDetector } = useGesture();

  const panGesture = createPanGesture({
    onEnd: (x, y) => console.log('Dragged to:', x, y),
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>Draggable</Animated.View>
    </GestureDetector>
  );
};
```

### Available Animations

- `fadeIn()` / `fadeOut()` - Opacity animations
- `slideInUp()` / `slideInDown()` / `slideInLeft()` / `slideInRight()` - Slide animations
- `scaleIn()` / `scaleOut()` - Scale animations
- `bounce()` - Bounce animation
- `shake()` - Shake animation
- `pulse()` - Pulse animation
- `spin()` - Spin animation

### Available Gestures

- `createTapGesture()` - Tap gesture
- `createPanGesture()` - Pan/drag gesture
- `createPinchGesture()` - Pinch/zoom gesture
- `createLongPressGesture()` - Long press gesture

### Reanimated Ready Check

```tsx
import { useReanimatedReady } from '@umituz/react-native-animation';

const MyComponent = () => {
  const isReady = useReanimatedReady();

  if (!isReady) {
    return null; // Don't render Reanimated components until ready
  }

  return <Animated.View>...</Animated.View>;
};
```

## API

### Hooks

- `useAnimation()`: Hook for declarative animations
- `useGesture()`: Hook for gesture handling
- `useReanimatedReady()`: Hook to check if Reanimated is fully initialized

### Types

- `AnimationPreset`: Animation preset enum
- `GestureType`: Gesture type enum
- `AnimationTimingConfig`: Timing configuration
- `AnimationSpringConfig`: Spring configuration

## License

MIT


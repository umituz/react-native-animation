# @umituz/react-native-animation

Universal animation utilities and hooks for React Native apps using React Native Animated API.

## ✨ Features

- 🎬 **React Native Animated API** - No external dependencies, pure React Native
- 🪝 **Custom Hooks** - Easy-to-use hooks for common animation patterns
- 🎨 **Animation Presets** - Pre-configured timing and spring animations
- 📦 **Zero Config** - Works out of the box
- 🪶 **Lightweight** - Small bundle size
- 📱 **TypeScript** - Full TypeScript support

## 📦 Installation

```bash
npm install @umituz/react-native-animation
```

### Peer Dependencies

```bash
npm install react@>=18.2.0 react-native@>=0.74.0
```

## 🚀 Usage

### useStaggeredEntrance

Staggered entrance animations for onboarding slides and similar components.

```tsx
import { useStaggeredEntrance } from '@umituz/react-native-animation';
import { Animated } from 'react-native';

const OnboardingSlide = () => {
  const { iconScale, iconOpacity, titleOpacity, titleTranslateY } = useStaggeredEntrance();

  return (
    <>
      <Animated.View style={{ transform: [{ scale: iconScale }], opacity: iconOpacity }}>
        <Icon />
      </Animated.View>
      <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
        <Title />
      </Animated.View>
    </>
  );
};
```

### useBottomSheetAnimation

Slide and backdrop animations for bottom sheet components.

```tsx
import { useBottomSheetAnimation } from '@umituz/react-native-animation';
import { Animated } from 'react-native';

const BottomSheet = ({ visible }) => {
  const { slideAnim, backdropOpacity } = useBottomSheetAnimation(visible);

  return (
    <>
      <Animated.View style={{ opacity: backdropOpacity }}>
        <Backdrop />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <SheetContent />
      </Animated.View>
    </>
  );
};
```

### useSplashAnimation

Fade, scale, and slide animations for splash screens.

```tsx
import { useSplashAnimation } from '@umituz/react-native-animation';
import { Animated } from 'react-native';

const SplashScreen = () => {
  const { fadeAnim, scaleAnim, slideAnim } = useSplashAnimation();

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
      <SplashContent />
    </Animated.View>
  );
};
```

### Animation Presets

Pre-configured animation presets for consistent timing.

```tsx
import { AnimationPresets, createTimingAnimation } from '@umituz/react-native-animation';
import { Animated } from 'react-native';

const MyComponent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    createTimingAnimation(fadeAnim, 1, AnimationPresets.fast).start();
  }, []);

  return <Animated.View style={{ opacity: fadeAnim }} />;
};
```

## 📚 API Reference

### Hooks

#### `useStaggeredEntrance(options?)`

Returns animation values for staggered entrance animations.

**Options:**
- `delay?: number` - Delay before starting animations (default: 100ms)
- `duration?: number` - Duration of each animation (default: 600ms)
- `translateYOffset?: number` - Initial translateY offset (default: 30)
- `enabled?: boolean` - Whether to enable animations (default: true)

**Returns:**
- `iconScale: Animated.Value`
- `iconOpacity: Animated.Value`
- `titleOpacity: Animated.Value`
- `titleTranslateY: Animated.Value`
- `descriptionOpacity: Animated.Value`
- `descriptionTranslateY: Animated.Value`
- `featuresOpacity: Animated.Value`
- `featuresTranslateY: Animated.Value`

#### `useBottomSheetAnimation(visible, options?)`

Returns animation values for bottom sheet slide and backdrop.

**Options:**
- `duration?: number` - Animation duration (default: 300ms)
- `closeDuration?: number` - Close animation duration (default: 250ms)

**Returns:**
- `slideAnim: Animated.Value`
- `backdropOpacity: Animated.Value`

#### `useSplashAnimation(options?)`

Returns animation values for splash screen animations.

**Options:**
- `fadeDuration?: number` - Fade animation duration (default: 1000ms)
- `springTension?: number` - Spring tension (default: 100)
- `springFriction?: number` - Spring friction (default: 8)
- `slideDuration?: number` - Slide animation duration (default: 800ms)
- `slideOffset?: number` - Initial slide offset (default: 50)
- `enabled?: boolean` - Whether to enable animations (default: true)

**Returns:**
- `fadeAnim: Animated.Value`
- `scaleAnim: Animated.Value`
- `slideAnim: Animated.Value`

### Utilities

#### `AnimationPresets`

Pre-configured animation presets:
- `fast` - Fast animation (200ms)
- `normal` - Normal animation (300ms)
- `slow` - Slow animation (500ms)
- `spring` - Spring animation (bouncy)
- `springGentle` - Spring animation (gentle)

#### `createTimingAnimation(value, toValue, preset?)`

Creates a timing animation with preset.

#### `createSpringAnimation(value, toValue, preset?)`

Creates a spring animation with preset.

## 📄 License

MIT

## 👤 Author

Ümit UZ <umit@umituz.com>


/**
 * React Native Animation - Barrel Export
 *
 * Universal animation system for React Native with react-native-reanimated.
 * Provides declarative animations, gesture handling, and preset configurations.
 *
 * Features:
 * - Declarative animations (fade, slide, scale, bounce, shake)
 * - Spring physics animations
 * - Gesture handling (tap, pan, pinch, long press)
 * - Preset animation configs
 * - TypeScript type safety
 *
 * Usage:
 *
 * Animation Example:
 * ```typescript
 * import { useAnimation } from '@umituz/react-native-animation';
 * import Animated from 'react-native-reanimated';
 *
 * const MyComponent = () => {
 *   const { fadeIn, animatedStyle } = useAnimation();
 *
 *   useEffect(() => {
 *     fadeIn();
 *   }, []);
 *
 *   return <Animated.View style={animatedStyle}>...</Animated.View>;
 * };
 * ```
 *
 * Gesture Example:
 * ```typescript
 * import { useGesture } from '@umituz/react-native-animation';
 *
 * const MyComponent = () => {
 *   const { createPanGesture, animatedStyle, GestureDetector } = useGesture();
 *
 *   const panGesture = createPanGesture({
 *     onEnd: (x, y) => console.log('Dragged to:', x, y),
 *   });
 *
 *   return (
 *     <GestureDetector gesture={panGesture}>
 *       <Animated.View style={animatedStyle}>...</Animated.View>
 *     </GestureDetector>
 *   );
 * };
 * ```
 *
 * Technical:
 * - Uses react-native-reanimated v3 for animations
 * - Uses react-native-gesture-handler for gestures
 * - Zero backend dependencies
 */

// Domain Layer - Entities
export {
  AnimationPreset,
  GestureType,
  AnimationEasing,
  ANIMATION_CONSTANTS,
  AnimationUtils,
} from './domain/entities/Animation';
export type {
  AnimationTimingConfig,
  AnimationSpringConfig,
} from './domain/entities/Animation';

// Presentation Layer - Hooks
export { useAnimation } from './presentation/hooks/useAnimation';
export {
  useGesture,
  type TapGestureOptions,
  type PanGestureOptions,
  type PinchGestureOptions,
} from './presentation/hooks/useGesture';
export { useReanimatedReady } from './presentation/hooks/useReanimatedReady';


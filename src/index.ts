/**
 * @umituz/react-native-animation
 *
 * Universal animation utilities and hooks for React Native apps.
 * Uses React Native Animated API for smooth, performant animations.
 *
 * @packageDocumentation
 */

// Hooks
export { useStaggeredEntrance } from './hooks/useStaggeredEntrance';
export type {
  UseStaggeredEntranceReturn,
  UseStaggeredEntranceOptions,
} from './hooks/useStaggeredEntrance';

export { useBottomSheetAnimation } from './hooks/useBottomSheetAnimation';
export type {
  UseBottomSheetAnimationReturn,
  UseBottomSheetAnimationOptions,
} from './hooks/useBottomSheetAnimation';

export { useSplashAnimation } from './hooks/useSplashAnimation';
export type {
  UseSplashAnimationReturn,
  UseSplashAnimationOptions,
} from './hooks/useSplashAnimation';

// Utils
export {
  AnimationPresets,
  createTimingAnimation,
  createSpringAnimation,
} from './utils/animationPresets';
export type {
  AnimationTimingConfig,
  AnimationSpringConfig,
} from './utils/animationPresets';


/**
 * @umituz/react-native-animation
 * Centralized Animation Package
 */

export * from "./presentation/components/AnimatedCard";
export * from "./presentation/hooks/useWheelAnimation";
export * from "./domain/entities/AnimationTypes";

// Re-export react-native-reanimated for package-driven architecture
export {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withRepeat,
  withDelay,
  Easing,
  runOnJS,
  useAnimatedReaction,
  SharedValue,
  cancelAnimation,
  createAnimatedComponent,
  type AnimatedStyle,
  type SharedValue as SharedValueType,
} from "react-native-reanimated";

// Animated is a default export, need to re-export it separately
export { default as Animated } from "react-native-reanimated";

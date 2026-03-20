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
  Animated,
  createAnimatedComponent,
  type AnimatedStyleProp,
  type AnimatedProps,
  type SharedValue as SharedValueType,
} from "react-native-reanimated";

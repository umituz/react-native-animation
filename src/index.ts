/**
 * @umituz/react-native-animation
 * Centralized Animation Package
 */

// Local exports
export { AnimatedCard } from "./presentation/components/AnimatedCard";
export type { AnimatedCardProps, AnimatedCardRef } from "./presentation/components/AnimatedCard";
export { useWheelAnimation } from "./presentation/hooks/useWheelAnimation";
export type {
  SpinCompleteCallback,
  SpinCompleteCallbackWithData,
  WheelSegment,
  WheelAnimationConfig,
} from "./presentation/hooks/useWheelAnimation";
export * from "./domain/entities/AnimationTypes";

// Re-export react-native-reanimated for package-driven architecture
export type { AnimatedStyle, SharedValue } from "react-native-reanimated";
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
  cancelAnimation,
} from "react-native-reanimated";

// Import and export Animated as default
import Animated from "react-native-reanimated";

// Export Animated namespace with all its components
// Note: Use Animated.View, Animated.Text, etc. directly instead of importing them separately
export default Animated;

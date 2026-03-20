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
} from "react-native-reanimated";

// Re-export Animated as both default and named export
// This allows: import Animated from ... and import { Animated } from ...
import Animated from "react-native-reanimated";
export { Animated };
export default Animated;

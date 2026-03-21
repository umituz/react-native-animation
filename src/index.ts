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

// Import Animated default export
import Animated from "react-native-reanimated";

// Export Animated namespace with all its properties
export * from "react-native-reanimated";

// Also export Animated as default
export default Animated;

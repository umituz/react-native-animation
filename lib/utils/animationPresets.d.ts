/**
 * Animation Presets
 *
 * Common animation configurations for consistent timing and easing.
 */
import { Animated } from 'react-native';
export interface AnimationTimingConfig {
    duration: number;
    easing?: (value: number) => number;
    useNativeDriver?: boolean;
}
export interface AnimationSpringConfig {
    tension: number;
    friction: number;
    useNativeDriver?: boolean;
}
/**
 * Animation presets for common use cases
 */
export declare const AnimationPresets: {
    /**
     * Fast animation (200ms)
     */
    fast: AnimationTimingConfig;
    /**
     * Normal animation (300ms)
     */
    normal: AnimationTimingConfig;
    /**
     * Slow animation (500ms)
     */
    slow: AnimationTimingConfig;
    /**
     * Spring animation (bouncy)
     */
    spring: AnimationSpringConfig;
    /**
     * Spring animation (gentle)
     */
    springGentle: AnimationSpringConfig;
};
/**
 * Create a timing animation with preset
 */
export declare const createTimingAnimation: (value: Animated.Value, toValue: number, preset?: AnimationTimingConfig) => Animated.CompositeAnimation;
/**
 * Create a spring animation with preset
 */
export declare const createSpringAnimation: (value: Animated.Value, toValue: number, preset?: AnimationSpringConfig) => Animated.CompositeAnimation;
//# sourceMappingURL=animationPresets.d.ts.map
/**
 * Animation Presets
 *
 * Common animation configurations for consistent timing and easing.
 */
import { Animated, Easing } from 'react-native';
/**
 * Animation presets for common use cases
 */
export const AnimationPresets = {
    /**
     * Fast animation (200ms)
     */
    fast: {
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
    },
    /**
     * Normal animation (300ms)
     */
    normal: {
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
    },
    /**
     * Slow animation (500ms)
     */
    slow: {
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
    },
    /**
     * Spring animation (bouncy)
     */
    spring: {
        tension: 100,
        friction: 8,
        useNativeDriver: true,
    },
    /**
     * Spring animation (gentle)
     */
    springGentle: {
        tension: 50,
        friction: 7,
        useNativeDriver: true,
    },
};
/**
 * Create a timing animation with preset
 */
export const createTimingAnimation = (value, toValue, preset = AnimationPresets.normal) => {
    return Animated.timing(value, {
        toValue,
        duration: preset.duration,
        easing: preset.easing,
        useNativeDriver: preset.useNativeDriver ?? true,
    });
};
/**
 * Create a spring animation with preset
 */
export const createSpringAnimation = (value, toValue, preset = AnimationPresets.spring) => {
    return Animated.spring(value, {
        toValue,
        tension: preset.tension,
        friction: preset.friction,
        useNativeDriver: preset.useNativeDriver ?? true,
    });
};
//# sourceMappingURL=animationPresets.js.map
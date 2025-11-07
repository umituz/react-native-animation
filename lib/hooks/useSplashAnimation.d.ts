/**
 * useSplashAnimation Hook
 *
 * Provides fade, scale, and slide animations for splash screens.
 * Uses React Native Animated API.
 *
 * @example
 * ```tsx
 * const { fadeAnim, scaleAnim, slideAnim } = useSplashAnimation();
 *
 * <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
 *   <SplashContent />
 * </Animated.View>
 * ```
 */
import { Animated } from 'react-native';
export interface UseSplashAnimationOptions {
    /**
     * Fade animation duration (ms)
     * @default 1000
     */
    fadeDuration?: number;
    /**
     * Scale animation spring tension
     * @default 100
     */
    springTension?: number;
    /**
     * Scale animation spring friction
     * @default 8
     */
    springFriction?: number;
    /**
     * Slide animation duration (ms)
     * @default 800
     */
    slideDuration?: number;
    /**
     * Initial slide offset
     * @default 50
     */
    slideOffset?: number;
    /**
     * Whether to enable animations
     * @default true
     */
    enabled?: boolean;
}
export interface UseSplashAnimationReturn {
    fadeAnim: Animated.Value;
    scaleAnim: Animated.Value;
    slideAnim: Animated.Value;
}
/**
 * Hook for splash screen animations
 *
 * @param options - Animation configuration options
 * @returns Animation values for fade, scale, and slide
 */
export declare const useSplashAnimation: (options?: UseSplashAnimationOptions) => UseSplashAnimationReturn;
//# sourceMappingURL=useSplashAnimation.d.ts.map
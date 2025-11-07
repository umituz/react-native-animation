/**
 * useStaggeredEntrance Hook
 *
 * Provides staggered entrance animations for onboarding slides and similar components.
 * Uses React Native Animated API for smooth, performant animations.
 *
 * @example
 * ```tsx
 * const { iconScale, iconOpacity, titleOpacity } = useStaggeredEntrance();
 *
 * <Animated.View style={{ transform: [{ scale: iconScale }], opacity: iconOpacity }}>
 *   <Icon />
 * </Animated.View>
 * ```
 */
import { Animated } from 'react-native';
export interface UseStaggeredEntranceReturn {
    iconScale: Animated.Value;
    iconOpacity: Animated.Value;
    titleOpacity: Animated.Value;
    titleTranslateY: Animated.Value;
    descriptionOpacity: Animated.Value;
    descriptionTranslateY: Animated.Value;
    featuresOpacity: Animated.Value;
    featuresTranslateY: Animated.Value;
}
export interface UseStaggeredEntranceOptions {
    /**
     * Delay before starting animations (ms)
     * @default 100
     */
    delay?: number;
    /**
     * Duration of each animation (ms)
     * @default 600
     */
    duration?: number;
    /**
     * Initial translateY offset
     * @default 30
     */
    translateYOffset?: number;
    /**
     * Whether to enable animations
     * @default true
     */
    enabled?: boolean;
}
/**
 * Hook for staggered entrance animations
 *
 * @param options - Animation configuration options
 * @returns Animation values for icon, title, description, and features
 */
export declare const useStaggeredEntrance: (options?: UseStaggeredEntranceOptions) => UseStaggeredEntranceReturn;
//# sourceMappingURL=useStaggeredEntrance.d.ts.map
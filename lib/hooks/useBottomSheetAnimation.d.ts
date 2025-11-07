/**
 * useBottomSheetAnimation Hook
 *
 * Provides slide and backdrop animations for bottom sheet components.
 * Uses React Native Animated API.
 *
 * @example
 * ```tsx
 * const { slideAnim, backdropOpacity } = useBottomSheetAnimation(visible);
 *
 * <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
 *   <BottomSheetContent />
 * </Animated.View>
 * ```
 */
import { Animated } from 'react-native';
export interface UseBottomSheetAnimationOptions {
    /**
     * Animation duration (ms)
     * @default 300
     */
    duration?: number;
    /**
     * Close animation duration (ms)
     * @default 250
     */
    closeDuration?: number;
}
export interface UseBottomSheetAnimationReturn {
    slideAnim: Animated.Value;
    backdropOpacity: Animated.Value;
}
/**
 * Hook for bottom sheet slide and backdrop animations
 *
 * @param visible - Whether the bottom sheet is visible
 * @param options - Animation configuration options
 * @returns Animation values for slide and backdrop
 */
export declare const useBottomSheetAnimation: (visible: boolean, options?: UseBottomSheetAnimationOptions) => UseBottomSheetAnimationReturn;
//# sourceMappingURL=useBottomSheetAnimation.d.ts.map
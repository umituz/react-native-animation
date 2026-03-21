/**
 * Chat Animations Hook
 *
 * Lazy loads React Native Reanimated for chat UI animations
 * Prevents unnecessary bundle size for apps not using chat onboarding
 */

import { useEffect, useState, useRef } from "react";

export interface UseChatAnimationsReturn {
  /** Reanimated Animated value from lazy load */
  Animated: any | null;

  /** Whether animations are ready */
  isReady: boolean;

  /** Create fade-in animation */
  createFadeIn: (duration?: number) => any;

  /** Create slide-up animation */
  createSlideUp: (fromY?: number, duration?: number) => any;

  /** Create typing cursor animation */
  createTypingCursor: () => any;

  /** Clean up animations */
  cleanup: () => void;
}

/**
 * Hook for lazy-loading chat animations
 * Only loads Reanimated when actually used
 */
export const useChatAnimations = (): UseChatAnimationsReturn => {
  const [Animated, setAnimated] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const animationRefs = useRef<any[]>([]);

  useEffect(() => {
    let mounted = true;

    // Lazy load Reanimated only when needed
    const loadAnimations = async () => {
      try {
        // const reanimated = await import("@umituz/react-native-animation");

        if (!mounted) return;

        // TODO: Lazy load Reanimated when @umituz/react-native-animation is available
        // For now, return empty
        setAnimated(() => null);
        setIsReady(true);

        if (__DEV__) {
          console.log("[useChatAnimations] Animations disabled (Reanimated not available)");
        }
      } catch (error) {
        if (__DEV__) {
          console.warn("[useChatAnimations] Failed to load Reanimated:", error);
        }
        setIsReady(false);
      }
    };

    loadAnimations();

    return () => {
      mounted = false;
      // Clean up animation refs
      animationRefs.current.forEach((ref) => {
        if (ref && typeof ref.cancel === "function") {
          ref.cancel();
        }
      });
      animationRefs.current = [];
    };
  }, []);

  const createFadeIn = (duration = 300) => {
    if (!Animated) return null;

    try {
      const { withTiming } = Animated;
      const animation = withTiming(1, { duration });
      animationRefs.current.push(animation);
      return animation;
    } catch {
      return null;
    }
  };

  const createSlideUp = (_fromY = 20, duration = 400) => {
    if (!Animated) return null;

    try {
      const { withTiming, Easing } = Animated;
      const animation = withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      });
      animationRefs.current.push(animation);
      return animation;
    } catch {
      return null;
    }
  };

  const createTypingCursor = () => {
    if (!Animated) return null;

    try {
      const { withRepeat, withSequence, withTiming, Easing } = Animated;
      const animation = withRepeat(
        withSequence(
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      animationRefs.current.push(animation);
      return animation;
    } catch {
      return null;
    }
  };

  const cleanup = () => {
    animationRefs.current.forEach((ref) => {
      if (ref && typeof ref.cancel === "function") {
        ref.cancel();
      }
    });
    animationRefs.current = [];
  };

  return {
    Animated,
    isReady,
    createFadeIn,
    createSlideUp,
    createTypingCursor,
    cleanup,
  };
};

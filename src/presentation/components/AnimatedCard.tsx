import React, { memo, useEffect, useImperativeHandle, forwardRef, ForwardedRef } from 'react';
import { StyleSheet, ViewProps, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';

// Fallback dimensions when design-system is not available
const useDimensions = () => ({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

export interface AnimatedCardProps {
  children: React.ReactNode;
  visible?: boolean;
  onAnimationEnd?: () => void;
  style?: ViewProps['style'];
}

export interface AnimatedCardRef {
  animateIn: () => void;
  animateNext: (callback?: () => void) => void;
}

// Animation configuration constants
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 1,
};

type EntryDirection = {
  xOffsetRatio: number;
  yOffset: number;
  yOffsetRatio?: number;
  rotation: number;
};

const ENTRY_DIRECTION_CONFIG: EntryDirection[] = [
  { xOffsetRatio: -0.5, yOffset: 50, rotation: -15 }, // Left
  { xOffsetRatio: 0.5, yOffset: 50, rotation: 15 },  // Right
  { xOffsetRatio: 0, yOffset: 0, yOffsetRatio: 0.3, rotation: 0 }, // Bottom
];

const ANIMATION_TIMING = {
  fadeInDuration: 500,
  exitDuration: 300,
  exitFadeDuration: 300,
  exitSlideDuration: 350,
  initialScale: 0.85,
} as const;

export const AnimatedCard = memo(forwardRef<AnimatedCardRef, AnimatedCardProps>(
  (props: AnimatedCardProps, ref: ForwardedRef<AnimatedCardRef>) => {
    const { children, visible = true, onAnimationEnd, style } = props;
    const responsive = useDimensions();

    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);
    const rotate = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    }));

    const triggerIn = (callback?: () => void) => {
      // Randomize entry point to avoid "always top-left"
      const dirIndex = Math.floor(Math.random() * ENTRY_DIRECTION_CONFIG.length);
      const dir = ENTRY_DIRECTION_CONFIG[dirIndex];

      const xOffset = dir.xOffsetRatio * responsive.width;
      const yOffset = dir.yOffsetRatio ? dir.yOffsetRatio * responsive.height : dir.yOffset;

      opacity.value = 0;
      scale.value = ANIMATION_TIMING.initialScale;
      translateX.value = xOffset;
      translateY.value = yOffset;
      rotate.value = dir.rotation;

      opacity.value = withTiming(1, { duration: ANIMATION_TIMING.fadeInDuration });
      scale.value = withSpring(1, SPRING_CONFIG);
      translateX.value = withSpring(0, SPRING_CONFIG);
      translateY.value = withSpring(0, SPRING_CONFIG);
      rotate.value = withSpring(0, SPRING_CONFIG, () => {
        if (callback) runOnJS(callback)();
        if (onAnimationEnd) runOnJS(onAnimationEnd)();
      });
    };

    const triggerNext = (callback?: () => void) => {
      // Exit animation (swipe up and away)
      const rotationDirection = Math.random() > 0.5 ? 10 : -10;

      opacity.value = withTiming(0, { duration: ANIMATION_TIMING.exitDuration });
      scale.value = withTiming(0.9, { duration: ANIMATION_TIMING.exitDuration });
      translateY.value = withTiming(-responsive.height * 0.4, { duration: ANIMATION_TIMING.exitSlideDuration });
      rotate.value = withTiming(rotationDirection, { duration: ANIMATION_TIMING.exitDuration }, () => {
        runOnJS(triggerIn)(callback);
      });
    };

    useImperativeHandle(ref, () => ({
      animateIn: () => triggerIn(),
      animateNext: (cb?: () => void) => triggerNext(cb),
    }));

    useEffect(() => {
      if (visible) {
        triggerIn();
      }
    }, [visible]);

    return (
      <Animated.View style={[styles.container, animatedStyle, style]}>
        {children}
      </Animated.View>
    );
  }
));

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AnimatedCard.displayName = 'AnimatedCard';


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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 1,
};

export const AnimatedCard = memo(forwardRef<AnimatedCardRef, AnimatedCardProps>(
  (props: AnimatedCardProps, ref: ForwardedRef<AnimatedCardRef>) => {
    const { children, visible = true, onAnimationEnd, style } = props;
    
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
      const directions = [
        { x: -SCREEN_WIDTH * 0.5, y: 50, r: -15 }, // Left
        { x: SCREEN_WIDTH * 0.5, y: 50, r: 15 },  // Right
        { x: 0, y: SCREEN_HEIGHT * 0.3, r: 0 },    // Bottom
      ];
      
      const dir = directions[Math.floor(Math.random() * directions.length)];
      
      opacity.value = 0;
      scale.value = 0.85;
      translateX.value = dir.x;
      translateY.value = dir.y;
      rotate.value = dir.r;

      opacity.value = withTiming(1, { duration: 500 });
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
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(0.9, { duration: 300 });
      translateY.value = withTiming(-SCREEN_HEIGHT * 0.4, { duration: 350 });
      rotate.value = withTiming(Math.random() > 0.5 ? 10 : -10, { duration: 300 }, () => {
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


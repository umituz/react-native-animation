import React, { memo, useEffect, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';

export interface AnimatedCardProps {
  children: React.ReactNode;
  visible?: boolean;
  onAnimationEnd?: () => void;
  style?: any;
}

export interface AnimatedCardRef {
  animateIn: () => void;
  animateNext: (callback?: () => void) => void;
}

export const AnimatedCard = memo(forwardRef<AnimatedCardRef, AnimatedCardProps>(
  ({ children, visible = true, onAnimationEnd, style }, ref) => {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);
    const rotate = useSharedValue(-5);
    const translateY = useSharedValue(20);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
        { translateY: translateY.value },
      ],
    }));

    const triggerIn = (callback?: () => void) => {
      opacity.value = 0;
      scale.value = 0.95;
      rotate.value = -3;
      translateY.value = 15;

      opacity.value = withTiming(1, { duration: 400 });
      scale.value = withSpring(1, { damping: 12 });
      rotate.value = withSpring(0, { damping: 10 });
      translateY.value = withSpring(0, { damping: 12 }, () => {
        if (callback) runOnJS(callback)();
        if (onAnimationEnd) runOnJS(onAnimationEnd)();
      });
    };

    const triggerNext = (callback?: () => void) => {
      // Exit animation
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.9, { duration: 200 });
      translateY.value = withTiming(-20, { duration: 200 }, () => {
        // Reset and animate back in
        runOnJS(triggerIn)(callback);
      });
    };

    useImperativeHandle(ref, () => ({
      animateIn: () => triggerIn(),
      animateNext: (cb) => triggerNext(cb),
    }));

    useEffect(() => {
      if (visible) {
        triggerIn();
      }
    }, []);

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

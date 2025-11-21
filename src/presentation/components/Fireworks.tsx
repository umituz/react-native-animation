/**
 * Fireworks Component
 *
 * Particle-based fireworks animation component.
 * Single Responsibility: Render fireworks particles.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useFireworks } from '../hooks/useFireworks';
import type { FireworksConfig } from '../../domain/entities/Fireworks';

export interface FireworksProps extends FireworksConfig {
  /**
   * X position to trigger fireworks (0-1, relative to container width)
   */
  triggerX?: number;
  /**
   * Y position to trigger fireworks (0-1, relative to container height)
   */
  triggerY?: number;
  /**
   * Auto-trigger on mount
   */
  autoTrigger?: boolean;
  /**
   * Container style
   */
  style?: any;
  /**
   * Test ID
   */
  testID?: string;
}

/**
 * Particle Component
 */
const Particle: React.FC<{
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
}> = ({ x, y, color, size, opacity }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x,
    top: y,
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 2,
    opacity: withTiming(opacity, { duration: 100 }),
  }));

  return <Animated.View style={animatedStyle} />;
};

/**
 * Fireworks Component
 *
 * @example
 * <Fireworks
 *   autoTrigger
 *   particleCount={100}
 *   colors={['#FF6B6B', '#4ECDC4']}
 * />
 */
export const Fireworks: React.FC<FireworksProps> = ({
  triggerX = 0.5,
  triggerY = 0.5,
  autoTrigger = false,
  style,
  testID = 'fireworks',
  ...config
}) => {
  const { particles, trigger } = useFireworks(config);
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (autoTrigger && containerSize.width > 0 && containerSize.height > 0) {
      const x = containerSize.width * triggerX;
      const y = containerSize.height * triggerY;
      trigger(x, y);
    }
  }, [autoTrigger, containerSize, triggerX, triggerY, trigger]);

  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  return (
    <View
      style={[styles.container, style]}
      onLayout={handleLayout}
      testID={testID}
      pointerEvents="none"
    >
      {particles.map((particle, index) => (
        <Particle
          key={`particle-${index}`}
          x={particle.x}
          y={particle.y}
          color={particle.color}
          size={particle.size}
          opacity={particle.life}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});

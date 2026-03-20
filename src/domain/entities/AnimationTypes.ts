/**
 * Animation Types
 */

export enum AnimationState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export type AnimationDuration = number;

export interface TransitionConfig {
  duration?: AnimationDuration;
  delay?: number;
  useNativeDriver?: boolean;
}

export interface CardAnimationConfig extends TransitionConfig {
  scaleFrom?: number;
  rotationFrom?: number;
}

/**
 * Fireworks Domain Entity
 *
 * Types and constants for fireworks particle system
 */

/**
 * Particle configuration
 */
export interface ParticleConfig {
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  life: number;
  decay: number;
}

/**
 * Fireworks configuration
 */
export interface FireworksConfig {
  particleCount?: number;
  colors?: string[];
  duration?: number;
  particleSize?: number;
  spread?: number;
}

/**
 * Fireworks constants
 */
export const FIREWORKS_CONSTANTS = {
  DEFAULT_PARTICLE_COUNT: 50,
  DEFAULT_DURATION: 2000,
  DEFAULT_PARTICLE_SIZE: 4,
  DEFAULT_SPREAD: 100,
  DEFAULT_COLORS: [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
  ],
  GRAVITY: 0.3,
  DECAY_RATE: 0.02,
} as const;


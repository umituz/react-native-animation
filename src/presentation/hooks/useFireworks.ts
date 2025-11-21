/**
 * useFireworks Hook
 *
 * Hook for managing fireworks particle system.
 * Single Responsibility: Manage fireworks state and lifecycle.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ParticleConfig, FireworksConfig } from '../../domain/entities/Fireworks';
import { FIREWORKS_CONSTANTS } from '../../domain/entities/Fireworks';

/**
 * Hook for fireworks animation
 *
 * @example
 * const { particles, trigger, isActive } = useFireworks();
 *
 * // Trigger fireworks
 * trigger();
 *
 * // Render particles
 * {particles.map((particle, index) => (
 *   <Particle key={index} {...particle} />
 * ))}
 */
export const useFireworks = (config: FireworksConfig = {}) => {
  const [particles, setParticles] = useState<ParticleConfig[]>([]);
  const [isActive, setIsActive] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<ParticleConfig[]>([]);

  const {
    particleCount = FIREWORKS_CONSTANTS.DEFAULT_PARTICLE_COUNT,
    colors = FIREWORKS_CONSTANTS.DEFAULT_COLORS,
    duration = FIREWORKS_CONSTANTS.DEFAULT_DURATION,
    particleSize = FIREWORKS_CONSTANTS.DEFAULT_PARTICLE_SIZE,
    spread = FIREWORKS_CONSTANTS.DEFAULT_SPREAD,
  } = config;

  const createParticle = useCallback((
    x: number,
    y: number,
    color: string
  ): ParticleConfig => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * spread + 50;
    
    return {
      x,
      y,
      color,
      size: particleSize + Math.random() * 2,
      velocityX: Math.cos(angle) * velocity,
      velocityY: Math.sin(angle) * velocity,
      life: 1.0,
      decay: FIREWORKS_CONSTANTS.DECAY_RATE + Math.random() * 0.01,
    };
  }, [particleSize, spread]);

  const updateParticles = useCallback(() => {
    const currentParticles = particlesRef.current;
    const updated: ParticleConfig[] = [];

    for (const particle of currentParticles) {
      const newX = particle.x + particle.velocityX * 0.1;
      const newY = particle.y + particle.velocityY * 0.1 + FIREWORKS_CONSTANTS.GRAVITY;
      const newVelocityY = particle.velocityY + FIREWORKS_CONSTANTS.GRAVITY;
      const newLife = particle.life - particle.decay;

      if (newLife > 0) {
        updated.push({
          ...particle,
          x: newX,
          y: newY,
          velocityY: newVelocityY,
          life: newLife,
        });
      }
    }

    particlesRef.current = updated;
    setParticles([...updated]);

    if (updated.length > 0 && isActive) {
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    } else {
      setIsActive(false);
    }
  }, [isActive]);

  const trigger = useCallback((x?: number, y?: number) => {
    const centerX = x ?? 0;
    const centerY = y ?? 0;

    const newParticles: ParticleConfig[] = [];
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      newParticles.push(createParticle(centerX, centerY, color));
    }

    particlesRef.current = newParticles;
    setParticles(newParticles);
    setIsActive(true);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateParticles);

    // Auto-stop after duration
    setTimeout(() => {
      setIsActive(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }, duration);
  }, [particleCount, colors, duration, createParticle, updateParticles]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    particles,
    trigger,
    isActive,
  };
};

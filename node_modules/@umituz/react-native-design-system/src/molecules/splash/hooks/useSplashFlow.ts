/**
 * Splash Flow Hook
 * Manages splash screen initialization state
 *
 * IMPORTANT: Use isAppReady prop instead of duration for real initialization tracking.
 * Artificial delays cause poor UX - the splash should transition as soon as app is ready.
 */

import { useState, useEffect, useRef } from 'react';
import { DeviceEventEmitter } from 'react-native';

export interface UseSplashFlowOptions {
  /**
   * External readiness signal from app initialization
   * When true, splash will transition to main content
   */
  isAppReady?: boolean;
  /**
   * Splash duration in ms. Use isAppReady for real initialization tracking.
   */
  duration?: number;
}

export interface UseSplashFlowResult {
  isInitialized: boolean;
}

export const useSplashFlow = (options: UseSplashFlowOptions = {}): UseSplashFlowResult => {
  const { isAppReady, duration } = options;
  const [isInitialized, setIsInitialized] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Primary: Use external app ready signal (preferred)
    if (isAppReady !== undefined) {
      if (isAppReady && !isInitializedRef.current) {
        isInitializedRef.current = true;
        setIsInitialized(true);
        DeviceEventEmitter.emit('splash-ready');
      }
      return undefined;
    }

    // Timer-based fallback when isAppReady is not provided
    if (duration !== undefined) {
      const timer = setTimeout(() => {
        if (!isInitializedRef.current) {
          isInitializedRef.current = true;
          setIsInitialized(true);
          DeviceEventEmitter.emit('splash-ready');
        }
      }, duration);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isAppReady, duration]);

  return { isInitialized };
};

/**
 * Screen dimension hooks — single source of truth for screen width/height.
 *
 * Always import from here instead of calling useWindowDimensions() inline
 * or Dimensions.get() at module level (which is static and never updates on
 * orientation change, iPad Split View, or Stage Manager).
 */

import { useWindowDimensions } from 'react-native';

/**
 * Returns the current window width (reactive — updates on orientation change).
 * Use inside React components / hooks instead of Dimensions.get("window").width.
 */
export function useScreenWidth(): number {
  return useWindowDimensions().width;
}

/**
 * Returns the current window height (reactive — updates on orientation change).
 * Use inside React components / hooks instead of Dimensions.get("window").height.
 */
export function useScreenHeight(): number {
  return useWindowDimensions().height;
}

/**
 * Returns both width and height (reactive).
 * Convenience wrapper for components that need both dimensions.
 */
export function useScreenDimensions(): { width: number; height: number } {
  const { width, height } = useWindowDimensions();
  return { width, height };
}

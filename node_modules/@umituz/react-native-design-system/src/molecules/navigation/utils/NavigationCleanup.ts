/**
 * Navigation Event Cleanup Utilities
 * 
 * This file provides patterns for proper cleanup of navigation event listeners
 * to prevent memory leaks in React Native applications.
 * 
 * Example usage:
 * ```tsx
 * useEffect(() => {
 *   const unsubscribe = navigation.addListener('focus', handleFocus);
 *   return unsubscribe; // Automatic cleanup on unmount
 * }, [navigation, handleFocus]);
 * 
 * // For multiple listeners:
 * useEffect(() => {
 *   const unsubscribers = [
 *     navigation.addListener('focus', handleFocus),
 *     navigation.addListener('blur', handleBlur),
 *   ];
 *   
 *   return () => unsubscribers.forEach(unsubscribe => unsubscribe());
 * }, [navigation, handleFocus, handleBlur]);
 * ```
 */

export interface NavigationCleanup {
  unsubscribe: () => void;
}

export class NavigationCleanupManager {
  /**
   * Creates a cleanup function for multiple navigation listeners
   */
  static createMultiCleanup(unsubscribers: (() => void)[]): () => void {
    return () => {
      unsubscribers.forEach(unsubscribe => {
        try {
          unsubscribe();
        } catch {
          // Silent cleanup error handling
        }
      });
    };
  }

  /**
   * Safe cleanup wrapper that handles errors gracefully
   */
  static safeCleanup(unsubscribe: () => void): () => void {
    return () => {
      try {
        unsubscribe();
      } catch {
        // Silent cleanup error handling
      }
    };
  }
}
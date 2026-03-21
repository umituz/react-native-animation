/**
 * Haptics Domain - useHaptics Hook
 *
 * React hook for haptic feedback.
 * Provides vibration patterns for common interactions.
 *
 * @domain haptics
 * @layer presentation/hooks
 */

import { useCallback, useRef, useMemo } from 'react';
import { HapticService } from '../../infrastructure/services/HapticService';
import type { ImpactStyle, NotificationType, HapticPattern } from '../../domain/entities/Haptic';

/**
 * Minimum interval between haptic feedback (ms)
 * Prevents spam and improves UX
 */
const THROTTLE_INTERVAL = 50;

/**
 * useHaptics hook for haptic feedback
 *
 * USAGE:
 * ```typescript
 * const haptics = useHaptics();
 *
 * // Common patterns (convenience methods)
 * <TouchableOpacity onPress={() => haptics.buttonPress()}>
 *   <Text>Click Me</Text>
 * </TouchableOpacity>
 *
 * // Success feedback
 * const handleSuccess = async () => {
 *   await saveData();
 *   haptics.success();
 * };
 *
 * // Error feedback
 * const handleError = () => {
 *   haptics.error();
 * };
 *
 * // Selection change (sliders, pickers)
 * <Slider onValueChange={() => haptics.selectionChange()} />
 *
 * // Custom patterns
 * haptics.pattern('long_press');
 * haptics.impact('heavy');
 * haptics.notification('warning');
 * ```
 */
export const useHaptics = () => {
  const lastExecutionRef = useRef<number>(0);

  /**
   * Check if enough time has passed since last haptic
   */
  const canExecute = useCallback((): boolean => {
    const now = Date.now();
    if (now - lastExecutionRef.current < THROTTLE_INTERVAL) {
      return false;
    }
    lastExecutionRef.current = now;
    return true;
  }, []);

  /**
   * Trigger impact feedback (light, medium, heavy)
   */
  const impact = useCallback(async (style: ImpactStyle = 'Light') => {
    if (!canExecute()) return;
    await HapticService.impact(style);
  }, [canExecute]);

  /**
   * Trigger notification feedback (success, warning, error)
   */
  const notification = useCallback(async (type: NotificationType) => {
    if (!canExecute()) return;
    await HapticService.notification(type);
  }, [canExecute]);

  /**
   * Trigger selection feedback (for pickers, sliders)
   */
  const selection = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.selection();
  }, [canExecute]);

  /**
   * Trigger custom haptic pattern
   */
  const pattern = useCallback(async (patternType: HapticPattern) => {
    if (!canExecute()) return;
    await HapticService.pattern(patternType);
  }, [canExecute]);

  /**
   * Common haptic patterns (convenience methods)
   */
  const buttonPress = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.buttonPress();
  }, [canExecute]);

  const success = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.success();
  }, [canExecute]);

  const error = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.error();
  }, [canExecute]);

  const warning = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.warning();
  }, [canExecute]);

  const deleteItem = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.delete();
  }, [canExecute]);

  const refresh = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.refresh();
  }, [canExecute]);

  const selectionChange = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.selectionChange();
  }, [canExecute]);

  const longPress = useCallback(async () => {
    if (!canExecute()) return;
    await HapticService.longPress();
  }, [canExecute]);

  return useMemo(() => ({
    // Generic methods
    impact,
    notification,
    selection,
    pattern,

    // Common patterns (convenience methods)
    buttonPress,
    success,
    error,
    warning,
    delete: deleteItem,
    refresh,
    selectionChange,
    longPress,
  }), [
    impact,
    notification,
    selection,
    pattern,
    buttonPress,
    success,
    error,
    warning,
    deleteItem,
    refresh,
    selectionChange,
    longPress,
  ]);
};

/**
 * Haptics Domain - Barrel Export
 *
 * Provides haptic feedback (vibration) using expo-haptics.
 * Universal domain - enabled by default for UX improvement.
 *
 * @domain haptics
 * @enabled true (All apps - UX improvement)
 *
 * ARCHITECTURE:
 * - Domain Layer: Entities (haptic types, patterns, utilities)
 * - Infrastructure Layer: Services (HapticService)
 * - Presentation Layer: Hooks (useHaptics)
 *
 * DEPENDENCIES:
 * - expo-haptics (vibration patterns)
 *
 * FEATURES:
 * - Impact feedback (light, medium, heavy)
 * - Notification feedback (success, warning, error)
 * - Selection feedback (pickers, sliders)
 * - Custom haptic patterns
 * - Convenience methods for common interactions
 *
 * USAGE:
 *
 * Basic Haptics:
 * ```typescript
 * import { useHaptics } from '@umituz/react-native-haptics';
 *
 * const haptics = useHaptics();
 *
 * // Button press
 * <TouchableOpacity onPress={() => haptics.buttonPress()}>
 *   <Text>Click Me</Text>
 * </TouchableOpacity>
 *
 * // Success feedback
 * const handleSave = async () => {
 *   await saveData();
 *   haptics.success();
 * };
 *
 * // Error feedback
 * haptics.error();
 * ```
 *
 * Selection Change (Sliders, Pickers):
 * ```typescript
 * import { useHaptics } from '@umituz/react-native-haptics';
 *
 * const haptics = useHaptics();
 *
 * <Slider
 *   value={value}
 *   onValueChange={(val) => {
 *     setValue(val);
 *     haptics.selectionChange();
 *   }}
 * />
 * ```
 *
 * Custom Patterns:
 * ```typescript
 * import { useHaptics } from '@umituz/react-native-haptics';
 *
 * const haptics = useHaptics();
 *
 * // Impact with specific style
 * haptics.impact('heavy');
 *
 * // Notification with specific type
 * haptics.notification('warning');
 *
 * // Custom pattern
 * haptics.pattern('long_press');
 * ```
 *
 * Direct Service Usage (Rare):
 * ```typescript
 * import { HapticService } from '@umituz/react-native-haptics';
 *
 * // Use when you can't use hooks (outside components)
 * await HapticService.buttonPress();
 * await HapticService.success();
 * ```
 *
 * Common Patterns:
 * ```typescript
 * import { useHaptics } from '@umituz/react-native-haptics';
 *
 * const haptics = useHaptics();
 *
 * // Button press (light impact)
 * haptics.buttonPress();
 *
 * // Success (notification feedback)
 * haptics.success();
 *
 * // Error (notification feedback)
 * haptics.error();
 *
 * // Warning (notification feedback)
 * haptics.warning();
 *
 * // Delete (medium impact)
 * haptics.delete();
 *
 * // Refresh (medium impact)
 * haptics.refresh();
 *
 * // Selection change (selection feedback)
 * haptics.selectionChange();
 *
 * // Long press (heavy impact)
 * haptics.longPress();
 * ```
 *
 * Utilities:
 * ```typescript
 * import { HapticUtils } from '@umituz/react-native-haptics';
 *
 * // Get impact style for pattern
 * const style = HapticUtils.getImpactForPattern('button_press'); // 'light'
 *
 * // Get notification type for pattern
 * const type = HapticUtils.getNotificationForPattern('success'); // 'success'
 *
 * // Check if pattern should use notification
 * const shouldUse = HapticUtils.shouldUseNotification('success'); // true
 * ```
 *
 * BENEFITS:
 * - Improved UX with tactile feedback
 * - Consistent haptic patterns across app
 * - Silent failure (no crashes if unsupported)
 * - Platform-agnostic (iOS + Android)
 * - Easy integration in any component
 * - Works across all apps
 *
 * USE CASES:
 * - Button presses
 * - Success confirmations
 * - Error alerts
 * - Selection changes (sliders, pickers)
 * - Delete actions
 * - Refresh actions
 * - Long press gestures
 * - Form validation feedback
 *
 * @see https://docs.expo.dev/versions/latest/sdk/haptics/
 */

// ============================================================================
// DOMAIN LAYER - ENTITIES
// ============================================================================

export type {
  ImpactStyle,
  NotificationType,
  HapticPattern,
} from './domain/entities/Haptic';

export {
  HAPTIC_CONSTANTS,
  isImpactStyle,
  isNotificationType,
  isHapticPattern,
} from './domain/entities/Haptic';

// ============================================================================
// INFRASTRUCTURE LAYER - SERVICES
// ============================================================================

export { HapticService } from './infrastructure/services/HapticService';

// ============================================================================
// PRESENTATION LAYER - HOOKS
// ============================================================================

export { useHaptics } from './presentation/hooks/useHaptics';

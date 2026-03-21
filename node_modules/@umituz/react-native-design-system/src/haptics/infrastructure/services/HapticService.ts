/**
 * Haptics Domain - Haptic Service
 *
 * Service for haptic feedback using expo-haptics (optional peer dep).
 * Falls back to noop when expo-haptics is not installed or haptics are disabled.
 *
 * LAZY LOADING:
 * expo-haptics is only required at runtime when a haptic is triggered AND enabled.
 * Apps that don't need haptics pay zero cost — no require() is ever called.
 *
 * USAGE:
 * // Opt out entirely (e.g. tablet apps, web, or apps without expo-haptics):
 * HapticService.configure({ enabled: false })
 *
 * // Opt in (default):
 * HapticService.configure({ enabled: true })
 */

import type { ImpactStyle, NotificationType, HapticPattern } from '../../domain/entities/Haptic';

// ── App-level enable/disable flag ───────────────────────────────────────────
let _enabled = true;

// ── Module cache — required only on first haptic call (when enabled) ────────
let _hapticsModule: typeof import('expo-haptics') | null = null;

const getHapticsModule = (): typeof import('expo-haptics') | null => {
  if (!_enabled) return null;
  if (_hapticsModule !== null) return _hapticsModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _hapticsModule = require('expo-haptics') as typeof import('expo-haptics');
    return _hapticsModule;
  } catch (error) {
    if (__DEV__) {
      console.warn('[HapticService] expo-haptics not available:', error);
    }
    return null;
  }
};

function logError(method: string, error: unknown): void {
  if (__DEV__) {
    console.error(`[DesignSystem] HapticService.${method} error:`, error);
  }
}

export class HapticService {
  /**
   * Configure haptics at the app level.
   * Call once at startup — before any haptic is triggered.
   *
   * @param enabled - false to silently disable all haptics (no expo-haptics required).
   *                  Defaults to true.
   */
  static configure({ enabled }: { enabled: boolean }): void {
    _enabled = enabled;
    if (!enabled) {
      _hapticsModule = null; // release cached reference
    }
  }

  static async impact(style: ImpactStyle = 'Light'): Promise<void> {
    const Haptics = getHapticsModule();
    if (!Haptics) return;
    try {
      const styleMap: Record<ImpactStyle, (typeof Haptics.ImpactFeedbackStyle)[keyof typeof Haptics.ImpactFeedbackStyle]> = {
        Light: Haptics.ImpactFeedbackStyle.Light,
        Medium: Haptics.ImpactFeedbackStyle.Medium,
        Heavy: Haptics.ImpactFeedbackStyle.Heavy,
        Rigid: Haptics.ImpactFeedbackStyle.Rigid,
        Soft: Haptics.ImpactFeedbackStyle.Soft,
      };
      await Haptics.impactAsync(styleMap[style] ?? Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      logError('impact', error);
    }
  }

  static async notification(type: NotificationType): Promise<void> {
    const Haptics = getHapticsModule();
    if (!Haptics) return;
    try {
      const typeMap: Record<NotificationType, (typeof Haptics.NotificationFeedbackType)[keyof typeof Haptics.NotificationFeedbackType]> = {
        Success: Haptics.NotificationFeedbackType.Success,
        Warning: Haptics.NotificationFeedbackType.Warning,
        Error: Haptics.NotificationFeedbackType.Error,
      };
      await Haptics.notificationAsync(typeMap[type]);
    } catch (error) {
      logError('notification', error);
    }
  }

  static async selection(): Promise<void> {
    const Haptics = getHapticsModule();
    if (!Haptics) return;
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      logError('selection', error);
    }
  }

  static async pattern(pattern: HapticPattern): Promise<void> {
    try {
      switch (pattern) {
        case 'selection':
          await HapticService.selection();
          break;
        case 'success':
          await HapticService.notification('Success');
          break;
        case 'warning':
          await HapticService.notification('Warning');
          break;
        case 'error':
          await HapticService.notification('Error');
          break;
        default:
          await HapticService.impact('Light');
      }
    } catch (error) {
      logError('pattern', error);
    }
  }

  // ── Convenience methods ──────────────────────────────────────────────────
  static async buttonPress(): Promise<void> { await HapticService.impact('Light'); }
  static async success(): Promise<void> { await HapticService.pattern('success'); }
  static async error(): Promise<void> { await HapticService.pattern('error'); }
  static async warning(): Promise<void> { await HapticService.pattern('warning'); }
  static async delete(): Promise<void> { await HapticService.impact('Medium'); }
  static async refresh(): Promise<void> { await HapticService.impact('Light'); }
  static async selectionChange(): Promise<void> { await HapticService.pattern('selection'); }
  static async longPress(): Promise<void> { await HapticService.impact('Medium'); }
  static async rigid(): Promise<void> { await HapticService.impact('Rigid'); }
  static async soft(): Promise<void> { await HapticService.impact('Soft'); }
}

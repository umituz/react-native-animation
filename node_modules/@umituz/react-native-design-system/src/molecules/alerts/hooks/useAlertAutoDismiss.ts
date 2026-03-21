/**
 * useAlertAutoDismiss Hook
 *
 * Handles auto-dismiss timer for alerts with duration.
 * Checks dismissible flag before setting timer (fixes AlertBanner bug).
 */

import { useEffect } from 'react';
import type { Alert } from '../AlertTypes';
import { DEFAULT_ALERT_DURATION } from '../utils/alertUtils';

export function useAlertAutoDismiss(
  alert: Alert,
  onDismiss: () => void
) {
  useEffect(() => {
    if (!alert.dismissible) return;

    const duration = alert.duration ?? DEFAULT_ALERT_DURATION;
    if (duration <= 0) return;

    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [alert.id, alert.duration, alert.dismissible, onDismiss]);
}

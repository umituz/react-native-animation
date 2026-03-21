/**
 * useAlertDismissHandler Hook
 *
 * Extracts common dismiss logic from all alert variants.
 * Combines store dismissal with optional callback.
 */

import { useCallback } from 'react';
import { useAlertStore } from '../AlertStore';
import type { Alert } from '../AlertTypes';

export function useAlertDismissHandler(alert: Alert) {
  const dismissAlert = useAlertStore((state) => state.dismissAlert);

  const handleDismiss = useCallback(() => {
    dismissAlert(alert.id);
    alert.onDismiss?.();
  }, [alert, dismissAlert]);

  return handleDismiss;
}

/**
 * Alert Store
 */

import { createStore } from '../../storage';
import { Alert } from './AlertTypes';

interface AlertState {
    alerts: Alert[];
    _updateInProgress: boolean;
}

interface AlertActions {
    addAlert: (alert: Alert) => void;
    dismissAlert: (id: string) => void;
    clearAlerts: () => void;
}

export const useAlertStore = createStore<AlertState, AlertActions>({
    name: 'alert-store',
    initialState: {
        alerts: [],
        _updateInProgress: false,
    },
    persist: false,
    actions: (set, get) => ({
        addAlert: (alert: Alert) => {
            const { _updateInProgress, alerts } = get();
            if (_updateInProgress) return;

            const existingIndex = alerts.findIndex((a: Alert) => a.id === alert.id);

            if (existingIndex >= 0) {
                // Replace existing alert
                const updatedAlerts = [...alerts];
                updatedAlerts[existingIndex] = alert;
                set({ alerts: updatedAlerts });
            } else {
                // Add new alert
                set({ alerts: [...alerts, alert] });
            }
        },
        dismissAlert: (id: string) => {
            const { _updateInProgress, alerts } = get();
            if (_updateInProgress) return;

            const updatedAlerts = alerts.filter((a: Alert) => a.id !== id);

            // Only update if something actually changed
            if (updatedAlerts.length !== alerts.length) {
                set({ alerts: updatedAlerts });
            }
        },
        clearAlerts: () => set({ alerts: [] }),
    }),
});

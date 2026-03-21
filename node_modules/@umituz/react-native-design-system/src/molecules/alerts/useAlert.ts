/**
 * useAlert Hook
 */

import { useCallback } from 'react';
import { useAlertStore } from './AlertStore';
import { AlertService } from './AlertService';
import { AlertType, AlertMode, AlertOptions } from './AlertTypes';

export interface UseAlertReturn {
    show: (type: AlertType, mode: AlertMode, title: string, message?: string, options?: AlertOptions) => string;
    showSuccess: (title: string, message?: string, options?: AlertOptions) => string;
    showError: (title: string, message?: string, options?: AlertOptions) => string;
    showWarning: (title: string, message?: string, options?: AlertOptions) => string;
    showInfo: (title: string, message?: string, options?: AlertOptions) => string;
    dismissAlert: (id: string) => void;
    clearAlerts: () => void;
}

export const useAlert = (): UseAlertReturn => {
    const { addAlert, dismissAlert, clearAlerts } = useAlertStore();

    const show = useCallback((
        type: AlertType,
        mode: AlertMode,
        title: string,
        message?: string,
        options?: AlertOptions
    ) => {
        const alert = AlertService.createAlert(type, mode, title, message, options);
        addAlert(alert);
        return alert.id;
    }, [addAlert]);

    const showSuccess = useCallback((title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createSuccessAlert(title, message, options);
        addAlert(alert);
        return alert.id;
    }, [addAlert]);

    const showError = useCallback((title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createErrorAlert(title, message, options);
        addAlert(alert);
        return alert.id;
    }, [addAlert]);

    const showWarning = useCallback((title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createWarningAlert(title, message, options);
        addAlert(alert);
        return alert.id;
    }, [addAlert]);

    const showInfo = useCallback((title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createInfoAlert(title, message, options);
        addAlert(alert);
        return alert.id;
    }, [addAlert]);

    return {
        show,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        dismissAlert,
        clearAlerts,
    };
};

/**
 * Alert Service
 */

import { generateUUID } from '../../uuid';
import { Alert, AlertType, AlertMode, AlertOptions, AlertPosition } from './AlertTypes';
import { useAlertStore } from './AlertStore';

export class AlertService {
    // Debouncing state
    private static lastAlertTime = 0;
    private static debounceDelay = 300; // ms
    private static pendingAlertTimeout: ReturnType<typeof setTimeout> | null = null;
    private static pendingAlert: { type: AlertType; mode: AlertMode; title: string; message?: string; options?: AlertOptions } | null = null;

    /**
     * Creates a base Alert object with defaults
     */
    static createAlert(
        type: AlertType,
        defaultMode: AlertMode,
        title: string,
        message?: string,
        options?: AlertOptions
    ): Alert {
        const id = generateUUID();
        const mode = options?.mode || defaultMode;

        // Default position based on mode
        const defaultPosition = mode === AlertMode.BANNER ? AlertPosition.TOP : AlertPosition.TOP;

        return {
            id,
            type,
            mode,
            title,
            message,
            position: options?.position || defaultPosition,
            icon: options?.icon,
            actions: options?.actions?.map(action => ({
                id: generateUUID(),
                ...action,
            })) || [],
            dismissible: options?.dismissible ?? true,
            duration: options?.duration,
            onDismiss: options?.onDismiss,
            testID: options?.testID,
            createdAt: Date.now(),
        };
    }

    static createSuccessAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.SUCCESS, AlertMode.TOAST, title, message, options);
    }

    static createErrorAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.ERROR, AlertMode.TOAST, title, message, options);
    }

    static createWarningAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.WARNING, AlertMode.TOAST, title, message, options);
    }

    static createInfoAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.INFO, AlertMode.TOAST, title, message, options);
    }

    /**
     * Add alert with debouncing to prevent spam
     */
    private static addAlertDebounced(type: AlertType, mode: AlertMode, title: string, message?: string, options?: AlertOptions): string {
        const now = Date.now();
        const timeSinceLastAlert = now - this.lastAlertTime;

        // Clear any pending alert
        if (this.pendingAlertTimeout) {
            clearTimeout(this.pendingAlertTimeout);
            this.pendingAlertTimeout = null;
        }

        // If enough time has passed, show immediately
        if (timeSinceLastAlert >= this.debounceDelay) {
            const alert = this.createAlert(type, mode, title, message, options);
            useAlertStore.getState().addAlert(alert);
            this.lastAlertTime = now;
            return alert.id;
        }

        // Otherwise, debounce and show the latest alert after delay
        this.pendingAlert = { type, mode, title, message, options };
        this.pendingAlertTimeout = setTimeout(() => {
            if (this.pendingAlert) {
                const alert = this.createAlert(
                    this.pendingAlert.type,
                    this.pendingAlert.mode,
                    this.pendingAlert.title,
                    this.pendingAlert.message,
                    this.pendingAlert.options
                );
                useAlertStore.getState().addAlert(alert);
                this.lastAlertTime = Date.now();
                this.pendingAlert = null;
                this.pendingAlertTimeout = null;
            }
        }, this.debounceDelay);

        // Return a placeholder ID (the real alert will be shown after debounce)
        return `pending-${Date.now()}`;
    }

    /**
     * Convenience methods to show alerts directly from outside React components
     * These access the Zustand store directly without requiring hooks
     */
    static success(title: string, message?: string, options?: AlertOptions): string {
        return this.addAlertDebounced(AlertType.SUCCESS, AlertMode.TOAST, title, message, options);
    }

    static error(title: string, message?: string, options?: AlertOptions): string {
        return this.addAlertDebounced(AlertType.ERROR, AlertMode.TOAST, title, message, options);
    }

    static warning(title: string, message?: string, options?: AlertOptions): string {
        return this.addAlertDebounced(AlertType.WARNING, AlertMode.TOAST, title, message, options);
    }

    static info(title: string, message?: string, options?: AlertOptions): string {
        return this.addAlertDebounced(AlertType.INFO, AlertMode.TOAST, title, message, options);
    }

    static show(type: AlertType, mode: AlertMode, title: string, message?: string, options?: AlertOptions): string {
        return this.addAlertDebounced(type, mode, title, message, options);
    }

    static dismiss(id: string): void {
        useAlertStore.getState().dismissAlert(id);
    }

    static clear(): void {
        // Clear any pending alert
        if (this.pendingAlertTimeout) {
            clearTimeout(this.pendingAlertTimeout);
            this.pendingAlertTimeout = null;
            this.pendingAlert = null;
        }
        useAlertStore.getState().clearAlerts();
    }
}

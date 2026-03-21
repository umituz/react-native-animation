/**
 * Alert Entity and Types
 */

export enum AlertType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}

export enum AlertMode {
    TOAST = 'toast',
    BANNER = 'banner',
    MODAL = 'modal',
    INLINE = 'inline',
}

export enum AlertPosition {
    TOP = 'top',
    BOTTOM = 'bottom',
    CENTER = 'center',
}

export interface AlertAction {
    id?: string;
    label: string;
    onPress: () => Promise<void> | void;
    style?: 'primary' | 'secondary' | 'destructive';
    closeOnPress?: boolean;
}

export interface AlertOptions {
    mode?: AlertMode;
    duration?: number;
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: string;
    actions?: AlertAction[];
    testID?: string;
    position?: AlertPosition;
}

export interface Alert {
    id: string;
    type: AlertType;
    mode: AlertMode;
    title: string;
    message?: string;
    position: AlertPosition;
    icon?: string;
    actions: AlertAction[];
    dismissible: boolean;
    duration?: number;
    createdAt: number;
    testID?: string;
    onDismiss?: () => void;
}

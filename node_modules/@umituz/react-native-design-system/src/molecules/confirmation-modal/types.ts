/**
 * ConfirmationModal Types
 */
import type { ViewStyle, StyleProp } from 'react-native';

export type ConfirmationModalVariant = 'default' | 'destructive' | 'warning' | 'success';

export interface ConfirmationModalVariantConfig {
    icon: string;
    iconColor: string;
    confirmText?: string;
}

export interface ConfirmationModalProps {
    /** Modal visibility */
    visible: boolean;
    /** Modal title */
    title: string;
    /** Modal message */
    message: string;
    /** Confirm button text */
    confirmText?: string;
    /** Cancel button text */
    cancelText?: string;
    /** Confirm callback */
    onConfirm: () => void;
    /** Cancel/Close callback */
    onCancel: () => void;
    /** Modal variant for styling */
    variant?: ConfirmationModalVariant;
    /** Optional icon */
    icon?: string;
    /** Test ID */
    testID?: string;
    /** Show backdrop */
    showBackdrop?: boolean;
    /** Allow backdrop dismiss */
    backdropDismissible?: boolean;
    /** Custom style */
    style?: StyleProp<ViewStyle>;
}

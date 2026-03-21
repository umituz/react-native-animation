import React from 'react';

export type SnapPoint = string | number;
export type BottomSheetPreset = 'small' | 'medium' | 'large' | 'full' | 'custom';
export type KeyboardBehavior = 'interactive' | 'extend' | 'fillParent';

export interface BottomSheetConfig {
    snapPoints: SnapPoint[];
    initialIndex?: number;
    enableBackdrop?: boolean;
    backdropAppearsOnIndex?: number;
    backdropDisappearsOnIndex?: number;
    keyboardBehavior?: KeyboardBehavior;
    enableHandleIndicator?: boolean;
    enablePanDownToClose?: boolean;
    enableDynamicSizing?: boolean;
}

export interface BottomSheetRef {
    snapToIndex: (index: number) => void;
    snapToPosition: (position: string | number) => void;
    expand: () => void;
    collapse: () => void;
    close: () => void;
}

export interface BottomSheetModalRef {
    present: () => void;
    dismiss: () => void;
    snapToIndex: (index: number) => void;
    snapToPosition: (position: string | number) => void;
    expand: () => void;
    collapse: () => void;
}

export interface BottomSheetProps {
    children: React.ReactNode;
    preset?: BottomSheetPreset;
    snapPoints?: SnapPoint[];
    initialIndex?: number;
    enableBackdrop?: boolean;
    backdropAppearsOnIndex?: number;
    backdropDisappearsOnIndex?: number;
    keyboardBehavior?: KeyboardBehavior;
    enableHandleIndicator?: boolean;
    enablePanDownToClose?: boolean;
    enableDynamicSizing?: boolean;
    backgroundColor?: string;
    onChange?: (index: number) => void;
    onClose?: () => void;
}

export interface BottomSheetModalProps extends Omit<BottomSheetProps, 'onClose'> {
    onDismiss?: () => void;
    backgroundColor?: string;
}

export interface UseBottomSheetReturn {
    sheetRef: React.RefObject<BottomSheetRef | null>;
    open: () => void;
    close: () => void;
    expand: () => void;
    collapse: () => void;
    snapToIndex: (index: number) => void;
    snapToPosition: (position: string | number) => void;
}

export interface UseBottomSheetModalReturn {
    modalRef: React.RefObject<BottomSheetModalRef | null>;
    present: () => void;
    dismiss: () => void;
    snapToIndex: (index: number) => void;
    snapToPosition: (position: string | number) => void;
    expand: () => void;
    collapse: () => void;
}


export const BottomSheetUtils = {
    getPreset: (preset: BottomSheetPreset): BottomSheetConfig => {
        switch (preset) {
            case 'small':
                return {
                    snapPoints: ['25%'],
                    enableBackdrop: true,
                    enablePanDownToClose: true,
                };
            case 'medium':
                return {
                    snapPoints: ['50%'],
                    enableBackdrop: true,
                    enablePanDownToClose: true,
                };
            case 'large':
                return {
                    snapPoints: ['90%'],
                    enableBackdrop: true,
                    enablePanDownToClose: true,
                };
            case 'full':
                return {
                    snapPoints: ['100%'],
                    enableBackdrop: true,
                    enablePanDownToClose: false,
                };
            default:
                return {
                    snapPoints: ['50%'],
                    enableBackdrop: true,
                    enablePanDownToClose: true,
                };
        }
    },

    createConfig: (config: Partial<BottomSheetConfig>): BottomSheetConfig => {
        return {
            snapPoints: ['50%'],
            enableBackdrop: true,
            enablePanDownToClose: true,
            ...config,
        };
    },
};

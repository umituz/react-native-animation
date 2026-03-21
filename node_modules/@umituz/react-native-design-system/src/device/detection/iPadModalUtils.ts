/**
 * iPad Modal Utilities
 * Modal dimensions optimized for iPad following Apple HIG
 */

import { Dimensions } from 'react-native';
import { CONTENT_WIDTH_CONSTRAINTS, IPAD_LAYOUT_CONFIG } from './iPadBreakpoints';
import { isIPad, isIPadPro } from './iPadDetection';

export interface ModalDimensions {
    width: number | string;
    maxWidth: number;
    maxHeight: string | number;
    horizontalMargin: number;
    borderRadius: number;
}

/**
 * Get modal dimensions optimized for iPad
 */
export function getIPadModalDimensions(): ModalDimensions {
    const { width } = Dimensions.get('window');

    if (isIPadPro()) {
        return {
            width: CONTENT_WIDTH_CONSTRAINTS.MODAL_MAX,
            maxWidth: CONTENT_WIDTH_CONSTRAINTS.MODAL_MAX,
            maxHeight: '75%',
            horizontalMargin: 64,
            borderRadius: 20,
        };
    }

    if (isIPad()) {
        return {
            width: Math.min(width * 0.8, CONTENT_WIDTH_CONSTRAINTS.MODAL_MAX),
            maxWidth: CONTENT_WIDTH_CONSTRAINTS.MODAL_MAX,
            maxHeight: '80%',
            horizontalMargin: IPAD_LAYOUT_CONFIG.MODAL_HORIZONTAL_MARGIN,
            borderRadius: IPAD_LAYOUT_CONFIG.MODAL_CORNER_RADIUS,
        };
    }

    return {
        width: '92%',
        maxWidth: 480,
        maxHeight: '90%',
        horizontalMargin: 16,
        borderRadius: 24,
    };
}

export interface PaywallDimensions {
    width: number | string;
    maxWidth: number;
    maxHeight: string | number;
    padding: number;
    buttonHeight: number;
    priceTextScale: number;
}

/**
 * Get paywall modal dimensions - Apple HIG compliant
 */
export function getPaywallDimensions(): PaywallDimensions {
    const { width } = Dimensions.get('window');

    if (isIPadPro()) {
        return {
            width: CONTENT_WIDTH_CONSTRAINTS.PAYWALL_MAX,
            maxWidth: CONTENT_WIDTH_CONSTRAINTS.PAYWALL_MAX,
            maxHeight: '80%',
            padding: 32,
            buttonHeight: 56,
            priceTextScale: 1.2,
        };
    }

    if (isIPad()) {
        return {
            width: Math.min(width * 0.75, CONTENT_WIDTH_CONSTRAINTS.PAYWALL_MAX),
            maxWidth: CONTENT_WIDTH_CONSTRAINTS.PAYWALL_MAX,
            maxHeight: '85%',
            padding: 28,
            buttonHeight: 52,
            priceTextScale: 1.1,
        };
    }

    return {
        width: '100%',
        maxWidth: 480,
        maxHeight: '95%',
        padding: 20,
        buttonHeight: 50,
        priceTextScale: 1.0,
    };
}

/**
 * iPad Layout Utilities
 */

import { Dimensions } from 'react-native';
import { DEVICE_BREAKPOINTS } from '../../responsive/config';
import {
    IPAD_BREAKPOINTS,
    TOUCH_TARGETS,
    CONTENT_WIDTH_CONSTRAINTS,
    IPAD_LAYOUT_CONFIG,
} from './iPadBreakpoints';
import { isIPad, isIPadPro } from './iPadDetection';

/**
 * Get optimal content max width based on screen size
 */
export function getContentMaxWidth(screenWidth: number): number {
    if (screenWidth >= IPAD_BREAKPOINTS.IPAD_12_9_PRO) {
        return CONTENT_WIDTH_CONSTRAINTS.READABLE_MAX;
    }
    if (screenWidth >= IPAD_BREAKPOINTS.IPAD_AIR) {
        return Math.min(screenWidth * 0.85, CONTENT_WIDTH_CONSTRAINTS.READABLE_MAX);
    }
    if (screenWidth >= DEVICE_BREAKPOINTS.SMALL_TABLET) {
        return Math.min(screenWidth * 0.90, CONTENT_WIDTH_CONSTRAINTS.FORM_MAX);
    }
    return screenWidth;
}

/**
 * Get grid columns based on screen width
 */
export function getIPadGridColumns(screenWidth: number): number {
    if (screenWidth >= IPAD_BREAKPOINTS.IPAD_LANDSCAPE_AIR) return 4;
    if (screenWidth >= IPAD_BREAKPOINTS.IPAD_12_9_PRO) return 3;
    if (screenWidth >= DEVICE_BREAKPOINTS.SMALL_TABLET) return 2;
    return 1;
}

/**
 * Get touch target size based on device
 */
export function getTouchTargetSize(): number {
    return isIPad() ? TOUCH_TARGETS.IPAD_RECOMMENDED : TOUCH_TARGETS.RECOMMENDED;
}

/**
 * Get screen padding based on device type
 */
export function getIPadScreenPadding(): number {
    if (isIPadPro()) return 32;
    if (isIPad()) return IPAD_LAYOUT_CONFIG.SCREEN_PADDING;
    return 16;
}

/**
 * Get font scale for iPad
 * Optimized for readability - Apple HIG recommends slightly larger fonts on iPad
 * but not too large to avoid crowding
 */
export function getIPadFontScale(): number {
    // iPad Pro: Slightly larger fonts for larger screen
    if (isIPadPro()) return 1.08;
    // Standard iPad: Minimal scale to avoid crowding
    if (isIPad()) return 1.03;
    return 1.0;
}

export interface IPadLayoutInfo {
    isIPad: boolean;
    isLandscape: boolean;
    screenWidth: number;
    screenHeight: number;
    contentMaxWidth: number;
    gridColumns: number;
    touchTargetSize: number;
    screenPadding: number;
    fontScale: number;
}

/**
 * Get complete iPad layout information
 */
export function getIPadLayoutInfo(): IPadLayoutInfo {
    const { width, height } = Dimensions.get('window');

    return {
        isIPad: isIPad(),
        isLandscape: width > height,
        screenWidth: width,
        screenHeight: height,
        contentMaxWidth: getContentMaxWidth(width),
        gridColumns: getIPadGridColumns(width),
        touchTargetSize: getTouchTargetSize(),
        screenPadding: getIPadScreenPadding(),
        fontScale: getIPadFontScale(),
    };
}

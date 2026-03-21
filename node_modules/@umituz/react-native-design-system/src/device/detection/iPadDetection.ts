/**
 * iPad Device Detection Utilities
 *
 * Uses expo-device for system-level tablet detection,
 * then uses screen dimensions for iPad-specific sub-categories.
 *
 * ⚠️ NOTE: These functions use Dimensions.get() which doesn't update on
 * device rotation, iPad Split View, or Stage Manager. For reactive detection
 * that updates on dimension changes, consider using useWindowDimensions() hook
 * directly in your components.
 */

import { Dimensions } from 'react-native';
import { IPAD_BREAKPOINTS } from './iPadBreakpoints';
import { isTablet, isLandscape } from './deviceDetection';

export function isIPad(): boolean {
    return isTablet();
}

export function isIPadMini(): boolean {
    if (!isIPad()) return false;

    const { width, height } = Dimensions.get('window');
    const minWidth = Math.min(width, height);
    return minWidth < IPAD_BREAKPOINTS.IPAD_AIR;
}

export function isIPadPro(): boolean {
    if (!isIPad()) return false;

    const { width, height } = Dimensions.get('window');
    const minWidth = Math.min(width, height);
    return minWidth >= IPAD_BREAKPOINTS.IPAD_11_PRO;
}

export function isIPadLandscape(): boolean {
    return isLandscape();
}

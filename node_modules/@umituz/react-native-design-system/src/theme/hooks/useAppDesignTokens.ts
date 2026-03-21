import { useMemo, useRef } from 'react';
import { useTheme } from '../infrastructure/stores/themeStore';
import { createDesignTokens } from '../core/TokenFactory';
import { useResponsive } from '../../responsive/useResponsive';
import { type DesignTokens } from '../types/ThemeTypes';
import type { CustomThemeColors } from '../core/CustomColors';

/**
 * Shallow equality check for CustomThemeColors
 */
function areCustomColorsEqual(a?: CustomThemeColors, b?: CustomThemeColors): boolean {
    if (a === b) return true;
    if (!a || !b) return false;

    const keysA = Object.keys(a) as (keyof CustomThemeColors)[];
    const keysB = Object.keys(b) as (keyof CustomThemeColors)[];

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (a[key] !== b[key]) return false;
    }

    return true;
}

/**
 * Hook to access current design tokens (colors, spacing, typography, etc.)
 *
 * Uses useTheme directly - single source of truth for theme state.
 */
export const useAppDesignTokens = (): DesignTokens => {
    const { themeMode, customColors } = useTheme();
    const { spacingMultiplier, getFontSize } = useResponsive();

    // Stabilize customColors reference to prevent unnecessary re-computation
    const customColorsRef = useRef(customColors);
    if (!areCustomColorsEqual(customColorsRef.current, customColors)) {
        customColorsRef.current = customColors;
    }

    return useMemo(
        () => createDesignTokens(themeMode, customColorsRef.current, spacingMultiplier, getFontSize),
        [themeMode, spacingMultiplier, getFontSize]
    );
};

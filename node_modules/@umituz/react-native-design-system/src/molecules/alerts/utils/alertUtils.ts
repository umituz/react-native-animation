/**
 * Alert Utilities
 *
 * Helper functions for alert component styling and behavior.
 */

import type { DesignTokens } from '../../../theme';
import type { StyleProp, ViewStyle } from 'react-native';
import { AlertType } from '../AlertTypes';
import type { AlertAction } from '../AlertTypes';

/**
 * Gets background color for alert type
 *
 * @param type - Alert type
 * @param tokens - Design tokens containing color definitions
 * @returns Color string for the alert type
 */
export function getAlertBackgroundColor(type: AlertType, tokens: DesignTokens): string {
    const colors = {
        [AlertType.SUCCESS]: tokens.colors.success,
        [AlertType.ERROR]: tokens.colors.error,
        [AlertType.WARNING]: tokens.colors.warning,
        [AlertType.INFO]: tokens.colors.info,
    };
    return colors[type] || tokens.colors.backgroundSecondary;
}

/**
 * Gets border color for alert type
 *
 * @param type - Alert type
 * @param tokens - Design tokens containing color definitions
 * @returns Border color string for the alert type
 */
export function getAlertBorderColor(type: AlertType, tokens: DesignTokens): string {
    const colors = {
        [AlertType.SUCCESS]: tokens.colors.success,
        [AlertType.ERROR]: tokens.colors.error,
        [AlertType.WARNING]: tokens.colors.warning,
        [AlertType.INFO]: tokens.colors.info,
    };
    return colors[type] || tokens.colors.border;
}

/**
 * Gets background color with opacity for inline alerts
 *
 * @param type - Alert type
 * @param tokens - Design tokens containing color definitions
 * @param opacity - Opacity value (0-255 hex), default '15' for ~8%
 * @returns Background color string with opacity
 */
export function getAlertBackgroundColorInline(type: AlertType, tokens: DesignTokens, opacity: string = '15'): string {
    const baseColor = getAlertBackgroundColor(type, tokens);
    return baseColor + opacity;
}

/**
 * Gets text color for alert type
 *
 * @param tokens - Design tokens containing color definitions
 * @returns Text color string (typically inverse for alerts)
 */
export function getAlertTextColor(tokens: DesignTokens): string {
    return tokens.colors.textInverse;
}

/**
 * Gets action button style
 *
 * @param actionStyle - Button style type
 * @param tokens - Design tokens
 * @returns Style object
 */
export function getActionButtonStyle(
    actionStyle: AlertAction['style'],
    tokens: DesignTokens
): StyleProp<ViewStyle> {
    if (actionStyle === 'secondary') {
        return {
            backgroundColor: undefined,
            borderWidth: 1,
            borderColor: tokens.colors.textInverse,
        };
    }

    const colors = {
        primary: tokens.colors.backgroundPrimary,
        destructive: tokens.colors.error,
    };
    return { backgroundColor: colors[actionStyle as keyof typeof colors] || tokens.colors.backgroundSecondary };
}

/**
 * Gets action text color
 *
 * @param actionStyle - Button style type
 * @param tokens - Design tokens
 * @returns Text color string
 */
export function getActionTextColor(
    actionStyle: AlertAction['style'],
    tokens: DesignTokens
): string {
    return actionStyle === 'primary' ? tokens.colors.textPrimary : tokens.colors.textInverse;
}

/**
 * Default alert duration in milliseconds
 */
export const DEFAULT_ALERT_DURATION = 3000;

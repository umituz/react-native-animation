/**
 * ListItem Styles
 */
import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';

export interface ListItemStyles {
    container: ViewStyle;
    disabled: ViewStyle;
    iconContainer: ViewStyle;
    content: ViewStyle;
    subtitle: TextStyle;
}

export const getListItemStyles = (tokens: DesignTokens): ListItemStyles => {
    // Responsive minHeight: uses base height (56) multiplied by spacingMultiplier
    const minHeight = Math.floor(56 * tokens.spacingMultiplier);

    return {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.md,
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.borders.radius.md,
            minHeight,
        },
        disabled: {
            opacity: tokens.opacity.disabled,
        },
        iconContainer: {
            marginRight: tokens.spacing.md,
        },
        content: {
            flex: 1,
        },
        subtitle: {
            marginTop: tokens.spacing.xs,
        },
    };
};

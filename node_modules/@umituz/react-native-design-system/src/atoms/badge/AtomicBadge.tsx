/**
 * AtomicBadge Component
 * Reusable badge for labels, status indicators, and tags
 */

import React, { useMemo } from "react";
import { View, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { AtomicText } from "../AtomicText";
import { AtomicIcon, type IconName } from "../icon";
import { useAppDesignTokens } from '../../theme';

export type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface AtomicBadgeProps {
    /** Badge text content */
    text: string;
    /** Visual variant */
    variant?: BadgeVariant;
    /** Size preset */
    size?: BadgeSize;
    /** Optional icon name (interpreted by app's icon renderer) */
    icon?: IconName;
    /** Icon position */
    iconPosition?: "left" | "right";
    /** Custom container style */
    style?: StyleProp<ViewStyle>;
    /** Custom text style */
    textStyle?: StyleProp<TextStyle>;
    /** Test ID for testing */
    testID?: string;
}

export const AtomicBadge: React.FC<AtomicBadgeProps> = React.memo(({
    text,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    style,
    textStyle,
    testID,
}) => {
    const tokens = useAppDesignTokens();

    const sizeConfig = useMemo(() => ({
        sm: {
            paddingH: 6 * tokens.spacingMultiplier,
            paddingV: 2 * tokens.spacingMultiplier,
            fontSize: 10 * tokens.spacingMultiplier,
            iconSize: 10 * tokens.spacingMultiplier,
            gap: 3 * tokens.spacingMultiplier,
            radius: 4 * tokens.spacingMultiplier
        },
        md: {
            paddingH: 8 * tokens.spacingMultiplier,
            paddingV: 4 * tokens.spacingMultiplier,
            fontSize: 11 * tokens.spacingMultiplier,
            iconSize: 12 * tokens.spacingMultiplier,
            gap: 4 * tokens.spacingMultiplier,
            radius: 6 * tokens.spacingMultiplier
        },
        lg: {
            paddingH: 12 * tokens.spacingMultiplier,
            paddingV: 6 * tokens.spacingMultiplier,
            fontSize: 13 * tokens.spacingMultiplier,
            iconSize: 14 * tokens.spacingMultiplier,
            gap: 5 * tokens.spacingMultiplier,
            radius: 8 * tokens.spacingMultiplier
        },
    }[size]), [size, tokens.spacingMultiplier]);

    const colors = useMemo(() => {
        switch (variant) {
            case "primary":
                return { bg: tokens.colors.primaryLight, text: tokens.colors.primary };
            case "secondary":
                return { bg: tokens.colors.surfaceSecondary, text: tokens.colors.textSecondary };
            case "success":
                return { bg: tokens.colors.successLight, text: tokens.colors.success };
            case "warning":
                return { bg: tokens.colors.warningLight, text: tokens.colors.warning };
            case "error":
                return { bg: tokens.colors.errorLight, text: tokens.colors.error };
            case "info":
                return { bg: tokens.colors.infoLight, text: tokens.colors.info };
            default:
                return { bg: tokens.colors.primaryLight, text: tokens.colors.primary };
        }
    }, [variant, tokens.colors]);

    const containerStyle: StyleProp<ViewStyle> = [
        styles.container,
        {
            backgroundColor: colors.bg,
            paddingHorizontal: sizeConfig.paddingH,
            paddingVertical: sizeConfig.paddingV,
            borderRadius: sizeConfig.radius,
            gap: sizeConfig.gap,
            flexDirection: iconPosition === "right" ? "row-reverse" : "row",
        },
        style,
    ];

    return (
        <View style={containerStyle} testID={testID}>
            {icon && (
                <AtomicIcon
                    name={icon}
                    customSize={sizeConfig.iconSize}
                    customColor={colors.text}
                />
            )}
            <AtomicText
                type="labelSmall"
                style={[
                    {
                        color: colors.text,
                        fontSize: sizeConfig.fontSize,
                        fontWeight: "700",
                    },
                    textStyle,
                ]}
            >
                {text}
            </AtomicText>
        </View>
    );
});

AtomicBadge.displayName = "AtomicBadge";

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        alignItems: "center",
        justifyContent: "center",
    },
});

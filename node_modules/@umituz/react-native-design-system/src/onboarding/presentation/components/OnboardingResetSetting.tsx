import React, { useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon, AtomicText } from "../../../atoms";
import { useAppDesignTokens } from "../../../theme/hooks/useAppDesignTokens";

export interface OnboardingResetSettingProps {
    onReset: () => void | Promise<void>;
    title?: string;
    description?: string;
    iconName?: string;
    iconColor?: string;
    titleColor?: string;
    visible?: boolean;
    isLast?: boolean;
}

export const OnboardingResetSetting = ({
    onReset,
    title,
    description,
    iconName = "extension-puzzle",
    iconColor,
    titleColor,
    visible = __DEV__,
    isLast = false,
}: OnboardingResetSettingProps) => {
    const tokens = useAppDesignTokens();

    const handlePress = useCallback(async () => {
        await onReset();
    }, [onReset]);

    if (!visible) return null;

    const defaultIconColor = iconColor || tokens.colors.error;
    const defaultTitleColor = titleColor || tokens.colors.error;

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={[styles.container, !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: tokens.colors.border }]}>
                <View style={styles.iconContainer}>
                    <AtomicIcon name={iconName} size="md" customColor={defaultIconColor} />
                </View>
                <View style={styles.content}>
                    <AtomicText type="bodyLarge" style={{ color: defaultTitleColor, fontWeight: '600' }} numberOfLines={1}>
                        {title}
                    </AtomicText>
                    <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary }} numberOfLines={1}>
                        {description}
                    </AtomicText>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginRight: 16,
    },
    content: {
        flex: 1,
    }
});


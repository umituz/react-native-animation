import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, AtomicIcon, useIconName } from '../../../atoms';
import { useAppDesignTokens } from '../../../theme';
import type { IconName } from '../../../atoms';
import { calculateResponsiveSize } from '../../../responsive';
import { COUNTDOWN_TOGGLE } from '../../../constants';

export interface CountdownHeaderProps {
    title: string;
    icon?: IconName;
    iconColor?: string;
    showToggle?: boolean;
    onToggle?: () => void;
}

export const CountdownHeader: React.FC<CountdownHeaderProps> = ({
    title,
    icon,
    iconColor = 'primary',
    showToggle = false,
    onToggle,
}) => {
    const tokens = useAppDesignTokens();
    const swapIcon = useIconName('swap');
    const spacingMultiplier = tokens.spacingMultiplier;

    const toggleButtonSize = useMemo(
        () => calculateResponsiveSize(COUNTDOWN_TOGGLE.size, spacingMultiplier),
        [spacingMultiplier]
    );

    const containerStyle = useMemo(() => [
        styles.container,
        { marginBottom: tokens.spacing.md },
    ], [tokens.spacing.md]);

    const titleRowStyle = useMemo(() => [
        styles.titleRow,
        { gap: tokens.spacing.sm },
    ], [tokens.spacing.sm]);

    const toggleButtonStyle = useMemo(() => [
        styles.toggleButton,
        {
            backgroundColor: tokens.colors.surfaceSecondary,
            width: toggleButtonSize,
            height: toggleButtonSize,
            borderRadius: toggleButtonSize / 2,
        },
    ], [styles.toggleButton, tokens.colors.surfaceSecondary, toggleButtonSize]);

    return (
        <View style={containerStyle}>
            <View style={titleRowStyle}>
                {icon && (
                    <AtomicIcon
                        name={icon}
                        size="sm"
                        customColor={iconColor}
                    />
                )}
                <AtomicText
                    type="titleMedium"
                    color="onSurface"
                    style={styles.title}
                >
                    {title}
                </AtomicText>
            </View>

            {showToggle && onToggle && (
                <TouchableOpacity
                    style={toggleButtonStyle}
                    onPress={onToggle}
                    accessibilityRole="button"
                    accessibilityLabel="Toggle view"
                >
                    <AtomicIcon
                        name={swapIcon}
                        size="sm"
                        color="onSurface"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: '700',
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { AtomicText } from '../../../atoms';
import { useAppDesignTokens } from '../../../theme';
import { calculateResponsiveSize } from '../../../responsive';
import { COUNTDOWN_SIZES } from '../../../constants';

export interface TimeUnitProps {
    value: number;
    label: string;
    size?: 'small' | 'medium' | 'large';
}

export const TimeUnit: React.FC<TimeUnitProps> = ({
    value,
    label,
    size = 'medium',
}) => {
    const tokens = useAppDesignTokens();
    const spacingMultiplier = tokens.spacingMultiplier;

    const styles = useMemo(() => ({
        container: {
            flex: 1,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        value: {
            fontWeight: '700' as const,
            lineHeight: calculateResponsiveSize(38, spacingMultiplier),
        },
        label: {
            fontWeight: '600' as const,
            marginTop: calculateResponsiveSize(2, spacingMultiplier),
            letterSpacing: 1,
            textTransform: 'uppercase' as const,
        },
    }), [spacingMultiplier]);

    const sizeConfig = useMemo(() => ({
        small: {
            fontSize: calculateResponsiveSize(COUNTDOWN_SIZES.small.fontSize, spacingMultiplier),
            padding: tokens.spacing.sm,
            minHeight: calculateResponsiveSize(COUNTDOWN_SIZES.small.minHeight, spacingMultiplier),
        },
        medium: {
            fontSize: calculateResponsiveSize(COUNTDOWN_SIZES.medium.fontSize, spacingMultiplier),
            padding: tokens.spacing.md,
            minHeight: calculateResponsiveSize(COUNTDOWN_SIZES.medium.minHeight, spacingMultiplier),
        },
        large: {
            fontSize: calculateResponsiveSize(COUNTDOWN_SIZES.large.fontSize, spacingMultiplier),
            padding: tokens.spacing.lg,
            minHeight: calculateResponsiveSize(COUNTDOWN_SIZES.large.minHeight, spacingMultiplier),
        },
    }), [spacingMultiplier, tokens.spacing.sm, tokens.spacing.md, tokens.spacing.lg]);

    const config = sizeConfig[size];

    const displayValue = value >= 100 ? String(value) : String(value).padStart(2, '0');
    const digitCount = String(value).length;

    // Calculate font size based on digit count for better consistency
    let fontSizeMultiplier = 1;
    if (digitCount >= 4) {
        fontSizeMultiplier = 0.6; // 4+ digits
    } else if (digitCount === 3) {
        fontSizeMultiplier = 0.7; // 3 digits
    }

    const calculatedFontSize = config.fontSize * fontSizeMultiplier;

    const containerStyle = useMemo(() => [
        styles.container,
        {
            backgroundColor: tokens.colors.surfaceSecondary,
            borderRadius: tokens.borders.radius.lg,
            paddingVertical: config.padding,
            minHeight: config.minHeight,
            paddingHorizontal: tokens.spacing.xs,
        },
    ], [styles.container, tokens.colors.surfaceSecondary, tokens.borders.radius.lg, config.padding, config.minHeight, tokens.spacing.xs]);

    const valueStyle = useMemo(() => [
        styles.value,
        { fontSize: calculatedFontSize },
    ], [styles.value, calculatedFontSize]);

    return (
        <View style={containerStyle}>
            <AtomicText
                type="displaySmall"
                color="onSurface"
                style={valueStyle}
                numberOfLines={1}
            >
                {displayValue}
            </AtomicText>
            <AtomicText
                type="labelSmall"
                color="onSurface"
                style={styles.label}
            >
                {label}
            </AtomicText>
        </View>
    );
};

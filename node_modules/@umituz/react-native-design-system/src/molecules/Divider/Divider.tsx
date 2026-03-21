/**
 * Divider Domain - Divider Component
 *
 * Universal divider component for visual separation.
 * Supports horizontal, vertical, and text dividers.
 *
 * @domain divider
 * @layer presentation/components
 */

import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme/hooks/useAppDesignTokens';
import { AtomicText } from '../../atoms/AtomicText';
import type { DividerOrientation, DividerStyle, DividerSpacing } from './types';
import {
    DividerUtils,
    DIVIDER_CONSTANTS,
} from './types';

/**
 * Divider component props
 */
export interface DividerProps {
    /** Orientation (horizontal or vertical) */
    orientation?: DividerOrientation;
    /** Line style (solid, dashed, dotted) */
    lineStyle?: DividerStyle;
    /** Spacing (margin) */
    spacing?: DividerSpacing;
    /** Custom color */
    color?: string;
    /** Custom thickness */
    thickness?: number;
    /** Text label (for text divider) */
    text?: string;
    /** Custom container style */
    style?: StyleProp<ViewStyle>;
}

/**
 * Divider Component
 *
 * Visual separator for content sections.
 * Supports horizontal, vertical, and text variants.
 *
 * USAGE:
 * ```typescript
 * // Horizontal divider (default)
 * <Divider />
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * // Text divider (OR separator)
 * <Divider text="OR" />
 *
 * // Custom spacing
 * <Divider spacing="large" />
 *
 * // Dashed style
 * <Divider lineStyle="dashed" />
 *
 * // Custom color
 * <Divider color="#FF0000" />
 * ```
 */
export const Divider: React.FC<DividerProps> = ({
    orientation = DIVIDER_CONSTANTS.DEFAULT_ORIENTATION,
    lineStyle = DIVIDER_CONSTANTS.DEFAULT_STYLE,
    spacing = DIVIDER_CONSTANTS.DEFAULT_SPACING,
    color,
    thickness = DIVIDER_CONSTANTS.DEFAULT_THICKNESS,
    text,
    style,
}) => {
    const tokens = useAppDesignTokens();
    const spacingValue = DividerUtils.getSpacing(spacing, tokens.spacingMultiplier);
    const borderColor = color || tokens.colors.border;

    // Determine border style based on lineStyle
    const getBorderStyle = (): 'solid' | 'dashed' | 'dotted' => {
        return lineStyle;
    };

    // Horizontal divider
    if (orientation === 'horizontal' && !text) {
        return (
            <View
                style={[
                    styles.horizontal,
                    {
                        marginVertical: spacingValue,
                        borderBottomWidth: thickness,
                        borderBottomColor: borderColor,
                        borderStyle: getBorderStyle(),
                    },
                    style,
                ]}
            />
        );
    }

    // Vertical divider
    if (orientation === 'vertical') {
        return (
            <View
                style={[
                    styles.vertical,
                    {
                        marginHorizontal: spacingValue,
                        borderLeftWidth: thickness,
                        borderLeftColor: borderColor,
                        borderStyle: getBorderStyle(),
                    },
                    style,
                ]}
            />
        );
    }

    // Text divider (horizontal with text label)
    if (text) {
        return (
            <View
                style={[
                    styles.textContainer,
                    {
                        marginVertical: spacingValue,
                    },
                    style,
                ]}
            >
                <View
                    style={[
                        styles.textLine,
                        {
                            borderBottomWidth: thickness,
                            borderBottomColor: borderColor,
                            borderStyle: getBorderStyle(),
                        },
                    ]}
                />
                <AtomicText
                    type="bodySmall"
                    color="secondary"
                    style={[styles.textLabel, { marginHorizontal: Math.floor(12 * tokens.spacingMultiplier) }]}
                >
                    {text}
                </AtomicText>
                <View
                    style={[
                        styles.textLine,
                        {
                            borderBottomWidth: thickness,
                            borderBottomColor: borderColor,
                            borderStyle: getBorderStyle(),
                        },
                    ]}
                />
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    horizontal: {
        width: '100%',
    },
    vertical: {
        height: '100%',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    textLine: {
        flex: 1,
    },
    textLabel: {
        fontWeight: '500',
    },
});

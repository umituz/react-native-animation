/**
 * Divider Domain - Entity Definitions
 *
 * Core types and interfaces for dividers and separators.
 * Simple visual separators for content sections.
 *
 * @domain divider
 * @layer domain/entities
 */

import { calculateResponsiveSize } from '../../responsive';

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider style
 */
export type DividerStyle = 'solid' | 'dashed' | 'dotted';

/**
 * Divider spacing
 */
export type DividerSpacing = 'none' | 'small' | 'medium' | 'large';

/**
 * Divider configuration
 */
export interface DividerConfig {
    /** Orientation */
    orientation: DividerOrientation;
    /** Line style */
    style: DividerStyle;
    /** Spacing (margin) */
    spacing: DividerSpacing;
    /** Custom color */
    color?: string;
    /** Custom thickness */
    thickness?: number;
    /** Text label (for text divider) */
    text?: string;
}

/**
 * Base spacing configurations (px) - will be multiplied by spacingMultiplier
 */
const BASE_SPACING_CONFIGS: Record<DividerSpacing, number> = {
    none: 0,
    small: 8,
    medium: 16,
    large: 24,
};

/**
 * Get responsive spacing value
 * Multiplies base spacing by spacingMultiplier for tablet/small device support
 */
export const getSpacingConfigs = (spacingMultiplier: number): Record<DividerSpacing, number> => {
    return Object.entries(BASE_SPACING_CONFIGS).reduce((acc, [key, value]) => {
        acc[key as DividerSpacing] = calculateResponsiveSize(value, spacingMultiplier);
        return acc;
    }, {} as Record<DividerSpacing, number>);
};

/**
 * Divider utility class
 */
export class DividerUtils {
    /**
     * Get spacing value (responsive)
     */
    static getSpacing(spacing: DividerSpacing, spacingMultiplier: number = 1): number {
        return calculateResponsiveSize(BASE_SPACING_CONFIGS[spacing], spacingMultiplier);
    }

    /**
     * Validate divider config
     */
    static validateConfig(config: Partial<DividerConfig>): DividerConfig {
        return {
            orientation: config.orientation || 'horizontal',
            style: config.style || 'solid',
            spacing: config.spacing || 'medium',
            color: config.color,
            thickness: config.thickness || 1,
            text: config.text,
        };
    }
}

/**
 * Divider constants
 */
export const DIVIDER_CONSTANTS = {
    DEFAULT_ORIENTATION: 'horizontal' as DividerOrientation,
    DEFAULT_STYLE: 'solid' as DividerStyle,
    DEFAULT_SPACING: 'medium' as DividerSpacing,
    DEFAULT_THICKNESS: 1,
} as const;

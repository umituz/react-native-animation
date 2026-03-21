import { useMemo } from 'react';
import { useSafeAreaInsets } from '../../../safe-area';
import { useAppDesignTokens } from '../../../theme';
import { getResponsiveTabBarConfig } from '../../../responsive/responsiveLayout';

export interface TabBarConfig {
    backgroundColor?: string;
    borderTopColor?: string;
    borderTopWidth?: number;
    paddingTop?: number;
    paddingBottom?: number;
    minHeight?: number;
    activeTintColor?: string;
    inactiveTintColor?: string;
    labelFontSize?: number;
    labelFontWeight?: string;
    labelMarginTop?: number;
    labelMarginBottom?: number;
}

export function useTabBarStyles(config: TabBarConfig = {}) {
    const tokens = useAppDesignTokens();
    const insets = useSafeAreaInsets();

    // Get responsive tab bar config based on device type and safe area
    const responsiveConfig = useMemo(
        () => getResponsiveTabBarConfig(insets),
        [insets]
    );

    const tabBarStyle = useMemo(() => ({
        backgroundColor: config.backgroundColor || tokens.colors.surface,
        borderTopColor: config.borderTopColor || tokens.colors.borderLight,
        borderTopWidth: config.borderTopWidth ?? 1,
        paddingTop: config.paddingTop ?? responsiveConfig.paddingTop,
        paddingBottom: config.paddingBottom ?? responsiveConfig.paddingBottom,
        minHeight: config.minHeight ?? responsiveConfig.height,
    }), [config.backgroundColor, config.borderTopColor, config.borderTopWidth,
    config.paddingTop, config.paddingBottom, config.minHeight, tokens.colors.surface,
    tokens.colors.borderLight, responsiveConfig]);

    const screenOptions = useMemo(() => ({
        headerShown: false,
        tabBarLabelStyle: {
            fontSize: config.labelFontSize ?? 12,
            fontWeight: (config.labelFontWeight ?? '600') as '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold',
            marginTop: config.labelMarginTop ?? 12,
            marginBottom: config.labelMarginBottom ?? 4,
        },
        tabBarActiveTintColor: config.activeTintColor || tokens.colors.primary,
        tabBarInactiveTintColor: config.inactiveTintColor || tokens.colors.textSecondary,
        tabBarStyle,
    }), [config.labelFontSize, config.labelFontWeight, config.labelMarginTop,
    config.labelMarginBottom, config.activeTintColor, config.inactiveTintColor,
        tabBarStyle, tokens.colors.primary, tokens.colors.textSecondary]);

    return useMemo(() => ({
        tokens,
        screenOptions,
        tabBarStyle,
    }), [tokens, screenOptions, tabBarStyle]);
}

import React, { useMemo, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { ParamListBase } from "@react-navigation/native";
import type { BottomTabNavigationOptions, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { TabNavigatorConfig, TabScreen } from "./types";
import { NavigationValidator } from "./utils/NavigationValidator";
import { createTabScreen } from "./utils/ScreenFactory";
import { useAppDesignTokens } from "../../theme";
import { calculateResponsiveSize } from "../../responsive";
import { NAVIGATION } from "../../constants";

// Create the navigator instance ONCE outside the component
const Tab = createBottomTabNavigator();

export interface TabsNavigatorProps<T extends ParamListBase> {
    config: TabNavigatorConfig<T>;
}

/**
 * TabsNavigator Component
 *
 * Reusable Bottom Tab Navigator component that handles configuration and rendering.
 * Integrates with design tokens for consistent themed styling.
 */
export function TabsNavigator<T extends ParamListBase>({
    config,
}: TabsNavigatorProps<T>) {
    const tokens = useAppDesignTokens();

    // Validate configuration silently
    try {
        NavigationValidator.validateScreens(config.screens, "tab");
        NavigationValidator.validateInitialRoute(
            config.initialRouteName,
            config.screens
        );
    } catch (error) {
        if (__DEV__) {
            console.error("[DesignSystem] TabsNavigator validation failed:", error);
        }
    }

    // Memoize filtered screens
    const visibleScreens = useMemo(
        () => config.screens.filter((screen) => screen.visible !== false),
        [config.screens]
    );

    // Default screen options using design tokens
    const defaultScreenOptions = useMemo(
        () => ({
            tabBarActiveTintColor: tokens.colors.primary,
            tabBarInactiveTintColor: tokens.colors.onSurface,
            tabBarStyle: {
                backgroundColor: tokens.colors.surface,
                borderTopColor: tokens.colors.surfaceVariant,
                height: calculateResponsiveSize(NAVIGATION.tabBar.height, tokens.spacingMultiplier),
                paddingBottom: 8,
                paddingTop: 8,
            },
            headerStyle: {
                backgroundColor: tokens.colors.surface,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: tokens.colors.surfaceVariant,
            },
            headerTitleStyle: {
                color: tokens.colors.onSurface,
                fontSize: 18,
                fontWeight: "600" as const,
            },
            headerTintColor: tokens.colors.primary,
        }),
        [tokens]
    );

    // Merge screen options properly (handle both function and object)
    const mergedScreenOptions = useCallback(
        (props: BottomTabScreenProps<T>): BottomTabNavigationOptions => {
            const customOptions = typeof config.screenOptions === "function"
                ? config.screenOptions(props)
                : config.screenOptions || {};

            return {
                ...defaultScreenOptions,
                ...customOptions,
            };
        },
        [defaultScreenOptions, config]
    );

    if (visibleScreens.length === 0) {
        return null;
    }

    return (
        <Tab.Navigator
            id={config.id}
            initialRouteName={config.initialRouteName as string}
            screenOptions={mergedScreenOptions as (props: BottomTabScreenProps<ParamListBase>) => BottomTabNavigationOptions}
        >
            {visibleScreens.map((screen) =>
                createTabScreen(screen as unknown as TabScreen<ParamListBase>, config as unknown as TabNavigatorConfig<ParamListBase>, Tab)
            )}
        </Tab.Navigator>
    );
}

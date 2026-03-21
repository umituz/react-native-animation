import React, { useMemo } from "react";
import { createStackNavigator as createRNStackNavigator } from "@react-navigation/stack";
import type { ParamListBase } from "@react-navigation/native";
import type { StackNavigatorConfig, StackScreen } from "./types";
import { NavigationValidator } from "./utils/NavigationValidator";
import { createStackScreen } from "./utils/ScreenFactory";
import { useAppDesignTokens } from "../../theme";

// Create the navigator instance ONCE outside the component
const Stack = createRNStackNavigator();

export interface StackNavigatorProps<T extends ParamListBase> {
    config: StackNavigatorConfig<T>;
}

/**
 * StackNavigator Component
 * 
 * Reusable Stack Navigator component that handles configuration and rendering.
 * Integrates with design tokens for consistent themed styling.
 */
export function StackNavigator<T extends ParamListBase>({ config }: StackNavigatorProps<T>) {
    const tokens = useAppDesignTokens();

    // Validate configuration silently
    try {
        NavigationValidator.validateScreens(config.screens, "stack");
        NavigationValidator.validateInitialRoute(config.initialRouteName, config.screens);
    } catch (error) {
        if (__DEV__) {
            console.error("[DesignSystem] StackNavigator validation failed:", error);
        }
    }

    const { screens } = config;

    // Default screen options using design tokens
    const defaultScreenOptions = useMemo(() => ({
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
        cardStyle: {
            backgroundColor: tokens.colors.background,
        },
    }), [tokens]);

    if (screens.length === 0) {
        return null;
    }

    return (
        <Stack.Navigator
            id={config.id}
            initialRouteName={config.initialRouteName as string}
            screenOptions={{
                ...defaultScreenOptions,
                ...config.screenOptions,
            }}
        >
            {screens.map((screen) =>
                createStackScreen(screen as StackScreen<ParamListBase>, config, Stack)
            )}
        </Stack.Navigator>
    );
}

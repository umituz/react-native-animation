import React, { useMemo } from "react";
import { View } from "react-native";
import type { ParamListBase } from "@react-navigation/native";
import { AtomicIcon } from "../../../atoms";
import { useAppDesignTokens } from "../../../theme";
import { useResponsive } from "../../../responsive";
import type { TabNavigatorConfig, TabScreen } from "../types";

export interface UseTabConfigProps<T extends ParamListBase> {
  config: TabNavigatorConfig<T>;
}

/**
 * Get the appropriate icon name based on focus state
 * Ionicons convention: filled for active, outline for inactive
 */
const getIconNameForState = (baseName: string, focused: boolean): string => {
  if (!baseName) return "help-circle-outline";

  const hasOutlineSuffix = baseName.endsWith("-outline");
  const hasSharpSuffix = baseName.endsWith("-sharp");

  if (hasOutlineSuffix || hasSharpSuffix) {
    return baseName;
  }

  return focused ? baseName : `${baseName}-outline`;
};

export function useTabConfig<T extends ParamListBase>(props: UseTabConfigProps<T>): TabNavigatorConfig<T> {
  const { config } = props;
  const tokens = useAppDesignTokens();
  const { tabBarConfig } = useResponsive();

  const finalConfig: TabNavigatorConfig<T> = useMemo(() => {
    const screens = config.screens as TabScreen<T>[];

    return {
      ...config,
      renderIcon: (
        iconName: string,
        focused: boolean,
        routeName: string,
        isFab: boolean,
      ) => {
        if (config.renderIcon) {
          return config.renderIcon(iconName, focused, routeName, isFab);
        }

        const screen = screens.find((s) => s.name === routeName);
        const fab = config.fabConfig;

        if (isFab) {
          const fabSize = fab?.size ?? tabBarConfig.fabSize;
          return React.createElement(View, {
            style: {
              width: fabSize,
              height: fabSize,
              borderRadius: fabSize / 2,
              backgroundColor: tokens.colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginTop: fab?.offsetY ?? tabBarConfig.fabOffsetY,
            }
          }, React.createElement(AtomicIcon, {
            name: iconName,
            svgPath: screen?.svgPath,
            customSize: fabSize * 0.57,
            customColor: "#FFFFFF"
          }));
        }

        const resolvedIconName = getIconNameForState(iconName, focused);

        return React.createElement(AtomicIcon, {
          name: resolvedIconName,
          customColor: focused ? tokens.colors.primary : tokens.colors.textSecondary,
          customSize: tabBarConfig.iconSize,
        });
      },
      screenOptions: {
        tabBarActiveTintColor: tokens.colors.primary,
        tabBarInactiveTintColor: tokens.colors.textSecondary,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: tabBarConfig.paddingTop,
        },
        tabBarStyle: {
          backgroundColor: tokens.colors.surface,
          borderTopWidth: 0,
          paddingBottom: tabBarConfig.paddingBottom,
          paddingTop: tabBarConfig.paddingTop,
          height: tabBarConfig.height,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: tokens.colors.surface,
          borderBottomColor: tokens.colors.borderLight,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: tokens.colors.textPrimary,
        },
        headerTintColor: tokens.colors.textPrimary,
        ...(typeof config.screenOptions === "object"
          ? config.screenOptions
          : {}),
      },
    };
  }, [tokens, config, tabBarConfig]);

  return finalConfig;
}

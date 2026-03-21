import React from "react";
import { TouchableOpacity } from "react-native";
import type { ParamListBase } from "@react-navigation/native";
import type {
  BottomTabScreenProps,
  BottomTabNavigationOptions,
  BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import type {
  TabScreen,
  StackScreen,
  TabNavigatorConfig,
  StackNavigatorConfig,
} from "../types";
import { LabelProcessor } from "./LabelProcessor";
import { IconRenderer } from "./IconRenderer";

const TabBarButton: React.FC<BottomTabBarButtonProps> = (props) => {
  const { children, onPress, onLongPress, accessibilityState, style } = props;

  return React.createElement(
    TouchableOpacity,
    {
      onPress: onPress ?? undefined,
      onLongPress: onLongPress ?? undefined,
      activeOpacity: 0.7,
      accessibilityRole: "button",
      accessibilityState,
      style: [{ flex: 1, alignItems: "center", justifyContent: "center" }, style],
    },
    children
  );
};

export function createTabScreen<T extends ParamListBase = ParamListBase>(
  screen: TabScreen<T>,
  config: TabNavigatorConfig<T>,
  Tab: { Screen: React.ElementType }
): React.ReactElement {
  const screenOptions = (
    props: BottomTabScreenProps<T>
  ): BottomTabNavigationOptions => {
    const processedLabel = LabelProcessor.processLabel({
      label: screen.label,
      getLabel: config.getLabel,
    });

    const isFab = screen.isFab ?? false;

    const baseOptions: BottomTabNavigationOptions = {
      tabBarLabel: isFab ? "" : processedLabel,
      title: isFab ? "" : processedLabel,
      tabBarShowLabel: isFab ? false : undefined,
      tabBarButton: (buttonProps) => React.createElement(TabBarButton, buttonProps),
      tabBarIcon: ({ focused }: { focused: boolean }) => {
        const iconName = IconRenderer.getIconName(
          screen.name,
          focused,
          screen.icon ?? "",
          config.getTabIcon
        );

        return IconRenderer.renderIcon(
          { iconName, focused, routeName: screen.name, isFab },
          config.renderIcon
        );
      },
    };

    if (screen.options) {
      if (typeof screen.options === "function") {
        return {
          ...baseOptions,
          ...screen.options(props),
        };
      }
      return {
        ...baseOptions,
        ...screen.options,
      };
    }

    return baseOptions;
  };

  return React.createElement(Tab.Screen, {
    key: screen.name,
    name: screen.name,
    component: screen.component,
    children: screen.children,
    options: screenOptions,
  });
}

export function createStackScreen<T extends ParamListBase = ParamListBase>(
  screen: StackScreen<T>,
  config: StackNavigatorConfig<T>,
  Stack: { Screen: React.ElementType }
): React.ReactElement {
  const screenOptions = (props: { navigation: unknown; route: unknown }) => {
    if (screen.options) {
      if (typeof screen.options === "function") {
        const customOptions = screen.options(props);
        const processedTitle = LabelProcessor.processTitle(
          customOptions.title,
          config.getLabel
        );

        return {
          ...customOptions,
          ...(processedTitle && { title: processedTitle }),
        };
      }

      const processedTitle = LabelProcessor.processTitle(
        screen.options.title,
        config.getLabel
      );

      return {
        ...screen.options,
        ...(processedTitle && { title: processedTitle }),
      };
    }

    return {};
  };

  return React.createElement(Stack.Screen, {
    key: screen.name,
    name: screen.name,
    component: screen.component,
    children: screen.children,
    options: screenOptions,
  });
}

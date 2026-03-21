import React from "react";
import type { IconRendererProps } from "../types";
import { AtomicIcon, type IconName } from "../../../atoms";

type RenderIconFn = (
  iconName: IconName,
  focused: boolean,
  routeName: string,
  isFab: boolean
) => React.ReactElement;

export class IconRenderer {
  static renderIcon(
    props: IconRendererProps,
    renderIcon?: RenderIconFn
  ): React.ReactElement | null {
    const { iconName, focused, routeName, isFab } = props;

    if (renderIcon) {
      try {
        const result = renderIcon(iconName, focused, routeName, isFab);
        if (React.isValidElement(result)) {
          return result;
        }
      } catch {
        // Fallback to default
      }
    }

    if (!iconName) {
      return null;
    }

    return React.createElement(AtomicIcon, {
      name: iconName,
      size: isFab ? "lg" : "md",
      color: focused ? "primary" : "onSurface",
    });
  }

  static getIconName(
    routeName: string,
    focused: boolean,
    icon: IconName,
    getTabIcon?: (routeName: string, focused: boolean) => IconName
  ): IconName {
    return getTabIcon ? getTabIcon(routeName, focused) : icon;
  }
}

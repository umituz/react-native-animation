import type { ParamListBase } from "@react-navigation/native";
import type {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import type { StackNavigationOptions } from "@react-navigation/stack";
import type { IconName } from "../../atoms";

export type NavigationParams = Record<string, unknown>;

/**
 * FAB (Floating Action Button) configuration for center tab
 */
export interface FabConfig {
  /** FAB button size (default: 56) */
  size?: number;
  /** Vertical offset from tab bar (default: -20) */
  offsetY?: number;
  /** Border radius (default: size / 2) */
  borderRadius?: number;
  /** Border width when inactive (default: 3) */
  borderWidth?: number;
}

/**
 * Base interface for all screen configurations
 * @template T - Type of navigation parameters for the screen
 */
export interface BaseScreen<T extends ParamListBase = ParamListBase> {
  /** Unique name identifier for the screen */
  name: Extract<keyof T, string>;
  /** React component to render for this screen */
  component?: React.ComponentType<{ navigation: unknown; route: unknown }>;
  /** Render function for children (alternative to component) */
  children?: (props: { navigation: unknown; route: unknown }) => React.ReactNode;
}

/**
 * Configuration for a tab navigation screen
 * @template T - Type of navigation parameters for the screen
 */
export interface TabScreen<T extends ParamListBase = ParamListBase>
  extends BaseScreen<T> {
  /** Display label for the tab */
  label: string;
  /** Icon identifier for the tab */
  icon?: IconName;
  /** Mark this tab as a FAB (center floating button) */
  isFab?: boolean;
  /** Additional navigation options for the tab */
  options?:
  | BottomTabNavigationOptions
  | ((props: BottomTabScreenProps<T>) => BottomTabNavigationOptions);
  /** Custom SVG path for the icon */
  svgPath?: string;
  /** Whether the tab should be visible */
  visible?: boolean;
}

/**
 * Configuration for a stack navigation screen
 * @template T - Type of navigation parameters for the screen
 */
export interface StackScreen<T extends ParamListBase = ParamListBase>
  extends BaseScreen<T> {
  /** Additional navigation options for the stack screen */
  options?:
  | StackNavigationOptions
  | ((props: { navigation: unknown; route: unknown }) => StackNavigationOptions);
}

export interface BaseNavigatorConfig<T extends ParamListBase = ParamListBase> {
  /** Unique identifier for the navigator (required for React Navigation v7+) */
  id?: string;
  screens: TabScreen[] | StackScreen[];
  initialRouteName?: Extract<keyof T, string>;
  getLabel?: (label: string) => string;
}

export interface TabNavigatorConfig<T extends ParamListBase = ParamListBase>
  extends BaseNavigatorConfig<T> {
  screens: TabScreen[];
  /** Custom icon renderer function */
  renderIcon?: (
    iconName: IconName,
    focused: boolean,
    routeName: string,
    isFab: boolean
  ) => React.ReactElement;
  /** Get icon name for a tab */
  getTabIcon?: (routeName: string, focused: boolean) => IconName;
  /** Screen options for all tabs */
  screenOptions?:
  | BottomTabNavigationOptions
  | ((props: BottomTabScreenProps<T>) => BottomTabNavigationOptions);
  /** FAB configuration for center button styling */
  fabConfig?: FabConfig;
}

export interface StackNavigatorConfig<T extends ParamListBase = ParamListBase>
  extends BaseNavigatorConfig<T> {
  screens: StackScreen[];
  screenOptions?: StackNavigationOptions;
}

export interface IconRendererProps {
  iconName: IconName;
  focused: boolean;
  routeName: string;
  isFab: boolean;
}

export interface LabelProcessorProps {
  label: string;
  getLabel?: (label: string) => string;
}

/** Default FAB configuration values */
export const DEFAULT_FAB_CONFIG: Required<FabConfig> = {
  size: 56,
  offsetY: -20,
  borderRadius: 28,
  borderWidth: 3,
};

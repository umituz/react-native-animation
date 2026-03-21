import type { ColorPalette, ThemeMode } from "./ColorPalette";


/**
 * Font weight type compatible with React Navigation v7
 */
type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

/**
 * Font configuration for navigation theme
 */
interface FontConfig {
  fontFamily: string;
  fontWeight: FontWeight;
}

/**
 * Navigation theme type compatible with React Navigation v7
 */
export interface NavigationTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  fonts: {
    regular: FontConfig;
    medium: FontConfig;
    bold: FontConfig;
    heavy: FontConfig;
  };
}

/**
 * Creates a React Navigation theme from design system colors
 * Compatible with React Navigation v7+
 */
export const createNavigationTheme = (
  colors: ColorPalette,
  themeMode: ThemeMode
): NavigationTheme => ({
  dark: themeMode === "dark",
  colors: {
    primary: colors.primary,
    background: colors.backgroundPrimary,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.borderLight,
    notification: colors.error,
  },
  fonts: {
    regular: { fontFamily: "System", fontWeight: "400" },
    medium: { fontFamily: "System", fontWeight: "500" },
    bold: { fontFamily: "System", fontWeight: "700" },
    heavy: { fontFamily: "System", fontWeight: "800" },
  },
});

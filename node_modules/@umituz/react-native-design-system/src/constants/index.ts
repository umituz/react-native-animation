/**
 * Centralized Design System Constants
 *
 * All base size configurations for components.
 * Prevents file proliferation and makes maintenance easier.
 */

// ============= AVATAR & ICONS =============
export const AVATAR_SIZES = {
  xs: { size: 24, fontSize: 10, iconSize: 12, statusSize: 6, borderWidth: 1 },
  sm: { size: 32, fontSize: 12, iconSize: 16, statusSize: 8, borderWidth: 1.5 },
  md: { size: 40, fontSize: 14, iconSize: 20, statusSize: 10, borderWidth: 2 },
  lg: { size: 56, fontSize: 18, iconSize: 28, statusSize: 12, borderWidth: 2 },
  xl: { size: 80, fontSize: 24, iconSize: 40, statusSize: 16, borderWidth: 2.5 },
  xxl: { size: 120, fontSize: 36, iconSize: 60, statusSize: 20, borderWidth: 3 },
} as const;

export const ICON_SIZES = {
  tiny: 16,
  xs: 24,
  sm: 28,
  md: 32,
  lg: 40,
  xl: 56,
  xxl: 80,
} as const;

// ============= BUTTONS =============
export const BUTTON_SIZES = {
  sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: 10, iconSize: 16, minHeight: 32 },
  md: { paddingVertical: 14, paddingHorizontal: 20, fontSize: 16, iconSize: 20, minHeight: 44 },
  lg: { paddingVertical: 16, paddingHorizontal: 24, fontSize: 18, iconSize: 24, minHeight: 52 },
} as const;

export const FAB_SIZE = 56;

// ============= INPUTS =============
export const INPUT_SIZES = {
  sm: { paddingVertical: 8, paddingHorizontal: 12, fontSize: 12, iconSize: 16, minHeight: 40 },
  md: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 16, iconSize: 20, minHeight: 48 },
  lg: { paddingVertical: 16, paddingHorizontal: 20, fontSize: 18, iconSize: 24, minHeight: 56 },
} as const;

// ============= CARDS & CONTAINERS =============
export const CARD_SIZES = {
  padding: 16,
  borderRadius: 12,
  elevation: 2,
} as const;

export const MODAL_SIZES = {
  maxWidth: 360,
  padding: 28,
  overlayPadding: 24,
} as const;

export const BOTTOM_SHEET_HANDLE = {
  width: 40,
  height: 4,
  borderRadius: 2,
} as const;

// ============= LISTS & GRIDS =============
export const LIST_ITEM = {
  minHeight: 56,
  paddingVertical: 12,
  paddingHorizontal: 16,
} as const;

export const INFO_GRID_ICONS = {
  small: 28,
  large: 32,
} as const;

// ============= NAVIGATION =============
export const NAVIGATION = {
  backButton: { width: 40, height: 40 },
  tabBar: { height: 60 },
  headerHeight: 60,
} as const;

// ============= TYPOGRAPHY =============
export const FONT_SIZES = {
  labelSmall: 10,
  bodySmall: 12,
  bodyMedium: 16,
  bodyLarge: 18,
  titleSmall: 20,
  titleMedium: 24,
  titleLarge: 28,
  headlineSmall: 32,
  headlineMedium: 36,
  displaySmall: 40,
  displayLarge: 48,
} as const;

export const COUNTDOWN_SIZES = {
  small: { fontSize: 24, minHeight: 70 },
  medium: { fontSize: 32, minHeight: 90 },
  large: { fontSize: 40, minHeight: 110 },
} as const;

// ============= HERO & EMPTY STATES =============
export const HERO_ICON = {
  width: 120,
  height: 120,
  borderRadius: 60,
} as const;

export const EMPTY_STATE_ICON = {
  width: 120,
  height: 120,
  borderRadius: 60,
} as const;

export const ALERT_MODAL_ICON = {
  width: 76,
  height: 76,
  borderRadius: 38,
  marginBottom: 20,
} as const;

// ============= SPACING =============
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

// ============= STEP INDICATORS =============
export const STEP_INDICATOR = {
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  progressBar: { height: 4, borderRadius: 2 },
  stepHeader: { marginBottom: 32, paddingHorizontal: 24 },
  title: 28,
  subtitle: 16,
} as const;

// ============= DIVIDERS =============
export const DIVIDER_SIZES = {
  none: 0,
  small: 8,
  medium: 16,
  large: 24,
} as const;

// ============= MISC =============
export const MISC_SIZES = {
  searchIcon: 32,
  searchInputHeight: 48,
  searchBorderRadius: 24,
  searchPadding: 2,
  swipeButtonMinWidth: 80,
  splashMinHeight: 40,
  countdownIcon: 36,
} as const;

// ============= AVATAR COLORS =============
export const AVATAR_COLORS = [
  '#7E57C2', // Purple
  '#42A5F5', // Blue
  '#66BB6A', // Green
  '#FFA726', // Orange
  '#EF5350', // Red
  '#26C6DA', // Cyan
  '#AB47BC', // Deep Purple
  '#FF7043', // Deep Orange
] as const;

export const STATUS_COLORS = {
  online: '#4CAF50',
  offline: '#9E9E9E',
  away: '#FFC107',
  busy: '#F44336',
} as const;

export const SHAPE_CONFIGS = {
  rounded: 8,
  squared: 0,
  square: 0,
} as const;

// ============= FAB =============
export const FAB_SIZES = {
  sm: 40,
  md: 56,
  lg: 72,
} as const;

// ============= CALENDAR =============
export const CALENDAR = {
  dayPadding: 16,
  dayNamePadding: 4,
  selectedBorderWidth: 4,
  borderRadius: 12,
  borderRadiusSm: 8,
  borderRadiusXs: 2,
  dayNameFontSize: 8,
} as const;

// ============= CONFIRMATION MODAL =============
export const CONFIRMATION_MODAL = {
  padding: 24,
  borderRadius: 16,
  width: '85%',
} as const;

// ============= ICON GRID =============
export const ICON_GRID = {
  borderRadius: 24,
  fontSize: 11,
} as const;

// ============= COUNTDOWN =============
export const COUNTDOWN_TOGGLE = {
  size: 36,
  borderRadius: 18,
} as const;

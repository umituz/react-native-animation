/**
 * Responsive Design Configuration
 *
 * Centralized configuration for responsive design system.
 * All magic numbers and breakpoints are defined here for maintainability.
 */

/**
 * Device breakpoints based on standard device sizes
 * These values determine when responsive behaviors change
 */
export const DEVICE_BREAKPOINTS = {
  SMALL_PHONE: 375,    // iPhone SE, iPhone 13 mini
  MEDIUM_PHONE: 414,   // iPhone 13/14/15 (390-393px actual)
  LARGE_PHONE: 500,    // iPhone 14/15 Pro Max (430px) - buffer for future devices
  SMALL_TABLET: 768,   // iPad mini
  TABLET: 1024,        // iPad Air and larger tablets
} as const;

/**
 * Responsive sizing percentages
 * These percentages control how elements scale relative to screen dimensions
 */
export const RESPONSIVE_PERCENTAGES = {
  // Logo sizing percentages
  LOGO_SMALL_PHONE_MAX: 0.28,  // 28% of screen width for small phones
  LOGO_TABLET_MAX: 0.15,      // 15% of screen width for tablets
  
  // Icon container sizing percentages
  ICON_CONTAINER_SMALL_PHONE: 0.30,  // 30% of screen width for small phones
  ICON_CONTAINER_TABLET: 0.20,       // 20% of screen width for tablets
  
  // Content width percentages
  CONTENT_SMALL_PHONE: 0.90,   // 90% of screen width for small phones
  CONTENT_PHONE: 0.85,          // 85% of screen width for standard phones
  CONTENT_TABLET: 0.60,         // 60% of screen width for tablets
  
  // Input height percentages
  INPUT_SMALL_DEVICE: 0.15,    // 15% of screen height for small devices
  INPUT_MEDIUM_DEVICE: 0.18,    // 18% of screen height for medium devices
  
  // Font scaling factors
  FONT_SMALL_PHONE: 0.90,      // 90% of base font size for small phones
  FONT_TABLET: 1.10,            // 110% of base font size for tablets
} as const;

/**
 * Size constraints and limits
 * These values define minimum and maximum sizes for responsive elements
 */
export const SIZE_CONSTRAINTS = {
  // Logo size constraints
  LOGO_MIN_SMALL: 100,          // Minimum logo size for small phones
  LOGO_MAX_SMALL: 120,          // Maximum logo size for small phones
  LOGO_MIN_TABLET: 140,         // Minimum logo size for tablets
  LOGO_MAX_TABLET: 200,         // Maximum logo size for tablets

  // Input height constraints
  INPUT_MAX_SMALL: 120,         // Maximum input height for small devices
  INPUT_MAX_MEDIUM: 150,        // Maximum input height for medium devices
  INPUT_MAX_LARGE: 200,          // Maximum input height for large devices

  // Icon container constraints
  ICON_MAX_SMALL: 120,           // Maximum icon container for small phones
  ICON_MAX_TABLET: 180,          // Maximum icon container for tablets

  // Content width constraints
  CONTENT_MAX_TABLET: 672,       // Maximum content width for tablets (Apple HIG readable width)

  // Modal height constraints
  MODAL_MIN_SMALL: 250,         // Minimum modal height for small devices
  MODAL_MIN_STANDARD: 300,       // Minimum modal height for standard devices
  MODAL_MIN_TABLET: 350,        // Minimum modal height for tablets
  MODAL_MAX_TABLET: 500,        // Maximum modal height for tablets

  // Font size constraints
  FONT_MIN_SIZE: 11,             // Minimum font size
} as const;

/**
 * Modal layout configuration
 * Responsive values for modal/overlay components
 */
export const MODAL_CONFIG = {
  // Width percentages by device type
  WIDTH_PERCENT_PHONE: 0.92,       // 92% of screen width for phones
  WIDTH_PERCENT_TABLET: 0.75,      // 75% of screen width for tablets

  // Height percentages by device type
  HEIGHT_PERCENT_SMALL: 0.75,      // 75% of screen height for small devices
  HEIGHT_PERCENT_STANDARD: 0.78,   // 78% of screen height for standard devices
  HEIGHT_PERCENT_TABLET: 0.70,     // 70% of screen height for tablets

  // Min modal height percentages (for calculated min heights)
  MIN_HEIGHT_PERCENT_SMALL: 0.40,     // 40% of screen height for small devices
  MIN_HEIGHT_PERCENT_STANDARD: 0.45,  // 45% of screen height for standard devices
  MIN_HEIGHT_PERCENT_TABLET: 0.35,    // 35% of screen height for tablets

  // Max width constraints
  MAX_WIDTH_PHONE: 480,            // Maximum modal width for phones
  MAX_WIDTH_TABLET: 600,           // Maximum modal width for tablets

  // Border radius by device type
  BORDER_RADIUS_PHONE: 32,         // Border radius for phones
  BORDER_RADIUS_TABLET: 24,        // Border radius for tablets

  // Backdrop opacity
  BACKDROP_OPACITY_DEFAULT: 0.85,  // Default backdrop opacity

  // Bottom sheet specific
  BOTTOM_SHEET_MIN_HEIGHT: 400,    // Minimum height for bottom sheets
  BOTTOM_SHEET_MAX_HEIGHT_PERCENT: 0.9, // Max height percentage for bottom sheets

  // Dialog specific
  DIALOG_WIDTH_PERCENT: 0.94,      // Dialog width percentage
  DIALOG_MAX_WIDTH: 500,           // Maximum dialog width
  DIALOG_MAX_HEIGHT_PERCENT: 0.85, // Dialog max height percentage
} as const;

/**
 * Layout spacing and positioning
 * These values control spacing, padding, and positioning
 */
export const LAYOUT_CONSTANTS = {
  // Spacing multipliers
  SPACING_MULTIPLIER_SMALL: 0.90,   // 90% spacing for small devices
  SPACING_MULTIPLIER_TABLET: 1.20,   // 120% spacing for tablets
  SPACING_MULTIPLIER_STANDARD: 1.0,   // 100% spacing for standard devices

  // Padding and margins
  HORIZONTAL_PADDING_BASE: 16,         // Base horizontal padding
  VERTICAL_PADDING_SMALL: 12,          // Vertical padding for small devices
  VERTICAL_PADDING_STANDARD: 16,       // Vertical padding for standard devices
  VERTICAL_PADDING_TABLET: 24,         // Vertical padding for tablets
  BOTTOM_POSITION_BASE: 32,           // Base bottom position
  
  // Safe area offsets
  SAFE_AREA_OFFSET: 16,               // Safe area offset for positioning
  TAB_BAR_OFFSET: 90,                 // Tab bar height + spacing for FAB positioning
  
  // FAB positioning
  FAB_BOTTOM_TABLET: 100,             // FAB bottom position for tablets
  FAB_RIGHT_TABLET: 24,               // FAB right position for tablets
  FAB_RIGHT_PHONE: 20,                // FAB right position for phones
  
  // Modal heights
  MODAL_HEIGHT_SMALL: '75%',          // Modal max height for small devices
  MODAL_HEIGHT_STANDARD: '70%',        // Modal max height for standard devices
  MODAL_HEIGHT_TABLET: '60%',         // Modal max height for tablets
} as const;

/**
 * Device height thresholds
 * These values determine responsive behavior based on screen height
 */
export const HEIGHT_THRESHOLDS = {
  SMALL_DEVICE: 667,    // iPhone SE, iPhone 8 height
  MEDIUM_DEVICE: 844,    // iPhone 13 mini, iPhone 13 height
  LARGE_DEVICE: 1024,    // Tablet height threshold
} as const;

/**
 * Grid layout configuration
 * Controls responsive grid behavior
 */
export const GRID_CONFIG = {
  DEFAULT_MOBILE_COLUMNS: 2,    // Default columns for mobile
  DEFAULT_TABLET_COLUMNS: 4,    // Default columns for tablet
} as const;

/**
 * Input validation constraints
 * Defines valid ranges for input parameters
 */
export const VALIDATION_CONSTRAINTS = {
  MIN_BASE_SIZE: 0,               // Minimum valid base size
  MAX_BASE_SIZE: 1000,            // Maximum valid base size (realistic UI limit)
  MIN_BASE_FONT_SIZE: 1,          // Minimum valid font size
  MAX_BASE_FONT_SIZE: 1000,       // Maximum valid font size
  MIN_SCREEN_DIMENSION: 100,      // Minimum valid screen dimension
  MAX_SCREEN_DIMENSION: 5000,     // Maximum valid screen dimension (realistic)
} as const;
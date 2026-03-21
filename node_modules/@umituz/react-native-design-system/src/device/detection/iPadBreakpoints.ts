/**
 * iPad Breakpoints and Constants
 * Apple HIG compliant values for iPad responsive design
 */

/**
 * iPad specific breakpoints following Apple HIG
 */
export const IPAD_BREAKPOINTS = {
    IPAD_MINI: 744,
    IPAD_10_2: 810,
    IPAD_AIR: 820,
    IPAD_11_PRO: 834,
    IPAD_12_9_PRO: 1024,
    IPAD_LANDSCAPE_MINI: 1133,
    IPAD_LANDSCAPE_AIR: 1180,
    IPAD_LANDSCAPE_PRO: 1366,
} as const;

/**
 * Apple HIG Touch Target Guidelines
 */
export const TOUCH_TARGETS = {
    MINIMUM: 44,
    RECOMMENDED: 48,
    IPAD_RECOMMENDED: 50,
} as const;

/**
 * Content width constraints for iPad
 */
export const CONTENT_WIDTH_CONSTRAINTS = {
    READABLE_MAX: 672,
    FORM_MAX: 580,
    CARD_MAX: 400,
    MODAL_MAX: 600,
    PAYWALL_MAX: 540,
} as const;

/**
 * iPad Layout Configuration
 */
export const IPAD_LAYOUT_CONFIG = {
    SCREEN_PADDING: 24,
    SECTION_SPACING: 32,
    CARD_SPACING: 20,
    GRID_COLUMNS_PORTRAIT: 2,
    GRID_COLUMNS_LANDSCAPE: 3,
    GRID_GAP: 20,
    MODAL_CORNER_RADIUS: 16,
    SHEET_CORNER_RADIUS: 20,
    MODAL_HORIZONTAL_MARGIN: 48,
    FONT_SCALE: 1.1,
    HEADING_SCALE: 1.15,
} as const;

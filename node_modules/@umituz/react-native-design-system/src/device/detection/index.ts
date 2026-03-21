/**
 * Device Detection Module - Public API
 *
 * Centralized device detection utilities including:
 * - Device type detection (phone, tablet, iPad variants)
 * - Screen dimension utilities
 * - Layout utilities for different device types
 */

// Breakpoints and constants
export {
    IPAD_BREAKPOINTS,
    TOUCH_TARGETS,
    CONTENT_WIDTH_CONSTRAINTS,
    IPAD_LAYOUT_CONFIG,
} from './iPadBreakpoints';

// Device type detection
export {
    DeviceType,
    getScreenDimensions,
    isPhone,
    isSmallPhone,
    isLargePhone,
    isTablet,
    isLandscape,
    getDeviceType,
    getSpacingMultiplier,
} from './deviceDetection';

// iPad-specific detection
export {
    isIPad,
    isIPadMini,
    isIPadPro,
    isIPadLandscape,
} from './iPadDetection';

// iPad layout utilities
export {
    getContentMaxWidth,
    getIPadGridColumns,
    getTouchTargetSize,
    getIPadScreenPadding,
    getIPadFontScale,
    getIPadLayoutInfo,
    type IPadLayoutInfo,
} from './iPadLayoutUtils';

// iPad modal utilities
export {
    getIPadModalDimensions,
    getPaywallDimensions,
    type ModalDimensions,
    type PaywallDimensions,
} from './iPadModalUtils';

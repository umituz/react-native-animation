/**
 * Device Module - Public API
 *
 * Complete device utilities including:
 * - Device detection (phone, tablet, iPad variants)
 * - Device info and capabilities
 * - Anonymous user management
 */

// ============================================================================
// DETECTION - Device type and screen detection
// ============================================================================

export {
    // Breakpoints
    IPAD_BREAKPOINTS,
    TOUCH_TARGETS,
    CONTENT_WIDTH_CONSTRAINTS,
    IPAD_LAYOUT_CONFIG,
    // Device type detection
    DeviceType,
    getScreenDimensions,
    isPhone,
    isSmallPhone,
    isLargePhone,
    isTablet,
    isLandscape,
    getDeviceType,
    getSpacingMultiplier,
    // iPad-specific detection
    isIPad,
    isIPadMini,
    isIPadPro,
    isIPadLandscape,
    // iPad layout utilities
    getContentMaxWidth,
    getIPadGridColumns,
    getTouchTargetSize,
    getIPadScreenPadding,
    getIPadFontScale,
    getIPadLayoutInfo,
    type IPadLayoutInfo,
    // iPad modal utilities
    getIPadModalDimensions,
    getPaywallDimensions,
    type ModalDimensions,
    type PaywallDimensions,
} from './detection';

// ============================================================================
// DOMAIN - Device entities and utilities
// ============================================================================

export type {
    DeviceInfo,
    ApplicationInfo,
    SystemInfo,
    DeviceType as DeviceInfoType,
} from './domain/entities/Device';

export {
    DEVICE_CONSTANTS,
} from './domain/entities/Device';

export { DeviceUtils } from './domain/entities/DeviceUtils';

export type {
    DeviceFeatureConfig,
    DeviceFeatureUsage,
    DeviceFeatureAccess,
    FeatureLimit,
    ResetPeriod,
} from './domain/entities/DeviceFeatureConfig';

export { DEFAULT_FEATURE_CONFIG } from './domain/entities/DeviceFeatureConfig';

export { DeviceTypeUtils } from './domain/entities/DeviceTypeUtils';
export { DeviceMemoryUtils } from './domain/entities/DeviceMemoryUtils';

// ============================================================================
// INFRASTRUCTURE - Device services
// ============================================================================

export { DeviceService } from './infrastructure/services/DeviceService';
export { UserFriendlyIdService } from './infrastructure/services/UserFriendlyIdService';
import { PersistentDeviceIdService } from './infrastructure/services/PersistentDeviceIdService';
export { PersistentDeviceIdService };
export { DeviceFeatureService } from './infrastructure/services/DeviceFeatureService';
export { collectDeviceExtras } from './infrastructure/services/DeviceExtrasCollector';
export type { DeviceExtras } from './infrastructure/services/DeviceExtrasCollector';
export { SecureDeviceIdRepository } from './infrastructure/repositories/SecureDeviceIdRepository';

// ============================================================================
// PRESENTATION - Device hooks
// ============================================================================

export {
    useDeviceInfo,
    useDeviceCapabilities,
    useDeviceId,
} from './presentation/hooks/useDeviceInfo';

export {
    useAnonymousUser,
} from './presentation/hooks/useAnonymousUser';

export type {
    AnonymousUser,
    UseAnonymousUserOptions,
    UseAnonymousUserResult,
} from './domain/types/AnonymousUserTypes';

export { useDeviceFeatures } from './presentation/hooks/useDeviceFeatures';

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Get anonymous user ID for services
 */
export async function getAnonymousUserId(): Promise<string> {
    return PersistentDeviceIdService.getDeviceId();
}

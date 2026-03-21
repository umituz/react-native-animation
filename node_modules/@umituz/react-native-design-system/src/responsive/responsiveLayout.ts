/**
 * Responsive Layout Utilities - Barrel Export
 */

// Screen layout
export { getScreenLayoutConfig } from './screen/screenLayoutConfig';
export type { ScreenLayoutConfig } from './screen/screenLayoutConfig';

// Padding utilities
export { getResponsiveVerticalPadding, getResponsiveHorizontalPadding } from './padding/paddingUtils';

// Positioning utilities
export { getResponsiveBottomPosition, getResponsiveFABPosition } from './positioning/positioningUtils';

// Tab bar configuration
export { getResponsiveTabBarHeight, getResponsiveTabBarConfig } from './tabbar/tabBarConfig';
export type { ResponsiveTabBarConfig } from './tabbar/tabBarConfig';

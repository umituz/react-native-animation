import React from 'react';
import { AtomicFabProps } from './fab/types';
import { FAB_SIZES, getFabVariants, getFabIconSize, getFabBorder } from './fab/styles/fabStyles';
export type { FabSize, FabVariant, FabVariantConfig, FabSizeConfig, AtomicFabProps } from './fab/types';
export { FAB_SIZES, getFabVariants, getFabIconSize, getFabBorder };
/**
 * AtomicFab - Floating Action Button Component
 *
 * A Material Design 3 compliant FAB component for primary actions.
 * Follows CLAUDE.md standards for responsive positioning.
 *
 * @example
 * ```tsx
 * // IMPORTANT: FAB must be used at screen level, NOT inside ScrollView
 * <ScreenLayout>
 *   <ScrollView>
 *     {/* Your content *\/}
 *   </ScrollView>
 *   <AtomicFab
 *     icon="add"
 *     onPress={handleAddItem}
 *     variant="primary"
 *     size="md"
 *   />
 * </ScreenLayout>
 * ```
 *
 * Features:
 * - Material Design 3 sizes (sm: 40px, md: 56px, lg: 72px)
 * - Three variants: primary, secondary, surface
 * - Responsive positioning (above tab bar, safe area aware)
 * - Disabled state with opacity
 * - Theme-aware colors from design tokens
 * - Border for depth (no shadows per CLAUDE.md)
 */
export declare const AtomicFab: React.FC<AtomicFabProps>;

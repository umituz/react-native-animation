/**
 * Common Styles - Reusable Style Patterns
 *
 * Centralized style utilities to reduce duplication across screens.
 * These styles are composable and follow DRY principles.
 *
 * Usage:
 * ```typescript
 * import { useCommonStyles } from '@umituz/react-native-design-system-theme';
 *
 * const MyComponent = () => {
 *   const commonStyles = useCommonStyles();
 *   return <View style={commonStyles.screenContainer}>...</View>;
 * };
 * ```
 */

import { useMemo } from 'react';
import { useAppDesignTokens } from './useAppDesignTokens';
import { createScreenContainerStyles } from './commonStyles/screenContainerStyles';
import { createScrollContainerStyles } from './commonStyles/scrollContainerStyles';
import { createLayoutStyles } from './commonStyles/layoutStyles';
import { createPaddingStyles } from './commonStyles/paddingStyles';
import { createSectionStyles } from './commonStyles/sectionStyles';
import { createTextStyles } from './commonStyles/textStyles';
import { createFormStyles } from './commonStyles/formStyles';

/**
 * Hook to get common styles with dynamic theme support
 * Memoized to prevent unnecessary re-renders
 */
export const useCommonStyles = () => {
  const tokens = useAppDesignTokens();

  return useMemo(() => ({
    ...createScreenContainerStyles(tokens),
    ...createScrollContainerStyles(tokens),
    ...createLayoutStyles(tokens),
    ...createPaddingStyles(tokens),
    ...createSectionStyles(tokens),
    ...createTextStyles(tokens),
    ...createFormStyles(tokens),
  }), [tokens]);
};

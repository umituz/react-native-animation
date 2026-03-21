/**
 * Grid - Responsive Grid Layout (Molecule)
 *
 * Automatic responsive grid that adjusts columns based on device
 * Uses design system responsive utilities
 */

import React, { useMemo, useId } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useResponsive } from '../../responsive';
import { useAppDesignTokens } from '../../theme';

export interface GridProps {
  /** Grid items to render */
  children: React.ReactNode;

  /** Number of columns on mobile (default: 2) */
  mobileColumns?: number;

  /** Number of columns on tablet (default: 4) */
  tabletColumns?: number;

  /** Gap between grid items (uses design tokens spacing) */
  gap?: number;

  /** Container style */
  style?: StyleProp<ViewStyle>;

  /** Test ID for testing */
  testID?: string;

  /** Accessibility label for the grid */
  accessibilityLabel?: string;

  /** Whether the grid is accessible */
  accessible?: boolean;
}

/**
 * Responsive grid component
 *
 * @example
 * ```tsx
 * <Grid mobileColumns={2} tabletColumns={4} gap={16}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = ({
  children,
  mobileColumns = 2,
  tabletColumns = 4,
  gap,
  style,
  testID,
  accessibilityLabel,
  accessible,
}) => {
  const { gridColumns, spacingMultiplier } = useResponsive();
  const tokens = useAppDesignTokens();
  const generatedIdPrefix = useId();

  // Calculate responsive columns
  const columns = gridColumns || (mobileColumns && tabletColumns
    ? undefined
    : mobileColumns);

  // Use responsive gap or default
  const responsiveGap = gap ? gap * spacingMultiplier : tokens.spacing.md;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: responsiveGap,
        },
      }),
    [responsiveGap]
  );

  const itemStyle = useMemo(() => ({
    flex: columns ? 1 / columns - 0.01 : undefined,
    minWidth: columns ? `${100 / columns - 1}%` as const : undefined,
  }), [columns]);

  // Convert children to array for mapping
  const childArray = React.Children.toArray(children);

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={"grid" as any}
      accessible={accessible !== false}
    >
      {childArray.map((child, index) => {
        const childKey = (child as React.ReactElement).key;

        // Warn in development if child is missing key
        if (__DEV__ && !childKey) {
          console.warn(
            `[Grid] Child at index ${index} is missing a "key" prop. ` +
            `This may cause issues with React reconciliation. ` +
            `Please ensure all grid children have unique keys.`
          );
        }

        const key = childKey || `${generatedIdPrefix}-grid-item-${index}`;

        return (
          <View
            key={key}
            style={itemStyle}
            accessibilityRole={"gridcell" as any}
          >
            {child}
          </View>
        );
      })}
    </View>
  );
};

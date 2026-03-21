/**
 * AtomicSkeleton - Skeleton Loader Component
 *
 * Skeleton placeholder loader for loading states.
 * 
 * @example
 * ```tsx
 * // List skeleton
 * <AtomicSkeleton pattern="list" count={5} />
 * 
 * // Card skeleton
 * <AtomicSkeleton pattern="card" count={3} />
 * 
 * // Custom skeleton
 * <AtomicSkeleton 
 *   pattern="custom"
 *   custom={[
 *     { width: '100%', height: 200, borderRadius: 12 },
 *     { width: '80%', height: 20, borderRadius: 4 }
 *   ]}
 * />
 * ```
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle, type DimensionValue } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import type { SkeletonPattern, SkeletonConfig } from './AtomicSkeleton.types';
import { SKELETON_PATTERNS } from './AtomicSkeleton.types';
import { createMappedArray } from '../../utils/arrayUtils';

export interface AtomicSkeletonProps {
  /** Skeleton pattern preset */
  pattern?: SkeletonPattern;
  /** Custom skeleton configurations */
  custom?: SkeletonConfig[];
  /** Number of skeleton items to render */
  count?: number;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Skeleton loader component
 *
 * Provides visual feedback during content loading with customizable patterns
 */
const SkeletonItem: React.FC<{
  config: SkeletonConfig;
  baseColor: string;
  multiplier: number;
}> = React.memo(({ config, baseColor, multiplier }) => {
  const itemStyle = useMemo<ViewStyle>(() => ({
    ...styles.skeleton,
    width: (typeof config.width === 'number' ? config.width * multiplier : config.width) as DimensionValue,
    height: config.height ? config.height * multiplier : undefined,
    borderRadius: config.borderRadius ? config.borderRadius * multiplier : undefined,
    marginBottom: config.marginBottom ? config.marginBottom * multiplier : undefined,
    backgroundColor: baseColor,
  }), [config, baseColor, multiplier]);

  return <View style={itemStyle} />;
});

export const AtomicSkeleton: React.FC<AtomicSkeletonProps> = ({
  pattern = 'list',
  custom,
  count = 1,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const skeletonConfigs = pattern === 'custom' && custom
    ? custom
    : SKELETON_PATTERNS[pattern];

  const renderSkeletonItem = (index: number) => (
    <View key={`skeleton-group-${index}`} style={styles.skeletonGroup}>
      {skeletonConfigs.map((config) => (
        <SkeletonItem
          key={`skeleton-${index}-${config.width}-${config.height}`}
          config={config}
          baseColor={tokens.colors.surfaceSecondary}
          multiplier={tokens.spacingMultiplier}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.container, style]} testID={testID}>
      {createMappedArray(count, (index) => renderSkeletonItem(index))}
    </View>
  );
};

AtomicSkeleton.displayName = 'AtomicSkeleton';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  skeletonGroup: {
    width: '100%',
  },
  skeleton: {
    overflow: 'hidden',
  },
});


import React, { useMemo } from 'react';
import { View } from 'react-native';
import { AtomicText } from '../../atoms/AtomicText';
import { AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import type { InfoGridProps } from './types';
import { calculateResponsiveSize } from '../../responsive';
import { INFO_GRID_ICONS } from '../../constants';

export const InfoGrid: React.FC<InfoGridProps> = React.memo(({
  title,
  headerIcon,
  items,
  columns = 2,
  style,
  itemStyle,
}) => {
  const tokens = useAppDesignTokens();
  const spacingMultiplier = tokens.spacingMultiplier;

  const styles = useMemo(() => ({
    container: {
      gap: tokens.spacing.md,
    },
    header: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: tokens.spacing.xs,
    },
    headerIcon: {
      width: calculateResponsiveSize(INFO_GRID_ICONS.small, spacingMultiplier),
      height: calculateResponsiveSize(INFO_GRID_ICONS.small, spacingMultiplier),
      borderRadius: tokens.borders.radius.sm,
      backgroundColor: `${tokens.colors.primary}20`,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    headerTitle: {
      ...tokens.typography.labelLarge,
      fontWeight: '700' as const,
      color: tokens.colors.primary,
    },
    grid: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: tokens.spacing.sm,
    },
    item: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: tokens.spacing.sm,
      width: `${100 / columns - 2}%` as const, // Basic percentage calculation
      backgroundColor: tokens.colors.surfaceVariant,
      padding: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.outlineVariant,
    },
    iconContainer: {
      width: calculateResponsiveSize(INFO_GRID_ICONS.large, spacingMultiplier),
      height: calculateResponsiveSize(INFO_GRID_ICONS.large, spacingMultiplier),
      borderRadius: tokens.borders.radius.sm,
      backgroundColor: `${tokens.colors.primary}20`,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    itemText: {
      flex: 1,
      ...tokens.typography.bodySmall,
      color: tokens.colors.textPrimary,
      fontWeight: '500' as const,
    },
  }), [tokens, columns, spacingMultiplier]);

  const memoizedItemStyle = useMemo(() => itemStyle, [itemStyle]);

  return (
    <View style={[styles.container, style]}>
      {(title || headerIcon) && (
        <View style={styles.header}>
          {headerIcon && (
            <View style={styles.headerIcon}>
              <AtomicIcon name={headerIcon} size="xs" color="primary" />
            </View>
          )}
          {title && <AtomicText style={styles.headerTitle}>{title}</AtomicText>}
        </View>
      )}

      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.text} style={[styles.item, memoizedItemStyle]}>
            {item.icon && (
              <View style={styles.iconContainer}>
                <AtomicIcon name={item.icon} size="xs" color="primary" />
              </View>
            )}
            <AtomicText style={styles.itemText} numberOfLines={2}>
              {item.text}
            </AtomicText>
          </View>
        ))}
      </View>
    </View>
  );
});

/**
 * IconGrid - Reusable icon card grid
 *
 * Self-measuring grid that calculates item widths from actual container width.
 * Works correctly inside ScreenLayout (or any padded container) without needing
 * to know the parent's padding upfront.
 */

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
  FlatList,
} from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicIcon } from '../../atoms';
import { AtomicText } from '../../atoms';
import type { IconName } from '../../atoms';
import { calculateGridItemWidth } from '../../utils/math';
import { calculateResponsiveSize } from '../../responsive';
import { ICON_GRID } from '../../constants';

export interface IconGridItem {
  /** Unique identifier */
  id: string;
  /** Label shown below the icon */
  label: string;
  /** Icon name (AtomicIcon / Lucide-based) */
  icon: IconName;
  /** Called when the card is tapped */
  onPress: () => void;
}

export interface IconGridProps {
  /** Items to display */
  items: IconGridItem[];
  /** Number of columns (default: 3) */
  columns?: number;
  /** Gap between items in pixels (default: 10) */
  gap?: number;
  /** Vertical gap between rows (default: same as gap) */
  rowGap?: number;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
}

// Memoized grid item component to prevent unnecessary re-renders
const GridItem = React.memo<{
  item: IconGridItem;
  itemWidth: number;
  cardBackground: string;
  borderLight: string;
  textPrimary: string;
  iconGridStyles: ReturnType<typeof createStyles>;
}>(({ item, itemWidth, cardBackground, borderLight, textPrimary, iconGridStyles }) => {
  const { onPress: handlePress } = item;

  const cardStyle = useMemo(
    () => [iconGridStyles.card, { width: itemWidth }],
    [itemWidth, iconGridStyles]
  );

  const iconBoxStyle = useMemo(
    () => [
      iconGridStyles.iconBox,
      { width: itemWidth, backgroundColor: cardBackground, borderColor: borderLight },
    ],
    [itemWidth, cardBackground, borderLight, iconGridStyles]
  );

  const labelStyle = useMemo(
    () => [iconGridStyles.label, { color: textPrimary }],
    [textPrimary, iconGridStyles]
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={cardStyle}
    >
      <View style={iconBoxStyle}>
        <AtomicIcon name={item.icon} size="lg" color="textPrimary" />
      </View>
      <AtomicText style={labelStyle} numberOfLines={1}>
        {item.label}
      </AtomicText>
    </TouchableOpacity>
  );
});

/**
 * A self-sizing icon card grid.
 *
 * @example
 * ```tsx
 * <IconGrid
 *   columns={3}
 *   items={[
 *     { id: 'aging', label: 'Aging', icon: 'flash', onPress: () => navigate('Aging') },
 *     { id: 'wardrobe', label: 'Wardrobe', icon: 'shirt', onPress: () => navigate('Wardrobe') },
 *   ]}
 * />
 * ```
 */
export const IconGrid = React.memo<IconGridProps>(({
  items,
  columns = 3,
  gap = 10,
  rowGap,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const spacingMultiplier = tokens.spacingMultiplier;
  const [containerWidth, setContainerWidth] = useState(0);

  const styles = useMemo(() => createStyles(spacingMultiplier), [spacingMultiplier]);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width } = e.nativeEvent.layout;
      if (width > 0 && width !== containerWidth) {
        setContainerWidth(width);
      }
    },
    [containerWidth],
  );

  // Calculate item width using utility function
  const itemWidth = useMemo(() => {
    return calculateGridItemWidth(containerWidth, columns, gap);
  }, [containerWidth, columns, gap]);

  const { cardBackground, borderLight, textPrimary } = tokens.colors;

  const gridStyle = useMemo(
    () => [styles.grid, { columnGap: gap, rowGap: rowGap ?? gap }, style],
    [gap, rowGap, style, styles]
  );

  // Memoize color props to prevent unnecessary GridItem re-renders
  const colorProps = useMemo(() => ({
    cardBackground,
    borderLight,
    textPrimary,
  }), [cardBackground, borderLight, textPrimary]);

  // Stable renderItem with memoization
  const renderItem = useCallback(({ item }: { item: IconGridItem }) => {
    if (itemWidth === 0) {
      return <View key={item.id} style={styles.placeholder} />;
    }

    return (
      <GridItem
        item={item}
        itemWidth={itemWidth}
        iconGridStyles={styles}
        {...colorProps}
      />
    );
  }, [itemWidth, colorProps, styles]);

  const keyExtractor = useCallback((item: IconGridItem) => item.id, []);

  const getItemLayout = useCallback((_?: unknown, index?: number) => ({
    length: itemWidth,
    offset: itemWidth * (index || 0),
    index: index || 0,
  }), [itemWidth]);

  if (itemWidth === 0) {
    return (
      <View style={gridStyle} onLayout={handleLayout}>
        {items.map((item) => (
          <View key={item.id} style={styles.placeholder} />
        ))}
      </View>
    );
  }

  return (
    <View style={gridStyle} onLayout={handleLayout}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        numColumns={columns}
        scrollEnabled={false}
        contentContainerStyle={gridStyle}
      />
    </View>
  );
});

const createStyles = (spacingMultiplier: number) => ({
  grid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
  },
  card: {
    alignItems: 'center' as const,
    gap: 8,
  },
  iconBox: {
    aspectRatio: 1,
    borderRadius: calculateResponsiveSize(ICON_GRID.borderRadius, spacingMultiplier),
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
  },
  label: {
    fontSize: calculateResponsiveSize(ICON_GRID.fontSize, spacingMultiplier),
    fontWeight: '700' as const,
    textAlign: 'center' as const,
  },
  placeholder: {
    width: 0,
    height: 0,
  },
});

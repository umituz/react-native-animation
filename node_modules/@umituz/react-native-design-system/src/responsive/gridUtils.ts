/**
 * Grid Utilities
 * Responsive grid sizing and column calculations
 */

import { getScreenDimensions, isTablet } from '../device/detection';
import { GRID_CONFIG } from './config';
import { validateNumber } from './validation';

/**
 * Responsive grid columns
 * Returns number of columns for grid layouts
 *
 * @param mobileColumns - Number of columns for mobile devices (default: 2)
 * @param tabletColumns - Number of columns for tablet devices (default: 4)
 * @returns Responsive number of grid columns
 */
export const getResponsiveGridColumns = (
  mobileColumns: number = GRID_CONFIG.DEFAULT_MOBILE_COLUMNS,
  tabletColumns: number = GRID_CONFIG.DEFAULT_TABLET_COLUMNS
): number => {
  try {
    const validatedMobile = validateNumber(mobileColumns, 'mobileColumns', 1, 20);
    const validatedTablet = validateNumber(tabletColumns, 'tabletColumns', 1, 20);

    const isTabletDevice = isTablet();
    return isTabletDevice ? validatedTablet : validatedMobile;
  } catch {
    return 2;
  }
};

export interface GridCellSizeConfig {
  columns: number;
  rows: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  gap?: number;
  headerHeight?: number;
  tabBarHeight?: number;
  statusBarHeight?: number;
}

/**
 * Responsive grid cell size
 * Calculates optimal square cell size for a grid that fills available space
 *
 * @param config - Grid configuration
 * @param dimensions - Optional dimensions override
 * @returns Responsive cell size (width = height for square cells)
 */
export const getResponsiveGridCellSize = (
  config: GridCellSizeConfig,
  dimensions?: { width: number; height: number }
): number => {
  try {
    const {
      columns,
      rows,
      horizontalPadding = 32,
      verticalPadding = 32,
      gap = 8,
      headerHeight = 120,
      tabBarHeight = 80,
      statusBarHeight = 50,
    } = config;

    const { width, height } = dimensions || getScreenDimensions();

    const totalHorizontalGap = gap * (columns - 1);
    const availableWidth = width - horizontalPadding - totalHorizontalGap;
    const maxCellWidth = availableWidth / columns;

    const totalVerticalGap = gap * (rows - 1);
    const usedHeight = headerHeight + tabBarHeight + statusBarHeight + verticalPadding;
    const availableHeight = height - usedHeight - totalVerticalGap;
    const maxCellHeight = availableHeight / rows;

    return Math.floor(Math.min(maxCellWidth, maxCellHeight));
  } catch {
    return 60;
  }
};

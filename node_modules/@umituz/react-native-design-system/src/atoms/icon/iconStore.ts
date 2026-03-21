/**
 * Icon Store - Zustand-based icon configuration
 *
 * No defaults - all icon names come from the app.
 * App sets iconNames and iconRenderer via DesignSystemProvider.
 */

import { create } from 'zustand';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Required icon names - app MUST provide all of these
 */
export interface IconNames {
  close: string;
  check: string;
  checkCircle: string;
  chevronLeft: string;
  chevronRight: string;
  chevronUp: string;
  chevronDown: string;
  arrowLeft: string;
  arrowRight: string;
  search: string;
  closeCircle: string;
  clock: string;
  refresh: string;
  alertCircle: string;
  star: string;
  starOutline: string;
  wifi: string;
  wifiOff: string;
  info: string;
  trash: string;
  calendar: string;
  swap: string;
  colorFilter: string;
  diamond: string;
  award: string;
}

export const REQUIRED_ICON_KEYS: (keyof IconNames)[] = [
  'close', 'check', 'checkCircle', 'chevronLeft', 'chevronRight',
  'chevronUp', 'chevronDown', 'arrowLeft', 'arrowRight', 'search',
  'closeCircle', 'clock', 'refresh', 'alertCircle', 'star',
  'starOutline', 'wifi', 'wifiOff', 'info', 'trash', 'calendar', 'swap', 'colorFilter',
  'diamond', 'award',
];

/**
 * Props passed to the icon renderer function
 */
export interface IconRenderProps {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: import('react-native').AccessibilityRole;
}

export type IconRenderer = (props: IconRenderProps) => ReactNode;

interface IconStore {
  iconNames: IconNames | null;
  iconRenderer: IconRenderer | null;
  isConfigured: boolean;
  setConfig: (iconNames: IconNames, iconRenderer: IconRenderer) => void;
  reset: () => void;
}

export const useIconStore = create<IconStore>()((set) => ({
  iconNames: null,
  iconRenderer: null,
  isConfigured: false,

  setConfig: (iconNames, iconRenderer) => {
    if (__DEV__) {
      const missingKeys = REQUIRED_ICON_KEYS.filter(key => !iconNames[key]);
      if (missingKeys.length > 0) {
        console.warn(
          `[DesignSystem] Missing icon names: ${missingKeys.join(', ')}`
        );
      }
    }
    set({ iconNames, iconRenderer, isConfigured: true });
  },

  reset: () => set({ iconNames: null, iconRenderer: null, isConfigured: false }),
}));

// Alias for backward compatibility
export const iconStore = useIconStore;

// Default icon names for fallback
export const DEFAULT_ICON_NAMES: IconNames = {
  close: 'x',
  check: 'check',
  checkCircle: 'check-circle',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  chevronUp: 'chevron-up',
  chevronDown: 'chevron-down',
  arrowLeft: 'arrow-left',
  arrowRight: 'arrow-right',
  search: 'search',
  closeCircle: 'x-circle',
  clock: 'clock',
  refresh: 'refresh-cw',
  alertCircle: 'alert-circle',
  star: 'star',
  starOutline: 'star-outline',
  wifi: 'wifi',
  wifiOff: 'wifi-off',
  info: 'info',
  trash: 'trash',
  calendar: 'calendar',
  swap: 'swap',
  colorFilter: 'filter',
  diamond: 'diamond',
  award: 'award',
};

/**
 * Get icon renderer
 */
export const useIconRenderer = (): IconRenderer | null => {
  return useIconStore((state) => state.iconRenderer);
};

/**
 * Get specific icon name from app config
 */
export const useIconName = (key: keyof IconNames): string => {
  const iconNames = useIconStore((state) => state.iconNames);

  if (!iconNames) {
    if (__DEV__) {
      console.warn(
        `[DesignSystem] useIconName("${key}") - iconNames not configured.`
      );
    }
    return '';
  }

  return iconNames[key] || '';
};

/**
 * Check if icon system is configured
 */
export const useHasIconConfig = (): boolean => {
  return useIconStore((state) => state.isConfigured);
};

/**
 * Swipe Action Helpers
 *
 * Helper functions for swipe action styling and behavior.
 */

import type { IconName } from '../../../../atoms/icon';
import type { SwipeActionType } from '../entities/SwipeAction';

/**
 * Pre-built action type configurations
 */
export const ACTION_PRESETS: Record<Exclude<SwipeActionType, 'custom'>, {
  label: string;
  icon: IconName;
  colorKey: 'error' | 'success' | 'primary' | 'secondary' | 'warning' | 'textSecondary';
  hapticsIntensity: 'Light' | 'Medium' | 'Heavy';
}> = {
  delete: {
    label: 'Delete',
    icon: 'Trash2',
    colorKey: 'error',
    hapticsIntensity: 'Heavy',
  },
  archive: {
    label: 'Archive',
    icon: 'Archive',
    colorKey: 'success',
    hapticsIntensity: 'Medium',
  },
  edit: {
    label: 'Edit',
    icon: 'Pencil',
    colorKey: 'primary',
    hapticsIntensity: 'Light',
  },
  share: {
    label: 'Share',
    icon: 'Share2',
    colorKey: 'secondary',
    hapticsIntensity: 'Light',
  },
  favorite: {
    label: 'Favorite',
    icon: 'Heart',
    colorKey: 'warning',
    hapticsIntensity: 'Light',
  },
  more: {
    label: 'More',
    icon: 'MoveHorizontal',
    colorKey: 'textSecondary',
    hapticsIntensity: 'Light',
  },
};

/**
 * Gets preset configuration for action type
 */
export function getPreset(type: SwipeActionType) {
  if (type === 'custom') {
    return null;
  }
  return ACTION_PRESETS[type];
}

/**
 * Gets action display label
 */
export function getActionLabel(action: { type: SwipeActionType; label?: string }): string {
  if (action.label) {
    return action.label;
  }

  const preset = getPreset(action.type);
  return preset?.label || 'Action';
}

/**
 * Gets action icon name
 */
export function getActionIcon(action: { type: SwipeActionType; icon?: IconName }): IconName {
  if (action.icon) {
    return action.icon;
  }

  const preset = getPreset(action.type);
  return preset?.icon || 'MoveHorizontal';
}

/**
 * Gets action color key for theme
 */
export function getActionColorKey(action: { type: SwipeActionType; color?: string }): string | null {
  if (action.color) {
    return null; // Use custom color
  }

  const preset = getPreset(action.type);
  return preset?.colorKey || null;
}

/**
 * Gets haptics intensity for action
 */
export function getHapticsIntensity(action: { type: SwipeActionType; enableHaptics?: boolean }): 'Light' | 'Medium' | 'Heavy' {
  const preset = getPreset(action.type);
  return preset?.hapticsIntensity || 'Light';
}

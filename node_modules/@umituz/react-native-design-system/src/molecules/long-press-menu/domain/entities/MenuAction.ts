import type { IconName } from '../../../../atoms';

/**
 * Menu action entity
 * Represents a single action in the long press menu
 */
export interface MenuAction {
  /** Unique identifier for the action */
  id: string;

  /** Icon name (Ionicons) */
  icon: IconName;

  /** Display label for the action */
  label: string;

  /** Destructive action (uses error color) */
  destructive?: boolean;

  /** Disabled state (greyed out, not pressable) */
  disabled?: boolean;
}

/**
 * Predefined menu action types for common use cases
 */
export const MenuActionType = {
  EDIT: 'edit',
  DELETE: 'delete',
  SHARE: 'share',
  COPY: 'copy',
  ARCHIVE: 'archive',
  FAVORITE: 'favorite',
  MORE: 'more',
} as const;

export type MenuActionTypeValue = typeof MenuActionType[keyof typeof MenuActionType];

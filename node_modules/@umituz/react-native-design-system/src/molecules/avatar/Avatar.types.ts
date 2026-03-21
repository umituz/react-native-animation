/**
 * Avatar Types
 * Type definitions for avatar component
 */

/**
 * Avatar size preset
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Avatar shape
 */
export type AvatarShape = 'circle' | 'square' | 'rounded';

/**
 * Avatar type
 */
export type AvatarType = 'image' | 'initials' | 'icon';

/**
 * Avatar configuration
 */
export interface AvatarConfig {
  /** Avatar type */
  type: AvatarType;
  /** Size preset */
  size: AvatarSize;
  /** Shape */
  shape: AvatarShape;
  /** Image URI */
  uri?: string;
  /** User name for initials */
  name?: string;
  /** Icon name (if type is icon) */
  icon?: string;
  /** Custom background color */
  backgroundColor?: string;
  /** Show status indicator */
  showStatus?: boolean;
  /** Status (online/offline) */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

/**
 * Size configuration
 */
export interface SizeConfig {
  size: number;
  fontSize: number;
  iconSize: number;
  statusSize: number;
  borderWidth: number;
}

/**
 * Avatar group configuration
 */
export interface AvatarGroupConfig {
  maxVisible: number;
  spacing: number;
  size: AvatarSize;
  shape: AvatarShape;
}

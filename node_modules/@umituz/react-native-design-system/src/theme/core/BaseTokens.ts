/**
 * BASE TOKENS - Main Export
 * 
 * Aggregates all token modules into BASE_TOKENS
 */

import { spacing } from './tokens/Spacing';
import { typography } from './tokens/Typography';
import { borders } from './tokens/Borders';
import { iconSizes, opacity, avatarSizes, sizes } from './tokens/Sizes';
import type { BaseTokens } from './tokens/BaseTokens';

/**
 * BASE_TOKENS - Static design tokens
 * These values don't change with theme (light/dark)
 */
export const BASE_TOKENS: BaseTokens = {
  spacing,
  typography,
  borders,
  iconSizes,
  opacity,
  avatarSizes,
  sizes,
};

// Convenience exports
export { spacing, typography, borders, iconSizes, opacity, avatarSizes, sizes };



// Type exports
export type {
  BaseTokens,
  Spacing,
  Typography,
  Borders,
  IconSizes,
  Opacity,
  AvatarSizes,
  ComponentSizes
} from './tokens/BaseTokens';
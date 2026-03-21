/**
 * Card Padding Configurations
 */

import type { DesignTokens } from '../../../theme';
import type { CardPadding } from '../types';

export const getCardPadding = (padding: CardPadding, tokens: DesignTokens): number => {
  const paddingValues: Record<CardPadding, number> = {
    none: 0,
    xs: tokens.spacing.xs,
    sm: tokens.spacing.sm,
    md: tokens.spacing.md,
    lg: tokens.spacing.lg,
    xl: tokens.spacing.xl,
  };

  return paddingValues[padding] ?? tokens.spacing.md;
};

/**
 * Card Component Styles
 */

import { StyleSheet, ViewStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';
import type { CardVariant } from '../types';

export const getCardVariantStyles = (variant: CardVariant, tokens: DesignTokens) => {
  const styles: Record<CardVariant, { container: ViewStyle }> = {
    elevated: {
      container: {
        backgroundColor: tokens.colors.surface,
        borderWidth: 1,
        borderColor: tokens.colors.outlineVariant || tokens.colors.border,
      },
    },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: tokens.colors.outline,
      },
    },
    filled: {
      container: {
        backgroundColor: tokens.colors.surfaceVariant,
        borderWidth: 0,
      },
    },
    glass: {
      container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    glowing: {
      container: {
        backgroundColor: tokens.colors.surface,
        borderWidth: 2,
        borderColor: tokens.colors.primary,
      },
    },
  };

  return styles[variant] || styles.elevated;
};

export const cardStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
  },
  description: {
    marginTop: 8,
  },
  image: {
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 11,
  },
});

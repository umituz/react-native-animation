/**
 * EmptyState - Universal Empty State Component
 *
 * Displays when no data is available
 *
 * Atomic Design Level: ATOM
 * Purpose: Empty state indication across all apps
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AtomicIcon } from './icon';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens } from '../theme';
import { calculateResponsiveSize } from '../responsive';
import { EMPTY_STATE_ICON } from '../constants';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'file-tray-outline',
  title,
  subtitle,
  description,
  actionLabel,
  onAction,
  illustration,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const displayDescription = description || subtitle;
  const spacingMultiplier = tokens.spacingMultiplier;

  const themedStyles = useMemo(
    () => ({
      container: {
        flex: 1,
        alignItems: 'flex-start' as const,
        justifyContent: 'flex-start' as const,
        padding: tokens.spacing.xl,
      },
      iconContainer: {
        width: calculateResponsiveSize(EMPTY_STATE_ICON.width, spacingMultiplier),
        height: calculateResponsiveSize(EMPTY_STATE_ICON.height, spacingMultiplier),
        borderRadius: calculateResponsiveSize(EMPTY_STATE_ICON.borderRadius, spacingMultiplier),
        alignItems: 'flex-start' as const,
        justifyContent: 'flex-start' as const,
        marginBottom: tokens.spacing.lg,
      },
      title: {
        marginBottom: tokens.spacing.sm,
        textAlign: 'left' as const,
      },
      description: {
        marginBottom: tokens.spacing.lg,
        textAlign: 'left' as const,
      },
      actionButton: {
        paddingHorizontal: tokens.spacing.lg,
        paddingVertical: tokens.spacing.md,
        borderRadius: tokens.borders.radius.md,
        marginTop: tokens.spacing.sm,
      },
    }),
    [tokens, spacingMultiplier],
  );

  const iconContainerStyle = useMemo(() => [
    themedStyles.iconContainer,
    { backgroundColor: tokens.colors.surface },
  ], [themedStyles.iconContainer, tokens.colors.surface]);

  const actionButtonStyle = useMemo(() => [
    themedStyles.actionButton,
    { backgroundColor: tokens.colors.primary },
  ], [themedStyles.actionButton, tokens.colors.primary]);

  return (
    <View style={[themedStyles.container, style]} testID={testID}>
      {illustration ? (
        illustration
      ) : (
        <View style={iconContainerStyle}>
          <AtomicIcon name={icon} size="xxl" color="secondary" />
        </View>
      )}

      <AtomicText
        type="headlineSmall"
        color="primary"
        style={themedStyles.title}
      >
        {title}
      </AtomicText>

      {displayDescription && (
        <AtomicText
          type="bodyMedium"
          color="secondary"
          style={themedStyles.description}
        >
          {displayDescription}
        </AtomicText>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity
          style={actionButtonStyle}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <AtomicText type="labelLarge" color="onPrimary">
            {actionLabel}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};


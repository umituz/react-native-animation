/**
 * AlertToast Component
 *
 * Displays a toast-style alert.
 * Floats on top of content.
 */

import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { AtomicText, useIconName } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert } from './AlertTypes';
import {
    getAlertBackgroundColor,
    getAlertTextColor,
    getActionButtonStyle,
    getActionTextColor,
} from './utils/alertUtils';
import { useAlertDismissHandler, useAlertAutoDismiss } from './hooks';
import { AlertIcon, AlertContent } from './components';

interface AlertToastProps {
  alert: Alert;
}

export function AlertToast({ alert }: AlertToastProps) {
  const tokens = useAppDesignTokens();
  const closeIcon = useIconName('close');

  // Use shared hooks (replaces 25 lines of duplicate code)
  const handleDismiss = useAlertDismissHandler(alert);
  useAlertAutoDismiss(alert, handleDismiss);

  const backgroundColor = getAlertBackgroundColor(alert.type, tokens);
  const textColor = getAlertTextColor(tokens);

  const containerStyle = useMemo(() => [
    styles.container,
    {
      backgroundColor,
      padding: tokens.spacing.md,
      borderRadius: tokens.borders.radius.md,
    },
  ], [backgroundColor, tokens.borders.radius.md, tokens.spacing.md]);

  const closeButtonStyle = useMemo(() => [
    styles.closeButton,
    { marginLeft: tokens.spacing.sm }
  ], [tokens.spacing.sm]);

  const actionsContainerStyle = useMemo(() => [
    styles.actionsContainer,
    { marginTop: tokens.spacing.sm }
  ], [tokens.spacing.sm]);

  const handleActionPress = useCallback(async (action: typeof alert.actions[0]) => {
    try {
      await action.onPress();
    } catch (e) {
      if (__DEV__) console.error('[AlertToast] action.onPress failed', e);
    }
    if (action.closeOnPress ?? true) {
      handleDismiss();
    }
  }, [handleDismiss]);

  return (
    <View
      style={containerStyle}
      testID={alert.testID}
    >
      <Pressable
        onPress={alert.dismissible ? handleDismiss : undefined}
        style={styles.content}
      >
        <View style={styles.row}>
          {alert.icon && (
            <AlertIcon
              name={alert.icon}
              color={textColor}
              marginRight={tokens.spacing.sm}
            />
          )}

          <AlertContent
            title={alert.title}
            message={alert.message}
            titleColor={textColor}
            messageColor={textColor}
            messageMarginTop={tokens.spacing.xs}
            titleNumberOfLines={2}
            messageNumberOfLines={3}
          />

          {alert.dismissible && (
            <Pressable
              onPress={handleDismiss}
              style={closeButtonStyle}
              hitSlop={8}
            >
              <AlertIcon name={closeIcon} color={textColor} />
            </Pressable>
          )}
        </View>

        {alert.actions && alert.actions.length > 0 && (
          <View style={actionsContainerStyle}>
            {alert.actions.map((action) => {
              const actionButtonStyle = useMemo(() => [
                styles.actionButton,
                {
                  paddingVertical: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                  marginRight: tokens.spacing.xs,
                  borderRadius: tokens.borders.radius.sm,
                },
                getActionButtonStyle(action.style, tokens),
              ], [action.style, tokens]);

              const actionTextStyle = useMemo(() => [
                styles.actionText,
                { color: getActionTextColor(action.style, tokens) }
              ], [action.style, tokens]);

              return (
                <Pressable
                  key={action.id}
                  onPress={() => handleActionPress(action)}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                  style={actionButtonStyle}
                >
                  <AtomicText
                    type="bodySmall"
                    style={actionTextStyle}
                  >
                    {action.label}
                  </AtomicText>
                </Pressable>
              );
            })}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
  },
  message: {
    opacity: 0.9,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontWeight: '700',
  },
});

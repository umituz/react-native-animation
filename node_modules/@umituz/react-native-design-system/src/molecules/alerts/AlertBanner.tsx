/**
 * AlertBanner Component
 *
 * Displays a banner-style alert at the top or bottom of the screen.
 * Full-width notification bar for important messages.
 * Auto-dismisses after duration (default 3 seconds).
 */

import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from '../../safe-area';
import { AtomicText, useIconName } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertPosition } from './AlertTypes';
import { getAlertBackgroundColor, getAlertTextColor, getActionButtonStyle, getActionTextColor } from './utils/alertUtils';
import { useAlertDismissHandler, useAlertAutoDismiss } from './hooks';
import { AlertIcon, AlertContent } from './components';

interface AlertBannerProps {
    alert: Alert;
}

export function AlertBanner({ alert }: AlertBannerProps) {
    const insets = useSafeAreaInsets();
    const tokens = useAppDesignTokens();
    const closeIcon = useIconName('close');

    // Use shared hooks (replaces 20 lines of duplicate code)
    const handleDismiss = useAlertDismissHandler(alert);
    useAlertAutoDismiss(alert, handleDismiss);

    const backgroundColor = getAlertBackgroundColor(alert.type, tokens);
    const textColor = getAlertTextColor(tokens);
    const isTop = alert.position === AlertPosition.TOP;

    const containerStyle = useMemo(() => [
        styles.container,
        {
            backgroundColor,
            paddingTop: isTop ? insets.top + tokens.spacing.sm : tokens.spacing.sm,
            paddingBottom: isTop ? tokens.spacing.sm : insets.bottom + tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
        },
    ], [backgroundColor, insets.bottom, insets.top, isTop, tokens.spacing.md, tokens.spacing.sm]);

    const closeButtonStyle = useMemo(() => [
        styles.closeButton,
        { marginLeft: tokens.spacing.sm }
    ], [tokens.spacing.sm]);

    const actionsContainerStyle = useMemo(() => [
        styles.actionsContainer,
        { marginTop: tokens.spacing.sm }
    ], [tokens.spacing.sm]);

    const handleActionPress = useCallback(async (action: typeof alert.actions[0]) => {
        await action.onPress();
        if (action.closeOnPress ?? true) {
            handleDismiss();
        }
    }, [handleDismiss]);

    return (
        <View
            style={containerStyle}
            testID={alert.testID}
        >
            <View style={styles.content}>
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
                        titleNumberOfLines={1}
                        messageNumberOfLines={2}
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    content: {
        paddingVertical: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
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
        textDecorationLine: 'underline',
    },
});

/**
 * AlertModal Component
 */

import React, { useMemo, useCallback } from 'react';
import { View, Modal, Pressable } from 'react-native';
import { AtomicButton, AtomicText, AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertType } from './AlertTypes';
import { getAlertBackgroundColor } from './utils/alertUtils';
import { useAlertDismissHandler } from './hooks';
import { calculateResponsiveSize } from '../../responsive';
import { MODAL_SIZES, ALERT_MODAL_ICON } from '../../constants';

interface AlertModalProps {
    alert: Alert;
}

const getAlertIconName = (type: AlertType): string => {
    switch (type) {
        case AlertType.SUCCESS: return 'checkmark-circle';
        case AlertType.ERROR: return 'alertCircle';
        case AlertType.WARNING: return 'alertCircle';
        case AlertType.INFO: return 'info';
        default: return 'info';
    }
};

export const AlertModal: React.FC<AlertModalProps> = ({ alert }) => {
    const tokens = useAppDesignTokens();
    const handleClose = useAlertDismissHandler(alert);
    const spacingMultiplier = tokens.spacingMultiplier;

    const accentColor = getAlertBackgroundColor(alert.type, tokens);
    const iconName = getAlertIconName(alert.type);
    const hasTwoActions = alert.actions.length === 2;

    const handleActionPress = useCallback(async (action: typeof alert.actions[0]) => {
        await action.onPress();
        if (action.closeOnPress ?? true) {
            handleClose();
        }
    }, [handleClose]);

    const styles = useMemo(() => ({
        overlay: {
            flex: 1,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            padding: calculateResponsiveSize(MODAL_SIZES.overlayPadding, spacingMultiplier),
        },
        backdrop: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
        },
        modal: {
            width: '100%' as const,
            maxWidth: calculateResponsiveSize(MODAL_SIZES.maxWidth, spacingMultiplier),
            padding: calculateResponsiveSize(MODAL_SIZES.padding, spacingMultiplier),
            alignItems: 'center' as const,
        },
        iconCircle: {
            width: calculateResponsiveSize(ALERT_MODAL_ICON.width, spacingMultiplier),
            height: calculateResponsiveSize(ALERT_MODAL_ICON.height, spacingMultiplier),
            borderRadius: calculateResponsiveSize(ALERT_MODAL_ICON.borderRadius, spacingMultiplier),
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            marginBottom: calculateResponsiveSize(ALERT_MODAL_ICON.marginBottom, spacingMultiplier),
        },
        title: {
            fontWeight: '700' as const,
            textAlign: 'center' as const,
            marginBottom: tokens.spacing.sm,
        },
        message: {
            textAlign: 'center' as const,
            lineHeight: calculateResponsiveSize(24, spacingMultiplier),
            opacity: 0.85,
        },
        actionsRow: {
            flexDirection: 'row' as const,
            width: '100%' as const,
        },
        actionsColumn: {
            width: '100%' as const,
        },
        actionButtonHalf: {
            flex: 1,
        },
    }), [spacingMultiplier, tokens]);

    const modalStyle = useMemo(() => [
        styles.modal,
        {
            backgroundColor: tokens.colors.backgroundPrimary,
            borderRadius: tokens.borders.radius.xl ?? 20,
            borderWidth: 1,
            borderColor: tokens.colors.border,
        }
    ], [styles.modal, tokens.colors.backgroundPrimary, tokens.borders.radius.xl, tokens.colors.border]);

    const iconCircleStyle = useMemo(() => [
        styles.iconCircle,
        { backgroundColor: accentColor + '22' }
    ], [styles.iconCircle, accentColor]);

    const titleStyle = useMemo(() => [
        styles.title,
        { color: tokens.colors.textPrimary }
    ], [styles.title, tokens.colors.textPrimary]);

    const messageStyle = useMemo(() => [
        styles.message,
        { color: tokens.colors.textSecondary }
    ], [styles.message, tokens.colors.textSecondary]);

    const actionsContainerStyle = useMemo(() => [
        hasTwoActions ? styles.actionsRow : styles.actionsColumn,
        { marginTop: tokens.spacing.lg, gap: tokens.spacing.sm }
    ], [hasTwoActions, styles.actionsRow, styles.actionsColumn, tokens.spacing.lg, tokens.spacing.sm]);

    return (
        <Modal
            visible
            transparent
            animationType="none"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <Pressable
                    style={styles.backdrop}
                    onPress={alert.dismissible ? handleClose : undefined}
                />
                <View style={modalStyle}>
                    {/* Icon circle */}
                    <View style={iconCircleStyle}>
                        <AtomicIcon
                            name={iconName}
                            customSize={calculateResponsiveSize(36, spacingMultiplier)}
                            customColor={accentColor}
                        />
                    </View>

                    {/* Title */}
                    <AtomicText
                        type="titleLarge"
                        style={titleStyle}
                    >
                        {alert.title}
                    </AtomicText>

                    {/* Message */}
                    {!!alert.message && (
                        <AtomicText
                            type="bodyMedium"
                            style={messageStyle}
                        >
                            {alert.message}
                        </AtomicText>
                    )}

                    {/* Actions */}
                    <View style={actionsContainerStyle}>
                        {alert.actions.length === 0 ? (
                            <AtomicButton
                                title="Close"
                                onPress={handleClose}
                                fullWidth
                            />
                        ) : (
                            alert.actions.map((action, index) => (
                                <AtomicButton
                                    key={action.id ?? String(index)}
                                    title={action.label}
                                    variant={
                                        action.style === 'destructive' ? 'danger'
                                        : action.style === 'secondary' ? 'outline'
                                        : 'primary'
                                    }
                                    onPress={() => handleActionPress(action)}
                                    fullWidth={!hasTwoActions}
                                    style={hasTwoActions ? styles.actionButtonHalf : undefined}
                                />
                            ))
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

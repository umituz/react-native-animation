/**
 * AlertInline Component
 */

import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { Alert } from './AlertTypes';
import { getAlertBorderColor, getAlertBackgroundColorInline } from './utils/alertUtils';
import { AlertContent } from './components';

interface AlertInlineProps {
    alert: Alert;
}

export const AlertInline: React.FC<AlertInlineProps> = ({ alert }) => {
    const tokens = useAppDesignTokens();

    const containerStyle = useMemo(() => [
        styles.container,
        {
            borderColor: getAlertBorderColor(alert.type, tokens),
            backgroundColor: getAlertBackgroundColorInline(alert.type, tokens),
            borderRadius: tokens.borders.radius.sm,
            padding: tokens.spacing.md,
            marginVertical: tokens.spacing.sm,
        }
    ], [alert.type, tokens]);

    return (
        <View style={containerStyle}>
            <AlertContent
                title={alert.title}
                message={alert.message}
                titleColor={tokens.colors.textPrimary}
                messageColor={tokens.colors.textSecondary}
                messageMarginTop={tokens.spacing.xs}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: '100%',
    },
});

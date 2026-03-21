import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, AtomicIcon, useIconName } from '../../../../../atoms';
import type { useAppDesignTokens } from '../../../../../theme';

interface FilterSheetHeaderProps {
    title: string;
    onClose: () => void;
    tokens: ReturnType<typeof useAppDesignTokens>;
}

export const FilterSheetHeader = ({ title, onClose, tokens }: FilterSheetHeaderProps) => {
    const closeIcon = useIconName('close');

    return (
        <View style={[styles.header, { borderBottomColor: tokens.colors.border, borderBottomWidth: tokens.borders.width.thin }]}>
            <AtomicText type="headlineMedium" style={styles.title}>{title}</AtomicText>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <AtomicIcon name={closeIcon} size="md" color="primary" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 16,
        paddingTop: 8,
    },
    title: {
        fontWeight: '600',
    },
});

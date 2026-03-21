import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, AtomicIcon, useIconName } from '../../../../../atoms';
import type { useAppDesignTokens } from '../../../../../theme';
import type { FilterOption } from '../../../types/Filter';

interface FilterSheetOptionProps {
    option: FilterOption;
    isSelected: boolean;
    onPress: (id: string) => void;
    tokens: ReturnType<typeof useAppDesignTokens>;
}

export const FilterSheetOption = ({ option, isSelected, onPress, tokens }: FilterSheetOptionProps) => {
    const checkCircleIcon = useIconName('checkCircle');

    return (
    <TouchableOpacity
        onPress={() => onPress(option.id)}
        style={[
            styles.option,
            { borderBottomColor: tokens.colors.borderLight, borderBottomWidth: tokens.borders.width.thin },
            isSelected && { backgroundColor: tokens.colors.primary + '15' }
        ]}
    >
        <View style={styles.optionContent}>
            {option.icon && (
                <AtomicIcon
                    name={option.icon}
                    size="md"
                    color={isSelected ? 'primary' : 'secondary'}
                />
            )}
            <AtomicText
                type="bodyLarge"
                style={[styles.optionLabel, isSelected && { color: tokens.colors.primary, fontWeight: '600' }]}
            >
                {option.label}
            </AtomicText>
        </View>
        {isSelected && <AtomicIcon name={checkCircleIcon} size="md" color="primary" />}
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    optionLabel: {
        flex: 1,
    },
});

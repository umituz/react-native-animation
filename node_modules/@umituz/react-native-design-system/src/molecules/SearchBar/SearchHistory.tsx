import React, { useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { AtomicText } from '../../atoms/AtomicText';
import { AtomicIcon, useIconName } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import type { SearchHistoryProps } from './types';

export const SearchHistory: React.FC<SearchHistoryProps> = ({
    history,
    onSelectItem,
    onRemoveItem,
    onClearAll,
    maxItems = 10,
    style,
    title = 'Recent Searches',
    clearLabel = 'Clear All',
}) => {
    const tokens = useAppDesignTokens();
    const clockIcon = useIconName('clock');
    const closeIcon = useIconName('close');

    const styles = useMemo(() => StyleSheet.create({
        container: {
            paddingVertical: tokens.spacing.sm,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.sm,
            marginBottom: tokens.spacing.xs,
        },
        clearButton: {
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
        },
        item: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.md,
            minHeight: 48,
        },
        itemLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: tokens.spacing.md,
        },
        itemText: {
            marginLeft: tokens.spacing.md,
            flex: 1,
        },
        removeButton: {
            padding: tokens.spacing.xs,
        },
    }), [tokens]);

    if (!history || history.length === 0) {
        return null;
    }

    const displayedHistory = history.slice(0, maxItems);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <AtomicText
                    type="labelLarge"
                    style={{ color: tokens.colors.textSecondary }}
                >
                    {title}
                </AtomicText>
                <TouchableOpacity
                    onPress={onClearAll}
                    style={styles.clearButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <AtomicText
                        type="labelMedium"
                        style={{ color: tokens.colors.primary }}
                    >
                        {clearLabel}
                    </AtomicText>
                </TouchableOpacity>
            </View>

            {displayedHistory.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => onSelectItem(item.query)}
                    style={styles.item}
                >
                    <View style={styles.itemLeft}>
                        <AtomicIcon
                            name={clockIcon}
                            size="sm"
                            customColor={tokens.colors.textSecondary}
                        />
                        <AtomicText
                            type="bodyMedium"
                            style={[
                                styles.itemText,
                                { color: tokens.colors.textPrimary }
                            ]}
                            numberOfLines={1}
                        >
                            {item.query}
                        </AtomicText>
                    </View>

                    <TouchableOpacity
                        onPress={() => onRemoveItem(item.id)}
                        style={styles.removeButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel={`Remove ${item.query} from history`}
                    >
                        <AtomicIcon
                            name={closeIcon}
                            size="sm"
                            customColor={tokens.colors.textSecondary}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </View>
    );
};

import React, { useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { AtomicText } from '../../atoms/AtomicText';
import { useAppDesignTokens } from '../../theme';
import type { SearchSuggestionsProps } from './types';

export function SearchSuggestions<T>({
    query,
    suggestions,
    renderItem,
    onSelectSuggestion,
    maxSuggestions = 5,
    style,
    emptyComponent,
}: SearchSuggestionsProps<T>) {
    const tokens = useAppDesignTokens();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            borderRadius: tokens.borders.radius.lg,
            overflow: 'hidden',
        },
        item: {
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.md,
            minHeight: 48,
            justifyContent: 'center',
        },
    }), [tokens]);

    if (!query.trim() && !emptyComponent) {
        return null;
    }

    if (suggestions.length === 0) {
        return <>{emptyComponent}</>;
    }

    const displayedSuggestions = suggestions.slice(0, maxSuggestions);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: tokens.colors.surface,
                },
                style,
            ]}
        >
            {displayedSuggestions.map((item, index) => (
                <TouchableOpacity
                    key={String(item)}
                    onPress={() => onSelectSuggestion(item)}
                    style={[
                        styles.item,
                        index > 0 ? {
                            borderTopWidth: 1,
                            borderTopColor: tokens.colors.border,
                        } : undefined,
                    ]}
                >
                    {renderItem(item, query)}
                </TouchableOpacity>
            ))}
        </View>
    );
}

/**
 * Default suggestion renderer (simple text with highlighting)
 */
export const DefaultSuggestionRenderer = (
    text: string,
    query: string,
    tokens: ReturnType<typeof useAppDesignTokens>
) => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) {
        return (
            <AtomicText
                type="bodyMedium"
                style={{ color: tokens.colors.textPrimary }}
            >
                {text}
            </AtomicText>
        );
    }

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
        <AtomicText
            type="bodyMedium"
            style={{ color: tokens.colors.textPrimary }}
        >
            {before}
            <AtomicText type="bodyMedium" style={{ fontWeight: '700', color: tokens.colors.primary }}>
                {match}
            </AtomicText>
            {after}
        </AtomicText>
    );
};

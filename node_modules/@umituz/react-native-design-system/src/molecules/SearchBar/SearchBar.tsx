import React, { useCallback, useMemo } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicIcon, useIconName } from '../../atoms';
import { AtomicSpinner } from '../../atoms/AtomicSpinner';
import type { SearchBarProps } from './types';
import { calculateResponsiveSize } from '../../responsive';
import { MISC_SIZES } from '../../constants';

export const SearchBar: React.FC<SearchBarProps> = React.memo(({
    value,
    onChangeText,
    onSubmit,
    onClear,
    onFocus,
    onBlur,
    placeholder = 'Search...',
    loading = false,
    disabled = false,
    containerStyle: propContainerStyle,
    inputStyle: propInputStyle,
    testID,
}) => {
    const tokens = useAppDesignTokens();
    const searchIcon = useIconName('search');
    const closeCircleIcon = useIconName('closeCircle');

    // Memoize hitSlop to prevent object creation on every render
    const hitSlop = useMemo(() => ({ top: 10, bottom: 10, left: 10, right: 10 }), []);

    const handleClear = useCallback(() => {
        onChangeText('');
        onClear?.();
    }, [onChangeText, onClear]);

    const showClear = value.length > 0 && !loading;

    const spacingMultiplier = tokens.spacingMultiplier;

    const containerStyle = useMemo(() => [
        styles.container,
        {
            backgroundColor: tokens.colors.surfaceVariant,
            borderColor: tokens.colors.border,
            height: calculateResponsiveSize(MISC_SIZES.searchInputHeight, spacingMultiplier),
            paddingHorizontal: calculateResponsiveSize(tokens.spacing.md, spacingMultiplier),
            borderRadius: calculateResponsiveSize(MISC_SIZES.searchBorderRadius, spacingMultiplier),
        },
        propContainerStyle,
    ], [tokens.colors.surfaceVariant, tokens.colors.border, spacingMultiplier, propContainerStyle]);

    const inputTextStyle = useMemo(() => [
        styles.input,
        {
            color: tokens.colors.textPrimary,
            fontSize: tokens.typography.bodyMedium.responsiveFontSize,
        },
        propInputStyle,
    ], [styles.input, tokens.colors.textPrimary, tokens.typography.bodyMedium.responsiveFontSize, propInputStyle]);

    return (
        <View
            style={containerStyle}
            testID={testID}
        >
            <View style={styles.searchIcon}>
                <AtomicIcon
                    name={searchIcon}
                    size="md"
                    customColor={tokens.colors.textSecondary}
                />
            </View>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={tokens.colors.textSecondary}
                editable={!disabled}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
                style={inputTextStyle}
            />

            {(loading || showClear) && (
                <View style={styles.rightActions}>
                    {loading && (
                        <AtomicSpinner
                            size="sm"
                            color="primary"
                            style={styles.loader}
                        />
                    )}

                    {showClear && (
                        <TouchableOpacity
                            onPress={handleClear}
                            style={styles.clearButton}
                            hitSlop={hitSlop}
                            accessibilityRole="button"
                            accessibilityLabel="Clear search"
                        >
                            <AtomicIcon
                                name={closeCircleIcon}
                                size="md"
                                customColor={tokens.colors.textSecondary}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingVertical: 0,
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    loader: {
        marginRight: 8,
    },
    clearButton: {
        padding: 2,
    },
    searchIcon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

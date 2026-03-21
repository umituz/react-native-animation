import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface SearchHistoryItem {
    id: string;
    query: string;
    timestamp: number;
}

export interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit?: () => void;
    onClear?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    loading?: boolean;
    disabled?: boolean;
    showCancelButton?: boolean;
    onCancel?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    testID?: string;
}

export interface SearchHistoryProps {
    history: SearchHistoryItem[];
    onSelectItem: (query: string) => void;
    onRemoveItem: (id: string) => void;
    onClearAll: () => void;
    maxItems?: number;
    style?: StyleProp<ViewStyle>;
    title?: string;
    clearLabel?: string;
}

export interface SearchSuggestionsProps<T> {
    query: string;
    suggestions: T[];
    renderItem: (item: T, query: string) => React.ReactNode;
    onSelectSuggestion: (item: T) => void;
    maxSuggestions?: number;
    style?: StyleProp<ViewStyle>;
    emptyComponent?: React.ReactNode;
}

/**
 * ListItem Types
 */
import type { ViewStyle } from 'react-native';

export interface ListItemProps {
    /** Main title text */
    title: string;
    /** Optional subtitle text */
    subtitle?: string;
    /** Left icon name */
    leftIcon?: string;
    /** Right icon name */
    rightIcon?: string;
    /** Press handler */
    onPress?: () => void;
    /** Disabled state */
    disabled?: boolean;
    /** Custom container style */
    style?: ViewStyle;
}

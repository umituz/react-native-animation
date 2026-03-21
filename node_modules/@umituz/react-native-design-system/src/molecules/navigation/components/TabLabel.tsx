import React, { useMemo } from 'react';
import { AtomicText } from '../../../atoms';

export interface TabLabelProps {
    label: string;
    focused: boolean;
    color?: string;
    focusedColor?: string;
    unfocusedColor?: string;
    fontSize?: number;
    focusedWeight?: '400' | '500' | '600' | '700' | '800' | '900';
    unfocusedWeight?: '400' | '500' | '600' | '700' | '800' | '900';
    textStyle?: import('react-native').TextStyle;
    textType?: 'labelSmall' | 'labelMedium' | 'labelLarge' | 'bodySmall';
}

export const TabLabel: React.FC<TabLabelProps> = React.memo(({
    label,
    focused,
    color,
    focusedColor,
    unfocusedColor,
    fontSize,
    focusedWeight = '600',
    unfocusedWeight = '500',
    textStyle,
    textType = 'labelSmall',
}) => {
    const textStyleMemo = useMemo(() => [
        {
            color: color || (focused ? focusedColor : unfocusedColor),
            textAlign: 'center' as const,
            fontSize,
            fontWeight: focused ? focusedWeight : unfocusedWeight,
        },
        textStyle,
    ], [color, focused, focusedColor, unfocusedColor, fontSize, focusedWeight, unfocusedWeight, textStyle]);

    return (
        <AtomicText
            type={textType}
            style={textStyleMemo}
        >
            {label}
        </AtomicText>
    );
});

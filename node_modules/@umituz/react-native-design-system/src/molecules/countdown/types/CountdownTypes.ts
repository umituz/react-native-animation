export interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isExpired: boolean;
}

export interface CountdownTarget {
    date: Date | string;
    label?: string;
    icon?: string;
}

export interface CountdownFormatOptions {
    showDays?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
    showZeros?: boolean;
    separator?: string;
}

export interface CountdownDisplayConfig {
    showIcon?: boolean;
    showLabel?: boolean;
    showToggle?: boolean;
    layout?: 'grid' | 'inline' | 'compact';
    size?: 'small' | 'medium' | 'large';
    showDays?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
}

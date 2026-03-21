import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { useCountdown } from '../hooks/useCountdown';
import { CountdownHeader } from './CountdownHeader';
import { TimeUnit } from './TimeUnit';
import type { CountdownTarget, CountdownDisplayConfig } from '../types/CountdownTypes';
import type { IconName } from '../../../atoms';

const EMPTY_TARGETS: CountdownTarget[] = [];
const DEFAULT_DISPLAY_CONFIG: CountdownDisplayConfig = {};

export interface CountdownProps {
    target: CountdownTarget;
    alternateTargets?: CountdownTarget[];
    displayConfig?: CountdownDisplayConfig;
    interval?: number;
    onExpire?: () => void;
    onTargetChange?: (target: CountdownTarget) => void;
    formatLabel?: (unit: 'days' | 'hours' | 'minutes' | 'seconds', value: number) => string;
}

export const Countdown: React.FC<CountdownProps> = ({
    target,
    alternateTargets = EMPTY_TARGETS,
    displayConfig = DEFAULT_DISPLAY_CONFIG,
    interval = 1000,
    onExpire,
    onTargetChange,
    formatLabel,
}) => {
    const tokens = useAppDesignTokens();
    const {
        showLabel = true,
        showToggle = alternateTargets.length > 0,
        size = 'medium',
        showDays,
        showHours = true,
        showMinutes = true,
        showSeconds = true,
    } = displayConfig;

    const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
    const allTargets = useMemo(
        () => [target, ...alternateTargets],
        [target, alternateTargets]
    );
    const currentTarget = allTargets[currentTargetIndex] ?? target;

    const { timeRemaining, setTarget: updateTarget } = useCountdown(currentTarget, {
        interval,
        onExpire,
    });

    const handleToggle = () => {
        const nextIndex = (currentTargetIndex + 1) % allTargets.length;
        const nextTarget = allTargets[nextIndex];
        if (nextTarget) {
            setCurrentTargetIndex(nextIndex);
            updateTarget(nextTarget);
            onTargetChange?.(nextTarget);
        }
    };

    const defaultFormatLabel = (unit: 'days' | 'hours' | 'minutes' | 'seconds') => {
        const labels: Record<string, string> = {
            days: '',
            hours: '',
            minutes: '',
            seconds: '',
        };
        return labels[unit] ?? '';
    };

    const labelFormatter = formatLabel || defaultFormatLabel;

    const timeUnits = useMemo(() => {
        interface CountdownUnit {
            key: string;
            value: number;
            label: string;
        }
        const units: CountdownUnit[] = [];

        const shouldShowDays = showDays !== undefined ? showDays : timeRemaining.days > 0;

        if (shouldShowDays) {
            units.push({
                key: 'days',
                value: timeRemaining.days,
                label: labelFormatter('days', timeRemaining.days)
            });
        }
        if (showHours) {
            units.push({
                key: 'hours',
                value: timeRemaining.hours,
                label: labelFormatter('hours', timeRemaining.hours)
            });
        }
        if (showMinutes) {
            units.push({
                key: 'minutes',
                value: timeRemaining.minutes,
                label: labelFormatter('minutes', timeRemaining.minutes)
            });
        }
        if (showSeconds) {
            units.push({
                key: 'seconds',
                value: timeRemaining.seconds,
                label: labelFormatter('seconds', timeRemaining.seconds)
            });
        }

        return units;
    }, [timeRemaining, labelFormatter, showDays, showHours, showMinutes, showSeconds]);

    return (
        <View style={styles.container}>
            {showLabel && currentTarget && (
                <CountdownHeader
                    title={currentTarget.label || ''}
                    icon={currentTarget.icon as IconName}
                    showToggle={showToggle}
                    onToggle={handleToggle}
                />
            )}

            <View style={[styles.grid, { gap: tokens.spacing.sm }]}>
                {timeUnits.map((unit) => (
                    <TimeUnit
                        key={unit.key}
                        value={unit.value}
                        label={unit.label}
                        size={size}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

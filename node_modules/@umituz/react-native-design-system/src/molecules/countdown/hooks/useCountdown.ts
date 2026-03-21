import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimeRemaining, CountdownTarget } from '../types/CountdownTypes';
import { calculateTimeRemaining } from '../utils/TimeCalculator';

export interface UseCountdownOptions {
    interval?: number;
    autoStart?: boolean;
    onExpire?: () => void;
    onTick?: (timeRemaining: TimeRemaining) => void;
}

export interface UseCountdownReturn {
    timeRemaining: TimeRemaining;
    isActive: boolean;
    isExpired: boolean;
    start: () => void;
    stop: () => void;
    reset: () => void;
    setTarget: (target: CountdownTarget) => void;
}

export function useCountdown(
    initialTarget: CountdownTarget | null,
    options: UseCountdownOptions = {}
): UseCountdownReturn {
    const {
        interval = 1000,
        autoStart = true,
        onExpire,
        onTick,
    } = options;

    const [target, setTargetState] = useState<CountdownTarget | null>(initialTarget);
    const [isActive, setIsActive] = useState(autoStart);
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
        target ? calculateTimeRemaining(target.date) : {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0,
            isExpired: true,
        }
    );

    const expiredRef = useRef(false);
    const onExpireRef = useRef(onExpire);
    const onTickRef = useRef(onTick);

    // Keep refs in sync with latest callbacks
    useEffect(() => {
        onExpireRef.current = onExpire;
        onTickRef.current = onTick;
    }, [onExpire, onTick]);

    const updateTime = useCallback(() => {
        if (!target) return;

        const remaining = calculateTimeRemaining(target.date);
        setTimeRemaining(remaining);

        if (onTickRef.current) {
            onTickRef.current(remaining);
        }

        if (remaining.isExpired && !expiredRef.current) {
            expiredRef.current = true;
            setIsActive(false);
            if (onExpireRef.current) {
                onExpireRef.current();
            }
        }
    }, [target]);

    useEffect(() => {
        if (!isActive || !target) return;

        updateTime();
        const intervalId = setInterval(updateTime, interval);

        return () => clearInterval(intervalId);
    }, [isActive, target, interval, updateTime]);

    const start = useCallback(() => {
        setIsActive(true);
    }, []);

    const stop = useCallback(() => {
        setIsActive(false);
    }, []);

    const reset = useCallback(() => {
        expiredRef.current = false;
        setIsActive(autoStart);
        if (target) {
            updateTime();
        }
    }, [autoStart, target, updateTime]);

    const setTarget = useCallback((newTarget: CountdownTarget) => {
        setTargetState(newTarget);
        expiredRef.current = false;
        setIsActive(autoStart);
    }, [autoStart]);

    return {
        timeRemaining,
        isActive,
        isExpired: timeRemaining.isExpired,
        start,
        stop,
        reset,
        setTarget,
    };
}

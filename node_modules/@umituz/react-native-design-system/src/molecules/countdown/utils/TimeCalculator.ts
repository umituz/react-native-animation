import type { TimeRemaining } from '../types/CountdownTypes';

export function calculateTimeRemaining(targetDate: Date | string): TimeRemaining {
    const now = new Date().getTime();
    const target = typeof targetDate === 'string'
        ? new Date(targetDate).getTime()
        : targetDate.getTime();

    const difference = Math.max(0, target - now);
    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        isExpired: totalSeconds <= 0,
    };
}

export function padNumber(num: number): string {
    return String(num).padStart(2, '0');
}

export function getNextDayStart(date?: Date): Date {
    const baseDate = date || new Date();
    const nextDay = new Date(baseDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay;
}

export function getNextYearStart(date?: Date): Date {
    const baseDate = date || new Date();
    const nextYear = new Date(baseDate);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    nextYear.setMonth(0, 1);
    nextYear.setHours(0, 0, 0, 0);
    return nextYear;
}

import { TimezoneCalendarDay } from '../../domain/entities/Timezone';
import { parseDate } from '../utils/TimezoneParsers';

/**
 * CalendarManager
 * Handles calendar grid generation and date comparisons
 */
export class CalendarManager {
    /**
     * Get calendar days for a specific month
     */
    getCalendarDays(
        year: number,
        month: number,
        formatDateFn: (date: Date) => string,
    ): TimezoneCalendarDay[] {
        const days: TimezoneCalendarDay[] = [];
        const firstDay = new Date(year, month, 1);
        const firstDayOfWeek = firstDay.getDay();
        const lastDay = new Date(year, month + 1, 0);
        const lastDayOfMonth = lastDay.getDate();
        const today = new Date();

        // Previous month filler
        const prevMonthDate = new Date(year, month, 0);
        const prevMonthLastDay = prevMonthDate.getDate();
        const prevMonth = prevMonthDate.getMonth();
        const prevYear = prevMonthDate.getFullYear();

        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            const date = new Date(prevYear, prevMonth, day);
            days.push(this.createDay(date, false, today, formatDateFn));
        }

        // Current month
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const date = new Date(year, month, day);
            days.push(this.createDay(date, true, today, formatDateFn));
        }

        // Next month filler
        const remainingDays = 42 - days.length;
        const nextMonthDate = new Date(year, month + 1, 1);
        const nextMonth = nextMonthDate.getMonth();
        const nextYear = nextMonthDate.getFullYear();

        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(nextYear, nextMonth, day);
            days.push(this.createDay(date, false, today, formatDateFn));
        }

        return days;
    }

    private createDay(
        date: Date,
        isCurrentMonth: boolean,
        today: Date,
        formatDateFn: (date: Date) => string,
    ): TimezoneCalendarDay {
        return {
            date,
            day: date.getDate(),
            dayOfWeek: date.getDay(),
            month: date.getMonth(),
            year: date.getFullYear(),
            isCurrentMonth,
            isToday: this.isSameDay(date, today),
            isoDate: formatDateFn(date),
        };
    }

    isSameDay(date1: Date | string | number, date2: Date | string | number): boolean {
        const d1 = this.parse(date1);
        const d2 = this.parse(date2);
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }

    isToday(date: Date | string | number): boolean {
        return this.isSameDay(date, new Date());
    }

    addDays(date: Date | string | number, days: number): Date {
        const result = this.parse(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    startOfDay(date: Date | string | number): Date {
        const result = this.parse(date);
        result.setHours(0, 0, 0, 0);
        return result;
    }

    endOfDay(date: Date | string | number): Date {
        const result = this.parse(date);
        result.setHours(23, 59, 59, 999);
        return result;
    }

    setTimeOfDay(date: Date | string | number, hours: number, minutes: number): Date {
        const result = this.parse(date);
        result.setHours(hours, minutes, 0, 0);
        return result;
    }

    getDifferenceInDays(date1: Date | string | number, date2: Date | string | number): number {
        const d1 = this.parse(date1);
        const d2 = this.parse(date2);
        const diffInMs = d1.getTime() - d2.getTime();
        return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    }

    getDaysUntil(date: Date | string | number): number {
        const diff = this.getDifferenceInDays(this.parse(date), new Date());
        return Math.max(0, diff);
    }

    isFuture(date: Date | string | number): boolean {
        return this.parse(date).getTime() > Date.now();
    }

    isPast(date: Date | string | number): boolean {
        return this.parse(date).getTime() < Date.now();
    }

    parse(date: Date | string | number): Date {
        return parseDate(date);
    }

    isValid(date: Date | string | number): boolean {
        const d = this.parse(date);
        return d instanceof Date && !isNaN(d.getTime());
    }

    getAge(birthDate: Date | string | number): number {
        const birth = this.parse(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    isBetween(
        date: Date | string | number,
        start: Date | string | number,
        end: Date | string | number,
    ): boolean {
        const d = this.parse(date).getTime();
        const s = this.parse(start).getTime();
        const e = this.parse(end).getTime();
        return d >= s && d <= e;
    }

    min(dates: Array<Date | string | number>): Date {
        const parsedDates = dates.map((d) => this.parse(d).getTime());
        const minTime = Math.min(...parsedDates);
        return new Date(minTime);
    }

    max(dates: Array<Date | string | number>): Date {
        const parsedDates = dates.map((d) => this.parse(d).getTime());
        const maxTime = Math.max(...parsedDates);
        return new Date(maxTime);
    }

    getWeek(date: Date | string | number): number {
        const d = this.parse(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    }

    getQuarter(date: Date | string | number): number {
        const d = this.parse(date);
        return Math.floor(d.getMonth() / 3) + 1;
    }
}

/**
 * DateFormatter
 * Handles locale-aware formatting of dates and times
 * Optimized with Intl.DateTimeFormat caching
 */
import { parseDate } from '../utils/TimezoneParsers';

// Cache for Intl.DateTimeFormat instances to avoid recreating them
const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const cacheKey = `${locale}-${JSON.stringify(options)}`;
  let formatter = formatterCache.get(cacheKey);

  if (!formatter) {
    try {
      formatter = new Intl.DateTimeFormat(locale, options);
    } catch (_error) {
      // Fallback to 'en-US' if locale is not supported
      formatter = new Intl.DateTimeFormat('en-US', options);
    }
    formatterCache.set(cacheKey, formatter);

    // Limit cache size to prevent memory leaks
    if (formatterCache.size > 100) {
      const firstKey = formatterCache.keys().next().value as string;
      if (firstKey) {
        formatterCache.delete(firstKey);
      }
    }
  }

  return formatter;
}

export class DateFormatter {
    formatDate(
        date: Date | string | number,
        locale: string,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options,
        };
        return getFormatter(locale, defaultOptions).format(this.parse(date));
    }

    formatTime(
        date: Date | string | number,
        locale: string,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            ...options,
        };
        return getFormatter(locale, defaultOptions).format(this.parse(date));
    }

    formatDateTime(
        date: Date | string | number,
        locale: string,
        options?: Intl.DateTimeFormatOptions,
    ): string {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...options,
        };
        return getFormatter(locale, defaultOptions).format(this.parse(date));
    }

    formatDateToString(date: Date | string | number): string {
        const d = this.parse(date);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    formatToISOString(date: Date | string | number): string {
        return this.parse(date).toISOString();
    }

    formatToDisplayDate(date: Date | string | number): string {
        const d = this.parse(date);
        const day = String(d.getDate()).padStart(2, '0');
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const y = d.getFullYear();
        return `${day}.${m}.${y}`;
    }

    formatToDisplayDateTime(date: Date | string | number): string {
        const d = this.parse(date);
        const day = String(d.getDate()).padStart(2, '0');
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const y = d.getFullYear();
        const th = String(d.getHours()).padStart(2, '0');
        const tm = String(d.getMinutes()).padStart(2, '0');
        return `${day}.${m}.${y} ${th}:${tm}`;
    }

    formatRelativeTime(date: Date | string | number, locale: string): string {
        const d = this.parse(date);
        const now = new Date();
        const diffInMs = d.getTime() - now.getTime();
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

        // Use Intl.RelativeTimeFormat for generic localizable relative time
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

        if (Math.abs(diffInDays) < 7) {
            return rtf.format(diffInDays, 'day');
        }

        // For longer periods, fall back to simple date
        return this.formatDate(d, locale, {
            month: 'short',
            day: 'numeric',
            year: Math.abs(diffInDays) > 365 ? 'numeric' : undefined,
        });
    }

    parse(date: Date | string | number): Date {
        return parseDate(date);
    }

    formatDuration(milliseconds: number): string {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const parts: string[] = [];

        if (days > 0) {
            parts.push(`${days}d`);
        }

        const remainingHours = hours % 24;
        if (remainingHours > 0) {
            parts.push(`${remainingHours}h`);
        }

        const remainingMinutes = minutes % 60;
        if (remainingMinutes > 0) {
            parts.push(`${remainingMinutes}m`);
        }

        const remainingSeconds = seconds % 60;
        if (remainingSeconds > 0 || parts.length === 0) {
            parts.push(`${remainingSeconds}s`);
        }

        return parts.join(' ');
    }

    /**
     * Format time as minutes:seconds (e.g., "3:45", "12:05")
     * @param seconds - Time in seconds
     * @returns Formatted time string
     */
    formatTimeShort(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Format date with relative time labels (Today, Yesterday, X days ago, X weeks ago)
     * @param date - Date to format
     * @param locale - Locale code
     * @param translations - Optional translations for "Today", "Yesterday", "days ago", "weeks ago"
     * @returns Formatted relative date string
     */
    formatRelativeDate(
        date: Date | string | number,
        locale: string,
        translations?: {
            today?: string;
            yesterday?: string;
            daysAgo?: string;
            weeksAgo?: string;
        }
    ): string {
        const d = this.parse(date);
        const now = new Date();

        // Check for today (today at midnight vs date at midnight)
        const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const daysDiff = Math.floor((todayDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            return translations?.today || this.getDefaultTranslation('today', locale);
        }

        if (daysDiff === 1) {
            return translations?.yesterday || this.getDefaultTranslation('yesterday', locale);
        }

        if (daysDiff > 0 && daysDiff < 7) {
            const template = translations?.daysAgo || this.getDefaultTranslation('daysAgo', locale);
            return template.replace('{{days}}', daysDiff.toString());
        }

        if (daysDiff >= 7 && daysDiff < 30) {
            const weeks = Math.floor(daysDiff / 7);
            const template = translations?.weeksAgo || this.getDefaultTranslation('weeksAgo', locale);
            return template.replace('{{weeks}}', weeks.toString());
        }

        // Fall back to regular date format for older dates
        return this.formatDate(d, locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    /**
     * Get default translation for relative time keys
     */
    private getDefaultTranslation(key: string, locale: string): string {
        const translations: Record<string, Record<string, string>> = {
            today: {
                en: 'Today',
                tr: 'Bugün',
            },
            yesterday: {
                en: 'Yesterday',
                tr: 'Dün',
            },
            daysAgo: {
                en: '{{days}} days ago',
                tr: '{{days}} gün önce',
            },
            weeksAgo: {
                en: '{{weeks}} weeks ago',
                tr: '{{weeks}} hafta önce',
            },
        };

        return translations[key]?.[locale] || translations[key]?.en || key;
    }

    /**
     * Format date in short format (Jan 1, 2024)
     */
    formatShortDate(date: Date | string | number, locale: string): string {
        return this.formatDate(date, locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    /**
     * Alias for formatRelativeTime - more semantic name for "time ago" formatting
     */
    fromNow(date: Date | string | number, locale: string): string {
        return this.formatRelativeTime(date, locale);
    }
}

import { TimezoneInfo } from '../../domain/entities/Timezone';
import { UnifiedCache } from '../../../core/cache/domain/UnifiedCache';

/**
 * TimezoneProvider
 * Responsible for discovering device timezone and providing available timezones
 */
export class TimezoneProvider {
    private cache = new UnifiedCache<TimezoneInfo[]>({ defaultTTL: 300000 }); // 5 min cache
    /**
     * Get current device timezone using Intl API
     */
    getCurrentTimezone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    /**
     * Get current timezone offset in minutes
     */
    getTimezoneOffset(): number {
        return new Date().getTimezoneOffset() * -1;
    }

    /**
     * Get complete timezone information
     */
    getTimezoneInfo(): TimezoneInfo {
        const timezone = this.getCurrentTimezone();
        const offset = this.getTimezoneOffset();

        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'long',
        });

        const parts = formatter.formatToParts(new Date());
        const timeZoneNamePart = parts.find((part) => part.type === 'timeZoneName');
        const displayName = timeZoneNamePart?.value || timezone;

        return {
            timezone,
            offset,
            displayName,
        };
    }

    /**
     * Get list of common timezones (cached)
     * Generic implementation for all apps
     */
    getTimezones(): TimezoneInfo[] {
        const cached = this.cache.get('timezones');
        if (cached) {
            return cached;
        }

        const commonZones = [
            'UTC',
            'Europe/London',
            'Europe/Paris',
            'Europe/Istanbul',
            'America/New_York',
            'America/Los_Angeles',
            'America/Chicago',
            'Asia/Tokyo',
            'Asia/Dubai',
            'Asia/Shanghai',
            'Australia/Sydney',
        ];

        const result = commonZones.map((zone) => {
            try {
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: zone,
                    timeZoneName: 'long',
                });
                const parts = formatter.formatToParts(new Date());
                const namePart = parts.find((p) => p.type === 'timeZoneName');

                const offset = this.getTimezoneOffsetFor(zone);

                return {
                    timezone: zone,
                    displayName: namePart?.value || zone,
                    offset,
                };
            } catch {
                return {
                    timezone: zone,
                    displayName: zone,
                    offset: 0,
                };
            }
        });

        this.cache.set('timezones', result);
        return result;
    }

    /**
     * Get timezone offset for specific timezone in minutes
     */
    getTimezoneOffsetFor(timezone: string, date: Date | string | number = new Date()): number {
        try {
            const d = date instanceof Date ? date : new Date(date);

            const utcDate = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
            const tzDate = new Date(d.toLocaleString('en-US', { timeZone: timezone }));

            return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
        } catch {
            return 0;
        }
    }

    /**
     * Convert date from one timezone to another
     */
    convertTimezone(
        date: Date | string | number,
        fromTimezone: string,
        toTimezone: string,
    ): Date {
        const d = date instanceof Date ? date : new Date(date);

        const fromOffset = this.getTimezoneOffsetFor(fromTimezone, d);
        const toOffset = this.getTimezoneOffsetFor(toTimezone, d);

        const offsetDiff = toOffset - fromOffset;
        return new Date(d.getTime() + offsetDiff * 60000);
    }
}

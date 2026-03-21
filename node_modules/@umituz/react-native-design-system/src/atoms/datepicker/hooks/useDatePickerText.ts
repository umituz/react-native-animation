/**
 * useDatePickerText Hook
 * Handles date formatting and display text for date picker
 */

import { useMemo } from 'react';
import type { DatepickerMode } from '../types';

interface UseDatePickerTextProps {
  value: Date | null;
  placeholder: string;
  mode: DatepickerMode;
}

interface UseDatePickerTextResult {
  displayText: string;
  formatDate: (date: Date) => string;
}

export const useDatePickerText = ({
  value,
  placeholder,
  mode,
}: UseDatePickerTextProps): UseDatePickerTextResult => {
  /**
   * Format date based on mode
   * Uses native Date formatting (locale-aware)
   */
  const formatDate = useMemo(() => (date: Date): string => {
    if (mode === 'time') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    if (mode === 'datetime') {
      const dateStr = date.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const timeStr = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dateStr} ${timeStr}`;
    }
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [mode]);

  /**
   * Get display text for the button
   */
  const displayText = useMemo(() => {
    if (!value) return placeholder;
    return formatDate(value);
  }, [value, placeholder, formatDate]);

  return { displayText, formatDate };
};

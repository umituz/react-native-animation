/**
 * useEmojiPicker Hook
 *
 * React hook for emoji picker state management
 * Provides a clean, declarative API for emoji selection
 *
 * Features:
 * - Open/close state management
 * - Selected emoji tracking
 * - Clear/reset functionality
 * - Simple, reusable hook pattern
 *
 * USAGE:
 * ```typescript
 * import { useEmojiPicker, EmojiPicker } from '@umituz/react-native-emoji';
 *
 * const MyComponent = () => {
 *   const {
 *     isOpen,
 *     selectedEmoji,
 *     openPicker,
 *     closePicker,
 *     handleEmojiSelect,
 *     clearEmoji,
 *   } = useEmojiPicker();
 *
 *   return (
 *     <View>
 *       <TouchableOpacity onPress={openPicker}>
 *         <Text>{selectedEmoji || 'Select Emoji'}</Text>
 *       </TouchableOpacity>
 *
 *       <EmojiPicker
 *         open={isOpen}
 *         onClose={closePicker}
 *         onEmojiSelected={handleEmojiSelect}
 *       />
 *     </View>
 *   );
 * };
 * ```
 */

import { useState, useCallback } from 'react';
import type { EmojiObject } from '../../domain/entities/Emoji';

export interface UseEmojiPickerOptions {
  /** Initial emoji value */
  initialEmoji?: string;

  /** Callback when emoji is selected */
  onEmojiChange?: (emoji: string) => void;

  /** Whether to auto-close picker after selection */
  autoClose?: boolean;
}

export interface UseEmojiPickerReturn {
  /** Whether the picker is currently open */
  isOpen: boolean;

  /** Currently selected emoji (null if none) */
  selectedEmoji: string | null;

  /** Open the emoji picker */
  openPicker: () => void;

  /** Close the emoji picker */
  closePicker: () => void;

  /** Toggle picker open/closed */
  togglePicker: () => void;

  /** Handle emoji selection (use as onEmojiSelected callback) */
  handleEmojiSelect: (emojiObject: EmojiObject) => void;

  /** Clear the currently selected emoji */
  clearEmoji: () => void;

  /** Set emoji directly (without opening picker) */
  setEmoji: (emoji: string) => void;
}

/**
 * Hook for emoji picker state management
 */
export const useEmojiPicker = (
  options?: UseEmojiPickerOptions
): UseEmojiPickerReturn => {
  const { initialEmoji, onEmojiChange, autoClose = true } = options || {};

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(
    initialEmoji || null
  );

  /**
   * Open the emoji picker
   */
  const openPicker = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * Close the emoji picker
   */
  const closePicker = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Toggle picker open/closed
   */
  const togglePicker = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  /**
   * Handle emoji selection
   */
  const handleEmojiSelect = useCallback(
    (emojiObject: EmojiObject) => {
      setSelectedEmoji(emojiObject.emoji);

      // Call onChange callback if provided
      if (onEmojiChange) {
        onEmojiChange(emojiObject.emoji);
      }

      // Auto-close picker if enabled
      if (autoClose) {
        setIsOpen(false);
      }
    },
    [onEmojiChange, autoClose]
  );

  /**
   * Clear the currently selected emoji
   */
  const clearEmoji = useCallback(() => {
    setSelectedEmoji(null);
    if (onEmojiChange) {
      onEmojiChange('');
    }
  }, [onEmojiChange]);

  /**
   * Set emoji directly
   */
  const setEmoji = useCallback(
    (emoji: string) => {
      setSelectedEmoji(emoji);
      if (onEmojiChange) {
        onEmojiChange(emoji);
      }
    },
    [onEmojiChange]
  );

  return {
    isOpen,
    selectedEmoji,
    openPicker,
    closePicker,
    togglePicker,
    handleEmojiSelect,
    clearEmoji,
    setEmoji,
  };
};

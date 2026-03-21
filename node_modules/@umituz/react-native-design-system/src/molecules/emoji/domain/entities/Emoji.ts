/**
 * Emoji Domain Entities
 *
 * Core emoji types and interfaces for emoji picker functionality
 *
 * Features:
 * - Emoji selection with picker UI
 * - Emoji object with metadata (emoji string, name, slug, unicode)
 * - Category-based organization
 * - Search functionality
 * - Recent emojis tracking
 *
 * Dependencies:
 * - rn-emoji-keyboard (emoji picker UI library)
 */

/**
 * Emoji category types compatible with rn-emoji-keyboard
 */
export type EmojiCategoryType =
  | 'smileys_emotion' | 'people_body' | 'animals_nature'
  | 'food_drink' | 'travel_places' | 'activities'
  | 'objects' | 'symbols' | 'flags'
  | 'recently_used' | 'search';

/**
 * Category translation map compatible with rn-emoji-keyboard
 */
export type EmojiCategoryTranslation = { [key in EmojiCategoryType]: string };

/**
 * Emoji object returned by the picker
 * Conforms to rn-emoji-keyboard EmojiType structure
 */
export interface EmojiObject {
  /** The actual emoji character (e.g., "😀") */
  emoji: string;

  /** Human-readable name (e.g., "Grinning Face") */
  name: string;

  /** URL-friendly slug (e.g., "grinning_face") */
  slug: string;

  /** Unicode codepoint (e.g., "1F600") */
  unicode_version: string;

  /** Emoji category (e.g., "smileys_emotion") */
  category?: string;
}

/**
 * Emoji picker configuration
 */
export interface EmojiPickerConfig {
  /** Whether to show category tabs */
  enableCategoryTabs?: boolean;

  /** Whether to enable search */
  enableSearch?: boolean;

  /** Whether to show recently used emojis */
  enableRecentlyUsed?: boolean;

  /** Custom category order */
  categoryOrder?: EmojiCategoryType[];

  /** Translation object for category labels */
  translation?: EmojiCategoryTranslation;
}

/**
 * Emoji selection callback type
 */
export type EmojiSelectCallback = (emojiObject: EmojiObject) => void;

/**
 * Emoji picker categories
 * Based on Unicode emoji categories
 */
export enum EmojiCategory {
  SMILEYS_EMOTION = 'smileys_emotion',
  PEOPLE_BODY = 'people_body',
  ANIMALS_NATURE = 'animals_nature',
  FOOD_DRINK = 'food_drink',
  TRAVEL_PLACES = 'travel_places',
  ACTIVITIES = 'activities',
  OBJECTS = 'objects',
  SYMBOLS = 'symbols',
  FLAGS = 'flags',
}

/**
 * Emoji picker state
 */
export interface EmojiPickerState {
  /** Whether picker is currently open */
  isOpen: boolean;

  /** Currently selected emoji (null if none selected) */
  selectedEmoji: string | null;
}

/**
 * Emoji validation utilities
 */
export const EmojiUtils = {
  /**
   * Check if a string contains valid emoji
   * @param text - Text to validate
   * @returns True if contains emoji
   */
  isEmoji: (text: string): boolean => {
    if (!text || text.length === 0) {
      return false;
    }
    // Basic emoji regex (covers most common emojis)
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(text);
  },

  /**
   * Extract first emoji from text
   * @param text - Text containing emoji
   * @returns First emoji or empty string
   */
  extractFirstEmoji: (text: string): string => {
    const match = text.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
    return match ? match[0] : '';
  },

  /**
   * Get emoji length (handles multi-byte emojis correctly)
   * @param emoji - Emoji string
   * @returns Actual character count
   */
  getEmojiLength: (emoji: string): number => {
    return Array.from(emoji).length;
  },
} as const;

/**
 * EmojiPicker Component
 *
 * Universal emoji picker component wrapping rn-emoji-keyboard
 * Provides a clean, factory-standard interface for emoji selection
 *
 * Features:
 * - Category-based emoji selection
 * - Search functionality
 * - Recently used emojis
 * - Theme-aware styling
 * - Localization support
 *
 * Dependencies:
 * - rn-emoji-keyboard (emoji picker UI library)
 *
 * USAGE:
 * ```typescript
 * import { EmojiPicker } from '@umituz/react-native-emoji';
 *
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const [emoji, setEmoji] = useState('');
 *
 *   const handleEmojiSelect = (emojiObject: EmojiObject) => {
 *     setEmoji(emojiObject.emoji);
 *     setIsOpen(false);
 *   };
 *
 *   return (
 *     <>
 *       <TouchableOpacity onPress={() => setIsOpen(true)}>
 *         <Text>{emoji || 'Select Emoji'}</Text>
 *       </TouchableOpacity>
 *
 *       <EmojiPicker
 *         open={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         onEmojiSelected={handleEmojiSelect}
 *       />
 *     </>
 *   );
 * };
 * ```
 */

import React from 'react';
import RNEmojiKeyboard, { EmojiType } from 'rn-emoji-keyboard';
import type { EmojiObject, EmojiPickerConfig } from '../../domain/entities/Emoji';

export interface EmojiPickerProps {
  /** Whether the picker is currently open */
  open: boolean;

  /** Callback when picker is closed */
  onClose: () => void;

  /** Callback when an emoji is selected */
  onEmojiSelected: (emojiObject: EmojiObject) => void;

  /** Optional configuration */
  config?: EmojiPickerConfig;
}

/**
 * Universal emoji picker component
 * Wraps rn-emoji-keyboard with factory-standard interface
 */
export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  open,
  onClose,
  onEmojiSelected,
  config,
}) => {
  const handleEmojiSelect = (emojiObject: EmojiType) => {
    // Map rn-emoji-keyboard EmojiType to our EmojiObject interface
    const mappedEmoji: EmojiObject = {
      emoji: emojiObject.emoji,
      name: emojiObject.name,
      slug: emojiObject.slug,
      unicode_version: emojiObject.unicode_version,
    };

    onEmojiSelected(mappedEmoji);
  };

  return (
    <RNEmojiKeyboard
      onEmojiSelected={handleEmojiSelect}
      open={open}
      onClose={onClose}
      categoryPosition="top"
      enableRecentlyUsed={config?.enableRecentlyUsed ?? true}
      enableSearchBar={config?.enableSearch ?? true}
      enableCategoryChangeGesture={config?.enableCategoryTabs ?? true}
      categoryOrder={config?.categoryOrder}
      translation={config?.translation}
    />
  );
};

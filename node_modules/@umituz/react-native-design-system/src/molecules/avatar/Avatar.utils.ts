/**
 * Avatar Utilities
 * Utility class for avatar operations
 * Supports images, initials, icons with Turkish character support
 */

import type { AvatarShape, AvatarConfig } from './Avatar.types';
import { AVATAR_COLORS, STATUS_COLORS, SHAPE_CONFIGS } from '../../constants';

/**
 * Avatar utility class
 */
export class AvatarUtils {
  /**
   * Generate initials from name
   * Supports Turkish characters (Ümit Uz → ÜU)
   */
  static generateInitials(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return '?';

    const words = trimmed.split(/\s+/);

    if (words.length >= 2) {
      // Full name: First letter of first + first letter of last
      const firstWord = words[0] ?? '';
      const lastWord = words[words.length - 1] ?? '';
      const first = firstWord[0] ?? '';
      const last = lastWord[0] ?? '';
      return (first + last).toLocaleUpperCase('tr-TR') || '?';
    } else {
      // Single word: First 2 letters
      return trimmed.slice(0, 2).toLocaleUpperCase('tr-TR');
    }
  }

  /**
   * Generate initials from email
   * umit@example.com → UE
   */
  static generateInitialsFromEmail(email: string): string {
    const trimmed = email.trim();
    if (!trimmed) return '?';

    const [username] = trimmed.split('@');
    if (!username) return '?';

    return username.slice(0, 2).toLocaleUpperCase('tr-TR');
  }

  /**
   * Hash string to number (for consistent color assignment)
   */
  static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  /**
   * Get consistent color for name
   * Same name always returns same color
   */
  static getColorForName(name: string): string {
    if (!name) return AVATAR_COLORS[0];

    const hash = this.hashString(name);
    return AVATAR_COLORS[hash % AVATAR_COLORS.length] ?? AVATAR_COLORS[0];
  }

  /**
   * Get border radius for shape
   */
  static getBorderRadius(shape: AvatarShape, size: number): number {
    if (shape === 'circle') {
      return size / 2;
    }
    return SHAPE_CONFIGS[shape] ?? 0;
  }

  /**
   * Get status color
   */
  static getStatusColor(status: 'online' | 'offline' | 'away' | 'busy'): string {
    return STATUS_COLORS[status] ?? STATUS_COLORS.offline;
  }

  /**
   * Validate avatar config
   */
  static validateConfig(config: Partial<AvatarConfig>): AvatarConfig {
    return {
      type: config.type || 'initials',
      size: config.size || 'md',
      shape: config.shape || 'circle',
      uri: config.uri,
      name: config.name,
      icon: config.icon,
      backgroundColor: config.backgroundColor,
      showStatus: config.showStatus ?? false,
      status: config.status,
    };
  }

  /**
   * Check if avatar has image
   */
  static hasImage(config: AvatarConfig): boolean {
    return config.type === 'image' && !!config.uri;
  }

  /**
   * Check if avatar has initials
   */
  static hasInitials(config: AvatarConfig): boolean {
    return config.type === 'initials' && !!config.name;
  }

  /**
   * Check if avatar has icon
   */
  static hasIcon(config: AvatarConfig): boolean {
    return config.type === 'icon' && !!config.icon;
  }
}

/**
 * Typography Types - Material Design 3 Text Style Variants
 * 
 * This file defines all typography-related types for React Native applications.
 * These types are used by components like AtomicText to ensure type-safe typography usage.
 * 
 * @fileoverview Provides type definitions for Material Design 3 typography system
 * @author Ümit UZ <umit@umituz.com>
 * @since 1.0.0
 * @version 1.2.0
 */

/**
 * Material Design 3 Text Style Variants
 * 
 * These variants correspond to Material Design 3 typography scale:
 * - Display: Largest text (57px, 45px, 36px)
 * - Headline: Section headers (32px, 28px, 24px)
 * - Title: Card titles, list headers (22px, 16px, 14px)
 * - Body: Main content text (16px, 14px, 12px)
 * - Label: UI labels, buttons (14px, 12px, 11px)
 */
export type TextStyleVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

/**
 * Material Design 3 Text Color Variants
 * 
 * TEXT COLORS (for text on surfaces):
 * - textPrimary, textSecondary, textTertiary: General text colors
 * - onSurface, onBackground: Text on surface/background
 * 
 * ON COLORS (for text on colored backgrounds):
 * - onPrimary, onSecondary: Text on primary/secondary colored backgrounds
 * - onSuccess, onError, onWarning, onInfo: Text on semantic colored backgrounds
 * 
 * SEMANTIC COLORS (can be used as text colors):
 * - success, error, warning, info: Semantic colors (can be text or background)
 * 
 * NOTE: 'primary' and 'secondary' are BACKGROUND colors, not text colors.
 * Use 'onPrimary'/'onSecondary' for text on colored backgrounds, or
 * 'textPrimary'/'textSecondary' for general text.
 */
export type ColorVariant =
  // General text colors (Material Design 3)
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'textDisabled'
  | 'textInverse'
  // Text on surfaces (Material Design 3)
  | 'onSurface'
  | 'onBackground'
  // Text on colored backgrounds (Material Design 3)
  | 'onPrimary'
  | 'onSecondary'
  | 'onSuccess'
  | 'onError'
  | 'onWarning'
  | 'onInfo'
  // Semantic colors (can be used as text)
  | 'success'
  | 'error'
  | 'warning'
  | 'info';


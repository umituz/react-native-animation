/**
 * FormContainer Component
 *
 * A reusable container for forms with proper keyboard handling and responsive layout.
 *
 * Features:
 * - Pure React Native implementation (no Paper dependency)
 * - Universal keyboard handling (no platform-specific code)
 * - ScrollView with automatic content padding
 * - Safe area insets for bottom tab navigation overlap
 * - Responsive max width for large screens (tablets)
 * - Consistent vertical spacing between form elements
 * - Theme-aware surface colors
 * - Optimized performance with memoized styles
 *
 * Usage:
 * ```tsx
 * <FormContainer>
 *   <AtomicInput label="Name" value={name} onChangeText={setName} />
 *   <AtomicTextArea label="Description" value={desc} onChangeText={setDesc} />
 *   <AtomicButton variant="primary" onPress={handleSubmit}>
 *     Submit
 *   </AtomicButton>
 * </FormContainer>
 * ```
 *
 * Why This Component:
 * - Prevents keyboard from covering input fields (universal solution)
 * - Handles safe area (notch, bottom tabs) automatically
 * - Consistent form layout across all 100+ generated apps
 * - Responsive design for tablets (max 700px) and phones (full width)
 * - Automatic vertical spacing between form elements (no manual marginBottom)
 * - Reduces boilerplate in form screens
 * - Universal code - no platform checks, works on iOS, Android, Web
 *
 * Technical Details:
 * - Uses ScrollView with contentContainerStyle for keyboard handling
 * - Pure React Native View for surface (lightweight)
 * - Vertical spacing via Children.map() wrapping (universal compatibility)
 * - Safe area insets from react-native-safe-area-context
 * - Responsive values from useResponsive hook
 *
 * @module FormContainer
 */

import React, { useMemo } from 'react';
import {
  ScrollView,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from '../safe-area';
import { useAppDesignTokens } from '../theme';
import { useResponsive } from '../responsive';

/**
 * Props for FormContainer component
 */
export interface FormContainerProps {
  /** Form content (inputs, buttons, etc.) */
  children: React.ReactNode;
  /** Container style override (for outer View) */
  containerStyle?: StyleProp<ViewStyle>;
  /** Content container style override (for ScrollView content) */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Show vertical scroll indicator */
  showsVerticalScrollIndicator?: boolean;
  /** Optional test ID for E2E testing */
  testID?: string;
  /** Show surface border (default: true) */
  showBorder?: boolean;
  /** Accessibility label for the container */
  accessibilityLabel?: string;
  /** Accessibility hint for the container */
  accessibilityHint?: string;
  /** Whether the container is accessible */
  accessible?: boolean;
}

/**
 * FormContainer - Universal form wrapper component
 *
 * Wraps forms with:
 * - Pure React Native surface
 * - Universal keyboard handling (no platform checks)
 * - ScrollView for content overflow
 * - Safe area insets (bottom tabs, notch)
 * - Responsive max width (tablets)
 * - Theme integration
 */
export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  containerStyle,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  testID,
  showBorder = true,
  accessibilityLabel,
  accessibilityHint,
  accessible,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { maxContentWidth, bottomPosition } = useResponsive();
  const formContentWidth = maxContentWidth;
  const formBottomPadding = bottomPosition;
  const formElementSpacing = tokens.spacing.lg;

  // Create styles for form container (memoized to avoid re-creation on every render)
  const styles = useMemo(
    () => ({
      container: {
        flex: 1,
        backgroundColor: tokens.colors.backgroundPrimary,
      },
      surface: {
        flex: 1,
        backgroundColor: tokens.colors.surface,
        borderWidth: showBorder ? 1 : 0,
        borderColor: tokens.colors.border,
        borderRadius: tokens.borders.radius.md,
      },
      scrollView: {
        flex: 1,
      },
      contentContainer: {
        flexGrow: 1,
        padding: tokens.spacing.lg,
        paddingTop: tokens.spacing.xl,
        paddingBottom: formBottomPadding + insets.bottom,
        maxWidth: formContentWidth,
        alignSelf: 'center' as const,
        width: '100%' as const,
        gap: formElementSpacing,
      },
    }),
    [tokens, showBorder, formBottomPadding, insets.bottom, formContentWidth, formElementSpacing],
  );

  return (
    <View
      style={[styles.container, containerStyle]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessible={accessible !== false}
    >
      <View style={styles.surface}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          testID={testID ? `${testID}-scroll` : undefined}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

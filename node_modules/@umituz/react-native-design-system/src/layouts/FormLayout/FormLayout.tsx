/**
 * FormLayout - Responsive Form Container
 *
 * Organism for creating responsive forms with consistent spacing
 * Automatically handles keyboard avoidance and scrolling
 */

import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { useResponsive } from '../../responsive';
import { AtomicKeyboardAvoidingView } from '../../atoms';

export interface FormLayoutProps {
  /** Form fields and content */
  children: React.ReactNode;

  /** Footer content (e.g., submit button) */
  footer?: React.ReactNode;

  /** Form container style */
  style?: StyleProp<ViewStyle>;

  /** Disable keyboard avoiding behavior */
  disableKeyboardAvoid?: boolean;

  /** Disable scroll */
  disableScroll?: boolean;

  /** Test ID */
  testID?: string;

  /** Accessibility label for the form */
  accessibilityLabel?: string;

  /** Accessibility hint for the form */
  accessibilityHint?: string;

  /** Whether the form is accessible */
  accessible?: boolean;
}

/**
 * Responsive form layout with keyboard avoidance
 *
 * @example
 * ```tsx
 * <FormLayout
 *   footer={<AtomicButton title="Submit" onPress={handleSubmit} />}
 * >
 *   <FormField label="Name" value={name} onChangeText={setName} />
 *   <FormField label="Email" value={email} onChangeText={setEmail} />
 * </FormLayout>
 * ```
 */
export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  footer,
  style,
  disableKeyboardAvoid = false,
  disableScroll = false,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessible,
}) => {
  const tokens = useAppDesignTokens();
  const { insets } = useResponsive();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        scrollContent: {
          flexGrow: 1,
          paddingHorizontal: tokens.spacing.screenPadding,
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing.xl,
        },
        formContent: {
          gap: tokens.spacing.lg,
        },
        footer: {
          paddingHorizontal: tokens.spacing.screenPadding,
          paddingBottom: Math.max(insets.bottom, tokens.spacing.md),
          paddingTop: tokens.spacing.md,
          backgroundColor: tokens.colors.surface,
          borderTopWidth: 1,
          borderTopColor: tokens.colors.border,
        },
      }),
    [tokens, insets.bottom]
  );

  const content = (
    <View
      style={styles.formContent}
      testID={testID}
      accessibilityLabel={accessibilityLabel || "Form"}
      accessibilityHint={accessibilityHint}
      accessible={accessible !== false}
    >
      {children}
    </View>
  );

  const scrollableContent = disableScroll ? (
    <View style={styles.scrollContent}>{content}</View>
  ) : (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  );

  const mainContent = disableKeyboardAvoid ? (
    scrollableContent
  ) : (
    <AtomicKeyboardAvoidingView style={styles.container}>
      {scrollableContent}
    </AtomicKeyboardAvoidingView>
  );

  return (
    <View style={[styles.container, style]}>
      {mainContent}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

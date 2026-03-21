/**
 * ScreenLayout Component
 */

import React, { useMemo } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, type StyleProp, type ViewStyle, type AccessibilityRole, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens } from '../../theme';
import { getScreenLayoutConfig } from '../../responsive/responsiveLayout';
import { getScreenLayoutStyles } from './styles/screenLayoutStyles';

export interface ScreenLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
  hideScrollIndicator?: boolean;
  keyboardAvoiding?: boolean;
  keyboardVerticalOffset?: number;
  maxWidth?: number;
  fullWidth?: boolean;
  refreshControl?: any;
  accessibilityLabel?: string;
  accessible?: boolean;
}

// Lazy-load react-native-keyboard-controller (optional peer dep).
// Falls back to React Native's built-in components when not installed.
let KCKeyboardAvoidingView: React.ComponentType<any> | null = null;
let KCKeyboardAwareScrollView: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const kc = require('react-native-keyboard-controller');
  KCKeyboardAvoidingView = kc.KeyboardAvoidingView ?? null;
  KCKeyboardAwareScrollView = kc.KeyboardAwareScrollView ?? null;
} catch {
  // react-native-keyboard-controller not installed — using RN built-ins
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = (props: ScreenLayoutProps) => {
  const {
    children,
    scrollable = false,
    edges = ['top', 'bottom', 'left', 'right'],
    header,
    footer,
    backgroundColor,
    containerStyle,
    contentContainerStyle,
    testID,
    hideScrollIndicator = false,
    keyboardAvoiding = false,
    keyboardVerticalOffset = 0,
    maxWidth,
    fullWidth = false,
    refreshControl,
    accessibilityLabel,
    accessible,
  } = props;

  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const layoutConfig = useMemo(() => getScreenLayoutConfig(insets), [insets]);

  // fullWidth=true disables maxWidth (useful for paginated FlatLists and full-bleed layouts)
  const finalMaxWidth = fullWidth ? undefined : (maxWidth || layoutConfig.maxContentWidth);
  const horizontalPadding = layoutConfig.horizontalPadding;
  const verticalPadding = layoutConfig.verticalPadding;

  const styles = useMemo(
    () => getScreenLayoutStyles({ maxWidth: finalMaxWidth, horizontalPadding, verticalPadding }),
    [finalMaxWidth, horizontalPadding, verticalPadding],
  );

  const bgColor = backgroundColor || tokens.colors.backgroundPrimary;

  const paddingTop = edges.includes('top') ? insets.top : 0;
  const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;
  const paddingLeft = edges.includes('left') ? insets.left : 0;
  const paddingRight = edges.includes('right') ? insets.right : 0;

  // Scroll component: prefer KeyboardAwareScrollView (keyboard-controller) over plain ScrollView.
  // KeyboardAwareScrollView automatically keeps focused TextInput above the keyboard
  // without needing a separate KeyboardAvoidingView wrapper.
  const ScrollComponent = KCKeyboardAwareScrollView ?? ScrollView;

  const content = (
    <View
      style={[
        styles.responsiveWrapper,
        {
          paddingTop,
          paddingBottom: footer ? 0 : paddingBottom,
          paddingLeft,
          paddingRight,
        },
      ]}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible !== false}
    >
      {header}
      {scrollable ? (
        <ScrollComponent
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={!hideScrollIndicator}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
          {...(KCKeyboardAwareScrollView ? { bottomOffset: 16 } : {})}
        >
          {children}
        </ScrollComponent>
      ) : (
        <View style={[styles.scrollView, contentContainerStyle]}>
          {children}
        </View>
      )}
      {footer && <View style={{ paddingBottom }}>{footer}</View>}
    </View>
  );

  // Keyboard avoiding wrapper: prefer keyboard-controller's KAV (consistent iOS+Android)
  // over React Native's built-in (iOS-only reliable).
  // Only used when keyboardAvoiding={true} — screens that manage their own keyboard
  // handling (e.g. ChatScreen) should NOT set this prop.
  if (keyboardAvoiding) {
    const KAV = KCKeyboardAvoidingView ?? KeyboardAvoidingView;
    return (
      <View
        style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessible={accessible !== false}
      >
        <KAV
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          {content}
        </KAV>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible !== false}
    >
      <View style={styles.keyboardAvoidingView}>{content}</View>
    </View>
  );
};

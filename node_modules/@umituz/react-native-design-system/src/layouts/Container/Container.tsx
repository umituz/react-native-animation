/**
 * Container - Max-Width Content Container (Molecule)
 *
 * Centers content with responsive max-width based on device
 * Prevents content from being too wide on tablets
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useResponsive } from '../../responsive';
import { useAppDesignTokens } from '../../theme';

export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;

  /** Maximum width (default: responsive based on device) */
  maxWidth?: number;

  /** Horizontal padding (uses responsive tokens) */
  padding?: boolean;

  /** Center content horizontally */
  center?: boolean;

  /** Container style */
  style?: StyleProp<ViewStyle>;

  /** Test ID */
  testID?: string;

  /** Accessibility label for the container */
  accessibilityLabel?: string;

  /** Accessibility role for the container */
  accessibilityRole?: 'region' | 'section' | 'article';

  /** Whether the container is accessible */
  accessible?: boolean;
}

/**
 * Responsive container with max-width
 *
 * @example
 * ```tsx
 * <Container maxWidth={600} padding center>
 *   <Text>Centered content with max width</Text>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth,
  padding = true,
  center = true,
  style,
  testID,
  accessibilityLabel,
  accessibilityRole = 'region',
  accessible,
}) => {
  const { maxContentWidth } = useResponsive();
  const tokens = useAppDesignTokens();

  const containerWidth = maxWidth || maxContentWidth;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          maxWidth: containerWidth,
          ...(center && { alignSelf: 'center' }),
          ...(padding && {
            paddingHorizontal: tokens.spacing.screenPadding,
          }),
        },
      }),
    [containerWidth, center, padding, tokens.spacing.screenPadding]
  );

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole as any}
      accessible={accessible !== false}
    >
      {children}
    </View>
  );
};

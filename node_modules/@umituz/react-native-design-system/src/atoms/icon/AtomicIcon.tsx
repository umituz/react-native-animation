/**
 * AtomicIcon - Agnostic Icon Component
 *
 * This component is completely icon-library agnostic.
 * Apps MUST provide their own icon renderer via DesignSystemProvider.
 *
 * @example
 * // In your app, provide an icon renderer:
 * import { MaterialIcons } from '@expo/vector-icons';
 *
 * <DesignSystemProvider
 *   iconRenderer={({ name, size, color }) => (
 *     <MaterialIcons name={name} size={size} color={color} />
 *   )}
 * >
 *   <App />
 * </DesignSystemProvider>
 *
 * // Then use AtomicIcon anywhere:
 * <AtomicIcon name="favorite" size="md" color="primary" />
 */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme/hooks/useAppDesignTokens';
import { useIconRenderer } from './iconStore';
import {
  type IconSize as BaseIconSize,
  type IconColor,
} from './AtomicIcon.types';
import {
  calculateIconSize,
  calculateIconColor,
} from './utils/iconUtils';
import {
  renderSvgIcon,
  renderWithBackground,
  buildIconRenderProps,
} from './components/iconRenderer';

export type IconSize = BaseIconSize;
export type IconName = string;
export type { IconColor };

export interface AtomicIconProps {
  /** Icon name - interpreted by the app's icon renderer */
  name?: string;
  /** Semantic size preset */
  size?: IconSize;
  /** Custom size in pixels (overrides size) */
  customSize?: number;
  /** Semantic color from theme */
  color?: IconColor;
  /** Custom color (overrides color) */
  customColor?: string;
  /** Custom SVG path for inline SVG icons */
  svgPath?: string;
  /** ViewBox for custom SVG (default: 0 0 24 24) */
  svgViewBox?: string;
  /** Add circular background */
  withBackground?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility role */
  accessibilityRole?: import('react-native').AccessibilityRole;
  /** Test ID */
  testID?: string;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * Agnostic icon component - requires iconRenderer in DesignSystemProvider
 */
export const AtomicIcon: React.FC<AtomicIconProps> = React.memo(
  ({
    name,
    size = 'md',
    customSize,
    color,
    customColor,
    withBackground = false,
    backgroundColor,
    svgPath,
    svgViewBox = '0 0 24 24',
    accessibilityLabel,
    accessibilityRole,
    testID,
    style,
  }) => {
    const tokens = useAppDesignTokens();
    const iconRenderer = useIconRenderer();

    // Calculate size and color using utility functions
    const sizeInPixels = calculateIconSize(size, customSize, tokens);
    const iconColor = calculateIconColor(customColor, color, tokens);

    // SVG path rendering (built-in, no external dependency)
    if (svgPath) {
      const svgElement = renderSvgIcon(
        svgPath,
        svgViewBox,
        sizeInPixels,
        iconColor,
        testID,
        accessibilityLabel,
        accessibilityRole
      );

      if (withBackground) {
        return renderWithBackground(
          svgElement,
          sizeInPixels,
          backgroundColor || tokens.colors.surfaceVariant,
          style,
          testID,
          accessibilityLabel,
          accessibilityRole
        );
      }

      return svgElement;
    }

    // No icon renderer provided - warn in dev and render nothing
    if (!iconRenderer) {
      if (__DEV__) {
        console.error(
          '[DesignSystem] ❌ AtomicIcon: No iconRenderer configured!\n' +
            `Attempted to render icon: "${name}"\n` +
            'Fix: Provide iconRenderer to DesignSystemProvider.\n' +
            'Example:\n' +
            '<DesignSystemProvider\n' +
            '  iconRenderer={({ name, size, color }) => (\n' +
            '    <YourIconLibrary name={name} size={size} color={color} />\n' +
            '  )}\n' +
            '>'
        );
      }
      return null;
    }

    // Build render props and render icon
    const renderProps = buildIconRenderProps(
      name || '',
      sizeInPixels,
      iconColor,
      style,
      testID,
      accessibilityLabel,
      accessibilityRole
    );

    const iconElement = iconRenderer(renderProps);

    if (withBackground) {
      return renderWithBackground(
        iconElement,
        sizeInPixels,
        backgroundColor || tokens.colors.surfaceVariant,
        style,
        testID,
        accessibilityLabel,
        accessibilityRole
      );
    }

    return <>{iconElement}</>;
  }
);

AtomicIcon.displayName = 'AtomicIcon';

/**
 * AtomicChip Component
 * Refactored: Extracted configs, styles, and types
 */

import React, { useMemo } from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { AtomicText } from '../AtomicText';
import { AtomicIcon } from '../icon';
import { useAppDesignTokens } from '../../theme';
import { getChipSizeConfig } from './configs/chipSizeConfig';
import { getChipColorConfig } from './configs/chipColorConfig';
import { getChipBorderStyle, getChipSelectedStyle } from './styles/chipStyles';
import type { AtomicChipProps } from './types';

export const AtomicChip: React.FC<AtomicChipProps> = React.memo(({
  children,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  backgroundColor,
  textColor,
  borderColor,
  leadingIcon,
  trailingIcon,
  clickable = false,
  onPress,
  selected = false,
  disabled = false,
  style,
  testID,
  activeOpacity = 0.7,
}) => {
  const tokens = useAppDesignTokens();

  const sizeConfig = useMemo(() => getChipSizeConfig(size, tokens), [size, tokens]);
  const colorConfig = useMemo(() => getChipColorConfig(color, variant, tokens), [color, variant, tokens]);
  const borderStyle = useMemo(() => getChipBorderStyle(variant, tokens), [variant, tokens]);
  const selectedStyle = useMemo(() => getChipSelectedStyle(selected, tokens), [selected, tokens]);

  // Apply custom colors if provided
  const finalBackgroundColor = backgroundColor || colorConfig.bg;
  const finalTextColor = textColor || colorConfig.text;
  const finalBorderColor = borderColor || colorConfig.border;

  // Handle disabled state
  const isDisabled = disabled || (!clickable && !onPress);
  const opacity = isDisabled ? 0.5 : 1;

  const chipStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizeConfig.paddingHorizontal,
    paddingVertical: sizeConfig.paddingVertical,
    backgroundColor: finalBackgroundColor,
    opacity,
    ...borderStyle,
    borderColor: finalBorderColor,
    ...selectedStyle,
  }), [sizeConfig, finalBackgroundColor, opacity, borderStyle, finalBorderColor, selectedStyle]);

  const textStyle = useMemo(() => ({
    fontSize: sizeConfig.fontSize,
    fontWeight: tokens.typography.medium,
  }), [sizeConfig.fontSize, tokens.typography.medium]);

  const iconColor = finalTextColor;

  const isInteractive = clickable && onPress && !disabled;
  const Component = isInteractive ? TouchableOpacity : View;
  const componentProps = isInteractive ? { onPress, activeOpacity } : {};
  const accessibilityProps = isInteractive
    ? { accessibilityRole: 'button' as const, accessibilityState: { selected, disabled } }
    : {};

  return (
    <Component
      style={[chipStyle, style]}
      testID={testID}
      {...componentProps}
      {...accessibilityProps}
    >
      {leadingIcon && (
        <AtomicIcon
          name={leadingIcon}
          size={sizeConfig.iconSize}
          customColor={iconColor}
          style={{ marginRight: tokens.spacing.xs }}
        />
      )}
      <AtomicText
        type="labelMedium"
        color={finalTextColor}
        style={textStyle}
      >
        {children}
      </AtomicText>
      {trailingIcon && (
        <AtomicIcon
          name={trailingIcon}
          size={sizeConfig.iconSize}
          customColor={iconColor}
          style={{ marginLeft: tokens.spacing.xs }}
        />
      )}
    </Component>
  );
});

AtomicChip.displayName = 'AtomicChip';

// Re-export types for convenience
export type { AtomicChipProps, ChipVariant, ChipSize, ChipColor } from './types';

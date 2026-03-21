import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText, AtomicIcon } from '../atoms';
import { ListItemProps } from './listitem/types';
import { getListItemStyles } from './listitem/styles/listItemStyles';

// SVG paths for common icons (work without external icon library)
const ICON_PATHS: Record<string, string> = {
  'globe': "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  'chevron-forward': "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
};

export type { ListItemProps };

export const ListItem = React.memo<ListItemProps>(({ title, subtitle, leftIcon, rightIcon, onPress, disabled = false, style }) => {
  const tokens = useAppDesignTokens();
  const listItemStyles = getListItemStyles(tokens);
  const Component = onPress ? TouchableOpacity : View;

  const accessibilityProps = useMemo(
    () => (onPress
      ? {
          accessibilityRole: 'button' as const,
          accessibilityLabel: title,
          accessibilityState: { disabled } as const,
        }
      : {}),
    [onPress, title, disabled]
  );

  const rightIconStyle = useMemo(
    () => ({ marginLeft: tokens.spacing.md }),
    [tokens.spacing.md]
  );

  return (
    <Component
      style={[listItemStyles.container, disabled ? listItemStyles.disabled : undefined, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...accessibilityProps}
    >
      {leftIcon && (
        <AtomicIcon
          svgPath={ICON_PATHS[leftIcon] || undefined}
          name={!ICON_PATHS[leftIcon] ? leftIcon : undefined}
          color={disabled ? 'surfaceVariant' : 'primary'}
          size="md"
          style={listItemStyles.iconContainer}
        />
      )}
      <View style={listItemStyles.content}>
        <AtomicText type="bodyLarge" color={disabled ? 'surfaceVariant' : 'onSurface'} numberOfLines={1}>{title}</AtomicText>
        {subtitle && <AtomicText type="bodySmall" color="surfaceVariant" numberOfLines={2} style={listItemStyles.subtitle}>{subtitle}</AtomicText>}
      </View>
      {rightIcon && onPress && (
        <AtomicIcon
          svgPath={ICON_PATHS[rightIcon] || undefined}
          name={!ICON_PATHS[rightIcon] ? rightIcon : undefined}
          color="surfaceVariant"
          size="sm"
          style={rightIconStyle}
        />
      )}
    </Component>
  );
});

/**
 * AtomicSwitch - Toggle Switch Component
 *
 * Atomic Design Level: ATOM
 * Purpose: Boolean toggle across all apps
 */

import React, { useMemo } from 'react';
import { View, Switch, StyleSheet, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText } from './AtomicText';

export interface AtomicSwitchProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  description?: string;
  style?: ViewStyle;
  testID?: string;
}

export const AtomicSwitch: React.FC<AtomicSwitchProps> = ({
  label,
  value,
  onValueChange,
  disabled = false,
  description,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const labelStyle = useMemo(() => ({ color: tokens.colors.textPrimary }), [tokens.colors.textPrimary]);
  const descriptionStyle = useMemo(() => ({ color: tokens.colors.textSecondary, marginTop: 2 }), [tokens.colors.textSecondary]);
  const trackColor = useMemo(() => ({ false: tokens.colors.border, true: tokens.colors.primary }), [tokens.colors.border, tokens.colors.primary]);

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.row}>
        {label && (
          <View style={styles.labelContainer}>
            <AtomicText
              type="bodyMedium"
              style={labelStyle}
            >
              {label}
            </AtomicText>
            {description && (
              <AtomicText
                type="bodySmall"
                style={descriptionStyle}
              >
                {description}
              </AtomicText>
            )}
          </View>
        )}
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={trackColor}
          thumbColor={value ? tokens.colors.onPrimary : tokens.colors.surface}
          accessibilityRole="switch"
          accessibilityLabel={label}
          accessibilityState={{ checked: value, disabled }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flex: 1,
    marginRight: 16,
  },
});

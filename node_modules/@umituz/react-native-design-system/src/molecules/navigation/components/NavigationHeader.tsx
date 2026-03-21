import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AtomicText } from '../../../atoms';
import { AtomicIcon, useIconName } from '../../../atoms';
import { useAppDesignTokens } from '../../../theme';
import { useSafeAreaInsets } from '../../../safe-area';
import { calculateResponsiveSize } from '../../../responsive';
import { NAVIGATION } from '../../../constants';

export interface NavigationHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  centerTitle?: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  onBackPress,
  rightElement,
  centerTitle = true,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const arrowLeftIcon = useIconName('arrowLeft');
  const spacingMultiplier = tokens.spacingMultiplier;

  const styles = useMemo(() => ({
    container: {
      paddingTop: insets.top,
      paddingHorizontal: tokens.spacing.md,
      paddingBottom: tokens.spacing.sm,
      backgroundColor: tokens.colors.backgroundPrimary,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.outlineVariant,
      zIndex: 100,
    },
    backButton: {
      marginRight: tokens.spacing.md,
      width: calculateResponsiveSize(NAVIGATION.backButton.width, spacingMultiplier),
      height: calculateResponsiveSize(NAVIGATION.backButton.height, spacingMultiplier),
      borderRadius: tokens.borders.radius.full,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      backgroundColor: tokens.colors.surfaceVariant,
    },
    title: {
      flex: 1,
      textAlign: (centerTitle ? 'center' : 'left') as 'center' | 'left',
    },
    sideElement: {
      width: centerTitle ? calculateResponsiveSize(40, spacingMultiplier) : 'auto' as const,
    }
  }), [tokens, insets, centerTitle, spacingMultiplier]);

  return (
    <View style={styles.container}>
      {onBackPress ? (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <AtomicIcon
            name={arrowLeftIcon}
            size="md"
            color="textPrimary"
          />
        </TouchableOpacity>
      ) : centerTitle ? (
        <View style={styles.sideElement} />
      ) : null}

      <AtomicText
        type="titleLarge"
        color="textPrimary"
        numberOfLines={1}
        align={centerTitle ? 'center' : 'left'}
        style={styles.title}
      >
        {title}
      </AtomicText>

      {rightElement ? (
        <View style={styles.sideElement}>
          {rightElement}
        </View>
      ) : centerTitle ? (
        <View style={styles.sideElement} />
      ) : null}
    </View>
  );
};

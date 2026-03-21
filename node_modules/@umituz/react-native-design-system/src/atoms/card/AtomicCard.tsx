/**
 * AtomicCard
 *
 * Unified card component that handles base card states, media, info, and glowing effects.
 * Replaces InfoCard, MediaCard, and GlowingCard molecules.
 */

import React, { useMemo, useCallback } from 'react';
import {
  View,
  Pressable,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { AtomicImage } from '../image/AtomicImage';
import { AtomicText } from '../AtomicText';
import { AtomicIcon, useIconName } from '../icon';
import { useAppDesignTokens } from '../../theme';
import { getCardVariantStyles, cardStyles } from './styles/cardStyles';
import { getCardPadding } from './configs/cardPaddingConfig';
import type { AtomicCardProps } from './types';

interface CardContentProps {
  badge?: string;
  image?: AtomicCardProps['image'];
  imageAspectRatio: number;
  selected: boolean;
  checkCircleIcon: string;
  paddingValue: number;
  title?: string;
  subtitle?: string;
  description?: string;
  leftIcon?: string;
  rightIcon?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = React.memo(({
  badge,
  image,
  imageAspectRatio,
  selected,
  checkCircleIcon,
  paddingValue,
  title,
  subtitle,
  description,
  leftIcon,
  rightIcon,
  titleStyle,
  subtitleStyle,
  descriptionStyle,
  children,
}) => {
  const tokens = useAppDesignTokens();

  const badgeStyle = useMemo(() => [
    cardStyles.badge,
    { backgroundColor: tokens.colors.primary },
  ], [cardStyles.badge, tokens.colors.primary]);

  const imageStyle = useMemo(() => [
    cardStyles.image,
    { aspectRatio: imageAspectRatio },
  ], [cardStyles.image, imageAspectRatio]);

  const contentContainerStyle = useMemo(() => ({
    padding: paddingValue,
  }), [paddingValue]);

  const leftIconStyle = useMemo(() => ({ marginRight: 8 }), []);

  const rightIconStyle = useMemo(() => ({ marginLeft: 8 }), []);

  return (
    <>
      {badge && (
        <View style={badgeStyle}>
          <AtomicText type="labelSmall" color="onPrimary">
            {badge}
          </AtomicText>
        </View>
      )}

      {image && (
        <AtomicImage
          source={typeof image === 'string' ? { uri: image } : image}
          style={imageStyle}
          contentFit="cover"
        />
      )}

      {selected && (
        <View style={cardStyles.selectedOverlay}>
          <AtomicIcon name={checkCircleIcon} color="primary" size="md" />
        </View>
      )}

      <View style={contentContainerStyle}>
        {(title || leftIcon || rightIcon) && (
          <View style={cardStyles.header}>
            {leftIcon && (
              <AtomicIcon
                name={leftIcon}
                size="sm"
                color="primary"
                style={leftIconStyle}
              />
            )}
            <View style={cardStyles.titleContainer}>
              {title && (
                <AtomicText
                  type="titleMedium"
                  style={[cardStyles.title, titleStyle]}
                >
                  {title}
                </AtomicText>
              )}
              {subtitle && (
                <AtomicText
                  type="bodySmall"
                  color="textSecondary"
                  style={[cardStyles.subtitle, subtitleStyle]}
                >
                  {subtitle}
                </AtomicText>
              )}
            </View>
            {rightIcon && (
              <AtomicIcon
                name={rightIcon}
                size="sm"
                color="textSecondary"
                style={rightIconStyle}
              />
            )}
          </View>
        )}

        {description && (
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={[cardStyles.description, descriptionStyle]}
          >
            {description}
          </AtomicText>
        )}

        {children}
      </View>
    </>
  );
});

const AtomicCardComponent: React.FC<AtomicCardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  title,
  subtitle,
  description,
  image,
  imageAspectRatio = 1.6,
  badge,
  leftIcon,
  rightIcon,
  selected = false,
  glowColor,
  glowIntensity = 1,
  onPress,
  disabled = false,
  style,
  titleStyle,
  subtitleStyle,
  descriptionStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const checkCircleIcon = useIconName('checkCircle');

  const variantStyles = useMemo(() => {
    const base = getCardVariantStyles(variant, tokens);
    if (variant === 'glowing' && glowColor) {
      return {
        ...base,
        container: {
          ...base.container,
          borderColor: glowColor,
          borderWidth: 2 * glowIntensity,
        }
      };
    }
    return base;
  }, [variant, tokens, glowColor, glowIntensity]);

  const paddingValue = getCardPadding(padding, tokens);

  const containerStyle = useMemo(() => [
    cardStyles.container,
    { borderRadius: tokens.borders.radius.lg },
    variantStyles.container,
    selected && { borderColor: tokens.colors.primary, borderWidth: 2 },
    style,
  ], [tokens.borders.radius.lg, variantStyles.container, selected, tokens.colors.primary, style]);

  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (!disabled && onPress) {
      onPress(event);
    }
  }, [disabled, onPress]);

  const content = (
    <CardContent
      badge={badge}
      image={image}
      imageAspectRatio={imageAspectRatio}
      selected={selected}
      checkCircleIcon={checkCircleIcon}
      paddingValue={paddingValue}
      title={title}
      subtitle={subtitle}
      description={description}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      titleStyle={titleStyle}
      subtitleStyle={subtitleStyle}
      descriptionStyle={descriptionStyle}
    >
      {children}
    </CardContent>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          containerStyle,
          pressed && !disabled && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        ]}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={containerStyle} testID={testID}>
      {content}
    </View>
  );
};

export const AtomicCard = React.memo(AtomicCardComponent);

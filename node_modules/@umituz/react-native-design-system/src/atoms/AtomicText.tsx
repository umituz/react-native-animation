import React, { useMemo } from 'react';
import { Text, type StyleProp, type TextStyle, type TextProps } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { getTextColor, type TextStyleVariant, type ColorVariant } from '../typography';

export interface AtomicTextProps extends Omit<TextProps, 'style'> {


  /** Typographic style variant from tokens */
  type?: TextStyleVariant;

  /** Color variant from tokens or custom hex color */
  color?: ColorVariant | string;

  /** Text alignment */
  align?: TextStyle['textAlign'];

  /** Font weight - convenience prop */
  fontWeight?: TextStyle['fontWeight'];

  /** Margin top - convenience prop using spacing tokens */
  marginTop?: keyof ReturnType<typeof import('../theme').useAppDesignTokens>['spacing'];

  /** Margin bottom - convenience prop using spacing tokens */
  marginBottom?: keyof ReturnType<typeof import('../theme').useAppDesignTokens>['spacing'];

  /** Content to render */
  children: React.ReactNode;

  /** Custom text style */
  style?: StyleProp<TextStyle>;

  /** Test ID for automation */
  testID?: string;
}

/**
 * AtomicText - Primitive Text Component
 *
 * ✅ Responsive by default
 * ✅ Theme-aware
 * ✅ Memoized for performance
 * ✅ SOLID, DRY, KISS
 */
export const AtomicText = React.memo(({
  type = 'bodyMedium',
  color = 'textPrimary',
  align,
  fontWeight,
  marginTop,
  marginBottom,
  children,
  style,
  testID,
  ...props
}: AtomicTextProps) => {
  const tokens = useAppDesignTokens();

  const textStyle = useMemo<StyleProp<TextStyle>>(() => {
    // Get typography style from tokens
    const typographyStyle = tokens.typography[type] as TextStyle & { responsiveFontSize?: number };

    // Use responsive font size if available
    const fontSize = typographyStyle?.responsiveFontSize || typographyStyle?.fontSize;

    // Resolve color
    const resolvedColor = typeof color === 'string' && !color.includes('.')
      ? getTextColor(color as ColorVariant, tokens)
      : color;

    return [
      typographyStyle,
      {
        color: resolvedColor as string,
        ...(fontSize && { fontSize }),
        ...(align && { textAlign: align }),
        ...(fontWeight && { fontWeight }),
        ...(marginTop && { marginTop: tokens.spacing[marginTop] as number }),
        ...(marginBottom && { marginBottom: tokens.spacing[marginBottom] as number }),
      },
      style,
    ];
  }, [tokens, type, color, align, fontWeight, marginTop, marginBottom, style]);

  return (
    <Text
      style={textStyle}
      testID={testID}
      {...props}
    >
      {children}
    </Text>
  );
});

AtomicText.displayName = 'AtomicText';

/**
 * AtomicCard Type Definitions
 */

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle, GestureResponderEvent, ImageSourcePropType } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'glass' | 'glowing';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AtomicCardProps {
  /** Main content of the card */
  readonly children?: ReactNode;
  
  /** Visual variant of the card */
  readonly variant?: CardVariant;
  
  /** Padding inside the card */
  readonly padding?: CardPadding;
  
  /** Optional title text */
  readonly title?: string;
  
  /** Optional subtitle text */
  readonly subtitle?: string;
  
  /** Optional description/content text */
  readonly description?: string;
  
  /** Image source to display */
  readonly image?: string | ImageSourcePropType;
  
  /** Whether the text should overlay the image */
  readonly imageOverlay?: boolean;
  
  /** Aspect ratio for the image */
  readonly imageAspectRatio?: number;
  
  /** Optional badge text displayed on corner */
  readonly badge?: string;
  
  /** Icon name to display on the left of title */
  readonly leftIcon?: string;
  
  /** Icon name to display on the right of title */
  readonly rightIcon?: string;
  
  /** Whether the card is in a selected state */
  readonly selected?: boolean;
  
  /** Color for the glow effect if variant is 'glowing' */
  readonly glowColor?: string;
  
  /** Intensity of the glow effect (0 to 1) */
  readonly glowIntensity?: number;
  
  /** Press handler */
  readonly onPress?: (event: GestureResponderEvent) => void;
  
  /** Whether the card is disabled */
  readonly disabled?: boolean;
  
  /** Custom container style */
  readonly style?: StyleProp<ViewStyle>;
  
  /** Custom title style */
  readonly titleStyle?: StyleProp<TextStyle>;
  
  /** Custom subtitle style */
  readonly subtitleStyle?: StyleProp<TextStyle>;
  
  /** Custom description style */
  readonly descriptionStyle?: StyleProp<TextStyle>;
  
  /** Test ID */
  readonly testID?: string;
}

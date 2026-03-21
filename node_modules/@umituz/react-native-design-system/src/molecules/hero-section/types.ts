

import { ViewStyle, StyleProp, ImageSourcePropType } from 'react-native';

export interface HeroSectionProps {
  icon?: string;
  imageUrl?: string;
  imageSource?: ImageSourcePropType;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

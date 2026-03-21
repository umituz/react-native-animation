import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type Style = ViewStyle | TextStyle | ImageStyle;

export interface VariantConfig<T extends Record<string, Record<string, Style>>> {
  base?: Style;
  variants?: T;
  defaultVariants?: Partial<{ [K in keyof T]: keyof T[K] }>;
}

export type VariantProps<T extends Record<string, Record<string, Style>>> = {
  [K in keyof T]?: keyof T[K];
};

export function createVariants<T extends Record<string, Record<string, Style>>>(
  config: VariantConfig<T>
) {
  return (props: VariantProps<T> = {}): Style => {
    let result: Style = { ...config.base };

    // Apply default variants
    if (config.defaultVariants) {
      Object.entries(config.defaultVariants).forEach(([variantKey, defaultValue]) => {
        if (config.variants?.[variantKey] && defaultValue) {
          const variantStyle = config.variants[variantKey][defaultValue as string];
          if (variantStyle) {
            result = { ...result, ...variantStyle };
          }
        }
      });
    }

    // Apply props variants
    Object.entries(props).forEach(([variantKey, variantValue]) => {
      if (config.variants?.[variantKey] && variantValue) {
        const variantStyle = config.variants[variantKey][variantValue as string];
        if (variantStyle) {
          result = { ...result, ...variantStyle };
        }
      }
    });

    return result;
  };
}

import { Style } from './core';

export function combineStyles<T extends Style>(
  ...styles: (T | undefined | null | false)[]
): T {
  return styles.reduce<T>(
    (acc, style) => (style ? { ...acc, ...style } : acc),
    {} as T
  );
}

export function conditionalStyle<T extends Style>(
  condition: boolean,
  trueStyle: T,
  falseStyle?: T
): T | undefined {
  return condition ? trueStyle : falseStyle;
}

export function responsiveStyle<T extends Style>(
  small: T,
  medium?: T,
  large?: T
): T {
  void medium;
  void large;
  return small;
}

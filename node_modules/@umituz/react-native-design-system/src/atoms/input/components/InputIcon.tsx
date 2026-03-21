import React from 'react';
import { Pressable } from 'react-native';
import { AtomicIcon } from '../../icon';

interface InputIconProps {
  name: string;
  size: number;
  color: string;
  position: 'leading' | 'trailing';
  onPress?: () => void;
  testID?: string;
}

export const InputIcon: React.FC<InputIconProps> = ({
  name,
  size,
  color,
  position,
  onPress,
  testID,
}) => {
  const style = position === 'leading' ? styles.leadingIcon : styles.trailingIcon;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={style}
        testID={testID}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={name}
      >
        <AtomicIcon name={name} customSize={size} customColor={color} />
      </Pressable>
    );
  }

  return (
    <AtomicIcon
      name={name}
      customSize={size}
      customColor={color}
      style={style}
      testID={testID}
      accessibilityRole="image"
    />
  );
};

const styles = {
  leadingIcon: {
    position: 'absolute' as const,
    left: 12,
    zIndex: 1,
  },
  trailingIcon: {
    position: 'absolute' as const,
    right: 12,
    zIndex: 1,
  },
};

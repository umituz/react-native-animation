import React from 'react';
import { View } from 'react-native';
import { AtomicText } from '../../AtomicText';
import type { AtomicInputState } from '../../input/types';

interface InputHelperProps {
  helperText?: string;
  showCharacterCount?: boolean;
  characterCount?: number;
  maxLength?: number;
  state?: AtomicInputState;
  testID?: string;
}

export const InputHelper: React.FC<InputHelperProps> = ({
  helperText,
  showCharacterCount,
  characterCount = 0,
  maxLength,
  state,
  testID,
}) => {
  if (!helperText && !showCharacterCount) return null;

  const color = state === 'error' ? 'error' : 'secondary';

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
      {helperText && (
        <AtomicText
          style={{ flex: 1 }}
          color={color}
          testID={testID ? `${testID}-helper` : undefined}
        >
          {helperText}
        </AtomicText>
      )}
      {showCharacterCount && maxLength && (
        <AtomicText
          style={{ marginLeft: 8 }}
          color="secondary"
          testID={testID ? `${testID}-count` : undefined}
        >
          {characterCount}/{maxLength}
        </AtomicText>
      )}
    </View>
  );
};

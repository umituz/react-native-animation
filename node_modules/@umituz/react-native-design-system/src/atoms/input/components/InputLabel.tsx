import React from 'react';
import { AtomicText } from '../../AtomicText';
import type { AtomicInputState } from '../../input/types';

interface InputLabelProps {
  label?: string;
  state?: AtomicInputState;
}

export const InputLabel: React.FC<InputLabelProps> = ({ label, state }) => {
  if (!label) return null;

  const color = state === 'error' ? 'error' : state === 'success' ? 'success' : 'secondary';

  return (
    <AtomicText type="labelMedium" color={color} style={{ marginBottom: 4 }}>
      {label}
    </AtomicText>
  );
};

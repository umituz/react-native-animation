/**
 * AlertIcon Component
 *
 * Shared icon rendering for alert variants.
 */

import React from 'react';
import { AtomicIcon } from '../../../atoms';

interface AlertIconProps {
  name: string;
  color: string;
  size?: number;
  marginRight?: number;
}

export function AlertIcon({
  name,
  color,
  size = 20,
  marginRight = 0
}: AlertIconProps) {
  return (
    <AtomicIcon
      name={name}
      customSize={size}
      customColor={color}
      style={{ marginRight }}
    />
  );
}

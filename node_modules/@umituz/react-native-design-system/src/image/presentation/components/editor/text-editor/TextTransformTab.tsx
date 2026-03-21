/**
 * Text Transform Tab - Scale, rotation, opacity, delete
 */

import React from "react";
import { View } from "react-native";
import { useAppDesignTokens } from "../../../../../theme/hooks/useAppDesignTokens";
import type { TabProps } from "./TextEditorTabs.styles";
import { TransformButtonRow, DeleteButton } from "./components/TransformButtonRow";

const DEFAULT_SCALES = [0.5, 0.75, 1, 1.25, 1.5, 2];
const DEFAULT_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315];
const DEFAULT_OPACITIES = [0.2, 0.4, 0.6, 0.8, 1];

export interface TextTransformTabProps extends TabProps {
  scale: number;
  setScale: (s: number) => void;
  rotation: number;
  setRotation: (r: number) => void;
  opacity: number;
  setOpacity: (o: number) => void;
  onDelete?: () => void;
}

export const TextTransformTab: React.FC<TextTransformTabProps> = ({
  scale,
  setScale,
  rotation,
  setRotation,
  opacity,
  setOpacity,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();

  const scaleButtons = DEFAULT_SCALES.map((s) => ({
    value: s,
    label: s.toFixed(1) + "x",
  }));

  const rotationButtons = DEFAULT_ROTATIONS.map((r) => ({
    value: r,
    label: r + "°",
  }));

  const opacityButtons = DEFAULT_OPACITIES.map((o) => ({
    value: o,
    label: Math.round(o * 100) + "%",
  }));

  return (
    <View style={{ gap: tokens.spacing.xl }}>
      <TransformButtonRow
        title="Scale"
        buttons={scaleButtons}
        selectedValue={scale}
        onSelect={setScale}
        formatTitle={(v) => v.toFixed(2) + "x"}
      />

      <TransformButtonRow
        title="Rotation"
        buttons={rotationButtons}
        selectedValue={rotation}
        onSelect={setRotation}
        formatTitle={(v) => Math.round(v) + "°"}
      />

      <TransformButtonRow
        title="Opacity"
        buttons={opacityButtons}
        selectedValue={opacity}
        onSelect={setOpacity}
        formatTitle={(v) => (v * 100).toFixed(0) + "%"}
      />

      {onDelete && <DeleteButton onPress={onDelete} />}
    </View>
  );
};

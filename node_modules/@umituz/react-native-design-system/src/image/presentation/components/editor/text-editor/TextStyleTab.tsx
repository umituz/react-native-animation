/**
 * Text Style Tab - Font, color, size selection
 */

import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { AtomicText } from "../../../../../atoms";
import { useAppDesignTokens } from "../../../../../theme/hooks/useAppDesignTokens";
import { textEditorStyles, type TabProps } from "./TextEditorTabs.styles";

const DEFAULT_COLORS = [
  "#FFFFFF",
  "#000000",
  "#FF0000",
  "#FFFF00",
  "#0000FF",
  "#00FF00",
  "#FF00FF",
  "#FFA500",
];

const DEFAULT_FONTS = ["System", "serif", "sans-serif", "monospace"];
const DEFAULT_FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32];

export interface TextStyleTabProps extends TabProps {
  fontSize: number;
  setFontSize: (s: number) => void;
  color: string;
  setColor: (c: string) => void;
  fontFamily: string;
  setFontFamily: (f: string) => void;
}

export const TextStyleTab: React.FC<TextStyleTabProps> = ({
  fontSize,
  setFontSize,
  color,
  setColor,
  fontFamily,
  setFontFamily,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={{ gap: tokens.spacing.xl }}>
      {/* Font Family Selection */}
      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.sm,
          }}
        >
          Font
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {DEFAULT_FONTS.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFontFamily(f)}
              style={[
                textEditorStyles.fontButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.borders.radius.full,
                  borderWidth: 1,
                  borderColor:
                    fontFamily === f ? tokens.colors.primary : tokens.colors.border,
                  backgroundColor:
                    fontFamily === f ? tokens.colors.primary : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText style={{ fontFamily: f }}>{f}</AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Color Selection */}
      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.sm,
          }}
        >
          Color
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {DEFAULT_COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setColor(c)}
              style={[
                textEditorStyles.colorButton,
                {
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: c,
                  borderWidth: color === c ? 3 : 1,
                  borderColor: tokens.colors.primary,
                },
              ]}
            />
          ))}
        </ScrollView>
      </View>

      {/* Font Size Selection */}
      <View>
        <AtomicText
          style={{
            ...tokens.typography.labelMedium,
            marginBottom: tokens.spacing.xs,
          }}
        >
          Size: {fontSize}px
        </AtomicText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: tokens.spacing.sm }}
        >
          {DEFAULT_FONT_SIZES.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setFontSize(s)}
              style={[
                textEditorStyles.sizeButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor:
                    fontSize === s ? tokens.colors.primary : tokens.colors.border,
                  backgroundColor:
                    fontSize === s ? tokens.colors.primary : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{
                  color: fontSize === s ? "white" : tokens.colors.textPrimary,
                  fontWeight: "600",
                }}
              >
                {s}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

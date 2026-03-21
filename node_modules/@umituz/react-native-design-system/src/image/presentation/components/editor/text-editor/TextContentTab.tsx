/**
 * Text Content Tab - Text input for editor
 */

import React from "react";
import { View, TextInput } from "react-native";
import { useAppDesignTokens } from "../../../../../theme/hooks/useAppDesignTokens";
import { textEditorStyles, type TabProps } from "./TextEditorTabs.styles";

export interface TextContentTabProps extends TabProps {
  text: string;
  onTextChange: (t: string) => void;
}

export const TextContentTab: React.FC<TextContentTabProps> = ({
  text,
  onTextChange,
  t,
}) => {
  const tokens = useAppDesignTokens();
  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <TextInput
        value={text}
        onChangeText={onTextChange}
        placeholder={t("editor.text_placeholder")}
        style={[
          textEditorStyles.textInput,
          {
            ...tokens.typography.bodyLarge,
            borderColor: tokens.colors.border,
            borderRadius: tokens.borders.radius.md,
            padding: tokens.spacing.md,
            minHeight: 120,
            color: tokens.colors.textPrimary,
          },
        ]}
        multiline
      />
    </View>
  );
};

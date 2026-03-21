/**
 * Shared Styles for Text Editor Tabs
 */

import { StyleSheet } from "react-native";

export const textEditorStyles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    textAlignVertical: "top",
  },
  fontButton: {
    paddingVertical: 8,
    minWidth: 80,
    alignItems: "center",
  },
  colorButton: {
    width: 40,
    height: 40,
  },
  sizeButton: {
    minWidth: 50,
    alignItems: "center",
  },
  transformButton: {
    minWidth: 60,
    alignItems: "center",
  },
  deleteButton: {
    alignSelf: "flex-start",
  },
});

export interface TabProps {
  t: (key: string) => string;
}

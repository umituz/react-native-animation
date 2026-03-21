/**
 * Shared Styles for Question Components
 * Eliminates code duplication across SingleChoice, MultipleChoice, etc.
 */

import { StyleSheet } from 'react-native';

export const questionStyles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
    width: '100%',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
  },
  hint: {
    textAlign: 'center',
    marginTop: 8,
  },
});

export const OPTION_ICON_SIZE = 20;
export const OPTION_EMOJI_SIZE = 24;

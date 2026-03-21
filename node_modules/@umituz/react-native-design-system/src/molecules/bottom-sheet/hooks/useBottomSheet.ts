import { useRef, useCallback } from 'react';
import type { BottomSheetRef, UseBottomSheetReturn } from '../types/BottomSheet';

export const useBottomSheet = (): UseBottomSheetReturn => {
  const sheetRef = useRef<BottomSheetRef>(null);

  const open = useCallback(() => sheetRef.current?.snapToIndex(0), []);
  const close = useCallback(() => sheetRef.current?.close(), []);
  const expand = useCallback(() => sheetRef.current?.expand(), []);
  const collapse = useCallback(() => sheetRef.current?.collapse(), []);
  const snapToIndex = useCallback((index: number) => sheetRef.current?.snapToIndex(index), []);
  const snapToPosition = useCallback((pos: string | number) => sheetRef.current?.snapToPosition(pos), []);

  return { sheetRef, open, close, expand, collapse, snapToIndex, snapToPosition };
};


import { useRef, useCallback } from 'react';
import type { BottomSheetModalRef, UseBottomSheetModalReturn } from '../types/BottomSheet';

export const useBottomSheetModal = (): UseBottomSheetModalReturn => {
  const modalRef = useRef<BottomSheetModalRef>(null);

  const present = useCallback(() => modalRef.current?.present(), []);
  const dismiss = useCallback(() => modalRef.current?.dismiss(), []);
  const expand = useCallback(() => modalRef.current?.expand(), []);
  const collapse = useCallback(() => modalRef.current?.collapse(), []);
  const snapToIndex = useCallback((index: number) => modalRef.current?.snapToIndex(index), []);
  const snapToPosition = useCallback((pos: string | number) => modalRef.current?.snapToPosition(pos), []);

  return { modalRef, present, dismiss, expand, collapse, snapToIndex, snapToPosition };
};



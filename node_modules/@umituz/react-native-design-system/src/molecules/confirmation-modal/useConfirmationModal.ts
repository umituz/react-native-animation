/**
 * ConfirmationModal Hook
 *
 * Hook for managing confirmation modal state
 */

import { useState, useCallback, useMemo } from 'react';
import { ConfirmationModalProps, ConfirmationModalVariant } from './types';

const useConfirmationModalState = () => {
  const [visible, setVisible] = useState(false);

  const showConfirmation = useCallback(() => setVisible(true), []);
  const hideConfirmation = useCallback(() => setVisible(false), []);

  return { visible, showConfirmation, hideConfirmation };
};

export const useConfirmationModal = (config: {
  title: string;
  message: string;
  variant?: ConfirmationModalVariant;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}) => {
  const { visible, showConfirmation, hideConfirmation } = useConfirmationModalState();

  const handleConfirm = useCallback(() => {
    config.onConfirm();
    hideConfirmation();
  }, [config, hideConfirmation]);

  const confirmationProps: ConfirmationModalProps = useMemo(() => ({
    visible,
    title: config.title,
    message: config.message,
    variant: config.variant || 'default',
    confirmText: config.confirmText,
    cancelText: config.cancelText,
    onConfirm: handleConfirm,
    onCancel: hideConfirmation,
  }), [visible, config.title, config.message, config.variant, config.confirmText, config.cancelText, handleConfirm, hideConfirmation]);

  return {
    showConfirmation,
    hideConfirmation,
    confirmationProps,
  };
};
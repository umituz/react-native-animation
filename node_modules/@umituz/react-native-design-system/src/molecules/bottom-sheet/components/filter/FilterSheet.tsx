import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, ScrollView, Modal, Pressable, GestureResponderEvent } from "react-native";
import { useSafeAreaInsets } from "../../../../safe-area";
import { AtomicButton } from '../../../../atoms';
import { useAppDesignTokens } from '../../../../theme';
import { calculateResponsiveSize } from '../../../../responsive';
import { BOTTOM_SHEET_HANDLE } from '../../../../constants';
import type { FilterOption } from "../../types/Filter";
import { FilterUtils } from "../../types/Filter";
import { FilterSheetHeader } from "./FilterSheetComponents/FilterSheetHeader";
import { FilterSheetOption } from "./FilterSheetComponents/FilterSheetOption";

export interface FilterSheetProps {
  visible: boolean;
  options: FilterOption[];
  selectedIds: string[];
  onFilterPress: (filterId: string) => void;
  onClearFilters: () => void;
  onClose?: () => void;
  defaultFilterId?: string;
  title?: string;
  clearLabel?: string;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  visible,
  options,
  selectedIds,
  onFilterPress,
  onClearFilters,
  onClose,
  defaultFilterId = "all",
  title,
  clearLabel = "Clear"
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const spacingMultiplier = tokens.spacingMultiplier;

  const styles = useMemo(() => StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    sheet: {
      borderTopLeftRadius: tokens.borders.radius.xl,
      borderTopRightRadius: tokens.borders.radius.xl,
      maxHeight: "80%",
    },
    handle: {
      width: calculateResponsiveSize(BOTTOM_SHEET_HANDLE.width, spacingMultiplier),
      height: calculateResponsiveSize(BOTTOM_SHEET_HANDLE.height, spacingMultiplier),
      borderRadius: calculateResponsiveSize(BOTTOM_SHEET_HANDLE.borderRadius, spacingMultiplier),
      alignSelf: "center",
      marginTop: tokens.spacing.sm,
      marginBottom: tokens.spacing.sm,
    },
    optionsList: {
      maxHeight: 400,
      paddingVertical: tokens.spacing.sm,
    },
    footer: {
      paddingHorizontal: tokens.spacing.xl,
      paddingTop: tokens.spacing.lg,
      paddingBottom: tokens.spacing.sm,
    },
  }), [tokens, spacingMultiplier]);

  const safeSelectedIds = selectedIds ?? [];
  const hasActiveFilter = FilterUtils.hasActiveFilter(safeSelectedIds, defaultFilterId);

  const handleFilterPressWithClose = useCallback((id: string) => {
    onFilterPress(id);
    onClose?.();
  }, [onFilterPress, onClose]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { backgroundColor: tokens.colors.surface, paddingBottom: insets.bottom }]}
          onPress={(e: GestureResponderEvent) => e.stopPropagation()}
        >
          <View style={[styles.handle, { backgroundColor: tokens.colors.border }]} />

          <FilterSheetHeader
            title={title || "Filter"}
            onClose={() => onClose?.()}
            tokens={tokens}
          />

          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {options.map((option) => (
              <FilterSheetOption
                key={option.id}
                option={option}
                isSelected={safeSelectedIds.includes(option.id)}
                onPress={handleFilterPressWithClose}
                tokens={tokens}
              />
            ))}
          </ScrollView>

          {hasActiveFilter && (
            <View style={[styles.footer, { borderTopColor: tokens.colors.border, borderTopWidth: tokens.borders.width.thin }]}>
              <AtomicButton variant="outline" onPress={onClearFilters} fullWidth>
                {clearLabel}
              </AtomicButton>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

FilterSheet.displayName = "FilterSheet";



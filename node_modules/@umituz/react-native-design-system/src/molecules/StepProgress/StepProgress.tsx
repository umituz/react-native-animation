import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { useAppDesignTokens } from '../../theme/hooks/useAppDesignTokens';
import { calculateResponsiveSize } from '../../responsive';
import { STEP_INDICATOR } from '../../constants';
import { createMappedArray } from '../../utils/arrayUtils';

export interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
    style?: ViewStyle;
}

export const StepProgress: React.FC<StepProgressProps> = ({
    currentStep,
    totalSteps,
    style,
}) => {
    const tokens = useAppDesignTokens();
    const spacingMultiplier = tokens.spacingMultiplier;

    const styles = useMemo(
        () => ({
            container: {
                flexDirection: "row" as const,
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
            },
            step: {
                flex: 1,
                height: calculateResponsiveSize(STEP_INDICATOR.progressBar.height, spacingMultiplier),
                borderRadius: calculateResponsiveSize(STEP_INDICATOR.progressBar.borderRadius, spacingMultiplier),
                backgroundColor: tokens.colors.border,
            },
            activeStep: {
                backgroundColor: tokens.colors.primary,
            },
        }),
        [tokens, spacingMultiplier],
    );

    return (
        <View style={[styles.container, style]}>
            {createMappedArray(totalSteps, (index) => (
                <View
                    key={index}
                    style={[styles.step, index < currentStep && styles.activeStep]}
                />
            ))}
        </View>
    );
};

/**
 * StepHeader Component
 * Header component for step-by-step flows with title and subtitle
 *
 * @package @umituz/react-native-design-system
 */

import React, { useMemo } from "react";
import { View, type ViewStyle, type StyleProp } from "react-native";
import { AtomicText } from "../../atoms/AtomicText";
import { useAppDesignTokens } from "../../theme/hooks/useAppDesignTokens";
import {
  calculateResponsiveSize,
  calculateLineHeight,
} from "../../responsive";
import { SPACING, STEP_INDICATOR } from "../../constants";
import { createMappedArray } from "../../utils";

const DEFAULT_CONFIG: StepHeaderConfig = {
  showStepIndicator: false,
  currentStep: 1,
  totalSteps: 3,
  titleAlignment: "left",
  titleFontSize: undefined,
  subtitleFontSize: undefined,
  spacing: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
};

export interface StepHeaderConfig {
  showStepIndicator?: boolean;
  currentStep?: number;
  totalSteps?: number;
  titleAlignment?: "left" | "center" | "right";
  titleFontSize?: number;
  subtitleFontSize?: number;
  spacing?: {
    marginBottom?: number;
    paddingHorizontal?: number;
  };
}

export interface StepHeaderProps {
  title: string;
  subtitle?: string;
  config?: StepHeaderConfig;
  style?: StyleProp<ViewStyle>;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  subtitle,
  config,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  const spacingMultiplier = tokens.spacingMultiplier;

  const styles = useMemo(
    () => ({
      container: {
        paddingHorizontal: calculateResponsiveSize(
          cfg.spacing?.paddingHorizontal ?? SPACING.xl,
          spacingMultiplier
        ),
        marginBottom: calculateResponsiveSize(
          cfg.spacing?.marginBottom ?? 32,
          spacingMultiplier
        ),
      },
      stepIndicator: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        marginBottom: tokens.spacing.md,
      },
      stepDot: {
        width: calculateResponsiveSize(STEP_INDICATOR.dot.width, spacingMultiplier),
        height: calculateResponsiveSize(STEP_INDICATOR.dot.height, spacingMultiplier),
        borderRadius: calculateResponsiveSize(STEP_INDICATOR.dot.borderRadius, spacingMultiplier),
        marginHorizontal: calculateResponsiveSize(STEP_INDICATOR.dot.marginHorizontal, spacingMultiplier),
      },
      activeDot: {
        backgroundColor: tokens.colors.primary,
      },
      inactiveDot: {
        backgroundColor: `${tokens.colors.primary}30`,
      },
      title: {
        fontSize: calculateResponsiveSize(cfg.titleFontSize ?? STEP_INDICATOR.title, spacingMultiplier),
        fontWeight: "900" as const,
        color: tokens.colors.textPrimary,
        textAlign: cfg.titleAlignment,
        marginBottom: subtitle ? calculateResponsiveSize(STEP_INDICATOR.subtitle, spacingMultiplier) : 0,
        letterSpacing: 0.3,
      },
      subtitle: {
        fontSize: calculateResponsiveSize(cfg.subtitleFontSize ?? STEP_INDICATOR.subtitle, spacingMultiplier),
        fontWeight: "500" as const,
        color: tokens.colors.textSecondary,
        textAlign: cfg.titleAlignment,
        lineHeight: calculateLineHeight(cfg.subtitleFontSize ?? STEP_INDICATOR.subtitle, spacingMultiplier),
        opacity: 0.9,
      },
    }),
    [tokens, cfg, subtitle, spacingMultiplier],
  );

  return (
    <View style={[styles.container, style]}>
      {cfg.showStepIndicator &&
        cfg.currentStep !== undefined &&
        cfg.totalSteps !== undefined && (
          <View style={styles.stepIndicator}>
            {createMappedArray(cfg.totalSteps, (i) => (
              <View
                key={`step-${i}`}
                style={[
                  styles.stepDot,
                  i + 1 <= cfg.currentStep!
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        )}

      <AtomicText style={styles.title}>{title}</AtomicText>

      {subtitle && <AtomicText style={styles.subtitle}>{subtitle}</AtomicText>}
    </View>
  );
};

export type ResetPeriod = 'daily' | 'weekly' | 'monthly' | 'never';

export interface FeatureLimit {
  maxUses: number;
  resetPeriod: ResetPeriod;
}

export interface DeviceFeatureConfig {
  features: Record<string, FeatureLimit>;
}

export interface DeviceFeatureUsage {
  usageCount: number;
  lastResetAt: number;
  firstUsedAt: number;
}

export interface DeviceFeatureAccess {
  isAllowed: boolean;
  remainingUses: number;
  usageCount: number;
  resetAt: number | null;
  maxUses: number;
}

export const DEFAULT_FEATURE_CONFIG: DeviceFeatureConfig = {
  features: {},
};

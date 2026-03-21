/**
 * Onboarding Theme Types
 */

export interface OnboardingColors {
  iconColor: string;
  textColor: string;
  subTextColor: string;
  buttonBg: string;
  buttonTextColor: string;
  progressBarBg: string;
  progressFillColor: string;
  dotColor: string;
  activeDotColor: string;
  progressTextColor: string;
  headerButtonBg: string;
  headerButtonBorder: string;
  iconBg: string;
  iconBorder: string;
  errorColor: string;
  featureItemBg: string;
  background?: string; // Optional background color
}

export interface OnboardingTheme {
  colors: OnboardingColors;
  useCustomBackground: boolean;
}

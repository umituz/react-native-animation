/**
 * Splash Module
 * Provides splash screen component for app initialization
 */

export { SplashScreen } from './components/SplashScreen';
export type {
  SplashScreenProps,
  SplashColors,
} from './types';

export { useSplashFlow } from './hooks/useSplashFlow';
export type { UseSplashFlowOptions, UseSplashFlowResult } from './hooks/useSplashFlow';

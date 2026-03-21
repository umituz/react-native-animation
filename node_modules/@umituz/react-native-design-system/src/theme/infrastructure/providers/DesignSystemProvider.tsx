import React, { useEffect, useState, ReactNode, lazy, Suspense } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from '../../../safe-area';
import { useTheme } from '../stores/themeStore';
import type { ThemeMode } from '../../core/ColorPalette';
import type { CustomThemeColors } from '../../core/CustomColors';
import type { SplashScreenProps } from '../../../molecules/splash/types';
import { FIVE_SECONDS_MS } from '../../../utils/constants/TimeConstants';
import { iconStore, DEFAULT_ICON_NAMES, type IconNames } from '../../../atoms/icon/iconStore';

// Lazy load SplashScreen to avoid circular dependency
const SplashScreen = lazy(() => import('../../../molecules/splash').then(m => ({ default: m.SplashScreen })));

const EMPTY_FONTS: Record<string, any> = {};

interface DesignSystemProviderProps {
  children: ReactNode;
  customColors?: CustomThemeColors;
  initialThemeMode?: ThemeMode;
  fonts?: Record<string, any>;
  showLoadingIndicator?: boolean;
  splashConfig?: Pick<SplashScreenProps, 'appName' | 'tagline' | 'icon' | 'colors'>;
  loadingComponent?: ReactNode;
  onInitialized?: () => void;
  onError?: (error: unknown) => void;
  /** Icon names available in the app (defaults to standard set) */
  iconNames?: IconNames;
  /** Icon renderer function from @umituz/react-native-icons or similar */
  iconRenderer?: (props: { name: string; size: number; color: string }) => React.ReactNode;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  customColors,
  initialThemeMode = 'light',
  fonts,
  showLoadingIndicator = true,
  splashConfig,
  loadingComponent,
  onInitialized,
  onError,
  iconNames,
  iconRenderer,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const hasCustomFonts = fonts != null && Object.keys(fonts).length > 0;
  const [fontsLoaded, fontError] = useFonts(hasCustomFonts ? fonts : EMPTY_FONTS);

  const initialize = useTheme((state) => state.initialize);
  const setCustomColors = useTheme((state) => state.setCustomColors);
  const setDefaultColors = useTheme((state) => state.setDefaultColors);
  const setDefaultThemeMode = useTheme((state) => state.setDefaultThemeMode);

  useEffect(() => {
    // Register app's default colors for reset feature
    if (customColors) {
      setDefaultColors(customColors);
      setCustomColors(customColors);
    }

    // Set default theme mode BEFORE initialize
    setDefaultThemeMode(initialThemeMode);

    // Safety timeout: if initialization takes too long, proceed anyway
    const safetyTimer = setTimeout(() => {
      setIsInitialized((prev) => {
        if (!prev) onError?.(new Error('DesignSystemProvider initialization timed out'));
        return true;
      });
    }, FIVE_SECONDS_MS);

    initialize()
      .then(() => {
        clearTimeout(safetyTimer);
        setIsInitialized(true);
      })
      .catch((error) => {
        clearTimeout(safetyTimer);
        setIsInitialized(true);
        onError?.(error);
      });

    return () => clearTimeout(safetyTimer);
  }, [
    customColors,
    initialThemeMode,
    initialize,
    onError,
    setCustomColors,
    setDefaultColors,
    setDefaultThemeMode,
  ]);

  // Skip font loading gate when no custom fonts are provided
  const effectiveFontsLoaded = hasCustomFonts ? fontsLoaded : true;

  useEffect(() => {
    if (isInitialized && effectiveFontsLoaded) {
      onInitialized?.();
    }
  }, [isInitialized, effectiveFontsLoaded, onInitialized]);

  useEffect(() => {
    if (fontError) {
      onError?.(fontError);
    }
  }, [fontError, onError]);

  // Configure icon renderer if provided
  useEffect(() => {
    if (iconRenderer) {
      iconStore.getState().setConfig(iconNames || DEFAULT_ICON_NAMES, iconRenderer);
    }
  }, [iconRenderer, iconNames]);

  const isLoading = showLoadingIndicator && (!isInitialized || !effectiveFontsLoaded);

  let content: ReactNode;

  if (isLoading) {
    if (loadingComponent) {
      content = loadingComponent;
    } else if (splashConfig) {
      content = (
        <Suspense fallback={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        }>
          <SplashScreen {...splashConfig} visible={true} />
        </Suspense>
      );
    } else {
      content = (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  } else {
    content = children;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {content}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

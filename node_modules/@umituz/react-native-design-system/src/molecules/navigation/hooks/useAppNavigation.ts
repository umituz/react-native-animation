import { useNavigation, StackActions, CommonActions } from "@react-navigation/native";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useCallback, useMemo } from "react";

/**
 * Navigation result type - clean and simple
 */
export interface AppNavigationResult {
  navigate: (screen: string, params?: Record<string, unknown>) => void;
  push: (screen: string, params?: Record<string, unknown>) => void;
  goBack: () => void;
  reset: (screen: string, params?: Record<string, unknown>) => void;
  replace: (screen: string, params?: Record<string, unknown>) => void;
  pop: (count?: number) => void;
  popToTop: () => void;
  canGoBack: () => boolean;
  getState: () => ReturnType<NavigationProp<ParamListBase>["getState"]> | null;
  getParent: () => NavigationProp<ParamListBase> | null | undefined;
  /** Whether navigation is available (inside NavigationContainer) */
  isReady: boolean;
}

/**
 * useAppNavigation Hook
 *
 * Clean navigation API without complex type casting.
 * Uses navigation.navigate() directly for proper nested navigator support.
 *
 * Safe to use outside NavigationContainer - returns no-op functions.
 *
 * Use: const navigation = useAppNavigation();
 *      if (navigation.isReady) {
 *        navigation.navigate("ScreenName", { param: value });
 *      }
 */
export function useAppNavigation(): AppNavigationResult {
  // Always call hooks - no conditional calls
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Check if navigation is ready
  const isReady = Boolean(navigation);

  const navigate = useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      if (!navigation) {
        if (__DEV__) {
          console.warn('[useAppNavigation] Navigation not ready. Component must be inside NavigationContainer.');
        }
        return;
      }
      // Dynamic navigation: use CommonActions for type-safe arbitrary screen navigation
      navigation.dispatch(
        CommonActions.navigate({
          name: screen,
          params,
        })
      );
    },
    [navigation]
  );

  const push = useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      if (!navigation) return;
      navigation.dispatch(StackActions.push(screen, params));
    },
    [navigation]
  );

  const goBack = useCallback(() => {
    if (!navigation) return;
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const reset = useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      if (!navigation) return;
      navigation.reset({ index: 0, routes: [{ name: screen, params }] });
    },
    [navigation]
  );

  const replace = useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      if (!navigation) return;
      navigation.dispatch(StackActions.replace(screen, params));
    },
    [navigation]
  );

  const pop = useCallback(
    (count = 1) => {
      if (!navigation) return;
      navigation.dispatch(StackActions.pop(count));
    },
    [navigation]
  );

  const popToTop = useCallback(() => {
    if (!navigation) return;
    navigation.dispatch(StackActions.popToTop());
  }, [navigation]);

  const canGoBackCallback = useCallback(() => {
    return navigation ? navigation.canGoBack() : false;
  }, [navigation]);

  const getState = useCallback(() => {
    return navigation ? navigation.getState() : null;
  }, [navigation]);

  const getParent = useCallback(() => {
    return navigation ? navigation.getParent() : null;
  }, [navigation]);

  return useMemo(
    () => ({
      navigate,
      push,
      goBack,
      reset,
      replace,
      pop,
      popToTop,
      canGoBack: canGoBackCallback,
      getState,
      getParent,
      isReady,
    }),
    [navigate, push, goBack, reset, replace, pop, popToTop, canGoBackCallback, getState, getParent, isReady]
  );
}

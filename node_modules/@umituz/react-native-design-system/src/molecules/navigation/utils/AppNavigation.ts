import { NavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';

/**
 * Global Navigation Implementation
 * Single source of truth for all navigation actions.
 */

let navigationRef: NavigationContainerRef<any> | null = null;

/**
 * Set the global navigation reference.
 * Should be called in the root NavigationContainer.
 */
export const setRef = (ref: NavigationContainerRef<any> | null): void => {
    if (__DEV__) {
    }
    navigationRef = ref;
};

/**
 * Get the current navigation reference.
 */
export const getRef = (): NavigationContainerRef<any> | null => navigationRef;

/**
 * Check if the navigator is ready.
 */
export const isReady = (): boolean => navigationRef?.isReady() ?? false;

/**
 * Check if the navigator can go back.
 */
export const canGoBack = (): boolean => navigationRef?.canGoBack() ?? false;

/**
 * Navigate to a specific route.
 * Supports both simple and nested navigation.
 */
export const navigate = (name: string, params?: object): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady()) {
        navigationRef.navigate(name, params);
    }
};

/**
 * Navigate to a nested screen in a specific navigator.
 * @param navigatorName - The name of the parent navigator
 * @param screenName - The name of the screen within that navigator
 * @param params - Optional parameters to pass to the screen
 */
export const navigateNested = (navigatorName: string, screenName: string, params?: object): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady()) {
        navigationRef.navigate(navigatorName, {
            screen: screenName,
            params,
        });
    }
};

/**
 * Push a new route onto the stack.
 */
export const push = (name: string, params?: object): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady()) {
        navigationRef.dispatch(StackActions.push(name, params));
    }
};

/**
 * Go back to the previous screen.
 */
export const goBack = (): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
};

/**
 * Reset the navigation state.
 */
export const reset = (name: string, params?: object): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name, params }],
            })
        );
    }
};

/**
 * Replace the current route.
 */
export const replace = (name: string, params?: object): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
};

/**
 * Pop to the top of the stack.
 */
export const popToTop = (): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady()) {
        navigationRef.dispatch(StackActions.popToTop());
    }
};

/**
 * Pop specific number of screens.
 */
export const pop = (count: number = 1): void => {
    if (__DEV__) {
    }
    if (navigationRef?.isReady()) {
        navigationRef.dispatch(StackActions.pop(count));
    }
};

/**
 * Get the current route name.
 */
export const getCurrentRoute = (): string | undefined => {
    return navigationRef?.getCurrentRoute()?.name;
};

/**
 * Unified AppNavigation Object for both static and hook-based usage.
 */
export const AppNavigation = {
    setRef,
    getRef,
    isReady,
    canGoBack,
    navigate,
    navigateNested,
    push,
    goBack,
    reset,
    replace,
    popToTop,
    pop,
    getCurrentRoute,
};

import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";
import React from "react";

/**
 * NavigationContainer Component
 *
 * Wrapper around React Navigation's NavigationContainer
 * Provides navigation support to applications.
 */
export const NavigationContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <RNNavigationContainer>{children}</RNNavigationContainer>;
};

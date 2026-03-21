/**
 * Storage Helpers
 * Single Responsibility: Common storage operations and error handling
 */

import { storageRepository, unwrap } from "../../../../storage";
import type { OnboardingUserData } from "../../../domain/entities/OnboardingUserData";

export const DEFAULT_STORAGE_KEY = "@onboarding:completed";
export const USER_DATA_STORAGE_KEY = "@onboarding:user_data";

export async function loadCompletionStatus(storageKey: string): Promise<boolean> {
  const result = await storageRepository.getString(storageKey, "false");
  return unwrap(result, "false") === "true";
}

export async function loadUserData(
  defaultData: OnboardingUserData
): Promise<OnboardingUserData> {
  const result = await storageRepository.getItem<OnboardingUserData>(
    USER_DATA_STORAGE_KEY,
    defaultData
  );
  return unwrap(result, defaultData);
}

export async function saveCompletionStatus(storageKey: string): Promise<void> {
  const result = await storageRepository.setString(storageKey, "true");
  if (!result.success) {
    throw new Error("Failed to save completion status to storage");
  }
}

export async function saveUserData(data: OnboardingUserData): Promise<void> {
  const result = await storageRepository.setItem(USER_DATA_STORAGE_KEY, data);
  if (!result.success) {
    throw new Error("Failed to save user data to storage");
  }
}

export async function removeStorageKeys(storageKey: string): Promise<void> {
  await storageRepository.removeItem(storageKey);
  await storageRepository.removeItem(USER_DATA_STORAGE_KEY);
}

export function handleError(error: unknown, context: string): string {
  const message = error instanceof Error ? error.message : `Failed to ${context}`;

  if (__DEV__) {
  }

  return message;
}

export function logSuccess(_message: string): void {
  if (__DEV__) {
  }
}

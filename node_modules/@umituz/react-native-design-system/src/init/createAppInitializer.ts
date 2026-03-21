/**
 * App Initializer Factory
 * Creates a singleton app initializer with ordered module execution
 */

import type {
  AppInitializerConfig,
  AppInitializerResult,
  InitModule,
} from "./types";


/**
 * Create an app initializer with singleton pattern
 *
 * @example
 * ```typescript
 * const initializeApp = createAppInitializer({
 *   modules: [
 *     { name: 'firebase', init: initFirebase, critical: true },
 *     { name: 'auth', init: initAuth, critical: true, dependsOn: ['firebase'] },
 *     { name: 'subscription', init: initSubscription, dependsOn: ['auth'] },
 *     { name: 'ai', init: initAI },
 *   ],
 * });
 *
 * await initializeApp();
 * ```
 */
export function createAppInitializer(
  config: AppInitializerConfig
): () => Promise<AppInitializerResult> {
  const {
    modules,
    debug = __DEV__,
    continueOnError = true,
    onComplete,
    onError,
  } = config;

  let initializationPromise: Promise<AppInitializerResult> | null = null;
  let isInitialized = false;

  const log = (message: string, ...args: unknown[]) => {
    if (debug) {
      console.log(`[AppInitializer] ${message}`, ...args);
    }
  };

  const sortModulesByDependency = (mods: InitModule[]): InitModule[] => {
    const sorted: InitModule[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (mod: InitModule) => {
      if (visited.has(mod.name)) return;
      if (visiting.has(mod.name)) {
        throw new Error(`Circular dependency detected: ${mod.name}`);
      }

      visiting.add(mod.name);

      if (mod.dependsOn) {
        for (const depName of mod.dependsOn) {
          const dep = mods.find((m) => m.name === depName);
          if (dep) visit(dep);
        }
      }

      visiting.delete(mod.name);
      visited.add(mod.name);
      sorted.push(mod);
    };

    for (const mod of mods) {
      visit(mod);
    }

    return sorted;
  };

  const performInitialization = async (): Promise<AppInitializerResult> => {
    const startTime = Date.now();
    const failedModules: string[] = [];

    log("Starting initialization...");

    const sortedModules = sortModulesByDependency(modules);

    for (const mod of sortedModules) {
      log(`Initializing: ${mod.name}`);

      try {
        const result = await mod.init();

        if (result === false) {
          throw new Error(`Module ${mod.name} returned false`);
        }

        log(`Completed: ${mod.name}`);
      } catch (error) {
        log(`Failed: ${mod.name}`, error);
        failedModules.push(mod.name);

        onError?.(mod.name, error);

        if (mod.critical && !continueOnError) {
          return {
            success: false,
            failedModules,
            duration: Date.now() - startTime,
          };
        }
      }
    }

    const duration = Date.now() - startTime;
    const success = failedModules.length === 0;

    log(`Initialization complete in ${duration}ms`, {
      success,
      failedModules,
    });

    isInitialized = true;
    onComplete?.();

    return { success, failedModules, duration };
  };

  return async () => {
    if (isInitialized) {
      return { success: true, failedModules: [], duration: 0 };
    }

    if (initializationPromise) {
      return initializationPromise;
    }

    initializationPromise = performInitialization();
    return initializationPromise;
  };
}

/**
 * Create a simple initialization module
 */
export function createInitModule(
  name: string,
  init: () => Promise<void> | void,
  options?: Partial<Omit<InitModule, "name" | "init">>
): InitModule {
  return {
    name,
    init: async () => {
      await init();
      return true;
    },
    ...options,
  };
}

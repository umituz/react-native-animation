/**
 * Network Events
 * Event emitter for network state changes
 * Allows subscribing to network events throughout the app
 */

import type { NetworkState } from '../../types';

export type NetworkEventListener = (state: NetworkState) => void;

export interface NetworkEvents {
  on(event: 'online', listener: NetworkEventListener): void;
  on(event: 'offline', listener: NetworkEventListener): void;
  on(event: 'change', listener: NetworkEventListener): void;
  off(event: 'online' | 'offline' | 'change', listener: NetworkEventListener): void;
  emit(event: 'online' | 'offline' | 'change', state: NetworkState): void;
  removeAllListeners(): void;
}

class NetworkEventEmitter implements NetworkEvents {
  private listeners: Map<string, Set<NetworkEventListener>> = new Map();

  on(event: 'online' | 'offline' | 'change', listener: NetworkEventListener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(listener);
  }

  off(event: 'online' | 'offline' | 'change', listener: NetworkEventListener): void {
    this.listeners.get(event)?.delete(listener);
  }

  emit(event: 'online' | 'offline' | 'change', state: NetworkState): void {
    const listeners = this.listeners.get(event);
    if (!listeners) return;

    const failedListeners: NetworkEventListener[] = [];
    listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (_error) {
        failedListeners.push(listener);
        if (__DEV__) {
          console.error('[DesignSystem] NetworkEventEmitter: listener threw an error', _error);
        }
      }
    });
    failedListeners.forEach((listener) => listeners.delete(listener));
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}

export const networkEvents = new NetworkEventEmitter();

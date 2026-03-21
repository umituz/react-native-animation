/**
 * Device Domain - useDeviceInfo Hook
 *
 * React hook for device and application information.
 */

import { DeviceService } from '../../infrastructure/services/DeviceService';
import { PersistentDeviceIdService } from '../../infrastructure/services/PersistentDeviceIdService';
import { useAsyncOperation } from '../../../utils/hooks';

export const useDeviceInfo = () => {
  const systemOp = useAsyncOperation(
    () => DeviceService.getSystemInfo(),
    {
      immediate: true,
      initialData: null,
      errorHandler: () => null, // Silent error handling
    }
  );

  const deviceOp = useAsyncOperation(
    () => DeviceService.getDeviceInfo(),
    {
      immediate: false,
      initialData: null,
      errorHandler: () => null,
    }
  );

  const appOp = useAsyncOperation(
    () => DeviceService.getApplicationInfo(),
    {
      immediate: false,
      initialData: null,
      errorHandler: () => null,
    }
  );

  return {
    deviceInfo: systemOp.data?.device ?? deviceOp.data,
    appInfo: systemOp.data?.application ?? appOp.data,
    systemInfo: systemOp.data,
    isLoading: systemOp.isLoading || deviceOp.isLoading || appOp.isLoading,
    error: null,
    refresh: systemOp.execute,
    loadDeviceInfo: deviceOp.execute,
    loadAppInfo: appOp.execute,
  };
};

export const useDeviceCapabilities = () => {
  const { data: capabilities, isLoading } = useAsyncOperation(
    () => DeviceService.getDeviceCapabilities(),
    {
      immediate: true,
      initialData: null,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to load device capabilities',
    }
  );

  return {
    isDevice: capabilities?.isDevice ?? false,
    isTablet: capabilities?.isTablet ?? false,
    hasNotch: capabilities?.hasNotch ?? false,
    totalMemoryGB: capabilities?.totalMemoryGB ?? null,
    isLoading,
  };
};

export const useDeviceId = () => {
  const { data: deviceId, isLoading } = useAsyncOperation(
    () => PersistentDeviceIdService.getDeviceId(),
    {
      immediate: true,
      initialData: null,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to load device ID',
    }
  );

  return { deviceId, isLoading };
};

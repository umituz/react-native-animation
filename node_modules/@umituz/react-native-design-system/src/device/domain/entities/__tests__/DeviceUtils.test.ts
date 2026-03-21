/**
 * Device Utils Tests
 */

import { DEVICE_CONSTANTS } from '../Device';
import { DeviceUtils } from '../DeviceUtils';

describe('DeviceUtils', () => {
  const mockDeviceInfo = {
    brand: 'Apple',
    manufacturer: 'Apple',
    modelName: 'iPhone 14',
    modelId: 'iPhone14,1',
    deviceName: 'Test iPhone',
    deviceYearClass: 2022,
    deviceType: DEVICE_CONSTANTS.DEVICE_TYPE.PHONE,
    isDevice: true,
    osName: 'iOS',
    osVersion: '16.0',
    osBuildId: '20A362',
    platformApiLevel: null,
    totalMemory: 6442450944, // 6GB
    platform: 'ios' as const,
  };

  const mockAppInfo = {
    applicationName: 'Test App',
    applicationId: 'com.test.app',
    nativeApplicationVersion: '1.0.0',
    nativeBuildVersion: '100',
    installTime: new Date('2023-01-01'),
    lastUpdateTime: new Date('2023-01-15'),
    androidId: null,
    iosIdForVendor: 'test-ios-id',
  };

  describe('isPhysicalDevice', () => {
    it('should return true for physical device', () => {
      expect(DeviceUtils.isPhysicalDevice(true)).toBe(true);
    });

    it('should return false for simulator', () => {
      expect(DeviceUtils.isPhysicalDevice(false)).toBe(false);
    });
  });

  describe('getDeviceDisplayName', () => {
    it('should return device name when available', () => {
      const result = DeviceUtils.getDeviceDisplayName(mockDeviceInfo);
      expect(result).toBe('Test iPhone');
    });

    it('should return model name when device name is null', () => {
      const info = { ...mockDeviceInfo, deviceName: null };
      const result = DeviceUtils.getDeviceDisplayName(info);
      expect(result).toBe('iPhone 14');
    });

    it('should return brand and manufacturer when model name is null', () => {
      const info = { ...mockDeviceInfo, deviceName: null, modelName: null };
      const result = DeviceUtils.getDeviceDisplayName(info);
      expect(result).toBe('Apple Apple');
    });

    it('should return Unknown Device when all info is null', () => {
      const info = { ...mockDeviceInfo, deviceName: null, modelName: null, brand: null, manufacturer: null };
      const result = DeviceUtils.getDeviceDisplayName(info);
      expect(result).toBe('Unknown Device');
    });
  });

  describe('getOSDisplayString', () => {
    it('should return OS name and version', () => {
      const result = DeviceUtils.getOSDisplayString(mockDeviceInfo);
      expect(result).toBe('iOS 16.0');
    });

    it('should return OS name only when version is null', () => {
      const info = { ...mockDeviceInfo, osVersion: null };
      const result = DeviceUtils.getOSDisplayString(info);
      expect(result).toBe('iOS');
    });

    it('should return Unknown OS when OS name is null', () => {
      const info = { ...mockDeviceInfo, osName: null };
      const result = DeviceUtils.getOSDisplayString(info);
      expect(result).toBe('Unknown OS');
    });
  });

  describe('getAppVersionString', () => {
    it('should return version and build number', () => {
      const result = DeviceUtils.getAppVersionString(mockAppInfo);
      expect(result).toBe('1.0.0 (100)');
    });

    it('should return version only when build is null', () => {
      const info = { ...mockAppInfo, nativeBuildVersion: null };
      const result = DeviceUtils.getAppVersionString(info);
      expect(result).toBe('1.0.0');
    });

    it('should return Unknown Version when version is null', () => {
      const info = { ...mockAppInfo, nativeApplicationVersion: null };
      const result = DeviceUtils.getAppVersionString(info);
      expect(result).toBe('Unknown Version');
    });
  });

  describe('meetsMinimumRequirements', () => {
    it('should pass for device meeting all requirements', () => {
      const result = DeviceUtils.meetsMinimumRequirements(mockDeviceInfo, 4);
      expect(result.meets).toBe(true);
      expect(result.reasons).toHaveLength(0);
    });

    it('should fail for simulator', () => {
      const info = { ...mockDeviceInfo, isDevice: false };
      const result = DeviceUtils.meetsMinimumRequirements(info, 1);
      expect(result.meets).toBe(false);
      expect(result.reasons).toContain('Running on simulator/emulator');
    });

    it('should fail for insufficient memory', () => {
      const result = DeviceUtils.meetsMinimumRequirements(mockDeviceInfo, 8);
      expect(result.meets).toBe(false);
      expect(result.reasons[0]).toContain('Insufficient memory');
    });

    it('should fail for old device', () => {
      const info = { ...mockDeviceInfo, deviceYearClass: 2016 };
      const result = DeviceUtils.meetsMinimumRequirements(info, 1);
      expect(result.meets).toBe(false);
      expect(result.reasons[0]).toContain('Device too old: 2016');
    });
  });

  describe('getDeviceTier', () => {
    it('should return high for new device', () => {
      const result = DeviceUtils.getDeviceTier(mockDeviceInfo);
      expect(result).toBe('high');
    });

    it('should return mid for 2020 device', () => {
      const info = { ...mockDeviceInfo, deviceYearClass: 2020 };
      const result = DeviceUtils.getDeviceTier(info);
      expect(result).toBe('mid');
    });

    it('should return low for old device', () => {
      const info = { ...mockDeviceInfo, deviceYearClass: 2017 };
      const result = DeviceUtils.getDeviceTier(info);
      expect(result).toBe('low');
    });

    it('should classify by memory when year is null', () => {
      const info = { ...mockDeviceInfo, deviceYearClass: null, totalMemory: 8589934592 }; // 8GB
      const result = DeviceUtils.getDeviceTier(info);
      expect(result).toBe('high');
    });

    it('should return mid when no info available', () => {
      const info = { ...mockDeviceInfo, deviceYearClass: null, totalMemory: null };
      const result = DeviceUtils.getDeviceTier(info);
      expect(result).toBe('mid');
    });
  });
});
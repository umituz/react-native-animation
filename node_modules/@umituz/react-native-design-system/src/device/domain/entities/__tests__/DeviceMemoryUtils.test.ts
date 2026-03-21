/**
 * Device Memory Utils Tests
 */

import { DeviceMemoryUtils } from '../DeviceMemoryUtils';

describe('DeviceMemoryUtils', () => {
  describe('bytesToGB', () => {
    it('should convert bytes to gigabytes', () => {
      const bytes = 6442450944; // 6GB
      const result = DeviceMemoryUtils.bytesToGB(bytes);
      expect(result).toBe(6);
    });

    it('should handle decimal values', () => {
      const bytes = 3221225472; // 3GB
      const result = DeviceMemoryUtils.bytesToGB(bytes);
      expect(result).toBe(3);
    });
  });

  describe('bytesToMB', () => {
    it('should convert bytes to megabytes', () => {
      const bytes = 1048576; // 1MB
      const result = DeviceMemoryUtils.bytesToMB(bytes);
      expect(result).toBe(1);
    });

    it('should handle larger values', () => {
      const bytes = 6442450944; // 6GB = 6144MB
      const result = DeviceMemoryUtils.bytesToMB(bytes);
      expect(result).toBe(6144);
    });
  });

  describe('formatMemorySize', () => {
    it('should format bytes in GB when >= 1GB', () => {
      const bytes = 6442450944; // 6GB
      const result = DeviceMemoryUtils.formatMemorySize(bytes);
      expect(result).toBe('6.00 GB');
    });

    it('should format bytes in MB when < 1GB', () => {
      const bytes = 524288000; // ~500MB
      const result = DeviceMemoryUtils.formatMemorySize(bytes);
      expect(result).toBe('500.00 MB');
    });

    it('should return Unknown for null bytes', () => {
      const result = DeviceMemoryUtils.formatMemorySize(null);
      expect(result).toBe('Unknown');
    });

    it('should format with 2 decimal places', () => {
      const bytes = 15032385536; // 14GB
      const result = DeviceMemoryUtils.formatMemorySize(bytes);
      expect(result).toBe('14.00 GB');
    });
  });

  describe('hasSufficientMemory', () => {
    it('should return true when memory is sufficient', () => {
      const totalMemory = 6442450944; // 6GB
      const result = DeviceMemoryUtils.hasSufficientMemory(totalMemory, 4);
      expect(result).toBe(true);
    });

    it('should return false when memory is insufficient', () => {
      const totalMemory = 2147483648; // 2GB
      const result = DeviceMemoryUtils.hasSufficientMemory(totalMemory, 4);
      expect(result).toBe(false);
    });

    it('should return false for null memory', () => {
      const result = DeviceMemoryUtils.hasSufficientMemory(null, 4);
      expect(result).toBe(false);
    });

    it('should handle exact match', () => {
      const totalMemory = 4294967296; // 4GB
      const result = DeviceMemoryUtils.hasSufficientMemory(totalMemory, 4);
      expect(result).toBe(true);
    });
  });

  describe('getMemoryTier', () => {
    it('should return high for >= 6GB', () => {
      const totalMemory = 6442450944; // 6GB
      const result = DeviceMemoryUtils.getMemoryTier(totalMemory);
      expect(result).toBe('high');
    });

    it('should return mid for >= 3GB and < 6GB', () => {
      const totalMemory = 4294967296; // 4GB
      const result = DeviceMemoryUtils.getMemoryTier(totalMemory);
      expect(result).toBe('mid');
    });

    it('should return low for < 3GB', () => {
      const totalMemory = 2147483648; // 2GB
      const result = DeviceMemoryUtils.getMemoryTier(totalMemory);
      expect(result).toBe('low');
    });

    it('should return mid for null memory', () => {
      const result = DeviceMemoryUtils.getMemoryTier(null);
      expect(result).toBe('mid');
    });

    it('should handle boundary values', () => {
      const exactly3GB = 3221225472; // 3GB
      const exactly6GB = 6442450944; // 6GB
      
      expect(DeviceMemoryUtils.getMemoryTier(exactly3GB)).toBe('mid');
      expect(DeviceMemoryUtils.getMemoryTier(exactly6GB)).toBe('high');
    });
  });
});
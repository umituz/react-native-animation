/**
 * Device Type Utils Tests
 */

import { DeviceTypeUtils } from '../DeviceTypeUtils';
import { DEVICE_CONSTANTS } from '../Device';

describe('DeviceTypeUtils', () => {
  describe('isTablet', () => {
    it('should return true for tablet device', () => {
      expect(DeviceTypeUtils.isTablet(DEVICE_CONSTANTS.DEVICE_TYPE.TABLET)).toBe(true);
    });

    it('should return false for phone device', () => {
      expect(DeviceTypeUtils.isTablet(DEVICE_CONSTANTS.DEVICE_TYPE.PHONE)).toBe(false);
    });

    it('should return false for null device type', () => {
      expect(DeviceTypeUtils.isTablet(null)).toBe(false);
    });
  });

  describe('isPhone', () => {
    it('should return true for phone device', () => {
      expect(DeviceTypeUtils.isPhone(DEVICE_CONSTANTS.DEVICE_TYPE.PHONE)).toBe(true);
    });

    it('should return false for tablet device', () => {
      expect(DeviceTypeUtils.isPhone(DEVICE_CONSTANTS.DEVICE_TYPE.TABLET)).toBe(false);
    });

    it('should return false for null device type', () => {
      expect(DeviceTypeUtils.isPhone(null)).toBe(false);
    });
  });

  describe('isDesktop', () => {
    it('should return true for desktop device', () => {
      expect(DeviceTypeUtils.isDesktop(DEVICE_CONSTANTS.DEVICE_TYPE.DESKTOP)).toBe(true);
    });

    it('should return false for phone device', () => {
      expect(DeviceTypeUtils.isDesktop(DEVICE_CONSTANTS.DEVICE_TYPE.PHONE)).toBe(false);
    });

    it('should return false for null device type', () => {
      expect(DeviceTypeUtils.isDesktop(null)).toBe(false);
    });
  });

  describe('isTV', () => {
    it('should return true for TV device', () => {
      expect(DeviceTypeUtils.isTV(DEVICE_CONSTANTS.DEVICE_TYPE.TV)).toBe(true);
    });

    it('should return false for phone device', () => {
      expect(DeviceTypeUtils.isTV(DEVICE_CONSTANTS.DEVICE_TYPE.PHONE)).toBe(false);
    });

    it('should return false for null device type', () => {
      expect(DeviceTypeUtils.isTV(null)).toBe(false);
    });
  });

  describe('isUnknown', () => {
    it('should return true for unknown device', () => {
      expect(DeviceTypeUtils.isUnknown(DEVICE_CONSTANTS.DEVICE_TYPE.UNKNOWN)).toBe(true);
    });

    it('should return false for phone device', () => {
      expect(DeviceTypeUtils.isUnknown(DEVICE_CONSTANTS.DEVICE_TYPE.PHONE)).toBe(false);
    });

    it('should return false for null device type', () => {
      expect(DeviceTypeUtils.isUnknown(null)).toBe(false);
    });
  });

  describe('getDeviceTypeName', () => {
    it('should return Phone for phone device', () => {
      expect(DeviceTypeUtils.getDeviceTypeName(DEVICE_CONSTANTS.DEVICE_TYPE.PHONE)).toBe('Phone');
    });

    it('should return Tablet for tablet device', () => {
      expect(DeviceTypeUtils.getDeviceTypeName(DEVICE_CONSTANTS.DEVICE_TYPE.TABLET)).toBe('Tablet');
    });

    it('should return Desktop for desktop device', () => {
      expect(DeviceTypeUtils.getDeviceTypeName(DEVICE_CONSTANTS.DEVICE_TYPE.DESKTOP)).toBe('Desktop');
    });

    it('should return TV for TV device', () => {
      expect(DeviceTypeUtils.getDeviceTypeName(DEVICE_CONSTANTS.DEVICE_TYPE.TV)).toBe('TV');
    });

    it('should return Unknown for unknown device', () => {
      expect(DeviceTypeUtils.getDeviceTypeName(DEVICE_CONSTANTS.DEVICE_TYPE.UNKNOWN)).toBe('Unknown');
    });

    it('should return Unknown for null device type', () => {
      expect(DeviceTypeUtils.getDeviceTypeName(null)).toBe('Unknown');
    });
  });
});
import { NavigationValidator } from '../NavigationValidator';
import type { TabScreen, StackScreen } from '../../types';

describe('NavigationValidator', () => {
  const mockTabScreens: TabScreen[] = [
    {
      name: 'Home',
      component: () => null,
      label: 'Home',
      icon: 'home',
    },
    {
      name: 'Profile',
      component: () => null,
      label: 'Profile',
      icon: 'profile',
    },
  ];

  const mockStackScreens: StackScreen[] = [
    {
      name: 'Home',
      component: () => null,
    },
    {
      name: 'Profile',
      component: () => null,
    },
  ];

  describe('validateScreens', () => {
    describe('tab navigator validation', () => {
      it('should validate valid tab screens', () => {
        expect(() => {
          NavigationValidator.validateScreens(mockTabScreens, 'tab');
        }).not.toThrow();
      });

      it('should throw error for non-array screens', () => {
        expect(() => {
          NavigationValidator.validateScreens({} as any, 'tab');
        }).toThrow('Screens must be an array for tab navigator');
      });

      it('should warn for empty screens array', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

        NavigationValidator.validateScreens([], 'tab');

        expect(consoleSpy).toHaveBeenCalledWith('[NavigationValidator] No screens provided for tab navigator');
        consoleSpy.mockRestore();
      });

      it('should throw error for screen without name', () => {
        const invalidScreens = [{ component: () => null, label: 'Test', icon: 'test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'tab');
        }).toThrow('Screen at index 0 must have a valid non-empty name');
      });

      it('should throw error for screen with empty name', () => {
        const invalidScreens = [{ name: '', component: () => null, label: 'Test', icon: 'test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'tab');
        }).toThrow('Screen at index 0 must have a valid non-empty name');
      });

      it('should throw error for screen without component', () => {
        const invalidScreens = [{ name: 'Test', label: 'Test', icon: 'test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'tab');
        }).toThrow('Screen \'Test\' must have a valid component');
      });

      it('should throw error for screen with invalid component', () => {
        const invalidScreens = [{ name: 'Test', component: 'not-a-function', label: 'Test', icon: 'test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'tab');
        }).toThrow('Screen \'Test\' must have a valid component');
      });

      it('should throw error for tab screen without label', () => {
        const invalidScreens = [{ name: 'Test', component: () => null, icon: 'test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'tab');
        }).toThrow('Tab screen \'Test\' must have a valid non-empty label');
      });

      it('should throw error for tab screen with empty label', () => {
        const invalidScreens = [{ name: 'Test', component: () => null, label: '', icon: 'test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'tab');
        }).toThrow('Tab screen \'Test\' must have a valid non-empty label');
      });

      it('should warn for tab screen with invalid icon', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        const screensWithInvalidIcon = [{ name: 'Test', component: () => null, label: 'Test', icon: '' }] as any;

        NavigationValidator.validateScreens(screensWithInvalidIcon, 'tab');

        expect(consoleSpy).toHaveBeenCalledWith('[NavigationValidator] Tab screen \'Test\' has invalid icon, it will be ignored');
        consoleSpy.mockRestore();
      });

      it('should throw error for tab screen with too long label', () => {
        const longLabel = 'a'.repeat(51);
        const invalidScreens = [{ name: 'Test', component: () => null, label: longLabel, icon: 'test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'tab');
        }).toThrow('Tab screen \'Test\' label too long (max 50 characters)');
      });

      it('should throw error for duplicate screen names', () => {
        const duplicateScreens = [
          { name: 'Home', component: () => null, label: 'Home', icon: 'home' },
          { name: 'Home', component: () => null, label: 'Home 2', icon: 'home2' },
        ] as any;

        expect(() => {
          NavigationValidator.validateScreens(duplicateScreens, 'tab');
        }).toThrow('Duplicate screen name \'Home\' found at index 1');
      });
    });

    describe('stack navigator validation', () => {
      it('should validate valid stack screens', () => {
        expect(() => {
          NavigationValidator.validateScreens(mockStackScreens, 'stack');
        }).not.toThrow();
      });

      it('should throw error for stack screen without name', () => {
        const invalidScreens = [{ component: () => null }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'stack');
        }).toThrow('Screen at index 0 must have a valid non-empty name');
      });

      it('should throw error for stack screen without component', () => {
        const invalidScreens = [{ name: 'Test' }] as any;

        expect(() => {
          NavigationValidator.validateScreens(invalidScreens, 'stack');
        }).toThrow('Screen \'Test\' must have a valid component');
      });

      it('should throw error for duplicate stack screen names', () => {
        const duplicateScreens = [
          { name: 'Home', component: () => null },
          { name: 'Home', component: () => null },
        ] as any;

        expect(() => {
          NavigationValidator.validateScreens(duplicateScreens, 'stack');
        }).toThrow('Duplicate screen name \'Home\' found at index 1');
      });
    });
  });

  describe('validateInitialRoute', () => {
    it('should not throw for valid initial route', () => {
      expect(() => {
        NavigationValidator.validateInitialRoute('Home', mockTabScreens);
      }).not.toThrow();
    });

    it('should not throw for undefined initial route', () => {
      expect(() => {
        NavigationValidator.validateInitialRoute(undefined, mockTabScreens);
      }).not.toThrow();
    });

    it('should throw error for initial route not in screens', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        NavigationValidator.validateInitialRoute('NonExistent', mockTabScreens);
      }).toThrow('Initial route \'NonExistent\' not found in screens. Available screens: Home, Profile');

      consoleSpy.mockRestore();
    });

    it('should log error in development for invalid initial route', () => {
      const originalDev = __DEV__;
      (global as any).__DEV__ = true;
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      try {
        NavigationValidator.validateInitialRoute('NonExistent', mockTabScreens);
      } catch {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        '[NavigationValidator] Initial route \'NonExistent\' not found in screens. Available screens: Home, Profile'
      );

      (global as any).__DEV__ = originalDev;
      consoleSpy.mockRestore();
    });

    it('should handle empty screens array', () => {
      expect(() => {
        NavigationValidator.validateInitialRoute('Home', []);
      }).toThrow('Initial route \'Home\' not found in screens. Available screens: ');
    });

    it('should work with both tab and stack screens', () => {
      expect(() => {
        NavigationValidator.validateInitialRoute('Home', mockTabScreens);
        NavigationValidator.validateInitialRoute('Profile', mockStackScreens);
      }).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle screens with whitespace-only names', () => {
      const invalidScreens = [{ name: '   ', component: () => null, label: 'Test', icon: 'test' }] as any;

      expect(() => {
        NavigationValidator.validateScreens(invalidScreens, 'tab');
      }).toThrow('Screen at index 0 must have a valid non-empty name');
    });

    it('should handle screens with whitespace-only labels', () => {
      const invalidScreens = [{ name: 'Test', component: () => null, label: '   ', icon: 'test' }] as any;

      expect(() => {
        NavigationValidator.validateScreens(invalidScreens, 'tab');
      }).toThrow('Tab screen \'Test\' must have a valid non-empty label');
    });

    it('should handle null/undefined values gracefully', () => {
      expect(() => {
        NavigationValidator.validateScreens(null as any, 'tab');
      }).toThrow('Screens must be an array for tab navigator');

      expect(() => {
        NavigationValidator.validateScreens(undefined as any, 'tab');
      }).toThrow('Screens must be an array for tab navigator');
    });
  });
});
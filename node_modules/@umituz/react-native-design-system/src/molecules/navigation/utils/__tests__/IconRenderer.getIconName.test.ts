import { IconRenderer } from '../IconRenderer';

describe('IconRenderer - getIconName', () => {
  it('should return original icon when no getTabIcon function provided', () => {
    const result = IconRenderer.getIconName(
      'Home',
      true,
      'home',
      undefined
    );

    expect(result).toBe('home');
  });

  it('should get icon name using getTabIcon function', () => {
    const getTabIcon = jest.fn((routeName, focused) => 
      focused ? `${routeName}-active` : `${routeName}-inactive`
    );

    const result = IconRenderer.getIconName(
      'Home',
      true,
      'home',
      getTabIcon
    );

    expect(result).toBe('Home-active');
    expect(getTabIcon).toHaveBeenCalledWith('Home', true);
  });

  it('should call getTabIcon when provided', () => {
    const getTabIcon = jest.fn((routeName, focused) => 
      `${routeName}-${focused ? 'active' : 'inactive'}`
    );

    IconRenderer.getIconName(
      'Home',
      true,
      'home',
      getTabIcon
    );

    expect(getTabIcon).toHaveBeenCalledWith('Home', true);
  });

  it('should handle different focus states', () => {
    const getTabIcon = jest.fn((routeName, focused) => 
      `${routeName}-${focused ? 'focused' : 'unfocused'}`
    );

    const focusedResult = IconRenderer.getIconName(
      'Home',
      true,
      'home',
      getTabIcon
    );

    const unfocusedResult = IconRenderer.getIconName(
      'Home',
      false,
      'home',
      getTabIcon
    );

    expect(focusedResult).toBe('Home-focused');
    expect(unfocusedResult).toBe('Home-unfocused');
    expect(getTabIcon).toHaveBeenCalledTimes(2);
  });

  it('should handle different route names', () => {
    const getTabIcon = jest.fn((routeName, focused) => 
      `${routeName}-${focused ? 'on' : 'off'}`
    );

    const profileResult = IconRenderer.getIconName(
      'Profile',
      true,
      'profile',
      getTabIcon
    );

    const settingsResult = IconRenderer.getIconName(
      'Settings',
      false,
      'settings',
      getTabIcon
    );

    expect(profileResult).toBe('Profile-on');
    expect(settingsResult).toBe('Settings-off');
    expect(getTabIcon).toHaveBeenCalledTimes(2);
  });

  it('should handle original icon parameter correctly', () => {
    const getTabIcon = jest.fn((routeName, focused) => 
      `${routeName}-${focused ? 'active' : 'inactive'}`
    );

    const result = IconRenderer.getIconName(
      'Home',
      true,
      'home-icon',
      getTabIcon
    );

    expect(result).toBe('Home-active');
    expect(getTabIcon).toHaveBeenCalledWith('Home', true);
  });
});
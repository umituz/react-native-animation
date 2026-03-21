import React from "react";
import { IconRenderer } from "../IconRenderer";

describe("IconRenderer - renderIcon", () => {
  it("should return null when no renderIcon function provided", () => {
    const result = IconRenderer.renderIcon({
      iconName: "home",
      focused: true,
      routeName: "Home",
      isFab: false,
    });

    expect(result).toBeNull();
  });

  it("should render icon using renderIcon function", () => {
    const MockIcon = () => React.createElement("View", { testID: "mock-icon" });
    const renderIcon = jest.fn(() => React.createElement(MockIcon));

    const result = IconRenderer.renderIcon(
      {
        iconName: "home",
        focused: true,
        routeName: "Home",
        isFab: false,
      },
      renderIcon
    );

    expect(renderIcon).toHaveBeenCalledWith("home", true, "Home", false);
    expect(result).toBeTruthy();
  });

  it("should return null when renderIcon throws error", () => {
    const renderIcon = jest.fn(() => {
      throw new Error("Icon render failed");
    });

    const result = IconRenderer.renderIcon(
      {
        iconName: "home",
        focused: true,
        routeName: "Home",
        isFab: false,
      },
      renderIcon
    );

    expect(result).toBeNull();
  });

  it("should render icon successfully", () => {
    const renderIcon = jest.fn(() => React.createElement("View"));

    const result = IconRenderer.renderIcon(
      {
        iconName: "home",
        focused: true,
        routeName: "Home",
        isFab: false,
      },
      renderIcon
    );

    expect(renderIcon).toHaveBeenCalledWith("home", true, "Home", false);
    expect(result).toBeTruthy();
  });

  it("should pass correct parameters to renderIcon function", () => {
    const renderIcon = jest.fn(() => React.createElement("View"));

    IconRenderer.renderIcon(
      {
        iconName: "profile",
        focused: false,
        routeName: "Profile",
        isFab: false,
      },
      renderIcon
    );

    expect(renderIcon).toHaveBeenCalledWith("profile", false, "Profile", false);
  });

  it("should pass isFab true for FAB tabs", () => {
    const renderIcon = jest.fn(() => React.createElement("View"));

    IconRenderer.renderIcon(
      {
        iconName: "zap",
        focused: true,
        routeName: "Generate",
        isFab: true,
      },
      renderIcon
    );

    expect(renderIcon).toHaveBeenCalledWith("zap", true, "Generate", true);
  });

  it("should handle different icon names with isFab", () => {
    const renderIcon = jest.fn(() => React.createElement("View"));

    IconRenderer.renderIcon(
      {
        iconName: "settings",
        focused: true,
        routeName: "Settings",
        isFab: false,
      },
      renderIcon
    );

    expect(renderIcon).toHaveBeenCalledWith("settings", true, "Settings", false);
  });
});

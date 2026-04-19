/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'node:fs';
import type { Theme, ThemeType, ColorsTheme, CustomTheme } from './theme.js';
import type { SemanticColors } from './semantic-tokens.js';
export interface ThemeDisplay {
  name: string;
  type: ThemeType;
  isCustom?: boolean;
}
export declare const DEFAULT_THEME: Theme;
declare class ThemeManager {
  private readonly availableThemes;
  private activeTheme;
  private settingsThemes;
  private extensionThemes;
  private fileThemes;
  private terminalBackground;
  private cachedColors;
  private cachedSemanticColors;
  private lastCacheKey;
  private fs;
  private homedir;
  constructor(dependencies?: { fs?: typeof fs; homedir?: () => string });
  setTerminalBackground(color: string | undefined): void;
  getTerminalBackground(): string | undefined;
  private clearCache;
  isDefaultTheme(themeName: string | undefined): boolean;
  /**
   * Loads custom themes from settings.
   * @param customThemesSettings Custom themes from settings.
   */
  loadCustomThemes(customThemesSettings?: Record<string, CustomTheme>): void;
  /**
   * Loads custom themes from extensions.
   * @param extensionName The name of the extension providing the themes.
   * @param customThemes Custom themes from extensions.
   */
  registerExtensionThemes(
    extensionName: string,
    customThemes?: CustomTheme[],
  ): void;
  /**
   * Unregisters custom themes from extensions.
   * @param extensionName The name of the extension.
   * @param customThemes Custom themes to unregister.
   */
  unregisterExtensionThemes(
    extensionName: string,
    customThemes?: CustomTheme[],
  ): void;
  /**
   * Checks if themes for a given extension are already registered.
   * @param extensionName The name of the extension.
   * @returns True if any themes from the extension are registered.
   */
  hasExtensionThemes(extensionName: string): boolean;
  /**
   * Clears all registered extension themes.
   * This is primarily for testing purposes to reset state between tests.
   */
  clearExtensionThemes(): void;
  /**
   * Clears all themes loaded from files.
   * This is primarily for testing purposes to reset state between tests.
   */
  clearFileThemes(): void;
  /**
   * Re-initializes the ThemeManager with new dependencies.
   * This is primarily for testing to allow injecting mocks.
   */
  reinitialize(dependencies: { fs?: typeof fs; homedir?: () => string }): void;
  /**
   * Resets the ThemeManager state to defaults.
   * This is for testing purposes to ensure test isolation.
   */
  resetForTesting(dependencies?: {
    fs?: typeof fs;
    homedir?: () => string;
  }): void;
  setActiveTheme(themeName: string | undefined): boolean;
  /**
   * Gets the currently active theme.
   * @returns The active theme.
   */
  getActiveTheme(): Theme;
  /**
   * Gets the colors for the active theme, respecting the terminal background.
   * @returns The theme colors.
   */
  getColors(): ColorsTheme;
  /**
   * Gets the semantic colors for the active theme.
   * @returns The semantic colors.
   */
  getSemanticColors(): SemanticColors;
  isThemeCompatible(
    activeTheme: Theme,
    terminalBackground: string | undefined,
  ): boolean;
  private _getAllCustomThemes;
  /**
   * Gets a list of custom theme names.
   * @returns Array of custom theme names.
   */
  getCustomThemeNames(): string[];
  /**
   * Checks if a theme name is a custom theme.
   * @param themeName The theme name to check.
   * @returns True if the theme is custom.
   */
  isCustomTheme(themeName: string): boolean;
  /**
   * Returns a list of available theme names.
   */
  getAvailableThemes(): ThemeDisplay[];
  /**
   * Gets a theme by name.
   * @param themeName The name of the theme to get.
   * @returns The theme if found, undefined otherwise.
   */
  getTheme(themeName: string): Theme | undefined;
  /**
   * Gets all available themes.
   * @returns A list of all available themes.
   */
  getAllThemes(): Theme[];
  private isPath;
  private loadThemeFromFile;
  findThemeByName(themeName: string | undefined): Theme | undefined;
}
export declare const themeManager: ThemeManager;
export {};

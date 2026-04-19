/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { CSSProperties } from 'react';
import type { SemanticColors } from './semantic-tokens.js';
import type { CustomTheme } from '@google/gemini-cli-core';
export declare const INK_SUPPORTED_NAMES: Set<string>;
export declare const CSS_NAME_TO_HEX_MAP: {
  [k: string]: string;
};
export declare const INK_NAME_TO_HEX_MAP: Readonly<Record<string, string>>;
/**
 * Calculates the relative luminance of a color.
 * See https://www.w3.org/TR/WCAG20/#relativeluminancedef
 *
 * @param color Color string (hex or Ink-supported name)
 * @returns Luminance value (0-255)
 */
export declare function getLuminance(color: string): number;
/**
 * Resolves a CSS color value (name or hex) into an Ink-compatible color string.
 * @param colorValue The raw color string (e.g., 'blue', '#ff0000', 'darkkhaki').
 * @returns An Ink-compatible color string (hex or name), or undefined if not resolvable.
 */
export declare function resolveColor(colorValue: string): string | undefined;
export declare function interpolateColor(
  color1: string,
  color2: string,
  factor: number,
): string;
export declare function getThemeTypeFromBackgroundColor(
  backgroundColor: string | undefined,
): 'light' | 'dark' | undefined;
export type { CustomTheme };
export type ThemeType = 'light' | 'dark' | 'ansi' | 'custom';
export interface ColorsTheme {
  type: ThemeType;
  Background: string;
  Foreground: string;
  LightBlue: string;
  AccentBlue: string;
  AccentPurple: string;
  AccentCyan: string;
  AccentGreen: string;
  AccentYellow: string;
  AccentRed: string;
  DiffAdded: string;
  DiffRemoved: string;
  Comment: string;
  Gray: string;
  DarkGray: string;
  InputBackground?: string;
  MessageBackground?: string;
  FocusBackground?: string;
  FocusColor?: string;
  GradientColors?: string[];
}
export declare const lightTheme: ColorsTheme;
export declare const darkTheme: ColorsTheme;
export declare const ansiTheme: ColorsTheme;
export declare class Theme {
  readonly name: string;
  readonly type: ThemeType;
  readonly colors: ColorsTheme;
  /**
   * The default foreground color for text when no specific highlight rule applies.
   * This is an Ink-compatible color string (hex or name).
   */
  readonly defaultColor: string;
  /**
   * Stores the mapping from highlight.js class names (e.g., 'hljs-keyword')
   * to Ink-compatible color strings (hex or name).
   */
  protected readonly _colorMap: Readonly<Record<string, string>>;
  readonly semanticColors: SemanticColors;
  /**
   * Creates a new Theme instance.
   * @param name The name of the theme.
   * @param rawMappings The raw CSSProperties mappings from a react-syntax-highlighter theme object.
   */
  constructor(
    name: string,
    type: ThemeType,
    rawMappings: Record<string, CSSProperties>,
    colors: ColorsTheme,
    semanticColors?: SemanticColors,
  );
  /**
   * Gets the Ink-compatible color string for a given highlight.js class name.
   * @param hljsClass The highlight.js class name (e.g., 'hljs-keyword', 'hljs-string').
   * @returns The corresponding Ink color string (hex or name) if it exists.
   */
  getInkColor(hljsClass: string): string | undefined;
  /**
   * Resolves a CSS color value (name or hex) into an Ink-compatible color string.
   * @param colorValue The raw color string (e.g., 'blue', '#ff0000', 'darkkhaki').
   * @returns An Ink-compatible color string (hex or name), or undefined if not resolvable.
   */
  private static _resolveColor;
  /**
   * Builds the internal map from highlight.js class names to Ink-compatible color strings.
   * This method is protected and primarily intended for use by the constructor.
   * @param hljsTheme The raw CSSProperties mappings from a react-syntax-highlighter theme object.
   * @returns An Ink-compatible theme map (Record<string, string>).
   */
  protected _buildColorMap(
    hljsTheme: Record<string, CSSProperties>,
  ): Record<string, string>;
}
/**
 * Creates a Theme instance from a custom theme configuration.
 * @param customTheme The custom theme configuration.
 * @returns A new Theme instance.
 */
export declare function createCustomTheme(customTheme: CustomTheme): Theme;
/**
 * Validates a custom theme configuration.
 * @param customTheme The custom theme to validate.
 * @returns An object with isValid boolean and error message if invalid.
 */
export declare function validateCustomTheme(
  customTheme: Partial<CustomTheme>,
): {
  isValid: boolean;
  error?: string;
  warning?: string;
};
/**
 * Picks a default theme name based on terminal background color.
 * It first tries to find a theme with an exact background color match.
 * If no match is found, it falls back to a light or dark theme based on the
 * luminance of the background color.
 * @param terminalBackground The hex color string of the terminal background.
 * @param availableThemes A list of available themes to search through.
 * @param defaultDarkThemeName The name of the fallback dark theme.
 * @param defaultLightThemeName The name of the fallback light theme.
 * @returns The name of the chosen theme.
 */
export declare function pickDefaultThemeName(
  terminalBackground: string | undefined,
  availableThemes: readonly Theme[],
  defaultDarkThemeName: string,
  defaultLightThemeName: string,
): string;

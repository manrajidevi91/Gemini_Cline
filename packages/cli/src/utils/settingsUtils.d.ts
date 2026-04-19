/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Settings } from '../config/settings.js';
import {
  type SettingDefinition,
  type SettingsType,
  type SettingsValue,
} from '../config/settingsSchema.js';
import { type Config } from '@google/gemini-cli-core';
type FlattenedSchema = Record<
  string,
  SettingDefinition & {
    key: string;
  }
>;
/** Returns a flattened schema, the first call is memoized for future requests. */
export declare function getFlattenedSchema(): FlattenedSchema;
declare function clearFlattenedSchema(): void;
export declare function getSettingsByCategory(): Record<
  string,
  Array<
    SettingDefinition & {
      key: string;
    }
  >
>;
export declare function getSettingDefinition(key: string):
  | (SettingDefinition & {
      key: string;
    })
  | undefined;
export declare function requiresRestart(key: string): boolean;
export declare function getDefaultValue(key: string): SettingsValue;
/**
 * Get the effective default value for a setting, checking experiment values when available.
 * For settings like Context Compression Threshold, this will return the experiment value if set,
 * otherwise falls back to the schema default.
 */
export declare function getEffectiveDefaultValue(
  key: string,
  config?: Config,
): SettingsValue;
export declare function getRestartRequiredSettings(): string[];
/**
 * Get restart-required setting keys that are also visible in the dialog.
 * Non-dialog restart keys (e.g. parent container objects like mcpServers, tools)
 * are excluded because users cannot change them through the dialog.
 */
export declare function getDialogRestartRequiredSettings(): string[];
export declare function isRecord(
  value: unknown,
): value is Record<string, unknown>;
/**
 * Gets a value from a nested object using a key path array iteratively.
 */
export declare function getNestedValue(obj: unknown, path: string[]): unknown;
/**
 * Get the effective value for a setting falling back to the default value
 */
export declare function getEffectiveValue(
  key: string,
  settings: Settings,
): SettingsValue;
export declare function getAllSettingKeys(): string[];
export declare function getSettingsByType(type: SettingsType): Array<
  SettingDefinition & {
    key: string;
  }
>;
export declare function getSettingsRequiringRestart(): Array<
  SettingDefinition & {
    key: string;
  }
>;
/**
 * Validate if a setting key exists in the schema
 */
export declare function isValidSettingKey(key: string): boolean;
export declare function getSettingCategory(key: string): string | undefined;
export declare function shouldShowInDialog(key: string): boolean;
export declare function getDialogSettingKeys(): string[];
/**
 * Get all settings that should be shown in the dialog, grouped by category like "Advanced", "General", etc.
 */
export declare function getDialogSettingsByCategory(): Record<
  string,
  Array<
    SettingDefinition & {
      key: string;
    }
  >
>;
export declare function getDialogSettingsByType(type: SettingsType): Array<
  SettingDefinition & {
    key: string;
  }
>;
export declare function isInSettingsScope(
  key: string,
  scopeSettings: Settings,
): boolean;
/**
 * Appends a star (*) to settings that exist in the scope
 */
export declare function getDisplayValue(
  key: string,
  scopeSettings: Settings,
  _mergedSettings: Settings,
): string;
export declare function parseEditedValue(
  type: SettingsType,
  newValue: string,
): SettingsValue | null;
export declare function getEditValue(
  type: SettingsType,
  rawValue: SettingsValue,
): string | undefined;
export declare const TEST_ONLY: {
  clearFlattenedSchema: typeof clearFlattenedSchema;
};
export {};

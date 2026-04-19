/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { SettingScope, LoadedSettings } from '../config/settings.js';
import { type FeatureActionResult } from './featureToggleUtils.js';
export type { ModifiedScope } from './featureToggleUtils.js';
export type SkillActionStatus = 'success' | 'no-op' | 'error';
/**
 * Metadata representing the result of a skill settings operation.
 */
export interface SkillActionResult
  extends Omit<FeatureActionResult, 'featureName'> {
  skillName: string;
}
/**
 * Enables a skill by removing it from all writable disabled lists (User and Workspace).
 */
export declare function enableSkill(
  settings: LoadedSettings,
  skillName: string,
): SkillActionResult;
/**
 * Disables a skill by adding it to the disabled list in the specified scope.
 */
export declare function disableSkill(
  settings: LoadedSettings,
  skillName: string,
  scope: SettingScope,
): SkillActionResult;

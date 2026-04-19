/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { SettingScope, LoadedSettings } from '../config/settings.js';
import { type FeatureActionResult } from './featureToggleUtils.js';
export type AgentActionStatus = 'success' | 'no-op' | 'error';
/**
 * Metadata representing the result of an agent settings operation.
 */
export interface AgentActionResult
  extends Omit<FeatureActionResult, 'featureName'> {
  agentName: string;
}
/**
 * Enables an agent by setting `agents.overrides.<agentName>.enabled` to `true`
 * in available writable scopes (User and Workspace).
 */
export declare function enableAgent(
  settings: LoadedSettings,
  agentName: string,
): AgentActionResult;
/**
 * Disables an agent by setting `agents.overrides.<agentName>.enabled` to `false`
 * in the specified scope.
 */
export declare function disableAgent(
  settings: LoadedSettings,
  agentName: string,
  scope: SettingScope,
): AgentActionResult;

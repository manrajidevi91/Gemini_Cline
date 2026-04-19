/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  type StartupWarning,
  type Config,
  type ResumedSessionData,
} from '@google/gemini-cli-core';
import type { InitializationResult } from './core/initializer.js';
import type { LoadedSettings } from './config/settings.js';
export declare function startInteractiveUI(
  config: Config,
  settings: LoadedSettings,
  startupWarnings: StartupWarning[],
  workspaceRoot: string | undefined,
  resumedSessionData: ResumedSessionData | undefined,
  initializationResult: InitializationResult,
): Promise<void>;

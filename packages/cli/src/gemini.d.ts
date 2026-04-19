/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  type StartupWarning,
  type Config,
  type ResumedSessionData,
} from '@google/gemini-cli-core';
import {
  type DnsResolutionOrder,
  type LoadedSettings,
} from './config/settings.js';
import { type InitializationResult } from './core/initializer.js';
export declare function validateDnsResolutionOrder(
  order: string | undefined,
): DnsResolutionOrder;
export declare function getNodeMemoryArgs(isDebugMode: boolean): string[];
export declare function setupUnhandledRejectionHandler(): void;
export declare function resolveSessionId(
  resumeArg: string | undefined,
): Promise<{
  sessionId: string;
  resumedSessionData?: ResumedSessionData;
}>;
export declare function startInteractiveUI(
  config: Config,
  settings: LoadedSettings,
  startupWarnings: StartupWarning[],
  workspaceRoot: string | undefined,
  resumedSessionData: ResumedSessionData | undefined,
  initializationResult: InitializationResult,
): Promise<void>;
export declare function main(): Promise<void>;
export declare function initializeOutputListenersAndFlush(): void;

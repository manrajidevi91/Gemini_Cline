/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type {
  NetworkLog,
  InspectorConsoleLog as ConsoleLog,
} from '../../src/types.js';
export type { NetworkLog };
export type { InspectorConsoleLog as ConsoleLog } from '../../src/types.js';
export declare function useDevToolsData(): {
  networkLogs: NetworkLog[];
  consoleLogs: ConsoleLog[];
  isConnected: boolean;
  connectedSessions: string[];
};

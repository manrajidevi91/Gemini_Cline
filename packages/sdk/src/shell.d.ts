/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type Config as CoreConfig } from '@google/gemini-cli-core';
import type {
  AgentShell,
  AgentShellResult,
  AgentShellOptions,
} from './types.js';
export declare class SdkAgentShell implements AgentShell {
  private readonly config;
  constructor(config: CoreConfig);
  exec(command: string, options?: AgentShellOptions): Promise<AgentShellResult>;
}

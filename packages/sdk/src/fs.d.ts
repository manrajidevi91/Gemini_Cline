/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Config as CoreConfig } from '@google/gemini-cli-core';
import type { AgentFilesystem } from './types.js';
export declare class SdkAgentFilesystem implements AgentFilesystem {
  private readonly config;
  constructor(config: CoreConfig);
  readFile(path: string): Promise<string | null>;
  writeFile(path: string, content: string): Promise<void>;
}

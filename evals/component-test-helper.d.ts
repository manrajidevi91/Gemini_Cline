/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type EvalPolicy, type BaseEvalCase } from './test-helper.js';
import { Config, type ConfigParameters } from '@google/gemini-cli-core';
export interface ComponentEvalCase extends BaseEvalCase {
  configOverrides?: Partial<ConfigParameters>;
  setup?: (config: Config) => Promise<void>;
  assert: (config: Config) => Promise<void>;
}
export declare class ComponentRig {
  private options;
  config: Config | undefined;
  testDir: string;
  homeDir: string;
  sessionId: string;
  constructor(options?: { configOverrides?: Partial<ConfigParameters> });
  initialize(): Promise<void>;
  cleanup(): Promise<void>;
}
/**
 * A helper for running behavioral evaluations directly against backend components.
 * It provides a fully initialized Config with real API access, bypassing the UI.
 */
export declare function componentEvalTest(
  policy: EvalPolicy,
  evalCase: ComponentEvalCase,
): void;

/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AppRig } from '../packages/cli/src/test-utils/AppRig.js';
import { type EvalPolicy, type BaseEvalCase } from './test-helper.js';
/**
 * Config overrides for evals, with tool-restriction fields explicitly
 * forbidden. Evals must test against the full, default tool set to ensure
 * realistic behavior.
 */
interface EvalConfigOverrides {
  /** Restricting tools via excludeTools in evals is forbidden. */
  excludeTools?: never;
  /** Restricting tools via coreTools in evals is forbidden. */
  coreTools?: never;
  /** Restricting tools via allowedTools in evals is forbidden. */
  allowedTools?: never;
  /** Restricting tools via mainAgentTools in evals is forbidden. */
  mainAgentTools?: never;
  [key: string]: unknown;
}
export interface AppEvalCase extends BaseEvalCase {
  configOverrides?: EvalConfigOverrides;
  prompt: string;
  setup?: (rig: AppRig) => Promise<void>;
  assert: (rig: AppRig, output: string) => Promise<void>;
}
/**
 * A helper for running behavioral evaluations using the in-process AppRig.
 * This matches the API of evalTest in test-helper.ts as closely as possible.
 */
export declare function appEvalTest(
  policy: EvalPolicy,
  evalCase: AppEvalCase,
): void;
export {};

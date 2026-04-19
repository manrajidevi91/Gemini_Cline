/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TestRig } from '@google/gemini-cli-test-utils';
export * from '@google/gemini-cli-test-utils';
/**
 * The default model used for all evaluations.
 * Can be overridden by setting the GEMINI_MODEL environment variable.
 */
export declare const EVAL_MODEL: string;
export type EvalPolicy = 'ALWAYS_PASSES' | 'USUALLY_PASSES';
export declare function evalTest(policy: EvalPolicy, evalCase: EvalCase): void;
export declare function withEvalRetries(
  name: string,
  attemptFn: (attempt: number) => Promise<void>,
): Promise<void>;
export declare function internalEvalTest(evalCase: EvalCase): Promise<void>;
/**
 * Helper to setup test files and git repository.
 *
 * Note: While this is an async function (due to parseAgentMarkdown), it
 * intentionally uses synchronous filesystem and child_process operations
 * for simplicity and to ensure sequential environment preparation.
 */
export declare function prepareWorkspace(
  testDir: string,
  homeDir: string,
  files: Record<string, string>,
): Promise<void>;
/**
 * Wraps a test function with the appropriate Vitest 'it' or 'it.skip' based on policy.
 */
export declare function runEval(
  policy: EvalPolicy,
  evalCase: BaseEvalCase,
  fn: () => Promise<void>,
  timeoutOverride?: number,
): void;
export declare function prepareLogDir(name: string): Promise<{
  logDir: string;
  sanitizedName: string;
}>;
/**
 * Symlinks node_modules to the test directory to speed up tests that need to run tools.
 */
export declare function symlinkNodeModules(testDir: string): void;
/**
 * Settings that are forbidden in evals. Evals should never restrict which
 * tools are available — they must test against the full, default tool set
 * to ensure realistic behavior.
 */
interface ForbiddenToolSettings {
  tools?: {
    /** Restricting core tools in evals is forbidden. */
    core?: never;
    [key: string]: unknown;
  };
}
export interface BaseEvalCase {
  suiteName: string;
  suiteType: 'behavioral' | 'component-level' | 'hero-scenario';
  name: string;
  timeout?: number;
  files?: Record<string, string>;
}
export interface EvalCase extends BaseEvalCase {
  params?: {
    settings?: ForbiddenToolSettings & Record<string, unknown>;
    [key: string]: unknown;
  };
  prompt: string;
  setup?: (rig: TestRig) => Promise<void> | void;
  /** Conversation history to pre-load via --resume. Each entry is a message object with type, content, etc. */
  messages?: Record<string, unknown>[];
  /** Session ID for the resumed session. Auto-generated if not provided. */
  sessionId?: string;
  approvalMode?: 'default' | 'auto_edit' | 'yolo' | 'plan';
  assert: (rig: TestRig, result: string) => Promise<void>;
}

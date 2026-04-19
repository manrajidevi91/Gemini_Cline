/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  Config,
  type WorktreeSettings,
  type HookDefinition,
  type HookEventName,
} from '@google/gemini-cli-core';
import { type MergedSettings, type LoadedSettings } from './settings.js';
import { RESUME_LATEST } from '../utils/sessionUtils.js';
export interface CliArgs {
  query: string | undefined;
  model: string | undefined;
  sandbox: boolean | string | undefined;
  debug: boolean | undefined;
  prompt: string | undefined;
  promptInteractive: string | undefined;
  worktree?: string;
  yolo: boolean | undefined;
  approvalMode: string | undefined;
  policy: string[] | undefined;
  adminPolicy: string[] | undefined;
  allowedMcpServerNames: string[] | undefined;
  allowedTools: string[] | undefined;
  acp?: boolean;
  experimentalAcp?: boolean;
  extensions: string[] | undefined;
  listExtensions: boolean | undefined;
  resume: string | typeof RESUME_LATEST | undefined;
  listSessions: boolean | undefined;
  deleteSession: string | undefined;
  includeDirectories: string[] | undefined;
  screenReader: boolean | undefined;
  useWriteTodos: boolean | undefined;
  outputFormat: string | undefined;
  fakeResponses: string | undefined;
  recordResponses: string | undefined;
  startupMessages?: string[];
  rawOutput: boolean | undefined;
  acceptRawOutputRisk: boolean | undefined;
  interactiveApproval: boolean | undefined;
  isCommand: boolean | undefined;
}
/**
 * Pre-parses the command line arguments to find the worktree flag.
 * Used for early setup before full argument parsing with settings.
 */
export declare function getWorktreeArg(argv: string[]): string | undefined;
/**
 * Checks if a worktree is requested via CLI and enabled in settings.
 * Returns the requested name (can be empty string for auto-generated) or undefined.
 */
export declare function getRequestedWorktreeName(
  settings: LoadedSettings,
): string | undefined;
export declare function parseArguments(
  settings: MergedSettings,
): Promise<CliArgs>;
export declare function isDebugMode(argv: CliArgs): boolean;
export interface LoadCliConfigOptions {
  cwd?: string;
  projectHooks?: {
    [K in HookEventName]?: HookDefinition[];
  } & {
    disabled?: string[];
  };
  worktreeSettings?: WorktreeSettings;
}
export declare function loadCliConfig(
  settings: MergedSettings,
  sessionId: string,
  argv: CliArgs,
  options?: LoadCliConfigOptions,
): Promise<Config>;

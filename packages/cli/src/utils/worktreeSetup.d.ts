/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type WorktreeInfo } from '@google/gemini-cli-core';
/**
 * Sets up a git worktree for parallel sessions.
 *
 * This function uses a guard (GEMINI_CLI_WORKTREE_HANDLED) to ensure that
 * when the CLI relaunches itself (e.g. for memory allocation), it doesn't
 * attempt to create a nested worktree.
 */
export declare function setupWorktree(
  worktreeName: string | undefined,
): Promise<WorktreeInfo | undefined>;

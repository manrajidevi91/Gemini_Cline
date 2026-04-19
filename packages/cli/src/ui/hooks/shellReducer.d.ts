/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { AnsiOutput, CompletionBehavior } from '@google/gemini-cli-core';
export interface BackgroundTask {
  pid: number;
  command: string;
  output: string | AnsiOutput;
  isBinary: boolean;
  binaryBytesReceived: number;
  status: 'running' | 'exited';
  exitCode?: number;
  completionBehavior?: CompletionBehavior;
}
export interface ShellState {
  activeShellPtyId: number | null;
  lastShellOutputTime: number;
  backgroundTasks: Map<number, BackgroundTask>;
  isBackgroundTaskVisible: boolean;
}
export type ShellAction =
  | {
      type: 'SET_ACTIVE_PTY';
      pid: number | null;
    }
  | {
      type: 'SET_OUTPUT_TIME';
      time: number;
    }
  | {
      type: 'SET_VISIBILITY';
      visible: boolean;
    }
  | {
      type: 'TOGGLE_VISIBILITY';
    }
  | {
      type: 'REGISTER_TASK';
      pid: number;
      command: string;
      initialOutput: string | AnsiOutput;
      completionBehavior?: CompletionBehavior;
    }
  | {
      type: 'UPDATE_TASK';
      pid: number;
      update: Partial<BackgroundTask>;
    }
  | {
      type: 'APPEND_TASK_OUTPUT';
      pid: number;
      chunk: string | AnsiOutput;
    }
  | {
      type: 'SYNC_BACKGROUND_TASKS';
    }
  | {
      type: 'DISMISS_TASK';
      pid: number;
    };
export declare const initialState: ShellState;
export declare function shellReducer(
  state: ShellState,
  action: ShellAction,
): ShellState;

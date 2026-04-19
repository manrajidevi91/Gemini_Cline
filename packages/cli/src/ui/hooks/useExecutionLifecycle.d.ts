/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { HistoryItemWithoutId } from '../types.js';
import type {
  AnsiOutput,
  Config,
  GeminiClient,
  CompletionBehavior,
} from '@google/gemini-cli-core';
import { type PartListUnion } from '@google/genai';
import type { UseHistoryManagerReturn } from './useHistoryManager.js';
import { type BackgroundTask } from './shellReducer.js';
export { type BackgroundTask };
export declare const OUTPUT_UPDATE_INTERVAL_MS = 1000;
/**
 * Hook to process shell commands.
 * Orchestrates command execution and updates history and agent context.
 */
export declare const useExecutionLifecycle: (
  addItemToHistory: UseHistoryManagerReturn['addItem'],
  setPendingHistoryItem: React.Dispatch<
    React.SetStateAction<HistoryItemWithoutId | null>
  >,
  onExec: (command: Promise<void>) => void,
  onDebugMessage: (message: string) => void,
  config: Config,
  geminiClient: GeminiClient,
  setShellInputFocused: (value: boolean) => void,
  terminalWidth?: number,
  terminalHeight?: number,
  activeBackgroundExecutionId?: number,
  isWaitingForConfirmation?: boolean,
) => {
  handleShellCommand: (
    rawQuery: PartListUnion,
    abortSignal: AbortSignal,
  ) => boolean;
  activeShellPtyId: number | null;
  lastShellOutputTime: number;
  backgroundTaskCount: number;
  isBackgroundTaskVisible: boolean;
  toggleBackgroundTasks: () => void;
  backgroundCurrentExecution: () => void;
  registerBackgroundTask: (
    pid: number,
    command: string,
    initialOutput: string | AnsiOutput,
    completionBehavior?: CompletionBehavior,
  ) => void;
  dismissBackgroundTask: (pid: number) => Promise<void>;
  backgroundTasks: Map<number, BackgroundTask>;
};

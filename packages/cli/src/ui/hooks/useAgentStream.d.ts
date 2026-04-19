/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  type ApprovalMode,
  type ThoughtSummary,
  type RetryAttemptPayload,
  type AgentProtocol,
  type Logger,
  type Part,
} from '@google/gemini-cli-core';
import type {
  HistoryItemWithoutId,
  LoopDetectionConfirmationRequest,
} from '../types.js';
import { StreamingState } from '../types.js';
import { type BackgroundTask } from './useExecutionLifecycle.js';
import type { UseHistoryManagerReturn } from './useHistoryManager.js';
import { type MinimalTrackedToolCall } from './useTurnActivityMonitor.js';
export interface UseAgentStreamOptions {
  agent?: AgentProtocol;
  addItem: UseHistoryManagerReturn['addItem'];
  onCancelSubmit: (shouldRestorePrompt?: boolean) => void;
  isShellFocused?: boolean;
  logger?: Logger | null;
}
/**
 * useAgentStream implements the interactive agent loop using an AgentProtocol.
 * It is completely agnostic to the specific agent implementation.
 */
export declare const useAgentStream: ({
  agent,
  addItem,
  onCancelSubmit,
  isShellFocused,
  logger,
}: UseAgentStreamOptions) => {
  streamingState: StreamingState;
  submitQuery: (
    query: Part[] | string,
    options?: {
      isContinuation: boolean;
    },
    _prompt_id?: string,
  ) => Promise<void>;
  initError: string | null;
  pendingHistoryItems: HistoryItemWithoutId[];
  thought: ThoughtSummary | null;
  cancelOngoingRequest: () => Promise<void>;
  pendingToolCalls: MinimalTrackedToolCall[];
  handleApprovalModeChange: (newApprovalMode: ApprovalMode) => Promise<void>;
  activePtyId: undefined;
  loopDetectionConfirmationRequest: LoopDetectionConfirmationRequest | null;
  lastOutputTime: number;
  backgroundTaskCount: number;
  isBackgroundTaskVisible: boolean;
  toggleBackgroundTasks: () => void;
  backgroundCurrentExecution: undefined;
  backgroundTasks: Map<number, BackgroundTask>;
  retryStatus: RetryAttemptPayload | null;
  dismissBackgroundTask: (_pid: number) => Promise<void>;
};

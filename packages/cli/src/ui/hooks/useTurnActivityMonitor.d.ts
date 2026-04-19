/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { StreamingState } from '../types.js';
import {
  type CoreToolCallStatus,
  type ToolCallRequestInfo,
} from '@google/gemini-cli-core';
export interface MinimalTrackedToolCall {
  status: CoreToolCallStatus;
  request: ToolCallRequestInfo;
}
export interface TurnActivityStatus {
  operationStartTime: number;
  isRedirectionActive: boolean;
}
/**
 * Monitors the activity of a Gemini turn to detect when a new operation starts
 * and whether it involves shell redirections that should suppress inactivity prompts.
 */
export declare const useTurnActivityMonitor: (
  streamingState: StreamingState,
  activePtyId: number | string | null | undefined,
  pendingToolCalls?: MinimalTrackedToolCall[],
) => TurnActivityStatus;

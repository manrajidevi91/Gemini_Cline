/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type ToolVisibilityContext } from '@google/gemini-cli-core';
import type {
  HistoryItem,
  HistoryItemWithoutId,
  IndividualToolCallDisplay,
} from '../types.js';
/**
 * Maps an IndividualToolCallDisplay from the CLI to a ToolVisibilityContext for core logic.
 */
export declare function buildToolVisibilityContextFromDisplay(
  tool: IndividualToolCallDisplay,
): ToolVisibilityContext;
export declare function getLastTurnToolCallIds(
  history: HistoryItem[],
  pendingHistoryItems: HistoryItemWithoutId[],
): string[];
export declare function isToolExecuting(
  pendingHistoryItems: HistoryItemWithoutId[],
): boolean;
export declare function isToolAwaitingConfirmation(
  pendingHistoryItems: HistoryItemWithoutId[],
): boolean;
export declare function getAllToolCalls(
  historyItems: HistoryItemWithoutId[],
): IndividualToolCallDisplay[];

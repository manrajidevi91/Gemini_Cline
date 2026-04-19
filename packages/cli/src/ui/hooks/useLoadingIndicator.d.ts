/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { StreamingState } from '../types.js';
import { type RetryAttemptPayload } from '@google/gemini-cli-core';
export interface UseLoadingIndicatorProps {
  streamingState: StreamingState;
  shouldShowFocusHint: boolean;
  retryStatus: RetryAttemptPayload | null;
  showTips?: boolean;
  showWit?: boolean;
  customWittyPhrases?: string[];
  errorVerbosity?: 'low' | 'full';
  maxLength?: number;
}
export declare const useLoadingIndicator: ({
  streamingState,
  shouldShowFocusHint,
  retryStatus,
  showTips,
  showWit,
  customWittyPhrases,
  errorVerbosity,
  maxLength,
}: UseLoadingIndicatorProps) => {
  elapsedTime: number;
  currentLoadingPhrase: string | undefined;
  currentTip: string | undefined;
  currentWittyPhrase: string | undefined;
};

/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { type ThoughtSummary } from '@google/gemini-cli-core';
import { type ActiveHook } from '../types.js';
interface StatusRowProps {
  showUiDetails: boolean;
  isNarrow: boolean;
  terminalWidth: number;
  hideContextSummary: boolean;
  hideUiDetailsForSuggestions: boolean;
  hasPendingActionRequired: boolean;
}
/**
 * Renders the loading or hook execution status.
 */
export declare const StatusNode: React.FC<{
  showTips: boolean;
  showWit: boolean;
  thought: ThoughtSummary | null;
  elapsedTime: number;
  currentWittyPhrase: string | undefined;
  activeHooks: ActiveHook[];
  showLoadingIndicator: boolean;
  errorVerbosity: 'low' | 'full' | undefined;
  onResize?: (width: number) => void;
}>;
export declare const StatusRow: React.FC<StatusRowProps>;
export {};

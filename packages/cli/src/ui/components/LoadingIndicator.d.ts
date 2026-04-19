/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ThoughtSummary } from '@google/gemini-cli-core';
import type React from 'react';
interface LoadingIndicatorProps {
  currentLoadingPhrase?: string;
  wittyPhrase?: string;
  showWit?: boolean;
  showTips?: boolean;
  errorVerbosity?: 'low' | 'full';
  elapsedTime: number;
  inline?: boolean;
  rightContent?: React.ReactNode;
  thought?: ThoughtSummary | null;
  thoughtLabel?: string;
  showCancelAndTimer?: boolean;
  forceRealStatusOnly?: boolean;
  spinnerIcon?: string;
  isHookActive?: boolean;
}
export declare const LoadingIndicator: React.FC<LoadingIndicatorProps>;
export {};

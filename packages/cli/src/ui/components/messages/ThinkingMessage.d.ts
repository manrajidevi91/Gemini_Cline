/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { ThoughtSummary } from '@google/gemini-cli-core';
interface ThinkingMessageProps {
  thought: ThoughtSummary;
  terminalWidth: number;
  isFirstThinking?: boolean;
}
/**
 * Renders a model's thought as a distinct bubble.
 * Leverages Ink layout for wrapping and borders.
 */
export declare const ThinkingMessage: React.FC<ThinkingMessageProps>;
export {};

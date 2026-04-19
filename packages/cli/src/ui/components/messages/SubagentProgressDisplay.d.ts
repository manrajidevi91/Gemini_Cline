/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type {
  SubagentProgress,
  SubagentActivityItem,
} from '@google/gemini-cli-core';
export interface SubagentProgressDisplayProps {
  progress: SubagentProgress;
  terminalWidth: number;
  historyOverrides?: SubagentActivityItem[];
}
export declare const formatToolArgs: (args?: string) => string;
export declare const SubagentProgressDisplay: React.FC<SubagentProgressDisplayProps>;

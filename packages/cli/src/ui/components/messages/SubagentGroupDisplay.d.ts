/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { IndividualToolCallDisplay } from '../../types.js';
export interface SubagentGroupDisplayProps {
  toolCalls: IndividualToolCallDisplay[];
  availableTerminalHeight?: number;
  terminalWidth: number;
  borderColor?: string;
  borderDimColor?: boolean;
  isFirst?: boolean;
  isExpandable?: boolean;
}
export declare const SubagentGroupDisplay: React.FC<SubagentGroupDisplayProps>;

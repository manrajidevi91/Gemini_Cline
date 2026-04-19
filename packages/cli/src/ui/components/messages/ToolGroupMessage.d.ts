/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type {
  HistoryItem,
  HistoryItemWithoutId,
  IndividualToolCallDisplay,
} from '../../types.js';
export declare const isCompactTool: (
  tool: IndividualToolCallDisplay,
  isCompactModeEnabled: boolean,
) => boolean;
export declare const hasDensePayload: (
  tool: IndividualToolCallDisplay,
) => boolean;
interface ToolGroupMessageProps {
  item: HistoryItem | HistoryItemWithoutId;
  toolCalls: IndividualToolCallDisplay[];
  availableTerminalHeight?: number;
  terminalWidth: number;
  onShellInputSubmit?: (input: string) => void;
  borderTop?: boolean;
  borderBottom?: boolean;
  isExpandable?: boolean;
}
export declare const ToolGroupMessage: React.FC<ToolGroupMessageProps>;
export {};

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
export interface ToolResultDisplayProps {
  resultDisplay: string | object | undefined;
  availableTerminalHeight?: number;
  terminalWidth: number;
  renderOutputAsMarkdown?: boolean;
  maxLines?: number;
  hasFocus?: boolean;
  overflowDirection?: 'top' | 'bottom';
}
export declare const ToolResultDisplay: React.FC<ToolResultDisplayProps>;

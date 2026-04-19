/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { Theme } from '../../themes/theme.js';
export interface DiffLine {
  type: 'add' | 'del' | 'context' | 'hunk' | 'other';
  oldLine?: number;
  newLine?: number;
  content: string;
}
export declare function parseDiffWithLineNumbers(
  diffContent: string,
): DiffLine[];
interface DiffRendererProps {
  diffContent: string;
  filename?: string;
  tabWidth?: number;
  availableTerminalHeight?: number;
  terminalWidth: number;
  theme?: Theme;
  disableColor?: boolean;
  paddingX?: number;
}
export declare const DiffRenderer: React.FC<DiffRendererProps>;
export declare const isNewFile: (parsedLines: DiffLine[]) => boolean;
export interface RenderDiffLinesOptions {
  parsedLines: DiffLine[];
  filename?: string;
  tabWidth?: number;
  terminalWidth: number;
  disableColor?: boolean;
}
export declare const renderDiffLines: ({
  parsedLines,
  filename,
  tabWidth,
  terminalWidth,
  disableColor,
}: RenderDiffLinesOptions) => React.ReactNode[];
export {};

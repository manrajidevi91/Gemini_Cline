/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { type TextBuffer } from './shared/text-buffer.js';
import { type Key } from '../hooks/useKeypress.js';
import type { CommandContext, SlashCommand } from '../commands/types.js';
import { ApprovalMode, type Config } from '@google/gemini-cli-core';
import { StreamingState } from '../types.js';
/**
 * Returns if the terminal can be trusted to handle paste events atomically
 * rather than potentially sending multiple paste events separated by line
 * breaks which could trigger unintended command execution.
 */
export declare function isTerminalPasteTrusted(
  kittyProtocolSupported: boolean,
): boolean;
export type ScrollableItem =
  | {
      type: 'visualLine';
      lineText: string;
      absoluteVisualIdx: number;
    }
  | {
      type: 'ghostLine';
      ghostLine: string;
      index: number;
    };
export interface InputPromptProps {
  onSubmit: (value: string) => void;
  onClearScreen: () => void;
  config: Config;
  slashCommands: readonly SlashCommand[];
  commandContext: CommandContext;
  placeholder?: string;
  focus?: boolean;
  setShellModeActive: (value: boolean) => void;
  approvalMode: ApprovalMode;
  onEscapePromptChange?: (showPrompt: boolean) => void;
  onSuggestionsVisibilityChange?: (visible: boolean) => void;
  vimHandleInput?: (key: Key) => boolean;
  isEmbeddedShellFocused?: boolean;
  setQueueErrorMessage: (message: string | null) => void;
  streamingState: StreamingState;
  popAllMessages?: () => string | undefined;
  onQueueMessage?: (message: string) => void;
  suggestionsPosition?: 'above' | 'below';
  setBannerVisible: (visible: boolean) => void;
}
export declare const calculatePromptWidths: (mainContentWidth: number) => {
  readonly inputWidth: number;
  readonly containerWidth: number;
  readonly suggestionsWidth: number;
  readonly frameOverhead: number;
};
/**
 * Returns true if the given text exceeds the thresholds for being considered a "large paste".
 */
export declare function isLargePaste(text: string): boolean;
/**
 * Attempt to toggle expansion of a paste placeholder in the buffer.
 * Returns true if a toggle action was performed or hint was shown, false otherwise.
 */
export declare function tryTogglePasteExpansion(buffer: TextBuffer): boolean;
export declare const InputPrompt: React.FC<InputPromptProps>;

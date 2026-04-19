/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { TextBuffer } from '../components/shared/text-buffer.js';
export interface InputState {
  buffer: TextBuffer;
  userMessages: string[];
  shellModeActive: boolean;
  showEscapePrompt: boolean;
  copyModeEnabled: boolean | undefined;
  inputWidth: number;
  suggestionsWidth: number;
}
export declare const InputContext: import('react').Context<InputState | null>;
export declare const useInputState: () => InputState;

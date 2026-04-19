/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type InputPromptProps } from './InputPrompt.js';
import { type TextBuffer } from './shared/text-buffer.js';
import '../../test-utils/customMatchers.js';
export type TestInputPromptProps = InputPromptProps & {
  buffer: TextBuffer;
  userMessages: string[];
  shellModeActive: boolean;
  copyModeEnabled?: boolean;
  showEscapePrompt?: boolean;
  inputWidth: number;
  suggestionsWidth: number;
};

/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import {
  ToolConfirmationOutcome,
  type Config,
  type ToolConfirmationPayload,
} from '@google/gemini-cli-core';
import type { IndividualToolCallDisplay } from '../types.js';
interface ToolActionsContextValue {
  confirm: (
    callId: string,
    outcome: ToolConfirmationOutcome,
    payload?: ToolConfirmationPayload,
  ) => Promise<void>;
  cancel: (callId: string) => Promise<void>;
  isDiffingEnabled: boolean;
  isExpanded: (callId: string) => boolean;
  toggleExpansion: (callId: string) => void;
  toggleAllExpansion: (callIds: string[]) => void;
}
export declare const useToolActions: () => ToolActionsContextValue;
interface ToolActionsProviderProps {
  children: React.ReactNode;
  config: Config;
  toolCalls: IndividualToolCallDisplay[];
  isExpanded: (callId: string) => boolean;
  toggleExpansion: (callId: string) => void;
  toggleAllExpansion: (callIds: string[]) => void;
}
export declare const ToolActionsProvider: React.FC<ToolActionsProviderProps>;
export {};

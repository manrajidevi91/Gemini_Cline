/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { type LoadedSettings } from '../../config/settings.js';
import type { AgentDefinition } from '@google/gemini-cli-core';
interface AgentConfigDialogProps {
  agentName: string;
  displayName: string;
  definition: AgentDefinition;
  settings: LoadedSettings;
  onClose: () => void;
  onSave?: () => void;
  /** Available terminal height for dynamic windowing */
  availableTerminalHeight?: number;
}
export declare function AgentConfigDialog({
  agentName,
  displayName,
  definition,
  settings,
  onClose,
  onSave,
  availableTerminalHeight,
}: AgentConfigDialogProps): React.JSX.Element;
export {};

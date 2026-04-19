/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
/**
 * Hook entry type matching HookRegistryEntry from core
 */
export interface HookEntry {
  config: {
    command?: string;
    type: string;
    name?: string;
    description?: string;
    timeout?: number;
  };
  source: string;
  eventName: string;
  matcher?: string;
  sequential?: boolean;
  enabled: boolean;
}
interface HooksDialogProps {
  hooks: readonly HookEntry[];
  onClose: () => void;
  /** Maximum number of hooks to display at once before scrolling. Default: 8 */
  maxVisibleHooks?: number;
}
/**
 * Dialog component for displaying hooks in a styled box.
 * Replaces inline chat history display with a modal-style dialog.
 * Supports scrolling with up/down arrow keys when there are many hooks.
 */
export declare const HooksDialog: React.FC<HooksDialogProps>;
export {};

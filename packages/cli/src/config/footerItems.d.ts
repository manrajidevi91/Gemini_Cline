/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { MergedSettings } from './settings.js';
export declare const ALL_ITEMS: readonly [
  {
    readonly id: 'workspace';
    readonly header: 'workspace (/directory)';
    readonly description: 'Current working directory';
  },
  {
    readonly id: 'git-branch';
    readonly header: 'branch';
    readonly description: 'Current git branch name (not shown when unavailable)';
  },
  {
    readonly id: 'sandbox';
    readonly header: 'sandbox';
    readonly description: 'Sandbox type and trust indicator';
  },
  {
    readonly id: 'model-name';
    readonly header: '/model';
    readonly description: 'Current model identifier';
  },
  {
    readonly id: 'context-used';
    readonly header: 'context';
    readonly description: 'Percentage of context window used';
  },
  {
    readonly id: 'quota';
    readonly header: 'quota';
    readonly description: 'Percentage of daily limit used (not shown when unavailable)';
  },
  {
    readonly id: 'memory-usage';
    readonly header: 'memory';
    readonly description: 'Memory used by the application';
  },
  {
    readonly id: 'session-id';
    readonly header: 'session';
    readonly description: 'Unique identifier for the current session';
  },
  {
    readonly id: 'auth';
    readonly header: '/auth';
    readonly description: 'Current authentication info';
  },
  {
    readonly id: 'code-changes';
    readonly header: 'diff';
    readonly description: 'Lines added/removed in the session (not shown when zero)';
  },
  {
    readonly id: 'token-count';
    readonly header: 'tokens';
    readonly description: 'Total tokens used in the session (not shown when zero)';
  },
];
export type FooterItemId = (typeof ALL_ITEMS)[number]['id'];
export declare const DEFAULT_ORDER: string[];
export declare function deriveItemsFromLegacySettings(
  settings: MergedSettings,
): string[];
/**
 * Resolves the ordered list and selected set of footer items from settings.
 * Used by FooterConfigDialog to initialize and reset state.
 */
export declare function resolveFooterState(settings: MergedSettings): {
  orderedIds: string[];
  selectedIds: Set<string>;
};

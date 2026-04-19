/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const SHELL_COMMAND_NAME = 'Shell Command';
export declare const SHELL_NAME = 'Shell';
export declare const MAX_GEMINI_MESSAGE_LINES = 65536;
export declare const SHELL_FOCUS_HINT_DELAY_MS = 5000;
export declare const TOOL_STATUS: {
  readonly SUCCESS: '✓';
  readonly PENDING: 'o';
  readonly EXECUTING: '⊷';
  readonly CONFIRMING: '?';
  readonly CANCELED: '-';
  readonly ERROR: 'x';
};
export declare const MAX_MCP_RESOURCES_TO_SHOW = 10;
export declare const WARNING_PROMPT_DURATION_MS = 3000;
export declare const QUEUE_ERROR_DISPLAY_DURATION_MS = 3000;
export declare const SHELL_ACTION_REQUIRED_TITLE_DELAY_MS = 30000;
export declare const SHELL_SILENT_WORKING_TITLE_DELAY_MS = 120000;
export declare const EXPAND_HINT_DURATION_MS = 5000;
export declare const DEFAULT_BACKGROUND_OPACITY = 0.16;
export declare const DEFAULT_INPUT_BACKGROUND_OPACITY = 0.24;
export declare const DEFAULT_SELECTION_OPACITY = 0.2;
export declare const DEFAULT_BORDER_OPACITY = 0.4;
export declare const KEYBOARD_SHORTCUTS_URL =
  'https://geminicli.com/docs/cli/keyboard-shortcuts/';
export declare const LRU_BUFFER_PERF_CACHE_LIMIT = 20000;
export declare const ACTIVE_SHELL_MAX_LINES = 15;
export declare const COMPLETED_SHELL_MAX_LINES = 15;
export declare const SUBAGENT_MAX_LINES = 15;
/** Minimum terminal width required to show the full context used label */
export declare const MIN_TERMINAL_WIDTH_FOR_FULL_LABEL = 100;
/** Default context usage fraction at which to trigger compression */
export declare const DEFAULT_COMPRESSION_THRESHOLD = 0.5;
/** Documentation URL for skills setup and configuration */
export declare const SKILLS_DOCS_URL =
  'https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/skills.md';
/** Max lines to show for a compact tool subview (e.g. diff) */
export declare const COMPACT_TOOL_SUBVIEW_MAX_LINES = 15;
export declare const MAX_SHELL_OUTPUT_SIZE = 10000000;
export declare const SHELL_OUTPUT_TRUNCATION_BUFFER = 1000000;

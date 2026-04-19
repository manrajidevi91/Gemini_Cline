/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Cleans up background process log files older than 7 days.
 * Scans ~/.gemini/tmp/background-processes/ for .log files.
 *
 * @param debugMode Whether to log detailed debug information.
 */
export declare function cleanupBackgroundLogs(
  debugMode?: boolean,
): Promise<void>;

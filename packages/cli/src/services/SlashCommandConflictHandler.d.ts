/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Handles slash command conflict events and provides user feedback.
 *
 * This handler batches multiple conflict events into a single notification
 * block per command name to avoid UI clutter during startup or incremental loading.
 */
export declare class SlashCommandConflictHandler {
  private notifiedConflicts;
  private pendingConflicts;
  private flushTimeout;
  constructor();
  start(): void;
  stop(): void;
  private handleConflicts;
  private scheduleFlush;
  private flush;
  /**
   * Emits a grouped notification for multiple conflicts sharing the same name.
   */
  private emitGroupedFeedback;
  /**
   * Emits a descriptive notification for a single command conflict.
   */
  private emitSingleFeedback;
  private capitalize;
  /**
   * Returns a human-readable description of a command's source.
   */
  private getSourceDescription;
}

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ConsoleMessageItem } from '../types.js';
export interface UseErrorCountReturn {
  errorCount: number;
  clearErrorCount: () => void;
}
/**
 * Initializes the global console store and subscribes to coreEvents.
 * Acts as a safe reset function, making it idempotent and useful for test isolation.
 * Must be called during application startup.
 */
export declare function initializeConsoleStore(): void;
/**
 * Hook to access the global console message history.
 * Decoupled from any component lifecycle to ensure history is preserved even
 * when the UI is unmounted.
 */
export declare function useConsoleMessages(): ConsoleMessageItem[];
/**
 * Hook to access the global error count.
 * Uses the same external store as useConsoleMessages for consistency.
 */
export declare function useErrorCount(): UseErrorCountReturn;

/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Baseline entry for a single memory test scenario.
 */
export interface MemoryBaseline {
  heapUsedBytes: number;
  heapTotalBytes: number;
  rssBytes: number;
  externalBytes: number;
  timestamp: string;
}
/**
 * Top-level structure of the baselines JSON file.
 */
export interface MemoryBaselineFile {
  version: number;
  updatedAt: string;
  scenarios: Record<string, MemoryBaseline>;
}
/**
 * Load baselines from a JSON file.
 * Returns an empty baseline file if the file does not exist yet.
 */
export declare function loadBaselines(path: string): MemoryBaselineFile;
/**
 * Save baselines to a JSON file.
 */
export declare function saveBaselines(
  path: string,
  baselines: MemoryBaselineFile,
): void;
/**
 * Update (or create) a single scenario baseline in the file.
 */
export declare function updateBaseline(
  path: string,
  scenarioName: string,
  measured: {
    heapUsedBytes: number;
    heapTotalBytes: number;
    rssBytes: number;
    externalBytes: number;
  },
): void;

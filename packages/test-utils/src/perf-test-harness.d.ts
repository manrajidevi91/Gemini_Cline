/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Baseline entry for a single performance test scenario.
 */
export interface PerfBaseline {
  wallClockMs: number;
  cpuTotalUs: number;
  timestamp: string;
}
/**
 * Top-level structure of the perf baselines JSON file.
 */
export interface PerfBaselineFile {
  version: number;
  updatedAt: string;
  scenarios: Record<string, PerfBaseline>;
}
/**
 * A single performance snapshot at a point in time.
 */
export interface PerfSnapshot {
  timestamp: number;
  label: string;
  wallClockMs: number;
  cpuUserUs: number;
  cpuSystemUs: number;
  cpuTotalUs: number;
  eventLoopDelayP50Ms: number;
  eventLoopDelayP95Ms: number;
  eventLoopDelayMaxMs: number;
  childEventLoopDelayP50Ms?: number;
  childEventLoopDelayP95Ms?: number;
  childEventLoopDelayMaxMs?: number;
}
/**
 * Result from running a performance test scenario.
 */
export interface PerfTestResult {
  scenarioName: string;
  samples: PerfSnapshot[];
  filteredSamples: PerfSnapshot[];
  median: PerfSnapshot;
  baseline: PerfBaseline | undefined;
  withinTolerance: boolean;
  deltaPercent: number;
  cpuDeltaPercent: number;
}
/**
 * Options for the PerfTestHarness.
 */
export interface PerfTestHarnessOptions {
  /** Path to the baselines JSON file */
  baselinesPath: string;
  /** Default tolerance percentage (0-100). Default: 15 */
  defaultTolerancePercent?: number;
  /** Default CPU tolerance percentage (0-100). Optional */
  defaultCpuTolerancePercent?: number;
  /** Number of samples per scenario. Default: 5 */
  sampleCount?: number;
  /** Number of warmup runs to discard. Default: 1 */
  warmupCount?: number;
  /** Pause in ms between samples. Default: 100 */
  samplePauseMs?: number;
}
/**
 * PerfTestHarness provides infrastructure for running CPU performance tests.
 *
 * It handles:
 * - High-resolution wall-clock timing via performance.now()
 * - CPU usage measurement via process.cpuUsage()
 * - Event loop delay monitoring via perf_hooks.monitorEventLoopDelay()
 * - IQR outlier filtering for noise reduction
 * - Warmup runs to avoid JIT compilation noise
 * - Comparing against baselines with configurable tolerance
 * - Generating ASCII chart reports
 */
export declare class PerfTestHarness {
  private baselines;
  private readonly baselinesPath;
  private readonly defaultTolerancePercent;
  private readonly defaultCpuTolerancePercent?;
  private readonly sampleCount;
  private readonly warmupCount;
  private readonly samplePauseMs;
  private allResults;
  private activeTimers;
  constructor(options: PerfTestHarnessOptions);
  /**
   * Start a high-resolution timer with CPU tracking.
   */
  startTimer(label: string): void;
  /**
   * Stop a timer and return the snapshot.
   */
  stopTimer(label: string): PerfSnapshot;
  /**
   * Measure a function's wall-clock time and CPU usage.
   * Returns the snapshot with timing data.
   */
  measure(label: string, fn: () => Promise<void>): Promise<PerfSnapshot>;
  /**
   * Measure a function with event loop delay monitoring.
   * Uses perf_hooks.monitorEventLoopDelay() for histogram data.
   */
  measureWithEventLoop(
    label: string,
    fn: () => Promise<void>,
  ): Promise<PerfSnapshot>;
  /**
   * Run a scenario multiple times with warmup, outlier filtering, and baseline comparison.
   *
   * @param name - Scenario name (must match baseline key)
   * @param fn - Async function that executes one sample of the scenario.
   *             Must return a PerfSnapshot with measured values.
   * @param tolerancePercent - Override default tolerance for this scenario
   */
  runScenario(
    name: string,
    fn: () => Promise<PerfSnapshot>,
    tolerancePercent?: number,
  ): Promise<PerfTestResult>;
  /**
   * Assert that a scenario result is within the baseline tolerance.
   */
  assertWithinBaseline(
    result: PerfTestResult,
    tolerancePercent?: number,
    cpuTolerancePercent?: number,
  ): void;
  /**
   * Update the baseline for a scenario with the current measured values.
   */
  updateScenarioBaseline(result: PerfTestResult): void;
  /**
   * Generate an ASCII report with summary table and charts.
   */
  generateReport(results?: PerfTestResult[]): Promise<string>;
  /**
   * Filter outliers using the Interquartile Range (IQR) method.
   * Removes samples where the given metric falls outside Q1 - 1.5*IQR or Q3 + 1.5*IQR.
   */
  private filterOutliers;
  /**
   * Get the median snapshot by wall-clock time from a sorted list.
   */
  private getMedianSnapshot;
}
/**
 * Load perf baselines from a JSON file.
 */
export declare function loadPerfBaselines(path: string): PerfBaselineFile;
/**
 * Save perf baselines to a JSON file.
 */
export declare function savePerfBaselines(
  path: string,
  baselines: PerfBaselineFile,
): void;
/**
 * Update (or create) a single scenario baseline in the file.
 */
export declare function updatePerfBaseline(
  path: string,
  scenarioName: string,
  measured: {
    wallClockMs: number;
    cpuTotalUs: number;
  },
): void;

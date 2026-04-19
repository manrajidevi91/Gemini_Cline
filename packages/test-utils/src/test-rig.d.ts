/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GEMINI_DIR } from '@google/gemini-cli-core';
export { GEMINI_DIR };
import * as pty from '@lydell/node-pty';
import type { TestMcpConfig } from './test-mcp-server.js';
export declare function getDefaultTimeout(): 60000 | 30000 | 15000;
export declare function poll(
  predicate: () => boolean,
  timeout: number,
  interval: number,
): Promise<boolean>;
export declare function sanitizeTestName(name: string): string;
export declare function createToolCallErrorMessage(
  expectedTools: string | string[],
  foundTools: string[],
  result: string,
): string;
export declare function printDebugInfo(
  rig: TestRig,
  result: string,
  context?: Record<string, unknown>,
):
  | {
      timestamp: number;
      toolRequest: {
        name: string;
        args: string;
        success: boolean;
        duration_ms: number;
        prompt_id?: string;
      };
    }[]
  | {
      toolRequest: {
        name: string;
        args: string;
        success: boolean;
        duration_ms: number;
        prompt_id?: string;
        error?: string;
        error_type?: string;
      };
    }[];
export declare function assertModelHasOutput(result: string): void;
export declare function checkModelOutputContent(
  result: string,
  {
    expectedContent,
    testName,
    forbiddenContent,
  }?: {
    expectedContent?: string | (string | RegExp)[] | null;
    testName?: string;
    forbiddenContent?: string | (string | RegExp)[] | null;
  },
): boolean;
export interface MetricDataPoint {
  attributes?: Record<string, unknown>;
  value?: {
    sum?: number;
    min?: number;
    max?: number;
    count?: number;
  };
  startTime?: [number, number];
  endTime?: string;
}
export interface TelemetryMetric {
  descriptor: {
    name: string;
    type?: string;
    description?: string;
    unit?: string;
  };
  dataPoints: MetricDataPoint[];
}
export interface ParsedLog {
  attributes?: {
    'event.name'?: string;
    function_name?: string;
    function_args?: string;
    success?: boolean;
    duration_ms?: number;
    request_text?: string;
    hook_event_name?: string;
    hook_name?: string;
    hook_input?: Record<string, unknown>;
    hook_output?: Record<string, unknown>;
    exit_code?: number;
    stdout?: string;
    stderr?: string;
    error?: string;
    error_type?: string;
    prompt_id?: string;
  };
  scopeMetrics?: {
    metrics: TelemetryMetric[];
  }[];
}
export declare class InteractiveRun {
  ptyProcess: pty.IPty;
  output: string;
  constructor(ptyProcess: pty.IPty);
  expectText(text: string, timeout?: number): Promise<void>;
  type(text: string): Promise<void>;
  sendText(text: string): Promise<void>;
  sendKeys(text: string): Promise<void>;
  kill(): Promise<void>;
  expectExit(): Promise<number>;
}
export declare class TestRig {
  testDir: string | null;
  homeDir: string | null;
  testName?: string;
  _lastRunStdout?: string;
  _lastRunStderr?: string;
  fakeResponsesPath?: string;
  originalFakeResponsesPath?: string;
  private _interactiveRuns;
  private _spawnedProcesses;
  private _initialized;
  setup(
    testName: string,
    options?: {
      settings?: Record<string, unknown>;
      state?: Record<string, unknown>;
      fakeResponsesPath?: string;
    },
  ): void;
  private _cleanDir;
  private _createSettingsFile;
  private _createStateFile;
  createFile(fileName: string, content: string): string;
  mkdir(dir: string): void;
  sync(): void;
  /**
   * The command and args to use to invoke Gemini CLI. Allows us to switch
   * between using the bundled gemini.js (the default) and using the installed
   * 'gemini' (used to verify npm bundles).
   */
  private _getCommandAndArgs;
  createScript(fileName: string, content: string): string;
  /**
   * Adds a test MCP server to the test workspace.
   * @param name The name of the server
   * @param config Configuration object or name of predefined config (e.g. 'github')
   */
  addTestMcpServer(name: string, config: TestMcpConfig | string): void;
  private _getCleanEnv;
  run(options: {
    args?: string | string[];
    stdin?: string;
    stdinDoesNotEnd?: boolean;
    approvalMode?: 'default' | 'auto_edit' | 'yolo' | 'plan';
    timeout?: number;
    env?: Record<string, string | undefined>;
  }): Promise<string>;
  private _filterPodmanTelemetry;
  /**
   * Runs the CLI and returns stdout and stderr separately.
   * Useful for tests that need to verify correct stream routing.
   */
  runWithStreams(
    args: string[],
    options?: {
      signal?: AbortSignal;
    },
  ): Promise<{
    stdout: string;
    stderr: string;
    exitCode: number | null;
  }>;
  runCommand(
    args: string[],
    options?: {
      stdin?: string;
      timeout?: number;
      env?: Record<string, string | undefined>;
    },
  ): Promise<string>;
  readFile(fileName: string): string;
  cleanup(): Promise<void>;
  waitForTelemetryReady(): Promise<void>;
  waitForTelemetryEvent(eventName: string, timeout?: number): Promise<boolean>;
  waitForToolCall(
    toolName: string,
    timeout?: number,
    matchArgs?: (args: string) => boolean,
  ): Promise<boolean>;
  expectToolCallSuccess(
    toolNames: string[],
    timeout?: number,
    matchArgs?: (args: string) => boolean,
  ): Promise<void>;
  waitForAnyToolCall(toolNames: string[], timeout?: number): Promise<boolean>;
  _parseToolLogsFromStdout(stdout: string): {
    timestamp: number;
    toolRequest: {
      name: string;
      args: string;
      success: boolean;
      duration_ms: number;
      prompt_id?: string;
    };
  }[];
  readTelemetryLogs(): ParsedLog[];
  private _readAndParseTelemetryLog;
  readToolLogs():
    | {
        timestamp: number;
        toolRequest: {
          name: string;
          args: string;
          success: boolean;
          duration_ms: number;
          prompt_id?: string;
        };
      }[]
    | {
        toolRequest: {
          name: string;
          args: string;
          success: boolean;
          duration_ms: number;
          prompt_id?: string;
          error?: string;
          error_type?: string;
        };
      }[];
  readAllApiRequest(): ParsedLog[];
  readLastApiRequest(): ParsedLog | null;
  waitForMetric(metricName: string, timeout?: number): Promise<boolean>;
  readMetric(metricName: string): TelemetryMetric | null;
  runInteractive(options?: {
    args?: string | string[];
    approvalMode?: 'default' | 'auto_edit' | 'yolo' | 'plan';
    env?: Record<string, string | undefined>;
  }): Promise<InteractiveRun>;
  readHookLogs(): {
    hookCall: {
      hook_event_name: string;
      hook_name: string;
      hook_input: Record<string, unknown>;
      hook_output: Record<string, unknown>;
      exit_code: number;
      stdout: string;
      stderr: string;
      duration_ms: number;
      success: boolean;
      error: string;
    };
  }[];
  pollCommand(
    commandFn: () => Promise<void>,
    predicateFn: () => boolean,
    timeout?: number,
    interval?: number,
  ): Promise<void>;
}
/**
 * Normalizes a path for cross-platform matching (replaces backslashes with forward slashes).
 */
export declare function normalizePath(
  p: string | undefined,
): string | undefined;

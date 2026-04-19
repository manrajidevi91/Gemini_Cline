/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exit code used to signal that the CLI should be relaunched.
 */
export declare const RELAUNCH_EXIT_CODE = 199;
/** @internal only for testing */
export declare function _resetRelaunchStateForTesting(): void;
export declare function relaunchApp(): Promise<void>;

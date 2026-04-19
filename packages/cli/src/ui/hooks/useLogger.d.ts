/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Logger, type Config } from '@google/gemini-cli-core';
/**
 * Hook to manage the logger instance.
 */
export declare const useLogger: (config: Config) => Logger | null;

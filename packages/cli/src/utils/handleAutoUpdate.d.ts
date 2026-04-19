/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { UpdateObject } from '../ui/utils/updateCheck.js';
import type { LoadedSettings } from '../config/settings.js';
import { type HistoryItem } from '../ui/types.js';
import type { spawn } from 'node:child_process';
/** @internal */
export declare function _setUpdateStateForTesting(value: boolean): void;
export declare function isUpdateInProgress(): boolean;
/**
 * Returns a promise that resolves when the update process completes or times out.
 */
export declare function waitForUpdateCompletion(
  timeoutMs?: number,
): Promise<void>;
export declare function handleAutoUpdate(
  info: UpdateObject | null,
  settings: LoadedSettings,
  projectRoot: string,
  spawnFn?: typeof spawn,
): import('child_process').ChildProcess | undefined;
export declare function setUpdateHandler(
  addItem: (item: Omit<HistoryItem, 'id'>, timestamp: number) => void,
  setUpdateInfo: (info: UpdateObject | null) => void,
): () => void;

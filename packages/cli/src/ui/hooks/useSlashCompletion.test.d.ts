/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
declare const resetConstructorCallCount: () => void;
declare const getConstructorCallCount: () => number;
export declare const resolveMatch: () => Promise<void>;
declare const createDefaultAsyncFzfMock: () => (
  items: readonly string[],
  _options: unknown,
) => any;
export {
  resetConstructorCallCount,
  getConstructorCallCount,
  createDefaultAsyncFzfMock,
};

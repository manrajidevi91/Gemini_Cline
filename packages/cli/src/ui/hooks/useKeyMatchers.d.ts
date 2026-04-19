/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { type KeyMatchers } from '../key/keyMatchers.js';
export declare const KeyMatchersContext: React.Context<KeyMatchers>;
export declare const KeyMatchersProvider: ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: KeyMatchers;
}) => React.JSX.Element;
/**
 * Hook to retrieve the currently active key matchers.
 * Defaults to defaultKeyMatchers if no provider is present, allowing tests to run without explicit wrappers.
 */
export declare function useKeyMatchers(): KeyMatchers;

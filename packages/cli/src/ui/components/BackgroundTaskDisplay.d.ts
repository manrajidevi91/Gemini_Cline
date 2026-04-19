/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type BackgroundTask } from '../hooks/useExecutionLifecycle.js';
interface BackgroundTaskDisplayProps {
  shells: Map<number, BackgroundTask>;
  activePid: number;
  width: number;
  height: number;
  isFocused: boolean;
  isListOpenProp: boolean;
}
export declare const BackgroundTaskDisplay: ({
  shells,
  activePid,
  width,
  height,
  isFocused,
  isListOpenProp,
}: BackgroundTaskDisplayProps) => import('react/jsx-runtime').JSX.Element;
export {};

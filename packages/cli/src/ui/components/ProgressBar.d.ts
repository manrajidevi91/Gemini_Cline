/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
interface ProgressBarProps {
  value: number;
  width: number;
  warningThreshold?: number;
}
export declare const ProgressBar: React.FC<ProgressBarProps>;
export {};

/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { type IndividualToolCallDisplay } from '../../types.js';
interface DenseToolMessageProps extends IndividualToolCallDisplay {
  terminalWidth: number;
  availableTerminalHeight?: number;
}
export declare const DenseToolMessage: React.FC<DenseToolMessageProps>;
export {};

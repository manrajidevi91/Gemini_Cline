/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { IndividualToolCallDisplay } from '../../types.js';
interface TopicMessageProps extends IndividualToolCallDisplay {
  terminalWidth: number;
  availableTerminalHeight?: number;
  isExpandable?: boolean;
}
export declare const isTopicTool: (name: string) => boolean;
export declare const TopicMessage: React.FC<TopicMessageProps>;
export {};

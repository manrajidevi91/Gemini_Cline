/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { QuotaStats } from '../types.js';
interface StatsDisplayProps {
  duration: string;
  title?: string;
  footer?: string;
  selectedAuthType?: string;
  userEmail?: string;
  tier?: string;
  currentModel?: string;
  quotaStats?: QuotaStats;
  creditBalance?: number;
}
export declare const StatsDisplay: React.FC<StatsDisplayProps>;
export {};

/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
interface LocalBucket {
  modelId?: string;
  remainingFraction?: number;
  resetTime?: string;
}
interface ModelQuotaDisplayProps {
  buckets?: LocalBucket[];
  availableWidth?: number;
  modelsToShow?: string[];
  title?: string;
}
export declare const ModelQuotaDisplay: ({
  buckets,
  availableWidth,
  modelsToShow,
  title,
}: ModelQuotaDisplayProps) => import('react/jsx-runtime').JSX.Element | null;
export {};

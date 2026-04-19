/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
export interface FooterRowItem {
  key: string;
  header: string;
  element: React.ReactNode;
  flexGrow?: number;
  flexShrink?: number;
  isFocused?: boolean;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
}
export declare const FooterRow: React.FC<{
  items: FooterRowItem[];
  showLabels: boolean;
}>;
export declare const Footer: React.FC;

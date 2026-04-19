/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import {
  type VirtualizedListRef,
  type VirtualizedListProps,
} from './VirtualizedList.js';
interface ScrollableListProps<T> extends VirtualizedListProps<T> {
  hasFocus: boolean;
  width?: string | number;
  scrollbar?: boolean;
  stableScrollback?: boolean;
  copyModeEnabled?: boolean;
  isStatic?: boolean;
  fixedItemHeight?: boolean;
  targetScrollIndex?: number;
  containerHeight?: number;
  scrollbarThumbColor?: string;
}
export type ScrollableListRef<T> = VirtualizedListRef<T>;
declare const ScrollableListWithForwardRef: <T>(
  props: ScrollableListProps<T> & {
    ref?: React.Ref<ScrollableListRef<T>>;
  },
) => React.ReactElement;
export { ScrollableListWithForwardRef as ScrollableList };

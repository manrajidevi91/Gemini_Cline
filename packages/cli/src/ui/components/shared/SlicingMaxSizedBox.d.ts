/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type MaxSizedBoxProps } from './MaxSizedBox.js';
export interface SlicingMaxSizedBoxProps<T>
  extends Omit<MaxSizedBoxProps, 'children'> {
  data: T;
  maxLines?: number;
  isAlternateBuffer?: boolean;
  children: (truncatedData: T) => React.ReactNode;
}
/**
 * An extension of MaxSizedBox that performs explicit slicing of the input data
 * (string or array) before rendering. This is useful for performance and to
 * ensure consistent truncation behavior for large outputs.
 */
export declare function SlicingMaxSizedBox<T>({
  data,
  maxLines,
  isAlternateBuffer,
  children,
  ...boxProps
}: SlicingMaxSizedBoxProps<T>): import('react/jsx-runtime').JSX.Element;

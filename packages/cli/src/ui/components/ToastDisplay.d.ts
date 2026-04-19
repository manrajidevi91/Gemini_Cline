/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { type UIState } from '../contexts/UIStateContext.js';
import { type InputState } from '../contexts/InputContext.js';
export declare function shouldShowToast(
  uiState: UIState,
  inputState: InputState,
): boolean;
export declare const ToastDisplay: React.FC;

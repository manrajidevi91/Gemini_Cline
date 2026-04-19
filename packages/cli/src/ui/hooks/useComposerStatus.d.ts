/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A hook that encapsulates complex status and action-required logic for the Composer.
 */
export declare const useComposerStatus: () => {
  hasPendingActionRequired: boolean;
  shouldCollapseDuringApproval: boolean;
  isInteractiveShellWaiting: boolean;
  showLoadingIndicator: boolean;
  showTips: boolean;
  showWit: boolean;
  modeContentObj: {
    text: string;
    color: string;
  } | null;
  showMinimalContext: boolean;
};

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const PHRASE_CHANGE_INTERVAL_MS = 10000;
export declare const WITTY_PHRASE_CHANGE_INTERVAL_MS = 5000;
export declare const INTERACTIVE_SHELL_WAITING_PHRASE =
  '! Shell awaiting input (Tab to focus)';
/**
 * Custom hook to manage cycling through loading phrases.
 * @param isActive Whether the phrase cycling should be active.
 * @param isWaiting Whether to show a specific waiting phrase.
 * @param shouldShowFocusHint Whether to show the shell focus hint.
 * @param showTips Whether to show informative tips.
 * @param showWit Whether to show witty phrases.
 * @param customPhrases Optional list of custom phrases to use instead of built-in witty phrases.
 * @param maxLength Optional maximum length for the selected phrase.
 * @returns The current loading phrase.
 */
export declare const usePhraseCycler: (
  isActive: boolean,
  isWaiting: boolean,
  shouldShowFocusHint: boolean,
  showTips?: boolean,
  showWit?: boolean,
  customPhrases?: string[],
  maxLength?: number,
) => {
  currentTip: string | undefined;
  currentWittyPhrase: string | undefined;
};

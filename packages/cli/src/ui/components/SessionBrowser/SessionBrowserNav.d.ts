/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { SessionBrowserState } from '../SessionBrowser.js';
/**
 * Navigation help component showing keyboard shortcuts.
 */
export declare const NavigationHelpDisplay: () => React.JSX.Element;
/**
 * Search input display component.
 */
export declare const SearchModeDisplay: ({
  state,
}: {
  state: SessionBrowserState;
}) => React.JSX.Element;
/**
 * No results display component for empty search results.
 */
export declare const NoResultsDisplay: ({
  state,
}: {
  state: SessionBrowserState;
}) => React.JSX.Element;

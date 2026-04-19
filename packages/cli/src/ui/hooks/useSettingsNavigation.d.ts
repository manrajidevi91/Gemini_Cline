/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export interface UseSettingsNavigationProps {
  items: Array<{
    key: string;
  }>;
  maxItemsToShow: number;
}
export declare function useSettingsNavigation({
  items,
  maxItemsToShow,
}: UseSettingsNavigationProps): {
  activeItemKey: string | null;
  activeIndex: number;
  windowStart: number;
  moveUp: () => void;
  moveDown: () => void;
};

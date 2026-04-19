/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare function _clearSessionBannersForTest(): void;
interface BannerData {
  defaultText: string;
  warningText: string;
}
export declare function useBanner(bannerData: BannerData): {
  bannerText: string;
};
export {};

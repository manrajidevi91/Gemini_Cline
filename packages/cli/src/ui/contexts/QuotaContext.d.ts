/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { QuotaStats } from '../types.js';
import type { UserTierId } from '@google/gemini-cli-core';
import type {
  ProQuotaDialogRequest,
  ValidationDialogRequest,
  OverageMenuDialogRequest,
  EmptyWalletDialogRequest,
} from './UIStateContext.js';
export interface QuotaState {
  userTier?: UserTierId;
  stats?: QuotaStats;
  proQuotaRequest?: ProQuotaDialogRequest | null;
  validationRequest?: ValidationDialogRequest | null;
  overageMenuRequest?: OverageMenuDialogRequest | null;
  emptyWalletRequest?: EmptyWalletDialogRequest | null;
}
export declare const QuotaContext: import('react').Context<QuotaState | null>;
export declare const useQuotaState: () => QuotaState;

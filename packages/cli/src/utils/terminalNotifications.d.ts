/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { LoadedSettings } from '../config/settings.js';
export declare const MAX_NOTIFICATION_TITLE_CHARS = 48;
export declare const MAX_NOTIFICATION_SUBTITLE_CHARS = 64;
export declare const MAX_NOTIFICATION_BODY_CHARS = 180;
export interface RunEventNotificationContent {
  title: string;
  subtitle?: string;
  body: string;
}
export type RunEventNotificationEvent =
  | {
      type: 'attention';
      heading?: string;
      detail?: string;
    }
  | {
      type: 'session_complete';
      detail?: string;
    };
export declare function buildRunEventNotificationContent(
  event: RunEventNotificationEvent,
): RunEventNotificationContent;
export declare function isNotificationsEnabled(
  settings: LoadedSettings,
): boolean;
export declare enum TerminalNotificationMethod {
  Auto = 'auto',
  Osc9 = 'osc9',
  Osc777 = 'osc777',
  Bell = 'bell',
}
export declare function getNotificationMethod(
  settings: LoadedSettings,
): TerminalNotificationMethod;
export declare function notifyViaTerminal(
  notificationsEnabled: boolean,
  content: RunEventNotificationContent,
  method?: TerminalNotificationMethod,
): Promise<boolean>;

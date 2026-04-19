/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { type Config } from '@google/gemini-cli-core';
interface SkillInboxDialogProps {
  config: Config;
  onClose: () => void;
  onReloadSkills: () => Promise<void>;
}
export declare const SkillInboxDialog: React.FC<SkillInboxDialogProps>;
export {};

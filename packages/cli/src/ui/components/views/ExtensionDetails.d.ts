/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { RegistryExtension } from '../../../config/extensionRegistryClient.js';
import { ExtensionUpdateState } from '../../state/extensions.js';
export interface ExtensionDetailsProps {
  extension: RegistryExtension;
  onBack: () => void;
  onInstall: (
    requestConsentOverride: (consent: string) => Promise<boolean>,
  ) => void | Promise<void>;
  onLink: (
    requestConsentOverride: (consent: string) => Promise<boolean>,
  ) => void | Promise<void>;
  isInstalled: boolean;
  updateState?: ExtensionUpdateState;
  onUpdate?: () => void | Promise<void>;
}
export declare function ExtensionDetails({
  extension,
  onBack,
  onInstall,
  onLink,
  isInstalled,
  updateState,
  onUpdate,
}: ExtensionDetailsProps): React.JSX.Element;

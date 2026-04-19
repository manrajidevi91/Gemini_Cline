/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { RegistryExtension } from '../../../config/extensionRegistryClient.js';
import type { ExtensionManager } from '../../../config/extension-manager.js';
export interface ExtensionRegistryViewProps {
  onSelect?: (
    extension: RegistryExtension,
    requestConsentOverride?: (consent: string) => Promise<boolean>,
  ) => void | Promise<void>;
  onLink?: (
    extension: RegistryExtension,
    requestConsentOverride?: (consent: string) => Promise<boolean>,
  ) => void | Promise<void>;
  onClose?: () => void;
  extensionManager: ExtensionManager;
}
export declare function ExtensionRegistryView({
  onSelect,
  onLink,
  onClose,
  extensionManager,
}: ExtensionRegistryViewProps): React.JSX.Element;

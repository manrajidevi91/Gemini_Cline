/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import type { LoadableSettingScope } from '../../../config/settings.js';
import type {
  SettingsType,
  SettingsValue,
} from '../../../config/settingsSchema.js';
import type { TextBuffer } from './text-buffer.js';
import { type Key } from '../../hooks/useKeypress.js';
import { type KeyMatchers } from '../../key/keyMatchers.js';
/**
 * Represents a single item in the settings dialog.
 */
export interface SettingsDialogItem {
  /** Unique identifier for the item */
  key: string;
  /** Display label */
  label: string;
  /** Optional description below label */
  description?: string;
  /** Item type for determining interaction behavior */
  type: SettingsType;
  /** Pre-formatted display value (with * if modified) */
  displayValue: string;
  /** Grey out value (at default) */
  isGreyedOut?: boolean;
  /** Scope message e.g., "(Modified in Workspace)" */
  scopeMessage?: string;
  /** Raw value for edit mode initialization */
  rawValue?: SettingsValue;
  /** Optional pre-formatted edit buffer value for complex types */
  editValue?: string;
}
/**
 * Props for BaseSettingsDialog component.
 */
export interface BaseSettingsDialogProps {
  /** Dialog title displayed at the top */
  title: string;
  /** Optional border color for the dialog */
  borderColor?: string;
  /** Whether to show the search input. Default: true */
  searchEnabled?: boolean;
  /** Placeholder text for search input. Default: "Search to filter" */
  searchPlaceholder?: string;
  /** Text buffer for search input */
  searchBuffer?: TextBuffer;
  /** List of items to display */
  items: SettingsDialogItem[];
  /** Whether to show the scope selector. Default: true */
  showScopeSelector?: boolean;
  /** Currently selected scope */
  selectedScope: LoadableSettingScope;
  /** Callback when scope changes */
  onScopeChange?: (scope: LoadableSettingScope) => void;
  /** Maximum number of items to show at once */
  maxItemsToShow: number;
  /** Maximum label width for alignment */
  maxLabelWidth?: number;
  /** Called when a boolean/enum item is toggled */
  onItemToggle: (key: string, item: SettingsDialogItem) => void;
  /** Called when edit mode is committed with new value */
  onEditCommit: (
    key: string,
    newValue: string,
    item: SettingsDialogItem,
  ) => void;
  /** Called when Ctrl+C is pressed to clear/reset an item */
  onItemClear: (key: string, item: SettingsDialogItem) => void;
  /** Called when dialog should close */
  onClose: () => void;
  /** Optional custom key handler for parent-specific keys. Return true if handled. */
  onKeyPress?: (
    key: Key,
    currentItem: SettingsDialogItem | undefined,
  ) => boolean;
  /** Optional override for key matchers used for navigation. */
  keyMatchers?: KeyMatchers;
  /** Available terminal height for dynamic windowing */
  availableHeight?: number;
  /** Optional footer configuration */
  footer?: {
    content: React.ReactNode;
    height: number;
  };
}
/**
 * A base settings dialog component that handles rendering, layout, and keyboard navigation.
 * Parent components handle business logic (saving, filtering, etc.) via callbacks.
 */
export declare function BaseSettingsDialog({
  title,
  borderColor,
  searchEnabled,
  searchPlaceholder,
  searchBuffer,
  items,
  showScopeSelector,
  selectedScope,
  onScopeChange,
  maxItemsToShow,
  maxLabelWidth,
  onItemToggle,
  onEditCommit,
  onItemClear,
  onClose,
  onKeyPress,
  keyMatchers: customKeyMatchers,
  availableHeight,
  footer,
}: BaseSettingsDialogProps): React.JSX.Element;

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Key } from '../hooks/useKeypress.js';
import type { KeyBindingConfig } from './keyBindings.js';
import { Command } from './keyBindings.js';
/**
 * Key matcher function type
 */
type KeyMatcher = (key: Key) => boolean;
/**
 * Type for key matchers mapped to Command enum
 */
export type KeyMatchers = {
  readonly [C in Command]: KeyMatcher;
};
/**
 * Creates key matchers from a key binding configuration
 */
export declare function createKeyMatchers(
  config?: KeyBindingConfig,
): KeyMatchers;
/**
 * Default key binding matchers using the default configuration
 */
export declare const defaultKeyMatchers: KeyMatchers;
export { Command };
/**
 * Loads and creates key matchers including user customizations.
 */
export declare function loadKeyMatchers(): Promise<{
  matchers: KeyMatchers;
  errors: string[];
}>;

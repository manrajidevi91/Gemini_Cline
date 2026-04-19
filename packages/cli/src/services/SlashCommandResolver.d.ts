/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type SlashCommand } from '../ui/commands/types.js';
import type { CommandConflict } from './types.js';
/**
 * Resolves name conflicts among slash commands.
 *
 * Rules:
 * 1. Built-in commands always keep the original name.
 * 2. All other types are prefixed with their source name (e.g. user.name).
 * 3. If multiple non-built-in commands conflict, all of them are renamed.
 */
export declare class SlashCommandResolver {
  /**
   * Orchestrates conflict resolution by applying renaming rules to ensures
   * every command has a unique name.
   */
  static resolve(allCommands: SlashCommand[]): {
    finalCommands: SlashCommand[];
    conflicts: CommandConflict[];
  };
  /**
   * Resolves a name collision by deciding which command keeps the name and which is renamed.
   *
   * @param incoming The command currently being processed that has a name collision.
   * @param registry The internal state of the resolution process.
   * @returns The final name to be assigned to the `incoming` command.
   */
  private static handleConflict;
  /**
   * Safely renames the command currently occupying a name in the registry.
   *
   * @param name The name of the command to prefix.
   * @param reason The incoming command that is causing the prefixing.
   * @param registry The internal state of the resolution process.
   */
  private static prefixExistingCommand;
  /**
   * Generates a unique name using numeric suffixes if needed.
   */
  private static getRenamedName;
  /**
   * Returns a suitable prefix for a conflicting command.
   */
  private static getPrefix;
  /**
   * Logs a conflict event.
   */
  private static trackConflict;
}

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { CommandContext } from './commands/types.js';
export declare class CommandHandler {
  private registry;
  constructor();
  private static createRegistry;
  getAvailableCommands(): Array<{
    name: string;
    description: string;
  }>;
  /**
   * Parses and executes a command string if it matches a registered command.
   * Returns true if a command was handled, false otherwise.
   */
  handleCommand(commandText: string, context: CommandContext): Promise<boolean>;
  private runCommand;
  /**
   * Parses a raw slash command string into its matching headless command and arguments.
   * Mirrors `packages/cli/src/utils/commands.ts` logic.
   */
  private parseSlashCommand;
}

/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type {
  Command,
  CommandContext,
  CommandExecutionResponse,
} from './types.js';
import type { CommandRegistry } from './commandRegistry.js';
export declare class HelpCommand implements Command {
  private registry;
  readonly name = 'help';
  readonly description = 'Show available commands';
  constructor(registry: CommandRegistry);
  execute(
    _context: CommandContext,
    _args?: string[],
  ): Promise<CommandExecutionResponse>;
}

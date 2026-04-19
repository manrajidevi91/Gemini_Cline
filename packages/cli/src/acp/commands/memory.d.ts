/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type {
  Command,
  CommandContext,
  CommandExecutionResponse,
} from './types.js';
export declare class MemoryCommand implements Command {
  readonly name = 'memory';
  readonly description = 'Manage memory.';
  readonly subCommands: (
    | ShowMemoryCommand
    | RefreshMemoryCommand
    | ListMemoryCommand
    | AddMemoryCommand
    | InboxMemoryCommand
  )[];
  readonly requiresWorkspace = true;
  execute(
    context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class ShowMemoryCommand implements Command {
  readonly name = 'memory show';
  readonly description = 'Shows the current memory contents.';
  execute(
    context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class RefreshMemoryCommand implements Command {
  readonly name = 'memory refresh';
  readonly aliases: string[];
  readonly description = 'Refreshes the memory from the source.';
  execute(
    context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class ListMemoryCommand implements Command {
  readonly name = 'memory list';
  readonly description = 'Lists the paths of the GEMINI.md files in use.';
  execute(
    context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class AddMemoryCommand implements Command {
  readonly name = 'memory add';
  readonly description = 'Add content to the memory.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class InboxMemoryCommand implements Command {
  readonly name = 'memory inbox';
  readonly description =
    'Lists skills extracted from past sessions that are pending review.';
  execute(
    context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}

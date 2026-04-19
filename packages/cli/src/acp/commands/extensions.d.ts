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
export declare class ExtensionsCommand implements Command {
  readonly name = 'extensions';
  readonly description = 'Manage extensions.';
  readonly subCommands: (
    | ListExtensionsCommand
    | ExploreExtensionsCommand
    | EnableExtensionCommand
    | DisableExtensionCommand
    | InstallExtensionCommand
    | LinkExtensionCommand
    | UninstallExtensionCommand
    | RestartExtensionCommand
    | UpdateExtensionCommand
  )[];
  execute(
    context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class ListExtensionsCommand implements Command {
  readonly name = 'extensions list';
  readonly description = 'Lists all installed extensions.';
  execute(
    context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class ExploreExtensionsCommand implements Command {
  readonly name = 'extensions explore';
  readonly description = 'Explore available extensions.';
  execute(
    _context: CommandContext,
    _: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class EnableExtensionCommand implements Command {
  readonly name = 'extensions enable';
  readonly description = 'Enable an extension.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class DisableExtensionCommand implements Command {
  readonly name = 'extensions disable';
  readonly description = 'Disable an extension.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class InstallExtensionCommand implements Command {
  readonly name = 'extensions install';
  readonly description = 'Install an extension from a git repo or local path.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class LinkExtensionCommand implements Command {
  readonly name = 'extensions link';
  readonly description = 'Link an extension from a local path.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class UninstallExtensionCommand implements Command {
  readonly name = 'extensions uninstall';
  readonly description = 'Uninstall an extension.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class RestartExtensionCommand implements Command {
  readonly name = 'extensions restart';
  readonly description = 'Restart an extension.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}
export declare class UpdateExtensionCommand implements Command {
  readonly name = 'extensions update';
  readonly description = 'Update an extension.';
  execute(
    context: CommandContext,
    args: string[],
  ): Promise<CommandExecutionResponse>;
}

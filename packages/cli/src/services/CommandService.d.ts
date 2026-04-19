/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { SlashCommand } from '../ui/commands/types.js';
import type { ICommandLoader, CommandConflict } from './types.js';
/**
 * Orchestrates the discovery and loading of all slash commands for the CLI.
 *
 * This service operates on a provider-based loader pattern. It is initialized
 * with an array of `ICommandLoader` instances, each responsible for fetching
 * commands from a specific source (e.g., built-in code, local files).
 *
 * It uses a delegating resolver to reconcile name conflicts, ensuring that
 * all commands are uniquely addressable via source-specific prefixes while
 * allowing built-in commands to retain their primary names.
 */
export declare class CommandService {
  private readonly commands;
  private readonly conflicts;
  /**
   * Private constructor to enforce the use of the async factory.
   * @param commands A readonly array of the fully loaded and de-duplicated commands.
   * @param conflicts A readonly array of conflicts that occurred during loading.
   */
  private constructor();
  /**
   * Asynchronously creates and initializes a new CommandService instance.
   *
   * This factory method orchestrates the loading process and delegates
   * conflict resolution to the SlashCommandResolver.
   *
   * @param loaders An array of loaders to fetch commands from.
   * @param signal An AbortSignal to allow cancellation.
   * @returns A promise that resolves to a fully initialized CommandService.
   */
  static create(
    loaders: ICommandLoader[],
    signal: AbortSignal,
  ): Promise<CommandService>;
  /**
   * Invokes all loaders in parallel and flattens the results.
   */
  private static loadAllCommands;
  /**
   * Formats and emits telemetry for command conflicts.
   */
  private static emitConflictEvents;
  /**
   * Retrieves the currently loaded and de-duplicated list of slash commands.
   *
   * This method is a safe accessor for the service's state. It returns a
   * readonly array, preventing consumers from modifying the service's internal state.
   *
   * @returns A readonly, unified array of available `SlashCommand` objects.
   */
  getCommands(): readonly SlashCommand[];
  /**
   * Retrieves the list of conflicts that occurred during command loading.
   *
   * @returns A readonly array of command conflicts.
   */
  getConflicts(): readonly CommandConflict[];
}

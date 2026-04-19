/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type Config } from '@google/gemini-cli-core';
import { type SlashCommand } from '../ui/commands/types.js';
import { type ICommandLoader } from './types.js';
/**
 * Loads Agent Skills as slash commands.
 */
export declare class SkillCommandLoader implements ICommandLoader {
  private config;
  constructor(config: Config | null);
  /**
   * Discovers all available skills from the SkillManager and converts
   * them into executable slash commands.
   *
   * @param _signal An AbortSignal (unused for this synchronous loader).
   * @returns A promise that resolves to an array of `SlashCommand` objects.
   */
  loadCommands(_signal: AbortSignal): Promise<SlashCommand[]>;
}

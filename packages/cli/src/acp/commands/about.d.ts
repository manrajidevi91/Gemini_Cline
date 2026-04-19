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
export declare class AboutCommand implements Command {
  readonly name = 'about';
  readonly description = 'Show version and environment info';
  execute(
    context: CommandContext,
    _args?: string[],
  ): Promise<CommandExecutionResponse>;
}

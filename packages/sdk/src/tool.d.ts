/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from 'zod';
import {
  BaseDeclarativeTool,
  type ToolResult,
  type ToolInvocation,
  type MessageBus,
} from '@google/gemini-cli-core';
import type { SessionContext } from './types.js';
export { z };
export declare class ModelVisibleError extends Error {
  constructor(message: string | Error);
}
export interface ToolDefinition<T extends z.ZodTypeAny> {
  name: string;
  description: string;
  inputSchema: T;
  sendErrorsToModel?: boolean;
}
export interface Tool<T extends z.ZodTypeAny> extends ToolDefinition<T> {
  action: (params: z.infer<T>, context?: SessionContext) => Promise<unknown>;
}
export declare class SdkTool<
  T extends z.ZodTypeAny,
> extends BaseDeclarativeTool<z.infer<T>, ToolResult> {
  private readonly definition;
  private readonly context?;
  constructor(
    definition: Tool<T>,
    messageBus: MessageBus,
    _agent?: unknown,
    context?: SessionContext | undefined,
  );
  bindContext(context: SessionContext): SdkTool<T>;
  createInvocationWithContext(
    params: z.infer<T>,
    messageBus: MessageBus,
    context: SessionContext | undefined,
    toolName?: string,
  ): ToolInvocation<z.infer<T>, ToolResult>;
  protected createInvocation(
    params: z.infer<T>,
    messageBus: MessageBus,
    toolName?: string,
  ): ToolInvocation<z.infer<T>, ToolResult>;
}
export declare function tool<T extends z.ZodTypeAny>(
  definition: ToolDefinition<T>,
  action: (params: z.infer<T>, context?: SessionContext) => Promise<unknown>,
): Tool<T>;

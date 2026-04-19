/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  type ServerGeminiStreamEvent,
  type ResumedSessionData,
} from '@google/gemini-cli-core';
import type { GeminiCliAgentOptions } from './types.js';
import type { GeminiCliAgent } from './agent.js';
export declare class GeminiCliSession {
  private readonly sessionId;
  private readonly agent;
  private readonly resumedData?;
  private readonly config;
  private readonly tools;
  private readonly skillRefs;
  private readonly instructions;
  private client;
  private initialized;
  constructor(
    options: GeminiCliAgentOptions,
    sessionId: string,
    agent: GeminiCliAgent,
    resumedData?: ResumedSessionData | undefined,
  );
  get id(): string;
  initialize(): Promise<void>;
  sendStream(
    prompt: string,
    signal?: AbortSignal,
  ): AsyncGenerator<ServerGeminiStreamEvent>;
}

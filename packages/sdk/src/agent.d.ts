/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GeminiCliSession } from './session.js';
import type { GeminiCliAgentOptions } from './types.js';
export declare class GeminiCliAgent {
  private options;
  constructor(options: GeminiCliAgentOptions);
  session(options?: { sessionId?: string }): GeminiCliSession;
  resumeSession(sessionId: string): Promise<GeminiCliSession>;
}

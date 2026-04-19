/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { MessageBus } from './message-bus.js';
/**
 * Bridges the MessageBus to stdin/stdout for out-of-process confirmation.
 * This enables IDEs or other host processes to approve tool calls and answer questions.
 */
export declare class StdinMessageBusBridge {
  private readonly messageBus;
  private rl;
  constructor(messageBus: MessageBus);
  /**
   * Starts the bridge.
   * Listen for interesting requests on the message bus and pipe them to stdout.
   * Listen for responses on stdin and publish them to the message bus.
   */
  start(): void;
  private isResponse;
  private writeToStdout;
  stop(): void;
}

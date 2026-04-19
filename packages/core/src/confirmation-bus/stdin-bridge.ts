/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import readline from 'node:readline';
import type { MessageBus } from './message-bus.js';
import { MessageBusType, type Message } from './types.js';
import { safeJsonStringify } from '../utils/safeJsonStringify.js';

/**
 * Bridges the MessageBus to stdin/stdout for out-of-process confirmation.
 * This enables IDEs or other host processes to approve tool calls and answer questions.
 */
export class StdinMessageBusBridge {
  private rl: readline.Interface | null = null;

  constructor(private readonly messageBus: MessageBus) {}

  /**
   * Starts the bridge.
   * Listen for interesting requests on the message bus and pipe them to stdout.
   * Listen for responses on stdin and publish them to the message bus.
   */
  start(): void {
    // 1. Subscribe to requests that require external resolution
    this.messageBus.on(MessageBusType.TOOL_CONFIRMATION_REQUEST, (msg) => {
      this.writeToStdout(msg);
    });

    this.messageBus.on(MessageBusType.ASK_USER_REQUEST, (msg) => {
      this.writeToStdout(msg);
    });

    // 2. Setup stdin reader
    this.rl = readline.createInterface({
      input: process.stdin,
      terminal: false,
    });

    this.rl.on('line', (line) => {
      try {
        const message = JSON.parse(line) as Message;
        if (this.isResponse(message)) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this.messageBus.publish(message);
        }
      } catch (e) {
        // Ignore non-JSON lines or invalid messages
      }
    });
  }

  private isResponse(message: Message): boolean {
    return (
      message.type === MessageBusType.TOOL_CONFIRMATION_RESPONSE ||
      message.type === MessageBusType.ASK_USER_RESPONSE
    );
  }

  private writeToStdout(message: Message): void {
    // We wrap the message in a specific envelope to distinguish it from other stdout
    // This allows the host (VS Code) to filter for it easily.
    const output = {
      type: 'bridge_request',
      timestamp: new Date().toISOString(),
      payload: message,
    };
    process.stdout.write(safeJsonStringify(output) + '\n');
  }

  stop(): void {
    this.rl?.close();
    this.rl = null;
  }
}

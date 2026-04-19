/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  type Config,
  type GeminiChat,
  type ConversationRecord,
  type AgentLoopContext,
} from '@google/gemini-cli-core';
import * as acp from '@agentclientprotocol/sdk';
import { type LoadedSettings } from '../config/settings.js';
import { type CliArgs } from '../config/config.js';
export declare function runAcpClient(
  config: Config,
  settings: LoadedSettings,
  argv: CliArgs,
): Promise<void>;
export declare class GeminiAgent {
  private context;
  private settings;
  private argv;
  private connection;
  private static callIdCounter;
  static generateCallId(name: string): string;
  private sessions;
  private clientCapabilities;
  private apiKey;
  private baseUrl;
  private customHeaders;
  constructor(
    context: AgentLoopContext,
    settings: LoadedSettings,
    argv: CliArgs,
    connection: acp.AgentSideConnection,
  );
  initialize(args: acp.InitializeRequest): Promise<acp.InitializeResponse>;
  authenticate(req: acp.AuthenticateRequest): Promise<void>;
  newSession({
    cwd,
    mcpServers,
  }: acp.NewSessionRequest): Promise<acp.NewSessionResponse>;
  loadSession({
    sessionId,
    cwd,
    mcpServers,
  }: acp.LoadSessionRequest): Promise<acp.LoadSessionResponse>;
  private initializeSessionConfig;
  newSessionConfig(
    sessionId: string,
    cwd: string,
    mcpServers: acp.McpServer[],
    loadedSettings?: LoadedSettings,
  ): Promise<Config>;
  cancel(params: acp.CancelNotification): Promise<void>;
  prompt(params: acp.PromptRequest): Promise<acp.PromptResponse>;
  setSessionMode(
    params: acp.SetSessionModeRequest,
  ): Promise<acp.SetSessionModeResponse>;
  unstable_setSessionModel(
    params: acp.SetSessionModelRequest,
  ): Promise<acp.SetSessionModelResponse>;
}
export declare class Session {
  #private;
  private readonly id;
  private readonly chat;
  private readonly context;
  private readonly connection;
  private readonly settings;
  private pendingPrompt;
  private commandHandler;
  constructor(
    id: string,
    chat: GeminiChat,
    context: AgentLoopContext,
    connection: acp.AgentSideConnection,
    settings: LoadedSettings,
  );
  cancelPendingPrompt(): Promise<void>;
  setMode(modeId: acp.SessionModeId): acp.SetSessionModeResponse;
  private getAvailableCommands;
  sendAvailableCommands(): Promise<void>;
  setModel(modelId: acp.ModelId): acp.SetSessionModelResponse;
  streamHistory(messages: ConversationRecord['messages']): Promise<void>;
  prompt(params: acp.PromptRequest): Promise<acp.PromptResponse>;
  private handleCommand;
  private sendUpdate;
  private runTool;
  debug(msg: string): void;
}

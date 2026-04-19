export type ApiProvider = 'gemini-cli' | string;
export interface ApiHandlerOptions {
  geminiCliPath?: string;
  ask?: (type: string, text?: string, partial?: boolean) => Promise<any>;
  say?: (type: string, text?: string, partial?: boolean) => Promise<any>;
}
export type ApiConfiguration = ApiHandlerOptions;
export interface ApiStreamChunk {
  type: 'text' | 'reasoning' | 'tool_calls' | 'usage';
  text?: string;
  reasoning?: string;
  tool_call?: any;
  [key: string]: any;
}
export type ApiStream = AsyncGenerator<ApiStreamChunk>;

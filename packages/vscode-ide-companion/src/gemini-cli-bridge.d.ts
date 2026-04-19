export interface BridgeRequest {
  type: string;
  correlationId: string;
  [key: string]: any;
}
export declare class GeminiCliBridge {
  private process;
  private decoder;
  private outputChannel;
  constructor();
  spawn(cliPath: string, args: string[], cwd: string): Promise<void>;
  private handleOutput;
  private emitBridgeRequest;
  sendResponse(response: any): void;
  kill(): void;
}

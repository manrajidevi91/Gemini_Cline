import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';
import { StringDecoder } from 'string_decoder';

export interface BridgeRequest {
  type: string;
  correlationId: string;
  [key: string]: any;
}

export class GeminiCliBridge {
  private process: ChildProcess | null = null;
  private decoder = new StringDecoder('utf8');
  private outputChannel: vscode.OutputChannel;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('Gemini CLI Bridge');
  }

  public async spawn(
    cliPath: string,
    args: string[],
    cwd: string,
  ): Promise<void> {
    this.process = spawn(cliPath, args, { cwd });

    this.process.stdout?.on('data', (chunk) => {
      const text = this.decoder.write(chunk);
      this.handleOutput(text);
    });

    this.process.stderr?.on('data', (chunk) => {
      this.outputChannel.appendLine(`[STDERR] ${chunk.toString()}`);
    });

    this.process.on('close', (code) => {
      this.outputChannel.appendLine(`Process exited with code ${code}`);
      this.process = null;
    });
  }

  private handleOutput(text: string) {
    const lines = text.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const json = JSON.parse(line);
        if (json.type === 'bridge_request') {
          this.emitBridgeRequest(json);
        } else {
          // Normal streaming output or AgentEvents
          this.outputChannel.appendLine(line);
        }
      } catch (e) {
        // Not JSON, just regular output
        this.outputChannel.appendLine(line);
      }
    }
  }

  private emitBridgeRequest(request: BridgeRequest) {
    // This will be handled by the ApiHandler to trigger VS Code UI
  }

  public sendResponse(response: any) {
    this.process?.stdin?.write(JSON.stringify(response) + '\n');
  }

  public kill() {
    this.process?.kill();
    this.process = null;
  }
}

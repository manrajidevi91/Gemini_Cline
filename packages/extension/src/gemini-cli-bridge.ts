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

  // This will be overridden by the handler
  public handleOutput: (text: string) => Promise<void> = async () => {};

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('Gemini CLI Bridge');
  }

  public async spawn(
    cliPath: string,
    args: string[],
    cwd: string,
  ): Promise<void> {
    this.process = spawn(cliPath, args, { cwd });

    this.process.stdout?.on('data', async (chunk) => {
      const text = this.decoder.write(chunk);
      await this.handleOutput(text);
    });

    this.process.stderr?.on('data', (chunk) => {
      this.outputChannel.appendLine(`[STDERR] ${chunk.toString()}`);
    });

    this.process.on('close', (code) => {
      this.outputChannel.appendLine(`Process exited with code ${code}`);
      this.process = null;
    });
  }

  public sendResponse(response: any) {
    this.process?.stdin?.write(JSON.stringify(response) + '\n');
  }

  public kill() {
    this.process?.kill();
    this.process = null;
  }
}

import { ApiHandler } from '../index';
import { ApiConfiguration, ApiStream } from '../../../shared/api';
import { ClineStorageMessage } from '../../../shared/messages/content';
import { GeminiCliBridge } from '../../../gemini-cli-bridge';
import { MessageBusType } from '../../../shared/confirmation-bus-types';

export class GeminiCliHandler implements ApiHandler {
  private options: ApiConfiguration;
  private bridge: GeminiCliBridge | null = null;

  constructor(options: ApiConfiguration) {
    this.options = options;
  }

  async *createMessage(
    systemPrompt: string,
    messages: ClineStorageMessage[],
  ): ApiStream {
    this.bridge = new GeminiCliBridge();
    const cliPath = this.options.geminiCliPath || 'gemini';
    const lastMessage = messages[messages.length - 1];
    const prompt =
      typeof lastMessage.content === 'string'
        ? lastMessage.content
        : JSON.stringify(lastMessage.content);

    const bridge = this.bridge;
    const ask = this.options.ask;

    const chunks: any[] = [];
    let resolveChunk: ((value: any) => void) | null = null;
    let finished = false;

    const pushChunk = (chunk: any) => {
      chunks.push(chunk);
      if (resolveChunk) {
        resolveChunk(chunks.shift());
        resolveChunk = null;
      }
    };

    // @ts-ignore
    bridge.handleOutput = async (text: string) => {
      const lines = text.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.type === 'bridge_request') {
            const payload = json.payload;
            if (ask) {
              if (payload.type === MessageBusType.TOOL_CONFIRMATION_REQUEST) {
                const response = await ask(
                  'tool',
                  JSON.stringify(payload.details || payload.toolCall),
                );
                bridge.sendResponse({
                  type: MessageBusType.TOOL_CONFIRMATION_RESPONSE,
                  correlationId: payload.correlationId,
                  confirmed: response.response === 'yesButtonClicked',
                  outcome:
                    response.response === 'yesButtonClicked' ? 'allow' : 'deny',
                });
              } else if (payload.type === MessageBusType.ASK_USER_REQUEST) {
                const response = await ask(
                  'followup',
                  payload.questions[0]?.question || 'Question from Gemini CLI',
                );
                bridge.sendResponse({
                  type: MessageBusType.ASK_USER_RESPONSE,
                  correlationId: payload.correlationId,
                  answers: { '0': response.text || '' },
                });
              }
            }
          } else if (json.type === 'message' && json.role === 'agent') {
            pushChunk({ type: 'text', text: json.content });
          } else if (json.type === 'usage') {
            pushChunk({ type: 'usage', ...json });
          }
        } catch (e) {
          // pushChunk({ type: 'text', text: line });
        }
      }
    };

    const run = async () => {
      try {
        await bridge.spawn(
          cliPath,
          [
            'chat',
            prompt,
            '--interactive-approval',
            '--output-format',
            'stream-json',
          ],
          process.cwd(),
        );
      } finally {
        finished = true;
        if (resolveChunk) resolveChunk(null);
      }
    };

    run();

    while (!finished || chunks.length > 0) {
      if (chunks.length > 0) {
        yield chunks.shift();
      } else if (!finished) {
        await new Promise((r) => (resolveChunk = r));
      }
    }
  }

  abort(): void {
    this.bridge?.kill();
  }

  getModel() {
    return {
      id: 'gemini-cli',
      info: { supportsImages: true, supportsPromptCache: true } as any,
    };
  }
}

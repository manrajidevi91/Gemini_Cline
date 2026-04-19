import { ApiHandler } from '../index';
import { ApiConfiguration, ApiStream } from '../../../shared/api';
import { ClineStorageMessage } from '../../../shared/messages/content';
export declare class GeminiCliHandler implements ApiHandler {
  private options;
  private bridge;
  constructor(options: ApiConfiguration);
  createMessage(
    systemPrompt: string,
    messages: ClineStorageMessage[],
  ): ApiStream;
  abort(): void;
  getModel(): {
    id: string;
    info: any;
  };
}

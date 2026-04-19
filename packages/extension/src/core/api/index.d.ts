import { ApiStream } from '../../shared/api';
import { ClineStorageMessage } from '../../shared/messages/content';
export interface ApiHandler {
  createMessage(
    systemPrompt: string,
    messages: ClineStorageMessage[],
  ): ApiStream;
  getModel(): {
    id: string;
    info: any;
  };
}

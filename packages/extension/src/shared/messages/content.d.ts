export type ClineMessageRole = 'user' | 'assistant';
export interface ClineStorageMessage {
  role: ClineMessageRole;
  content: string | any[];
  ts?: number;
}

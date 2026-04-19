export enum MessageBusType {
  TOOL_CONFIRMATION_REQUEST = 'tool-confirmation-request',
  TOOL_CONFIRMATION_RESPONSE = 'tool-confirmation-response',
  TOOL_POLICY_REJECTION = 'tool-policy-rejection',
  ASK_USER_REQUEST = 'ask-user-request',
  ASK_USER_RESPONSE = 'ask-user-response',
}

export interface ToolConfirmationRequest {
  type: MessageBusType.TOOL_CONFIRMATION_REQUEST;
  toolCall: any;
  correlationId: string;
  details?: any;
}

export interface ToolConfirmationResponse {
  type: MessageBusType.TOOL_CONFIRMATION_RESPONSE;
  correlationId: string;
  confirmed: boolean;
  outcome?: string;
}

export interface AskUserRequest {
  type: MessageBusType.ASK_USER_REQUEST;
  questions: any[];
  correlationId: string;
}

export interface AskUserResponse {
  type: MessageBusType.ASK_USER_RESPONSE;
  correlationId: string;
  answers: { [key: string]: string };
  cancelled?: boolean;
}

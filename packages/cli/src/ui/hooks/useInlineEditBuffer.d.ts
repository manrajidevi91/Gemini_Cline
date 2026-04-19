/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export interface EditBufferState {
  editingKey: string | null;
  buffer: string;
  cursorPos: number;
}
export type EditBufferAction =
  | {
      type: 'START_EDIT';
      key: string;
      initialValue: string;
    }
  | {
      type: 'COMMIT_EDIT';
    }
  | {
      type: 'MOVE_LEFT';
    }
  | {
      type: 'MOVE_RIGHT';
    }
  | {
      type: 'HOME';
    }
  | {
      type: 'END';
    }
  | {
      type: 'DELETE_LEFT';
    }
  | {
      type: 'DELETE_RIGHT';
    }
  | {
      type: 'INSERT_CHAR';
      char: string;
      isNumberType: boolean;
    };
export interface UseEditBufferProps {
  onCommit: (key: string, value: string) => void;
}
export declare function useInlineEditBuffer({ onCommit }: UseEditBufferProps): {
  editState: EditBufferState;
  editDispatch: import('react').ActionDispatch<[action: EditBufferAction]>;
  startEditing: (key: string, initialValue: string) => void;
  commitEdit: () => void;
  cursorVisible: boolean;
};

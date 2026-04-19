/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type BackgroundTask } from './useExecutionLifecycle.js';
export interface BackgroundTaskManagerProps {
  backgroundTasks: Map<number, BackgroundTask>;
  backgroundTaskCount: number;
  isBackgroundTaskVisible: boolean;
  activePtyId: number | null | undefined;
  embeddedShellFocused: boolean;
  setEmbeddedShellFocused: (focused: boolean) => void;
  terminalHeight: number;
}
export declare function useBackgroundTaskManager({
  backgroundTasks,
  backgroundTaskCount,
  isBackgroundTaskVisible,
  activePtyId,
  embeddedShellFocused,
  setEmbeddedShellFocused,
  terminalHeight,
}: BackgroundTaskManagerProps): {
  isBackgroundTaskListOpen: boolean;
  setIsBackgroundTaskListOpen: import('react').Dispatch<
    import('react').SetStateAction<boolean>
  >;
  activeBackgroundTaskPid: number | null;
  setActiveBackgroundTaskPid: import('react').Dispatch<
    import('react').SetStateAction<number | null>
  >;
  backgroundTaskHeight: number;
};

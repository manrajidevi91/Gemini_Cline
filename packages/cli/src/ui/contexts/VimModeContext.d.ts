/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export type VimMode = 'NORMAL' | 'INSERT';
interface VimModeContextType {
  vimEnabled: boolean;
  vimMode: VimMode;
  toggleVimEnabled: () => Promise<boolean>;
  setVimMode: (mode: VimMode) => void;
}
export declare const VimModeProvider: ({
  children,
}: {
  children: React.ReactNode;
}) => import('react/jsx-runtime').JSX.Element;
export declare const useVimMode: () => VimModeContextType;
export {};

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Command enum for all available keyboard shortcuts
 */
import type { Key } from '../hooks/useKeypress.js';
export declare enum Command {
  RETURN = 'basic.confirm',
  ESCAPE = 'basic.cancel',
  QUIT = 'basic.quit',
  EXIT = 'basic.exit',
  HOME = 'cursor.home',
  END = 'cursor.end',
  MOVE_UP = 'cursor.up',
  MOVE_DOWN = 'cursor.down',
  MOVE_LEFT = 'cursor.left',
  MOVE_RIGHT = 'cursor.right',
  MOVE_WORD_LEFT = 'cursor.wordLeft',
  MOVE_WORD_RIGHT = 'cursor.wordRight',
  KILL_LINE_RIGHT = 'edit.deleteRightAll',
  KILL_LINE_LEFT = 'edit.deleteLeftAll',
  CLEAR_INPUT = 'edit.clear',
  DELETE_WORD_BACKWARD = 'edit.deleteWordLeft',
  DELETE_WORD_FORWARD = 'edit.deleteWordRight',
  DELETE_CHAR_LEFT = 'edit.deleteLeft',
  DELETE_CHAR_RIGHT = 'edit.deleteRight',
  UNDO = 'edit.undo',
  REDO = 'edit.redo',
  SCROLL_UP = 'scroll.up',
  SCROLL_DOWN = 'scroll.down',
  SCROLL_HOME = 'scroll.home',
  SCROLL_END = 'scroll.end',
  PAGE_UP = 'scroll.pageUp',
  PAGE_DOWN = 'scroll.pageDown',
  HISTORY_UP = 'history.previous',
  HISTORY_DOWN = 'history.next',
  REVERSE_SEARCH = 'history.search.start',
  SUBMIT_REVERSE_SEARCH = 'history.search.submit',
  ACCEPT_SUGGESTION_REVERSE_SEARCH = 'history.search.accept',
  NAVIGATION_UP = 'nav.up',
  NAVIGATION_DOWN = 'nav.down',
  DIALOG_NAVIGATION_UP = 'nav.dialog.up',
  DIALOG_NAVIGATION_DOWN = 'nav.dialog.down',
  DIALOG_NEXT = 'nav.dialog.next',
  DIALOG_PREV = 'nav.dialog.previous',
  ACCEPT_SUGGESTION = 'suggest.accept',
  COMPLETION_UP = 'suggest.focusPrevious',
  COMPLETION_DOWN = 'suggest.focusNext',
  EXPAND_SUGGESTION = 'suggest.expand',
  COLLAPSE_SUGGESTION = 'suggest.collapse',
  SUBMIT = 'input.submit',
  QUEUE_MESSAGE = 'input.queueMessage',
  NEWLINE = 'input.newline',
  OPEN_EXTERNAL_EDITOR = 'input.openExternalEditor',
  DEPRECATED_OPEN_EXTERNAL_EDITOR = 'input.deprecatedOpenExternalEditor',
  PASTE_CLIPBOARD = 'input.paste',
  SHOW_ERROR_DETAILS = 'app.showErrorDetails',
  SHOW_FULL_TODOS = 'app.showFullTodos',
  SHOW_IDE_CONTEXT_DETAIL = 'app.showIdeContextDetail',
  TOGGLE_MARKDOWN = 'app.toggleMarkdown',
  TOGGLE_COPY_MODE = 'app.toggleCopyMode',
  TOGGLE_MOUSE_MODE = 'app.toggleMouseMode',
  TOGGLE_YOLO = 'app.toggleYolo',
  CYCLE_APPROVAL_MODE = 'app.cycleApprovalMode',
  SHOW_MORE_LINES = 'app.showMoreLines',
  EXPAND_PASTE = 'app.expandPaste',
  FOCUS_SHELL_INPUT = 'app.focusShellInput',
  UNFOCUS_SHELL_INPUT = 'app.unfocusShellInput',
  CLEAR_SCREEN = 'app.clearScreen',
  RESTART_APP = 'app.restart',
  SUSPEND_APP = 'app.suspend',
  SHOW_SHELL_INPUT_UNFOCUS_WARNING = 'app.showShellUnfocusWarning',
  BACKGROUND_SHELL_ESCAPE = 'background.escape',
  BACKGROUND_SHELL_SELECT = 'background.select',
  TOGGLE_BACKGROUND_SHELL = 'background.toggle',
  TOGGLE_BACKGROUND_SHELL_LIST = 'background.toggleList',
  KILL_BACKGROUND_SHELL = 'background.kill',
  UNFOCUS_BACKGROUND_SHELL = 'background.unfocus',
  UNFOCUS_BACKGROUND_SHELL_LIST = 'background.unfocusList',
  SHOW_BACKGROUND_SHELL_UNFOCUS_WARNING = 'background.unfocusWarning',
  UPDATE_EXTENSION = 'extension.update',
  LINK_EXTENSION = 'extension.link',
  DUMP_FRAME = 'app.dumpFrame',
  START_RECORDING = 'app.startRecording',
  STOP_RECORDING = 'app.stopRecording',
}
/**
 * Data-driven key binding structure for user configuration
 */
export declare class KeyBinding {
  private static readonly VALID_LONG_KEYS;
  /** The key name (e.g., 'a', 'enter', 'tab', 'escape') */
  readonly name: string;
  readonly shift: boolean;
  readonly alt: boolean;
  readonly ctrl: boolean;
  readonly cmd: boolean;
  constructor(pattern: string);
  matches(key: Key): boolean;
  equals(other: KeyBinding): boolean;
}
/**
 * Configuration type mapping commands to their key bindings
 */
export type KeyBindingConfig = Map<Command, readonly KeyBinding[]>;
/**
 * Default key binding configuration
 * Matches the original hard-coded logic exactly
 */
export declare const defaultKeyBindingConfig: KeyBindingConfig;
interface CommandCategory {
  readonly title: string;
  readonly commands: readonly Command[];
}
/**
 * Presentation metadata for grouping commands in documentation or UI.
 */
export declare const commandCategories: readonly CommandCategory[];
/**
 * Human-readable descriptions for each command, used in docs/tooling.
 */
export declare const commandDescriptions: Readonly<Record<Command, string>>;
/**
 * Loads custom keybindings from the user's keybindings.json file.
 * Keybindings are merged with the default bindings.
 */
export declare function loadCustomKeybindings(): Promise<{
  config: KeyBindingConfig;
  errors: string[];
}>;
export {};

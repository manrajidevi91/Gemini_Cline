/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { TextBufferState, TextBufferAction } from './text-buffer.js';
export type VimAction = Extract<
  TextBufferAction,
  | {
      type: 'vim_delete_char_before';
    }
  | {
      type: 'vim_toggle_case';
    }
  | {
      type: 'vim_replace_char';
    }
  | {
      type: 'vim_find_char_forward';
    }
  | {
      type: 'vim_find_char_backward';
    }
  | {
      type: 'vim_delete_to_char_forward';
    }
  | {
      type: 'vim_delete_to_char_backward';
    }
  | {
      type: 'vim_delete_word_forward';
    }
  | {
      type: 'vim_delete_word_backward';
    }
  | {
      type: 'vim_delete_word_end';
    }
  | {
      type: 'vim_delete_big_word_forward';
    }
  | {
      type: 'vim_delete_big_word_backward';
    }
  | {
      type: 'vim_delete_big_word_end';
    }
  | {
      type: 'vim_change_word_forward';
    }
  | {
      type: 'vim_change_word_backward';
    }
  | {
      type: 'vim_change_word_end';
    }
  | {
      type: 'vim_change_big_word_forward';
    }
  | {
      type: 'vim_change_big_word_backward';
    }
  | {
      type: 'vim_change_big_word_end';
    }
  | {
      type: 'vim_delete_line';
    }
  | {
      type: 'vim_change_line';
    }
  | {
      type: 'vim_delete_to_end_of_line';
    }
  | {
      type: 'vim_delete_to_start_of_line';
    }
  | {
      type: 'vim_delete_to_first_nonwhitespace';
    }
  | {
      type: 'vim_change_to_end_of_line';
    }
  | {
      type: 'vim_change_to_start_of_line';
    }
  | {
      type: 'vim_change_to_first_nonwhitespace';
    }
  | {
      type: 'vim_delete_to_first_line';
    }
  | {
      type: 'vim_delete_to_last_line';
    }
  | {
      type: 'vim_change_movement';
    }
  | {
      type: 'vim_move_left';
    }
  | {
      type: 'vim_move_right';
    }
  | {
      type: 'vim_move_up';
    }
  | {
      type: 'vim_move_down';
    }
  | {
      type: 'vim_move_word_forward';
    }
  | {
      type: 'vim_move_word_backward';
    }
  | {
      type: 'vim_move_word_end';
    }
  | {
      type: 'vim_move_big_word_forward';
    }
  | {
      type: 'vim_move_big_word_backward';
    }
  | {
      type: 'vim_move_big_word_end';
    }
  | {
      type: 'vim_delete_char';
    }
  | {
      type: 'vim_insert_at_cursor';
    }
  | {
      type: 'vim_append_at_cursor';
    }
  | {
      type: 'vim_open_line_below';
    }
  | {
      type: 'vim_open_line_above';
    }
  | {
      type: 'vim_append_at_line_end';
    }
  | {
      type: 'vim_insert_at_line_start';
    }
  | {
      type: 'vim_move_to_line_start';
    }
  | {
      type: 'vim_move_to_line_end';
    }
  | {
      type: 'vim_move_to_first_nonwhitespace';
    }
  | {
      type: 'vim_move_to_first_line';
    }
  | {
      type: 'vim_move_to_last_line';
    }
  | {
      type: 'vim_move_to_line';
    }
  | {
      type: 'vim_escape_insert_mode';
    }
  | {
      type: 'vim_yank_line';
    }
  | {
      type: 'vim_yank_word_forward';
    }
  | {
      type: 'vim_yank_big_word_forward';
    }
  | {
      type: 'vim_yank_word_end';
    }
  | {
      type: 'vim_yank_big_word_end';
    }
  | {
      type: 'vim_yank_to_end_of_line';
    }
  | {
      type: 'vim_paste_after';
    }
  | {
      type: 'vim_paste_before';
    }
>;
export declare function handleVimAction(
  state: TextBufferState,
  action: VimAction,
): TextBufferState;

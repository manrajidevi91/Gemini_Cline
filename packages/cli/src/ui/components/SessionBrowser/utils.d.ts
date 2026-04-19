/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  type SessionInfo,
  type TextMatch,
} from '../../../utils/sessionUtils.js';
/**
 * Sorts an array of sessions by the specified criteria.
 * @param sessions - Array of sessions to sort
 * @param sortBy - Sort criteria: 'date' (lastUpdated), 'messages' (messageCount), or 'name' (displayName)
 * @param reverse - Whether to reverse the sort order (ascending instead of descending)
 * @returns New sorted array of sessions
 */
export declare const sortSessions: (
  sessions: SessionInfo[],
  sortBy: 'date' | 'messages' | 'name',
  reverse: boolean,
) => SessionInfo[];
/**
 * Finds all text matches for a search query within conversation messages.
 * Creates TextMatch objects with context (10 chars before/after) and role information.
 * @param messages - Array of messages to search through
 * @param query - Search query string (case-insensitive)
 * @returns Array of TextMatch objects containing match context and metadata
 */
export declare const findTextMatches: (
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>,
  query: string,
) => TextMatch[];
/**
 * Filters sessions based on a search query, checking titles, IDs, and full content.
 * Also populates matchSnippets and matchCount for sessions with content matches.
 * @param sessions - Array of sessions to filter
 * @param query - Search query string (case-insensitive)
 * @returns Filtered array of sessions that match the query
 */
export declare const filterSessions: (
  sessions: SessionInfo[],
  query: string,
) => SessionInfo[];

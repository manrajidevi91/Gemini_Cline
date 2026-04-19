/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { load } from 'js-yaml';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { glob } from 'glob';
import { z } from 'zod';
import { OrchestrationMode, type TeamDefinition } from './types.js';
import { FRONTMATTER_REGEX } from '../skills/skillLoader.js';
import { debugLogger } from '../utils/debugLogger.js';
import { coreEvents } from '../utils/events.js';

/**
 * Error thrown when a team definition is invalid or cannot be loaded.
 */
export class TeamLoadError extends Error {
  constructor(
    public filePath: string,
    message: string,
  ) {
    super(`Failed to load team from ${filePath}: ${message}`);
    this.name = 'TeamLoadError';
  }
}

const nameSchema = z
  .string()
  .regex(/^[a-z0-9-_]+$/, 'Name must be a valid slug');

const teamSchema = z.object({
  name: nameSchema,
  displayName: z.string().optional(),
  description: z.string().min(1),
  leadAgent: z.string().min(1),
  members: z.array(z.string()).min(1),
  orchestrationPrompt: z.string().optional(),
  mode: z.nativeEnum(OrchestrationMode).optional().default(OrchestrationMode.COLLABORATIVE),
});

/**
 * Result of loading teams from a directory.
 */
export interface TeamLoadResult {
  teams: TeamDefinition[];
  errors: TeamLoadError[];
}

/**
 * Loads a single team from a TEAM.md file.
 */
export async function loadTeamFromFile(
  filePath: string,
): Promise<TeamDefinition | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const match = content.match(FRONTMATTER_REGEX);
    if (!match) {
      return null;
    }

    const frontmatter = load(match[1]);
    if (!frontmatter || typeof frontmatter !== 'object') {
      return null;
    }

    const parsed = teamSchema.parse(frontmatter);

    return {
      name: parsed.name,
      displayName: parsed.displayName || parsed.name,
      description: parsed.description,
      leadAgent: parsed.leadAgent,
      members: parsed.members,
      orchestrationPrompt: parsed.orchestrationPrompt,
      mode: parsed.mode,
    };
  } catch (error) {
    debugLogger.log(`Error parsing team file ${filePath}:`, error);
    return null;
  }
}

/**
 * Discovers and loads all teams in the provided directory.
 */
export async function loadTeamsFromDir(
  dir: string,
): Promise<TeamLoadResult> {
  const teams: TeamDefinition[] = [];
  const errors: TeamLoadError[] = [];

  try {
    const absoluteSearchPath = path.resolve(dir);
    const stats = await fs.stat(absoluteSearchPath).catch(() => null);
    if (!stats || !stats.isDirectory()) {
      return { teams: [], errors: [] };
    }

    const pattern = ['TEAM.md', '*/TEAM.md'];
    const teamFiles = await glob(pattern, {
      cwd: absoluteSearchPath,
      absolute: true,
      nodir: true,
      ignore: ['**/node_modules/**', '**/.git/**'],
    });

    for (const teamFile of teamFiles) {
      try {
        const team = await loadTeamFromFile(teamFile);
        if (team) {
          teams.push(team);
        }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        errors.push(new TeamLoadError(teamFile, (error as Error).message));
      }
    }
  } catch (error) {
    coreEvents.emitFeedback(
      'warning',
      `Error discovering teams in ${dir}:`,
      error,
    );
  }

  return { teams, errors };
}

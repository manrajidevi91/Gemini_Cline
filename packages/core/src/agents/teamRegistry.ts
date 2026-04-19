/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { type TeamDefinition } from './types.js';
import { debugLogger } from '../utils/debugLogger.js';
import { type Config } from '../config/config.js';

/**
 * Registry for managing agent teams.
 */
export class TeamRegistry {
  private teams = new Map<string, TeamDefinition>();

  constructor(private readonly config: Config) {}

  /**
   * Registers a team definition.
   */
  registerTeam(definition: TeamDefinition): void {
    if (!definition.name || !definition.description) {
      debugLogger.warn(
        `[TeamRegistry] Skipping invalid team definition. Missing name or description.`,
      );
      return;
    }

    if (this.teams.has(definition.name) && this.config.getDebugMode()) {
      debugLogger.log(`[TeamRegistry] Overriding team '${definition.name}'`);
    }

    this.teams.set(definition.name, definition);
    
    if (this.config.getDebugMode()) {
        debugLogger.log(`[TeamRegistry] Registered team '${definition.name}' with ${definition.members.length} members.`);
    }
  }

  /**
   * Retrieves a team definition by name.
   */
  getDefinition(name: string): TeamDefinition | undefined {
    return this.teams.get(name);
  }

  /**
   * Returns all registered team definitions.
   */
  getAllDefinitions(): TeamDefinition[] {
    return Array.from(this.teams.values());
  }

  /**
   * Returns a list of all registered team names.
   */
  getAllTeamNames(): string[] {
    return Array.from(this.teams.keys());
  }

  /**
   * Discovers and loads teams from the workspace and standard locations.
   */
  async loadTeams(): Promise<void> {
    const { loadTeamsFromDir } = await import('./teamLoader.js');

    // 1. Load from built-in directory (if any)
    // For now, we skip built-ins if they don't exist yet.

    // 2. Load from global teams directory
    const globalTeamsDir = this.config.getGlobalTeamsDir();
    if (globalTeamsDir) {
      const globalResult = await loadTeamsFromDir(globalTeamsDir);
      for (const team of globalResult.teams) {
        this.registerTeam(team);
      }
    }

    // 3. Load from current workspace
    const workspaceDir = this.config.getWorkspaceDir();
    if (workspaceDir) {
      const workspaceResult = await loadTeamsFromDir(workspaceDir);
      for (const team of workspaceResult.teams) {
        this.registerTeam(team);
      }
    }
  }
}

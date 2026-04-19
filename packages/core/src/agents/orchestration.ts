/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { type TeamDefinition, type AgentDefinition } from './types.js';

/**
 * Constructs a specialized orchestration prompt for a team lead.
 * This prompt informs the lead about their team members and mission.
 */
export function constructOrchestrationPrompt(
  team: TeamDefinition,
  memberDefinitions: AgentDefinition[],
): string {
  const membersInfo = memberDefinitions
    .map((m) => `- ${m.displayName ?? m.name}: ${m.description}`)
    .join('\n');

  return `
# Team Orchestration: ${team.displayName || team.name}
You are the designated LEADER of this agent team.
Mission: ${team.description}

## Your Team Members
You have access to the following specialized agents via the "Invoke Subagent" tool:
${membersInfo}

## Orchestration Guidelines
${team.orchestrationPrompt || 'Coordinate with your team members to achieve the goal effectively. Delegate specialized tasks to the appropriate members.'}

## Strategies for Success:
1. **Analyze**: Break down the complex goal into smaller, manageable sub-tasks.
2. **Delegate**: Use "Invoke Subagent" to assign tasks to the best-suited team members.
3. **Synthesize**: Combine the results from your team members into a cohesive final solution.
4. **Iterate**: If a member's output is insufficient, provide feedback and ask them to try again with more specific instructions.

Always maintain a high-level view of the project and ensure all team efforts align with the primary mission.
`;
}

/**
 * Prioritizes tools based on the team's configuration and current state.
 * (Placeholder for future more complex logic)
 */
export function prioritizeTools(
  availableTools: string[],
  team?: TeamDefinition,
): string[] {
  if (!team) return availableTools;
  // Future: maybe move specialized tools to the top
  return availableTools;
}

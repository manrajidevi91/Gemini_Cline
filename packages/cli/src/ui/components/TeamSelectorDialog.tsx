/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useCallback, useContext, useMemo } from 'react';
import { Box, Text } from 'ink';
import { ConfigContext } from '../contexts/ConfigContext.js';
import { DescriptiveRadioButtonSelect } from './shared/DescriptiveRadioButtonSelect.js';
import { theme } from '../semantic-colors.js';
import { useKeypress } from '../hooks/useKeypress.js';

interface TeamSelectorDialogProps {
  onClose: () => void;
}

export function TeamSelectorDialog({
  onClose,
}: TeamSelectorDialogProps): React.JSX.Element {
  const config = useContext(ConfigContext);

  const teamRegistry = config?.getTeamRegistry();
  const teams = useMemo(() => teamRegistry?.getAllDefinitions() ?? [], [teamRegistry]);

  const options = useMemo(() => {
    const list = teams.map((team) => ({
      value: team.name,
      title: team.displayName || team.name,
      description: team.description,
      key: team.name,
    }));

    // Add "Main Agent" option
    list.unshift({
      value: 'main_agent',
      title: 'Main Agent (No Team)',
      description: 'Run with the primary agent without team orchestration.',
      key: 'main_agent',
    });

    return list;
  }, [teams]);

  const currentTeam = config?.getCurrentTeam() || 'main_agent';
  const initialIndex = useMemo(() => {
    const idx = options.findIndex((o) => o.value === currentTeam);
    return idx >= 0 ? idx : 0;
  }, [options, currentTeam]);

  useKeypress(
    (key) => {
      if (key.name === 'escape') {
        onClose();
        return true;
      }
      return false;
    },
    { isActive: true },
  );

  const handleSelect = useCallback(
    (teamName: string) => {
      if (config) {
        if (teamName === 'main_agent') {
          config.setCurrentTeam(undefined);
        } else {
          config.setCurrentTeam(teamName);
        }
      }
      onClose();
    },
    [config, onClose],
  );

  return (
    <Box
      borderStyle="round"
      borderColor={theme.border.default}
      flexDirection="column"
      padding={1}
      width="100%"
    >
      <Text bold>Select Agent Team</Text>
      <Text color={theme.text.secondary} marginBottom={1}>
        Choose a specialized team for your complex tasks.
      </Text>

      <DescriptiveRadioButtonSelect
        items={options}
        onSelect={handleSelect}
        initialIndex={initialIndex}
        showNumbers={true}
      />

      <Box marginTop={1}>
        <Text color={theme.text.secondary}>(Press Esc to close)</Text>
      </Box>
    </Box>
  );
}

import React from 'react';
import { Box, Stack } from '@chakra-ui/core/dist';
import SpellBadge from './SpellBadge';

const spells = [{ id: 1 }, { id: 2 }, { id: 3 }];

interface SpellGroupProps {}

const SpellGroup: React.FC<SpellGroupProps> = () => {
  return (
    <Stack
      isInline
      borderRadius="md"
      boxShadow="md"
      bg="white"
      p={4}
      as="ul"
      spacing={3}
      shouldWrapChildren
    >
      {spells.map(spell => (
        <Box as="li" m={3} listStyleType="none" key={spell.id}>
          <SpellBadge spell={{ id: 1 }} />
        </Box>
      ))}
    </Stack>
  );
};

export default SpellGroup;

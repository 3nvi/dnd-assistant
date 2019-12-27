import React from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/core/dist';
import SpellIcon from 'src/assets/spell-icon.png';

interface SpellBadgeProps {
  spell?: any;
}

const SpellBadge: React.FC<SpellBadgeProps> = ({ spell }) => {
  return (
    <Box borderRadius="full" boxShadow="xl" bg="white" width={150} height={150} position="relative">
      <Flex width="100%" height="100%" justify="center" align="center" direction="column">
        <Image
          aria-describedby={spell.id}
          src={SpellIcon}
          alt="Spell Icon"
          htmlWidth={75}
          htmlHeight={75}
          ignoreFallback
        />
        <Text fontSize="sm" color="gray.500" id={spell.id}>
          Eldridge Blast
        </Text>
      </Flex>
    </Box>
  );
};

export default SpellBadge;

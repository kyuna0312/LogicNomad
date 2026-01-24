/**
 * Levels Section Component - LeetCode-style professional design
 */

import { memo } from 'react';
import { Box, HStack, Heading, Text as ChakraText, Flex } from '@chakra-ui/react';
import { Card } from '@logicnomad/ui';
import { LevelList } from '../LevelList';
import { levels } from '../../data/levels';

interface LevelsSectionProps {
  onStartLevel: (levelId: string) => void;
  completedLevels: string[];
}

export const LevelsSection = memo(({ onStartLevel, completedLevels }: LevelsSectionProps) => {
  const completionPercentage = Math.round((completedLevels.length / levels.length) * 100);

  return (
    <Box>
      {/* LeetCode-style Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        flexWrap="wrap"
        gap={4}
      >
        {/* Title */}
        <Box>
          <Heading
            size={{ base: 'lg', md: 'xl' }}
            color="text-primary"
            fontWeight="600"
            mb={1}
          >
            Problems
          </Heading>
          <ChakraText 
            fontSize={{ base: 'xs', md: 'sm' }} 
            color="text-secondary"
          >
            {completedLevels.length} of {levels.length} completed
          </ChakraText>
        </Box>

        {/* Progress Stats - LeetCode style */}
        <HStack gap={6} flexWrap="wrap">
          <Box textAlign="right">
            <ChakraText 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color="text-primary" 
              fontWeight="600"
            >
              {completedLevels.length}
            </ChakraText>
            <ChakraText 
              fontSize="xs" 
              color="text-secondary"
            >
              Solved
            </ChakraText>
          </Box>
          <Box textAlign="right">
            <ChakraText 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color="success" 
              fontWeight="600"
            >
              {completionPercentage}%
            </ChakraText>
            <ChakraText 
              fontSize="xs" 
              color="text-secondary"
            >
              Progress
            </ChakraText>
          </Box>
        </HStack>
      </Flex>

      {/* Progress Bar - LeetCode style */}
      <Box mb={6}>
        <Box
          w="full"
          h="4px"
          bg="bg-tertiary"
          borderRadius="full"
          overflow="hidden"
        >
          <Box
            h="full"
            bg="success"
            borderRadius="full"
            transition="width 0.3s ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </Box>
      </Box>

      {/* Level List Container */}
      <Box
        bg="bg-secondary"
        borderWidth="1px"
        borderColor="border-primary"
        borderRadius="md"
        shadow="card"
      >
        <Card 
          variant="default" 
          padding="lg"
        >
          <LevelList onStartLevel={onStartLevel} completedLevels={completedLevels} />
        </Card>
      </Box>
    </Box>
  );
});

LevelsSection.displayName = 'LevelsSection';

// Default export for lazy loading compatibility
export default LevelsSection;

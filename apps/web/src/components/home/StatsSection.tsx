/**
 * Stats Section Component - Display user progress statistics
 * Professional HackerRank/LeetCode style
 */

import { memo } from 'react';
import { Box, SimpleGrid, Text as ChakraText, Heading } from '@chakra-ui/react';
import { Card } from '@logicnomad/ui';
import { useGameStore } from '../../store/gameStore';
import { levels } from '../../data/levels';

export const StatsSection = memo(() => {
  const { completedLevels } = useGameStore();
  const progressPercentage = Math.round((completedLevels.length / levels.length) * 100);

  return (
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
        <Heading
          size={{ base: 'md', md: 'lg' }}
          color="text-primary"
          fontWeight="600"
          mb={6}
        >
          Statistics
        </Heading>
        
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6} textAlign="center">
          {/* Completed Levels */}
          <Box
            p={4}
            borderRadius="md"
            bg="bg-tertiary"
            borderWidth="1px"
            borderColor="border-primary"
          >
            <ChakraText
              fontSize={{ base: '2xl', md: '3xl' }}
              color="success"
              fontWeight="600"
              mb={1}
            >
              {completedLevels.length}
            </ChakraText>
            <ChakraText fontSize={{ base: 'xs', md: 'sm' }} color="text-secondary">
              Solved
            </ChakraText>
          </Box>
          
          {/* Divider */}
          <Box
            display={{ base: 'none', sm: 'block' }}
            w="1px"
            h="12"
            bg="border-primary"
            mx="auto"
          />
          
          {/* Total Levels */}
          <Box
            p={4}
            borderRadius="md"
            bg="bg-tertiary"
            borderWidth="1px"
            borderColor="border-primary"
          >
            <ChakraText
              fontSize={{ base: '2xl', md: '3xl' }}
              color="text-primary"
              fontWeight="600"
              mb={1}
            >
              {levels.length}
            </ChakraText>
            <ChakraText fontSize={{ base: 'xs', md: 'sm' }} color="text-secondary">
              Total
            </ChakraText>
          </Box>
          
          {/* Divider */}
          <Box
            display={{ base: 'none', sm: 'block' }}
            w="1px"
            h="12"
            bg="border-primary"
            mx="auto"
          />
          
          {/* Progress Percentage */}
          <Box
            p={4}
            borderRadius="md"
            bg="bg-tertiary"
            borderWidth="1px"
            borderColor="border-primary"
          >
            <ChakraText
              fontSize={{ base: '2xl', md: '3xl' }}
              color="primary.500"
              fontWeight="600"
              mb={1}
            >
              {progressPercentage}%
            </ChakraText>
            <ChakraText fontSize={{ base: 'xs', md: 'sm' }} color="text-secondary">
              Progress
            </ChakraText>
          </Box>
        </SimpleGrid>
      </Card>
    </Box>
  );
});

StatsSection.displayName = 'StatsSection';

// Default export for lazy loading compatibility
export default StatsSection;

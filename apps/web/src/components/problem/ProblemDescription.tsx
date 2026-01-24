/**
 * Problem Description Component - LeetCode/HackerRank style
 * Shows problem statement, examples, constraints, and hints
 */

import { memo } from 'react';
import { Box, VStack, HStack, Heading, Text, Code, Badge } from '@chakra-ui/react';
import type { PuzzleLevel } from '@logicnomad/engine';

interface ProblemDescriptionProps {
  level: PuzzleLevel;
  completedLevels: string[];
}

export const ProblemDescription = memo(({ level, completedLevels }: ProblemDescriptionProps) => {
  const isCompleted = completedLevels.includes(level.id);
  const difficultyColor = {
    easy: 'green',
    medium: 'yellow',
    hard: 'red',
  }[level.difficulty || 'easy'];

  const difficultyLabel = {
    easy: 'Хялбар',
    medium: 'Дунд',
    hard: 'Хэцүү',
  }[level.difficulty || 'easy'];

  return (
    <Box
      h="100%"
      overflowY="auto"
      p={6}
      bg="dark.100"
      color="text-primary"
    >
      <VStack align="stretch" gap={6}>
        {/* Header */}
        <VStack align="stretch" gap={3}>
          <HStack justify="space-between" align="center" flexWrap="wrap">
            <Heading size="lg" color="text-primary" fontWeight="600">
              {level.name}
            </Heading>
            <HStack gap={2}>
              <Badge
                colorScheme={difficultyColor}
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="sm"
                fontWeight="600"
              >
                {difficultyLabel}
              </Badge>
              {isCompleted && (
                <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="sm" fontWeight="600">
                  ✓ Completed
                </Badge>
              )}
            </HStack>
          </HStack>
          
          {/* Stats */}
          <HStack gap={4} fontSize="sm" color="text-secondary">
            <Text>Steps: {level.minSteps} - {level.maxSteps}</Text>
            {level.requiredActions && level.requiredActions.length > 0 && (
              <Text>Required: {level.requiredActions.join(', ')}</Text>
            )}
          </HStack>
        </VStack>

        <Box h="1px" bg="border-primary" />

        {/* Problem Statement */}
        <VStack align="stretch" gap={3}>
          <Heading size="md" color="text-primary" fontWeight="600" fontSize="md">
            Problem Statement
          </Heading>
          <Text color="text-secondary" lineHeight="tall" fontSize="sm">
            {level.description}
          </Text>
        </VStack>

        {/* Examples */}
        <VStack align="stretch" gap={3}>
          <Heading size="md" color="text-primary" fontWeight="600" fontSize="md">
            Example
          </Heading>
          <Box
            p={4}
            bg="dark.200"
            borderRadius="sm"
            borderLeft="3px solid"
            borderColor="primary.500"
          >
            <VStack align="stretch" gap={2} fontSize="sm">
              <Text color="text-secondary" fontWeight="600">
                Input:
              </Text>
              <Code
                p={2}
                bg="dark.300"
                color="text-primary"
                borderRadius="sm"
                display="block"
                whiteSpace="pre-wrap"
                fontSize="xs"
                fontFamily="mono"
              >
                {`Position: (${level.startPosition.x}, ${level.startPosition.y})
Direction: ${level.startDirection}
Goal: (${level.goalPosition.x}, ${level.goalPosition.y})`}
              </Code>
              <Text color="text-secondary" fontWeight="600" mt={2}>
                Output:
              </Text>
              <Code
                p={2}
                bg="dark.300"
                color="success.500"
                borderRadius="sm"
                display="block"
                fontSize="xs"
                fontFamily="mono"
              >
                {`Successfully reached goal!
Steps: ${level.minSteps} - ${level.maxSteps}`}
              </Code>
            </VStack>
          </Box>
        </VStack>

        {/* Constraints */}
        <VStack align="stretch" gap={3}>
          <Heading size="md" color="text-primary" fontWeight="600" fontSize="md">
            Constraints
          </Heading>
          <Box
            p={4}
            bg="dark.200"
            borderRadius="sm"
            borderLeft="3px solid"
            borderColor="warning.500"
          >
            <VStack align="stretch" gap={2} fontSize="sm" color="text-secondary">
              <Text>• Minimum {level.minSteps} steps required</Text>
              <Text>• Maximum {level.maxSteps} steps allowed</Text>
              {level.requiredActions && level.requiredActions.length > 0 && (
                <Text>• Required actions: {level.requiredActions.join(', ')}</Text>
              )}
            </VStack>
          </Box>
        </VStack>

        {/* Hints */}
        {level.hints && level.hints.length > 0 && (
          <VStack align="stretch" gap={3}>
            <Heading size="md" color="text-primary" fontWeight="600" fontSize="md">
              Hints
            </Heading>
            <VStack align="stretch" gap={2}>
              {level.hints.map((hint, index) => (
                <Box
                  key={index}
                  p={3}
                  bg="dark.200"
                  borderRadius="sm"
                  borderLeft="3px solid"
                  borderColor="primary.500"
                >
                  <Text color="text-secondary" fontSize="sm" lineHeight="tall">
                    {hint}
                  </Text>
                </Box>
              ))}
            </VStack>
          </VStack>
        )}

        {/* Grid Visualization Hint */}
        <VStack align="stretch" gap={3}>
          <Heading size="md" color="text-primary" fontWeight="600" fontSize="md">
            Grid Legend
          </Heading>
          <Box
            p={4}
            bg="dark.200"
            borderRadius="sm"
          >
            <VStack align="stretch" gap={2} fontSize="sm" color="text-secondary">
              <HStack gap={2}>
                <Text>🚩</Text>
                <Text>Start - Starting position</Text>
              </HStack>
              <HStack gap={2}>
                <Text>🏆</Text>
                <Text>Goal - Target position</Text>
              </HStack>
              <HStack gap={2}>
                <Text>⬛</Text>
                <Text>Wall - Cannot pass through</Text>
              </HStack>
              <HStack gap={2}>
                <Text>✨</Text>
                <Text>Empty - Can move freely</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
});

ProblemDescription.displayName = 'ProblemDescription';
